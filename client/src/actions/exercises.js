import axios from "axios";
import { setAlert } from "./alert";
import { AUTH_ERROR, ADD_EXERCISE, UPDATE_EXERCISE } from "./types";

// BEGIN EXERCISE FUNCTIONS
// Add exercise
export const addExercise = (name, type, demo) => async (dispatch) => {
  try {
    if(demo){
      dispatch({
      type: ADD_EXERCISE,
      payload: {name: name, type: type, id: "1"},
    });
    return(true);
    }else{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const payload = { name, type };
    const res = await axios.post("/api/exercises", payload, config);
    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });
    return(true);}
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    return(false);
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

// Update exercise
export const updateExercise = (exercise) => async (dispatch) => {
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
      type: UPDATE_EXERCISE,
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
