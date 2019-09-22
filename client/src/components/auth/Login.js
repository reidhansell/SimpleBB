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
    <div className="bg-light shadow p-1 pb-3">
      <div className="container">
        <h1 className="pt-3">
          <b>
            <span className="text-primary">Simple</span>
            <span className="text-secondary">Bodybuilding</span>
          </b>
        </h1>
        <p>
          A web-based fitness tracker catering to bodybuilder-style training.
        </p>
        <p>
          Sign in to start tracking exercises. No sensitive data other than a
          password is used or stored.
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              style={{ fontFamily: "Lexend Deca", border: "1px solid black" }}
              className="bg-light"
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
              style={{ fontFamily: "Lexend Deca", border: "1px solid black" }}
              className="bg-light"
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
