---
title: "reduce()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "reduce 为数组中的每一个元素依次执行 callback 函数，不包括数组中被删除或从未被赋值的元素， callback 函数接受四个参数： accumulator [ ə 'kju ː mj ʊ le ɪ t ə ] 美 [ ə 'kjumj ə let ɚ ] 累计器 c。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-数组/归并方法/reduce().md"
---
::: v-pre

# reduce()

> 本节目标：理解“reduce()”的核心思路，并能把它用于实际开发或面试表达。
`reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素，`callback`函数接受四个参数：

- `accumulator`  `[`ə`'kju`ː`mj`ʊ`le`ɪ`t`ə`]`美 `[`ə`'kjumj`ə`let`ɚ`]` 累计器
- `currentValue` 当前值
- `currentIndex` 当前索引
- `array` ==数组==

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：

- 如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；
- 如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

注意：如果没有提供`initialValue`，`reduce` 会从索引`1`的地方开始执行 `callback` 方法，跳过第一个索引。如果提供`initialValue`，从索引`0`开始。

如果数组为空且没有提供`initialValue`，会抛出

```
TypeError
```

 。
如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`； 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。

提供初始值通常更安全，正如下面的例子，如果没有提供`initialValue`，则可能有三种输出：

```
var maxCallback = ( pre, cur ) => Math.max( pre.x, cur.x );var maxCallback2 = ( max, cur ) => Math.max( max, cur );
// reduce() without initialValue
```

没有初始值

```
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }[                      ].reduce( maxCallback ); // TypeError
// map/reduce; better solution, also works for empty arrays[ { x: 22 }, { x: 42 } ].map( el => el.x )                        .reduce( maxCallback2, -Infinity );
reduce
```

**如何运行**
假如运行下段代码：

```
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){  return accumulator + currentValue;});
callback
```

==被调用四次，每次调用的参数和返回值如下表：==

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**次**|`acc`|`cur`|`Index`|`array`|`val`|
|`1`|`0`|`1`|`1`|`[0, 1, 2, 3, 4]`|`1`|
|`2`|`1`|`2`|`2`|`[0, 1, 2, 3, 4]`|`3`|
|`3`|`3`|`3`|`3`|`[0, 1, 2, 3, 4]`|`6`|
|`4`|`6`|`4`|`4`|`[0, 1, 2, 3, 4]`|`10`|

由`reduce`返回的值将是上次回调调用的值（`10`）。
你同样可以使用箭头函数的形式，下面的代码会输出跟前面一样的结果
您还可以提供

```
Arrow Function
```

 代替完整功能。 下面的代码将产生与上面的代码中相同的输出：
`[0, 1, 2, 3, 4].reduce((prev, curr) =\> prev + curr );`
如果你打算提供一个初始值作为`reduce`方法的第二个参数，以下是运行过程及结果：
`[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) =\> { return` `accumulator` `+ currentValue; }, 10 );`

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|`callback`|`accumulator`|`currentValue`|`currentIndex`|`array`|`return value`|
|`first call`|`10`|`0`|`0`|`[0, 1, 2, 3, 4]`|`10`|
|`second call`|`10`|`1`|`1`|`[0, 1, 2, 3, 4]`|`11`|
|`third call`|`11`|`2`|`2`|`[0, 1, 2, 3, 4]`|`13`|
|`fourth call`|`13`|`3`|`3`|`[0, 1, 2, 3, 4]`|`16`|
|`fifth call`|`16`|`4`|`4`|`[0, 1, 2, 3, 4]`|`20`|

这种情况下`reduce`返回的值是`20`。   **例子**
**数组里所有值的和**

```
var sum = [0, 1, 2, 3].reduce(function (a, b) {  return a + b;}, 0);// sum is 6
```
 你也可以写成箭头函数的形式：

```
var total = [ 0, 1, 2, 3 ].reduce(  ( acc, cur ) => acc + cur,
```

`0);`

**累加对象数组里的值**
要累加对象数组中包含的值，必须提供初始值，以便各个`item`正确通过你的函数。

```
var initialValue = 0;var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {    return accumulator + currentValue.x;},initialValue)
console.log(sum) // logs 6
```
 你也可以写成箭头函数的形式：

```
var initialValue = 0;var sum = [{x: 1}, {x:2}, {x:3}].reduce(    (accumulator, currentValue) => accumulator + currentValue.x    ,initialValue);
console.log(sum) // logs 6
```

**将二维数组转化为一维**

```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(  function(a, b) {    return a.concat(b);  }, []);// flattened is [0, 1, 2, 3, 4, 5]
```
 你也可以写成箭头函数的形式：

```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce( ( acc, cur ) => acc.concat(cur), []);
```

**计算数组中每个元素出现的次数**

