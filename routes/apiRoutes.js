var db = require("../models");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
var mailGun = require("nodemailer-mailgun-transport");
var jwt = require('jsonwebtoken');
var saltRounds = 10;
require("dotenv").config();
module.exports = function(app) {
  // Get all examples
  app.get("/examples", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.post("/api/login/", function(req, res) {
    console.log(req.body);
    db.Users.findOne({
      where: {
        email: req.body.email
      }
      // eslint-disable-next-line no-unused-vars
    }).then(function(dbUsers) {
      if (dbUsers) { //if account exists
        bcrypt.compare(req.body.password, dbUsers.password, function( //compare hashed password
          err,
          response
        ) {
          if (err) {
            res.status(403);
          }
          if (response) { //if passwords match
            // res.json(dbUsers);
            var user = dbUsers.dataValues.user_id;
            jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}/*sets token to expire in 30 seconds*/, function(err, token){
              res.json({token});
          });    
          } else {
            // response is OutgoingMessage object that server response http request
            return res.json({
              success: false,
              message: "passwords do not match"
            });
          }
        });  
      }
         else { //if account does not exist
        return res.json({ success: false, message: "no account found" });
      }
    });
    // eslint-disable-next-line no-undef
  });
  app.post("/create/user", function(req, res) {
    var output = `
    <h1>Welcome to Simple Flow</h1>
    <p>Thank you for signing up to Simple Flow, a developers workspace created by developers!</p>
    <p>Please Click on the link below to login and start your new project!</p>
    <button style="width: 50px; height: 50px;"><link href="http://simpleflow.com">Click Here</button>
  `;
    var auth = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
      }
    };
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(mailGun(auth));
    let mailOptions = {
      from: '"Simple Flow" <simpleflow2020@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Simple Flow", // Subject line
      // text: output // plain text body
      html: output // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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
