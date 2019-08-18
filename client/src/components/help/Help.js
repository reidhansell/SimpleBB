import React from "react";

function Help() {
  return (
    <div className="container">
      <br />
      <h1 className="text-primary">Help</h1>
      <br />
      <h5>Getting started</h5>
      <p>
        To start using the app create an account using an email, name, and
        password. None of this will be verified and the only password
        requirement is 6 characters. No sensitive data is used or stored.
      </p>
      <br />
      <p>
        Once an account has been made you will be taken to the exercise tracker.{" "}
      </p>
      <br />
      <h5>Using the exercise tracker</h5>
      <p>
        Here you can select a date (default today), update your weight for that
        day, and begin adding exercises. To add an exercise to your daily log
        click "Add Exercise." This will take you to your list of exercises
        (default empty).
      </p>
      <br />
      <p>
        At the bottom of this list you can click "Create Exercise." Name the
        exercise and, optionally, specify the type (weights, cardio... etc).
        When you're finished click "Finish Creating Exercise" and it will be
        added to your list of exercises.
      </p>
      <br />
      <p>
        Once an exercise is added to your exercise list, you may add it to your
        daily log by clicking on it from the list. Once an exercise is added to
        your daily log you will see it appear on the tracker. From there you can
        click on it to begin adding sets, reps, time, distance, etc.
      </p>
    </div>
  );
}

export default Help;
