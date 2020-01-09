var token = window.localStorage.getItem("Bearer");
$.ajax({
  url: "/profile",
  method: "POST",
  headers: { Authorization: `Bearer ${token}` }
}).then(function(response) {
  // eslint-disable-next-line no-console
  console.log(response);
});
