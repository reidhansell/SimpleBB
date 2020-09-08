import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { login, startDemo } from "../../actions/auth";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Login = ({ login, startDemo, isAuthenticated, demo }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  if (isAuthenticated || demo) {
    return <Redirect to="/exercise" />;
  }

  const onChange = (e) =>
    setState({
      ...state,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "")
          : e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""),
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email.toLowerCase(), password);
  };

  const onDemo = async (e) => {
    e.preventDefault();
    startDemo();
  };

  return (
    <div className="landing" >
      <h1 style={{ margin: "0" }}>
        <b>Simple</b>
        <b style={{ color: "rgb(252, 252, 252)" }}>Bodybuilding</b>
      </h1>
      <br />
      <p
        style={{
          color: "rgb(252, 252, 252)", //Color of $light
          textAlign: "left",
          display: "inline-block",
          margin: "0",
        }}
      >
        Track exercises
        <br />
        Track foods macro-style
        <br />
        Get helping starting your fitness journey
      </p>
      <br />
      <br />
      <input
        className="inpt"
        type="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        required
        style={{ width: "250px" }}
      ></input>
      <br />
      <br />
      <input
        className="inpt"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
        minLength="6"
        required
        style={{ width: "250px" }}
      ></input>
      <br />
      <br />
      <button
        className="btn"
        onClick={(e) => onSubmit(e)}
        style={{ marginRight: "5px" }}
      >
        Login
      </button>
      <Link to="/register">
        <button className="btn" style={{ marginLeft: "5px" }}>
          Register
        </button>
      </Link>
      <br />
      <br />
      <button
        className="btn"
        style={{ width: "250px" }}
        onClick={(e) => onDemo(e)}
      >
        Demo
      </button>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  startDemo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  demo: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  demo: state.auth.demo,
});

export default connect(mapStateToProps, { login, startDemo })(Login);
