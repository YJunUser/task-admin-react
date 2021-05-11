import { getUsers } from "api/project-list";
import { useState } from "react";
import { useMount } from "utils";

export const useUser = () => {
  const [users, setUsers] = useState<any>([]);

  useMount(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  });
  return {
    users,
  };
};
