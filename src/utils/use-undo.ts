import React, {
  Reducer,
  ReducerWithoutAction,
  useReducer,
  useState,
} from "react";
import { useCallback } from "react";

// 在TypeScript中，typeof操作符可以用来获取一个变量或对象的类型。
const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESEET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
// 用useReducer来管理
// useReducer中state是最新的
const reducer = <T>(state: State<T>, action: Action<T>) => {
  switch (action.type) {
    case UNDO: {
      const { past, present, future } = state;
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      const { past, present, future } = state;
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);
      const newPast = [...past, present];

      return {
        past: newPast,
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      const { past, present, future } = state;
      if (action.newPresent === present) return state;
      return {
        past: [...past, present],
        present: action.newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: action.newPresent,
        future: [],
      };
    }
    default:
      throw new Error("type is not exist");
  }
};

export const useUndo = <T>(intialValue: T) => {
  // 用泛型或者类型断言都行
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: intialValue,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    // dispatch就是调用reducer函数，传入action参数
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
// export const useUndo = <T>(initialValue: T) => {
//   // 对于复杂的state操作逻辑，嵌套的state的对象，推荐使用useReducer。
//   const [state, setState] = useState<{
//     past: T[];
//     present: T;
//     future: T[];
//   }>({
//     past: [],
//     present: initialValue,
//     future: [],
//   });

//   const canUndo = state.past.length !== 0;
//   const canRedo = state.future.length !== 0;

//   const undo = useCallback(
//     () =>
//       setState((currentState) => {
//         const { past, present, future } = currentState;
//         if (past.length === 0) return currentState;

//         const previous = past[past.length - 1];
//         const newPast = past.slice(0, past.length - 1);

//         return {
//           past: newPast,
//           present: previous,
//           future: [present, ...future],
//         };
//       }),
//     []
//   );

//   const redo = useCallback(() => {
//     setState((currentState) => {
//       const { past, present, future } = currentState;
//       if (future.length === 0) return currentState;

//       const next = future[0];
//       const newFuture = future.slice(1);
//       const newPast = [...past, present];

//       return {
//         past: newPast,
//         present: next,
//         future: newFuture,
//       };
//     });
//   }, []);

//   const set = useCallback((value: T) => {
//     setState((currentState) => {
//       const { past, present, future } = currentState;
//       if (value === present) return currentState;
//       return {
//         past: [...past, present],
//         present: value,
//         future: [],
//       };
//     });
//   }, []);

//   const reset = useCallback((value: T) => {
//     setState(() => {
//       return {
//         past: [],
//         present: value,
//         future: [],
//       };
//     });
//   }, []);

//   return [state, { set, reset, undo, redo, canUndo, canRedo }];
// };
