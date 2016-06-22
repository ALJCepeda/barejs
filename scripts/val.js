(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        var val = factory();
        val.expose = function(app, express) {
            app.use('/bare.val.js', express.static(__dirname + __filename));
        }

        module.exports = val;
    } else {
        if(typeof root.bare === 'undefined') {
            root.bare = {};
        }


        root.bare.val = factory();
    }
}(this, function () {
	var val  = {};

	val.undefined = function(obj) {
		return typeof obj === "undefined";
	};

	val.defined = function(obj) {
		return typeof obj !== "undefined"  && obj !== null;
	};

	val.function = function(func) {
		return val.defined(func) && func.constructor === Function;
	};

	val.object = function(obj) {
		return val.defined(obj) && obj.constructor === Object;
	};

	val.number = function(num) {
		return val.defined(num) && num.constructor === Number;
	};

	val.string = function(str) {
		return val.defined(str) && str.constructor === String;
	};

	val.array = function(arr) {
		return val.defined(arr) && arr.constructor === Array;
	};

	val.map = function(map) {
		return val.defined(map) && map.constructor === Map;
	};

	val.set = function(set) {
		return val.defined(set) && set.constructor === Set;
	};

	val.date = function(date) {
		return val.defined(date) && date.constructor === Date;
	};

	val.boolean = function(bool) {
		return val.defined(bool) && bool.constructor === Boolean;
	};

	val.regex = function(reg) {
		return val.defined(reg) && reg.constructor === RegExp;
	};

	val.promise = function(prom) {
		return val.defined(prom) && prom.constructor === Promise;
	};

    return val;
}));
