(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bluebird'], factory);
    } else if (typeof exports === 'object') {
        var ajax = factory(require('bluebird'));
        ajax.expose = function(app, express) {
            app.use('/bare.ajax.js', express.static(__dirname + __filename));
        }

        module.exports = ajax;
    } else {
        root.returnExports = factory(root.Promise);
    }
}(this, function (Promise) {
	var ajax = {};

	ajax.post = function(url) { return ajax.ajax("POST", url); };
	ajax.get = function(url) { return ajax.ajax("GET", url); };
	ajax.ajax = function(method, url) {
		var request = new XMLHttpRequest();

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

	ajax.pollPost = function(url, fn, timeout) { return ajax.pollURL("POST", url, fn, timeout); };
	ajax.pollGet = function(url, fn, timeout) { return ajax.pollURL("GET", url, fn, timeout); };
	ajax.pollURL = function(method, url, fn, timeout) {
	    var promise = new Promise();
	    var endTime = Number(new Date()) + (timeout || 2000);
	    interval = interval || 100;

		return new Promise(function(resolve, reject) {
			(function p() {
				ajax.ajax(method, url).then(function(response) {
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

    return ajax;
}));
