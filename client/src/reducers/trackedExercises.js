import { ADD_TRACKED_EXERCISES, ADD_SET } from "../actions/types";

const initialState = {
  user: null,
  demo: false,
  trackedExercises: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TRACKED_EXERCISES:
    case ADD_SET:
      return {
        ...state,
        user: { ...state.user, exercisesTracked: payload },
      };
  }
}
