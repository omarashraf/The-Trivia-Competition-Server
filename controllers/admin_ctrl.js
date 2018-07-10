var Admin = require("../models/admin");
var User = require("../models/user");

const bcrypt = require("bcryptjs");


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
            const token = jwt.sign(user.toJSON(), config.jwtSecret);
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
    var admin = new Admin ({
      email: req.body.email,
      password: req.body.password
    });  
    admin.save((err, admin) =>{
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
    });
}


module.exports = {
   loginAdmin,
   registerAdmin
}
