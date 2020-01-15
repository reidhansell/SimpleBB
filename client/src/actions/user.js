import axios from "axios";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  USER_UPDATED,
  ADD_EXERCISE,
  ADD_TRACKED_EXERCISES,
  ADD_SET,
  UPDATE_WEIGHT,
  CREATE_WORKOUT,
  EDIT_EXERCISE,
  EDIT_WORKOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// BEGIN MISC FUNCTIONS
// Manually update user
export const updateUser = user => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch({
      type: USER_UPDATED,
      payload: user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Update daily weight
export const saveWeight = (weight, type, date) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ weight, type, date });

    const res = await axios.put(`/api/weightTracked`, body, config);
    dispatch({
      type: UPDATE_WEIGHT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// BEGIN EXERCISE FUNCTIONS
// Add exercise
export const addExercise = exercise => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/exercises", exercise, config);
    dispatch({
      type: ADD_EXERCISE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete exercise
export const deleteExercise = id => async dispatch => {
  try {
    await axios.delete(`/api/exercises/${id}`);

    //dispatch(setAlert('Exercise Removed', 'success'));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// Edit exercise
export const editExercise = exercise => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(
      `/api/exercises/${exercise.id}`,
      exercise,
      config
    );
    dispatch({
      type: EDIT_EXERCISE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// BEGIN TRACKED EXERCISE FUNCTIONS
// Add tracked exercises
export const addTrackedExercises = exercises => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ exercises });
    const res = await axios.put("/api/exercisesTracked", body, config);
    dispatch({
      type: ADD_TRACKED_EXERCISES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete tracked exercise
export const deleteTrackedExercise = id => async dispatch => {
  try {
    await axios.delete(`/api/exercisesTracked/${id}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// Add set to tracked exercise
export const addSet = set => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/exercisesTracked/sets", set, config);
    dispatch({
      type: ADD_SET,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete tracked exercise set
export const deleteTrackedExerciseSet = (
  exerciseid,
  setid
) => async dispatch => {
  try {
    await axios.delete(`/api/exercisesTracked/${exerciseid}/sets/${setid}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// BEGIN WORKOUT FUNCTIONS
// Create new workout
export const createWorkout = workout => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(workout);

    const res = await axios.put(`/api/workouts`, body, config);
    dispatch({
      type: CREATE_WORKOUT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete workout
export const deleteWorkout = id => async dispatch => {
  try {
    await axios.delete(`/api/workouts/${id}`);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

//Edit workout
export const editWorkout = workout => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(`/api/workouts/${workout.id}`, workout, config);
    dispatch({
      type: EDIT_WORKOUT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
