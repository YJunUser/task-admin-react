import React from "react";
import { useState, ReactNode } from "react";
import * as auth from "auth-provider";
import { UserLogin } from "utils/type";
import { getMe } from "../api/project-list";
import { useMount } from "../utils/index";

interface AuthForm {
  username: string;
  password: string;
}

const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    await getMe(token).then((res) => {
      const data = res.data;
      user = data;
    });
  }
  return user;
};
const AuthContext = React.createContext<
  | {
      user: UserLogin | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserLogin | null>(null);

  const login = (form: AuthForm) => {
    return auth.login(form).then((user) => setUser(user));
  };
  const register = (form: AuthForm) => {
    return auth.register(form).then((user) => setUser(user));
  };
  const logout = () => {
    return auth.logout().then((user) => setUser(null));
  };

  useMount(() => {
    boostrapUser().then((user) => setUser(user));
  });

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
