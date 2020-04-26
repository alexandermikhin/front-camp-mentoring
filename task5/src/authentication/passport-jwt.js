const passport = require("passport");
const passportJwt = require("passport-jwt");
const UserFileService = require("../user-file.service");

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const userService = new UserFileService();
const config = require("../config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader(config.headerKey),
      secretOrKey: config.authKey
    },
    async (jwt_payload, done) => {
      console.log("Jwt strategy.");
      let user;
      try {
        user = await userService.get(jwt_payload.login);
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
