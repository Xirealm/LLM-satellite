import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { Mode } from "@/types/qa.d.ts";
interface Answer {
  content: string;
  text: string;
  status: string;
}
export const useQaStore = defineStore(
  "chat",
  () => {
    const title = ref("小卫星私域专属大模型");
    const chatMode = ref<Mode>("enhancedAnswer");
    const modeList = ref<{ label: "相似文本" | "增强回答" | "原始回答"; value: Mode }[]>([
      { label: "增强回答", value: "enhancedAnswer" },
      { label: "相似文本", value: "similarText" },
      { label: "原始回答", value: "rawAnswer" },
    ]);
    const chatStatus = ref<"undo"|"doing"|"done">("undo")
    const main = ref<HTMLElement>();
    const questionList = ref<
      {
        question: string;
        rawAnswer: Answer;
        enhancedAnswer: Answer;
        similarText: Answer;
        activeAnswer: "similarText" | "enhancedAnswer" | "rawAnswer";
      }[]
    >([]);
    //新建聊天
    const newQuestion = () => {
      questionList.value = [];
    };
    const scroll = (element: HTMLElement) => {
      setTimeout(() => {
        element.scrollBy({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }, 10);
    };
    return {
      title,
      chatMode,
      chatStatus,
      modeList,
      questionList,
      newQuestion,
    };
  }
);
