"use strict";


let BoardStorageProxy = function (storageImp) {
	let storage = storageImp || new BoardStorage();

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
		this.labels = [];

		let labels = this.labels;
		jQReference.children().each( function (index) {
			labels.push(new Label($(this))); 
		});	
	};  

	this.setStorage = function(storageImp) {
		storage = storageImp;
	}

	this.getStorage = function() {
		return storage;
	}

	this.saveStatus = function(jQReference) {
		let status = new Status(jQReference);
		storage.saveStatus(status);
	};

	this.saveLabel = function(jQReference) {
		let label = new Label(jQReference);
		storage.saveLabel(label);
	};

	this.loadBoard = function() {
		storage.loadBoard();
	};	
};


let BoardStorage = function () {
	let boardName = "sample";

	let getItem = function(statusKey) {
		return JSON.parse(localStorage.getItem(statusKey));
	};

	let setItem = function(statusKey, status) {
		localStorage.setItem(statusKey, JSON.stringify(status));
	};

	let getStatusIds = function () {
		return 	["new", "inp", "done", "shipped", "other"];
	};	

	let loadLabel = function (label) {
		var labelHtml = '<div class="label"><input value="' + label.title + '" class="text">' + 
					'<input value="' + label.description + '" class="text">' + 
					'<input type="button" value="Delete Label" class="delete"></div>';
		$("#" + label.status).append(labelHtml);
	};

	this.loadBoard = function() {
		let statusIds =  getStatusIds();
		for (let statusId of statusIds) {
			let statusKey = boardName + "_" + statusId;
			let status = getItem(statusKey);
			if (status) {
				let labels = status.labels;
				for (let label of labels) {
					loadLabel(label);
				} 
				//labels.forEach(loadLabel);
			}		
		} 
	};

	this.saveLabel = function(label) {
		let statusKey = label.board + "_" + label.status;
		let status = getItem(statusKey);
		status.labels[label.index] = label;
		setItem(statusKey, status);	
	};

	this.saveStatus = function(status) {
		let statusKey = status.board + "_" + status.id;
		setItem(statusKey, status);	
	};
};

