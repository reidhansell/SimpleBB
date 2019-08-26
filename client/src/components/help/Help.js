import React from "react";

function Help() {
  return (
    <div className="container-fluid bg-white shadow rounded-bottom pb-3">
      <br />
      <h1 className="text-primary">Help</h1>
      <br />
      <h5>Getting started</h5>
      <p>
        To start using the app create an account using an email, name, and
        password. No verification necessary. No sensitive data is used or
        stored. Once an account has been made you will be taken to the exercise
        tracker.{" "}
      </p>
      <br />
      <h5>Using the exercise tracker</h5>
      <p>
        Here you can select a date (default today), update your weight for that
        day, and begin adding exercises or workouts. A workout is a pre-made
        list of exercises you can add in order to save time. To add an
        exercise/workout to your daily log click "Add Exercise/Workout." This
        will take you to your list of exercises/workouts (default empty).
      </p>
      <br />
      <p>
        At the bottom of this list you can click "Create Exercise/Workout." Name
        the exercise/workout and enter the required information. When you're
        finished click "Finish Creating Exercise/Workout" and it will be added
        to your list of exercises.
      </p>
      <br />
      <p>
        Once an exercise/workout is added to your exercise/workout list, you may
        add it to your daily log by clicking on it from the list. Once an
        exercise/workout is added to your daily log you will see them appear on
        the tracker. From there you can click your logged exercises to begin
        adding sets, reps, time, distance, etc.
      </p>
    </div>
  );
}

export default Help;
