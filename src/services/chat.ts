import axios from "axios";
import { useChatStore } from "@/stores/chat";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { http } from "../utils/http";
export let source: any;
/**
 * 获取相似文本
 * @param question 问题
 */
export const postSimilarText = (question: string): any => {
  const chatStore = useChatStore();
  source = axios.CancelToken.source();
  return http.post(
    "http://39e0775c.r29.cpolar.top/api/similartext/",
    {
      query: question,
      account: userStore.user.account,
      type: userStore.user.type,
      pid: chatStore.currentBase,
    },
    {
      cancelToken: source.token,
    }
  );
};
export const deleteQuestion = (): any => {
  return http.delete("/delete/");
};
