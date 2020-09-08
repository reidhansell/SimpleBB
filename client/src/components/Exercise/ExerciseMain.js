import React, { useState } from "react";

import { Navi } from "../Navi";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const ActivityMain = ({ isAuthenticated }) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: "",
    type: "lbs",
  });

  const { date, weight, type } = state;

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
      </div>
      <br />
      <button className="btn" style={{marginRight: "5px"}}>Add Exercise</button>
      <button className="btn" style={{marginLeft: "5px"}}>Add Workout</button>
    </>
  );
};

ActivityMain.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ActivityMain);
