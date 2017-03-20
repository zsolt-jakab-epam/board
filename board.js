"use strict";

$(document).ready(function() {
  var storage = new BoardStorageProxy();
  storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status",
  }).disableSelection();
  
  $('.status').on("sortupdate sortcreate", function(event, ui){
    storage.saveStatus($(this));
    console.info("status saved");
  });   
  
  $("#new-label").click(function () {
    var label = '<div class="label"><input value="title" class="text">' + 
                '<input value="description" class="text">' + 
                '<input type="button" value="Delete Label" class="delete"></div>';
    $("#new").append(label);
  });
  
  $('.status').on('dblclick', '.text', function() {
    $(this).attr('readonly', false);
    storage.saveLabel($(this).parent());
    console.info("label ready to edit");
  });
  
  $('.status').on('focusout', '.text', function() {
    $(this).attr('value', $(this).val());
    $(this).attr('readonly', true);
    storage.saveLabel($(this).parent());
    console.info("label changed and saved");
  });
  
  $('.status').on('click', '.delete', function(){
    let status = $(this).parent().parent();
    $(this).parent().remove();
    storage.saveStatus(status);
    console.info("label removed");
  });
});