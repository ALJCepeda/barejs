var Val = require("./../scripts/val");
var tape = require("tape");

tape("array", function(t) {
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

tape("object", function(t) {
	var obj = { foo:"bar", nay:"no" };
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

tape("function", function(t) {
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

tape("number", function(t) {
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

tape("string", function(t) {
	var str = "A string";
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

tape("date", function(t) {
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

tape("boolean", function(t) {
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

tape("regex", function(t) {
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
