var Promise = require("promise");

var Misc = function() {};

Misc.post = function(url) { return Misc.ajax("POST", url); };
Misc.get = function(url) { return Misc.ajax("GET", url); };
Misc.ajax = function(method, url) {
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

Misc.pollPost = function(url, fn, timeout) { return Misc.pollURL("POST", url, fn, timeout); };
Misc.pollGet = function(url, fn, timeout) { return Misc.pollURL("GET", url, fn, timeout); };
Misc.pollURL = function(method, url, fn, timeout) {
    var promise = new Promise();
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

	return new Promise(function(resolve, reject) {
		(function p() {
			Misc.ajax(method, url).then(function(response) {
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
