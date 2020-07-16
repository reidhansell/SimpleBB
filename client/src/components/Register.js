import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { register } from "../actions/auth";

import { setAlert } from "../actions/alert";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = state;

  if (isAuthenticated) {
    return <Redirect to="/activity" />;
  }

  const onChange = e =>
    setState({
      ...state,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "")
          : e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
    });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords must match", "danger");
    } else {
      register(name, email.toLowerCase(), password);
    }
  };

  return (
    <div style={{ marginTop: "20vh" }}>
      <h1>
        <b>Simple</b>
        <b style={{ color: "rgb(252, 252, 252)" }}>Bodybuilding</b>
      </h1>
      <p
        style={{
          color: "rgb(252, 252, 252)",
          textAlign: "left",
          display: "inline-block",
          marginTop: "0"
        }}
      >
        Track activity and diet. <br />
        Get help starting your fitness journey. <br />
        Connect with friends.
      </p>
      <br />
      <input
        className="inpt"
        placeholder="Preferred name"
        style={{ marginTop: "5px", fontFamily: "Lexend Deca" }}
        type="text"
        name="name"
        value={name}
        onChange={e => onChange(e)}
        required
        size="20"
      ></input>
      <br />
      <br />
      <input
        className="inpt"
        type="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={e => onChange(e)}
        required
        size="20"
      ></input>
      <br />
      <br />
      <input
        className="inpt"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={e => onChange(e)}
        minLength="6"
        required
        size="20"
      ></input>
      <br />
      <br />
      <input
        className="inpt"
        type="password"
        placeholder="Confirm password"
        name="password2"
        value={password2}
        onChange={e => onChange(e)}
        minLength="6"
        required
        size="20"
      ></input>
      <br />
      <br />
      <Link to="/">
        <button className="btn">Login</button>
      </Link>{" "}
      <button className="btn" onClick={e => onSubmit(e)}>
        Register
      </button>
      <br />
      <br />
      <button className="btn">
        <big>Demo</big>
      </button>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
