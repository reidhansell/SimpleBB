const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Exercise Model
const Exercise = require('../../models/Exercise');

// @route   GET api/exercises
// @desc    Get All Exercises
// @access  Public
router.get('/', (req, res) => {
  Exercise.find()
    .sort({ date: -1 })
    .then(exercises => res.json(exercises));
});

// @route   POST api/exercises
// @desc    Create An Exercise
// @access  Private
router.post('/', auth, (req, res) => {
  const newExercise = new Exercise({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    sets: req.body.sets
  });

  newExercise.save().then(exercise => res.json(exercise));
});

// @route   DELETE api/exercises/:id
// @desc    Delete A Exercise
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => exercise.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
