import { useState, useEffect, useCallback, useReducer } from "react";
import { AxiosPromise, AxiosResponse } from "axios";
import { useMountedRef } from "./index";
import { Project } from "./type";

// useState适合于单个状态， useReducer适合于多个且复杂的状态
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

// 函数柯里化 arguments变量还记得吗
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  intial?: State<D>,
  intialConfig?: typeof defualtConcfig
) => {
  const config = { ...defualtConcfig, ...intialConfig };
  // useState或者setState参数为函数时，不会保存函数，而是在初次渲染时执行，返回一个state的值，详情见reactapi惰性初始化
  // 所以如果我们要保存函数，就在要保存函数的外面再加一层函数 React.useState(() => () => {return '这是我们要保存的函数'}),
  // 或者用useRef const callbackRef = useRef(() => alert('init')) const callback = callbackRef.current 注意对useRef修改不会触发组件重新渲染
  // const [state, setState] = useState<State<D>>({
  //   ...intial,
  //   ...defaultIntialState,
  // });
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...intial,
      ...defaultIntialState,
    }
  );

  const [retry, setRetry] = useState(() => () => {});

  const safeDispatch = useSafeDispatch(dispatch);

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        data: null,
        stat: "error",
      });
    },
    [safeDispatch]
  );
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        error: null,
        data,
        stat: "success",
      });
    },
    [safeDispatch]
  );

  // AxiosPromise 是axios请求第一次返回的值，包含6个字段，其中data字段是我们需要的，泛型D表示data类型 AxiosPromise extends Promise<AxiosResponse>
  // 需要非基本类型做依赖时， 用useCallback或者useMemo
  // 自定义hook中，返回函数时绝大概率要用useCallback
  const run = useCallback(
    (
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
      // 我们不能依赖state，这样会造成无限循环，state改变后依赖改变，引起重新渲染
      // setState({
      //   ...state,
      //   stat: "loading",
      // });
      safeDispatch({ stat: "loading" });

      return promise
        .then((res: AxiosResponse<D>) => {
          if (res) {
            // 防止在已卸载组件上赋值这种情况, 即将已请求到的数据赋值给已卸载的数据，这样会报错
            // if (mountedRef.current) {
            //   setData(res.data);
            // }
            setData(res.data);
          }
          return res.data;
        })
        .catch((error) => {
          if (error) {
            // if (mountedRef.current) setError(error);
            setError(error);
          }

          // catch会消化异常，如果不主动抛出，外面是接受不到的
          if (config.throwError) {
            return Promise.reject(error);
          } else {
            return error; // 不抛出
          }
        });
    },
    [config.throwError, setData, setError, safeDispatch]
    // 依赖中的函数必须也用useCallback去定义, 依赖改变了就重新执行useCallback， 你在run里setState了，state就会改变， 所以如果要在回调里使用state，请使用函数state方法
  );

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
