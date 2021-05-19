import { getProject } from "api/project-list";
import { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "../../utils/type";
import { editProject, addProject } from "../../api/project-list";

export const useProject = (
  param: Partial<Pick<Project, "name" | "personId" | "pin">>
) => {
  const { run, isLoading, data: list, error, retry } = useAsync<Project[]>();

  const fetchProjects = useCallback(() => getProject(param), [param]);

  useEffect(() => {
    run(fetchProjects(), { retry: () => getProject(param) });
  }, [param, run, fetchProjects]);

  return {
    isLoading,
    list,
    error,
    retry,
  };
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = async (params: Partial<Project>) => {
    return run(editProject(params));
  };
  return { mutate, asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    run(addProject(params));
  };
  return { mutate, asyncResult };
};
