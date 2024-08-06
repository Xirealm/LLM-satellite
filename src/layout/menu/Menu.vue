<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "@/stores/chat";
import History from "@/components/History.vue";
const chatStore = useChatStore();
const isHistoryOpen = ref(false);
</script>

<template>
  <div
    class="md:flex hidden bg-[#f2f2f2] w-[240px] h-full fixed flex-col items-center shadow-xl"
  >
    <h2 class="flex items-center text-[#28449C] font-bold mt-8 mb-2">
      <img
        src="../../assets/image/satellite.svg"
        class="h-[24px]"
      />小卫星私域大模型
    </h2>
    <span class="text-gray-500 text-xs">当前版本：v1.0.1</span>
    <div
      class="flex bg-white my-5 flex-col w-4/5 h-36 justify-between py-4 px-6 items-start rounded-md"
    >
      <button class="w-full flex items-center" @click="chatStore.newQuestion">
        <span class="w-8"
          ><img src="../../assets/image/menu/talk.png" width="24" alt=""
        /></span>
        <span class="text-xs">新建对话</span>
      </button>
      <button class="w-full flex items-center" @click="isHistoryOpen = true">
        <span class="w-8"
          ><img src="../../assets/image/menu/history.png" width="24" alt=""
        /></span>
        <span class="text-xs">历史记录</span>
      </button>
      <button class="w-full flex items-center" @click="isHistoryOpen = true">
        <span class="w-8"
          ><img src="../../assets/image/menu/base.png" width="20" alt=""
        /></span>
        <span class="text-xs">知识库管理</span>
      </button>
    </div>
  </div>
  <History v-model="isHistoryOpen" />
</template>
