var db = require("../models");

module.exports = function(app, parseToken, jwtVerify) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.render("login");
      console.log(dbExamples);
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Users.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/profile", parseToken, jwtVerify, function(req, res) {
    res.render("userprofile");
  });
  app.get("/dashboard", parseToken, jwtVerify, function(req, res) {
    res.render("dashboard");
  });
  //Render login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/forgot", function(req, res) {
    res.render("forgot");
  });

  app.get("/notifications", parseToken, jwtVerify, function(req, res) {
    res.render("notifications");
  });
  app.get("/inbox", parseToken, jwtVerify, function(req, res) {
    res.render("inbox");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
