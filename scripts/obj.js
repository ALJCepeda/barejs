var Val = require("./val");
var Obj = function() {};

/*
	Delegated iteration over object
*/
Obj.find = function(item, callback, allowFuncs) {
	var keys = Object.keys(item);
	var result = false;

	var cb = callback;
	if(Val.string(callback)) {
		cb = function(key, value) {
			return (key === callback);
		};
	}

	for (var i = keys.length - 1; i >= 0; i--) {
		var key = keys[i];
		value = item[key];

		if(allowFuncs !== true && Val.function(value) === true) {
			continue;
		}


		if(cb(key, value) === true) {
			result = value;
			break;
		}
	}

	return result;
};

/*
	Iterates over all properties of object
	Optionally includes functions
*/
Obj.each = function(item, callback, allowFuncs) {
	Obj.find(item, function(key, value) {
		callback(key, value);
	}, allowFuncs);
};

/*
	Object mapping
*/
Obj.map = function(item, callback, allowFuncs) {
	var result = {};

	Obj.each(item, function(key, value) {
		result[key] = callback(key, value);
	}, allowFuncs);

	return result;
};

/*
	Delegated reduction of object
*/
Obj.reduce = function(item, callback, result, allowFuncs) {
	result = result || 0;
	var cb = callback;

	if(Val.number(callback) || Val.string(callback)) {
		result = callback;
		cb = function(p, k, v) { return p + v; };
	}

	if(Val.array(callback)) {
		result = callback;
		cb = function(p, k, v) { return result.push(value); };
	}

	Obj.each(item, function(key, value) {
		result = cb(result, key, value);
	}, allowFuncs);

	return result;
};

/*
	Delegated filtering of object
*/
Obj.filter = function(item, cb, allowFuncs) {
	var result = {};

	Obj.each(item, function(key, value) {
		if(cb(key, value) === true) {
			result[key] = value;
		}
	}, allowFuncs);

	return result;
};

/*
	Pushes property keys onto array
*/
Obj.keys = function(item, allowFuncs) {
	var result = [];

	Obj.each(Obj, function(key, value) {
		result.push(key);
	}, allowFuncs);

	return result;
};

/*
	Pushes property values onto array
*/
Obj.values = function(item, allowFuncs) {
	var result = [];

	Obj.each(item, function(key, value) {
		result.push(value);
	}, allowFuncs);

	return result;
};

/*
	Converts object to array of (key,value) pairs
*/
Obj.toArray = function(item, allowFuncs) {
	var result = [];

	Obj.each(item, function(key, value) {
		result.push({ key:key, value:value });
	}, allowFuncs);

	return result;
};

/*
	Delegated sum of values
*/
Obj.sum = function(item, cb, allowFuncs) {
	var shouldSum = function() { return true; };
	if(Val.function(cb)) { shouldSum = cb; }

	if(Val.array(cb)) {
		shouldSum = function(key, value) {
			return cb.indexOf(key) !== -1;
		};
	}

	var value = Obj.reduce(item, function(pre, key, cur) {
		if(shouldSum(key, cur) === true) {
			return pre + cur;
		}

		return pre;
	}, 0, allowFuncs);

	return value;
};

/*
	Increments shared keys by value
*/
Obj.increment = function(item, incrementBy) {
	return Obj.map(item, function(key, value) {
		if(Val.defined(incrementBy[key]) === true) {
			return value + incrementBy[key];
		}

		return value;
	});
};

/*
	Writes all properties of data onto item
	item is modified
*/
Obj.write = function(item, data) {
	Obj.each(data, function(key, value) {
		item[key] = value;
	});
};

/*
	Writes all shared properties of data onto item
	items is modified
*/
Obj.merge = function(item, data) {
	Obj.each(data, function(key, value) {
		if(Val.defined(item[key]) === true) {
			item[key] = value;
		}
	});
};

Obj.slim = function(item, prop) {
	return Obj.map(item, function(key, value) {
		return value[prop];
	});
};

/*
	Creates a new object sharing all properties of item
*/
Obj.copy = function(item) {
	var result = {};

	Obj.each(item, function(key, value) {
		result[key] = value;
	});

	return result;
};


module.exports = Obj;
