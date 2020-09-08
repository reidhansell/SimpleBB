import React, { useState } from "react";

import { Link } from "react-router-dom";

export const Navi = () => {
  const [state, setState] = useState({
    expanded: false,
  });

  const { expanded } = state;

  const expand = (e) => {
    setState({ ...state, expanded: !expanded });
  };

  return (
    <>
      <div className="navi-container">
        <Link to="/">
          <big class="logo">
            Simple
            <span style={{ color: "rgb(34, 29, 35)" }}>Bodybuilding</span>
          </big>
        </Link>
        <button class="hamburger" onClick={(e) => expand(e)}>
          <big>
            <i class="fas fa-bars"></i>
          </big>
        </button>
      </div>

      <ul className={expanded ? "navi open" : "navi"}>
        <Link to="/exercise">
          <li>Exercise</li>
        </Link>

        <Link to="/food">
          <li>Food</li>
        </Link>
        <li className="clickable">Help / Support</li>
        <li className="clickable">Sign out</li>
        {
          //<Link to="/help">Help</Link>
        }
      </ul>
    </>
  );
};
