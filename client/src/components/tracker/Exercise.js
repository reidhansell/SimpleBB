import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSet } from "../../actions/auth";

import { Button } from "reactstrap";

const Exercise = ({ exercise, auth, addSet }) => {
  const [set, setSet] = useState({
    weightdistance: "",
    repstime: ""
  });

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

  return (
    <Fragment>
      <div className="row text-left">
        <span className="col h3">{exercise.name}</span>
        <span className="ml-a">
          <input
            name="weightdistance"
            value={weightdistance}
            onChange={e => onChange(e)}
            placeholder="Weight/distance"
            className="mx-3 w-25"
          />

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
        </span>
      </div>
      <ul className="no-style-list border-top border-bottom w-50 mx-auto">
        <p className="text-muted">Weight/disance x reps/sets</p>
        {exercise.sets.map(x => {
          return (
            <li className="my-1 py-1">
              {x.weightdistance} x {x.repstime}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

Exercise.propTypes = {
  auth: PropTypes.object.isRequired,
  addSet: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  addSet: addSet
});

export default connect(
  mapStateToProps,
  { addSet }
)(Exercise);
