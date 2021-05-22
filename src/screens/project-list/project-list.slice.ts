import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/index";

// 一个切片维护一个状态树
interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice", // 表示slice本身
  initialState, // slice切片状态的默认状态
  // reducer依然是纯洁没有副作用
  reducers: {
    openProjectModal(state) {
      // 为什么可以直接给state赋值，而不是返回一个新对象呢(usereducer)?
      // redux比较机制，a.name = 'dad' a === a true 这里reduxtoolkit借助了immer处理了， 它会创建一个新对象，将行为映射到新对象上，然后再返回
      // 所以我们没有违反纯函数原则
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModelOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
