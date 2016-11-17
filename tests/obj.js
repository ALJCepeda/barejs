var tape = require('tape');
var Obj = require('./../scripts/obj');

let xtape = (name) => {
  console.log(name, 'was skipped');
};

tape('find', (t) => {
  var test = { cow:'moo', dog:'bark', cat:'meow' };

	t.equal(
		Obj.find(test, 'dog'),
		'bark',
		'Dog is a key and it\'s value is bark'
	);

	t.equal(
		Obj.find(test, (v, k) => k === 'cat' ),
		'meow',
		'The callback returned try because cat is a key and it\s value is meow'
	);

  t.equal(
    Obj.find(test, 'howl'),
    undefined,
    'Howl is not a value in this set, undefined was returned'
  );

	t.end();
});

tape('every', function(t) {
  var test = { cow:'moo', dog:'bark', cat:'meow' };

  t.equal(
    Obj.every(test, (v, k) => typeof v === 'string'),
    true,
    'Every value is a string'
  );

  t.equal(
    Obj.every(test, (v, k) => k.length === 3),
    true,
    'Every key is 3 characters long'
  );

  t.equal(
    Obj.every(test, (v, k) => v.length > 3),
    false,
    'Every value is not longer than 3 characters'
  );

  t.end()
});

xtape('map', function(t) {
	var roster = {
		teacher:'Katlin',
		student:'John',
		parent:'Shawn'
	};

	var result = Obj.map(roster, function(value, key) {
		return 'Hello ' + value + ' you are a ' + key + '.';
	});

	t.deepEqual(
		result,
		{ 	teacher: 'Hello Katlin you are a teacher.',
			student: 'Hello John you are a student.',
			parent: 'Hello Shawn you are a parent.'	},
		'The values are mapped and the keys are preserved'
	);

	t.deepEqual(
		roster,
		{ 	teacher:'Katlin',
			student:'John',
			parent:'Shawn'	},
		'The original object is left unchanged'
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
