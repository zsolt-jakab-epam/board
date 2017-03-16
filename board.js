"use strict";

$(document).ready(function() {
  var storage = new Storage("sample");
    storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status"
  }).disableSelection();
  
  /* simple solution, but DOMSubtreeModified deprecated */
  $('.status').on("DOMSubtreeModified", function(e){
    storage.saveBoard();
    console.log($(this).attr("id"));
  });  
  
  $("#new-label").click(function () {
    var label = '<div class="label"><input value="title" class="text">' + 
                '<input value="description" class="text">' + 
                '<input type="button" value="Delete Label" class="delete"></div>';
    $("#new").append(label);

  });
  
  $('.status').on('dblclick', '.text', function() {
    $(this).attr('readonly', false);;
  });
  
  $('.status').on('focusout', '.text', function() {
    $(this).attr('value', $(this).val());
    $(this).attr('readonly', true);
  });
  
  $('.status').on('click', '.delete', function(){
    $(this).parent().remove();
  });
});