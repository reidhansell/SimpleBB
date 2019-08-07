import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExercise,
  addTrackedExercise,
  deleteExercise
} from "../../actions/auth";

const AddEModal = ({
  date,
  addExercise,
  addTrackedExercise,
  deleteExercise,
  auth: { user, isAuthenticated }
}) => {
  const [modal, setModal] = useState(false);

  const [create, setCreate] = useState(false);

  const [search, setSearch] = useState("");

  const [exercise, setExercise] = useState({
    name: "",
    type: ""
  });

  const { name, type } = exercise;

  const onChangeSearch = e => setSearch(e.target.value);

  const onChange = e =>
    setExercise({ ...exercise, [e.target.name]: e.target.value });

  const toggle = () => {
    setModal(!modal);
    setCreate(false);
  };

  const toggleCreate = () => {
    setCreate(!create);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Submitting");
    console.log("exercise in submit:");
    console.log(exercise);
    addExercise(exercise);
    setCreate(!create);
    console.log("End submitting");
  };

  const onClick = async (e, exercise) => {
    e.preventDefault();
    exercise.date = date;
    addTrackedExercise(exercise);
    setModal(!modal);
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteExercise(id);
  };

  return isAuthenticated ? (
    !create ? (
      <div>
        <Button className="mb-1" color="primary" onClick={toggle}>
          Add Exercise
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Click or tap exercise to add
          </ModalHeader>
          <ModalBody>
            <input
              placeholder="Search..."
              value={search}
              onChange={e => onChangeSearch(e)}
            />
            <ul className="no-style-list my-2">
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
            <Button color="primary" onClick={toggleCreate}>
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
        <Button className="mb-1" color="primary" onClick={toggle}>
          Add Exercise
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Enter exercise information to create
          </ModalHeader>
          <ModalBody>
            <input
              name="name"
              value={name}
              onChange={e => onChange(e)}
              placeholder="Name of exercise"
              className="mx-3"
            />

            <br />
            <br />

            <input
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
            <Button color="secondary" onClick={toggleCreate}>
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
  modal: PropTypes.bool,
  addExercise: PropTypes.func.isRequired,
  addTrackedExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
  addExercise: addExercise,
  addTrackedExercise: addTrackedExercise,
  deleteExercise: deleteExercise
});

export default connect(
  mapStateToProps,
  { addExercise, addTrackedExercise, deleteExercise }
)(AddEModal);
