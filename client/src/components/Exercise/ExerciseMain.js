import React, { useState } from "react";

import { Navi } from "../Navi";

import DatePicker from "react-date-picker";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const ActivityMain = ({ isAuthenticated }) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: "",
    type: "lbs"
  });

  const { date, weight, type } = state;

  return (
    <>
      <div className="page">
        <Navi />
        <br />
        <h3>
          <DatePicker
            onChange={date => setState({ ...state, date })}
            value={date}
            clearIcon={null}
          />
        </h3>
      </div>
    </>
  );
};

ActivityMain.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(ActivityMain);
