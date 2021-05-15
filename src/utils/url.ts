import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, cur) => {
          return { ...prev, [cur]: searchParam.get(cur) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParam]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
    // reduce 返回的类型是根据初始值类型来的
  ] as const;
};
