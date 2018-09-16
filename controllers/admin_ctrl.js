var Admin = require("../models/admin");
var User = require("../models/user");
var Question = require("../models/question");
var Timer = require ('../models/timer');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const os = require('os');
const mailService = require('../services/mail_service');

function loginAdmin(req, res, next) {
  Admin.findOne({
    email: req.body.email
  }, (err, admin) => {
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
      admin.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          //authenticate user, if it's his first login. Create token if the password matched and no error was thrown
          const token = jwt.sign(admin.toJSON(), config.jwtSecret);
          res.status(200).json({
            success: true,
            message: 'Authentication successfull',
            token
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
  var admin = new Admin({
    email: req.body.email,
    password: req.body.password
  });
  admin.save((err, admin) => {
    if (err) {
      return res.status(409).json({
        status: '409',
        message: 'User already exists'
      })
    }
    if (!admin) {
      return res.status(500).json({
        status: '500',
        message: 'Internal server error'
      })
    }
    else {
      return res.status(200).json({
        status: '200',
        message: 'Success',
        body: admin._id
      })
    }
  });
}
function inviteAdmin(req, res) {
  var admin = new Admin({
    email: req.body.email,
    password: config.defaultPassword
  })
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: 'Bad request',
        body: 'Admin has already been invited!'
      });
    } else {
      var body = `<p>You now have Admin privileges to Trivia Competition. In order to access these privileges please login using the following <a href="${config.adminLoginUrl}">link</a>.</p>`
        + '<p>Use the following credentials:</p>' + `<p>Email:${admin.email}</p>` + `<p>Password:${config.defaultPassword}</p>`;
      mailService.sendEmail(admin['email'], 'Trivia Competition: Admin Privilages', body)
        .then(() => {
          return res.status(200).json({
            status: '200',
            message: 'Success',
            body: 'Admin has been invited!'
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: '400',
            message: 'Bad request',
            body: 'Could not send email to invited admin!'
          });
        });
    }
  })
}
async function stats(req, res) {
  let users = await User.find({});
  let questions = await Question.find({});
  let genres = await Question.find().distinct('genre');
  res.status(200).json({
    status: '200',
    message: 'Success',
    body: {
      users: users.length,
      questions: questions.length,
      genres: genres.length
    }
  });
}

function changePassword(req, res) {
  Admin.findOne({
    email: req.user.email
  }, (err, admin) => {
    if (err) {
      res.status(400).json(err);
    };
    if (!admin) {
      res.status(404).json({
        status: '404',
        status: 'Not found',
        body: 'Incorrect email!'
      });
    } else {
      // Check if old_password is correct
      admin.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          //check if new_password and confirm_password match
          if (req.body.new_password != req.body.confirm_password) {
            res.status(400).json({
              status: '400',
              message: 'Bad request',
              body: 'Password mismatch!'
            });
          }
          else {
            //change password
            admin.password = req.body.new_password;
            admin.save((err, admin) => {
              if (err) {
                res.status(400).json(err);
              } else {
                if (admin) {
                  const token = jwt.sign(admin.toJSON(), config.jwtSecret);
                  res.status(200).json({
                    status: '200',
                    message: 'Ok',
                    body: 'Password has been changed!',
                    token
                  });
                } else {
                  res.status(400).json({
                    status: '400',
                    status: 'Bad request',
                    body: 'Unable to change password. Please try again!'
                  });
                }
              }
            })
          }
        } else {
          res.status(400).json({
            status: '400',
            message: 'Bad Request',
            body: 'Incorrect password!'
          });
        }
      });
    }
  });
}
module.exports = {
  loginAdmin,
  registerAdmin,
  inviteAdmin,
  stats,
  changePassword
}
