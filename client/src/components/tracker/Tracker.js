import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Exercise from "./Exercise";
import { Button } from "reactstrap";

import { updateUser, saveWeight } from "../../actions/auth";

const Tracker = ({ updateUser, saveWeight, auth: { loading, user, isAuthenticated } }) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: ""
  });

  const { date, weight } = state;

  const onSubmit = async e => {
    e.preventDefault();
    saveWeight(weight, date);
    user.weight.unshift({weight, date});
    updateUser(user);
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
        <input
        style={{fontFamily: "Lexend Deca"}}
          name="weight"
          type="number"
          className="mr-3"
          placeholder="Bodyweight"
          value={weight}
          style={{maxWidth: "25%"}}
          onChange={e =>
            setState({
              ...state,
              [e.target.name]: e.target.value.replace(/[^0-9 ]/g, "")
            })
          }
          required
        />
        <Button color="primary" className="mb-2" onClick={onSubmit}>
          Save
        </Button>
        <Button
          color="secondary"
          className="mb-2 ml-3"
          onClick={() => setState({ ...state, weight: "" })}
        >
          Clear
        </Button>
        <br />
        <br />
        <AddEModal date={date} />
        <AddWModal date={date} />
        <br />
        <br />
      </div>
      <br />
      <br />
      <ul className="pb-2 px-3 m-0" style={{ listStyleType: "none" }}>
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
  updateUser: PropTypes.func.isRequired,
  saveWeight: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  updateUser: updateUser,
  saveWeight: saveWeight
});

export default connect(
  mapStateToProps,
  { updateUser, saveWeight }
)(Tracker);
