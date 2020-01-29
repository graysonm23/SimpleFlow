var signupResponseStatus;
$(".btn-signup").on("click", function(event) {
  event.preventDefault();
  // eslint-disable-next-line no-console
  var user = {
    name: $("#inputName")
      .val()
      .trim(),
    email: $("#inputEmail")
      .val()
      .trim(),
    password: $("#inputPassword")
      .val()
      .trim()
  };
  if (user.name === "" || user.email === "" || user.password === "") {
    $(".msg").addClass("alert-primary");
    $(".msg").html("Please fill out all fields!");
    return false;
  }
  // console.log(user);
  $.ajax({
    url: "/signup",
    method: "POST",
    data: user
  }).then(function(response) {
    // eslint-disable-next-line no-console
    signupResponseStatus = response.status;
    console.log(response);
    validationMsg();
  });
});

function validationMsg() {
  if (signupResponseStatus === "success") {
    $(".msg").addClass("alert-success");
    $(".msg").html("Validation Email has been sent!");
  }
}
