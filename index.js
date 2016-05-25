var fs = require("fs"),
	path = require("path"),
	Promise = require("promise"),
	Misc = require("./scripts/misc"),
	Val = require("./scripts/val"),
	Obj = require("./scripts/obj");

var getFile = function(name) {
	var absPath = path.join(__dirname, "scripts", name + ".js");

	if(absPath !== "") {
		return new Promise(function(res, rej) {
			fs.readFile(absPath, "UTF8", function(err, data) {
				if(err) { rej(err); }
				else { res(data); }
			});
		});
	}

	return Promise.reject("Unable to find " + name);
};

function throwWith(msg) {
	return function(err) { throwLater(err, msg); };
}

function throwLater(err, msg) {
	if(msg) { err = Misc.supplant("($0) - ($1)", [msg, err]); }

	setTimeout(function() { throw err; });
}

var bind = function(url, name, server) {
	console.log("Binding:", name, "to endpoint:", url);

	server.on("request", function(req, res) {
		if(req.method === "GET") {
			if(req.url === url) {
				getFile(name).then(function(data) {
					res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
					res.end(data, "UTF8");
				}).catch(throwWith("PromiseLand"));
			}
		}
	});
};



var Bare = require("./scripts/misc");
Bare.Val = require("./scripts/val");
Bare.Obj = require("./scripts/obj");
Bare.bind = bind;

module.exports = Bare;
