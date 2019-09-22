import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-light shadow pb-3">
      <div className="container">
        <br />
        <h1 className="text-primary">About</h1>
        <br />
        <h5>What?</h5>
        <p>
          Simple Bodybuilding is an app for tracking exercises. Over time, diet
          tracking and social profiles will be added. Keep all of your workout
          data instead of losing it when you uninstall the app.
        </p>
        <br />
        <h5>How?</h5>
        <p>
          For instructions on how to use the app, see{" "}
          <Link to="/help" className="text-primary">
            Help
          </Link>
          . This app is built by a one-man team using the MERN stack. I suggest
          using a unique password in order to protect yourself. However, no
          sensitive data is currently used or stored.
        </p>
        <br />
        <h5>Who?</h5>
        <p>
          My name is{" "}
          <a
            href="https://www.reidhansell.com"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reid Hansell
          </a>
          , a software developer currently seeking opportunity to use my skills
          in a professional capacity. I am fitness-obsessed and have loved
          bodybuilding since I was a teen. I made this app not only to gain
          experience but also to use on a daily basis. My hopes are to turn this
          into a mobile app aswell to make usage more realistic.
        </p>
      </div>
    </div>
  );
}

export default About;
