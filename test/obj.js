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
