var fs = require("fs"),
	path = require("path"),
	Promise = require("promise"),
	M = require("./scripts/misc"),
	V = require("./scripts/val"),
	O = require("./scripts/obj");

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

var bind = function(url, name, server) {
	console.log("Binding:", name, "to endpoint:", url);

	server.on("request", function(req, res) {
		if(req.method === "GET") {
			if(req.url === url) {
				getFile(name).then(function(data) {
					res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
					res.end(data, "UTF8");
				}).catch(M.throwWith("Bind"));
			}
		}
	});
};



var Bare = M;
Bare.Val = V;
Bare.Obj = O;
Bare.bind = bind;

module.exports = Bare;
