import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CreateE from "../AddE/CreateE";
import CreateW from "./CreateW";
import EditE from "../AddE/EditE";
import EditW from "./EditW";

import uuid from "uuid";

import {
  updateUser,
  addExercise,
  deleteExercise,
  editExercise,
  addTrackedExercises,
  createWorkout,
  deleteWorkout,
  editWorkout
} from "../../../actions/user";
const AddWModal = ({
  date,
  updateUser,
  addExercise,
  deleteExercise,
  editExercise,
  addTrackedExercises,
  createWorkout,
  deleteWorkout,
  editWorkout,
  user: { user }
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
    type: "lbs",
    editE: false,
    editW: false,
    eID: "",
    wID: ""
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
    type,
    editE,
    editW,
    eID,
    wID
  } = state;
  //Toggle modal
  const toggle = () => {
    setState({
      ...state,
      modal: !modal,
      createW: false,
      createE: false,
      editE: false,
      editW: false
    });
  };
  //Begin onChanges
  const onChange = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/(\b[a-z](?!\s))/g, function(x) {
          return x.toUpperCase();
        })
    });

  const onChangeType = e =>
    setState({
      ...state,
      type: e.target.value
    });
  //Begin submits
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

  const onSubmitEditE = async e => {
    e.preventDefault();
    const exercise = { name: nameE, type, id: eID };
    editExercise(exercise);
    user.exercises = user.exercises.filter(x => {
      return x._id !== eID ? x : null;
    });
    user.exercises.unshift(exercise);
    updateUser(user);
    setState({
      ...state,
      editE: !editE,
      nameE: "",
      type: "",
      eID: "",
      createW: true
    });
  };

  const onSubmitEditW = async e => {
    e.preventDefault();
    const workout = { name: nameW, exercises, id: wID };
    editWorkout(workout);
    user.workouts = user.workouts.filter(x => {
      return x._id !== wID ? x : null;
    });
    user.workouts.unshift(workout);
    updateUser(user);
    setState({
      ...state,
      editW: !editW,
      nameW: "",
      exercises: [],
      wID: ""
    });
  };
  //Begin onClicks
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
    //To remove ID create new exercise
    const newExercise = {
      name: exercise.name,
      type: exercise.type
    };
    return exercises.filter(x => x.name === newExercise.name).length > 0
      ? null
      : setState({ ...state, exercises: [...exercises, newExercise] });
  };
  //Begin deletes/removes
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
  //Begin navigational functions
  const toCreateE = () => {
    setState({ ...state, createE: true, createW: false });
  };

  const toEditE = exercise => {
    setState({
      ...state,
      createW: false,
      editE: true,
      nameE: exercise.name,
      type: exercise.type,
      eID: exercise._id
    });
  };

  const exitCreateE = () => {
    setState({ ...state, createE: false, createW: true });
  };

  const exitEditE = () => {
    setState({ ...state, editE: false, nameE: "", type: "lbs", createW: true });
  };

  const exitCreateW = () => {
    setState({ ...state, createW: false });
  };

  const exitEditW = () => {
    setState({ ...state, editW: false });
  };
  //End functions and begin render
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
        modal && !createW && !createE && !editE && !editW ? (
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
                          key={x._id || uuid.v4()}
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
                            <div
                              className="text-secondary bg-primary clickable pl-2 pr-2 pt-2"
                              onClick={() =>
                                setState({
                                  ...state,
                                  editW: true,
                                  nameW: x.name,
                                  exercises: x.exercises,
                                  wID: x._id
                                })
                              }
                            >
                              Edit
                            </div>
                            <div>
                              <Button
                                className=""
                                color="primary"
                                onClick={e => onDeleteWorkout(e, x._id)}
                                style={{ borderRadius: "0px" }}
                              >
                                <i className="fas fa-trash" />
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
                              return (
                                <li key={x.name}>
                                  <small>{x.name}</small>
                                </li>
                              );
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

        {//Begin create workout
        createW ? (
          <CreateW
            toggle={toggle}
            onSubmitWorkout={onSubmitWorkout}
            nameW={nameW}
            onChange={onChange}
            exercises={exercises}
            onRemoveExercise={onRemoveExercise}
            searchExercise={searchExercise}
            user={user}
            onClick2={onClick2}
            onDeleteExercise={onDeleteExercise}
            toCreateE={toCreateE}
            toEditE={toEditE}
            exitCreateW={exitCreateW}
          />
        ) : null}

        {//Begin edit workout
        editW ? (
          <EditW
            toggle={toggle}
            onSubmitEditW={onSubmitEditW}
            nameW={nameW}
            onChange={onChange}
            exercises={exercises}
            onRemoveExercise={onRemoveExercise}
            searchExercise={searchExercise}
            user={user}
            onClick2={onClick2}
            onDeleteExercise={onDeleteExercise}
            toCreateE={toCreateE}
            toEditE={toEditE}
            exitEditW={exitEditW}
          />
        ) : null}

        {//Begin create exercise
        createE ? (
          <CreateE
            toggle={() => toggle()}
            onSubmit={e => onSubmitExercise(e)}
            onChange={e => onChange(e)}
            type={type}
            onChangeType={e => onChangeType(e)}
            exitCreate={() => exitCreateE()}
            nameE={nameE}
          />
        ) : null}

        {//Begin edit exercise
        editE ? (
          <EditE
            toggle={toggle}
            onChange={onChange}
            type={type}
            onChangeType={onChangeType}
            onSubmitEdit={onSubmitEditE}
            exitEdit={exitEditE}
            nameE={nameE}
          />
        ) : null}
      </Modal>
    </>
  );
};

AddWModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  editExercise: PropTypes.func.isRequired,
  addTrackedExercises: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: state.updateUser,
  user: state.user,
  addExercise: addExercise,
  deleteExercise: deleteExercise,
  editExercise: editExercise,
  addTrackedExercises: addTrackedExercises,
  createWorkout: createWorkout,
  deleteWorkout: deleteWorkout,
  editWorkout: editWorkout
});

export default connect(
  mapStateToProps,
  {
    updateUser,
    createWorkout,
    deleteWorkout,
    editWorkout,
    addExercise,
    addTrackedExercises,
    deleteExercise,
    editExercise
  }
)(AddWModal);
