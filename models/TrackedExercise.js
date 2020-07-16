const mongoose = require("mongoose");

const TrackedExerciseSchema = new mongoose.Schema({
  user: { type: String },
  date: { type: Date },
  name: { type: String },
  type: { type: String },
  sets: [{ weightDistance: { type: Number }, repsTime: { type: Number } }]
});

module.exports = User = mongoose.model(
  "trackedexercise",
  TrackedExerciseSchema
);
