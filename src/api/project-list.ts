import http, { ResponseData } from "./index";
import { AxiosPromise } from "axios";
import { Project, UserLogin, Users } from "utils/type";

export const getProject = (
  data: Partial<Pick<Project, "name" | "personId">>
): AxiosPromise<Project[]> => {
  return http.request({
    url: `/projects`,
    method: "get",
    params: data,
  });
};

export const getUsers = (): AxiosPromise<ResponseData<Users>> => {
  return http.request({
    url: "/users",
    method: "get",
  });
};

export const getMe = (token: string): AxiosPromise<ResponseData<UserLogin>> => {
  return http.request({
    url: "/me",
    method: "get",
    params: { token },
  });
};
