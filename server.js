require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var jwt = require("jsonwebtoken");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app, parseToken, jwtVerify);
require("./routes/htmlRoutes")(app, parseToken, jwtVerify);

var syncOptions = { force: false };

function parseToken(request, response, next) {
  //get auth header value
  var bearerHeader = request.headers["authorization"];
  console.log("This is bearer header ", bearerHeader);

  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    console.log("im here dad");
    //split at the space
    var bearer = bearerHeader.split(" ");
    //get token from array
    var bearerToken = bearer[1];
    //set the token
    request.token = bearerToken;
    //Next middleware
    next();
  } else {
    //forbidden
    console.log("im here mom");
    // return response.json();
    response.sendStatus(403);
    // return response.sendStatus(403);
  }
}

function jwtVerify(req, res, next) {
  console.log("verifying token...");
  jwt.verify(req.token, process.env.SECRET_KEY, function(err, authData) {
    if (err) {
      console.log(
        "This is your token in JWT Verify " + JSON.stringify(req.token)
      );
      console.log("This is your error JWT Verify logic " + err);
      res.redirect("login"); //forbidden error
    } else {
      db.Users.findOne({
        where: {
          user_id: authData.user
        }
      }).then(function(response) {
        console.log("JWT has Verified your token");
        return res.json(response);
      });
    }
  });
  next();
}

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
if (process.env.NODE_ENV !== "production") {
  process.once("uncaughtException", function(err) {
    console.error("FATAL: Uncaught exception.");
    console.error(err.stack || err);
    setTimeout(function() {
      process.exit(1);
    }, 100);
  });
}

module.exports = app;
