var express = require("express");
var mongoose = require("mongoose");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var validate = require('express-validation');
var winston = require('winston');
var expressWinston = require('express-winston');
var config = require('./config/config')
var winstonInstance = require('./config/winston.config')

var userCtrl = require("./controllers/user_ctrl");
var userValidation = require("./validations/user_validations");
var userRoutes = require("./routes/user_routes");
var questionRoutes = require("./routes/question_routes");
var AdminRoutes = require("./routes/admin_routes")

app.use(cors());
app.use(bodyParser.json());


// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body'); 
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
        timestamp: true
      })
    ],
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'
  })
  );
};

// endpoint for testing
app.get("/", userCtrl.testEndpoint);

/*
  - add a new user in the db
  - need to have the email in the body of the request
  - score is set to 0 initially
*/
app.post("/register", validate(userValidation.register), userCtrl.registerUser);
app.use('/users', userRoutes);
app.use("/admin", AdminRoutes);
app.use('/questions', questionRoutes);

// app is running on port 3000
app.listen(config.port, function () {
  winstonInstance.info('listening on port', config.port);
});

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

// db connection through mongoose and printing status in console
mongoose.connect(`mongodb://${config.dbHost}/${config.dbName}`).then(() => {
  winstonInstance.info('Connected to database');
}).catch((err) => {
  winstonInstance.error("Connection to Database error\n ", err);
});
