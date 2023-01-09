import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/reducer";

export const UseModalContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const ModalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UseModalContext.Provider value={[state, dispatch]}>
      {children}
    </UseModalContext.Provider>
  );
};
