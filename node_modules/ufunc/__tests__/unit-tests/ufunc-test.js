'use strict';

import test from 'tape';
import utils, {
  clean,
  cleanAll,
  cleanObj,
  cleanObjAll,
  filterObjetsInList,
  fmap,
  either,
  maybe,
  maybeIf,
  pickKeyValuesFromList,
  pipe
} from '../../lib/ufunc.js';


test('Ufunc Module.', nested => {
  nested.test(
    'clean - Remove false values from a list, expect 0s.',
    assert => {
      const actual = clean([0, 1, null, 2, undefined, 3]);
      const expect = [0, 1, 2, 3];

      assert.deepEqual(actual, expect,
        'Revome all null and undefined items from array.');

      assert.end();
    });


  nested.test(
    'cleanAll - Removes all false values from a list.',
    assert => {
      const actual = cleanAll([0, 1, null, 2, undefined, 3]);
      const expect = [1, 2, 3];

      assert.deepEqual(actual, expect,
        'Revome all null, undefined and 0 items from array.');

      assert.end();
    });


  nested.test(
    'cleanObj - Remove false values from a object, expect 0s.',
    assert => {
      const actual = cleanObj({a: 1, b: undefined, c: null, d: 'otis', e: 0});
      const expect = {a: 1, d: 'otis', e:0};

      assert.deepEqual(actual, expect,
        'Revome all null and undefined Key/value pairs from object.');

      assert.end();
    });


  nested.test(
    'cleanObjAll - Remove false values from a object, expect 0s.',
    assert => {
      const actual = cleanObjAll({a: 1, b: undefined, c: null, d: 'otis', e: 0});
      const expect = {a: 1, d: 'otis'};

      assert.deepEqual(actual, expect,
        'Revome all null, undefined and 0 Key/value pairs from object.');

      assert.end();
    });


  nested.test(
    'filterObjetsInList - Filters a list of objects by using another list of objects as the criteria.',
    assert => {
      const fn = (c, s) => {
        if (c.user === s.name) {
          return s;
        }
      };

      const criteria = [
        {user: 'Otis'}
      ];

      const search = [
        {name: 'Otis', message: 'hello'},
        {name: 'Ania', message: 'hi'},
        {name: 'Otis', message: 'What time do you finish work'},
        {name: 'Ania', message: 'around 6pm'}
      ];

      const actual = filterObjetsInList(fn, criteria, search)();
      const expect = [
        {name: 'Otis', message: 'hello'},
        {name: 'Otis', message: 'What time do you finish work'}
      ];

      assert.deepEqual(actual, expect,
        'Filters list of objects by keys.');

      assert.end();
    });


  nested.test(
    'fmap - Maps a function over a container and returns a new container.',
    assert => {
      const container = (value, emptyType = null) => {
        const val = value == null ? emptyType : value;

        return Object.freeze({
          value: val
        });
      };

      const mapped = {
        actual: fmap(x => x + 3, container, 10)(),
        expect: { value: 13 }
      };

      assert.deepEqual(mapped.actual, mapped.expect,
        'Maps a function over a container.');


      const nothing = {
        actual: fmap(x => x + 3, container)(),
        expect: { value: null }
      };

      assert.deepEqual(nothing.actual, nothing.expect,
        'Returns a container with a value of null, if value is null or undefined.');

      assert.end();
    });


  nested.test(
    'either - Executes left if any of the condition are true, else right if false.',
    assert => {
      const trueAssert = {
        actual: either('left', 'right')(true),
        expect: 'left'
      };

      assert.equal(trueAssert.actual, trueAssert.expect,
        'Returns left if condiotn is true.');


      const trueFunctionAssert = {
        actual: either(() => 'left', () => 'right')(true),
        expect: 'left'
      };

      assert.equal(trueFunctionAssert.actual, trueFunctionAssert.expect,
        'Exectutes left function if condiotn true.');


      const falseAssert = {
        actual: either('left', 'right')(false),
        expect: 'right'
      };

      assert.equal(falseAssert.actual, falseAssert.expect,
        'Returns right if condiotn is false.');


      const falseFunctionAssert = {
        actual: either(() => 'left', () => 'right')(false),
        expect: 'right'
      };

      assert.equal(falseFunctionAssert.actual, falseFunctionAssert.expect,
        'Exectutes right function if condiotn false.');


      const arrayTrueAssert = {
        actual: either('left', 'right')([true, false]),
        expect: 'left'
      };

      assert.equal(arrayTrueAssert.actual, arrayTrueAssert.expect,
        'Returns left if any of the conditions are true.');


      const arrayTrueFunctionAssert = {
        actual: either(() => 'left', () => 'right')([true, false]),
        expect: 'left'
      };

      assert.equal(arrayTrueFunctionAssert.actual, arrayTrueFunctionAssert.expect,
        'Exectutes left function if any of the conditions are true.');


      const arrayFalseAssert = {
        actual: either('left', 'right')([false, false]),
        expect: 'right'
      };

      assert.equal(arrayFalseAssert.actual, arrayFalseAssert.expect,
        'Returns right if any of the conditions are false.');


      const ArrayFalseFunctionAssert = {
        actual: either(() => 'left', () => 'right')([false, false]),
        expect: 'right'
      };

      assert.equal(ArrayFalseFunctionAssert.actual, ArrayFalseFunctionAssert.expect,
        'Exectutes right function if any of the conditions are false.');

      assert.end();
    });

  nested.test(
    'maybe - If value is truthy returns value, else null',
    assert => {

      const hasValue = {
        actual: maybe()('Jack Bower'),
        expect: 'Jack Bower'
      };

      assert.deepEqual(hasValue.actual, hasValue.expect,
        'Returns value.');


      const nothing = {
        actual: maybe()(null),
        expect: null
      };

      assert.deepEqual(nothing.actual, nothing.expect,
        'Returns nothing if null.');


      const empty = {
        actual: maybe([])(null),
        expect: []
      };

      assert.deepEqual(empty.actual, empty.expect,
        'returns empty if object is empty.');

      assert.end();
    });


  nested.test(
    'maybeIf - If condition is truthy returns value',
    assert => {

      const hasTrueValue = {
        actual: maybeIf('Jack Bower')(true),
        expect: 'Jack Bower'
      };

      assert.deepEqual(hasTrueValue.actual, hasTrueValue.expect,
        'Returns true value.');


      const nothing = {
        actual: maybeIf(null)(),
        expect: null
      };

      assert.deepEqual(nothing.actual, nothing.expect,
        'Returns nothing if null.');


      const empty = {
        actual: maybeIf(null)(false, []),
        expect: []
      };

      assert.deepEqual(empty.actual, empty.expect,
        'Returns empty if object is false.');

      assert.end();
    });


  nested.test(
    'pipe - Run a sequence of functions on a single value from left top righht.',
    assert => {
      const awesome = (v) => v + ' is Awesome!';
      const upper = (v) => v.toUpperCase();
      const lower = (v) => v.toLowerCase();

      const actual = pipe(upper, awesome, lower)('Functional Programming');

      const expect = 'functional programming is awesome!';

      assert.deepEqual(actual, expect,
        '');

      assert.end();
    });

  nested.test(
    'pickPairsFromList - Picks keys/values out of an array of objects.',
    assert => {
      const fixtures = [
        {user: 'user1', id: 'id1', email: 'user1@test.com', status: 'online', name: 'Bill'},
        {user: 'user2', id: 'id2', email: 'user2@test.com', status: 'online', name: 'Jane'},
        {user: 'user3', id: 'id3', email: 'user3@test.com', status: 'offline', name: 'Marry'},
        {user: 'user4', id: 'id4', email: 'user4@test.com', status: 'offline', name: 'Larry'}
      ];

      const actual = pickKeyValuesFromList(
        ['id', 'email', 'status'],
        fixtures
      );

      const expect = [
        {id: 'id1', email: 'user1@test.com', status: 'online'},
        {id: 'id2', email: 'user2@test.com', status: 'online'},
        {id: 'id3', email: 'user3@test.com', status: 'offline'},
        {id: 'id4', email: 'user4@test.com', status: 'offline'}
      ];

      assert.deepEqual(actual, expect,
        'Picks keys/value pairs out of an array of objects and return new list of objects.');

      assert.end();
    });

});
