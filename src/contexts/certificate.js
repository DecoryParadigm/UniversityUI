import { createContext, useReducer } from "react";
import { initialState, certReducer } from "../reducers/certificateReducer";

export const CertificateContext = createContext({
  state: initialState,
  certdispatch: () => null,
});

export const CertContext = ({ children }) => {
  const [state, certdispatch] = useReducer(certReducer, initialState);
  return (
    <CertificateContext.Provider value={[state, certdispatch]}>
      {children}
    </CertificateContext.Provider>
  );
};
