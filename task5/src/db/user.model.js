const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: String,
  password: String
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
