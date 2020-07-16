import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { login } from "../actions/auth";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const { email, password } = state;

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
    login(email.toLowerCase(), password);
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
        style={{ marginTop: "5px" }}
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
      <button className="btn" onClick={e => onSubmit(e)}>
        Login
      </button>{" "}
      <Link to="/register">
        <button className="btn">Register</button>
      </Link>
      <br />
      <br />
      <button className="btn">
        <big>Demo</big>
      </button>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
