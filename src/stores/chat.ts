import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { deleteQuestion, postSimilarText, source } from "@/services/qa";
import type { Mode } from "@/types/qa.d.ts";
import { marked } from "@/utils/marked";
import markdownToTxt from "markdown-to-txt";
interface Answer {
  content: string;
  text: string;
  status: string;
}
export const useChatStore = defineStore(
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
    const ws = ref<WebSocket>();
    const getAnswer = async (question: any, mode: Mode, index: number) => {
      questionList.value[index][mode].status = "doing";
      chatStatus.value = "doing";
      console.log(questionList.value[index][mode].status);
      if (mode === "similarText") {
        const result = await postSimilarText(question);
        // console.log(result.similar_texts);
        questionList.value[index].similarText.text = markdownToTxt(
          result.similar_texts
        );
        questionList.value[index].similarText.content = await marked.parse(
          result.similar_texts
        );
        questionList.value[index].similarText.status = "done";
        chatStatus.value = "done";
        // if ( questionList.value[questionList.value.length - 1].similarText.status === "done") {
        //   scroll(main.value!);
        // }
        return;
      }
      if (mode === "enhancedAnswer") {
        ws.value = new WebSocket(
          "ws://5eed5804.r12.cpolar.top/api/enhance_socket"
        );
      } else if (mode === "rawAnswer") {
        ws.value = new WebSocket("ws://5eed5804.r12.cpolar.top/api/raw_socket");
      }
      const sendMessage = () => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
          ws.value.send(`{ "query":"${question}" }`);
        } else {
          console.error("WebSocket is not connected");
        }
      };
      ws.value!.onopen = (event: any) => {
        console.log("WebSocket connection opened:", event);
        sendMessage();
      };
      ws.value!.onmessage = async (event: any) => {
        // console.log("WebSocket message received:", event.data);
        if (event.data === JSON.stringify({ ans: "DONE" })) {
          questionList.value[index][mode].status = "done";
          chatStatus.value = "done";
          return;
        }
        questionList.value[index][mode].text = markdownToTxt(event.data);
        questionList.value[index][mode].content = await marked.parse(
          event.data
        );
        // if (
        //   questionList.value[questionList.value.length - 1][mode].status ===
        //   "doing"
        // ) {
        //   scroll(main.value!);
        // }
      };
      ws.value!.onclose = (event: any) => {
        console.log("WebSocket connection closed:", event);
      };
    };
    return {
      title,
      ws,
      chatMode,
      chatStatus,
      modeList,
      questionList,
      newQuestion,
      getAnswer,
    };
  }
);
