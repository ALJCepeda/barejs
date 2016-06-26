(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bluebird'], factory);
    } else if (typeof exports === 'object') {
        var ajax = factory(require('bluebird'));
        ajax.expose = function(app, express) {
            app.use('/bare.ajax.js', express.static(__filename));
        }

        module.exports = ajax;
    } else {
        root.returnExports = factory(root.Promise);
    }
}(this, function (Promise) {
	var ajax = {};

	ajax.post = function(url, data, modify) { return ajax.ajax("POST", url, data, modify); };
	ajax.get = function(url, data, modify) { return ajax.ajax("GET", url, data, modify); };
	ajax.ajax = function(method, url, data, modify) {
		var request = new XMLHttpRequest();

		return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
			request.open(method, url);
			request.setRequestHeader("Content-Type", "application/json");
			request.onreadystatechange = function() {
				if(request.readyState === XMLHttpRequest.DONE) {
					if(request.status === 200) {
						resolve(request.responseText);
					} else {
						reject(request);
					}
				}
			};

			if(typeof modify !== 'undefined') {
				modify(request, data);
			}

			var json = JSON.stringify(data);
			request.send(json);
		});
	};

	ajax.pollPost = function(url, data, fn, timeout, modify) { return ajax.pollURL("POST", url, data, fn, timeout, modify); };
	ajax.pollGet = function(url, data, fn, timeout, modify) { return ajax.pollURL("GET", url, data, fn, timeout, modify); };
	ajax.pollURL = function(method, url, data, fn, timeout, modify) {
	    var promise = new Promise();
	    var endTime = Number(new Date()) + (timeout || 2000);
	    interval = interval || 100;

		return new Promise(function(resolve, reject) {
			(function p() {
				ajax.ajax(method, url, data, modify).then(function(response) {
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
