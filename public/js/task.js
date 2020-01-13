// $(function() {
//   $(".card").sortable({
//     connectWith: ".card",
//     handle: ".card .card-title .card-body .card-sort",
//     placeholder: "portlet-placeholder ui-corner-all"
//   });
// });

function divClickedTitle() {
  var divHtml = $(this).html();
  var editableText = $("<textarea />");
  editableText.val(divHtml);
  $(this).replaceWith(editableText);
  editableText.focus();
  // setup the blur event for this new textarea
  editableText.blur(editableTextBlurredTitle);
}

function editableTextBlurredTitle() {
  var html = $(this).val();
  var viewableText = $("<h5 class='card-title editTextTitle'>");
  viewableText.html(html);
  $(this).replaceWith(viewableText);
  // setup the click event for this new div
  viewableText.click(divClickedTitle);
}

function divClickedP() {
  var divHtml = $(this).html();
  var editableText = $("<textarea />");
  editableText.val(divHtml);
  $(this).replaceWith(editableText);
  editableText.focus();
  // setup the blur event for this new textarea
  editableText.blur(editableTextBlurredP);
}

function editableTextBlurredP() {
  var html = $(this).val();
  var viewableText = $("<p class='card-text editTextP'>");
  viewableText.html(html);
  $(this).replaceWith(viewableText);
  // setup the click event for this new div
  viewableText.click(divClickedP);
}

$(document).ready(function() {
  var htmlElement = $(".started");
  var i = 0;
  $(htmlElement).each(function() {
    i++;
    $(this).attr("value", "started-" + i);
  });
  $("body").on("click", ".Started button", function() {
    i++;
    $(".Started").append(
      `<div class='card-sort started ui-sortable' style='max-width: 300px; min-width: 300px;' value='started-${i}'><div class='card ui-sortable-handle' style='max-width: 300px;'><a style="position: absolute; right: 10px; bottom: 0px;"
                    class="close" href="#"><i style="color: grey; font-size: 20px;" class="fas fa-minus-square"></i></a><div class='card-body'><h5 class='card-title editTextTitle'>Not a Card title</h5><p class='card-text editTextP' style='overflow: auto;'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div><button class="addButton" style="cursor: pointer; background: none; border: none; position: absolute; bottom: 0;
                left: 10px;"><i style="color: grey; font-size: 20px;" class="fas fa-plus-square"></i></button></div></div>`
    );
    $(".editTextTitle").click(divClickedTitle);
    $(".editTextP").click(divClickedP);
    close();
  });

  var htmlElementTodo = $(".todo");
  var j = 0;
  $(htmlElementTodo).each(function() {
    j++;
    $(this).attr("value", "todo-" + j);
  });
  $("body").on("click", ".To-do button", function() {
    j++;
    $(".To-do").append(
      `<div class='card-sort todo ui-sortable' style='max-width: 300px; min-width: 300px;' value='todo-${j}'><div class='card ui-sortable-handle' style='max-width: 300px;'><a style="position: absolute; right: 10px; bottom: 0px;"
                    class="close" href="#"><i style="color: grey; font-size: 20px;" class="fas fa-minus-square"></i></a><div class='card-body'><h5 class='card-title editTextTitle'>Not a Card title</h5><p class='card-text editTextP' style='overflow: auto;'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div><button class="addButton" style="cursor: pointer; background: none; border: none; position: absolute; bottom: 0;
                left: 10px;"><i style="color: grey; font-size: 20px;" class="fas fa-plus-square"></i></button></div></div>`
    );
    $(".editTextTitle").click(divClickedTitle);
    $(".editTextP").click(divClickedP);
    close();
  });

  var htmlElementDone = $(".done");
  var k = 0;
  $(htmlElementDone).each(function() {
    k++;
    $(this).attr("value", "done-" + k);
  });
  $("body").on("click", ".Done button", function() {
    k++;
    $(".Done").append(
      `<div class='card-sort done ui-sortable' style='max-width: 300px; min-width: 300px;' value='done-${k}'><div class='card ui-sortable-handle' style='max-width: 300px;'><a style="position: absolute; right: 10px; bottom: 0px;"
                    class="close" href="#"><i style="color: grey; font-size: 20px;" class="fas fa-minus-square"></i></a><div class='card-body'><h5 class='card-title editTextTitle'>Not a Card title</h5><p class='card-text editTextP' style='overflow: auto;'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div><button class="addButton" style="cursor: pointer; background: none; border: none; position: absolute; bottom: 0;
                left: 10px;"><i style="color: grey; font-size: 20px;" class="fas fa-plus-square"></i></button></div></div>`
    );
    $(".editTextTitle").click(divClickedTitle);
    $(".editTextP").click(divClickedP);
    close();
  });

  $(function() {
    $("div").sortable({
      connectWith: ".card-sort",
      items:
        ":not(.card-title, .card-text, .card-body, button, a, .page-header)",
      cursor: "move",
      revert: true,
      axis: "y",
      forcePlaceholderSize: true
    });
    $(".card-sort").disableSelection();
  });
  $(".editTextTitle").click(divClickedTitle);
  $(".editTextP").click(divClickedP);

  function close() {
    $(".close").on("click", function() {
      var $target = $(this).parents(".card-sort");
      $target.hide("slow", function() {
        $target.remove();
      });
    });
  }
  close();
});
