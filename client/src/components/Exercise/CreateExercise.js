import React, { useState } from "react";
import { connect } from "react-redux";

import { Navi } from "../Navi";

import { addExercise } from "../../actions/exercises";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";

export const CreateExercise =  ({ addE, demo }) => {
  const [state, setState] = useState({
    exerciseName: "",
    type: "lb",
    success: false,
  });

  const { exerciseName, type, success } = state;

  if(success){
    return <Redirect to="/addexercise" />
  }

  const onChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "")
          : e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addE(exerciseName, type, demo);
    setState({...state, success: true})
  };

  return (
    <>
      <Navi />
      <div className="container">
        <br />
        <h1>Create Exercise</h1>
        <br />
        <input
          name="exerciseName"
          value={exerciseName}
          onChange={(e) => onChange(e)}
          className="inpt"
          placeholder="Exercise Name"
          style={{ width: "250px" }}
          required
        ></input>
        <br />
        <br />
        <select
          value={type}
          name="type"
          onChange={(e) => onChange(e)}
          style={{ width: "250px" }}
          required
        >
          <option value="lb">Pounds (lb) / Reps</option>
          <option value="kg">Kilograms (kg) / Reps</option>
          <option value="mi">Miles (mi) / Minutes</option>
          <option value="km">Kilometers (km) / Minutes</option>
        </select>
        <br />
        <br />
        <button
          className="btn"
          style={{ width: "250px" }}
          onClick={(e) => onSubmit(e)}
        >
          Finish Creating Exercise
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({demo: state.auth.demo});

CreateExercise.propTypes = { addE: PropTypes.func.isRequired,
demo: PropTypes.bool.isRequired };

export default connect(mapStateToProps, { addE: addExercise})(CreateExercise);
