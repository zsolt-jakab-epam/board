"use strict";

$(document).ready(function() {
  var storage = new BoardStorageProxy();
  storage.loadBoard();

  var removeIntent = false;
  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status",
    cancel: null,
    over: function () {
      removeIntent = false;
    },
    out: function () {
      removeIntent = true;
    },
    beforeStop: function (event, ui) {
      if(removeIntent == true){
        ui.item.remove();
        storage.saveStatus($(this));
      }
    }    
  }).disableSelection();
  
  $('.status').on("sortupdate sortcreate", function(event, ui){
    storage.saveStatus($(this));
    console.info("status saved");
  });   

  $("#new-label").click(function () {
    var label = '<input type="text" placeholder="fill with something ..." class="form-control card">';
    $("#new").append(label);
    storage.saveLabel($("#new").children().last());
  });
  
  $('.status').on('dblclick', '.card', function() {
    $(this).attr('readonly', false);
    $(this).focus();
    storage.saveLabel($(this));
    console.info("label ready to edit");
  });
  
  $('.status').on('focusout', '.card', function() {
    $(this).attr('value', $(this).val());
    $(this).attr('readonly', true);
    storage.saveLabel($(this));
    console.info("label changed and saved");
  });
});