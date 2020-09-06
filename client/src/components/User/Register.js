import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import { register } from "../../actions/auth";

import { setAlert } from "../../actions/alert";

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = state;

  if (isAuthenticated) {
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
    if (password !== password2) {
      setAlert("Passwords must match", "danger");
    } else {
      register(name, email.toLowerCase(), password);
    }
  };

  return (
    <div style={{ marginTop: "20vh", textAlign: "center" }}>
      <h1>
        <b>Simple</b>
        <b style={{ color: "rgb(252, 252, 252)" }}>Bodybuilding</b>
      </h1>
      <br />
      <p
        style={{
          color: "rgb(252, 252, 252)",
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
        style={{ fontFamily: "Lexend Deca", width: "250px" }}
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
      <button className="btn" style={{ width: "250px" }}>
        Demo
      </button>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
