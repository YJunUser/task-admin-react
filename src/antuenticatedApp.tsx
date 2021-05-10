import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ProjectListScreen></ProjectListScreen>
      <button onClick={() => logout()}>登出</button>
    </div>
  );
};
