import axios from "axios"
import { http } from "../http"
export let source:any
/**
 * 获取相似文本
 * @param question 问题
 */
export const postSimilarText = (question: string): any => {
  source = axios.CancelToken.source();
  return http.post(
    "/similartext/",
    {
      query: question,
    },
    {
      cancelToken: source.token,
    }
  );
}
export const deleteQuestion = ():any => {
  return http.delete("/delete/")
}