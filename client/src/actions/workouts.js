import axios from "axios";
import { setAlert } from "./alert";
import { AUTH_ERROR, CREATE_WORKOUT, EDIT_WORKOUT } from "./types";

// BEGIN WORKOUT FUNCTIONS
// Create new workout
export const createWorkout = (workout) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(workout);

    const res = await axios.put(`/api/workouts`, body, config);
    dispatch({
      type: CREATE_WORKOUT,
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

// Delete workout
export const deleteWorkout = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/workouts/${id}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};

//Edit workout
export const editWorkout = (workout) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/workouts/${workout.id}`, workout, config);
    dispatch({
      type: EDIT_WORKOUT,
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
