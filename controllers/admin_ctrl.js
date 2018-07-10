var User = require("../models/admin");
const MailService = require("../services/mail_service");
const bcrypt = require("bcryptjs");


function loginAdmin(req, res, next) {
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
        Admin.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            //authenticate user, if it's his first login
                      // Create token if the password matched and no error was thrown
            const token = jwt.sign(user.toJSON(), config.jwtSecret);
            res.status(200).json({
              success: true,
              message: 'Authentication successfull',
              token
            });
          } else {
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
    console.log("hello");
    res.status(200).json({
      success: true,
      message: 'Authentication successfull',
      token
    });
    /*
    var admin = new Admin(req.body);
    admin.save((err, user) =>{
      if(err)
      {
        console.log(err)
        return res.status(409).json({
          status: '409',
          message: 'User already exists'
        })
      }
      if(!admin) 
      {
        return res.status(500).json({
          status: '500',
          message: 'Internal server error'
        })
      }
      else {
          return res.status(200).json({
          status : '200',
          message: 'Success',
          body: admin._idx
        })
      }
    })*/
}

function registerNewAdmin(req, res) {
  var user = new Admin ({
    email: req.body.email,
    score: 0
  });
  user.save(function(err) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      user = generateVerificationCode(user);
      return res.send(user);
    }
  });
}
module.exports = {
   loginAdmin,
   registerAdmin,
   registerNewAdmin
}
