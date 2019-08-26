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
import logo from "../../LogoWhite.png";

const BootStrapNav = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const [toggle, setToggle] = useState(false);

  const close = () => {
    setToggle(false);
  };

  const authLinks = (
    <Nav className="ml-auto" navbar>
      {!loading && isAuthenticated && (
        <span className="mx-2">Welcome, {user.name}</span>
      )}
      <NavItem onClick={() => close()}>
        <Link to="/tracker" className="mx-2">
          Exercise Tracker
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/about" className="mx-2">
          About
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/help" className="mx-2">
          Help
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="#" className="mx-2 disabled">
          Diet Tracker
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <a onClick={logout} href="#!" className="mx-2">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto" navbar>
      <NavItem onClick={() => close()}>
        <Link to="/login" className="mx-2">
          Login
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/register" className="mx-2">
          Register
        </Link>
      </NavItem>

      <NavItem onClick={() => close()}>
        <Link to="/about" className="mx-2">
          About
        </Link>
      </NavItem>
      <NavItem onClick={() => close()}>
        <Link to="/help" className="mx-2">
          Help
        </Link>
      </NavItem>
    </Nav>
  );

  return (
    <Navbar dark color="primary" expand="lg">
      <NavbarBrand id="navbar-brand" href="/" className="mx-2">
        <img src={logo} alt="Logo" style={{ maxWidth: "215px" }} />
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
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(BootStrapNav);
