/*
	Performs a class check on each (classname, obj)
*/
var Base = function() {};

/*
	String introspection
*/
Base.prototype.supplant = function(str, values) {
	return str.replace(/{([^{}]*)}/g, function (a, b) {
			var r = values[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};

/*
	Fires callback once and no more
*/
Base.prototype.once = function(fn, context) {
	return function() {
		if(fn) {
			var result = fn.apply(context || this, arguments);
			fn = null;
			return result;
		}
	};
};

module.exports = Base;
