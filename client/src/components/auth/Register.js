import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "name"
          ? e.target.value
              .replace(/[^a-zA-Z ]/g, "")
              .replace(/(\b[a-z](?!\s))/g, function(x) {
                return x.toUpperCase();
              })
          : e.target.name === ("password" || "password2")
          ? e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
          : e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "")
    });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(name, email.toLowerCase(), password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/tracker" />;
  }

  return (
    <div className="bg-white rounded-bottom shadow p-1 d-flex flex-row pb-3">
      <div className="mt-3 mr-3 ml-a" style={{ maxWidth: "22vh" }}>
        <h5 className="text-primary mt-2">Simple Bodybuilding</h5>
        <br />
        <p>
          A web-based fitness tracker catering to bodybuilder-style training.
        </p>
        <p>
          Register to start tracking exercises. No sensitive data other than a
          password is used or stored.
        </p>
      </div>
      <div className="mt-3 ml-3 mr-a" style={{ maxWidth: "22vh" }}>
        <h1 className="large text-primary">Register</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              size="17"
              required
            />
          </div>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              size="17"
              required
            />
          </div>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              size="17"
              required
            />
          </div>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              size="17"
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Have an account?{" "}
          <Link to="/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
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

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
