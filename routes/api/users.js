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
        workouts: [],
        exercises: [],
        exercisesTracked: [],
        weight: []
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
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT api/users/exercises
// @desc     Add exercise
// @access   Private
router.put("/exercises", [auth, []], async (req, res) => {
  const { name, type } = req.body;

  const newExercise = {
    name,
    type
  };

  try {
    const user = await User.findOne({ _id: req.user.id });

    user.exercises.unshift(newExercise);

    await user.save();

    res.json(user.exercises);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/exercises/:id
// @desc     Delete an exercise
// @access   Private
router.delete("/exercises/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const exercise = user.exercises.find(x => {
      return x.id === req.params.id;
    });

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    await exercise.remove();

    await user.save();

    res.json({ msg: "Exercise removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/exercisesTracked
// @desc     Add tracked exercises
// @access   Private
router.put("/exercisesTracked", [auth, []], async (req, res) => {
  const { exercises } = req.body;

  try {
    const user = await User.findOne({ _id: req.user.id });

    exercises.forEach(x => {
      user.exercisesTracked.unshift(x);
    });

    await user.save();

    res.json(user.exercisesTracked);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/exercisesTracked/:id
// @desc     Delete a tracked exercise
// @access   Private
router.delete("/exercisesTracked/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const exercise = user.exercisesTracked.find(x => {
      return x.id === req.params.id;
    });

    if (!exercise) {
      return res.status(404).json({ msg: "Tracked exercise not found" });
    }

    await exercise.remove();

    await user.save();

    res.json({ msg: "Tracked exercise removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/exercisesTracked/sets
// @desc     Add set to tracked exercise
// @access   Private
router.put("/exercisesTracked/sets", [auth, []], async (req, res) => {
  const { weightdistance, repstime, exerciseid } = req.body;

  const newSet = {
    weightdistance,
    repstime,
    exerciseid
  };

  try {
    const user = await User.findOne({ _id: req.user.id });

    const exercise = user.exercisesTracked.find(x => {
      return x.id === exerciseid;
    });

    exercise.sets.unshift(newSet);

    await user.save();

    res.json(user.exercisesTracked);
  } catch (err) {
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
    try {
      const user = await User.findOne({ _id: req.user.id });

      const exercise = user.exercisesTracked.find(x => {
        return x.id === req.params.exerciseid;
      });

      if (!exercise) {
        return res.status(404).json({ msg: "Tracked exercise not found" });
      }

      const set = exercise.sets.find(x => {
        return x.id === req.params.setid;
      });

      if (!set) {
        return res
          .status(404)
          .json({ msg: "Set in tracked exercise not found" });
      }

      await set.remove();

      await user.save();

      res.json({ msg: "Tracked exercise removed" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/users/weight
// @desc     Update daily weight
// @access   Private
router.put("/weight", [auth, []], async (req, res) => {
  const { weight, type, date } = req.body;

  const newDate = {
    weight,
    type,
    date
  };
  try {
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
      ? (existingDate.weight = weight) && (existingDate.type = type)
      : user.weight.unshift(newDate);

    await user.save();

    res.json(user.weight);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/workouts
// @desc     Create Workout
// @access   Private
router.put("/workouts", [auth, []], async (req, res) => {
  const { name, exercises } = req.body;

  const newWorkout = {
    name: name,
    exercises: exercises
  };

  try {
    const user = await User.findOne({ _id: req.user.id });

    user.workouts.unshift(newWorkout);

    await user.save();

    res.json(user.workouts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/workouts/:id
// @desc     Delete a workout
// @access   Private
router.delete("/workouts/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const workout = user.workouts.find(x => {
      return x.id === req.params.id;
    });

    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    await workout.remove();

    await user.save();

    res.json({ msg: "Workout deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
