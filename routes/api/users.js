const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

const regex = new RegExp(/^([0-9a-zA-z]+)$|^$/, "i");

// @route    GET api/users
// @desc     Get user data
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Please enter a name between 1 and 64 characters")
      .trim()
      .isLength({ min: 1, max: 64 }),
    check("name", "Name must not contain any special characters").matches(
      regex
    ),
    check("email", "Please include a valid email")
      .trim()
      .isEmail()
      .normalizeEmail(),
    check(
      "password",
      "Please enter a password between 6 and 128 characters"
    ).isLength({ min: 6, max: 128 }),
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

      //NOTE... Default arrays don't work with MongoDB Schemas!
      user = new User({
        name,
        email,
        password,
        exercises: [],
        workouts: [],
        foods: [],
        meals: [],
        weight: [],
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;
      await user.exercises.unshift({ name: "Barbell Bench Press", type: "lbs" });
      await user.exercises.unshift({ name: "Barbell Row", type: "lbs" });
      await user.exercises.unshift({ name: "Barbell Squat", type: "lbs" });
      await user.exercises.unshift({ name: "Running", type: "mi" });
      /*await user.workouts.unshift({
        name: "Full Body",
        exercises: [
          { eID: exercises[0].id },
          { eID: exercises[1].id },
          { eID: exercises[2].id },
          { eID: exercises[3].id },
        ],
      });
      console.log("Workout added")*/
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
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

module.exports = router;
