const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const TrackedExercise = require("../../models/TrackedExercise");

const regex = new RegExp(/^([0-9a-zA-z]+)$|^$/, "i");

// @route    POST api/trackedExercises
// @desc     Add tracked exercises
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("exercises.*.name", "Name must be between 1 and 64 characters")
        .trim()
        .isLength({ min: 1, max: 64 })
        .matches(regex),
      check("exercises.*.type", "Type must be between 1 and 16 characters")
        .trim()
        .isLength({ min: 1, max: 16 })
        .matches(regex),
      //To add... is equal to limited possible inputs ("mi"/"km"...etc)?
      check("exercises.*.sets.*", "Sets must be integers").trim().isInt(),
    ],
  ],
  async (req, res) => {
    const { trackedExercises } = req.body;

    try {
      await trackedExercises.forEach((x) => {
        const { user, date, name, type, sets } = x;
        let trackedExercise = new TrackedExercise(user, date, name, type, sets);

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

    if (trackedExercise.user !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "You do not own this tracked exercise" });
    }

    if (!trackedExercise) {
      return res.status(404).json({ msg: "Tracked exercise not found" });
    }

    await trackedExercise.remove(); //Confirm this doesn't need to be saved

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    POST api/trackedExercises/sets
// @desc     Add set to tracked exercise
// @access   Private
router.post("/:id/sets", [auth, []], async (req, res) => {
  const { weightdistance, repstime } = req.body;

  const newSet = {
    weightdistance,
    repstime,
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

// @route    DELETE api/trackedExercises/:exerciseid/sets/:setid
// @desc     Delete a set
// @access   Private
router.delete("/:id/sets/:setid", auth, async (req, res) => {
  try {
    const trackedExercise = await trackedExercise.findOne({
      _id: req.params.id,
    });

    const set = await trackedExercise.sets.find((x) => {
      return x.id === req.params.setid;
    });

    if (!set) {
      return res.status(404).json({ msg: "Set not found" });
    }

    await set.remove(); //Confirm no need to save after this

    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
