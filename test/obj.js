var tape = require("tape");
var Obj = require("./../scripts/obj");

tape("find", function(t) {
	t.equal(
		Obj.find({ cow:"moo", dog:"bark", cat:"meow" }, "dog"),
		"bark",
		"Returns the value of the found key"
	);

	t.equal(
		Obj.find({ cow:"moo", dog:"bark", cat:"meow" },
			function(k, v) {
				return k === "cat";
		}),
		"meow",
		"Returns value if callback returns true"
	);

	t.end();
});

tape("map", function(t) {
	var roster = {
		teacher:"Katlin",
		student:"John",
		parent:"Shawn"
	};

	var result = Obj.map(roster, function(k, v) {
			return "Hello " + v + " you are a " + k + ".";
	});

	t.deepEqual(
		result,
		{ 	teacher: "Hello Katlin you are a teacher.",
			student: "Hello John you are a student.",
			parent: "Hello Shawn you are a parent."	},
		"The values are mapped and the keys are preserved"
	);

	t.deepEqual(
		roster,
		{ 	teacher:"Katlin",
			student:"John",
			parent:"Shawn"	},
		"The original object is left unchanged"
	);

	t.end();
});

tape("reduce", function(t) {
	var count = {
		students:38,
		parents:62,
		teachers:20,
		officials:12,
		military:10
	};

	t.equal(
		Obj.reduce(count, 0),
		142,
		"When number is provided as callback, values are summed with + operator"
	);

	t.equal(
		Obj.reduce(count, function(p, k, v) { return p + (v/2); }),
		71,
		"Providing a callback allows your own reduction"
	);

	t.end();
});

tape("write", function(t) {
	var item = { };

	Obj.write(item, { foo:"bar", here:"now" });
	t.deepEqual(
		item,
		{ foo:"bar", here:"now" },
		"Keys and values were written to object"
	);

	t.end();
});

tape("merge", function(t) {
	var item = { foo:"bar", here:"now" };

	Obj.merge(item, { a:"b", c:"d", foo:"bin" });
	t.deepEqual(
		item,
		{ foo:"bin", here:"now" },
		"Only shared properties are written"
	);

	t.end();
});
