const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./db/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    async (login, password, done) => {
      let user;
      try {
        user = await User.findOne({ login }).exec();
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
