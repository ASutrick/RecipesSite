const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  Name: String,
  Type: String,
  Image: Buffer,
  Ingredients: [
    {
      Name: String,
      Amount: String,
    },
  ],
});
module.exports = mongoose.model("Recipe", recipeSchema);
