import { getProject } from "api/project-list";
import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "../../utils/type";

export const useProject = (
  param: Partial<Pick<Project, "name" | "personId">>
) => {
  const { run, isLoading, data: list, error } = useAsync<Project[]>();

  useEffect(() => {
    run(getProject(param));
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [param]);
  return {
    isLoading,
    list,
    error,
  };
};
