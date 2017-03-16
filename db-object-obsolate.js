"use strict";

var LabelObject = function (title, description, owner, status, id) {
	this.title = title;
	this.description = description;
	this.owner = owner;
	this.status = status;
	this.id = id;
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


