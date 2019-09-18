import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddEModal";
import AddWModal from "./AddWModal";
import Exercise from "./Exercise";

import { updateUser, saveWeight } from "../../actions/auth";

import Reveal from "react-reveal/Reveal";

const Tracker = ({
  updateUser,
  saveWeight,
  auth: { loading, user, isAuthenticated }
}) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: ""
  });

  const { date, weight } = state;

  const setAdding = () => {
    setState({ ...state, adding: true });
  };

  const onSubmit = async e => {
    e.preventDefault();
    saveWeight(weight, date);
    user.weight.unshift({ weight, date });
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
      <div className="shadow bg-light">
        <br />
        <h5>
          <DatePicker
            className="bg-light"
            onChange={date => setState({ ...state, date })}
            value={date}
            clearIcon={null}
            style={{ border: "1px solid black" }}
          />
        </h5>
        <br />
        <h5 className="">
          Weight: {currentWeight === null ? "Not logged" : currentWeight}
        </h5>
        <form
          className="form"
          style={{ display: "inline" }}
          onSubmit={onSubmit}
        >
          <span className="form-group">
            <input
              style={{
                fontFamily: "Lexend Deca",
                maxWidth: "25%",
                border: "1px solid black"
              }}
              name="weight"
              type="number"
              className="mr-3 bg-light"
              placeholder="Bodyweight..."
              value={weight}
              onChange={e =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value.replace(/[^0-9 ]/g, "")
                })
              }
              required
            />
          </span>
          <input type="submit" className="btn btn-primary mb-2" value="Save" />
        </form>
        <br />
        <br />
      </div>
      <div className="container">
        <br />
        <AddEModal date={date} />
        <br />
        <AddWModal date={date} setAdding={setAdding} />
        <br />
        <br />
        <ul className="pb-2 px-3 m-0" style={{ listStyleType: "none" }}>
          {user.exercisesTracked.map(x => {
            const newDate = new Date(x.date);
            {
              return x.loading === true ? (
                <div id="spinner-small" className=" mx-a mt-3" />
              ) : (
                newDate.getDate() === null
              );
            }
          })}
        </ul>
        <Reveal left cascade>
          <ul className="pb-2 px-3 m-0" style={{ listStyleType: "none" }}>
            {user.exercisesTracked.map(x => {
              const newDate = new Date(x.date);
              {
                return x.loading === true ? null : newDate.getDate() ===
                    date.getDate() &&
                  newDate.getMonth() === date.getMonth() &&
                  newDate.getFullYear() === date.getFullYear() ? (
                  <li key={x._id}>
                    <Exercise exercise={x} />
                  </li>
                ) : null;
              }
            })}
          </ul>
        </Reveal>
      </div>
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
