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
  console.log("exercise in route:");
  console.log(name);
  console.log(type);
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

// @route    PUT api/users/days/exercises
// @desc     Add exercise to day
// @access   Private
router.put("/days", [auth, []], async (req, res) => {
  console.log("entered route");
  const { name, type } = req.body;
  console.log("exercise in route:");
  console.log(name);
  console.log(type);
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

module.exports = router;
