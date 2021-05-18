import { useState, useEffect } from "react";
import { AxiosPromise, AxiosResponse } from "axios";
import { useMountedRef } from "./index";

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
  // useState或者setState参数为函数时，不会保存函数，而是在初次渲染时执行，返回一个state的值，详情见reactapi惰性初始化
  // 所以如果我们要保存函数，就在要保存函数的外面再加一层函数 React.useState(() => () => {return '这是我们要保存的函数'}),
  // 或者用useRef const callbackRef = useRef(() => alert('init')) const callback = callbackRef.current 注意对useRef修改不会触发组件重新渲染
  const [state, setState] = useState<State<D>>({
    ...intial,
    ...defaultIntialState,
  });
  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

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

  // AxiosPromise 是axios请求第一次返回的值，包含6个字段，其中data字段是我们需要的，泛型D表示data类型 AxiosPromise extends Promise<AxiosResponse>
  const run = (
    promise: Promise<AxiosResponse<D>>,
    runConfig?: { retry: () => Promise<AxiosResponse<D>> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型");
    }

    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((res: AxiosResponse<D>) => {
        if (res) {
          // 防止在已卸载组件上赋值这种情况, 即将已请求到的数据赋值给已卸载的数据，这样会报错
          if (mountedRef.current) {
            setData(res.data);
          }
        }
        return res.data;
      })
      .catch((error) => {
        if (error) {
          if (mountedRef.current) setError(error);
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
    retry,
    setRetry,
  };
};