```
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countedNames = names.reduce(function (allNames, name) {   if (name in allNames) {    allNames[name]++;  }  else {    allNames[name] = 1;  }  return allNames;}, {});// countedNames is:// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

**按属性对**`object`**分类**

```
var people = [  { name: 'Alice', age: 21 },  { name: 'Max', age: 20 },  { name: 'Jane', age: 20 }];
function groupBy(objectArray, property) {  return objectArray.reduce(function (acc, obj) {    var key = obj[property];    if (!acc[key]) {      acc[key] = [];    }    acc[key].push(obj);    return acc;  }, {});}
var groupedPeople = groupBy(people, 'age');// groupedPeople is:// { //   20: [//     { name: 'Max', age: 20 }, //     { name: 'Jane', age: 20 }//   ], //   21: [{ name: 'Alice', age: 21 }] // }
```

**使用扩展运算符和**`initialValue`**绑定包含在对象数组中的数组**
`// friends -` 对象数组

```
// where object field "books" - list of favorite books var friends = [{  name: 'Anna',  books: ['Bible', 'Harry Potter'],  age: 21}, {  name: 'Bob',  books: ['War and peace', 'Romeo and Juliet'],  age: 26}, {  name: 'Alice',  books: ['The Lord of the Rings', 'The Shining'],  age: 18}];
// allbooks - list which will contain all friends' books +  // additional list contained in initialValuevar allbooks = friends.reduce(function(prev, curr) {  return [...prev, ...curr.books];}, ['Alphabet']);
// allbooks = [//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace', //   'Romeo and Juliet', 'The Lord of the Rings',//   'The Shining'// ]
```
 **数组去重**

```
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];let result = arr.sort().reduce((init, current)=>{    if(init.length===0 || init[init.length-1]!==current){        init.push(current);    }    return init;}, []);console.log(result); //[1,2,3,4,5]
```

```
/** * Runs promises from array of functions that can return promises * in chained manner * * @param {array} arr - promise arr * @return {Object} promise object */function runPromiseInSequence(arr, input) {  return arr.reduce(    (promiseChain, currentFunction) => promiseChain.then(currentFunction),    Promise.resolve(input)  );}
// promise function 1function p1(a) {  return new Promise((resolve, reject) => {    resolve(a * 5);  });}
// promise function 2function p2(a) {  return new Promise((resolve, reject) => {    resolve(a * 2);  });}
// function 3  - will be wrapped in a resolved promise by .then()function f3(a) { return a * 3;}
// promise function 4function p4(a) {  return new Promise((resolve, reject) => {    resolve(a * 4);  });}
const promiseArr = [p1, p2, f3, p4];runPromiseInSequence(promiseArr, 10)  .then(console.log);   // 1200
```
 ==功能型函数管道==

```
Section
// Building-blocks to use for compositionconst double = x => x + x;const triple = x => 3 * x;const quadruple = x => 4 * x;
// Function composition enabling pipe functionalityconst pipe = (...functions) => input => functions.reduce(    (acc, fn) => fn(acc),    input);
// Composed functions for multiplication of specific valuesconst multiply6 = pipe(double, triple);const multiply9 = pipe(triple, triple);const multiply16 = pipe(quadruple, quadruple);const multiply24 = pipe(double, triple, quadruple);
// Usagemultiply6(6); // 36multiply9(9); // 81multiply16(16); // 256multiply24(10); // 240
PolyfillSection
// Production steps of ECMA-262, Edition 5, 15.4.4.21// Reference: http://es5.github.io/#x15.4.4.21// https://tc39.github.io/ecma262/#sec-array.prototype.reduceif (!Array.prototype.reduce) {  Object.defineProperty(Array.prototype, 'reduce', {    value: function(callback /*, initialValue*/) {      if (this === null) {        throw new TypeError( 'Array.prototype.reduce ' +           'called on null or undefined' );      }      if (typeof callback !== 'function') {        throw new TypeError( callback +          ' is not a function');      }
// 1. Let O be ? ToObject(this value).      var o = Object(this);
// 2. Let len be ? ToLength(? Get(O, "length")).      var len = o.length >>> 0;
// Steps 3, 4, 5, 6, 7            var k = 0;       var value;
if (arguments.length >= 2) {        value = arguments[1];      } else {        while (k < len && !(k in o)) {          k++;         }
// 3. If len is 0 and initialValue is not present,        //    throw a TypeError exception.        if (k >= len) {          throw new TypeError( 'Reduce of empty array ' +            'with no initial value' );        }        value = o[k++];      }
// 8. Repeat, while k < len      while (k < len) {        // a. Let Pk be ! ToString(k).        // b. Let kPresent be ? HasProperty(O, Pk).        // c. If kPresent is true, then        //    i.  Let kValue be ? Get(O, Pk).        //    ii. Let accumulator be ? Call(        //          callbackfn, undefined,        //
```

« `accumulator, kValue, k, O` »

```
).        if (k in o) {          value = callback(value, o[k], k, o);        }
// d. Increase k by 1.              k++;      }
// 9. Return accumulator.      return value;    }  });}
```
 ==如果您需要兼容不支持==

```
Object.defineProperty
```

==的==`JavaScript`==引擎，那么最好不要== `polyfill` `Array.prototype`==方法，因为你无法使其成为不可枚举的。==

:::
