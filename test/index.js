var tape = require("tape");
var Base = require("../");
var b = new Base();

tape("supplant", function(t) {

    t.equal(
    	b.supplant("Hello {0}, My name is {1}", [ "stranger", "Bob" ]), 
    	"Hello stranger, My name is Bob", 
    	"String substitution using array"
    );

    t.equal(
    	b.supplant("A {animal}, says {sound}", { animal:"Cow", sound:"moo" }),
    	"A Cow, says moo",
    	"String substition with key/value pairs"
    );

    t.equal(
    	b.supplant("The placeholder {key} remains when {substitution} fails", [ "won't", "replace" ]),
    	"The placeholder {key} remains when {substitution} fails",
    	"No string substitution occurred"
    );

    t.end();
});