var token = window.localStorage.getItem("Authorization");

var jwtToken = "Bearer " + token;
// eslint-disable-next-line no-unused-vars
function searchToggle(obj, evt) {
  var container = $(obj).closest(".search-wrapper");
  if (!container.hasClass("active")) {
    container.addClass("active");
    evt.preventDefault();
  } else if (
    container.hasClass("active") &&
    $(obj).closest(".input-holder").length == 0 &&
    $(obj).closest(".textarea").length == 0
  ) {
    container.removeClass("active");
    // clear input
    container.find(".search-input").val("");
    container.find(".searcharea").val("");
  }
}

$(".search-icon").on("click", function(e) {
  e.preventDefault();
  $(this).attr("id", "open");
  $(".show-on-click").show();
  $(".searcharea").show("slow", "swing");
  console.log($(this));
});

$("#save-task").on("click", function(e){
  e.preventDefault();
  var task = {
    name: $(".search-input")
      .val()
      .trim(),
    description: $(".searcharea")
      .val()
      .trim(),
    status: "to-do",
    id: ""
  };
  console.log("I've been clicked");
  if (task.name.length > 0 && task.description.length > 0) {
    console.log(task);    
    $(".textarea").hide();
    $.ajax({
      url: "/api/createtask",
      method: "POST",
      headers: {authorization: jwtToken},
      data: task
    }).then(function(response) {
      task.id = response.task_id;
      addCols(task);
      console.log(task.id);
    });
  }
});
$(".close").on("click", function() {
  $(".search-icon").removeAttr("id");
  $(".textarea").hide("slow", "swing");
});


function addCols(task) {
  console.log("adding columns");
  var myCol = $(`<div class="col-sm-3 col-md-3 pb-2" value="${task.id}"></div>`);
  var myPanel = $(
    `<div class="card card-outline-info ui-state-default draggable" id="Panel"><div class="card-block"><div class="card-title"><span> ${task.name}</span><button type="button" class="close" data-target="#Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>${task.description}</p></div></div>`
  );
  myPanel.appendTo(myCol);
  myCol.appendTo(".to-do");
}

$(".close").on("click", function(e) {
  console.log(this);
  e.stopPropagation();
  var $target = $(this).parents(".col-sm-3");
  $target.hide("slow", function() {
    $target.remove();
  });
});
