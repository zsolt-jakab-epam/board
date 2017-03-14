"use strict";

var Storage = function (boardKey, storage) {
    if (!(this instanceof Storage)) {
        return new Storage(boardKey, storage);
    } 
    this.storage = storage;
    this.boardKey = boardKey;
    this.boardDivId = '#' + this.boardKey;
	
};

/* Changes html dom with the stored html content if it exists. */
Storage.prototype.loadBoard = function() {
  var boardHtml = localStorage.getItem(this.boardKey);
  if(boardHtml) {
    var boardDivId = '#' + this.boardKey;
    $(this.boardDivId).empty();
    $(this.boardDivId).append(boardHtml);
  }
};

Storage.prototype.saveBoard = function() {
  var content = $(this.boardDivId).html().replace( new RegExp( "\>[ ]+\<" , "g" ) , "><" ); 
  localStorage.setItem(this.boardKey, content);
};


