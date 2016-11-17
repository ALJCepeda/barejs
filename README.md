# bareutil
Yet Another Javascript Utility library

Contains recurring goto methods I encounter during development
If you come across any problems, please create an issue

### How to use

```javascript
var bare = require("bareutil");
var misc = bare.misc;
var obj = bare.obj;
var val = bare.val;

//Expose to client *.com/bare.misc.js using express
var express = require('express');
var app = express();

bare.misc.expose(app, express);
bare.obj.expose(app, express);
bare.val.expose(app, express);
```

### How to run tests

```bash
cd bareutil
npm run test
npm run coverage
```

### Validation (bare.val)

All validation is done by performing a check on the object's constructor

 1. **bare.val.undefined(obj)** - `var obj;` is *true*
 2. **defined(obj)** - `var obj;` is *false*
 3. **function(obj)** - `function() { }` is *true*
 4. **object(obj)** - `{ }` is *true*
 5. **number(obj)** - `12` is *true*
 6. **string(obj)** - `"Hello"` is *true*
 7. **date(obj)** - `new Date()` is *true*
 8. **boolean(obj)** - `false` is *true*
 9. **regex(obj)** - `\(w*)\g` is *true*
 10. **promise(obj)** - `new Promise()` is *true*

### Object (bare.obj)

Functional programming for objects

Array-like methods have 2 required and 1 optional parameter:
 1. obj - The object to perform the operation on
 2. cb(key, value) - Function called for each element in the object
 3. allowFuncs - Will include functions in iterations

###### Array-like - function(obj, cb, allowFuncs)

 1. **bare.obj.find** - Returns value if a match is found
    Performs a strict comparison when a non-function is provided
 2. **each** - Executes cb once per property
 3. **map** - Performs transformation on object's values. Keys are preserved.
 4. **reduce** - Provides an accumulator to reduce object down to a single value
	cb(accumulated, value, key)
 5. **filter** - Constructs new object from calls that return true. Keys are preserved.
 6. **keys** - An array of the keys of the object
 7. **values** - An array of the values of the object
 8. **toArray** - Transforms into an array of `{key, value}` pairs

###### Other

 1. **bare.obj.increment(obj, map)** - Increment each matching key by value
 2. **write(obj, data)** - Assigns all key/values from data to obj
 3. **merge(obj, data)** - Assigns all matching key/values from data to obj
 4. **slim(obj, prop)** - Flattens a nested object by the property
 5. **copy(obj)** - Creates a shallow copy the object
 6. **has(obj, prop)** - `true` if object has that property defined
 7. **contains(obj, coll)** - `true` if obj shares all keys with coll

### Misc (bare.misc)

 1. **bare.misc.supplant(str, values)** - String substitution, `{key}` or `$key` syntax
 2. **random(length, possible)** - Random string from possible characters
 3. **once(fn, context)** - Calls functions with context only once. Subsequent calls return result
 4. **throwLater(err, msg)** - Throws error sometime later
 5. **throwWith(msg)** - Returns throw later function with msg prepended

### Ajax (bare.ajax)
```html
    Not available for server-side yet, hasn't been tested. Don't use it
```
