/*
	Performs a class check on each (classname, obj)
*/
var Misc = function() {};

/*
	String introspection
*/
Misc.supplant = function(str, values) {
	return str.replace(/{([^{}]*)}|\$(\w*)/g, function (a, b, c) {
			var r = values[b || c].toString();
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};

/*
	Fires callback once and no more
*/
Misc.once = function(fn, context) {
	return function() {
		if(fn) {
			var result = fn.apply(context || this, arguments);
			fn = null;
			return result;
		}
	};
};

Misc.throwWith = function(msg) {
	return function(err) { Misc.throwLater(err, msg); };
};

Misc.throwLater = function(err, msg) {
	if(msg) { err = Misc.supplant("{0} - {1}", [msg, err]); }

	setTimeout(function() { throw err; });
};

module.exports = Misc;
