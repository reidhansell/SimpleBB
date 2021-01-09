import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Navi } from "../Navi";

export const AddExercise = (exercises) => {
  return (
    <>
      <Navi />
      <div className="container">
        <br />
        <h1>Add Exercise</h1>
        <br />
        <Link to="/createexercise">
          <button className="btn" style={{ width: "250px" }}>
            Create Exercise
          </button>
        </Link>
        <br />
        {exercises > 0 ? (
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

AddExercise.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  exercises: state.user.exercises,
});

export default connect(mapStateToProps)(AddExercise);
