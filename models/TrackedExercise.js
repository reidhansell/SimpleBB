const mongoose = require("mongoose");

const TrackedExerciseSchema = new mongoose.Schema({
  user: { type: String },
  date: { type: String },
  exercise: { type: String },
  sets: [{ weightDistance: { type: Number }, repsTime: { type: Number } }],
});

module.exports = User = mongoose.model(
  "trackedexercise",
  TrackedExerciseSchema
);
