import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSet, deleteTrackedExercise, deleteTrackedExerciseSet } from "../../actions/auth";

import { Button } from "reactstrap";

const Exercise = ({ exercise, addSet, deleteTrackedExercise, deleteTrackedExerciseSet }) => {
  const [set, setSet] = useState({
    weightdistance: "",
    repstime: ""
  });

  const { weightdistance, repstime } = set;

  const onChange = e => setSet({ ...set, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Submitting");
    console.log("set in submit:");
    console.log(set);
    set.exerciseid = exercise._id;
    addSet(set);
    console.log("End submitting");
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteTrackedExercise(id);
  };

  const onDeleteSet = async (e, exerciseid, setid) => {
    e.preventDefault();
    deleteTrackedExerciseSet(exerciseid, setid);
  };

  return (
    <Fragment>
      <div className="row">
        <span className="h3 w-25">{exercise.name}</span>
        <span className="col mx-a mr-5">
          <input
            name="weightdistance"
            value={weightdistance}
            onChange={e => onChange(e)}
            placeholder="Weight/distance"
            className="mx-3 w-25"
          />

          <input
            name="repstime"
            value={repstime}
            onChange={e => onChange(e)}
            placeholder="Reps/time"
            className="mx-3 w-25"
          />
          <Button color="primary" onClick={onSubmit}>
            Add set
          </Button>
        </span>
        <span className="ml-5">
          <Button
            className=""
            color="danger"
            onClick={e => onDelete(e, exercise._id)}
          >
            <i className="fas fa-trash" />
          </Button>
        </span>
      </div>
      <ul className="no-style-list border-top w-50 mx-auto">
        <p className="text-muted">Weight/disance x reps/sets</p>
        {exercise.sets.map(x => {
          return (
            <li key={x._id} className="my-1 py-1 border-top">
              {x.weightdistance} x {x.repstime}{" "}
              <Button
                className="ml-5 btn-sm"
                color="danger"
                onClick={e => onDeleteSet(e, exercise._id, x._id)}
              >
                <i className="fas fa-trash" />
              </Button>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

Exercise.propTypes = {
  addSet: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  deleteTrackedExercise: PropTypes.func.isRequired,
  deleteTrackedExerciseSet: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  addSet: addSet,
  deleteTrackedExercise: deleteTrackedExercise,
  deleteTrackedExerciseSet: deleteTrackedExerciseSet
});

export default connect(
  mapStateToProps,
  { addSet, deleteTrackedExercise, deleteTrackedExerciseSet }
)(Exercise);
