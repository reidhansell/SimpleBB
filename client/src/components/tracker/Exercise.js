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
  const [state, setState] = useState({
    weightdistance: "",
    repstime: "",
    modal: false,
    deleting: false
  });

  const { weightdistance, repstime, modal, deleting } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const set = { weightdistance, repstime };
    set.exerciseid = exercise._id;
    addSet(set);
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ ...state, deleting: true, toggle: false });
    deleteTrackedExercise(id);
  };

  const onDeleteSet = async (e, exerciseid, setid) => {
    e.preventDefault();
    deleteTrackedExerciseSet(exerciseid, setid);
  };

  const toggle = () => {
    setState({ ...state, modal: !modal });
  };

  return deleting ? null : (
    <Fragment>
      <div
        className="clickable pb-1 mb-2 shadow rounded container-fluid bg-white"
        onClick={toggle}
      >
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
        <ul className="col" style={{ listStyleType: "none", margin: "0" }}>
          {exercise.sets.length > 0
            ? exercise.sets.map(x => {
                return (
                  <li key={x._id} className="my-1 py-1 ">
                    {x.weightdistance} x {x.repstime}
                  </li>
                );
              })
            : "Click or tap to log a set"}
        </ul>
      </div>
      <Modal className="text-center" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{exercise.name} logged sets</ModalHeader>
        <ModalBody>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <span className="form-group">
              <input
                type="number"
                name="weightdistance"
                value={weightdistance}
                onChange={e => onChange(e)}
                placeholder="Weight/distance"
                className="w-25 mr-3"
                required
              />
            </span>
            X
            <span className="form-group">
              <input
                type="number"
                name="repstime"
                value={repstime}
                onChange={e => onChange(e)}
                placeholder="Reps/time"
                className="mx-3 w-25"
                required
              />
            </span>
            <input type="submit" className="btn btn-primary" value="Add set" />
          </form>

          <br />
          <ul
            className="mx-auto"
            style={{ listStyleType: "none", margin: "0", padding: "0" }}
          >
            {exercise.sets.map(x => {
              return (
                <div className="row" key={x._id}>
                  <li
                    key={x._id}
                    className="border-top border-bottom my-1 col pt-1"
                  >
                    {x.weightdistance} x {x.repstime}
                  </li>
                  <Button
                    className="my-1"
                    color="danger"
                    onClick={e => onDeleteSet(e, exercise._id, x._id)}
                  >
                    <i className="fas fa-trash ml-a" />
                  </Button>
                </div>
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
