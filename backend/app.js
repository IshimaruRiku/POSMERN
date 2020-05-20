require("dotenv").config();
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const productsRoute = require("./api/routes/products");
const usersRoute = require("./api/routes/users");
const ordersRoute = require("./api/routes/orders");

var app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  secret: "Some secret key",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/pos", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
mongoose.set("useCreateIndex", true);

const passportAuth = require("./api/controllers/auth");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Set-Cookie, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.get("/auth", passportAuth.checkAuth);
app.post("/login", passportAuth.login);
app.get("/logout", passportAuth.logout);
////////////////////////////////////////////////////////Product Route ////////////////////////////////////////////////////////
app.use("/products", productsRoute);
//////////////////////////////////////////////////////User Route ////////////////////////////////////////////////////////////
app.use("/users", usersRoute);
//////////////////////////////////////////////////////Order Route ////////////////////////////////////////////////////////////
app.use("/orders", ordersRoute);

app.get("/", (req, res) => res.render("list"));

app.listen(8000, function()
{
  console.log("Server is running on port 8000");
});
