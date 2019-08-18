import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Spinner from "../layout/Spinner";
import Exercise from "./Exercise";
import { Button, Col, Row, Container } from "reactstrap";

import { saveWeight } from "../../actions/auth";

const Tracker = ({ saveWeight, auth: { loading, user, isAuthenticated } }) => {
  const [date, setDate] = useState(new Date());

  const [weight, setWeight] = useState("");

  const onChange = e => setWeight(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Saving weight");
    saveWeight(weight, date);
    setWeight("");
    console.log("End saving weight");
  };

  const clear = () => {
    setWeight("");
  };

  var currentWeight =
    !loading && isAuthenticated
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
    <Spinner />
  ) : (
    <div className="text-center">
      <div className="shadow">
        <br />
        <h5>
          <DatePicker
            className="my-3"
            onChange={setDate}
            value={date}
            clearIcon={null}
          />
        </h5>
        <h5 className="my-3">
          Weight: {currentWeight === null ? "Not logged" : currentWeight}
        </h5>
        <Col className="my-3">
          <input
            className="w-25 mx-3"
            placeholder="Today's bodyweight"
            value={weight}
            onChange={e => onChange(e)}
          />
          <Button color="primary" className="mb-2" onClick={onSubmit}>
            Save
          </Button>
          <Button color="secondary" className="mb-2 ml-3" onClick={clear}>
            Clear
          </Button>
        </Col>
        <br />
      </div>
      <br />
      <br />
      <AddEModal date={date} />
      <AddWModal />
      <br />
      <br />
      <ul className="no-style-list">
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
