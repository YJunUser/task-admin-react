import { UserLogin } from "utils/type";
import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provider";
import { AppDispatch, RootState } from "./index";
import { getMe } from "../api/project-list";

interface AuthForm {
  username: string;
  password: string;
}

interface State {
  user: UserLogin | null;
  //   login: (form: AuthForm) => Promise<void>;
  //   register: (form: AuthForm) => Promise<void>;
  //   logout: () => Promise<void>;
}

const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    await getMe(token).then((res) => {
      const data = res.data.user;
      user = data;
    });
  }
  return user;
};

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const boostrap = () => (dispatch: AppDispatch) =>
  boostrapUser().then((user) => dispatch(setUser(user)));

export const selectUser = (state: RootState) => state.auth.user;
