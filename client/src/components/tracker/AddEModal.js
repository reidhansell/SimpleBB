import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  addExercise,
  addTrackedExercises,
  deleteExercise
} from "../../actions/auth";

//To do: create one modal and load information based on  Reduce the amount of ?s.

const AddEModal = ({
  updateUser,
  date,
  addExercise,
  addTrackedExercises,
  deleteExercise,
  auth: { user }
}) => {
  const [state, setState] = useState({
    modal: false,
    create: false,
    search: "",
    name: "",
    type: "lbs"
  });

  const { modal, create, search, name, type } = state;

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

  const toggle = () => {
    setState({ ...state, modal: !modal, create: false });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const exercise = { name, type };
    addExercise(exercise);
    user.exercises.unshift(exercise);
    updateUser(user);
    setState({ ...state, create: !create, name: "", type: "" });
  };

  const onClick = async (e, exercise) => {
    e.preventDefault();
    //Remove ID by creating new exercise
    const newExercise = {
      name: exercise.name,
      type: exercise.type,
      date: date
    };
    addTrackedExercises([newExercise]);

    newExercise.sets = [];
    newExercise.loading = true;
    user.exercisesTracked.unshift(newExercise);
    updateUser(user);

    setState({ ...state, modal: !modal });
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
    user.exercises = user.exercises.filter(x => {
      return x._id === id ? null : x;
    });
    updateUser(user);
  };

  return !create ? (
    <div>
      <Button className="btn-lg shadow" color="primary" onClick={toggle}>
        Add Exercise
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        <ModalHeader toggle={toggle}>Add exercise</ModalHeader>
        <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
          <input
            style={{ fontFamily: "Lexend Deca" }}
            type="search"
            name="search"
            placeholder="Search..."
            value={search}
            onChange={e => onChange(e)}
            className="ml-3"
          />
          <br />
          <br />
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {user.exercises.length === 0 ? (
              <p className="ml-3">No exercises created</p>
            ) : (
              user.exercises.map(x => {
                return x.name === null ? null : x.name.includes(search) ? (
                  <div
                    key={x._id}
                    className="border-top border-bottom my-2"
                    style={{ display: "flex" }}
                  >
                    <li
                      className="clickable pt-1 w-100 pl-3"
                      onClick={e => onClick(e, x)}
                    >
                      {x.name}
                    </li>
                    <Button
                      className="ml-auto"
                      color="primary"
                      style={{ borderRadius: "0" }}
                      onClick={e => onDelete(e, x._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </div>
                ) : null;
              })
            )}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setState({ ...state, create: true })}
          >
            <small>Create new exercise</small>
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  ) : (
    <div>
      <Button
        className="mb-1 btn-lg"
        color="primary"
        onClick={() => setState({ ...state, modal: !modal, create: false })}
      >
        Add Exercise
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        <ModalHeader toggle={toggle}>Create exercise</ModalHeader>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <ModalBody style={{ paddingLeft: "0", paddingRight: "0" }}>
            <span className="form-group">
              <input
                style={{ fontFamily: "Lexend Deca" }}
                type="text"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                placeholder="Name of exercise"
                className="mx-3"
                required
              />
            </span>
            <br />
            <br />
            <span className="form-group">
              <span className="ml-3">Type:</span>
              <select
                style={{ fontFamily: "Lexend Deca" }}
                name="type"
                value={type}
                onChange={e => onChangeType(e)}
                className="mx-3"
              >
                <option value="lbs">lbs / reps</option>
                <option value="kg">kg / reps</option>
                <option value="mi">mi / time</option>
                <option value="km"> km / time</option>
              </select>
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
              onClick={() => setState({ ...state, create: false })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

AddEModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  addTrackedExercises: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: state.updateUser,
  auth: state.auth,
  addExercise: addExercise,
  addTrackedExercises: addTrackedExercises,
  deleteExercise: deleteExercise
});

export default connect(
  mapStateToProps,
  { updateUser, addExercise, addTrackedExercises, deleteExercise }
)(AddEModal);
