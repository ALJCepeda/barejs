var tape = require("tape");
var Base = require("../");
var b = new Base();

tape("is_a", function(t) {
	t.plan(2);


	t.ok(true);
    t.equal(1+1, 2);
});