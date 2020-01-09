// var passResetResponse;
$(".btn-login").on("click", function(event) {
  event.preventDefault();
  var user = {
    password: $("#newPassword")
      .val()
      .trim(),
    confirm: $("#newPasswordConfirm")
      .val()
      .trim()
  };
  if (user.password === "" || user.confirm === "") {
    $(".newPassMsg").addClass("alert-primary");
    $(".newPassMsg").html("Please fill out all fields!");
  }
  console.log(user);
  $.ajax({
    url: "/reset",
    method: "POST",
    data: user
  }).then(function(response) {
    console.log(response);
    // passResetResponse = response.message;
    window.location.href = "/login";
  });
});
