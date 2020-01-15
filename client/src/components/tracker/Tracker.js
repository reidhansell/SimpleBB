import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-date-picker";
import AddEModal from "./AddE/AddEModal";
import AddWModal from "./AddW/AddWModal";
import Exercise from "./Exercise";

import { updateUser, saveWeight } from "../../actions/user";

import Reveal from "react-reveal/Reveal";

const Tracker = ({
  updateUser,
  saveWeight,
  user: { user },
  auth: { loading }
}) => {
  const [state, setState] = useState({
    date: new Date(),
    weight: "",
    type: "lbs"
  });

  const { date, weight, type } = state;

  const setAdding = () => {
    setState({ ...state, adding: true });
  };

  const onChangeType = e =>
    setState({
      ...state,
      type: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    saveWeight(weight, type, date);
    user.weight.unshift({ weight, type, date });
    updateUser(user);
    setState({ ...state, weight: "" });
  };

  var currentWeight = loading
    ? null
    : user.weightTracked.find(x => {
        const newDate = new Date(x.date);
        return newDate.getDate() === date.getDate() &&
          newDate.getMonth() === date.getMonth() &&
          newDate.getFullYear() === date.getFullYear()
          ? x.weight
          : null;
      });

  return loading ? (
    <div id="spinner" className=" mx-auto mt-5" />
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
        <h4 className="">
          {currentWeight ? currentWeight.weight : "Weight not logged"}{" "}
          {currentWeight ? currentWeight.type : null}
        </h4>
        <br />
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
                width: "125px",
                height: "30px",
                border: "1px solid black"
              }}
              name="weight"
              /*BUG: PROBLEMS WITH +. -, AND e INPUT. NO CURRENT FIX (RESEARCHED).
              OPTIONS: CHANGE TO TEXT AND LOSE NUMBER PAD DEFAULT
              ALLOW FOR + AND - AND KEEP NUMBER PAD DEFAULT */
              //type="number"
              className="bg-light"
              placeholder="Bodyweight..."
              value={weight}
              onChange={e =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value.replace(/[^0-9.]/g, "")
                })
              }
              required
            />
            <select
              style={{
                fontFamily: "Lexend Deca",
                border: "1px solid black",
                height: "30px"
              }}
              name="type"
              value={type}
              onChange={e => onChangeType(e)}
              className="mx-3 bg-light"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </span>
          <input type="submit" className="btn btn-primary mb-1" value="Save" />
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
        <Reveal left cascade>
          <ul className="pb-2 px-3 m-0" style={{ listStyleType: "none" }}>
            {user.exercisesTracked.map(x => {
              const newDate = new Date(x.date);

              return x.loading === true ? null : newDate.getDate() ===
                  date.getDate() &&
                newDate.getMonth() === date.getMonth() &&
                newDate.getFullYear() === date.getFullYear() ? (
                <li key={x._id}>
                  <Exercise exercise={x} />
                </li>
              ) : null;
            })}
          </ul>
        </Reveal>
        {user.exercisesTracked.find(x => {
          return (
            new Date(x.date).getDate() === date.getDate() &&
            new Date(x.date).getMonth() === date.getMonth() &&
            new Date(x.date).getFullYear() === date.getFullYear() &&
            x.deleting !== true
          );
        }) ? null : (
          <b>Add an exercise or workout and it will appear here</b>
        )}
      </div>
    </div>
  );
};

Tracker.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  saveWeight: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  updateUser: updateUser,
  saveWeight: saveWeight
});

export default connect(mapStateToProps, { updateUser, saveWeight })(Tracker);
