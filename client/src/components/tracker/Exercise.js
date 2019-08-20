import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addSet,
  deleteTrackedExercise,
  deleteTrackedExerciseSet
} from "../../actions/auth";

import {
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const Exercise = ({
  exercise,
  addSet,
  deleteTrackedExercise,
  deleteTrackedExerciseSet
}) => {
  const [set, setSet] = useState({
    weightdistance: "",
    repstime: ""
  });

  const [modal, setModal] = useState(false);

  const { weightdistance, repstime } = set;

  const onChange = e => setSet({ ...set, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Submitting");
    console.log("set in submit:");
    console.log(set);
    set.exerciseid = exercise._id;
    addSet(set);
    console.log("End submitting");
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    deleteTrackedExercise(id);
  };

  const onDeleteSet = async (e, exerciseid, setid) => {
    e.preventDefault();
    deleteTrackedExerciseSet(exerciseid, setid);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <div className="clickable mb-2 shadow rounded container-fluid" onClick={toggle}>
        <Row className="bg-primary text-white rounded">
          <h5 className="ml-5 mr-a pt-2">{exercise.name}</h5>
          <Button
            className=""
            color="danger"
            onClick={e => onDelete(e, exercise._id)}
          >
            <i className="fas fa-trash" />
          </Button>
        </Row>
        {exercise.sets.map(x => {
          return (
            <li key={x._id} className="my-1 py-1">
              {x.weightdistance} x {x.repstime}
            </li>
          );
        })}
      </div>
      <Modal className="text-center" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add set(s) to exercise</ModalHeader>
        <ModalBody>
          <Col>
            <input
              name="weightdistance"
              value={weightdistance}
              onChange={e => onChange(e)}
              placeholder="Weight/distance"
              className="w-25 mr-3"
            />
            X
            <input
              name="repstime"
              value={repstime}
              onChange={e => onChange(e)}
              placeholder="Reps/time"
              className="mx-3 w-25"
            />
            <Button color="primary" onClick={onSubmit}>
              Add set
            </Button>
          </Col>
          <br />
          <ul className="no-style-list mx-auto">
            {exercise.sets.map(x => {
              return (
                <li key={x._id} className="my-1 py-1 border-top">
                  <Row>
                    <Col className="ml-5">
                      {x.weightdistance} x {x.repstime}
                    </Col>
                    <Button
                      className="ml-a mr-3 btn-sm"
                      color="danger"
                      onClick={e => onDeleteSet(e, exercise._id, x._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Row>
                </li>
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
  addSet: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  deleteTrackedExercise: PropTypes.func.isRequired,
  deleteTrackedExerciseSet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  addSet: addSet,
  deleteTrackedExercise: deleteTrackedExercise,
  deleteTrackedExerciseSet: deleteTrackedExerciseSet
});

export default connect(
  mapStateToProps,
  { addSet, deleteTrackedExercise, deleteTrackedExerciseSet }
)(Exercise);
