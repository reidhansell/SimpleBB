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
    console.log(date);
    try {
      const user = await User.findById(req.user.id);
      console.log(user);
      console.log("Attempting to find tracked exercises");
      const trackedExercises = await TrackedExercise.find({
        user: req.user.id,
        date: date,
      });

      if (!trackedExercises) {
        trackedExercises = [];
      }

      console.log(trackedExercises);
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
      //Holding off on validating ID inputs such as user and exercise because I am unsure how they're generated
      check("exercises.*.date", "Date invalid").trim().isDate(),
    ],
  ],
  async (req, res) => {
    const { trackedExercises } = req.body;
    console.log(trackedExercises);
    console.log("begin adding exercises");
    try {
      const user = req.user.id;
      await trackedExercises.forEach((x) => {
        const { date, exercise } = x;
        console.log(date);
        let trackedExercise = new TrackedExercise({
          user,
          date,
          exercise,
          sets: [],
        });
        console.log("begin single save");
        trackedExercise.save();
      });
      console.log("exercises saved");
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

    await trackedExercise.remove(); //Confirm this doesn't need to be saved

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    POST api/trackedExercises/:id/sets
// @desc     Add set to tracked exercise
// @access   Private
router.post("/:id/sets", [auth, []], async (req, res) => {
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
});

// @route    DELETE api/trackedExercises/:exerciseid/:setid
// @desc     Delete a set
// @access   Private
router.delete("/:id/:setid", auth, async (req, res) => {
  try {
    const trackedExercise = await TrackedExercise.findOne({
      _id: req.params.id,
    });
    console.log(trackedExercise);
    const set = await trackedExercise.sets.find((x) => {
      return x.id === req.params.setid;
    });
    console.log(set);
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
