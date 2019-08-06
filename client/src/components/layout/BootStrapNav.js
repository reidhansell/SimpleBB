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
        <Link to="/tracker" className="mx-2">Tracker</Link>
      </NavItem>
      <NavItem>
        <Link to="/workouts" className="mx-2">Workouts</Link>
      </NavItem>
      <NavItem>
        <Link to="/exercises" className="mx-2 mr-5">Exercises</Link>
      </NavItem>
      <NavItem>
        <a onClick={logout} href="#!">
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
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">SimpleBB</NavbarBrand>
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
