'use strict';

/**
 * Remove false values from a list, expect 0's
 * @param  {array} list - List of items to be filtered
 * @return {array}      - New lsit with false items removed
 */
export function clean (list) {
  return list.filter(e => e === 0 ? '0' : e);
}


/**
 * Removes all false values from a list
 * @param  {array} list - List of items to be filtered
 * @return {array}      - New list with false items removed
 */
export function cleanAll (list) {
  return list.filter(e => e);
}


/**
 * Removes all false key/values pairs from a list, expect 0's
 * @param  {object} list - List of items to be filtered
 * @return {object}      - New list with false items removed
 */
export function cleanObj (obj) {
  Object.keys(obj).forEach(key =>
    (obj[key] && typeof obj[key] === 'object') && cleanObj(obj[key]) ||
    (obj[key] === undefined || obj[key] === null) && delete obj[key]
  );
  return obj;
}


/**
 * Removes all key/values pairs values from a list
 * @param  {object} list - List of items to be filtered
 * @return {object}      - New list with false items removed
 */
export function cleanObjAll (obj) {
  Object.keys(obj).forEach(key =>
    (obj[key] && typeof obj[key] === 'object') && cleanObj(obj[key]) ||
    (obj[key] === null || obj[key] === undefined || obj[key] === 0) && delete obj[key]
  );
  return obj;
}


export function curry (fn) {
  return function curried () {
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
export function filterObjetsInList (fn, criteria, search) {
  return curry(() => clean(criteria.map(c => search.map(s => fn(c, s)))[0]));
}


/**
* Maps a function over a container and returns a new container
* @param  {function} function to be applied to value
* @param  {[object]}
* @param  {[type]}
* @return {[type]}     value to be mapped
*/
export function fmap (f, container, val) {
  if (val == null) {
    return curry(() => container(null));
  };

  return curry(() => container(f(val)));
}


/**
 * Executes left if any of the condition are true, else right if false.
 * @param  {any}   left        If true.
 * @param  {any}   right       If fasle.
 * @param  {array} conditions  Array of conditions to be evaluated.
 * @return {any}               Execute left if true else right if false.
 */
export function either (left, right) {
  return curry((conditions) => {
    let conditionsBool = Array.isArray(conditions) ? conditions.map(c => Boolean(c)).some(b => b === true) : Boolean(conditions);

    if (conditionsBool) return (typeof left === 'function') ? left() : left;

    return (typeof right === 'function') ? right() : right;
  });
}


/**
* Create a container with an immutabe value or returns null if no value passed.
* @param  {any}  value      Value to be returned if true.
* @param  {any}  emptyType  Value to be returned if false value param is null/undefined. Default is null.
* @return {any}             Returns value or emptyType.
*/
export function maybe (emptyType = null) {
  return curry((value) => value == null ? emptyType : value);
}


/**
* Create a container with an immutabe value or returns null if no value passed.
* @param  {any}    value      Value to be returned if true
* @param  {bool}   condition  Condition to be evaluated. Default is false.
* @param  {any}    emptyType  Value to be returned if false value param is null/undefined. Default is null
* @return {any}               Returns value or emptyType based on condition.
*/
export function maybeIf (value) {
  return curry((condition = false, emptyType = null) => !condition ? emptyType : value);
}


/**
* @param  {array} propsList    List of key name to be picked.
* @param  {array} objectsList  List of objects.
* @return {array}              New array of objects only containing the picked items.
*/
export function pickKeyValuesFromList (propsList, objectsList) {
  return objectsList.map(obj => {
    function pickAll (propsList, obj) {
      let result = {};

      for (let idx = 0; idx < propsList.length; idx++) {
        var propItem = propsList[idx];
        result[propItem] = obj[propItem];
      }

      return result;
    };

    return pickAll(propsList, obj);
  });
}



export function pipe () {
  const fns = [].slice.call(arguments);

  return curry((initalValue) => {
    function reducer (prev, curr) {
      return curr(prev);
    }

    return fns.reduce(reducer, initalValue);
  });
}


export function everyTrue () {
  return [...arguments].every(e => Boolean(e));
}


export function someTrue () {
  return [...arguments].some(e => Boolean(e));
}


export function unique (array) {
  return [...new Set(array)];
}


const utils = {
  clean,
  cleanAll,
  cleanObj,
  cleanObjAll,
  curry,
  filterObjetsInList,
  fmap,
  either,
  everyTrue,
  maybe,
  maybeIf,
  pickKeyValuesFromList,
  pipe,
  someTrue
};

export default utils;
