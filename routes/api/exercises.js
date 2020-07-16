const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, query, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    PUT api/exercises
// @desc     Add exercise
// @access   Public
router.put(
  "/",
  [
    auth,
    [
      check("name", "Name must be between 1 and 64 characters")
        .isLength({ min: 1, max: 64 })
        .trim()
        .escape(),
      check("type", "Type must be between 1 and 16 characters")
        .isLength({ min: 1, max: 16 })
        .trim()
        .escape() //To add... is equal to limited possible inputs?
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);

// @route    DELETE api/exercises/:id
// @desc     Delete an exercise
// @access   Public
router.delete(
  "/:id",
  auth,
  [
    query("id", "ID must be between 1 and 64 characters")
      .isLength({ min: 1, max: 64 })
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
      query("id", "ID must be between 1 and 64 characters")
        .isLength({ min: 1, max: 64 })
        .trim()
        .escape(),
      check("name", "Name must be between 1 and 64 characters")
        .isLength({ min: 1, max: 64 })
        .trim()
        .escape(),
      check("type", "Type must be between 1 and 16 characters")
        .isLength({ min: 1, max: 16 })
        .trim()
        .escape() //To add... is equal to limited possible inputs?
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type } = req.body;

    try {
      const user = await User.findOne({ _id: req.user.id });
      const exercise = user.exercises.find(x => {
        return x.id === req.params.id;
      });

      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }

      exercise.name = name;
      exercise.type = type;

      await user.save();

      res.json(user.exercises);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
