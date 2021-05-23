import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "../screens/project-list/project-list.slice";
import { authSlice } from "./auth.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

/**
 * function createStore(state, stateChanger) {
  const getState = () => state;
  const dispatch = (action) => stateChanger(state, action) // stateChange也就是reducer: (state, action) => newState
 

   // 订阅函数
  const subscribe = (listener) => {
    listeners.push(listener)
  } 
  const dispatch = (action) => {
    reducer(state, action);
    // 数据已发生改变就把所有的listener跑一遍, 重新渲染界面
    listeners.forEach((listener) => {
      listener()
    })
  }

   return {getState, dispatch, subscribe}
}

const store = createStore(appState, stateChanger)
// 监听数据变化，每次数据改变都会自动执行renderApp
store.subscribe(() => renderApp(store.getState())) 

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《Redux》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
 */

/**
 * dispatch 作为一个重点函数~ 其实它的作用就是触发状态的改变。

参数：action(object),它是一个描述发生了什么的对象，其中type是必须的属性。

返回：这个传入的object
 */
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
