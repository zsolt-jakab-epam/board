"use strict";

let BoardStorageProxy = function (storageImp) {
	let storage = storageImp || new BoardStorage();

	let Label = function (jQReference) {
		this.text = jQReference.val();
		this.status = jQReference.parent().attr("id");
		this.board = jQReference.parent().parent().attr("id");
		this.index = jQReference.index();
	};

	let Status = function (jQReference) {
		this.id = jQReference.attr("id");
		this.board = jQReference.parent().attr("id");
		this.labels = [];

		let labels = this.labels;
		jQReference.children().not(".ui-sortable-placeholder").each( function (index) {
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
