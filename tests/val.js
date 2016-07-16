var Val = require('./../scripts/val');
var tape = require('tape');
var xtape = function(name) {
	console.log('\''+name+'\'', 'manually skipped');
};

tape('validation object', function(t) {
	var obj = { a:true, b:'two', c:3 };
	var val = new Val(obj);

	var assertC = val.validate('c').gt(2).lt(5).eq(3);
	t.true(assertC.valid(), 'Property c is valid');

	t.end();
});

tape('greater than', function(t) {
	t.true(Val.gt(12, 10), '12 is gt 10');
	t.true(Val.gt('A test', 3), 'String is gt 3 chars');
	t.true(Val.gt([1, 2, 3, 4, 5], 3), 'Array has gt 3 elements');
	t.true(Val.gt({ 'a':1, 'b':2, 'c':3 }, 2), 'Object has gt 2 properties');
	t.true(Val.gt('testB', 'testA'), 'Compares string if string is second parameter');
	t.true(Val.gt(12, '10'), 'This works too');

	var dateA = new Date();
	var dateB = new Date(2000);
	t.true(Val.gt(dateA, dateB), 'Now is later than the year 2000');

	t.end();
});

return;

tape('less than', function(t) {
	t.true(Val.lt(12, 100), '12 is lt 100');
	t.true(Val.lt('A test', 10), 'String is lt 10 chars');
	t.true(Val.lt([1, 2, 3, 4, 5], 15), 'Array has lt 15 elements');
	t.true(Val.lt({ 'a':1, 'b':2, 'c':3 }, 6), 'Object has lt 6 properties');

	var dateA = new Date(2000);
	var dateB = new Date();
	t.true(Val.lt(dateA, dateB), 'The year 2000 was before now');

	t.end();
});

tape('equal to', function(t) {
	t.true(Val.eq(12, 12), '12 is eq 12');
	t.true(Val.eq('A test', 6), 'String is eq 6 chars');
	t.true(Val.eq('A test', 'A test'), 'Strings are eq to each other');
	t.true(Val.eq([1, 2, 3, 4, 5], 5), 'Array has 5 elements');
	t.true(Val.eq([1, 2], [1, 2]), 'Arrays are eq to each other');
	t.true(Val.eq({ 'a':1, 'b':2, 'c':3 }, 3), 'Object 3 properties');
	t.true(Val.eq({ 'a':1, 'b':2 }, { 'a':1, 'b':2 }), 'Objects are eq to each other ');

	var dateA = Date.now();
	var dateB = new Date();
	t.true(Val.eq(dateA, dateB), 'Both dates are right now');

	t.end();
});

tape('is identical', function(t) {
	var a, b;

	a = 12, b = a;
	t.true(Val.is(a, b), 'Number references are identical');

	a = 12, b = 12;
	t.false(Val.is(a, b), 'Number values are not identical');
	 return;
	t.true(Val.is('A test', 'A test'), 'Strings are identical');
	t.true(Val.is([1, 2], [1, 2]), 'Arrays are is to each other');
	t.true(Val.is({ 'a':1, 'b':2, 'c':3 }, 3), 'Object 3 properties');
	t.true(Val.is({ 'a':1, 'b':2 }, { 'a':1, 'b':2 }), 'Objects are is to each other ');

	var dateA = Date.now();
	var dateB = new Date();
	t.true(Val.eq(dateA, dateB), 'Both dates are right now');

	t.end();
});

tape('array', function(t) {
	var arr = [ 1, 2, 3 ];
	t.true(Val.array(arr));

	t.false(Val.function(arr));
	t.false(Val.object(arr));
	t.false(Val.number(arr));
	t.false(Val.string(arr));
	t.false(Val.date(arr));
	t.false(Val.boolean(arr));
	t.false(Val.regex(arr));
	t.end();
});

tape('object', function(t) {
	var obj = { foo:'bar', nay:'no' };
	t.true(Val.object(obj));

	t.false(Val.array(obj));
	t.false(Val.function(obj));
	t.false(Val.number(obj));
	t.false(Val.string(obj));
	t.false(Val.date(obj));
	t.false(Val.boolean(obj));
	t.false(Val.regex(obj));
	t.end();
});

tape('function', function(t) {
	var func = function() {};
	t.true(Val.function(func));

	t.false(Val.array(func));
	t.false(Val.object(func));
	t.false(Val.number(func));
	t.false(Val.string(func));
	t.false(Val.date(func));
	t.false(Val.boolean(func));
	t.false(Val.regex(func));
	t.end();
});

tape('number', function(t) {
	var num = 27;
	t.true(Val.number(num));

	t.false(Val.array(num));
	t.false(Val.object(num));
	t.false(Val.function(num));
	t.false(Val.string(num));
	t.false(Val.date(num));
	t.false(Val.boolean(num));
	t.false(Val.regex(num));
	t.end();
});

tape('string', function(t) {
	var str = 'A string';
	t.true(Val.string(str));

	t.false(Val.array(str));
	t.false(Val.object(str));
	t.false(Val.function(str));
	t.false(Val.number(str));
	t.false(Val.date(str));
	t.false(Val.boolean(str));
	t.false(Val.regex(str));
	t.end();
});

tape('date', function(t) {
	var date = new Date();
	t.true(Val.date(date));

	t.false(Val.array(date));
	t.false(Val.object(date));
	t.false(Val.function(date));
	t.false(Val.number(date));
	t.false(Val.string(date));
	t.false(Val.boolean(date));
	t.false(Val.regex(date));
	t.end();
});

tape('boolean', function(t) {
	var bool = true;
	t.true(Val.boolean(bool));

	t.false(Val.array(bool));
	t.false(Val.object(bool));
	t.false(Val.function(bool));
	t.false(Val.number(bool));
	t.false(Val.string(bool));
	t.false(Val.date(bool));
	t.false(Val.regex(bool));
	t.end();
});

tape('regex', function(t) {
	var reg = /(w+)/;
	t.true(Val.regex(reg));

	t.false(Val.array(reg));
	t.false(Val.object(reg));
	t.false(Val.function(reg));
	t.false(Val.number(reg));
	t.false(Val.string(reg));
	t.false(Val.date(reg));
	t.false(Val.boolean(reg));
	t.end();
});
