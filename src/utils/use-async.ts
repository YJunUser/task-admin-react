import { useState, useEffect } from "react";
import { AxiosPromise, AxiosResponse } from "axios";

interface State<D> {
  error: Error | null; // 返回的错误
  data: D | null; // 返回的数据
  stat: "idle" | "loading" | "error" | "success"; // idle代表还没发生
}

const defaultIntialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defualtConcfig = {
  throwError: false,
};

export const useAsync = <D>(
  intial?: State<D>,
  intialConfig?: typeof defualtConcfig
) => {
  const config = { ...defualtConcfig, ...intialConfig };
  const [state, setState] = useState<State<D>>({
    ...intial,
    ...defaultIntialState,
  });

  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  };

  const setData = (data: D) => {
    setState({
      error: null,
      data,
      stat: "success",
    });
  };

  // AxiosPromise 是axios请求第一次返回的值，包含6个字段，其中data字段是我们需要的，泛型D表示data类型
  const run = (promise: AxiosPromise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型");
    }
    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((res: AxiosResponse<D>) => {
        if (res) {
          setData(res.data);
        }
        return res.data;
      })
      .catch((error) => {
        if (error) {
          setError(error);
        }

        // catch会消化异常，如果不主动抛出，外面是接受不到的
        if (config.throwError) {
          return Promise.reject(error);
        } else {
          return error; // 不抛出
        }
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    ...state,
    run,
    setData,
    setError,
  };
};
