(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['bareutil.val'], factory);
    } else if (typeof exports === 'object') {
        var obj = factory(require('./val'));
        obj.expose = (app, express, url) => {
            app.use('/bareutil.obj.js', express.static(__filename));
        }

        module.exports = obj;
    } else {
        root.bareutil.obj = factory(root.bareutil.val);
    }
}(this, (val) => {
	var obj = {};
	/*
		Returns true if some <key, value> satifies the condition
	*/
	obj.find = (item, callback, allowFuncs) => {
		var cb = callback;
		if(val.string(callback)) {
			cb = (value, key) => {
				return (key === callback);
			};
		}

    let keys = Object.keys(item);
    let key = keys.find((key) => {
      value = item[key];

      if(allowFuncs !== true && val.function(value) === true) {
        return false;
      }

      return cb(value, key);
    });

    return item[key];
	};

  /*
      Checks if every element is true for some condition
  */
  obj.every = (item, callback, allowFuncs) => {
     let element = obj.find(item, (value, key) => {
          return !callback(value, key);
      }, allowFuncs);

      return val.undefined(element);
  };

	/*
		Iterates over all properties
	*/
	obj.each = (item, callback, allowFuncs) => {
		obj.find(item, (value, key) => {
			callback(value, key);
		}, allowFuncs);
	};
	obj.forEach = obj.each;

	/*
		Object mapping
	*/
	obj.map = (item, callback, allowFuncs) => {
		var result = {};

		obj.each(item, (value, key) => {
			result[key] = callback(value, key);
		}, allowFuncs);

		return result;
	};

	/*
		Reduces object keys and values to single vlue
	*/
	obj.reduce = (item, callback, result, allowFuncs) => {
		result = result || 0;
		var cb = callback;

    if(val.undefined(allowFuncs) && val.boolean(result)) {
      allowFuncs = result;
    } else {
      allowFuncs = false;
    }

		if(val.number(callback) || val.string(callback)) {
			result = callback;
			cb = (p, v, k) => { return p + v; };
		}

		if(val.array(callback)) {
			result = callback;
			cb = (p, v, k) => { p.push(v); return p; };
		}

		obj.each(item, (value, key) => {
			result = cb(result, value, key);
		}, allowFuncs);

		return result;
	};

	/*
	  Creates new object based on condition
	*/
	obj.filter = (item, callback, allowFuncs) => {
		var result = {};

		obj.each(item, (value, key) => {
			if(callback(value, key) === true) {
				result[key] = value;
			}
		}, allowFuncs);

		return result;
	};

	/*
		Pushes property keys onto array
	*/
	obj.keys = (item, allowFuncs) => {
		var result = [];

		obj.each(item, (value, key) => {
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
		Writes all properties of data onto item
		item is modified
	*/
	obj.write = function(item, other, options) {
        options = options || {};

		obj.each(other, function(value, key) {
            var data = value;
            if(val.defined(options[key]) === true) {
                data = options[key](value);
            }

            item[key] = data;
		});
	};

	/*
		Writes all shared properties of data onto item
		item is modified
	*/
	obj.merge = function(item, data, options) {
        options = options || {};

		obj.each(data, function(value, key) {
			if(val.undefined(item[key]) !== true) {
                var data = value;
                if(val.defined(options[key]) === true) {
                    data = options[key](value);
                }

				item[key] = data;
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
        Performs a shallow copy
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

	obj.contains = function(obj, coll) {
		var result = false;
		if(val.array(coll) === true) {
			result = coll.find(function(key, value) {
                if(obj.has(obj, key) === false) {
                    return false;
                }
            });
		} else {
			result = coll.find(function(value, key) {
                if(obj.has(obj, key) === false) {
                    return false;
                }
            });
		}

		return val.defined(result);
	};

    return obj;
}));
