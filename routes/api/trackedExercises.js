const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const TrackedExercise = require("../../models/TrackedExercise");
const User = require("../../models/User");

const regex = new RegExp(/^([0-9a-zA-z ]+)$|^$/, "i");

// @route    GET api/trackedExercises
// @desc     Get tracked exercises from a particular date
// @access   Private
router.get(
  "/",
  [auth, [check("date", "Date invalid").trim().isDate()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date } = req.body;

    try {
      const user = await User.findById(req.user.id);

      const trackedExercises = await TrackedExercise.find({
        user: req.user.id,
        date: date,
      });

      if (!trackedExercises) {
        trackedExercises = [];
      }

      res.json(trackedExercises);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/trackedExercises
// @desc     Add tracked exercises
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      //Holding off on validating ID inputs such as user and exercise because I am unsure how they're generated. Sets array is always initially empty
      check("exercises.*.date", "Date invalid").trim().isDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { trackedExercises } = req.body;

    try {
      const user = req.user.id;
      await trackedExercises.forEach((x) => {
        const { date, exercise } = x;

        let trackedExercise = new TrackedExercise({
          user,
          date,
          exercise,
          sets: [],
        });

        trackedExercise.save();
      });

      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/trackedExercises/:id
// @desc     Delete a tracked exercise
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const trackedExercise = await TrackedExercise.findOne({
      _id: req.params.id,
    });

    if (!trackedExercise) {
      return res.status(404).json({ msg: "Tracked exercise not found" });
    }

    await trackedExercise.remove();

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    POST api/trackedExercises/:id/sets
// @desc     Add set to tracked exercise
// @access   Private
router.post(
  "/:id/sets",
  [
    [
      auth,
      [
        check("weightDistance", "Weight / Distance must be a valid integer")
          .trim()
          .isInt(),
        check("repsTime", "Reps / Time must be a valid integer").trim().isInt(),
      ],
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { weightDistance, repsTime } = req.body;

    const newSet = {
      weightDistance,
      repsTime,
    };

    try {
      const trackedExercise = await TrackedExercise.findOne({
        _id: req.params.id,
      });

      await trackedExercise.sets.unshift(newSet);

      await trackedExercise.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/trackedExercises/:exerciseid/:setid
// @desc     Delete a set
// @access   Private
router.delete("/:id/:setid", auth, async (req, res) => {
  try {
    const trackedExercise = await TrackedExercise.findOne({
      _id: req.params.id,
    });

    const set = await trackedExercise.sets.find((x) => {
      return x.id === req.params.setid;
    });

    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }

    await set.remove();

    await trackedExercise.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
