$(".btn-login").on("click", function(event) {
  event.preventDefault();
  // eslint-disable-next-line no-console
  console.log("login has been clicked");
  var user = {
    email: $("#inputEmail")
      .val()
      .trim(),
    password: $("#inputPassword")
      .val()
      .trim()
  };
  console.log(user.email, user.password);
  $.ajax({
    url: "/login/user",
    method: "POST",
    data: user
  }).then(function(response) {
    // eslint-disable-next-line no-console
    console.log(response);
  });
});
$(".btn-signup").on("click", function(event) {
  event.preventDefault();
  // eslint-disable-next-line no-console
  console.log("signup has been clicked");
  var user = {
    email: $("#inputEmail")
      .val()
      .trim(),
    password: $("#inputPassword")
      .val()
      .trim()
  };
  // console.log(user);
  $.ajax({
    url: "/create/user",
    method: "POST",
    data: user
  }).then(function(response) {
    // eslint-disable-next-line no-console
    console.log(response);
    if (response.status === "success") {
      $(".msg").text("Validation Email has been sent!");
    }
  });
});
