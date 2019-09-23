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
  workouts: {
    type: Array,
    default: [
      {
        name: "Full Body",
        exercises: [
          { name: "Bench Press", type: "lbs" },
          { name: "Barbell Row", type: "lbs" },
          { name: "Barbell Squat", type: "lbs" },
          { name: "Running", type: "mi" }
        ]
      }
    ],
    name: { type: String },
    exercises: [{ name: { type: String }, type: { type: String } }]
  },
  exercises: {
    type: Array,
    default: [
      { name: "Bench Press", type: "lbs" },
      { name: "Barbell Row", type: "lbs" },
      { name: "Barbell Squat", type: "lbs" },
      { name: "Running", type: "mi" }
    ]
  },
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
