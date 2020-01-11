// $(function() {
//   $(".card").sortable({
//     connectWith: ".card",
//     handle: ".card .card-title .card-body .card-sort",
//     placeholder: "portlet-placeholder ui-corner-all"
//   });
// });
$(function() {
  $(".card-sort").sortable({
    connectWith: ".card-sort"
  });
  $(".card-sort").disableSelection();
});

$(".card-sort").sortable({
  drag: function() {
    $(".card-sort").css("border", "1px dotted black");
  }
});
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

$(document).ready(function() {
  $(".editTextTitle").click(divClickedTitle);
});

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
  $(".editTextP").click(divClickedP);
});

$(".addButton").on("click", function() {
  $("#taskDash").append(
    "<div class='card-sort ui-sortable' style='max-width: 300px; min-width: 300px;'><div class='card ui-sortable-handle' style='max-width: 300px;'><div class='card-body'><h5 class='card-title editTextTitle'>Not a Card title</h5><p class='card-text editTextP' style='overflow: auto;'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div><button id='addButton' style='position: absolute; bottom: 0; left: 10px;' class='addButton'><i class='fas fa-plus-square'></i></button></div></div>"
  );
});
