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

import { addExercise, deleteExercise, createWorkout } from "../../actions/auth";

//2 has been added to things related to exercises.
const AddWModal = ({
  date,
  addExercise,
  deleteExercise,
  createWorkout,
  auth: { user, isAuthenticated }
}) => {
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState("");

  const [search2, setSearch2] = useState("");

  const [create, setCreate] = useState(false);

  const [create2, setCreate2] = useState(false);

  const [workout, setWorkout] = useState({
    name: "",
    exercises: []
  });

  const [exercise, setExercise] = useState({
    name2: "",
    type: ""
  });

  const { name, exercises } = workout;

  const { name2, type } = exercise;

  const onChangeSearch = e => setSearch(e.target.value);

  const onChangeSearch2 = e => setSearch2(e.target.value);

  const onChange = e => setWorkout({ ...workout, name: e.target.value });

  const onChange2 = e =>
    setExercise({ ...exercise, [e.target.name]: e.target.value });

  const toggle = () => {
    setModal(!modal);
    setCreate(false);
    setCreate2(false);
  };

  const toggleCreate = () => {
    setCreate(!create);
    console.log(workout.exercises);
  };

  const toggleCreate2 = () => {
    setCreate2(!create2);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Submitting");
    console.log("workout in submit:");
    console.log(workout);
    createWorkout(workout);
    setCreate(!create);
    console.log("End submitting");
  };

  const onSubmit2 = async e => {
    e.preventDefault();
    console.log("Submitting");
    console.log("exercise in submit:");
    console.log(exercise);
    const newExercise = { name: exercise.name2, type: exercise.type };
    addExercise(newExercise);
    setCreate2(!create2);
    console.log("End submitting");
  };

  const onClick = async (e, exercise) => {
    e.preventDefault();
    //addWorkout(workout)
    setModal(!modal);
  };

  const onClick2 = async (e, exercise) => {
    e.preventDefault();
    /*exercise.date = date;
    addTrackedExercise(exercise);
    setModal(!modal);*/
  };

  const onClick3 = (e, exercise) => {
    e.preventDefault();
    return !workout.exercises.includes(exercise)
      ? setWorkout({ ...workout, exercises: [...exercises, exercise] })
      : {};
  };

  const onDelete = async (e, exercise) => {
    e.preventDefault();
    //deleteWorkout({ ...workout, exercises: exercises.unshift(exercise) });
  };

  const onDelete2 = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
  };

  const onDelete3 = async (e, exercise) => {
    e.preventDefault();
    //DELETE SET FROM NEW WORKOUT
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
          <ModalHeader toggle={toggle}>Click or tap workout to add</ModalHeader>
          <ModalBody>
            <input
              placeholder="Search..."
              value={search}
              onChange={e => onChangeSearch(e)}
            />
            <ul className="no-style-list my-2">
              {user.workouts.map(x => {
                return x.name === null ? null : x.name.includes(search) ? (
                  <li
                    className="col clickable my-1 py-1 rounded shadow"
                    onClick={e => onClick(e, x)}
                    key={x._id}
                  >
                    <Row className="bg-primary rounded">
                      <Col className="mt-2 text-white">{x.name}</Col>{" "}
                      <Button
                        className="ml-a"
                        color="danger"
                        onClick={e => onDelete(e, x._id)}
                      >
                        <i className="fas fa-trash ml-a" />
                      </Button>
                    </Row>
                    <ul className="no-style-list text-secondary col">
                      {x.exercises.map(x => {
                        return <li>{x.name}</li>;
                      })}
                    </ul>
                  </li>
                ) : null;
              })}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleCreate}>
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
          <ModalHeader toggle={toggle}>Create new workout</ModalHeader>
          <ModalBody>
            <p className="">
              New workout:{` `}
              <input
                placeholder="Name of workout..."
                value={name}
                name="name"
                onChange={e => onChange(e)}
              />
            </p>

            <ul className="no-style-list my-2 border-bottom pb-4">
              {workout.exercises.map(x => {
                return x.name === null ? null : (
                  <div className="row" key={x._id}>
                    <li className="col clickable my-1 border-top border-bottom py-1">
                      {x.name}
                    </li>
                    <Button
                      className="my-1"
                      color="danger"
                      onClick={e => onDelete3(e, x._id)}
                    >
                      <i className="fas fa-trash ml-a" />
                    </Button>
                  </div>
                );
              })}
            </ul>
            <p>Add exercises to new workout:</p>

            <input
              placeholder="Search..."
              value={search2}
              onChange={e => onChangeSearch2(e)}
            />
            <ul className="no-style-list my-2">
              {user.exercises.map(x => {
                return x.name === null ? null : x.name.includes(search2) ? (
                  <div className="row" key={x._id}>
                    <li
                      className="col clickable my-1 border-top border-bottom py-1"
                      onClick={e => onClick3(e, x)}
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
            <Button color="primary" onClick={toggleCreate2}>
              Create exercise
            </Button>{" "}
            <Button color="secondary" onClick={toggleCreate}>
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
          <ModalHeader toggle={toggle}>
            Enter exercise information to create
          </ModalHeader>
          <ModalBody>
            <input
              name="name2"
              value={name2}
              onChange={e => onChange2(e)}
              placeholder="Name of exercise"
              className="mx-3"
            />

            <br />
            <br />

            <input
              name="type"
              value={type}
              onChange={e => onChange2(e)}
              placeholder="Type of exercise"
              className="mx-3"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onSubmit2}>
              Finish creating exercise
            </Button>{" "}
            <Button color="secondary" onClick={toggleCreate2}>
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
  modal: PropTypes.bool,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  createWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
  addExercise: addExercise,
  deleteExercise: deleteExercise,
  createWorkout: createWorkout
});

export default connect(
  mapStateToProps,
  { createWorkout, addExercise, deleteExercise }
)(AddWModal);
