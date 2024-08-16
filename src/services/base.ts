import { http } from "../utils/http";

/**
 * 新建知识库
 * @param
 */
export const postCreateBase = (
  account: string,
  name: string,
  synopsis: string,
): any => {
  return http.post("/api/db/psl/create_db", {
    collection_synopsis: synopsis,
    account: account,
    partition_nickname: name,
  });
};