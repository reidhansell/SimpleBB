import axios from 'axios';
import { GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE, EXERCISES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getExercises = email => (dispatch, getState) => {
  dispatch(setExercisesLoading());
  axios
    .get('/api/exercises', email, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_EXERCISES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addExercise = exercise => (dispatch, getState) => {
  axios
    .post('/api/exercises', exercise, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_EXERCISE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteExercise = id => (dispatch, getState) => {
  axios
    .delete(`/api/exercises/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_EXERCISE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setExercisesLoading = () => {
  return {
    type: EXERCISES_LOADING
  };
};
