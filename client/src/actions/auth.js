import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_EXERCISE_SUCCESS,
  ADD_EXERCISE_FAIL,
  DELETE_EXERCISE,
  EXERCISE_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Add exercise
export const addExercise = exercise => async dispatch => {
  try {
    console.log("addExercise entered");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log("exercise in actions:");
    console.log(exercise);
    const res = await axios.put("/api/users/exercises", exercise, config);
    dispatch({
      type: ADD_EXERCISE_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_EXERCISE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete exercise
export const deleteExercise = id => async dispatch => {
  try {
    await axios.delete(`/api/users/exercises/${id}`);

    dispatch({
      type: DELETE_EXERCISE,
      payload: id
    });

    dispatch(loadUser());

    //dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// Add tracked exercise
export const addTrackedExercise = exercises => async dispatch => {
  try {
    console.log("addTrackedExercise entered");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log("exercises in actions:");
    console.log(exercises);

    const body = JSON.stringify({ exercises });
    const res = await axios.put(
      "/api/users/exercisesTracked",
      body,
      config
    );
    dispatch({
      type: ADD_EXERCISE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_EXERCISE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete tracked exercise
export const deleteTrackedExercise = id => async dispatch => {
  try {
    await axios.delete(`/api/users/exercisesTracked/${id}`);

    dispatch({
      type: DELETE_EXERCISE,
      payload: id
    });

    dispatch(loadUser());

    //dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// Add set to tracked exercise
export const addSet = set => async dispatch => {
  try {
    console.log("addTrackedExercise entered");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log("set in actions:");
    console.log(set);
    const res = await axios.put(
      "/api/users/exercisesTracked/sets",
      set,
      config
    );
    dispatch({
      type: ADD_EXERCISE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_EXERCISE_FAIL,
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
    await axios.delete(
      `/api/users/exercisesTracked/${exerciseid}/sets/${setid}`
    );

    dispatch({
      type: DELETE_EXERCISE,
      payload: setid
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status }
    });
  }
};

// Save weight to date
export const saveWeight = (weight, date) => async dispatch => {
  try {
    console.log("saveWeight entered");
    console.log("date: ");
    console.log(date);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ weight, date });

    const res = await axios.put(`/api/users/weight`, body, config);
    dispatch({
      type: ADD_EXERCISE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_EXERCISE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create new workout
export const createWorkout = workout => async dispatch => {
  try {
    console.log("createWorkout entered");
    console.log("workout: ");
    console.log(workout);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(workout);

    const res = await axios.put(`/api/users/workouts`, body, config);
    dispatch({
      type: ADD_EXERCISE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_EXERCISE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
