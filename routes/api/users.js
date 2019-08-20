const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        exercises: [],
        workouts: [],
        days: []
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT api/users/exercises
// @desc     Add exercise
// @access   Private
router.put("/exercises", [auth, []], async (req, res) => {
  console.log("entered route");
  const { name, type } = req.body;

  const newExercise = {
    name,
    type
  };

  try {
    console.log("req.user:");
    console.log(req.user);
    const user = await User.findOne({ _id: req.user.id });

    console.log("newExercise:");
    console.log(newExercise);
    user.exercises.unshift(newExercise);

    console.log("new user: " + user);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/exercises/:id
// @desc     Delete an exercise
// @access   Private
router.delete("/exercises/:id", auth, async (req, res) => {
  console.log("entered route");
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("user:");
    console.log(user);
    const exercise = user.exercises.find(x => {
      return x.id === req.params.id;
    });
    console.log("exercise:");
    console.log(exercise);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    await exercise.remove();

    await user.save();

    console.log("newUser:");
    console.log(user);

    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/days/exercisesTracked
// @desc     Add exercise to day
// @access   Private
router.put("/exercisesTracked", [auth, []], async (req, res) => {
  console.log("entered route");
  const { name, type, date } = req.body;
  const newExercise = {
    name,
    type,
    date
  };

  try {
    console.log("req.user:");
    console.log(req.user);
    const user = await User.findOne({ _id: req.user.id });

    console.log("newExercise:");
    console.log(newExercise);
    user.exercisesTracked.unshift(newExercise);

    console.log("new user: " + user);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/exercisesTracked/:id
// @desc     Delete an exercise
// @access   Private
router.delete("/exercisesTracked/:id", auth, async (req, res) => {
  console.log("entered route");
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("user:");
    console.log(user);
    const exercise = user.exercisesTracked.find(x => {
      return x.id === req.params.id;
    });
    console.log("exercise:");
    console.log(exercise);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    await exercise.remove();

    await user.save();

    console.log("newUser:");
    console.log(user);

    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/exercisesTracked/sets
// @desc     Add set to exercisesTracked
// @access   Private
router.put("/exercisesTracked/sets", [auth, []], async (req, res) => {
  console.log("entered route");
  console.log(" ");
  const { weightdistance, repstime, exerciseid } = req.body;

  const newSet = {
    weightdistance,
    repstime,
    exerciseid
  };

  try {
    console.log("req.user:");
    console.log(req.user);
    console.log(" ");
    const user = await User.findOne({ _id: req.user.id });

    const exercise = user.exercisesTracked.find(x => {
      return x.id === exerciseid;
    });

    console.log("exercise: ");
    console.log(exercise);
    console.log(" ");

    console.log("newSet:");
    console.log(newSet);
    console.log(" ");
    exercise.sets.unshift(newSet);

    console.log("new user: ");
    console.log(user);
    console.log(" ");
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/exercisesTracked/:exerciseid/sets/:setid
// @desc     Delete a set
// @access   Private
router.delete(
  "/exercisesTracked/:exerciseid/sets/:setid",
  auth,
  async (req, res) => {
    console.log("entered route");
    try {
      const user = await User.findOne({ _id: req.user.id });
      console.log("user:");
      console.log(user);
      const exercise = user.exercisesTracked.find(x => {
        return x.id === req.params.exerciseid;
      });

      const set = exercise.sets.find(x => {
        return x.id === req.params.setid;
      });
      console.log("exercise:");
      console.log(exercise);

      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }

      await set.remove();

      await user.save();

      console.log("newUser:");
      console.log(user);

      res.json({ msg: "Exercise removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/users/weight
// @desc     Add set to exercisesTracked
// @access   Private
router.put("/weight", [auth, []], async (req, res) => {
  console.log("entered route");
  console.log(" ");
  const { weight, date } = req.body;

  console.log("date: ");
  console.log(date);
  console.log(" ");

  const newDate = {
    weight,
    date
  };
  try {
    console.log("req.user:");
    console.log(req.user);
    console.log(" ");
    const user = await User.findOne({ _id: req.user.id });

    const reqDate = new Date(date);

    const existingDate = user.weight.find(x => {
      const newDate = new Date(x.date);
      return (
        newDate.getDate() === reqDate.getDate() &&
        newDate.getMonth() === reqDate.getMonth() &&
        newDate.getFullYear() === reqDate.getFullYear()
      );
    });

    existingDate
      ? (existingDate.weight = weight)
      : user.weight.unshift(newDate);

    console.log("new user: ");
    console.log(user);
    console.log(" ");
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
