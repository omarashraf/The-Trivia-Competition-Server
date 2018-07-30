"use strict";

var express = require("express");
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1:27017/riseup_db";

var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var validate = require('express-validation');

var User = require("./models/user");
var userCtrl = require("./controllers/user_ctrl");
var userValidation = require("./validations/user_validations");
var userRoutes = require("./routes/user_routes");
var questionRoutes = require("./routes/question_routes");
var AdminRoutes = require("./routes/admin_routes");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", AdminRoutes);

// endpoint for testing
app.get("/", userCtrl.testEndpoint);

/*
  - add a new user in the db
  - need to have the email in the body of the request
  - score is set to 0 initially
*/
app.post("/register", validate(userValidation.register), userCtrl.registerUser);
app.use('/users', userRoutes);

app.use('/questions', questionRoutes);

// app is running on port 3000
// TODO: set port among env variables
app.listen(3000, function () {
  console.log("Listening on port 3000..");
});

app.use(function (err, req, res, next) {
  res.status(400).json(err);
});

// db connection through mongoose and printing status in console
mongoose.connect(mongoDB).then(function () {
  console.log("Connected to Database");
}).catch(function (err) {
  console.log("Connection to Database error\n ", err);
});
//# sourceMappingURL=express.js.map
