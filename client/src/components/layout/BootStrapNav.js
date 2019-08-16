import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const BootStrapNav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [toggle, setToggle] = useState(false);

  const authLinks = (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to="/tracker" className="mx-3">Exercise Tracker</Link>
      </NavItem>
      <NavItem>
        <Link to="/about" className="mx-3">About</Link>
      </NavItem>
      <NavItem>
        <Link to="/help" className="mx-3">Help</Link>
      </NavItem>
      <NavItem>
        <Link to="/diettracker" className="mx-3 disabled">Diet Tracker</Link>
      </NavItem>
      <NavItem>
        <a onClick={logout} href="#!" className="mx-3">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to="/register" className="mx-2">Register</Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="mx-2">Login</Link>
      </NavItem>
    </Nav>
  );

  return (
    <Navbar className="mb-5 border-bottom" light expand="md">
      <NavbarBrand id="navbar-brand" href="/" className="text-primary">Simple Bodybuilding</NavbarBrand>
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
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(BootStrapNav);
