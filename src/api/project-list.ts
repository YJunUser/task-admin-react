import http, { ResponseData } from "./index";
import { AxiosPromise } from "axios";
import { Project, UserLogin, Users } from "utils/type";

interface User {
  name: string;
  personId: string;
  token: string;
}

export const getProject = (
  data: Pick<User, "name" | "personId">
): AxiosPromise<Project[]> => {
  return http.request({
    url: `/projects`,
    method: "get",
    params: data,
  });
};

export const getUsers = (): AxiosPromise<Users> => {
  return http.request({
    url: "/users",
    method: "get",
  });
};

export const getMe = (token: string): AxiosPromise<UserLogin> => {
  return http.request({
    url: "/me",
    method: "get",
    params: { token },
  });
};
