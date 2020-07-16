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
  trackedWeight: [
    {
      date: { type: Date },
      type: { type: String },
      weight: { type: Number }
    }
  ],
  exercises: [{ name: { type: String }, type: { type: String } }],
  workouts: [
    {
      name: String,
      exercises: [{ type: String }] //Only store IDs
    }
  ],
  foods: [
    {
      name: { type: String },
      calories: { type: Number },
      protein: { type: Number },
      fats: { type: Number },
      carbs: { type: Number },
      type: { type: String },
      per: { type: Number }
    }
  ],
  meals: [
    {
      name: String,
      foods: [{ type: String }] //Only store IDs
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
