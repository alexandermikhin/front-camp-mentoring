const passport = require("passport");
const FacebookStragegy = require("passport-facebook").Strategy;
const User = require("../db/user.model");

passport.use(
  new FacebookStragegy(
    {
      clientID: "2533977106822251",
      clientSecret: "2f9a5da26e82be1d2a46975793b63d5e",
      callbackURL: "http://localhost:3000/login/facebook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Facebook strategy.");
      if (!accessToken) {
        done("No access token");
      }

      const login = profile.displayName;
      let user;
      try {
        user = await User.findOne({login}).exec();
        if (!user) {
          user = {
            login,
            password: ''
          };
          await User.create(user);
        }
      } catch (e) {
        return done(e);
      }

      return done(null, user);
    }
  )
);
