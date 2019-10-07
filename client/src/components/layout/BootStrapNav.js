import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import Fade from "react-reveal/Fade";

const BootStrapNav = ({
  user: { user },
  auth: { isAuthenticated, loading },
  logout
}) => {
  const [toggle, setToggle] = useState(false);

  const close = () => {
    setToggle(false);
  };

  const authLinks = (
    <Nav className="ml-auto" navbar>
      {!loading && isAuthenticated && (
        <span className="mx-3">Welcome, {user.name}</span>
      )}
      <NavItem onClick={() => close()}>
        <Link to="/tracker" className="mx-3">
          Exercise Tracker
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/about" className="mx-3">
          About
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/help" className="mx-3">
          Help
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="#" className="mx-3 disabled">
          Diet Tracker
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <a onClick={logout} href="#!" className="mx-3">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto" navbar>
      <NavItem onClick={() => close()}>
        <Link to="/login" className="mx-3">
          Login
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/register" className="mx-3">
          Register
        </Link>
      </NavItem>

      <NavItem onClick={() => close()}>
        <Link to="/about" className="mx-3">
          About
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/help" className="mx-3">
          Help
        </Link>
      </NavItem>
    </Nav>
  );

  return (
    <Navbar dark color="primary" expand="lg">
      <NavbarBrand id="navbar-brand" href="/" className="mx-2">
        <h4 className="my-0 pb-1">
          <b>
            <Fade top cascade>
              <span className="text-light">Simple</span>
            </Fade>
            <Fade bottom cascade>
              <span className="text-secondary">Bodybuilding</span>
            </Fade>
          </b>
        </h4>
      </NavbarBrand>
      <NavbarToggler onClick={() => setToggle(!toggle)} />
      <Collapse isOpen={toggle} navbar>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Collapse>
    </Navbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func,
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { logout }
)(BootStrapNav);
