import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/tracker' />;
  }

  return (
    <div className="container text-center">
      <h1 className="my-5">Simple Bodybuilding</h1>
      <h3 className="my-5">A fitness tracker focused around bodybuilding</h3>
      <Link to='/register' className="mr-1"><button type="button" className="btn btn-primary">Register</button></Link>
      <Link to='/login' className="ml-1"><button type="button" className="btn btn-primary">Login</button></Link>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
