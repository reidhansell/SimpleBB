import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <ul className="alert-container">
      {alerts.map((alert) => (
        <li key={alert.id} className="alert">
          Error: {alert.msg}
        </li>
      ))}
    </ul>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
