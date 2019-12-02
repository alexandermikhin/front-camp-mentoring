const User = require("./user.model");

class UserService {
  async get(login) {
    return User.findOne({ login }).then();
  }

  async create(login, password) {
    User.create({ login, password });
  }
}

module.exports = UserService;
