var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.207.85.122:27017/riseup_db";

var Session = require("./models/session");

exports.initDB = function() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("DB created");

    var newSession = new Session({
      username: "",
      qIndex: 0
    });

    Session.find({}).execFind(function(err, sessions) {
      if (err) {
        console.log(err);
      }
      else {
        if (sessions.length <= 0) {
          newSession.save(function(err) {
            if (err) {
              console.log("ERROR (session init) --> ", err);
              }
            else {
              console.log("Session init Succeeded");
            }
          });
        }
      }
    });
    db.close();
  });
}
