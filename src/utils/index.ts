import { useEffect, useRef, useState, useCallback } from "react";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);
};

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepUnMount: boolean = true
) => {
  // let oldTitle = document.title;
  // useRef来跨越渲染周期存储数据，而且对它修改也不会引起组件渲染
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  });

  // // 空数组代表只在最初渲染时执行一次，最初时oldTtile是旧Title，于是闭包把旧title保存起来了
  // useEffect(() => {
  //   return () => {
  //     if (!keepUnMount) {
  //       document.title = oldTitle;
  //     }
  //   };
  // }, []);
  useEffect(() => {
    return () => {
      if (!keepUnMount) {
        document.title = oldTitle;
      }
    };
  }, [keepUnMount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
