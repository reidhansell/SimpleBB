import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import trackedExercises from "./trackedExercises";
import trackedFoods from "./trackedFoods";
import user from "./user";

//The way the reducers are set up is based on the back end MongoDB schema for users and tracked exercises/foods.

export default combineReducers({
  alert,
  auth,
  trackedExercises,
  trackedFoods,
  user,
});
