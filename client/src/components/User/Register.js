import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { register, startDemo } from "../../actions/auth";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Register = ({ register, startDemo, isAuthenticated, demo }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = state;

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

    register(name, email.toLowerCase(), password);
  };

  const onDemo = async (e) => {
    e.preventDefault();
    startDemo();
  };

  return (
    <div className="landing">
      <h1>
        <b className="text-dark">Simple</b>
        <b>Bodybuilding</b>
      </h1>
      <br />
      <p
        style={{
          textAlign: "left",
          display: "inline-block",
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
        placeholder="Name"
        style={{ width: "250px" }}
        type="text"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
        required
      ></input>
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
      <input
        className="inpt"
        type="password"
        placeholder="Confirm password"
        name="password2"
        value={password2}
        onChange={(e) => onChange(e)}
        minLength="6"
        required
        style={{ width: "250px" }}
      ></input>
      <br />
      <br />
      <Link to="/">
        <button className="btn" style={{ marginRight: "5px" }}>
          Login
        </button>
      </Link>
      <button
        className="btn"
        onClick={(e) => onSubmit(e)}
        style={{ marginLeft: "5px" }}
      >
        Register
      </button>
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  startDemo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  demo: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  demo: state.auth.demo,
});

export default connect(mapStateToProps, { register, startDemo })(Register);
