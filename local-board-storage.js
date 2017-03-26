"use strict";


let LocalBoardStorage = function () {
	let boardName = "sample";

	let getItem = function (statusKey) {
		return JSON.parse(localStorage.getItem(statusKey));
	};

	let setItem = function (statusKey, status) {
		localStorage.setItem(statusKey, JSON.stringify(status));
	};

	let getStatusKey = function (statusId) {
		return boardName + "_" + statusId;
	}
 
	let statusKeys = [getStatusKey("new"), 
					getStatusKey("inp"), 
					getStatusKey("done"), 
					getStatusKey("shipped"), 
					getStatusKey("other")];

	let loadLabel = function (label) {
		var labelHtml = '<input type="text" readonly="readonly" placeholder="fill with something ..." value="' + label.text + '" class="form-control card">';
		$("#" + label.status).append(labelHtml);
	};

	this.loadBoard = function () {
		for (let key of statusKeys) {
			let status = getItem(key);
			if (status) {
				for (let label of status.labels) {
					if(label) {
						loadLabel(label);
					}
				} 
			}		
		} 
	};

	this.saveLabel = function (label) {
		let statusKey = getStatusKey(label.status);
		let status = getItem(statusKey) || 	{ id : label.status, board : label.board, labels : [] };
		status.labels[label.index] = label;
		setItem(statusKey, status);	
	};

	this.saveStatus = function (status) {
		let statusKey = getStatusKey(status.id);
		setItem(statusKey, status);	
	};
};