var Val = require("./val");
var Obj = function() {};

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

Obj.each = function(item, callback, allowFuncs) {
	Obj.find(item, function(key, value) {
		callback(key, value);
	}, allowFuncs);
};

Obj.map = function(item, callback, allowFuncs) {
	var result = {};

	Obj.each(item, function(key, value) {
		result[key] = callback(key, value);
	}, allowFuncs);

	return result;
};

Obj.reduce = function(item, cb, result, allowFuncs) {
	result = result || 0;

	Obj.each(item, function(key, value) {
		result = cb(result, key, value);
	}, allowFuncs);

	return result;
};

Obj.filter = function(item, cb, allowFuncs) {
	var result = {};

	Obj.each(item, function(key, value) {
		if(cb(key, value) === true) {
			result[key] = value;
		}
	}, allowFuncs);

	return result;
};

Obj.keys = function(item, allowFuncs) {
	var result = [];

	Obj.each(Obj, function(key, value) {
		result.push(key);
	}, allowFuncs);

	return result;
};

Obj.values = function(item, allowFuncs) {
	var result = [];

	Obj.each(item, function(key, value) {
		result.push(value);
	}, allowFuncs);

	return result;
};

Obj.toArray = function(item, allowFuncs) {
	var result = [];

	Obj.each(item, function(key, value) {
		result.push({ key:key, value:value });
	}, allowFuncs);

	return result;
};

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

Obj.increment = function(item, incrementBy) {
	return Obj.map(item, function(key, value) {
		if(!Val.undefined(incrementBy[key])) {
			return value + incrementBy[key];
		}

		return value;
	});
};

Obj.merge = function(item, data) {
	Obj.each(item, function(key, value) {
		if(!Val.undefined(data[key])) {
			item[key] = data[key];
		}
	});
};

Obj.assign = function(item) {
	var args = [].slice.call(arguments, 1);

	args.forEach(function(arg) {
		Obj.each(arg, function(key, value) {
			item[key] = value;
		});
	});
};

Obj.slim = function(item, prop) {
	return Obj.map(item, function(key, value) {
		return value[prop];
	});
};

Obj.copy = function(item) {
	var result = {};

	Obj.each(item, function(key, value) {
		result[key] = value;
	});

	return result;
};


module.exports = Obj;
