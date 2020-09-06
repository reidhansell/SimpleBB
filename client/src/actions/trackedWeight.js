import axios from "axios";
import { setAlert } from "./alert";
import { AUTH_ERROR, UPDATE_WEIGHT } from "./types";

// Update daily weight
export const saveWeight = (weight, type, date) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ weight, type, date });

    const res = await axios.put(`/api/weightTracked`, body, config);
    dispatch({
      type: UPDATE_WEIGHT,
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
