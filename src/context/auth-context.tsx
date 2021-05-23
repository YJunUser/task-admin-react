import React from "react";
import { useState, ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { UserLogin } from "utils/type";
import { getMe } from "../api/project-list";
import { useMount, useDocumentTitle } from "../utils/index";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullPageLoading } from "components/lib";
import { AxiosResponse, AxiosPromise } from "axios";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, boostrap } from "../store/auth.slice";

interface AuthForm {
  username: string;
  password: string;
}

// const AuthContext = React.createContext<
//   | {
//       user: UserLogin | null;
//       login: (form: AuthForm) => Promise<void>;
//       register: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);

// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<UserLogin | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<UserLogin | null>(undefined);

  // const login = (form: AuthForm) => {
  //   return auth.login(form).then((user) => {
  //     setUser(user);
  //   });
  // };

  // const register = (form: AuthForm) => {
  //   return auth.register(form).then((user) => setUser(user));
  // };

  // const logout = () => {
  //   return auth.logout().then((user) => setUser(null));
  // };

  // useMount(() => {
  //   boostrapUser().then((user) => setUser(user));
  // });

  const dispatch: (...args: unknown[]) => Promise<UserLogin> = useDispatch();

  useMount(() => {
    // run(boostrapUser() as Promise<AxiosResponse>);
    run(dispatch(boostrap()) as any);
  });

  if (isError) {
    return <FullPageError error={error}></FullPageError>;
  }

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  // return (
  //   <AuthContext.Provider
  //     value={{ user, login, register, logout }}
  //     children={children}
  //   ></AuthContext.Provider>
  // );
  return <div>{children}</div>;
};

export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  const dispatch: (...args: unknown[]) => Promise<UserLogin> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  // return context;
  return {
    user,
    login,
    register,
    logout,
  };
};
