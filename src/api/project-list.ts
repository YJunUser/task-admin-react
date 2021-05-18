import http, { ResponseData } from "./index";
import { AxiosPromise, AxiosResponse } from "axios";
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

export const getUsers = (): Promise<AxiosResponse<UserLogin[]>> => {
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

export const editProject = (
  params: Partial<Project>
): Promise<AxiosResponse<ResponseData>> => {
  return http.request({
    url: `projects/${params.id}`,
    method: "PATCH",
    data: params,
  });
};

export const addProject = (
  params: Partial<Project>
): Promise<AxiosResponse<ResponseData>> => {
  return http.request({
    url: `projects/${params.id}`,
    method: "POST",
    data: params,
  });
};
