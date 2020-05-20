const passport = require("passport");
const User = require("../models/users");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");

const config = {
  secret: "Some secret key"
}

//Local Options for username and password
const localOptions = {
  usernameField: "username",
  passwordField: "password"
};
//Set up Local Login Strategy
const localLogin = new localStrategy(localOptions, (username, password, done) => {
  User.findOne({username}, (err, userFound) => {
    if(err) { return done(err)}
    if(!userFound) {return done(null, false, {error: "Your login details could not be verified"})}
    userFound.comparePassword(password, (err, isMatch) => {
      if(err) {return done(err)}
      if(!isMatch) {return done(null, false, {error: "Your login details could not be verified"})}
      return done(null, userFound);
    });
  });
});

//JWT Strategy Options
const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeader(),
  secretOrKey: config.secret
}
//Set up JWT Login Strategy
const jwtLogin = new JWTStrategy(JWTOptions, (payload, done) => {
  User.findById(payload._id, (err, userFound) => {
    if(err) {return done(err, false)}
    if(userFound) {done(null, userFound)}
    else {done(null, false)}
  })
})


passport.use(localLogin);
passport.use(jwtLogin);
