import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  updateUser,
  addExercise,
  deleteExercise,
  addTrackedExercise,
  createWorkout,
  deleteWorkout
} from "../../actions/auth";
//Todo: rename functions
//2 has been added to things related to exercises.
const AddWModal = ({
  date,
  updateUser,
  addExercise,
  deleteExercise,
  addTrackedExercise,
  createWorkout,
  deleteWorkout,
  auth: { user, isAuthenticated }
}) => {
  const [state, setState] = useState({
    modal: false,
    search: "",
    search2: "",
    create: false,
    create2: false,
    name: "",
    exercises: [],
    name2: "",
    type: ""
  });

  const {
    modal,
    search,
    search2,
    create,
    create2,
    name,
    exercises,
    name2,
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
    setState({ ...state, modal: !modal, create: false, create2: false });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const workout = { exercises, name };
    createWorkout(workout);
    user.workouts.unshift(workout);
    updateUser(user);
    setState({ ...state, create: false, exercises: [], name: "" });
  };

  const onSubmit2 = async e => {
    e.preventDefault();
    const newExercise = { name: name2, type };
    addExercise(newExercise);
    user.exercises.unshift(newExercise);
    updateUser(user);
    setState({ ...state, create: true, create2: false, name2: "", type: "" });
  };

  const onClick = async (e, workout) => {
    e.preventDefault();

    const newExercises = workout.exercises;
    newExercises.forEach(x => {
      x.date = date;
      delete x._id;
    });
    addTrackedExercise(newExercises);

    newExercises.forEach(x => {
      x.sets = [];
      user.exercisesTracked.unshift(x);
    });
    updateUser(user);
    setState({ ...state, modal: !modal });
  };

  const onClick2 = (e, exercise) => {
    e.preventDefault();
    //To remove ID create newExercise
    const newExercise = {
      name: exercise.name,
      type: exercise.type
    };
    return exercises.filter(x => x.name === newExercise.name).length > 0
      ? null
      : setState({ ...state, exercises: [...exercises, newExercise] });
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteWorkout(id);
    user.workouts = user.workouts.filter(x => {
      return x._id === id ? null : x;
    });
    updateUser(user);
  };

  const onDelete2 = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
    user.exercises = user.exercises.filter(x => {
      return x._id === id ? null : x;
    });
    updateUser(user);
  };

  const onDelete3 = async (e, exercise) => {
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

  return isAuthenticated ? (
    <>
      <Button className="mb-1 btn-lg" color="primary" onClick={toggle}>
        Add Workout
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        {//Begin add workout
        modal && !create && !create2 ? (
          <>
            <ModalHeader toggle={toggle}>Add workout</ModalHeader>
            <ModalBody>
              <input
                style={{ fontFamily: "Lexend Deca" }}
                type="search"
                name="search"
                placeholder="Search..."
                value={search}
                onChange={e => onChange(e)}
              />
              <br />
              <br />
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {user.workouts.length === 0
                  ? "No workouts created"
                  : user.workouts.map(x => {
                      return x.name === null ? null : x.name.includes(
                          search
                        ) ? (
                        <li
                          className="clickable my-1 py-1 rounded shadow"
                          key={x._id}
                        >
                          <div
                            className="bg-primary rounded-top text-white text-left w-100"
                            style={{ display: "flex" }}
                          >
                            <div
                              className="mt-2 ml-1 mr-a w-100"
                              onClick={e => onClick(e, x)}
                            >
                              {x.name}
                            </div>{" "}
                            <div>
                              <Button
                                className="ml-a"
                                color="danger"
                                onClick={e => onDelete(e, x._id)}
                              >
                                <i className="fas fa-trash ml-a" />
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
                onClick={() => setState({ ...state, create: true })}
              >
                Create Workout
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        ) : null}

        {//Begin create workout
        create ? (
          <>
            <ModalHeader toggle={toggle}>Create workout</ModalHeader>
            <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
              <input
                style={{ fontFamily: "Lexend Deca" }}
                className="ml-3"
                type="text"
                placeholder="Name of new workout..."
                value={name}
                name="name"
                onChange={e => onChange(e)}
                required
              />
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
                        <li className="my-1 mr-a">{x.name}</li>
                        <Button
                          className="ml-a"
                          color="danger"
                          onClick={e => onDelete3(e, x)}
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
                name="search2"
                placeholder="Search..."
                value={search2}
                onChange={e => onChange(e)}
              />
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {user.exercises.map(x => {
                  return x.name === null ? null : x.name.includes(search2) ? (
                    <div
                      key={x._id}
                      className="border-top border-bottom my-2"
                      style={{ display: "flex" }}
                    >
                      <li
                        className="clickable mr-a my-1 w-100"
                        onClick={e => onClick2(e, x)}
                      >
                        {x.name}
                      </li>
                      <Button
                        className="ml-a"
                        color="danger"
                        onClick={e => onDelete2(e, x._id)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </div>
                  ) : null;
                })}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onSubmit}>
                Finish creating workout
              </Button>{" "}
              <Button
                color="primary"
                onClick={() =>
                  setState({ ...state, create2: true, create: false })
                }
              >
                Create exercise
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() => setState({ ...state, create: false })}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        ) : null}

        {//Begin create exercise
        create2 ? (
          <>
            <ModalHeader toggle={toggle}>Create exercise</ModalHeader>
            <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
              <input
              style={{fontFamily: "Lexend Deca"}}
                type="text"
                name="name2"
                value={name2}
                onChange={e => onChange(e)}
                placeholder="Name of exercise"
                className="mx-3"
                required
              />
              <br />
              <br />
              <input
              style={{fontFamily: "Lexend Deca"}}
                type="text"
                name="type"
                value={type}
                onChange={e => onChange(e)}
                placeholder="Type of exercise"
                className="mx-3"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onSubmit2}>
                Finish creating exercise
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() =>
                  setState({ ...state, create2: false, create: true })
                }
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        ) : null}
      </Modal>
    </>
  ) : null;
};

AddWModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  addTrackedExercise: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: state.updateUser,
  auth: state.auth,
  addExercise: addExercise,
  deleteExercise: deleteExercise,
  addTrackedExercise: addTrackedExercise,
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
    addTrackedExercise,
    deleteExercise
  }
)(AddWModal);
