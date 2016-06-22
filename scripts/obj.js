(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bareutil.val'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./val'));
    } else {
        root.returnExports = factory(root.Val);
    }
}(this, function (Val) {
	var Obj = {};
	/*
		Delegated iteration over object
	*/
	Obj.find = function(item, callback, allowFuncs) {
		var keys = Object.keys(item);
		var result;

		var cb = callback;
		if(Val.string(callback)) {
			cb = function(value, key) {
				return (key === callback);
			};
		}

		for (var i = keys.length - 1; i >= 0; i--) {
			var key = keys[i];
			value = item[key];

			if(allowFuncs !== true && Val.function(value) === true) {
				continue;
			}

			if(cb(value, key) === true) {
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
		Obj.find(item, function(value, key) {
			callback(value, key);
		}, allowFuncs);
	};

	Obj.forEach = Obj.each;

	/*
		Object mapping
	*/
	Obj.map = function(item, callback, allowFuncs) {
		var result = {};

		Obj.each(item, function(value, key) {
			result[key] = callback(value, key);
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
			cb = function(p, v, k) { return p + v; };
		}

		if(Val.array(callback)) {
			result = callback;
			cb = function(p, v, k) { return result.push(v); };
		}

		Obj.each(item, function(value, key) {
			result = cb(result, value, key);
		}, allowFuncs);

		return result;
	};

	/*
		Delegated filtering of object
	*/
	Obj.filter = function(item, cb, allowFuncs) {
		var result = {};

		Obj.each(item, function(value, key) {
			if(cb(value, key) === true) {
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

		Obj.each(Obj, function(value, key) {
			result.push(key);
		}, allowFuncs);

		return result;
	};

	/*
		Pushes property values onto array
	*/
	Obj.values = function(item, allowFuncs) {
		var result = [];

		Obj.each(item, function(value, key) {
			result.push(value);
		}, allowFuncs);

		return result;
	};

	/*
		Converts object to array of (key,value) pairs
	*/
	Obj.toArray = function(item, allowFuncs) {
		var result = [];

		Obj.each(item, function(value, key) {
			result.push({ value:value, key:key });
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
			shouldSum = function(value, key) {
				return cb.indexOf(key) !== -1;
			};
		}

		var value = Obj.reduce(item, function(pre, cur, key) {
			if(shouldSum(cur, key) === true) {
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
		return Obj.map(item, function(value, key) {
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
		Obj.each(data, function(value, key) {
			item[key] = value;
		});
	};

	/*
		Writes all shared properties of data onto item
		item is modified
	*/
	Obj.merge = function(item, data) {
		Obj.each(data, function(value, key) {
			if(Val.defined(item[key]) === true) {
				item[key] = value;
			}
		});
	};

	Obj.slim = function(item, prop) {
		return Obj.map(item, function(value, key) {
			return value[prop];
		});
	};

	/*
		Creates a new object sharing all properties of item
	*/
	Obj.copy = function(item) {
		var result = {};

		Obj.each(item, function(value, key) {
			result[key] = value;
		});

		return result;
	};

	Obj.has = function(obj, key) {
		return obj.hasOwnProperty(key);
	};

	function swap(cb) {
		return function(a, b) {
			cb(b, a);
		};
	}

	Obj.contains = function(obj, coll) {
		var check = function(value, key) {
			if(Obj.has(obj,key) === false) {
				return false;
			}
		};

		var result = false;
		if(Val.array(coll) === true) {
			result = coll.find(swap(check));
		} else {
			result = coll.find(check);
		}

		return Val.defined(result);
	};

    return Obj;
}));
