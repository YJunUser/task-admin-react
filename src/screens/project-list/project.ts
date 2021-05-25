import { getProject } from "api/project-list";
import { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "../../utils/type";
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
  // const { run, ...asyncResult } = useAsync();
  // const mutate = async (params: Partial<Project>) => {
  //   return run(editProject(params));
  // };
  // return { mutate, asyncResult };
  const queryClient = useQueryClient();
  return useMutation(
    async (params: Partial<Project>) => {
      const res = await editProject(params);
      return res.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   run(addProject(params));
  // };
  // return { mutate, asyncResult };
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
