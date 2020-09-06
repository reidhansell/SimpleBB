import axios from "axios";
import { setAlert } from "./alert";
import { AUTH_ERROR, ADD_EXERCISE, EDIT_EXERCISE } from "./types";

// BEGIN EXERCISE FUNCTIONS
// Add exercise
export const addExercise = (exercise) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/exercises", exercise, config);
    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete exercise
export const deleteExercise = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/exercises/${id}`);

    //dispatch(setAlert('Exercise Removed', 'success'));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};

// Edit exercise
export const editExercise = (exercise) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/exercises/${exercise.id}`,
      exercise,
      config
    );
    dispatch({
      type: EDIT_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
