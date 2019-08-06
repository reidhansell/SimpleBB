import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Spinner from "../layout/Spinner";

const Tracker = ({ auth: { user, isAuthenticated, loading } }) => {
  const [date, setDate] = useState(new Date());

  return !isAuthenticated ? (
    <Spinner />
  ) : (
    <div className="container text-center">
      <DatePicker
        className="mt-5"
        onChange={setDate}
        value={date}
        clearIcon={null}
      />
      <h3 className="my-3">Weight: {}</h3>
      <br />
      <AddEModal />
      <AddWModal />
      <br />
      {
        //user.days.exercises.map(x => {return <li className="my-1 border-top border-bottom py-1">{x.name}</li>;})
      }
    </div>
  );
};

Tracker.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Tracker);
