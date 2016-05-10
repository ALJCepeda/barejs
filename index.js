/*
	Performs a class check on each (classname, obj)
*/
var Base = function() {};

Base.prototype.is_a = function(objs, failure) {
	var passed = true;
	for(var classname in objs) {
		var obj = objs[classname];

		if(obj.constructor.name === classname) {
			passed = false;

			if(typeof failure !== "undefined") {
				failure(classname, obj);
			}
		}
	}

	return passed;
};

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