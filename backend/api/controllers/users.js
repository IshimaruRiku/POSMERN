const mongoose = require("mongoose");
const User = require("../models/users");
const passport = require("passport");

exports.getAllUsers = (req, res) => {
  User.find((err, userFound) => !err ? res.send(userFound) : res.send(err));
};

exports.postOneUser = (req, res) => {
  User.findOne({username: req.body.username}, (err, userFound) => {
    if(err) res.send(err);
    else {
      if(userFound) res.send({register: false, message: "Username has been used or registered"});
      else {
        User.register({username: req.body.username}, req.body.password, (err, user) => {
          if(err) res.send(err);
          else passport.authenticate("local")(req, res, () => res.send({user: user._id, auth: true, role: user.role}));
        });
      }
    }
  });
};
  // const newUser = new User(
  //   {
  //     username: req.body.username,
  //     password: req.body.password,
  //     name: {
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName
  //     },
  //     address: {
  //       state: req.body.state,
  //       city: req.body.city,
  //       street: req.body.street,
  //       code: req.body.code
  //     }
  //   }
  // );
  // newUser.save(err => !err ? res.send("Successfully added new user.") : res.send(err));

exports.deleteAllUsers = (req, res) => {
  User.deleteMany(err => !err ? res.send("Seuccessfully deleted all users.") : res.send(err));
};

exports.getOneUser = (req, res) => {
  User.findOne({username: req.params.userId}, (err, userFound) => !err ? res.send(userFound) : res.send(err));
};

exports.putOneUser = (req, res) => {
  User.update(
    {username: req.params.userId},
    {username: req.body.username,
    password: req.body.password,
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    address: {
      state: req.body.state,
      city: req.body.city,
      street: req.body.street,
      code: req.body.code
    },
    role: req.body.role},
    {overwrite: true},
    err => !err ? res.send("Successfully updated the user.") : res.send(err)
  );
};

exports.patchOneUser = (req, res) => {
  User.updateOne(
    {username: req.params.userId},
    {$set: req.body},
    err => !err ? res.send("Successfully updated the user.") : res.send(err)
  );
};

exports.deleteOneUser = (req, res) => {
  User.deleteOne({username: req.params.userId}, err => !err ? res.send("Successfully deleted the user.") : res.send(err)
  );
};
