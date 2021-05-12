import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from "axios";
import * as auth from "auth-provider";

const apiBaseUrl = process.env.REACT_APP_API_URL;

// 服务端返回的数据格式(根据服务端协商)
export interface ResponseData<T = any> {
  // data?: T,
  // code?: number,
  // msg?: string,
  [propName: string]: T;
}

class HttpRequest {
  constructor(
    public baseUrl: string | undefined = apiBaseUrl,
    public timeout: number = 5000
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create(); // 创建实例
    options = this.mergeConfig(options); // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    this.interceptors(instance, options.url); // 调用interceptors方法使拦截器生效
    return instance(options);
  }

  private interceptors(instance: AxiosInstance, url?: string) {
    // 在这里添加请求和响应拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
        // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
        let token = auth.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      async (res: AxiosResponse) => {
        console.log(res);

        const { data } = res; // res的类型是AxiosResponse<any>，包含六个字段，其中data是服务端返回的数据
        const { code, msg } = data; // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
        if (code === 401) {
          await auth.logout();
          window.location.reload();
          return Promise.reject({ message: "请重新登录" });
        } else {
          return res;
        }
      },
      (error) => {
        console.log(error.message);
        return Promise.reject(error);
      }
    );
  }

  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    // 这个方法用于合并基础路径配置和接口单独配置
    return { ...options, baseURL: this.baseUrl, timeout: this.timeout };
  }
}

export default HttpRequest;
// const service = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   timeout: 5000,
// });

// service.interceptors.request.use(
//   (config) => {
//     let token = auth.getToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// service.interceptors.response.use(
//   async (response) => {
//     const { data } = response;
//     if (data.code === 401) {
//       await auth.logout();
//       window.location.reload();
//       return Promise.reject({ message: "请重新登录" });
//     } else {
//       return data;
//     }
//     // if (response.status === 200) {
//     //   return response;
//     // } else {
//     //   await auth.logout();
//     //   window.location.reload();
//     //   return Promise.reject({ message: "请重新登录" });
//     // }
//   },
//   (error) => {
//     console.log(error.response.data);
//     return Promise.reject(error);
//   }
// );

// export default service;
