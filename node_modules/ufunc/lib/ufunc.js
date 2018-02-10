'use strict';

/**
 * Remove false values from a list, expect 0's
 * @param  {array} list - List of items to be filtered
 * @return {array}      - New lsit with false items removed
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.clean = clean;
exports.cleanAll = cleanAll;
exports.cleanObj = cleanObj;
exports.cleanObjAll = cleanObjAll;
exports.curry = curry;
exports.filterObjetsInList = filterObjetsInList;
exports.fmap = fmap;
exports.either = either;
exports.maybe = maybe;
exports.maybeIf = maybeIf;
exports.pickKeyValuesFromList = pickKeyValuesFromList;
exports.pipe = pipe;
exports.everyTrue = everyTrue;
exports.someTrue = someTrue;
exports.unique = unique;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function clean(list) {
  return list.filter(function (e) {
    return e === 0 ? '0' : e;
  });
}

/**
 * Removes all false values from a list
 * @param  {array} list - List of items to be filtered
 * @return {array}      - New list with false items removed
 */
function cleanAll(list) {
  return list.filter(function (e) {
    return e;
  });
}

/**
 * Removes all false key/values pairs from a list, expect 0's
 * @param  {object} list - List of items to be filtered
 * @return {object}      - New list with false items removed
 */
function cleanObj(obj) {
  Object.keys(obj).forEach(function (key) {
    return obj[key] && _typeof(obj[key]) === 'object' && cleanObj(obj[key]) || (obj[key] === undefined || obj[key] === null) && delete obj[key];
  });
  return obj;
}

/**
 * Removes all key/values pairs values from a list
 * @param  {object} list - List of items to be filtered
 * @return {object}      - New list with false items removed
 */
function cleanObjAll(obj) {
  Object.keys(obj).forEach(function (key) {
    return obj[key] && _typeof(obj[key]) === 'object' && cleanObj(obj[key]) || (obj[key] === null || obj[key] === undefined || obj[key] === 0) && delete obj[key];
  });
  return obj;
}

function curry(fn) {
  return function curried() {
    return fn.apply(this, arguments);
  };
}

/**
*  Filters a list of objects by using another list of objects as the criteria
*  @param  {function}  fn(criteria, search)  Function to filter criteria from searh
*  @param  {array}     criteria              List of objects to us as the criteria
*  @param  {array}     search                List of objects to be searhed
*  @return {array}                           New list of objects with only filterd properties
*/
function filterObjetsInList(fn, criteria, search) {
  return curry(function () {
    return clean(criteria.map(function (c) {
      return search.map(function (s) {
        return fn(c, s);
      });
    })[0]);
  });
}

/**
* Maps a function over a container and returns a new container
* @param  {function} function to be applied to value
* @param  {[object]}
* @param  {[type]}
* @return {[type]}     value to be mapped
*/
function fmap(f, container, val) {
  if (val == null) {
    return curry(function () {
      return container(null);
    });
  };

  return curry(function () {
    return container(f(val));
  });
}

/**
 * Executes left if any of the condition are true, else right if false.
 * @param  {any}   left        If true.
 * @param  {any}   right       If fasle.
 * @param  {array} conditions  Array of conditions to be evaluated.
 * @return {any}               Execute left if true else right if false.
 */
function either(left, right) {
  return curry(function (conditions) {
    var conditionsBool = Array.isArray(conditions) ? conditions.map(function (c) {
      return Boolean(c);
    }).some(function (b) {
      return b === true;
    }) : Boolean(conditions);

    if (conditionsBool) return typeof left === 'function' ? left() : left;

    return typeof right === 'function' ? right() : right;
  });
}

/**
* Create a container with an immutabe value or returns null if no value passed.
* @param  {any}  value      Value to be returned if true.
* @param  {any}  emptyType  Value to be returned if false value param is null/undefined. Default is null.
* @return {any}             Returns value or emptyType.
*/
function maybe() {
  var emptyType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return curry(function (value) {
    return value == null ? emptyType : value;
  });
}

/**
* Create a container with an immutabe value or returns null if no value passed.
* @param  {any}    value      Value to be returned if true
* @param  {bool}   condition  Condition to be evaluated. Default is false.
* @param  {any}    emptyType  Value to be returned if false value param is null/undefined. Default is null
* @return {any}               Returns value or emptyType based on condition.
*/
function maybeIf(value) {
  return curry(function () {
    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var emptyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return !condition ? emptyType : value;
  });
}

/**
* @param  {array} propsList    List of key name to be picked.
* @param  {array} objectsList  List of objects.
* @return {array}              New array of objects only containing the picked items.
*/
function pickKeyValuesFromList(propsList, objectsList) {
  return objectsList.map(function (obj) {
    function pickAll(propsList, obj) {
      var result = {};

      for (var idx = 0; idx < propsList.length; idx++) {
        var propItem = propsList[idx];
        result[propItem] = obj[propItem];
      }

      return result;
    };

    return pickAll(propsList, obj);
  });
}

function pipe() {
  var fns = [].slice.call(arguments);

  return curry(function (initalValue) {
    function reducer(prev, curr) {
      return curr(prev);
    }

    return fns.reduce(reducer, initalValue);
  });
}

function everyTrue() {
  return [].concat(Array.prototype.slice.call(arguments)).every(function (e) {
    return Boolean(e);
  });
}

function someTrue() {
  return [].concat(Array.prototype.slice.call(arguments)).some(function (e) {
    return Boolean(e);
  });
}

function unique(array) {
  return [].concat(_toConsumableArray(new Set(array)));
}

var utils = {
  clean: clean,
  cleanAll: cleanAll,
  cleanObj: cleanObj,
  cleanObjAll: cleanObjAll,
  curry: curry,
  filterObjetsInList: filterObjetsInList,
  fmap: fmap,
  either: either,
  everyTrue: everyTrue,
  maybe: maybe,
  maybeIf: maybeIf,
  pickKeyValuesFromList: pickKeyValuesFromList,
  pipe: pipe,
  someTrue: someTrue
};

exports.default = utils;