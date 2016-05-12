var tape = require("tape");
var Misc = require("../scripts/misc");
var m = new Misc();

tape("supplant", function(t) {

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
    	m.supplant("The placeholder {key} remains when {substitution} fails", [ "won't", "replace" ]),
    	"The placeholder {key} remains when {substitution} fails",
    	"No string substitution occurred"
    );

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
