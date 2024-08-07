<script setup lang="ts">
import { ref, watch } from "vue";
import type { Mode } from "@/types/qa.d.ts";
import { useChatStore } from "@/stores/chat";
import UploadPopup from "./UploadPopup.vue";

const chatStore = useChatStore();
const input = defineModel<string>("input");

const dialogFormVisible = ref(false);
const feedData = () => {
  dialogFormVisible.value = true;
};

// 发送问题
const sendQuestion = async () => {
  console.log(input.value)
  const question = input.value as string
  input.value = ""
  if (question === "" || chatStore.chatStatus === "doing") return
  chatStore.questionList.push({
    question: question,
    rawAnswer: { content: "", text: "", status: "undo" },
    enhancedAnswer: { content: "", text: "", status: "undo" },
    similarText: { content: "", text: "", status: "undo" },
    activeAnswer: chatStore.chatMode,
  });
  // scroll(main.value!)
  chatStore.getAnswer(
    question,
    chatStore.chatMode,
    chatStore.questionList.length - 1
  );
};
defineEmits(["sendQuestion"]);
</script>

<template>
  <div class="index-100 fixed bottom-0 h-[120px] md:h-[130px] w-full">
    <div class="flex flex-wrap justify-between md:w-1/2 w-11/12 mx-auto mb-2">
      <div class="flex gap-px sm:gap-1 mb-2">
        <button
          v-for="item in chatStore.modeList"
          :class="
            chatStore.chatMode == item.value
              ? 'bg-[#253c8e] text-white'
              : 'border border-[#253c8e] text-[#253c8e] bg-white'
          "
          class="transition duration-300 lg:px-4 px-1 py-1 rounded text-xs sm:text-sm"
          @click="chatStore.chatMode = item.value"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="bg-white py-3 px-2 flex flex-between rounded-lg w-full">
        <el-tooltip effect="light" content="投喂语料" placement="top">
          <button
            @click="feedData"
            class="transition duration-300 ease-in-out scale-75 md:scale-100 text-white mr-1"
          >
            <svg
              t="1722782573555"
              class="fill-[#858585]"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5883"
              data-spm-anchor-id="a313x.search_index.0.i3.70373a81qe5Cy7"
              width="30"
              height="30"
            >
              <path
                d="M791.96 978.54H232.04c-60.76 0-110.18-49.43-110.18-110.18V155.64c0-60.76 49.43-110.18 110.18-110.18h409.47c38.98 0 76.13 16.78 101.9 46.03l124.82 141.65a135.735 135.735 0 0 1 33.91 89.79v545.43c0 60.76-49.43 110.18-110.18 110.18zM232.04 118.52c-20.47 0-37.12 16.65-37.12 37.12v712.72c0 20.47 16.65 37.12 37.12 37.12h559.92c20.47 0 37.12-16.65 37.12-37.12V322.93c0-15.28-5.57-30.02-15.67-41.49L688.59 139.79a62.796 62.796 0 0 0-47.08-21.27H232.04z"
                p-id="5884"
                data-spm-anchor-id="a313x.search_index.0.i1.70373a81qe5Cy7"
                class="selected"
              ></path>
              <path
                d="M867.49 360.56H717.04c-60.76 0-110.18-49.43-110.18-110.18V79.55h73.06v170.83c0 20.47 16.65 37.12 37.12 37.12h150.45v73.06z"
                fill="#8a8a8a"
                p-id="5885"
                data-spm-anchor-id="a313x.search_index.0.i2.70373a81qe5Cy7"
                class="selected"
              ></path>
              <path
                d="M363.69 660.42c14.27 14.27 37.4 14.27 51.66 0l60.49-60.49v175.65c0 20.18 16.36 36.53 36.53 36.53 20.18 0 36.53-16.36 36.53-36.53V600.67l59.75 59.75c14.27 14.27 37.4 14.27 51.66 0 14.27-14.27 14.27-37.4 0-51.66L538.2 486.65c-7.23-7.23-16.73-10.79-26.2-10.69-9.47-0.1-18.98 3.46-26.2 10.69L363.69 608.76c-14.27 14.27-14.27 37.4 0 51.66z"
                p-id="5886"
                data-spm-anchor-id="a313x.search_index.0.i0.70373a81qe5Cy7"
                class="selected"
              ></path>
            </svg>
          </button>
        </el-tooltip>
        <input
          v-model="input"
          class="bg-transparent focus:outline-none md:w-11/12 w-5/6"
          @keyup.enter="sendQuestion"
          placeholder="请输入你的问题或关键词"
        />
        <button
          :disabled="input!.length === 0 || chatStore.chatStatus === 'doing'"
          @click="sendQuestion"
          class="transition duration-300 ease-in-out scale-75 md:scale-100"
        >
          <svg
            t="1715924109995"
            class=""
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="22200"
            width="30"
            height="30"
          >
            <path
              d="M917.333333 473.6l-763.733333-384c-38.4-17.066667-81.066667 17.066667-64 55.466667l106.666667 285.866666L682.666667 512 196.266667 593.066667l-106.666667 285.866666c-12.8 38.4 25.6 72.533333 64 51.2l763.733333-384c29.866667-12.8 29.866667-55.466667 0-72.533333z"
              p-id="22201"
              :fill="
                input && chatStore.chatStatus !== 'doing' ? '#467cfd' : 'grey'
              "
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="w-screen text-center text-gray-600 text-xs md:text-sm">
      内容由AI生成，基于{{ chatStore.title }}
    </div>
  </div>
  <!-- 上传语料弹窗 -->
  <UploadPopup v-model:isShow="dialogFormVisible" />
</template>
