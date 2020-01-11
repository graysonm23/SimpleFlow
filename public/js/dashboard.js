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
  $('#clickme').popover({
     
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
    $('#pop-button').click(function(){
    
        $('#clickme').popover('hide')
      
    })
})
})