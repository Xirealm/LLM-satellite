<script setup lang="ts">
import { ref, watch,watchEffect } from "vue";
import { RouterView, useRouter } from "vue-router";
import { marked } from "@/utils/marked";
import markdownToTxt from "markdown-to-txt";
import { copyText } from "@/utils/copyText";
// import clipboard from 'clipboard'

import { ElMessage } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";

import { deleteQuestion, postSimilarText, source } from "../../services/qa";

import Introduction from "./components/Introduction.vue";
import UploadPopup from "./components/UploadPopup.vue";

import IconCopy from "./components/icons/IconCopy.vue";
import IconLike from "./components/icons/IconLike.vue";
import IconDislike from "./components/icons/IconDislike.vue";
import IconFire from "./components/icons/IconFire.vue";
import Input from "./components/Input.vue";

import type { Mode } from "@/types/qa.d.ts";

import { useChatStore } from "@/stores/chat";
const chatStore = useChatStore();
const router = useRouter();

watchEffect(() => {
  if (chatStore.questionList.length === 0) {
    router.push("/index");
  }
  if (chatStore.questionList.length > 0) {
    router.push("/chat");
  }
})
//窗口滚动
const main = ref<HTMLElement>();
const scroll = () => {
  setTimeout(() => {
    main.value!.scrollBy({
      top: main.value!.scrollHeight,
      behavior: "smooth",
    });
  }, 10);
};

const input = ref("")

const chat = ref();
const sendQuestion = async () => {
  // chat.value.sendQuestion(input.value)
  // input.value = ""
  // console.log(input.value);
  // if (input.value === "" || currentStatus.value === 'doing') return
  // const question = input.value
  // input.value = ""
  // chatStore.questionList.push({
  //   question: question,
  //   rawAnswer: { content:'',text:'',status:'undo' },
  //   enhancedAnswer: { content: '',text:'',status:'undo'},
  //   similarText:{ content: '', text:'',status:'undo' },
  //   activeAnswer:mode.value
  // })
  // scroll()
  // getAnswer(question,mode.value,chatStore.questionList.length - 1)
};
// const closeQuestion = (mode:'similarText' | 'enhancedAnswer' | 'rawAnswer',index:number) => {
//   chatStore.questionList[index][mode].status = 'close'
//   currentStatus.value = 'undo'
//   if(mode === 'similarText'){
//     source.cancel('similarText closed')
//   } else {
//     ws.value!.close()
//   }
// }
// const reQuestion = (question: string, mode: Mode, index: number) => {
//   if (currentStatus.value === 'doing') return
//   chatStore.questionList[index][mode].content = ""
//   getAnswer(question,mode,index)
// }
// const getAnswer = async (question: any, mode: Mode, index: number,) => {
//   chatStore.questionList[index][mode].status = 'doing'
//   currentStatus.value = 'doing'
//   console.log(chatStore.questionList[index][mode].status)
//   if (mode === 'similarText') {
//     const result = await postSimilarText(question)
//     // console.log(result.similar_texts);
//     chatStore.questionList[index].similarText.text = markdownToTxt(result.similar_texts);
//     chatStore.questionList[index].similarText.content = await marked.parse(result.similar_texts)
//     chatStore.questionList[index].similarText.status = 'done'
//     currentStatus.value = 'done'
//     if (chatStore.questionList[chatStore.questionList.length - 1].similarText.status === 'done') {
//       scroll()
//     }
//     return
//   }
//   if (mode === 'enhancedAnswer') {
//     ws.value = new WebSocket("ws://5eed5804.r12.cpolar.top/api/enhance_socket");
//   } else if(mode === 'rawAnswer') {
//     ws.value = new WebSocket("ws://5eed5804.r12.cpolar.top/api/raw_socket")
//   }
//   const sendMessage = () => {
//     if (ws.value && ws.value.readyState === WebSocket.OPEN) {
//       ws.value.send(`{ "query":"${question}" }`)
//     }
//     else {
//       console.error('WebSocket is not connected');
//     }
//   }
//   ws.value!.onopen = (event: any) => {
//     console.log("WebSocket connection opened:", event);
//     sendMessage()
//   }
//   ws.value!.onmessage = async (event: any) => {
//     // console.log("WebSocket message received:", event.data);
//     if (event.data === JSON.stringify({ ans: "DONE" })) {
//       chatStore.questionList[index][mode].status = 'done'
//       currentStatus.value = 'done'
//       return
//     }
//     chatStore.questionList[index][mode].text = markdownToTxt(event.data)
//     chatStore.questionList[index][mode].content = await marked.parse(event.data)
//     if (chatStore.questionList[chatStore.questionList.length - 1][mode].status === 'doing') {
//       scroll()
//     }
//   }
//   ws.value!.onclose = (event: any) => {
//     console.log("WebSocket connection closed:", event);
//   };
// }
// const changeActiveAnswer = (question:string,mode:Mode,index:number)=>{
//   console.log(question, mode, index)
//   console.log(chatStore.questionList[index][mode].status);
//   if (chatStore.questionList[index][mode].status !== 'undo') return
//   getAnswer(question, mode, index)
// }
// //上传数据
// const dialogFormVisible = ref(false)
// const fileList = ref<UploadUserFile[]>([])
// const feedData = () => {
//   dialogFormVisible.value = true
// }
// const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles)
// }
// const handlePreview: UploadProps['onPreview'] = (file) => {
//   console.log(file)
// }
// //清除数据
// const dialogClearVisible = ref(false)
// const openClearDialog = () => {
//   dialogClearVisible.value = true
// }
// const clearData = async () => {
//   console.log("清除操作");
//   await deleteQuestion()
//   dialogClearVisible.value = false
//   ElMessage({
//     type: 'success',
//     message: '清除成功',
//   })
// }
// const cancelClearData = () => {
//   dialogFormVisible.value = false
//   ElMessage({
//     type: 'info',
//     message: '清除取消',
//   })
// }
</script>

