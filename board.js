"use strict";

$(document).ready(function() {
  
  var storage = new Storage("sample", localStorage);
  storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status"
  }).disableSelection();
  

  $('#sample').on("DOMSubtreeModified", function(e){
    storage.saveBoard();
    console.log("happening");
  });  
  
    $('#sample').mouseup( function(e){
      //storage.saveBoard();
      //console.log("happening");
  });  
});