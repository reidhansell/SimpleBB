import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_UPDATED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_EXERCISE,
  ADD_TRACKED_EXERCISES,
  ADD_SET,
  UPDATE_WEIGHT,
  CREATE_WORKOUT,
  EDIT_EXERCISE,
  EDIT_WORKOUT
  //ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_UPDATED:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case ADD_EXERCISE:
    case EDIT_EXERCISE:
      return {
        ...state,
        user: { ...state.user, exercises: payload }
      };
    case ADD_TRACKED_EXERCISES:
    case ADD_SET:
      return {
        ...state,
        user: { ...state.user, exercisesTracked: payload }
      };
    case UPDATE_WEIGHT:
      return {
        ...state,
        user: { ...state.user, weight: payload }
      };
    case CREATE_WORKOUT:
    case EDIT_WORKOUT:
      return {
        ...state,
        user: { ...state.user, workouts: payload }
      };
    default:
      return state;
  }
}
