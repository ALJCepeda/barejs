(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        var misc = factory();
        misc.expose = function(app, express) {
            app.use('/bareutil.misc.js', express.static(__filename));
        }

        module.exports = misc;
    } else {
        if(typeof root.bareutil === 'undefined') {
            root.bareutil = {};
        }

        root.bareutil.misc = factory();
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
        Randomized string
    */
    misc.random = function(length, possible) {
        var text = [];

        for( var i=0; i < length; i++ ) {
            var char = possible.charAt(Math.floor(Math.random() * possible.length));
    		text.push(char);
    	}

        return text.join('');
    }

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
