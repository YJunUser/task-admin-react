import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParam = () => {
  // 每次useUrlQueryParam中的reduce都创建了一个新的引用类型即param
  // useDebounce中的useEffect又依赖了param
  // 于是就会一直重复渲染， 不要将引用类型作为依赖项, 基本类型和组件状态可以作为依赖
  // 但useState中的state可以作为依赖项，因为state只有去用setState改变的时候react才会认为是更新了的
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 返回引用的时候一定要记得useMemo
  //   const projectParam = {
  //     ...param,
  //     personId: Number(param.personId) || undefined,
  //   };
  // as const 是很有必要的
  const memorized = useMemo(
    () => ({
      // 返回对象记得加括号
      ...param,
      personId: Number(param.personId) || undefined,
    }),
    [param]
  );
  return [memorized, setParam] as const;
};
