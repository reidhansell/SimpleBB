import React, { useState } from "react";
import { connect } from "react-redux";

import { Navi } from "../Navi";

import { addExercise } from "../../actions/exercises";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";

export const CreateExercise = ({ addExercise }) => {
  const [state, setState] = useState({
    name: "",
    type: "lb",
  });

  const { name, type } = state;

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
    const success = addExercise(name, type);
    return success ? <Redirect to="/addexercise" /> : null;
  };

  return (
    <>
      <Navi />
      <div className="container">
        <br />
        <h1>Create Exercise</h1>
        <br />
        <input
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          className="inpt"
          placeholder="Name"
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

const mapStateToProps = (state) => ({});

CreateExercise.propTypes = { addExercise: PropTypes.func.isRequired };

export default connect(mapStateToProps, { addExercise })(CreateExercise);
