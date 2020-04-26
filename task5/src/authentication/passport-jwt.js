const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require("../db/user.model");
const config = require("../config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader(config.headerKey),
      secretOrKey: config.authKey
    },
    async (jwt_payload, done) => {
      let user;
      try {
        user = await User.findOne({ login: jwt_payload.login }).exec();
      } catch (e) {
        return done(e);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);
