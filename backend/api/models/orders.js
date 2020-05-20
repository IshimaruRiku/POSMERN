const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  no: {
    type: String,
    required: true,
    unique: true
  },
  created: {type: Date, default: Date.now},
  item: [{
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
    price: Number,
    qty: Number
  }],
  user: {
    type:mongoose.Schema.Types.ObjectId, required: true, ref: "Users"
  },
  note: String
});

module.exports = mongoose.model("Order", orderSchema);
