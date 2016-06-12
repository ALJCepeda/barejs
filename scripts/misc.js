(function() {
	var Misc = {};

	/*
		String introspection
	*/
	Misc.supplant = function(str, values) {
		return str.replace(/{([^{}]*)}|\$(\w*)/g, function (a, b, c) {
				var r = values[b || c];
				if(typeof r !== "undefined") { r = r.toString(); }

				return typeof r === 'string' || typeof r === 'number' ? r : a;
			}
		);
	};

	/*
		Fires callback once and no more
	*/
	Misc.once = function(fn, context) {
		var result;
		return function() {
			if(fn) {
				result = fn.apply(context || this, arguments);
				fn = null;
			}
			return result;
		};
	};

	/*
		Prepends message to delegated, late thrown errors
	*/
	Misc.throwWith = function(msg) {
		return function(err) { Misc.throwLater(err, msg); };
	};

	/*
		Throws errors sometime later.
		Useful for super async dependant frameworks like Promises
	*/
	Misc.throwLater = function(err, msg) {
		if(msg) { err = Misc.supplant("{0} - {1}", [msg, err]); }

		setTimeout(function() { throw err; });
	};

	if(typeof module !== 'undefined' && module.exports) {
		module.exports = Misc;
	} else {
		this.Misc = Misc;
	}
})();
