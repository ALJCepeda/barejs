var Promise = require("promise");

var Ajax = function() {};

Ajax.post = function(url) { return Ajax.ajax("POST", url); };
Ajax.get = function(url) { return Ajax.ajax("GET", url); };
Ajax.ajax = function(method, url) {
	var request = new XMLHttpRequest();

	if(!httpRequest) {
		alert("Sorry this service is not available for your browers and/or version");
		return false;
	}

	return new Promise(function(resolve, reject) {
		request.onreadystatechange = function() {
			if(request.readyState === XMLHttpRequest.DONE) {
				if(request.status === 200) {
					resolve(request.responseText);
				} else {
					reject("There was a problem with the request");
				}
			}
		};

		request.open(method, url);
		request.send();
	});
};

Ajax.pollPost = function(url, fn, timeout) { return Ajax.pollURL("POST", url, fn, timeout); };
Ajax.pollGet = function(url, fn, timeout) { return Ajax.pollURL("GET", url, fn, timeout); };
Ajax.pollURL = function(method, url, fn, timeout) {
    var promise = new Promise();
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

	return new Promise(function(resolve, reject) {
		(function p() {
			Ajax.ajax(method, url).then(function(response) {
				if(fn(response) === true) {
					resolve(response);
				} else if(Number(new Date()) < endTime) {
					setTimeout(p, interval);
				} else {
					reject(new Error("Timed out polling: " + url));
				}
			}).catch(reject);
		})();
	});
};

module.exports = Ajax;
