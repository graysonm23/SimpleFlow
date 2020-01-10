var loginResponseMessage;
$(".btn-login").on("click", function(event) {
  event.preventDefault();
  var user = {
    email: $("#inputEmail")
      .val()
      .trim(),
    password: $("#inputPassword")
      .val()
      .trim(),
    token: window.localStorage.getItem("Bearer")
  };

  console.log(user);
  var token = window.localStorage.getItem("Bearer");
  $.ajax({
    url: "/login",
    method: "POST",
    data: user,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(function(response) {
    window.localStorage.setItem("Bearer", response.token);
    loginResponseMessage = response.message;
    console.log(response);
    errorMsg();
    if (response.token) {
      window.location.pathname = "/dashboard";
    }
    // var token = window.localStorage.getItem("Bearer");
    // console.log(response.token);
  });
});

function errorMsg() {
  if (loginResponseMessage === "passwords do not match") {
    $(".errMsg").addClass("alert-danger");
    $(".errMsg").html(
      "The account you are trying to access either does not exist or credentials entered are incorrect. Please try again"
    );
    return false;
  }
  if (loginResponseMessage === "no account found") {
    $(".errMsg").addClass("alert-warning");
    $(".errMsg").html(
      "The account you are trying to access either does not exist or credentials entered are incorrect. Please try again"
    );
    return false;
  }
}
