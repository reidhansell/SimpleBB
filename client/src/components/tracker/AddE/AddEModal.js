import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  addExercise,
  addTrackedExercises,
  deleteExercise,
  editExercise
} from "../../../actions/user";

import uuid from "uuid";

import EditE from "./EditE";
import CreateE from "./CreateE";

const AddEModal = ({
  updateUser,
  date,
  addExercise,
  addTrackedExercises,
  deleteExercise,
  editExercise,
  auth: { user }
}) => {
  const [state, setState] = useState({
    modal: false,
    create: false,
    search: "",
    nameE: "",
    type: "lbs",
    edit: false,
    editID: ""
  });

  const { modal, create, search, nameE, type, edit, editID } = state;

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
    setState({ ...state, modal: !modal, create: false, edit: false });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const exercise = { name: nameE, type };
    addExercise(exercise);
    user.exercises.unshift(exercise);
    updateUser(user);
    setState({ ...state, create: !create, name: "", type: "" });
  };

  const onSubmitEdit = async e => {
    e.preventDefault();
    const exercise = { name: nameE, type, id: editID };
    editExercise(exercise);
    user.exercises = user.exercises.filter(x => {
      return x._id !== editID ? x : null;
    });
    user.exercises.unshift(exercise);
    updateUser(user);
    setState({ ...state, edit: !edit, nameE: "", type: "", editID: "" });
  };

  const exitEdit = () => {
    setState({ ...state, edit: false, nameE: "", type: "lbs" });
  };

  const exitCreate = () => {
    setState({ ...state, create: false });
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

  return (
    <>
      <Button className="btn-lg shadow" color="primary" onClick={toggle}>
        Add Exercise
      </Button>
      <br />
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ fontFamily: "Lexend Deca" }}
      >
        {!create && !edit ? (
          <>
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
                        key={uuid.v4()}
                        className="border-top border-bottom my-2"
                        style={{ display: "flex" }}
                      >
                        <li
                          className="clickable pt-1 w-100 pl-3"
                          onClick={e => onClick(e, x)}
                        >
                          {x.name}
                        </li>
                        <span
                          className="text-secondary clickable pl-2 pr-2 pt-2"
                          onClick={() =>
                            setState({
                              ...state,
                              edit: true,
                              nameE: x.name,
                              type: x.type,
                              editID: x._id
                            })
                          }
                        >
                          Edit
                        </span>
                        <Button
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
          </>
        ) : null}

        {create ? (
          <CreateE
            toggle={() => toggle()}
            onSubmit={e => onSubmit(e)}
            onChange={e => onChange(e)}
            type={type}
            onChangeType={e => onChangeType(e)}
            exitCreate={() => exitCreate()}
            nameE={nameE}
          />
        ) : null}

        {edit ? (
          <EditE
            toggle={toggle}
            onChange={onChange}
            type={type}
            onChangeType={onChangeType}
            onSubmitEdit={onSubmitEdit}
            exitEdit={exitEdit}
            nameE={nameE}
          />
        ) : null}
      </Modal>
    </>
  );
};

AddEModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  addTrackedExercises: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  editExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updateUser: state.updateUser,
  auth: state.auth,
  addExercise: addExercise,
  addTrackedExercises: addTrackedExercises,
  deleteExercise: deleteExercise,
  editExercise: editExercise
});

export default connect(
  mapStateToProps,
  { updateUser, addExercise, addTrackedExercises, deleteExercise, editExercise }
)(AddEModal);
