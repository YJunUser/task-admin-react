// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { User } from "utils/type";
import { userLogin, userRegister } from "api/auth";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return userLogin(data)
    .then((res) => {
      const data = res.data.user;
      return handleUserResponse(data);
    })
    .catch((error) => Promise.reject(error));
  // .then((res: AxiosResponse<responUser>) => {
  //     const data = res.data;
  //     return handleUserResponse(data.user);
  //   })
  //   return fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //       return handleUserResponse(await response.json());
  //     } else {
  //       return Promise.reject(await response.json());
  //     }
  //   });
};

export const register = (data: { username: string; password: string }) => {
  return userRegister(data)
    .then((res: any) => {
      const data = res.data.user;
      return handleUserResponse(data);
    })
    .catch((error) => Promise.reject(error));
  //   return fetch(`${apiUrl}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //       return handleUserResponse(await response.json());
  //     } else {
  //       return Promise.reject(await response.json());
  //     }
  //   });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
