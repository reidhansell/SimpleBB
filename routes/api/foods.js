const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, query, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    PUT api/foods
// @desc     Add food
// @access   Private
router.put(
  "/",
  [
    auth,
    [
      check("name", "Name must be between 1 and 64 characters")
        .isLength({ min: 1, max: 64 })
        .trim()
        .escape(),
      check("type", "Type must be between 1 and 16 characters")
        .isLength({ min: 1, max: 16 })
        .trim()
        .escape(), //To add... is equal to limited possible inputs?
      check("calories", "Calories must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("protein", "Protein must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("fats", "Fats must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("carbs", "Carbs must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("per", "Per must be integer between 0 and 10,000")
        .isInt({ min: 1, max: 10000 })
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type, per, calories, protein, fats, carbs } = req.body;

    const newFood = {
      name,
      type,
      per,
      calories,
      protein,
      fats,
      carbs
    };

    try {
      const user = await User.findOne({ _id: req.user.id });

      user.foods.unshift(newFood);

      await user.save();

      res.json(user.foods);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/foods/:id
// @desc     Delete a food
// @access   Public
router.delete(
  "/:id",
  auth,
  [
    query("id", "ID must be between 1 and 64 characters")
      .isLength({ min: 1, max: 64 })
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.user.id });

      const food = user.foods.find(x => {
        return x.id === req.params.id;
      });

      if (!food) {
        return res.status(404).json({ msg: "Food not found" });
      }

      await food.remove();

      await user.save();

      res.json({ msg: "Food removed" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/users/foods/:id
// @desc     EDIT food
// @access   Public
router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Name must be between 1 and 64 characters")
        .isLength({ min: 1, max: 64 })
        .trim()
        .escape(),
      check("type", "Type must be between 1 and 16 characters")
        .isLength({ min: 1, max: 16 })
        .trim()
        .escape(), //To add... is equal to limited possible inputs?
      check("calories", "Calories must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("protein", "Protein must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("fats", "Fats must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("carbs", "Carbs must be integer between 0 and 10,000")
        .isInt({ min: 0, max: 10000 })
        .trim()
        .escape(),
      check("per", "Per must be integer between 0 and 10,000")
        .isInt({ min: 1, max: 10000 })
        .trim()
        .escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type, per, calories, protein, fats, carbs } = req.body;

    const newFood = {
      name,
      type,
      per,
      calories,
      protein,
      fats,
      carbs
    };

    try {
      const user = await User.findOne({ _id: req.user.id });
      const food = user.foods.find(x => {
        return x.id === req.params.id;
      });

      if (!food) {
        return res.status(404).json({ msg: "Food not found" });
      }

      food.name = name;
      food.type = type;
      food.per = per;
      food.calories = calories;
      food.protein = protein;
      food.fats = fats;
      food.carbs = carbs;

      await user.save();

      res.json(user.foods);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
