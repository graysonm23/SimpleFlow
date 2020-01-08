var db = require("../models");
var bcrypt = require("bcryptjs");
// eslint-disable-next-line no-unused-vars
var nodemailer = require("nodemailer");
// eslint-disable-next-line no-unused-vars
var mailGun = require("nodemailer-mailgun-transport");
var jwt = require("jsonwebtoken");
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
  // app.get("/profile", function(req, res) {
  //   db.Users.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   });
  // });
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
            // res.json(dbUsers);
            var user = dbUsers.dataValues.user_id;
            jwt.sign(
              { user: user },
              "secretkey",
              { expiresIn: "10 days" } /*sets token to expire in 30 seconds*/,
              function(err, token) {
                console.log(token);
                db.Users.update(
                  { token: token },
                  {
                    where: { email: req.body.email },
                    returning: true,
                    plain: true
                  }
                )
                  .then(function(dbresponse) {
                    if (dbresponse[1] === 1) {
                      console.log("Successfully updated token");
                    } else {
                      console.log("mom im here");
                      console.log("Unsuccessfully updated token");
                    }
                    res.json({ token });
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              }
            );

            // res.render("userprofile", { msg: "Email has been sent" });
          } else {
            // response is OutgoingMessage object that server response http request
            var DOMAIN = process.env.DOMAIN;
            var mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
            var data = {
              from: "SimpleFlow <simpleflow2020@gmail.com>",
              to: req.body.email,
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

  app.post("/profile", function(req, res) {
    var DOMAIN = process.env.DOMAIN;
    var mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
    var data = {
      from: "SimpleFlow <simpleflow2020@gmail.com>",
      to: req.body.email,
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
          name: req.body.name,
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
