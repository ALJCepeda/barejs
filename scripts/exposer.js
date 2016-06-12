var O = require("./obj");
var V = require("./val");
var path = require("path");
var fs = require("fs");

var Expose = function(map) {
	this.exposed = {};
	//this.server;

	O.forEach(function(value, key) {
		this.add(value, key);
	}.bind(this));
};

Expose.prototype.has = function(url) {
	return V.defined(this.exposed[url]);
};

Expose.prototype.add = function(url, name) {
	var absPath = path.resolve(url);

	var stat = fs.lstatSync(absPath);
	if(stat.isFile() === true) {
		this.exposed[name] = absPath;
		return true;
	} else {
		return false;
	}
};

Expose.prototype.listen = function(app) {
	console.log("Bindutil is listening on a server");
	app.get("*", function(req, res, next) {
		console.log(req.url);
		if(this.has(req.url) === true) {
			var url = this.exposed[req.url];
			fs.readFile(url, "UTF8", function(err, data) {
				if(err) { throw err; }
				else {
					res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
					res.end(data, "UTF-8");
				}
			});
		} else {
			next();
		}
	}.bind(this));
};


module.exports = Expose;
