const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  price: Number,
  image: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);
