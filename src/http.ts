import axios from "axios"

export const http = axios.create({
  baseURL: "http://47.100.198.147:7001/api",
  // baseURL: "http://5eed5804.r12.cpolar.top/api",
});
// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码触发该函数。
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码触发该函数。
    return Promise.reject(error);
});
  