// import { TableHints } from "sequelize/types";

var token = window.localStorage.getItem("Authorization");

var jwtToken = "Bearer " + token;
console.log(token); //commented out jwt logic temporarily due to login page css messed up
if (!token) {
  window.location.pathname = "/login"; //if no token redirect to login
}

$.ajax({
  url: "/api/dashboard",
  method: "POST",
  headers: { authorization: jwtToken }
}).then(function(response) {
  var task = response;
  console.log(task);
  for (var i = 0; i < task.length; i++) {
    var taskObj = {
      name: task[i].task_title,
      description: task[i].task_text,
      id: task[i].task_id,
      status: task[i].task_status
    };
    addCols(taskObj);
  }
});

$(".drag-column").sortable({
  connectWith: ".drag-column",
  items: ".dynamicCard, .to-do-cont, .in-progress, .task-completed",
  dropOnEmpty: true,
  revert: true,
  forcePlaceholderSize: true,
  update: function(event, ui) {
    var status = {
      divID: event.target.id,
      task_id: event.target.children[0].attributes[2].value
    };
    console.log(status);
    $.ajax({
      url: "/api/updatetaskstatus",
      method: "POST",
      data: status
    }).then(function(response) {
      console.log(response);
    });
  }
});

function addCols(taskObj) {
  console.log(taskObj);
  console.log("adding columns");
  var myCol = $(
    `<div id="dynamicCard" class="closeCard dynamicCard" value="${taskObj.id}"></div>`
  );
  var myPanel = $(
    `<div class="ui-state-default draggable" id="Panel"><div class="block"><div class="title"><h5 class"editTextTitle"><span id='editTextTitle'>${taskObj.name}</span></h5><button type="button" data-target="#Panel" data-dismiss="alert"><span class="float-right"><i id="removeTask" class="fas fa-user-minus"></i></span></button></div><p class="editTextP">${taskObj.description}</p></div></div>`
  );
  var div = `#${taskObj.status}`;
  myPanel.appendTo(myCol);
  myCol.appendTo(div);
  // eslint-disable-next-line no-unused-vars
  $("#editTextTitle").click(divClickedTitle);
  // eslint-disable-next-line no-unused-vars
  $(".editTextP").click(divClickedP);
  // eslint-disable-next-line no-unused-vars
  showhideImage();
}
