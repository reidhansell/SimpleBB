import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Exercise from "./Exercise";
import { Button, Col } from "reactstrap";

import { saveWeight } from "../../actions/auth";

const Tracker = ({ saveWeight, auth: { loading, user, isAuthenticated } }) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: ""
  });

  const { date, weight } = state;

  const onSubmit = async e => {
    e.preventDefault();
    saveWeight(weight, date);
    setState({ ...state, weight: "" });
  };

  var currentWeight = loading
    ? null
    : isAuthenticated
    ? user.weight.find(x => {
        const newDate = new Date(x.date);
        return newDate.getDate() === date.getDate() &&
          newDate.getMonth() === date.getMonth() &&
          newDate.getFullYear() === date.getFullYear()
          ? x.weight
          : null;
      })
    : null;

  currentWeight = currentWeight ? currentWeight.weight : null;

  return !isAuthenticated || loading ? (
    <div id="spinner" className=" mx-a mt-5" />
  ) : (
    <div className="text-center">
      <div className="shadow bg-white rounded-bottom">
        <br />
        <h5>
          <DatePicker
            className="my-3"
            onChange={date => setState({ ...state, date })}
            value={date}
            clearIcon={null}
          />
        </h5>
        <h5 className="my-3">
          Weight: {currentWeight === null ? "Not logged" : currentWeight}
        </h5>
        <Col className="my-3">
          <input
            type="number"
            className="w-25 mx-3"
            placeholder="Today's bodyweight"
            value={weight}
            onChange={e =>
              setState({
                ...state,
                weight: e.target.value.replace(/[^0-9 ]/g, "")
              })
            }
            required
          />
          <Button color="primary" className="mb-2" onClick={onSubmit}>
            Save
          </Button>
          <Button color="secondary" className="mb-2 ml-3" onClick={() => setState({ ...state, weight: "" })}>
            Clear
          </Button>
        </Col>
        <br />
        <br />
        <AddEModal date={date} />
        <AddWModal date={date} />
        <br />
        <br />
      </div>

      <br />
      <br />
      <ul className="col pb-2" style={{ listStyleType: "none", margin: "0" }}>
        {user.exercisesTracked.map(x => {
          const newDate = new Date(x.date);
          return newDate.getDate() === date.getDate() &&
            newDate.getMonth() === date.getMonth() &&
            newDate.getFullYear() === date.getFullYear() ? (
            <li key={x._id}>
              <Exercise exercise={x} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

Tracker.propTypes = {
  auth: PropTypes.object.isRequired,
  saveWeight: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  saveWeight: saveWeight
});

export default connect(
  mapStateToProps,
  { saveWeight }
)(Tracker);
