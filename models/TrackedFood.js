const mongoose = require("mongoose");

const TrackedFoodSchema = new mongoose.Schema({
  user: { type: String },
  name: { type: String },
  calories: { type: Number },
  proteins: { type: Number },
  fats: { type: Number },
  carbs: { type: Number },
  date: { type: Date },
  type: { type: String },
  quantity: { type: Number }
});

module.exports = User = mongoose.model("trackedfood", TrackedFoodSchema);
