import React from "react";
import { useUser } from "screens/project-list/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { users } = useUser();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
