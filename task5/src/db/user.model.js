const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const userSchema = new mongoose.Schema({
  login: String,
  password: String
});

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, config.authKey);
  console.log(token);
  return token;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
