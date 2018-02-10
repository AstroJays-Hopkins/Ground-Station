# Ufunc

Ufunc is a set of JavaScript functional methods.


NOTE: No longer depends on Ramda;

### Installation
```sh
$ npm install ufunc
```

### Usage
Add the module to the script via ES5 or ES6

ES6  
import ufunc from 'ufunc';

ES5  
var ufunc  = require('ufunc');


### Functions

#### clean
Revome all null and undefined items from array.

```sh
clean([0, 1, null, 2, undefined, 3]);
//=> [0, 1, 2, 3]
```


#### cleanAll
Revome all null and undefined items from list.

```sh
utils.cleanAll([0, 1, null, 2, undefined, 3]);
//=> [1, 2, 3]
```


#### cleanObj
Revome all null, undefined and 0 Key/value pairs from object.

```sh
cleanObj({a: 1, b: undefined, c: null, d: 'otis', e: 0});
//=> {a: 1, d: 'otis', e:0}
```


#### cleanObjAll
Revome all null, undefined and 0 Key/value pairs from object.

```sh
cleanObjAll({a: 1, b: undefined, c: null, d: 'otis', e: 0});
//=> {a: 1, d: 'otis'}
```

#### filterObjetsInList
Filters a list of objects by using another list of objects as the criteria.

```sh
var fn = (c, s) => {
  if (c.user === s.name) {
    return s;
  }
};

var criteria = [
  {user: 'Otis'}
];

var search = [
  {name: 'Otis', message: 'hello'},
  {name: 'Ania', message: 'hi'},
  {name: 'Otis', message: 'What time do you finish work'},
  {name: 'Ania', message: 'around 6pm'}
];

filterObjetsInList(fn, criteria, search)();
//=>
// [
//   {name: 'Otis', message: 'hello'},
//   {name: 'Otis', message: 'What time do you finish work'}
// ]
```

#### fmap
Maps a function over a container and returns a new container.

```sh
fmap(x => x + 3, container, 10)();
//=> { value: 13 }


fmap(x => x + 3, container)();
//=> { value: null }
```


#### either
Executes left if any of the condition are true, else right if false.

```sh
either('left', 'right')(true),
//=> 'left'


either(() => 'left', () => 'right')(true);
//=> 'left'


either('left', 'right')(false);
//=> 'right'


either(() => 'left', () => 'right')(false);
//=> 'right'


either([true, false])('left', 'right');
//=> 'left'


either([true, false])(() => 'left', () => 'right');
//=> 'left'


either([false, false])('left', 'right'),
// 'right'


either([false, false])(() => 'left', () => 'right');
//=> 'right'
```


#### maybe
Returns if value is truthy, else null.  
An optional second argument can be passed to be used as the return value if false.

```sh
maybe()('Jack Bower');
//=> 'Jack Bower'


maybe()(null);
//=> null


maybe([])(null);
//=> []
```

#### maybeIf
Returns if value is condition is truthy, else null.  
An optional second argument can be passed to be used as the return value if false.

```sh
maybeIf('Jack Bower')(true);
//=> 'Jack Bower'


utils.maybeIf(null)();
//=> null


maybeIf(null)(false, []),;
//=> []
```


#### pickPairsFromList
Picks keys/values out of an array of objects.

```sh
var fixtures = [
  {user: 'user1', id: 'id1', email: 'user1@test.com', status: 'online', name: 'Bill'},
  {user: 'user2', id: 'id2', email: 'user2@test.com', status: 'online', name: 'Jane'},
  {user: 'user3', id: 'id3', email: 'user3@test.com', status: 'offline', name: 'Marry'},
  {user: 'user4', id: 'id4', email: 'user4@test.com', status: 'offline', name: 'Larry'}
];

pickKeyValuesFromList(['id', 'email', 'status'], fixtures);
//=>
// [
//   {id: 'id1', email: 'user1@test.com', status: 'online'},
//   {id: 'id2', email: 'user2@test.com', status: 'online'},
//   {id: 'id3', email: 'user3@test.com', status: 'offline'},
//   {id: 'id4', email: 'user4@test.com', status: 'offline'}
// ]
```


### License
MIT
