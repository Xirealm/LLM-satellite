import { http } from "../utils/http";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
/**
 * POST 新建个人知识库
 * 
 * @param name 知识库名称
 * @param synopsis 知识库简介
 */
export const postCreatePersonalBaseAPI = (
  name: string,
  synopsis: string,
): any => {
  return http.post("/api/db/psl/create_db", {
    partition_synopsis: synopsis,
    account: userStore.user.account,
    partition_nickname: name,
  });
};
/**
 * POST 新建公共知识库
 * 
 * @param
 */
export const postCreatePublicBaseAPI = (
  name: string,
  synopsis: string,
): any => {
  return http.post("/api/db/pub/create_db", {
    partition_synopsis: synopsis,
    account: userStore.user.account,
    partition_nickname: name,
  });
};
/**
 * GET 获取知识库列表
 * @param
 */
export const GetBaseListAPI = (
  page: number,
): any => {
  return http.get("/api/db/both/kdbrecords", {
    params: {
      page: page,
      account: userStore.user.account,
    },
  });
};
/**
 * GET 获取所有文件记录
 * @param
 */
export const GetAllFileRecordsAPI = (
  page: number,
): any => {
  return http.get("/api/db/psl/filerecords", {
    params: {
      page: 1,
      account: userStore.user.account,
    },
  });
};
