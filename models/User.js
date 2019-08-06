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
  workouts: [{workout: {name: String}, exercises: [{name: {type: String}}]}],
  exercises: [{ name: { type: String }, type: { type: String } }],
  days: [
    {
      date: {type: Date},
      weight: {type: Number},
      exercises: [
        {
          name: {type: String},
          type: {type: String},
          weightdistances: [{weightdistance: {type: Number}}],
          repstimes: [{repstime: {type: Number}}]
        }
      ]
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
