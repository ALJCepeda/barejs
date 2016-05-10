var tape = require("tape");

tape("testing", function(t) {
	t.plan(2);
    t.equal(1+1, 2);
    t.ok(true);
});