export const certReducer = (state, action) => {
  switch (action.type) {
    case "setCert":
      return {
        ...state,
        active: action.bol,
        name: action.name,

      };

    default:
      return state;
  }
};

export const initialState = {
  active: false,
  name: "",

};
