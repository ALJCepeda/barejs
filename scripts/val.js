(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }
}(this, function () {
	var Val  = {};

	Val.undefined = function(obj) {
		return typeof obj === "undefined";
	};

	Val.defined = function(obj) {
		return typeof obj !== "undefined"  && obj !== null;
	};

	Val.function = function(func) {
		return Val.defined(func) && func.constructor === Function;
	};

	Val.object = function(obj) {
		return Val.defined(obj) && obj.constructor === Object;
	};

	Val.number = function(num) {
		return Val.defined(num) && num.constructor === Number;
	};

	Val.string = function(str) {
		return Val.defined(str) && str.constructor === String;
	};

	Val.array = function(arr) {
		return Val.defined(arr) && arr.constructor === Array;
	};

	Val.map = function(map) {
		return Val.defined(map) && map.constructor === Map;
	};

	Val.set = function(set) {
		return Val.defined(set) && set.constructor === Set;
	};

	Val.date = function(date) {
		return Val.defined(date) && date.constructor === Date;
	};

	Val.boolean = function(bool) {
		return Val.defined(bool) && bool.constructor === Boolean;
	};

	Val.regex = function(reg) {
		return Val.defined(reg) && reg.constructor === RegExp;
	};

	Val.promise = function(prom) {
		return Val.defined(prom) && prom.constructor === Promise;
	};

    return Val;
}));
