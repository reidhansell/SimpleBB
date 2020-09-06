import axios from "axios";
import { setAlert } from "./alert";
import { AUTH_ERROR, ADD_TRACKED_EXERCISES, ADD_SET } from "./types";

// BEGIN TRACKED EXERCISE FUNCTIONS
// Add tracked exercises
export const addTrackedExercises = (exercises) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ exercises });
    const res = await axios.put("/api/exercisesTracked", body, config);
    dispatch({
      type: ADD_TRACKED_EXERCISES,
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

// Delete tracked exercise
export const deleteTrackedExercise = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/exercisesTracked/${id}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};

// Add set to tracked exercise
export const addSet = (set) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/exercisesTracked/sets", set, config);
    dispatch({
      type: ADD_SET,
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

// Delete tracked exercise set
export const deleteTrackedExerciseSet = (exerciseid, setid) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/exercisesTracked/${exerciseid}/sets/${setid}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};
