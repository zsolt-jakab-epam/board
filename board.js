"use strict";

$(document).ready(function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  var storage = new Storage("sample", localStorage);
  storage.loadBoard();

  $( "#new, #inp, #done, #shipped, #other" ).sortable({
    connectWith: ".status"
  }).disableSelection();
  
  /* simple solution, but DOMSubtreeModified deprecated */
  $('#sample').on("DOMSubtreeModified", function(e){
    //storage.saveBoard();
    //console.log("happening");
  });  
  
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      storage.saveBoard();
      console.log("happening");
    });
  });

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  });
});