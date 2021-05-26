import { getProject } from "api/project-list";
import { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "../../utils/type";
import { useProjectsSearchParam } from "./util";
import { useSearchParams } from "react-router-dom";
import { useEditConfig } from "../../utils/use-optimistic-options";
import {
  editProject,
  addProject,
  getProjectById,
} from "../../api/project-list";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  useMutation,
} from "react-query";

export const useProject = (param?: Partial<Project>) => {
  // const { run, isLoading, data: list, error, retry } = useAsync<Project[]>();

  // const fetchProjects = useCallback(() => getProject(param || {}), [param]);

  // useEffect(() => {
  //   run(fetchProjects(), { retry: () => getProject(param || {}) });
  // }, [param, run, fetchProjects]);

  // return {
  //   isLoading,
  //   list,
  //   error,
  //   retry,
  // };

  // key变化的时候useQuery就会重新触发, 所以这里加上param

  return useQuery<Project[], Error>(["projects", param], async () => {
    const res = await getProject(param || {}); // 如果不用await 返回的是AxiosPromise<Project []> 即 Promise<AxiosResponse<Project[]>>, 用了后， 就成了 AxiosResponse<Project[]>
    return res.data;
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParam();
  const queryKey = ["projects", searchParams];
  return useMutation(
    // variables is an object that mutate will pass to your mutationFn
    async (params: Partial<Project>) => {
      const res = await editProject(params);
      return res.data;
    },
    useEditConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries(["projects", param]),
    //   // This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
    //   // 在mutate完成前触发，接受和mutate一样的参数
    //   async onMutate(target: Partial<Project>) {
    //     const previousItems = queryClient.getQueryData(["projects", param]);
    //     queryClient.setQueryData(["projects", param], (old?: Project[]) => {
    //       const newV =
    //         old?.map((project) =>
    //           project.id === target.id ? { ...project, ...target } : project
    //         ) || [];
    //       return newV;
    //     });
    //     return { previousItems };
    //   },
    //   // This function will fire if the mutation encounters an error and will be passed the error.
    //   // If a promise is returned, it will be awaited and resolved before proceeding
    //   onError(error: Error, newItems: Partial<Project>, context: any) {
    //     // 回滚
    //     queryClient.setQueryData(["projects", param], context.previousItems);
    //   },
    // }
  );
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: Partial<Project>) => {
      const res = await addProject(params);
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProjectById = (id?: number) => {
  return useQuery<Project>(
    ["project", { id }],
    async () => {
      const res = await getProjectById(id);
      return res.data;
    },
    {
      enabled: !!id,
    }
  );
};
