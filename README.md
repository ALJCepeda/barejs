# bareutil
Yet Another Javascipt Utility library

Contains recurring goto methods I encounter during development

### How to use

```javascript
var Bare = require("bareutil");
var M = Bare.Misc;
var O = Bare.Obj;
var V = Bare.Val;
```

### Validation (Bare.Val)

All validation is done by performing a check on the object's constructor

 1. **undefined(obj)** - `var obj;` is *true*
 2. **defined(obj)** - `var obj;` is *false*
 3. **function(obj)** - `function() { }` is *true*
 4. **object(obj)** - `{ }` is *true*
 5. **number(obj)** - `12` is *true*
 6. **string(obj)** - `"Hello"` is *true*
 7. **date(obj)** - `new Date()` is *true*
 8. **boolean(obj)** - `false` is *true*
 9. **regex(obj)** - `\(w*)\g` is *true*
 10. **promise(obj)** - `new Promise()` is *true*

### Object (Bare.Obj)

Functional programming for objects

Array-like methods have 2 required and 1 optional parameter:
 1. obj - The object to perform the operation on
 2. cb(key, value) - Function called for each element in the object
 3. allowFuncs - Will include functions in iterations

###### Array-like

 1. **find** - Returns value if a match is found
    Performs a strict comparison when a non-function is provided
 2. **each** - Executes cb once per property
 3. **map** - Performs transformation on object's values. Keys are preserved.
 4. **reduce** - Provides an accumulator to reduce object down to a single value
	cb(accumulated, value, key)
 5. **filter** - Constructs new object from calls that return true. Keys are preserved.
 6. **keys** - An array of the keys of the object
 7. **values** - An array of the values of the object
 8. **toArray** - Transforms into an array of `{key, value}` pairs
 9. **sum** - Reduces by adding. Return true/false from cb to sum value

###### Other

 1. **increment(obj, map)** - Increment each matching key by value
 2. **write(obj, data)** - Assigns all key/values from data to obj
 3. **merge(obj, data)** - Assigns all matching key/values from data to obj
 4. **slim(obj, prop)** - Flattens a nested object by the property
 5. **copy(obj)** - Creates a shallow copy the object
 6. **has(obj, prop)** - `true` if object has that property defined
 7. **contains(obj, coll)** - `true` if obj shares all keys with coll

### Misc (Bare.Misc)

 1. **supplant(str, values)** - String substitution, `{key}` or `$key` syntax
 2. **once(fn, context)** - Calls functions with context only once. Subsequent calls return result
 3. **throwLater(err, msg)** - Throws error sometime later
 4. **throwWith(msg)** - Returns throw later function with msg prepended
