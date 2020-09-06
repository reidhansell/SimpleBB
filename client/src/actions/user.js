import { AUTH_ERROR, USER_UPDATED } from "./types";
import setAuthToken from "../utils/setAuthToken";

// BEGIN MISC FUNCTIONS
// Manually update user
export const updateUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch({
      type: USER_UPDATED,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
