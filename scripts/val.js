(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        var val = factory();
        val.expose = function(app, express) {
            app.use('/bareutil.val.js', express.static(__filename));
        }

        module.exports = val;
    } else {
        if(typeof root.bare === 'undefined') {
            root.bareutil = {};
        }

        root.bareutil.val = factory();
    }
}(this, function () {
	var val;
    var Assertion = function(obj) {
        this.obj = obj;
        this.asserts = [];
    }
    Assertion.prototype.valid = function(obj) {
        if(val.undefined(obj)) {
            obj = this.obj;
        }

        return this.asserts.every(function(assert) {
            var comparison = assert.comparison;
            var value = assert.value;

            return comparison(obj, value);
        }.bind(this));
    };
    Assertion.prototype.add = function(comparison, value) {
        this.asserts.push({ comparison:comparison, value:value });
        return this;
    };
    Assertion.prototype.gt = function(value) { return this.add(val.gt, value); };
    Assertion.prototype.lt = function(value) { return this.add(val.lt, value); };
    Assertion.prototype.eq = function(value) { return this.add(val.eq, value); };

    val  = function(obj) {
        this.obj = obj;
        this.assertions = {};
    };

    val.prototype.validate = function(prop) {
        if(val.undefined(this.assertions[prop])) {
            this.assertions[prop] = [];
        }

        var assertion = new Assertion(this.obj[prop]);
        this.assertions[prop].push(assertion);
        return assertion;
    };

    val.prototype.valid = function() {
        for(var prop in this.assertions) {
            var assertions = this.assertions[prop];
            var propVal = this.obj[prop];

            var isValid = assertions.every(function(assertion) {
                return assertion.valid(propVal);
            }.bind(this));

            if(isValid === false) {
                return false;
            }
        }

        return true;
    };

	val.undefined = function(obj) {
		return typeof obj === "undefined";
	};

	val.defined = function(obj) {
		return typeof obj !== "undefined"  && obj !== null;
	};

    val.emtpy = function(obj) {
        return this.defined(obj) && obj !== '' && obj !== 0;
    };

	val.function = function(obj) {
		return val.defined(obj) && obj.constructor === Function;
	};

	val.object = function(obj) {
		return val.defined(obj) && typeof obj === 'object';
	};

	val.number = function(obj) {
		return val.defined(obj) && obj.constructor === Number;
	};

	val.string = function(obj) {
		return val.defined(obj) && obj.constructor === String;
	};

	val.array = function(obj) {
		return val.defined(obj) && obj.constructor === Array;
	};

	val.map = function(obj) {
		return val.defined(obj) && obj.constructor === Map;
	};

	val.set = function(obj) {
		return val.defined(obj) && obj.constructor === Set;
	};

	val.date = function(obj) {
		return val.defined(obj) && obj.constructor === Date;
	};

	val.boolean = function(obj) {
		return val.defined(obj) && obj.constructor === Boolean;
	};

	val.regex = function(obj) {
		return val.defined(obj) && obj.constructor === RegExp;
	};

	val.promise = function(obj) {
		return val.defined(obj) && obj.constructor === Promise;
	};

    var properLength = function(obj) {
        var length = obj;

        if(val.object(obj) === true) { obj = Object.keys(obj); }
        if(obj.length) { length = obj.length; }

        return length;
    };
    val.gt = function(obj, length) {
        if(val.number(length) === false) { return obj > length; }
        return properLength(obj) > length;
    };
    val.gte = function(obj, length) {
        if(val.number(length) === false) { return obj >= length; }
        return properLength(obj) >= length;
    };
    val.lt = function(obj, length) {
        if(val.number(length) === false) { return obj < length; }
        return properLength(obj) < length;
    };
    val.lte = function(obj, length) {
        if(val.number(length) === false) { return obj <= length; }
        return properLength(obj) <= length;
    };
    val.eq = function(obj, length) {
        if(val.number(length) === false) {
            if(val.array(length) === true || val.object(length) === true) {
                return val.deq(obj, length);
            }

            return obj == length;
        }

        var proper = properLength(obj);
        return proper == length;
    };
    val.deq = function(a, b) {
        if(properLength(a) !== properLength(b)) {
            return false;
        }

        for(var i in a) {
            if(val.eq(a[i], b[i]) === false) {
                return false;
            }
        }

        return true;
    };
    val.is = function(obj, length) {
        if(val.array(length) === true || val.object(length) === true) {
            return val.dis(obj, length);
        }

        return obj === length;
    };
    val.dis = function(a, b) {
        if(properLength(a) !== properLength(b)) {
            return false;
        }

        for(var i in a) {
            if(val.is(a[i], b[i]) === false) {
                return false;
            }
        }

        return true;
    };
    return val;
}));
