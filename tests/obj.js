var tape = require('tape');
var Obj = require('./../scripts/obj');

let xtape = tape.skip;

let animals = { cow:'moo', dog:'bark', cat:'meow' };

tape('find', (t) => {
	t.equal(
		Obj.find(animals, 'dog'),
		'bark',
		'Dog is a key and it\'s value is bark'
	);

	t.equal(
		Obj.find(animals, (v, k) => k === 'cat' ),
		'meow',
		'The callback returned try because cat is a key and it\s value is meow'
	);

  t.equal(
    Obj.find(animals, 'howl'),
    undefined,
    'Howl is not a value in this set, undefined was returned'
  );

	t.end();
});

tape('every', function(t) {
  t.equal(
    Obj.every(animals, (v, k) => typeof v === 'string'),
    true,
    'Every value is a string'
  );

  t.equal(
    Obj.every(animals, (v, k) => k.length === 3),
    true,
    'Every key is 3 characters long'
  );

  t.equal(
    Obj.every(animals, v => v.length > 3),
    false,
    'Every value is not longer than 3 characters'
  );

  t.end()
});

tape('each', function(t) {
  t.plan(4);

  Obj.each(animals, (v, k) => t.pass(k));

  t.pass('Every property was iterated over');
});

tape('map', function(t) {
  t.deepEqual(
    Obj.map(animals, (v, k) => k + ' says ' + v + '!'),
    {
      cow:'cow says moo!',
      dog:'dog says bark!',
      cat:'cat says meow!'
    },
    'Changed to describe animal sounds'
  );

  t.end();
});

xtape('reduce', function(t) {
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
		'When number is provided as callback, values are summed with + operator'
	);

	t.equal(
		Obj.reduce(count, function(pre, value, key) { return pre + (value/2); }),
		71,
		'Providing a callback allows your own reduction'
	);

	t.end();
});

xtape('write', function(t) {
	var item = { };

	Obj.write(item, { foo:'bar', here:'now' });
	t.deepEqual(
		item,
		{ foo:'bar', here:'now' },
		'Keys and values were written to object'
	);

	t.end();
});

xtape('merge', function(t) {
	var item = { foo:'bar', here:'now' };

	Obj.merge(item, { a:'b', c:'d', foo:'bin' });
	t.deepEqual(
		item,
		{ foo:'bin', here:'now' },
		'Only shared properties are written'
	);

	t.end();
});
