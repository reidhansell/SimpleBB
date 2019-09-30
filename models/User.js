const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  workouts: [
    {
      name: String,
      exercises: [{ name: { type: String }, type: { type: String } }]
    }
  ],
  exercises: [{ name: { type: String }, type: { type: String } }],
  exercisesTracked: [
    {
      date: { type: Date },
      name: { type: String },
      type: { type: String },
      sets: [{ weightdistance: { type: Number }, repstime: { type: Number } }]
    }
  ],
  weight: [
    {
      date: { type: Date },
      type: { type: String },
      weight: { type: Number }
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
