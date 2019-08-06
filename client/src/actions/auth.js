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
  ADD_EXERCISE_FAIL
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

// Add tracked exercise
export const addTrackedExercise = exercise => async dispatch => {
  try {
    console.log("addTrackedExercise entered");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log("exercise in actions:");
    console.log(exercise);
    const res = await axios.put(
      "/api/users/exercisesTracked",
      exercise,
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

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
