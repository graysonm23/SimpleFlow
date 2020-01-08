$(".btn-login").on("click", function(event) {
  event.preventDefault();
  console.log("login has been clicked");
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
  $.ajax({
    url: "/login",
    method: "POST",
    data: user
  }).then(function(response) {
    console.log(response);
    window.localStorage.setItem("Bearer", response.token);
    // var token = window.localStorage.getItem("Bearer");
    // console.log(response.token);
    window.location.href = "/profile";
  });
});
