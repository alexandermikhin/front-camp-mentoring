const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserFileService = require("../user-file.service");

const userService = new UserFileService();

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    async (login, password, done) => {
      console.log("Local strategy.");
      let user;
      try {
        user = await userService.get(login);
      } catch (e) {
        return done(e);
      }

      if (!user || user.password !== password) {
        return done(null, false, { message: "User or password is invalid." });
      }

      return done(null, user);
    }
  )
);
