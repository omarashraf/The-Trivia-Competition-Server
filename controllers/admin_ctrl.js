var Admin = require("../models/admin");
var User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const os = require('os');
const mailService = require('../services/mail_service');

function loginAdmin(req, res, next) {
  console.log(req.body.email)
  console.log(req.body.password)
  Admin.findOne({
    email: req.body.email
  }, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      res.status(401).json({
        sattus: '401',
        statustext: 'Unauthorized',
        errors: [{
          messages: [
            'Wrong email or password'
          ]
        }]
      });
    } else {
      // Check if password matches
      console.log("enter here")
      admin.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          //authenticate user, if it's his first login
          // Create token if the password matched and no error was thrown
          const token = jwt.sign(admin.toJSON(), config.jwtSecret);
          res.status(200).json({
            success: true,
            message: 'Authentication successfull',
            token
          });
        } else {
          console.log(isMatch)
          res.status(401).json({
            sattus: '401',
            statustext: 'Unauthorized',
            errors: [{
              messages: [
                'Wrong email or password'
              ]
            }]
          });
        }
      });
    }
  });
}


function registerAdmin(req, res, next) {
  console.log(req.body);
  var admin = new Admin({
    email: req.body.email,
    password: req.body.password
  });
  admin.save((err, admin) => {
    if (err) {
      console.log(err)
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
  console.log('INVITING ADMIN');
  var admin = new Admin({
    email: req.body.email,
    password: config.defaultPassword
  })
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        status:400,
        message: 'Invited admin already registered'
      });
    } else {
      var body = `<p>You now have Admin privileges to Trivia Competition. In order to access these privileges please login using the following <a href="${config.adminLoginUrl}">link</a>.</p>`
         + '<p>Use the following credentials:</p>' + `<p>Email:${admin.email}</p>` + `<p>Password:${config.defaultPassword}</p>`;
      mailService.sendEmail(admin['email'], 'Trivia Competition: Admin Privilages', body);
      return res.status(200).json({
        status: '200',
        message: 'Success',
        body: 'Added admin'
      })
    }
  })
}
module.exports = {
  loginAdmin,
  registerAdmin,
  inviteAdmin
}
