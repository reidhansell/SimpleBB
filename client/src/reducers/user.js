import {
  USER_LOADED,
  USER_UPDATED,
  ADD_EXERCISE,
  ADD_TRACKED_EXERCISES,
  ADD_SET,
  UPDATE_WEIGHT,
  CREATE_WORKOUT,
  EDIT_EXERCISE,
  EDIT_WORKOUT,
} from "../actions/types";

const initialState = {
  user: null,
  demo: false,
  trackedExercises: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_UPDATED:
    case USER_LOADED:
      return {
        ...state,
        user: payload,
      };

    case ADD_EXERCISE:
    case EDIT_EXERCISE:
      return {
        ...state,
        user: { ...state.user, exercises: payload },
      };

    case UPDATE_WEIGHT:
      return {
        ...state,
        user: { ...state.user, weightTracked: payload },
      };
    case CREATE_WORKOUT:
    case EDIT_WORKOUT:
      return {
        ...state,
        user: { ...state.user, workouts: payload },
      };
    default:
      return state;
  }
}
