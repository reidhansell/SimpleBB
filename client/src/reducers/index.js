import { combineReducers } from 'redux';
import exerciseReducer from './exerciseReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  exercise: exerciseReducer,
  error: errorReducer,
  auth: authReducer
});
