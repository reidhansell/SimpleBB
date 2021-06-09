import { ADD_TRACKED_EXERCISES, ADD_SET } from "../actions/types";

const initialState = {
  trackedExercises: null,
};

const fn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TRACKED_EXERCISES:
    case ADD_SET:
      return {
        ...state,
        trackedExercises: payload,
      };
    default:
      return state;
  }
}

export default fn;
