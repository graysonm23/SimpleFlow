var db = require("../models");
var bcrypt = require("bcryptjs");
var mailgun = require("mailgun-js");
var saltRounds = 10;
require("dotenv").config();

module.exports = function(app) {
  // Get all examples
  app.get("/examples", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.post("/login", function(req, res) {
    console.log(req.body);
    db.Users.findOne({
      where: {
        email: req.body.email
      }
      // eslint-disable-next-line no-unused-vars
    }).then(function(dbUsers) {
      if (dbUsers) {
        //if account exists
        bcrypt.compare(req.body.password, dbUsers.password, function(
          //compare hashed password
          err,
          response
        ) {
          if (err) {
            res.status(403);
          }
          if (response) {
            //if passwords match
            res.json(dbUsers);
          } else {
            // response is OutgoingMessage object that server response http request
            var DOMAIN = process.env.DOMAIN;
            var mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
            var data = {
              from: "SimpleFlow <simpleflow2020@gmail.com>",
              to: "grayson.mcmurry23@gmail.com",
              subject: "Login Attempt",
              template: "login"
            };
            mg.messages().send(data, function(error, body) {
              console.log(body);
            });
            return res.json({
              success: false,
              message: "passwords do not match"
            });
          }
        });
      } else {
        //if account does not exist
        return res.json({ success: false, message: "no account found" });
      }
    });
    // eslint-disable-next-line no-undef
  });
  app.post("/create/user", function(req, res) {
    var DOMAIN = process.env.DOMAIN;
    var mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
    var data = {
      from: "SimpleFlow <simpleflow2020@gmail.com>",
      to: "grayson.mcmurry23@gmail.com",
      subject: "Welcome",
      template: "signuptemplate"
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
    var myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if (err) {
          throw err;
        }
        db.Users.create({
          email: req.body.email,
          password: hash
        }).then(function(dbUsers) {
          res.json({ status: "success" });
          // eslint-disable-next-line no-console
          console.log(dbUsers);
        });
      });
    });
  });
  // Create a new example
  app.post("/examples", function(req, res) {
    db.Users.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/examples/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
