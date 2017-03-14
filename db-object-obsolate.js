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

var DBObject = function (boardKey) {
    if (!(this instanceof DBObject)) {
        return new DBObject(board);
    } 
    this.storage = localStorage;
    this.boardKey = boardKey;
	
};

DBObject.prototype.newBoard = function(boardKey) {
	this.storage.setItem(boardKey, JSON.stringify(new States()));
};

DBObject.prototype.save = function(labelObject) {
    if (!(labelObject instanceof LabelObject)) {
        return false;
    } else {
		var status = labelObject.status;
		var id = labelObject.id;
		var boardObject = JSON.parse(this.storage.getItem(this.boardKey));

		boardObject[status][id] = labelObject;
		
		this.storage.setItem(boardKey, JSON.stringify(boardObject));	
	}
};

DBObject.prototype.getBoard = function() {
	return JSON.parse(this.storage.getItem(this.boardKey));
};


