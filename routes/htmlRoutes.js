module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/profile", function(req, res) {
    res.render("userprofile");
  });

  app.get("/dashboard", function(req, res) {
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

  app.get("/notifications", function(req, res) {
    res.render("notifications");
  });
  app.get("/inbox", function(req, res) {
    res.render("inbox");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
