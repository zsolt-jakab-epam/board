"use strict";


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
		var labelHtml = '<input type="text" placeholder="fill with something ..." value="' + label.text + '" class="form-control card">';
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
		let status = getItem(statusKey) || 	{ id : label.status, board : label.board, labels : [] };
		status.labels[label.index] = label;
		setItem(statusKey, status);	
	};

	this.saveStatus = function(status) {
		let statusKey = status.board + "_" + status.id;
		setItem(statusKey, status);	
	};
};
