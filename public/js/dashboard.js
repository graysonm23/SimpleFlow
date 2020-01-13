var token = window.localStorage.getItem("Authorization");

var jwtToken = "Bearer " + token;
console.log(token);
if(!token){
  window.location.pathname = "/login"; //if no token redirect to login
}

$.ajax({
  url: "/api/dashboard",
  method: "POST",
  headers: {authorization: jwtToken}
}).then(function(response) {

  console.log(response);
});

$(".dragbox ul").sortable({
  connectWith: "ul",
  items: "li:not(.drag-disabled)",
  dropOnEmpty: false
});

// $(".clickme").on("click", function(event){
//   event.preventDefault();
//   alert("I'm clickable!")
// });

$(function(){
  $('.clickme').popover({
     
      placement: 'bottom',
      title: 'Enter a Task',
      sanitize: false,
      html:true,
      content:  `
      <div id="pops">
        <div>
            <label for="Task">Task:</label>
            <input type="text" name="task" id="pop-task" class="form-control input-md">
            <button type="button" id="pop-button" class="btn btn-primary" data-loading-text="Sending info.."><em class="icon-ok"></em> Save</button>
        </div>
    </div>
      `
  }).on('click', function(){
    // had to put it within the on click action so it grabs the correct info on submit
    $(this).addClass("selected");
    console.log($(this));
    $('#pop-button').click(function(){
        var newTask = $("#pop-task").val().trim();
        $(".selected").text(newTask);
        $("li").removeClass("selected");
        $('.clickme').popover('hide');
    });
})
})
