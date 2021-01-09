import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { Navi } from "../Navi";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const ActivityMain = ({ isAuthenticated, demo }) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: "",
    type: "lbs",
  });

  const { date } = state;

  if (!isAuthenticated && !demo) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navi />
      <div className="container">
        <br />

        <DatePicker
          className="picker"
          onChange={(date) => setState({ ...state, date })}
          selected={date}
        />

        <br />
        <br />
        <Link to="/addexercise">
          <button className="btn" style={{ marginRight: "5px" }}>
            Add Exercise
          </button>
        </Link>
        <button className="btn" style={{ marginLeft: "5px" }}>
          Add Workout
        </button>
        <br />
        <br />
        {demo ? (
          <>
            <span className="text-primary">WARNING</span>{" "}
            <span> - You are in DEMO MODE, nothing here will be saved</span>
          </>
        ) : null}
      </div>
    </>
  );
};

ActivityMain.propTypes = {
  isAuthenticated: PropTypes.bool,
  demo: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  demo: state.auth.demo,
});

export default connect(mapStateToProps, {})(ActivityMain);
