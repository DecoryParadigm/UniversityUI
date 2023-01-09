export const trackingReducer = (state, action) => {
  switch (action.type) {
    case "updated_course_id":
      return {
        ...state,
        course_id: action.course_id,
      };
    case "updated_module_id":
      return {
        ...state,
        module_id: action.module_id,
      };
    case "updated_quiz":
      return {
        ...state,
        quiz_id: action.quiz_id,
        quiz_value: action.quiz_value,
      };
    case "setToken":
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

export const initialState = {
  token: "",
  course_id: " ",
  module_id: " ",
  quiz_id: " ",
  quiz_value: " ",
};
