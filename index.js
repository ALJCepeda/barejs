var fs = require("fs"),
	path = require("path"),
	Promise = require("promise"),
	M = require("./scripts/misc"),
	V = require("./scripts/val"),
	O = require("./scripts/obj"),
	E = require("./scripts/exposer");

var Bare = M;
Bare.Val = V;
Bare.Obj = O;
Bare.Exposer = E;
module.exports = Bare;

var doBound = M.once(function(server) {
	var expose = new E();
	expose.listen(server);
	return expose;
}.bind(this));

var expose = function(url, name, server) {
	this.bound = doBound(server);
	return this.bound.add(url, name);
};

Bare.expose = expose;
