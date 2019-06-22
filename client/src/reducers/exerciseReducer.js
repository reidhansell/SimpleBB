import {
  GET_EXERCISES,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  EXERCISES_LOADING
} from '../actions/types';

const initialState = {
  exercises: [],
  loading: false,
  date: new Date()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise._id !== action.payload)
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [action.payload, ...state.exercises]
      };
    case EXERCISES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
