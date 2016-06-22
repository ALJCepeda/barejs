(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bare.val'], factory);
    } else if (typeof exports === 'object') {
        var obj = factory(require('./val'));
        obj.expose = function(app, express) {
            app.use('/bare.obj.js', express.static(__filename));
        }

        module.exports = obj;
    } else {
        root.bare.obj = factory(root.bare.val);
    }
}(this, function (val) {
	var obj = {};
	/*
		Delegated iteration over object
	*/
	obj.find = function(item, callback, allowFuncs) {
		var keys = Object.keys(item);
		var result;

		var cb = callback;
		if(val.string(callback)) {
			cb = function(value, key) {
				return (key === callback);
			};
		}

		for (var i = keys.length - 1; i >= 0; i--) {
			var key = keys[i];
			value = item[key];

			if(allowFuncs !== true && val.function(value) === true) {
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
	obj.each = function(item, callback, allowFuncs) {
		obj.find(item, function(value, key) {
			callback(value, key);
		}, allowFuncs);
	};

	obj.forEach = obj.each;

	/*
		Object mapping
	*/
	obj.map = function(item, callback, allowFuncs) {
		var result = {};

		obj.each(item, function(value, key) {
			result[key] = callback(value, key);
		}, allowFuncs);

		return result;
	};

	/*
		Delegated reduction of object
	*/
	obj.reduce = function(item, callback, result, allowFuncs) {
		result = result || 0;
		var cb = callback;

		if(val.number(callback) || val.string(callback)) {
			result = callback;
			cb = function(p, v, k) { return p + v; };
		}

		if(val.array(callback)) {
			result = callback;
			cb = function(p, v, k) { return result.push(v); };
		}

		obj.each(item, function(value, key) {
			result = cb(result, value, key);
		}, allowFuncs);

		return result;
	};

	/*
		Delegated filtering of object
	*/
	obj.filter = function(item, cb, allowFuncs) {
		var result = {};

		obj.each(item, function(value, key) {
			if(cb(value, key) === true) {
				result[key] = value;
			}
		}, allowFuncs);

		return result;
	};

	/*
		Pushes property keys onto array
	*/
	obj.keys = function(item, allowFuncs) {
		var result = [];

		obj.each(obj, function(value, key) {
			result.push(key);
		}, allowFuncs);

		return result;
	};

	/*
		Pushes property values onto array
	*/
	obj.values = function(item, allowFuncs) {
		var result = [];

		obj.each(item, function(value, key) {
			result.push(value);
		}, allowFuncs);

		return result;
	};

	/*
		Converts object to array of (key,value) pairs
	*/
	obj.toArray = function(item, allowFuncs) {
		var result = [];

		obj.each(item, function(value, key) {
			result.push({ value:value, key:key });
		}, allowFuncs);

		return result;
	};

	/*
		Delegated sum of values
	*/
	obj.sum = function(item, cb, allowFuncs) {
		var shouldSum = function() { return true; };
		if(val.function(cb)) { shouldSum = cb; }

		if(val.array(cb)) {
			shouldSum = function(value, key) {
				return cb.indexOf(key) !== -1;
			};
		}

		var value = obj.reduce(item, function(pre, cur, key) {
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
	obj.increment = function(item, incrementBy) {
		return obj.map(item, function(value, key) {
			if(val.defined(incrementBy[key]) === true) {
				return value + incrementBy[key];
			}

			return value;
		});
	};

	/*
		Writes all properties of data onto item
		item is modified
	*/
	obj.write = function(item, data) {
		obj.each(data, function(value, key) {
			item[key] = value;
		});
	};

	/*
		Writes all shared properties of data onto item
		item is modified
	*/
	obj.merge = function(item, data) {
		obj.each(data, function(value, key) {
			if(val.defined(item[key]) === true) {
				item[key] = value;
			}
		});
	};

	obj.slim = function(item, prop) {
		return obj.map(item, function(value, key) {
			return value[prop];
		});
	};

	/*
		Creates a new object sharing all properties of item
	*/
	obj.copy = function(item) {
		var result = {};

		obj.each(item, function(value, key) {
			result[key] = value;
		});

		return result;
	};

	obj.has = function(obj, key) {
		return obj.hasOwnProperty(key);
	};

	function swap(cb) {
		return function(a, b) {
			cb(b, a);
		};
	}

	obj.contains = function(obj, coll) {
		var check = function(value, key) {
			if(obj.has(obj,key) === false) {
				return false;
			}
		};

		var result = false;
		if(val.array(coll) === true) {
			result = coll.find(swap(check));
		} else {
			result = coll.find(check);
		}

		return val.defined(result);
	};

    return obj;
}));
