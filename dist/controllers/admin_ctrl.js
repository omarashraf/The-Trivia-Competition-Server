"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var stats = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var users, questions, genres;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Stats');
            _context.next = 3;
            return User.find({});

          case 3:
            users = _context.sent;
            _context.next = 6;
            return Question.find({});

          case 6:
            questions = _context.sent;
            _context.next = 9;
            return Question.find().distinct('genre');

          case 9:
            genres = _context.sent;

            res.status(200).json({
              status: '200',
              message: 'Success',
              body: {
                users: users.length,
                questions: questions.length,
                genres: genres.length
              }
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function stats(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = require("../models/admin");
var User = require("../models/user");
var Question = require("../models/question");
var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
var config = require("../config/config");
var os = require('os');
var mailService = require('../services/mail_service');

function loginAdmin(req, res, next) {
  console.log('ADMIN LOGIN');
  Admin.findOne({
    email: req.body.email
  }, function (err, admin) {
    if (err) {
      res.status(400).json(err);
    };
    if (!admin) {
      res.status(404).json({
        status: '404',
        body: 'not found'
      });
    } else {
      // Check if password matches
      admin.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          //authenticate user, if it's his first login. Create token if the password matched and no error was thrown
          var token = jwt.sign(admin.toJSON(), config.jwtSecret);
          res.status(200).json({
            success: true,
            message: 'Authentication successfull',
            token: token
          });
        } else {
          res.status(400).json({
            status: '400',
            message: 'Bad Request',
            body: 'Incorrect email or password'
          });
        }
      });
    }
  });
}
function registerAdmin(req, res, next) {
  console.log('REGISTERING ADMIN');
  var admin = new Admin({
    email: req.body.email,
    password: req.body.password
  });
  admin.save(function (err, admin) {
    if (err) {
      console.log(err);
      return res.status(409).json({
        status: '409',
        message: 'User already exists'
      });
    }
    if (!admin) {
      return res.status(500).json({
        status: '500',
        message: 'Internal server error'
      });
    } else {
      return res.status(200).json({
        status: '200',
        message: 'Success',
        body: admin._idx
      });
    }
  });
}
function inviteAdmin(req, res) {
  console.log('INVITING ADMIN');
  var admin = new Admin({
    email: req.body.email,
    password: config.defaultPassword
  });
  admin.save(function (err, admin) {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'Invited admin already registered'
      });
    } else {
      var body = "<p>You now have Admin privileges to Trivia Competition. In order to access these privileges please login using the following <a href=\"" + config.adminLoginUrl + "\">link</a>.</p>" + '<p>Use the following credentials:</p>' + ("<p>Email:" + admin.email + "</p>") + ("<p>Password:" + config.defaultPassword + "</p>");
      mailService.sendEmail(admin['email'], 'Trivia Competition: Admin Privilages', body);
      return res.status(200).json({
        status: '200',
        message: 'Success',
        body: 'Added admin'
      });
    }
  });
}

module.exports = {
  loginAdmin: loginAdmin,
  registerAdmin: registerAdmin,
  inviteAdmin: inviteAdmin,
  stats: stats
};
//# sourceMappingURL=admin_ctrl.js.map
