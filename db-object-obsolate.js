"use strict";

let Label = function (jQReference) {
	this.title = jQReference.children().first().val();
	this.description = jQReference.children().first().next().attr("value");
	this.status = jQReference.parent().attr("id");
	this.board = jQReference.parent().parent().attr("id");
  	this.index = jQReference.index();
};

let Status = function (jQReference) {
  this.id = jQReference.attr("id");
  this.board = jQReference.parent().attr("id");
  let labels = [];
  jQReference.children().each( function (index) {
	  labels[index] = new Label($(this)); 
  });
  this.labels = labels;
};


let BoardStorage = function () {
	this.boardName = "sample";
    this.boardDivId = '#' + this.boardName;
};

BoardStorage.prototype.getItem = function(statusKey) {
	return JSON.parse(localStorage.getItem(statusKey));
};

BoardStorage.prototype.setItem = function(statusKey, status) {
	localStorage.setItem(statusKey, JSON.stringify(status));
};

BoardStorage.prototype.saveStatus = function(jQReference) {
	let status = new Status(jQReference);
	let statusKey = this.boardName + "_" + status.id;
	this.setItem(statusKey, status);	
};

BoardStorage.prototype.saveLabel = function(jQReference) {
	let label = new Label(jQReference);
	let statusKey = this.boardName + "_" + label.status;
	let status = this.getItem(statusKey);
	status.labels[label.index] = label;
	this.setItem(statusKey, status);	
};

BoardStorage.prototype.getStatusIds = function () {
	return 	["new", "inp", "done", "shipped", "other"];
};

BoardStorage.prototype.loadLabel = function (label) {
	var labelHtml = '<div class="label"><input value="' + label.title + '" class="text">' + 
				'<input value="' + label.description + '" class="text">' + 
				'<input type="button" value="Delete Label" class="delete"></div>';
	$("#" + label.status).append(labelHtml);
};

BoardStorage.prototype.loadBoard = function() {
	let statusIds =  this.getStatusIds();
	let boardName = this.boardName;
	statusIds.forEach(statusId => {
		let statusKey = boardName + "_" + statusId;
		let status = this.getItem(statusKey);
		if (status) {
			let labels = status.labels;
			labels.forEach(this.loadLabel);
		}
	});  
};