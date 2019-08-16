import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/tracker" />;
  }

  return (
    <Row>
      <Col sm="12" md={{ size: 6, offset: 4 }}>
        <h1 className="my-5 text-primary">Simple Bodybuilding</h1>
        <h3 className="my-5">A fitness tracker focused around bodybuilding</h3>
        <Link to="/register" className="mr-1">
          <button type="button" className="btn btn-primary">
            Register
          </button>
        </Link>
        <Link to="/login" className="ml-1">
          <button type="button" className="btn btn-primary">
            Login
          </button>
        </Link>
      </Col>
    </Row>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
