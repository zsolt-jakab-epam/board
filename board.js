"use strict";

$(document).ready(function() {
  var storage = new Storage("sample");
    storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status"
  }).disableSelection();
  
  $('.status').on("sortupdate sortcreate", function(event, ui){
    storage.saveBoard();
    console.log($(this).attr("id"))
    console.log(new Label(ui.item));

  });  
  
  $("#new-label").click(function () {
    var label = '<div class="label"><input value="title" class="text">' + 
                '<input value="description" class="text">' + 
                '<input type="button" value="Delete Label" class="delete"></div>';
    $("#new").append(label);
    storage.saveBoard();
  });
  
  $('.status').on('dblclick', '.text', function() {
    $(this).attr('readonly', false);
    storage.saveBoard();
  });
  
  $('.status').on('focusout', '.text', function() {
    $(this).attr('value', $(this).val());
    $(this).attr('readonly', true);
    storage.saveBoard();
  });
  
  $('.status').on('click', '.delete', function(){
    $(this).parent().remove();
    storage.saveBoard();
  });
});