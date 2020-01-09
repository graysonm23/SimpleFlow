var passwordResetMessage;
$(".btn-login").on("click", function(event) {
  event.preventDefault();
  var user = {
    email: $("#inputReset")
      .val()
      .trim()
  };

  console.log(user);
  $.ajax({
    url: "/forgot",
    method: "POST",
    data: user
  }).then(function(response) {
    console.log(response);
    passwordResetMessage = response.message;
    resetMsg();
  });
});

function resetMsg() {
  if (passwordResetMessage === "password token successfully sent") {
    $(".resetMsg").addClass("alert-success");
    $(".resetMsg").html("Reset link sent to email");
  }
}
