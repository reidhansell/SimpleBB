import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
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
    setState({ ...state, create: false, exercises: [], name: "" });
  };

  const onSubmit2 = async e => {
    e.preventDefault();
    const newExercise = { name: name2, type };
    addExercise(newExercise);
    setState({ ...state, create2: false, name2: "", type: "" });
  };

  const onClick = async (e, workout) => {
    e.preventDefault();
    const newExercises = workout.exercises;
    newExercises.forEach(x => {
      x.date = date;
      delete x._id;
    });
    addTrackedExercise(newExercises);
    setState({ ...state, modal: !modal });
  };

  const onClick2 = (e, exercise) => {
    const newExercise = {
      date: exercise.date,
      name: exercise.name,
      type: exercise.type
    };
    e.preventDefault();
    return !exercises.includes(newExercise)
      ? setState({ ...state, exercises: [...exercises, newExercise] })
      : {};
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteWorkout(id);
  };

  const onDelete2 = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
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
    !create ? (
      <div>
        <Button className="mb-1 btn-lg" color="primary" onClick={toggle}>
          Add Workout
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ fontFamily: "Lexend Deca" }}
        >
          <ModalHeader toggle={toggle}>Add workout</ModalHeader>
          <ModalBody>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={e => onChange(e)}
            />
            <ul
              className="my-2"
              style={{ listStyleType: "none", margin: "0", padding: "0" }}
            >
              {user.workouts.map(x => {
                return x.name === null ? null : x.name.includes(search) ? (
                  <li
                    className="col clickable my-1 py-1 rounded shadow"
                    key={x._id}
                  >
                    <Row className="bg-primary rounded">
                      <Col
                        className="mt-2 text-white"
                        onClick={e => onClick(e, x)}
                      >
                        {x.name}
                      </Col>{" "}
                      <Button
                        className="ml-a"
                        color="danger"
                        onClick={e => onDelete(e, x._id)}
                      >
                        <i className="fas fa-trash ml-a" />
                      </Button>
                    </Row>
                    <ul
                      className="text-secondary col"
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
        </Modal>
      </div>
    ) : !create2 ? (
      <div>
        <Button className="mb-1 btn-lg" color="primary" onClick={toggle}>
          Add Workout
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ fontFamily: "Lexend Deca" }}
        >
          <ModalHeader toggle={toggle}>Create workout</ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder="Name of new workout..."
              value={name}
              name="name"
              onChange={e => onChange(e)}
              required
            />
            <br />
            {exercises.length === 0 ? "No exercises added" : null}
            <ul
              className=" border-bottom pb-2"
              style={{ listStyleType: "none", margin: "0", padding: "0" }}
            >
              {exercises.map(x => {
                return x.name === null ? null : (
                  <div className="row" key={x._id}>
                    <li className="col clickable my-1 border-top border-bottom py-1">
                      {x.name}
                    </li>
                    <Button
                      className="my-1"
                      color="danger"
                      onClick={e => onDelete3(e, x)}
                    >
                      <i className="fas fa-trash ml-a" />
                    </Button>
                  </div>
                );
              })}
            </ul>
            <p>Add exercises to new workout:</p>

            <input
              type="search"
              name="search2"
              placeholder="Search..."
              value={search2}
              onChange={e => onChange(e)}
            />
            <ul
              className="my-2"
              style={{ listStyleType: "none", margin: "0", padding: "0" }}
            >
              {user.exercises.map(x => {
                return x.name === null ? null : x.name.includes(search2) ? (
                  <div className="row" key={x._id}>
                    <li
                      className="col clickable my-1 border-top border-bottom py-1"
                      onClick={e => onClick2(e, x)}
                    >
                      {x.name}
                    </li>
                    <Button
                      className="my-1"
                      color="danger"
                      onClick={e => onDelete2(e, x._id)}
                    >
                      <i className="fas fa-trash ml-a" />
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
              onClick={() => setState({ ...state, create2: true })}
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
        </Modal>
      </div>
    ) : (
      <div>
        <Button className="mb-1 btn-lg" color="primary" onClick={toggle}>
          Add Workout
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ fontFamily: "Lexend Deca" }}
        >
          <ModalHeader toggle={toggle}>Create exercise</ModalHeader>
          <ModalBody>
            <input
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
              onClick={() => setState({ ...state, create2: false })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  ) : null;
};

AddWModal.propTypes = {
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  addTrackedExercise: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
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
    createWorkout,
    deleteWorkout,
    addExercise,
    addTrackedExercise,
    deleteExercise
  }
)(AddWModal);
