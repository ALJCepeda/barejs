var Val  = function() {};

Val.undefined = function(obj) {
	return typeof obj === "undefined";
};

Val.function = function(func) {
	return func.constructor === Function;
};

Val.object = function(obj) {
	return obj.constructor === Object;
};

Val.number = function(num) {
	return num.constructor === Number;
};

Val.string = function(str) {
	return str.constructor === String;
};

Val.array = function(arr) {
	return arr.constructor === Array;
};

Val.map = function(map) {
	return map.constructor === Map;
};

Val.set = function(set) {
	return set.constructor === Set;
};

Val.date = function(date) {
	return date.constructor === Date;
};

Val.boolean = function(bool) {
	return bool.constructor === Boolean;
};

Val.regex = function(reg) {
	return reg.constructor === RegExp;
};

Val.promise = function(prom) {
	return prom.constructor === Promise;
};

module.exports = Val;
