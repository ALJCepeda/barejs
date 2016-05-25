var tape = require("tape");
var m = require("../scripts/misc");

tape("supplant", function(t) {
	t.equal(
		m.supplant("{0} - {1}", ["Bind", "An Error"]),
		"Bind - An Error",
		"Test"
	);
/*
    t.equal(
    	m.supplant("Hello {0}, My name is {1}", [ "stranger", "Bob" ]),
    	"Hello stranger, My name is Bob",
    	"String substitution using array"
    );

    t.equal(
    	m.supplant("A {animal}, says {sound}", { animal:"Cow", sound:"moo" }),
    	"A Cow, says moo",
    	"String substition with key/value pairs"
    );

	t.equal(
		m.supplant("List of groceries: $0, $1, $2, $3", [ "Bread", "Milk", "Eggs", "Butter" ]),
		"List of groceries: Bread, Milk, Eggs, Butter",
		"Also works with $0 syntax"
	);

    t.equal(
    	m.supplant("The placeholder {key} remains when {substitution} fails", [ "won't", "replace" ]),
    	"The placeholder {key} remains when {substitution} fails",
    	"No string substitution occurred"
    );*/

    t.end();
});

tape("once", function(t) {
	t.plan(1);

	var onced = m.once(function() {
		t.pass("Once was called only once");
	});

	for(var i=0; i<=10; i++) {
		onced();
	}

	t.end();
});