<template>
  <!-- <div class="h-full w-full overflow-hidden"> -->
  <!-- <Introduction v-if="chatStore.questionList.length === 0"/> -->
  <router-view v-slot="{ Component }">
    <component :is="Component" ref="chat" />
  </router-view>
  <div
    ref="main"
  >
    <!-- 简介 -->
    <!-- <Introduction v-if="chatStore.questionList.length === 0"/> -->
    <!-- 问答列表 -->
    <!-- <div
        v-for="(item,index) in chatStore.questionList" 
        class="md:w-1/2 w-11/12 mx-auto my-5 transition ease-in-out duration-200 relative">
        <img src="../../assets/questionUser.png" class="absolute -left-10 w-10 hidden md:block"/>
        <div class="mx-auto w-full md:w-[50vw] flex md:justify-start justify-end">
          <div class="bg-blue-500 rounded-lg text-white px-3 py-3 text-sm md:text-base">
            <span>{{ item.question }}</span>
          </div>
        </div>
        <div class="relative">
          <img 
            v-if="index === chatStore.questionList.length - 1" src="../../assets/model.png" 
            class="absolute -left-10 top-14 w-10 hidden md:block"/>
          <img 
            v-else src="../../assets/modelDone.png"  
            class="absolute -left-10 top-14 w-10 hidden md:block"/>
          <el-tabs 
            v-model="item.activeAnswer" class="mx-auto md:w-[50vw]"
            @tab-change="changeActiveAnswer(item.question,item.activeAnswer,index)">
            <el-tab-pane :disabled="currentStatus === 'doing'" v-for="mode in modeList" :label="mode.label" :name="mode.value">
              <div class="bg-gray-100 rounded-lg max-w-2/3 px-3 py-3">
                <IconFire v-if="item[mode.value].content==='' && item[mode.value].status === 'close'"/>
                <IconFire class="animate-pulse" v-else-if="item[mode.value].content===''"/>
                <el-text class="answer mx-10 text-black" size="large" v-html="item[mode.value].content"></el-text>
              </div>
            </el-tab-pane>
            <div class="w-full h-6 relative mt-1">
              <div class="absolute left top-0 text-blue-400 text-sm hover:text-gray-400">
                <button 
                  v-if="chatStore.questionList[index][item.activeAnswer].status === 'doing'"
                  @click="closeQuestion(item.activeAnswer,index)">停止生成
                </button>
                <button 
                  v-else-if="chatStore.questionList[index][item.activeAnswer].status === 'done'&&currentStatus!=='doing'" 
                  @click="reQuestion(item.question,item.activeAnswer,index)">
                  重新生成
                </button>
                <button 
                  v-else-if="chatStore.questionList[index][item.activeAnswer].status === 'close'" 
                  @click="reQuestion(item.question,item.activeAnswer,index)"
                  class="text-gray-400">
                  已停止
                </button>
              </div>
              <div class="absolute right-0 top-0 flex gap-2">
                <span @click = "copyText(chatStore.questionList[index][item.activeAnswer].text)"><IconCopy /></span>
                <span><IconLike /></span>
                <span><IconDislike /></span>
              </div>
            </div>
          </el-tabs>
        </div>
      </div> -->
  </div>
  <Input v-model:input="input" />
  <!-- </div> -->
  <!-- 上传语料弹窗 -->
  <!-- <UploadPopup 
    v-model:isShow="dialogFormVisible" v-model:file-list="fileList"
  /> -->
  <!-- 清除数据弹窗 -->
  <!-- <el-dialog v-model="dialogClearVisible" destroy-on-close title="清除语料数据，请谨慎操作" width="500">
    <el-text>
      <el-icon color="orange"><WarningFilled /></el-icon>是否确定清除? 清除后无法恢复
    </el-text>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelClearData">取消</el-button>
        <el-button type="primary" @click="clearData">确认</el-button>
      </div>
    </template>
  </el-dialog> -->
</template>

<style scoped lang="scss">
.main {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 3px; /* 滚动条宽度 */
  }
  &::-webkit-scrollbar-track {
    /* 滚动条轨道样式 */
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /* 滚动条滑块样式 */
    background-color: #9c9c9c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    /* 滑块在hover时的样式 */
    background-color: #aaa;
  }
}
.answer {
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  @media (min-width: 768px) {
    font-size: 1rem; /* 16px */
    line-height: 1.5rem; /* 24px */
  }
  :deep(h1) {
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  }
  :deep(h2) {
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }
  :deep(h3) {
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
  :deep(h4) {
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
  :deep(h5) {
    font-size: 1rem;
    font-weight: 600;
  }
  :deep(p) {
    margin: 0.3rem 0;
  }
}
</style>
