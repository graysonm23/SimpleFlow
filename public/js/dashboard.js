// import { TableHints } from "sequelize/types";

var token = window.localStorage.getItem("Authorization");

var jwtToken = "Bearer " + token;
console.log(token); //commented out jwt logic temporarily due to login page css messed up
if(!token){
  window.location.pathname = "/login"; //if no token redirect to login
}

$.ajax({
  url: "/api/dashboard",
  method: "POST",
  headers: {authorization: jwtToken}
}).then(function(response) {
  var task = response;
  console.log(task);
  for(var i = 0; i < task.length; i++){
    var taskObj = {
      name: task[i].task_title,
      description: task[i].task_text,
      id: task[i].task_id
    }
    addCols(taskObj);
  }
});

$(".dragbox").sortable({
  connectWith: ".drag-column",
  items: ".draggable",
  dropOnEmpty: false
});

function addCols(taskObj) {
  console.log("adding columns");
  var myCol = $(`<div class="col-sm-3 col-md-3 pb-2" value="${taskObj.id}"></div>`);
  var myPanel = $(
    `<div class="card card-outline-info ui-state-default draggable" id="Panel"><div class="card-block"><div class="card-title"><span> ${taskObj.name}</span><button type="button" class="close" data-target="#Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>${taskObj.description}</p></div></div>`
  );
  myPanel.appendTo(myCol);
  myCol.appendTo(".to-do");
}

// $(".clickme").on("click", function(event){
//   event.preventDefault();
//   alert("I'm clickable!")
// });

// $(function(){
//   $('.clickme').popover({
     
//       placement: 'bottom',
//       title: 'Enter a Task',
//       sanitize: false,
//       html:true,
//       content:  `
//       <div id="pops">
//         <div>
//             <label for="Task">Task:</label>
//             <input type="text" name="task" id="pop-task" class="form-control input-md">
//             <button type="button" id="pop-button" class="btn btn-primary" data-loading-text="Sending info.."><em class="icon-ok"></em> Save</button>
//         </div>
//     </div>
//       `
//   }).on('click', function(){
//     // had to put it within the on click action so it grabs the correct info on submit
//     $(this).addClass("selected");
//     console.log($(this));
//     $('#pop-button').click(function(){
//         var newTask = $("#pop-task").val().trim();
//         $(".selected").text(newTask);
//         $("li").removeClass("selected");
//         $('.clickme').popover('hide');
//     });
// })
// })
