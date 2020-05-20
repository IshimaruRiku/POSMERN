const mongoose = require("mongoose");
const Product = require("../models/products");

exports.getAllProducts = (req, res) => {
  Product.find((err, productFound) => !err ? res.json(productFound) : res.send(err));
};

exports.postOneProduct = (req, res) => {
  const newProduct = new Product(
  {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description
  });
  newProduct.save(err => !err ? res.send("New product successfully added.") : res.send(err));
};

exports.deleteAllProducts = (req, res) => {
  Product.deleteMany(err => !err ? res.send("All product successfully deleted.") : res.send(err));
};

exports.getOneProduct = (req, res) => {
  Product.findOne({name: req.params.productId}, (err, productFound) => !err ? res.send(productFound) : res.send(err));
};

exports.putOneProduct = (req, res) => {
  Product.update(
    {name: req.params.productId},
    {name: req.body.name, category: req.body.category, price: req.body.price, image: req.body.image, description: req.body.description},
    {overwrite: true},
    err => !err ? res.send("Successfully updated the product.") : res.send(err)
  );
};

exports.patchOneProduct = (req, res) => {
  Product.update(
    {name: req.params.productId},
    {$set: req.body},
    err => !err ? res.send("Successfully updated the product.") : res.send(err)
  );
};

exports.deleteOneProduct = (req, res) => {
  Product.deleteOne({name: req.params.productId}, err => !err ? res.send("Successfully deleted the product.") : res.send(err));
};
