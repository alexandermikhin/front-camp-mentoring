const mongoose = require("mongoose");
const User = require("./user.model");

class UserService {
  async auth(login, password) {
    return User.findOne({ login, password }).exec();
  }

  async register(login, password) {
    const user = await User.findOne({ login }).exec();
    if (user) {
      throw new Error("There is already registered user.");
    }

    User.create({ login, password });
  }
}

module.exports = UserService;
