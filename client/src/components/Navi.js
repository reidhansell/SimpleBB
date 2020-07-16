import React from "react";

import { Link } from "react-router-dom";

export const Navi = () => {
  return (
    <div className="navi-container">
      <ul className="navi">
        <Link to="/activity">Activity</Link>

        <Link to="/diet">Diet</Link>

        <Link to="/help">Help</Link>
      </ul>
    </div>
  );
};
