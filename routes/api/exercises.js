const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, query, validationResult, body } = require("express-validator");

const User = require("../../models/User");

const regex = new RegExp(/^([0-9a-zA-z ]+)$|^$/, "i");

// @route    POST api/exercises
// @desc     Add exercise
// @access   Public
router.post(
  "/",
  [
    auth,
    [
      body("*", "No special characters").matches(regex),
      check("name", "Name must be between 1 and 64 characters")
        .trim()
        .isLength({ min: 1, max: 64 }),
      check("type", "Type must be between 1 and 16 characters")
        .trim()
        .isLength({ min: 1, max: 16 }),
      //To add... is equal to limited possible inputs ("mi"/"km"...etc)?
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type } = req.body;

    const newExercise = {
      name,
      type,
    };

    try {
      const user = await User.findOne({ _id: req.user.id });

      await user.exercises.unshift(newExercise);

      await user.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/exercises/:id
// @desc     Delete an exercise
// @access   Public
router.delete(
  "/:id",
  auth,
  [
    check("id", "ID must be between 1 and 64 characters") //This is mostly a placeholder. I don't know how IDs are generated so I will need to find out and come back to this
      .trim()
      .isLength({ min: 1, max: 64 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.user.id });

      const exercise = await user.exercises.find((x) => {
        return x.id === req.params.id;
      });

      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }

      await exercise.remove();

      await user.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/users/exercises/:id
// @desc     EDIT exercise
// @access   Public
router.put(
  "/:id",
  [
    auth,
    [
      check("id", "ID must be between 1 and 64 characters") //This is mostly a placeholder. I don't know how IDs are generated so I will need to find out and come back to this
        .trim()
        .isLength({ min: 1, max: 64 }),
      body("*", "No special characters").matches(regex),
      check("name", "Name must be between 1 and 64 characters")
        .trim()
        .isLength({ min: 1, max: 64 }),

      check("type", "Type must be between 1 and 16 characters")
        .trim()
        .isLength({ min: 1, max: 16 }), //To add... is equal to limited possible inputs?
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type } = req.body;

    try {
      const user = await User.findOne({ _id: req.user.id });
      const exercise = await user.exercises.find((x) => {
        return x.id === req.params.id;
      });

      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }

      exercise.name = name;
      exercise.type = type;

      await user.save();

      res.json({ success: 1 });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
