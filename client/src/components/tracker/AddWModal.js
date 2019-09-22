import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateUser,
  addExercise,
  deleteExercise,
  addTrackedExercises,
  createWorkout,
  deleteWorkout
} from "../../actions/auth";
const AddWModal = ({
  date,
  updateUser,
  addExercise,
  deleteExercise,
  addTrackedExercises,
  createWorkout,
  deleteWorkout,
  auth: { user }
}) => {
  const [state, setState] = useState({
    modal: false,
    searchWorkout: "",
    searchExercise: "",
    createW: false,
    createE: false,
    nameW: "",
    exercises: [],
    nameE: "",
    type: ""
  });

  const {
    modal,
    searchWorkout,
    searchExercise,
    createW,
    createE,
    nameW,
    exercises,
    nameE,
    type
  } = state;

  const onChange = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/(\b[a-z](?!\s))/g, function(x) {
          return x.toUpperCase();
        })
    });

  const toggle = () => {
    setState({ ...state, modal: !modal, createW: false, createE: false });
  };

  const onSubmitWorkout = async e => {
    e.preventDefault();
    const workout = { exercises, name: nameW };
    createWorkout(workout);
    user.workouts.unshift(workout);
    updateUser(user);
    setState({ ...state, createW: false, exercises: [], nameW: "" });
  };

  const onSubmitExercise = async e => {
    e.preventDefault();
    const newExercise = { name: nameE, type };
    addExercise(newExercise);
    user.exercises.unshift(newExercise);
    updateUser(user);
    setState({ ...state, createW: true, createE: false, nameE: "", type: "" });
  };

  const onClick = async (e, workout) => {
    e.preventDefault();

    const newExercises = workout.exercises;
    newExercises.forEach(x => {
      x.date = date;
      delete x._id;
    });

    addTrackedExercises(newExercises);

    newExercises.forEach(x => {
      x.sets = [];
      x.loading = true;
      user.exercisesTracked.unshift(x);
    });
    updateUser(user);
    setState({ ...state, modal: !modal });
  };

  const onClick2 = (e, exercise) => {
    e.preventDefault();
    //To remove ID createW newExercise
    const newExercise = {
      name: exercise.name,
      type: exercise.type
    };
    return exercises.filter(x => x.name === newExercise.name).length > 0
      ? null
      : setState({ ...state, exercises: [...exercises, newExercise] });
  };

  const onDeleteWorkout = async (e, id) => {
    e.preventDefault();
    deleteWorkout(id);
    user.workouts = user.workouts.filter(x => {
      return x._id === id ? null : x;
    });
    updateUser(user);
  };

  const onDeleteExercise = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
    user.exercises = user.exercises.filter(x => {
      return x._id === id ? null : x;
    });
    updateUser(user);
  };

  const onRemoveExercise = async (e, exercise) => {
    e.preventDefault();
    setState({
      ...state,
      exercises: [
        ...exercises.filter(x => {
          return x === exercise ? null : x;
        })
      ]
    });
  };

  return (
    <>
      <Button className="btn-lg shadow" color="primary" onClick={toggle}>
        Add Workout
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        {//Begin add workout
        modal && !createW && !createE ? (
          <>
            <ModalHeader toggle={toggle}>Add workout</ModalHeader>
            <ModalBody>
              <input
                style={{ fontFamily: "Lexend Deca" }}
                type="search"
                name="searchWorkout"
                placeholder="Search..."
                value={searchWorkout}
                onChange={e => onChange(e)}
              />
              <br />
              <br />
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {user.workouts.length === 0
                  ? "No workouts created"
                  : user.workouts.map(x => {
                      return x.name === null ? null : x.name.includes(
                          searchWorkout
                        ) ? (
                        <li
                          className="clickable my-1 py-1 rounded shadow"
                          key={x._id}
                        >
                          <div
                            className="bg-primary rounded-top text-light text-left w-100"
                            style={{ display: "flex" }}
                          >
                            <div
                              className="mt-2 ml-1 mr-auto w-100"
                              onClick={e => onClick(e, x)}
                            >
                              {x.name}
                            </div>{" "}
                            <div>
                              <Button
                                className="ml-auto"
                                color="primary"
                                onClick={e => onDeleteWorkout(e, x._id)}
                                style={{ borderRadius: "0px" }}
                              >
                                <i className="fas fa-trash ml-auto" />
                              </Button>
                            </div>
                          </div>
                          <ul
                            className="text-secondary px-2"
                            style={{
                              listStyleType: "none",
                              margin: "0",
                              padding: "0"
                            }}
                            onClick={e => onClick(e, x)}
                          >
                            {x.exercises.map(x => {
                              return <li key={x.name}>{x.name}</li>;
                            })}
                          </ul>
                        </li>
                      ) : null;
                    })}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => setState({ ...state, createW: true })}
              >
                <small>Create New Workout</small>
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        ) : null}

        {//Begin createW workout
        createW ? (
          <>
            <ModalHeader toggle={toggle}>Create workout</ModalHeader>
            <form className="form" onSubmit={e => onSubmitWorkout(e)}>
              <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
                <span className="form-group">
                  <input
                    style={{ fontFamily: "Lexend Deca" }}
                    className="ml-3"
                    type="text"
                    placeholder="Name of workout..."
                    value={nameW}
                    name="nameW"
                    onChange={e => onChange(e)}
                    required
                  />
                </span>
                <br />
                <br />
                {exercises.length === 0 ? (
                  <div className="ml-3 border-bottom">
                    No exercises added
                    <br />
                    <br />
                  </div>
                ) : (
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    {exercises.map(x => {
                      return x.name === null ? null : (
                        <div
                          key={x._id}
                          className="border-top border-bottom my-2"
                          style={{ display: "flex" }}
                        >
                          <li className="my-1 ml-3 mr-auto">{x.name}</li>
                          <Button
                            className="ml-auto"
                            color="primary"
                            style={{ borderRadius: "0" }}
                            onClick={e => onRemoveExercise(e, x)}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </div>
                      );
                    })}
                  </ul>
                )}
                <br />
                <p className="ml-3">Add exercises to new workout:</p>

                <input
                  style={{ fontFamily: "Lexend Deca" }}
                  className="ml-3"
                  type="search"
                  name="searchExercise"
                  placeholder="Search..."
                  value={searchExercise}
                  onChange={e => onChange(e)}
                />
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {user.exercises.map(x => {
                    return x.name === null ? null : x.name.includes(
                        searchExercise
                      ) ? (
                      <div
                        key={x._id}
                        className="border-top border-bottom my-2"
                        style={{ display: "flex" }}
                      >
                        <li
                          className="clickable mr-auto my-1 ml-3 w-100"
                          onClick={e => onClick2(e, x)}
                        >
                          {x.name}
                        </li>
                        <Button
                          className="ml-auto"
                          color="primary"
                          style={{ borderRadius: "0" }}
                          onClick={e => onDeleteExercise(e, x._id)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </div>
                    ) : null;
                  })}
                </ul>
                <div className="w-100 text-center">
                  <Button
                    color="primary"
                    onClick={() =>
                      setState({ ...state, createE: true, createW: false })
                    }
                  >
                    <small>Create new exercise</small>
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create workout"
                />

                <Button
                  color="secondary"
                  onClick={() => setState({ ...state, createW: false })}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </>
        ) : null}

        {//Begin createW exercise
        createE ? (
          <>
            <ModalHeader toggle={toggle}>Create exercise</ModalHeader>
            <form className="form" onSubmit={e => onSubmitExercise(e)}>
              <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
                <span className="form-group">
                  <input
                    style={{ fontFamily: "Lexend Deca" }}
                    type="text"
                    name="nameE"
                    value={nameE}
                    onChange={e => onChange(e)}
                    placeholder="Name of exercise"
                    className="mx-3"
                    required
                  />
                </span>
                <br />
                <br />
                <span className="form-group">
                  <input
                    style={{ fontFamily: "Lexend Deca" }}
                    type="text"
                    name="type"
                    value={type}
                    onChange={e => onChange(e)}
                    placeholder="Type of exercise"
                    className="mx-3"
                  />
                </span>
              </ModalBody>
              <ModalFooter>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create exercise"
                />
                <Button
                  color="secondary"
                  onClick={() =>
                    setState({ ...state, createE: false, createW: true })
                  }
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </>
        ) : null}
      </Modal>
    </>
  );
};

AddWModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  addTrackedExercises: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: state.updateUser,
  auth: state.auth,
  addExercise: addExercise,
  deleteExercise: deleteExercise,
  addTrackedExercises: addTrackedExercises,
  createWorkout: createWorkout,
  deleteWorkout: deleteWorkout
});

export default connect(
  mapStateToProps,
  {
    updateUser,
    createWorkout,
    deleteWorkout,
    addExercise,
    addTrackedExercises,
    deleteExercise
  }
)(AddWModal);
