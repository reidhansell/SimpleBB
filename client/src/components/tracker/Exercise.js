import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  addSet,
  deleteTrackedExercise,
  deleteTrackedExerciseSet
} from "../../actions/user";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Exercise = ({
  updateUser,
  exercise,
  addSet,
  deleteTrackedExercise,
  deleteTrackedExerciseSet,
  auth: { user }
}) => {
  const [state, setState] = useState({
    weightdistance: "",
    repstime: "",
    modal: false,
    deleting: false
  });

  const { weightdistance, repstime, modal, deleting } = state;

  const onChange = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value.replace(/[^0-9.]/g, "")
    });

  const onSubmit = async e => {
    e.preventDefault();
    const set = { weightdistance, repstime };
    user.exercisesTracked
      .find(x => {
        return x._id === exercise._id;
      })
      .sets.unshift(set);
    updateUser(user);
    set.exerciseid = exercise._id;
    addSet(set);
    setState({ ...state, weightdistance: "", repstime: "" });
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ ...state, toggle: false, deleting: true });
    deleteTrackedExercise(id);
  };

  const onDeleteSet = async (e, exerciseid, setid) => {
    e.preventDefault();
    deleteTrackedExerciseSet(exerciseid, setid);
    user.exercisesTracked.find(x => {
      return x._id === exerciseid;
    }).sets = user.exercisesTracked
      .find(x => {
        return x._id === exerciseid;
      })
      .sets.filter(x => {
        return x._id === setid ? null : x;
      });
    updateUser(user);
  };

  const toggle = () => {
    setState({ ...state, modal: !modal });
  };

  return deleting ? null : (
    <Fragment>
      <div className="clickable pb-1 mb-3 mx-auto shadow rounded bg-light">
        <div
          className="bg-primary rounded-top text-light text-left w-100"
          style={{ display: "flex" }}
        >
          <h5 onClick={toggle} className="ml-5 mr-auto pt-2 w-100">
            {exercise.name}
          </h5>
          <Button
            color="primary"
            style={{ borderRadius: "0px" }}
            onClick={e => onDelete(e, exercise._id)}
          >
            <i className="fas fa-trash" />
          </Button>
        </div>

        <ul
          onClick={toggle}
          style={{ listStyleType: "none", margin: "0", padding: "0" }}
        >
          {exercise.sets.length > 0
            ? exercise.sets.map(x => {
                return (
                  <li key={x._id} className="my-1 py-1 ">
                    {x.weightdistance + " " + exercise.type} x{" "}
                    {x.repstime + " "}
                    {exercise.type === "kg"
                      ? "reps"
                      : exercise.type === "lbs"
                      ? "reps"
                      : exercise.type === "km"
                      ? "min"
                      : exercise.type === "mi"
                      ? "min"
                      : "exercise not properly added. Report bug to ReidHansell@GMail.com or just delete this exercise from your exercise list"}
                  </li>
                );
              })
            : "Click or tap to log a set"}
        </ul>
      </div>
      <Modal
        className="text-center"
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        <ModalHeader toggle={toggle}>
          Logged sets for {exercise.name}
        </ModalHeader>
        <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <span className="form-group">
              <input
                style={{ fontFamily: "Lexend Deca" }}
                /*BUG: PROBLEMS WITH +. -, AND e INPUT. NO CURRENT FIX (RESEARCHED).
              OPTIONS: CHANGE TO TEXT AND LOSE NUMBER PAD DEFAULT
              ALLOW FOR + AND - AND KEEP NUMBER PAD DEFAULT */
                //type="number"
                name="weightdistance"
                value={weightdistance}
                onChange={e => onChange(e)}
                placeholder={exercise.type}
                className="w-25 mr-3"
                required
              />
            </span>
            X
            <span className="form-group">
              <input
                style={{ fontFamily: "Lexend Deca" }}
                /*BUG: PROBLEMS WITH +. -, AND e INPUT. NO CURRENT FIX (RESEARCHED).
              OPTIONS: CHANGE TO TEXT AND LOSE NUMBER PAD DEFAULT
              ALLOW FOR + AND - AND KEEP NUMBER PAD DEFAULT */
                //type="number"
                name="repstime"
                value={repstime}
                onChange={e => onChange(e)}
                placeholder={
                  exercise.type === "km" || exercise.type === "mi"
                    ? "min"
                    : "reps"
                }
                className="mx-3 w-25"
                required
              />
            </span>
            <input type="submit" className="btn btn-primary" value="Add set" />
          </form>
          <br />
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {exercise.sets.length === 0
              ? "No sets logged"
              : exercise.sets.map(x => {
                  return (
                    <div
                      key={x._id}
                      className="border-top border-bottom my-2"
                      style={{ display: "flex" }}
                    >
                      <li
                        key={x._id}
                        className="pt-1 mr-auto text-center w-100"
                      >
                        {x.weightdistance + " " + exercise.type} x{" "}
                        {x.repstime + " "}
                        {exercise.type === "kg"
                          ? "reps"
                          : exercise.type === "lbs"
                          ? "reps"
                          : exercise.type === "km"
                          ? "min"
                          : exercise.type === "mi"
                          ? "min"
                          : "exercise not properly added. Report bug to ReidHansell@GMail.com or just delete this exercise from your exercise list"}
                      </li>
                      <Button
                        className="ml-auto"
                        color="primary"
                        style={{ borderRadius: "0" }}
                        onClick={e => onDeleteSet(e, exercise._id, x._id)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </div>
                  );
                })}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

Exercise.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addSet: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  deleteTrackedExercise: PropTypes.func.isRequired,
  deleteTrackedExerciseSet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: updateUser,
  auth: state.auth,
  addSet: addSet,
  deleteTrackedExercise: deleteTrackedExercise,
  deleteTrackedExerciseSet: deleteTrackedExerciseSet
});

export default connect(
  mapStateToProps,
  { updateUser, addSet, deleteTrackedExercise, deleteTrackedExerciseSet }
)(Exercise);
