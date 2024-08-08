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
  <router-view v-slot="{ Component }">
    <component :is="Component" ref="chat" />
  </router-view>
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
</style>