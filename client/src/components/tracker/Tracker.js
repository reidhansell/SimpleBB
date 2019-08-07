import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Spinner from "../layout/Spinner";
import Exercise from "./Exercise";

const Tracker = ({ auth: { loading, user, isAuthenticated } }) => {
  const [date, setDate] = useState(new Date());

  return !isAuthenticated || loading ? (
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
      <AddEModal date={date} />
      <AddWModal />
      <br />
      <ul className="no-style-list">
        {user.exercisesTracked.map(x => {
          return new Date(x.date).getDate() === date.getDate() ? (
            <li className="my-1 border-top border-bottom py-1" key={x._id}>
              <Exercise exercise={x} />
            </li>
          ) : null;
        })}
      </ul>
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
