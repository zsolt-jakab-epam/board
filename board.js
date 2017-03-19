"use strict";

$(document).ready(function() {
  var storage = new BoardStorage();
  storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status"
  }).disableSelection();
  
  $('.status').on("sortupdate sortcreate", function(event, ui){
    storage.saveStatus($(this));
    console.log($(this).attr("id"))
    console.log(JSON.stringify(new Status($(this))));

  });  
  
  $("#new-label").click(function () {
    var label = '<div class="label"><input value="title" class="text">' + 
                '<input value="description" class="text">' + 
                '<input type="button" value="Delete Label" class="delete"></div>';
    $("#new").append(label);
    storage.saveStatus($("#new"));
  });
  
  $('.status').on('dblclick', '.text', function() {
    $(this).attr('readonly', false);
    storage.saveLabel($(this).parent());
  });
  
  $('.status').on('focusout', '.text', function() {
    $(this).attr('value', $(this).val());
    $(this).attr('readonly', true);
    storage.saveLabel($(this).parent());
  });
  
  $('.status').on('click', '.delete', function(){
    let status = $(this).parent().parent();
    $(this).parent().remove();
    storage.saveStatus(status);
  });
});