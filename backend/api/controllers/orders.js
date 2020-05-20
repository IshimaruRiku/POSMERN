const mongoose = require("mongoose");
const Order = require("../models/orders");
const User = require("../models/users");

exports.getAllOrders = (req, res) => {
  User.findById(req.body.user, (err, userFound) => {
    if(!err){
      if(userFound.role === 1) Order.find((err, orderFound) => !err ? res.send(orderFound) : res.send(err));
      else Order.find({user: req.body.user}, (err,orderFound) => !err ? res.send(orderFound) : res.send(err));
    }
    else res.send(err);
  });
};

exports.postOneOrder = (req, res) => {
  if(req.isAuthenticated()){
    Order.find((err, orderFound) => {
      console.log(orderFound);
      if(!err){
        const newOrder = new Order(
          {
            no: orderFound.length,
            item: req.body.item,
            user: req.body.user,
            note: req.body.note
          }
        );
        newOrder.save(err => !err ? res.send("Successfully added new order.") : res.send(err));
      } else res.send(err);
    });
  } else {
    res.send("You are not logged in.");
  }
};

exports.deleteAllOrders = (req, res) => {
  User.findById(req.body.user, (err, userFound) => {
    if(!err){
      if(userFound.role === 1) Order.deleteMany(err => !err ? res.send("Successfully deleted all orders.") : res.send(err));
      else res.send("You had no access.");
    }
    else res.send(err)
  });
};

exports.getOneOrder = (req, res) => {
  User.findById(req.body.user, (err, userFound) => {
    if(!err){
      if(userFound.role === 1) Order.findOne({no: req.params.orderId}, (err, orderFound) => !err ? res.send(orderFound) : res.send(err));
      else Order.findOne({no: req.params.orderId}, (err, orderFound) => {
        if(!err) {
          if(orderFound.user === userFound._id) res.send(orderFound);
        }
        else res.send(err);
      });
    }
    else res.send(err);
  });
};

exports.putOneOrder = (req, res) => {
  Order.update(
    {no: req.params.orderId},
    {no: req.body.no,
    product: req.body.product,
    user: req.body.user,
    note: req.body.note},
    {overwrite: true},
    err => !err ? res.send("Successfully updated the orders.") : res.send(err)
  );
};

exports.patchOneOrder = (req, res) => {
  Order.updateOne(
    {no: req.params.orderId},
    {$set: req.body},
    err => !err ? res.send("Successfully updated the order.") : res.send(err)
  );
};

exports.deleteOneOrder = (req, res) => {
  User.findById(req.body.user, (err, userFound) => {
    if(!err){
      if(userFound.role === 1) Order.deleteOne({no: req.params.orderId}, err => !err ? res.send("Successfully deleted the orders.") : res.send(err));
      else res.send("You had no access.");
    }
    else res.send(err)
  });
};
