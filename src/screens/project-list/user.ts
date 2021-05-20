import { getUsers } from "api/project-list";
import { useState } from "react";
import { useMount } from "utils";
import { UserLogin } from "utils/type";
import { useMountedRef } from "../../utils/index";
import { useAsync } from "../../utils/use-async";

export const useUser = () => {
  // const [users, setUsers] = useState<any>([]);
  const { run, data: users } = useAsync<UserLogin[]>();

  useMount(() => {
    run(getUsers());
  });
  return {
    users,
  };
};
