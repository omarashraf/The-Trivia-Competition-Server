'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: "smtp.isus.emc.com",
  port: 25,
  secureConnection: false, // TLS requires secureConnection to be false
  secure: false,
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

function sendEmail(receiverEmail, Subject, Body) {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: "trivia@dell.com",
      to: receiverEmail,
      subject: Subject,
      html: Body
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve('Email sent: ' + info.response);
      }
    });
  });
}

module.exports = {
  sendEmail: sendEmail
};
//# sourceMappingURL=mail_service.js.map
