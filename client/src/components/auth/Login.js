import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "")
          : e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
    });

  const onSubmit = async e => {
    e.preventDefault();
    login(email.toLowerCase(), password);
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
          Sign in to start tracking exercises. No sensitive data other than a
          password is used or stored.
        </p>
      </div>
      <div className="mt-3 ml-3 mr-a" style={{ maxWidth: "22vh" }}>
        <h1 className="large text-primary">Login</h1>
        <br />
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca" }}
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
              size="17"
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
              minLength="6"
              required
              size="17"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          No account?{" "}
          <Link to="/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
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

export default connect(
  mapStateToProps,
  { login }
)(Login);
