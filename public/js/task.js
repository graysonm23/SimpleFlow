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
$(".textarea").hide();
$(".search-icon").on("click", function() {
  $(this).attr("id", "open");
  $(".textarea").show("slow", "swing");

  var task = {
    name: $(".search-input")
      .val()
      .trim(),
    description: $(".searcharea")
      .val()
      .trim()
  };
  if (task.name.length > 0 && task.description.length > 0) {
    console.log(task);
    function addCols() {
      var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
      var myPanel = $(
        `<div class="card card-outline-info" id="Panel"><div class="card-block"><div class="card-title"><span> ${task.name}</span><button type="button" class="close" data-target="#Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>${task.description}</p></div></div>`
      );
      myPanel.appendTo(myCol);
      myCol.appendTo("#contentPanel");

      $(".close").on("click", function(e) {
        e.stopPropagation();
        var $target = $(this).parents(".col-sm-3");
        $target.hide("slow", function() {
          $target.remove();
        });
      });
    }
    addCols();
    $.ajax({
      url: "/dashboard",
      method: "POST",
      data: task
    }).then(function(response) {});
  }
});
$(".close").on("click", function() {
  $(".search-icon").removeAttr("id");
  $(".textarea").hide("slow", "swing");
});
