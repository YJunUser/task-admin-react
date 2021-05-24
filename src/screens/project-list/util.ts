import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useProjectById } from "./project";
import { editProject } from "../../api/project-list";

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

export const useProjectModal = () => {
  const [
    { projectCreate, editingProjectId },
    setProjectCreate,
  ] = useUrlQueryParam(["projectCreate", "editingProjectId"]);

  // const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
  //   "editingProjectId",
  // ]);

  const { data: editingProject, isLoading } = useProjectById(
    Number(editingProjectId)
  );

  const open = () =>
    setProjectCreate({ projectCreate: true, editingProjectId: undefined });

  const close = () => {
    // setEditingProjectId({ editingProjectId: undefined });
    setProjectCreate({
      projectCreate: undefined,
      editingProjectId: undefined,
    });
  };

  const startEdit = (id: number) =>
    setProjectCreate({ editingProjectId: id, projectCreate: undefined });

  //   return [projectCreate === "true", open, close] as const; // 返回tuple加个as const 返回tuple可以随便命名， 一般数据小于四个用tuple， 因为tuple有顺序，再多就用对象吧
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
