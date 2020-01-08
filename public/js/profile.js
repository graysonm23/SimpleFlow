var token = window.localStorage.getItem("Bearer");
console.log(token);
console.log("here at profile page");
// console.log(user);
$.ajax({
  url: "/profile",
  method: "GET",
  data: authData
}).then(function(response) {
  // eslint-disable-next-line no-console
  console.log(response);
});
