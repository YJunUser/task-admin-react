import http, { ResponseData } from "./index";
import { UserLogin } from "utils/type";
import { AxiosPromise } from "axios";

// 请求携带参数
interface LoginInformation {
  username: string;
  password: string | number;
}

export const userLogin = (
  data: LoginInformation
): AxiosPromise<ResponseData<UserLogin>> => {
  return http.request({
    url: `/login`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
};

export const userRegister = (
  data: LoginInformation
): AxiosPromise<ResponseData<UserLogin>> => {
  return http.request({
    url: `/register`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
};
