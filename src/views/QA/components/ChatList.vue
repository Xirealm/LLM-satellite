<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Mode } from "@/types/qa.d.ts"
import { useQaStore } from '@/stores/qa'
import { deleteQuestion, postSimilarText, source } from '@/services/qa'
import { marked } from '@/utils/marked'
import markdownToTxt from 'markdown-to-txt';
import { copyText } from "@/utils/copyText"
import { useRouter } from 'vue-router';
const router = useRouter()
import IconCopy from "./icons/IconCopy.vue"
import IconLike from "./icons/IconLike.vue"
import IconDislike from "./icons/IconDislike.vue"
import IconFire from "./icons/IconFire.vue"

//窗口滚动
const main = ref<HTMLElement>()
const scroll = () => {
  setTimeout(() => {
    main.value!.scrollBy({
      top: main.value!.scrollHeight,
      behavior: 'smooth'
    })
  },10)
}
const ws = ref<WebSocket>()
const currentStatus = ref("undo")

const qaStore = useQaStore()
const mode = ref<Mode>("enhancedAnswer")

watch(() => qaStore.questionList.length, () => {
    if (qaStore.questionList.length === 0) {
        router.push('/')
    }
    if (qaStore.questionList.length > 0) {
        router.push('/chat')
    }
})

// 发送问题
const sendQuestion = async (question:string) => {
    console.log(question);
    if (question === "" || qaStore.chatStatus === 'doing') return
    qaStore.questionList.push({
        question: question,
        rawAnswer: { content:'',text:'',status:'undo' },
        enhancedAnswer: { content: '',text:'',status:'undo'},
        similarText: { content: '', text:'',status:'undo' },
        activeAnswer: qaStore.chatMode
    })
    scroll()
    getAnswer(question,mode.value,qaStore.questionList.length - 1)
}
const closeQuestion = (mode: 'similarText' | 'enhancedAnswer' | 'rawAnswer', index: number) => {
    console.log("停止生成");
    qaStore.questionList[index][mode].status = 'close'
    currentStatus.value = 'undo'
    if(mode === 'similarText'){
        source.cancel('similarText closed')
    } else {
        ws.value!.close()
    }
}
const reQuestion = (question: string, mode: Mode, index: number) => {
  if (currentStatus.value === 'doing') return
  qaStore.questionList[index][mode].content = ""
  getAnswer(question,mode,index)
}
const getAnswer = async (question: any, mode: Mode, index: number,) => {
  qaStore.questionList[index][mode].status = 'doing'
  currentStatus.value = 'doing'
  console.log(qaStore.questionList[index][mode].status)
  if (mode === 'similarText') {
    const result = await postSimilarText(question)
    // console.log(result.similar_texts);
    qaStore.questionList[index].similarText.text = markdownToTxt(result.similar_texts);
    qaStore.questionList[index].similarText.content = await marked.parse(result.similar_texts)
    qaStore.questionList[index].similarText.status = 'done'
    currentStatus.value = 'done'
    if (qaStore.questionList[qaStore.questionList.length - 1].similarText.status === 'done') {
      scroll() 
    }
    return
  }
  if (mode === 'enhancedAnswer') {
    ws.value = new WebSocket("ws://5eed5804.r12.cpolar.top/api/enhance_socket");
  } else if(mode === 'rawAnswer') {
    ws.value = new WebSocket("ws://5eed5804.r12.cpolar.top/api/raw_socket")
  }
  const sendMessage = () => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(`{ "query":"${question}" }`)
    }
    else {
      console.error('WebSocket is not connected');
    }
  }
  ws.value!.onopen = (event: any) => {
    console.log("WebSocket connection opened:", event);
    sendMessage()
  }
  ws.value!.onmessage = async (event: any) => {
    // console.log("WebSocket message received:", event.data);
    if (event.data === JSON.stringify({ ans: "DONE" })) {
      qaStore.questionList[index][mode].status = 'done'
      currentStatus.value = 'done'
      return
    }
    qaStore.questionList[index][mode].text = markdownToTxt(event.data)
    qaStore.questionList[index][mode].content = await marked.parse(event.data)
    if (qaStore.questionList[qaStore.questionList.length - 1][mode].status === 'doing') {
      scroll()
    }
  }
  ws.value!.onclose = (event: any) => {
    console.log("WebSocket connection closed:", event);
  };
}
const changeActiveAnswer = (question:string,mode:Mode,index:number)=>{
  console.log(question, mode, index)
  console.log(qaStore.questionList[index][mode].status);
  if (qaStore.questionList[index][mode].status !== 'undo') return
  getAnswer(question, mode, index)
}

defineExpose({
    sendQuestion
}) 
</script>

<template>
<div class="main md:h-[calc(100vh-80px-130px)] h-[calc(100vh-60px-120px)]" ref="main">
      <!-- 问答列表 -->
      <div
        v-for="(item,index) in qaStore.questionList" 
        class="md:w-1/2 w-11/12 mx-auto my-5 transition ease-in-out duration-200 relative">
        <img src="../../../assets/questionUser.png" class="absolute -left-10 w-10 hidden md:block"/>
        <div class="mx-auto w-full md:w-[50vw] flex md:justify-start justify-end">
          <div class="bg-blue-500 rounded-lg text-white px-3 py-3 text-sm md:text-base">
            <span>{{ item.question }}</span>
          </div>
        </div>
        <div class="relative">
          <img 
            v-if="index === qaStore.questionList.length - 1" src="../../../assets/model.png" 
            class="absolute -left-10 top-14 w-10 hidden md:block"/>
          <img 
            v-else src="../../../assets/modelDone.png"  
            class="absolute -left-10 top-14 w-10 hidden md:block"/>
          <el-tabs 
            v-model="item.activeAnswer" class="mx-auto md:w-[50vw]"
            @tab-change="changeActiveAnswer(item.question,item.activeAnswer,index)">
            <el-tab-pane :disabled="qaStore.chatStatus === 'doing'" v-for="mode in qaStore.modeList" :label="mode.label" :name="mode.value">
              <div class="bg-gray-100 rounded-lg max-w-2/3 px-3 py-3">
                <IconFire v-if="item[mode.value].content==='' && item[mode.value].status === 'close'"/>
                <IconFire class="animate-pulse" v-else-if="item[mode.value].content===''"/>
                <el-text class="answer mx-10 text-black" size="large" v-html="item[mode.value].content"></el-text>
              </div>
            </el-tab-pane>
            <div class="w-full h-6 relative mt-1">
              <div class="absolute left top-0 text-blue-400 text-sm hover:text-gray-400">
                <button 
                  v-if="qaStore.questionList[index][item.activeAnswer].status === 'doing'"
                  @click="closeQuestion(item.activeAnswer,index)">停止生成
                </button>
                <button 
                  v-else-if="qaStore.questionList[index][item.activeAnswer].status === 'done'&&currentStatus!=='doing'" 
                  @click="reQuestion(item.question,item.activeAnswer,index)">
                  重新生成
                </button>
                <button 
                  v-else-if="qaStore.questionList[index][item.activeAnswer].status === 'close'" 
                  @click="reQuestion(item.question,item.activeAnswer,index)"
                  class="text-gray-400">
                  已停止
                </button>
              </div>
              <div class="absolute right-0 top-0 flex gap-2">
                <span @click = "copyText(qaStore.questionList[index][item.activeAnswer].text)"><IconCopy /></span>
                <span><IconLike /></span>
                <span><IconDislike /></span>
              </div>
            </div>
          </el-tabs>
        </div>
      </div>
    </div>
</template>