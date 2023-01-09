export const reducer = (state, action) => {
  switch (action.type) {
    case "setModal":
      return {
        ...state,
        active: !state.active,
        link: action.link,
        id: action.id,
      };
    case "keepScore":
      return {
        ...state,
        score: action.score + state.score,
      };
    case "clear_state":
      return {
        ...state,
        active: false,
      };

    default:
      return state;
  }
};

export const initialState = {
  active: false,
  link: "#",
  id: 0,
  score: 0,
};
