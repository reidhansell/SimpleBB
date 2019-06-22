const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  sets:[[Number]]
});

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema);
