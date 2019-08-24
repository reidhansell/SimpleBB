import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExercise,
  addTrackedExercise,
  deleteExercise
} from "../../actions/auth";

//To do: create one modal and load information based on  Reduce the amount of ?s.

const AddEModal = ({
  date,
  addExercise,
  addTrackedExercise,
  deleteExercise,
  auth: { user, isAuthenticated }
}) => {
  const [state, setState] = useState({
    modal: false,
    create: false,
    search: "",
    name: "",
    type: ""
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

  const toggle = () => {
    setState({ ...state, modal: !modal, create: false });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const exercise = { name, type };
    addExercise(exercise);
    setState({ ...state, create: !create });
  };

  const onClick = async (e, exercise) => {
    e.preventDefault();
    exercise.date = date;
    addTrackedExercise([exercise]);
    setState({ ...state, modal: !modal });
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
  };

  return isAuthenticated ? (
    !create ? (
      <div>
        <Button className="mb-1 btn-lg" color="primary" onClick={toggle}>
          Add Exercise
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ fontFamily: "Lexend Deca" }}
        >
          <ModalHeader toggle={toggle}>Add exercise</ModalHeader>
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
              {user.exercises.map(x => {
                return x.name === null ? null : x.name.includes(search) ? (
                  <div className="row" key={x._id}>
                    <li
                      className="col clickable my-1 border-top border-bottom py-1"
                      onClick={e => onClick(e, x)}
                    >
                      {x.name}
                    </li>
                    <Button
                      className="my-1"
                      color="danger"
                      onClick={e => onDelete(e, x._id)}
                    >
                      <i className="fas fa-trash ml-a" />
                    </Button>
                  </div>
                ) : null;
              })}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setState({ ...state, create: true })}
            >
              Create exercise
            </Button>{" "}
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
          <ModalBody>
            <input
              type="text"
              name="name"
              value={name}
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
            <Button color="primary" onClick={onSubmit}>
              Finish creating exercise
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
    )
  ) : null;
};

AddEModal.propTypes = {
  auth: PropTypes.object.isRequired,
  addExercise: PropTypes.func.isRequired,
  addTrackedExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  addExercise: addExercise,
  addTrackedExercise: addTrackedExercise,
  deleteExercise: deleteExercise
});

export default connect(
  mapStateToProps,
  { addExercise, addTrackedExercise, deleteExercise }
)(AddEModal);
