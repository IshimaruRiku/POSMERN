const User = require("../models/users");
const passport = require("passport");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.login = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err) => {
    if(err) console.log(err);
    else passport.authenticate("local")(req, res, () => {
      res.send({
        user: res.req.user._id,
        auth: true,
        role: res.req.user.role
    });
  });
})}

exports.logout = (req, res) => {
  req.logout();
  res.send({auth: false});
}

exports.checkAuth = (req, res) => {
  if(req.isAuthenticated()){
    res.send({user: req.user._id, message: "Authenticated", auth: true, role: req.user.role});
  } else {
    res.send("User not Authenticated");
  }
}
