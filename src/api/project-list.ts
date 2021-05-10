import http, { ResponseData } from "./index";
import { AxiosPromise } from "axios";

interface User {
  name: string;
  personId: string;
  token: string;
}

interface Project {
  created?: number;
  id: number;
  name: string;
  organization: string;
  ownerId: number;
  personId?: number;
}

export const getProject = (
  data: Pick<User, "name" | "personId">
): AxiosPromise<ResponseData<Project>> => {
  return http.request({
    url: `/projects`,
    method: "get",
    params: data,
  });
};

export const getUsers = (): AxiosPromise<ResponseData<Project>> => {
  return http.request({
    url: "/users",
    method: "get",
  });
};

export const getMe = (token: string): AxiosPromise<ResponseData<User>> => {
  return http.request({
    url: "/me",
    method: "get",
    params: { token },
  });
};
