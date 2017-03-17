"use strict";

var Label = function (uiItem) {
  if (!(this instanceof Label)) {
      return new Label(uiItem);
  } 	

	this.title = $(uiItem).children().val();
	this.description = $(uiItem).children().first().next().attr("value");
	this.status = $(uiItem).parent().attr("id");
	this.board = $(uiItem).parent().parent().attr("id");
  this.index = $(uiItem).index();
};

var States = function () {
	return { "new" : {},  "inp" : {}, "done": {}, "shipd": {} };
};

var BoardStorage = function () {
    if (!(this instanceof BoardStorage)) {
        return new BoardStorage();
    } 	
};

BoardStorage.prototype.save = function(labelObject) {
    if (!(labelObject instanceof LabelObject)) {
        return false;
    } else {
		var status = labelObject.status;
		var id = labelObject.id;
		var boardObject = JSON.parse(localStorage.getItem(this.boardKey));

		boardObject[status][id] = labelObject;
		
		localStorage.setItem(boardKey, JSON.stringify(boardObject));	
	}
};

BoardStorage.prototype.getBoard = function() {
	return JSON.parse(localStorage.getItem(this.boardKey));
};


