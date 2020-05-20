const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {type: Number, default: 2},
  name: {
    firstName: String,
    lastName: String
  },
  address: {
    state: String,
    city: String,
    street: String,
    code: Number
  },
  created: {type: Date, default: Date.now}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
