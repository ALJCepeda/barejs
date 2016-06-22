(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        var misc = factory();
        misc.expose = function(app, express) {
            app.use('/bare.misc.js', express.static(__filename));
        }

        module.exports = misc;
    } else {
        if(typeof root.bare === 'undefined') {
            root.bare = {};
        }

        root.bare.misc = factory();
    }
}(this, function () {
	var misc = {};

	/*
		String introspection
	*/
	misc.supplant = function(str, values) {
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
	misc.once = function(fn, context) {
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
	misc.throwWith = function(msg) {
		return function(err) { misc.throwLater(err, msg); };
	};

	/*
		Throws errors sometime later.
		Useful for super async dependant frameworks like Promises
	*/
	misc.throwLater = function(err, msg) {
		if(msg) { err = misc.supplant("{0} - {1}", [msg, err]); }

		setTimeout(function() { throw err; });
	};

    return misc;
}));
