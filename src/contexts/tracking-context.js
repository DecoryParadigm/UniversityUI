import { createContext, useReducer } from "react";
import { trackingReducer, initialState } from "../reducers/tracking-reducer";

export const CreateTrackContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const TrackingContext = ({ children }) => {
  const [tracking_state, tracking_dispatch] = useReducer(
    trackingReducer,
    initialState
  );
  return (
    <CreateTrackContext.Provider value={[tracking_state, tracking_dispatch]}>
      {children}
    </CreateTrackContext.Provider>
  );
};
