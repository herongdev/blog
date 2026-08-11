---
title: "Object.assign()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。 三、由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。 Object.a。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.assign().md"
---
::: v-pre

# Object.assign()

> 本节目标：理解“Object.assign()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
Object.assign方法
```

用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```
参数：Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
const target = { a: 1 };
const source1 = { b: 2 };const source2 = { c: 3 };
Object.assign(target, source1, source2);target // {a:1, b:2, c:3}
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };const source2 = { c: 3 };
Object.assign(target, source1, source2);target // {a:1, b:2, c:3}
```

```
**特殊参数**
一、如果只有一个参数，Object.assign会直接返回该参数。
const obj = {a: 1};Object.assign(obj) === obj // true
```

```
二、如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2) // "object"
```

三、由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined) // 报错Object.assign(null) // 报错

```
四、如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};Object.assign(obj, undefined) === obj // trueObject.assign(obj, null) === obj // true
```

```
五、其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
const v1 = 'abc';const v2 = true;const v3 = 10;
const obj = Object.assign({}, v1, v2, v3);console.log(obj); // { "0": "a", "1": "b", "2": "c" }
上面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。
Object(true) // {[[PrimitiveValue]]: true}Object(10)  //  {[[PrimitiveValue]]: 10}Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。
```

```
**注意点**
**（****1****）拷贝属性限制**
```

Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

```
Object.assign({b: 'c'},  Object.defineProperty({}, 'invisible', {    enumerable: false,    value: 'hello'  }))// { b: 'c' }
```

```
属性名为 Symbol 值的属性，也会被Object.assign拷贝。
```

```
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })// { a: 'b', Symbol(c): 'd' }
```

```
**（****2****）浅拷贝**
Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;obj2.a.b // 2
```

```
**（****3****）同名属性的替换**
对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
const target = { a: { b: 'c', d: 'e' } }const source = { a: { b: 'hello' } }Object.assign(target, source)// { a: { b: 'hello' } }
上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。
一些函数库提供Object.assign的定制版本（比如 Lodash 的_.defaultsDeep方法），可以得到深拷贝的合并。
```

**（****4****）数组的处理**
Object.assign可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])// [4, 5, 3]
上面代码中，Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

```
**（****5****）取值函数的处理**
Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
const source = {  get foo() { return 1 }};const target = {};
Object.assign(target, source)// { foo: 1 }
上面代码中，source对象的foo属性是一个取值函数，Object.assign不会复制这个取值函数，只会拿到值以后，将这个值复制过去。
```

```
**常见用途**
**（****1****）为对象添加属性**
class Point {  constructor(x, y) {    Object.assign(this, {x, y});  }}
上面方法通过Object.assign方法，将x属性和y属性添加到Point类的对象实例。
```

```
**（****2****）为对象添加方法**
Object.assign(SomeClass.prototype, {  someMethod(arg1, arg2) {    ···  },  anotherMethod() {    ···  }});
// 等同于下面的写法SomeClass.prototype.someMethod = function (arg1, arg2) {  ···};SomeClass.prototype.anotherMethod = function () {  ···};
上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。
```

```
**（****3****）克隆对象**
function clone(origin) {  return Object.assign({}, origin);}
上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {  let originProto = Object.getPrototypeOf(origin);  return Object.assign(Object.create(originProto), origin);}
```

```
**（****4****）合并多个对象**
将多个对象合并到某个对象。
const merge =  (target, ...sources) => Object.assign(target, ...sources);
如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge =  (...sources) => Object.assign({}, ...sources);
```

```
**（****5****）为属性指定默认值**
const DEFAULTS = {  logLevel: 0,  outputFormat: 'html'};
function processContent(options) {  options = Object.assign({}, DEFAULTS, options);  console.log(options);  // ...}
上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。
注意：由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。
const DEFAULTS = {  url: {    host: 'example.com',    port: 7070  },};
processContent({ url: {port: 8000} })// {//   url: {port: 8000}// }
上面代码的原意是将url.port改成 8000，url.host不变。实际结果却是options.url覆盖掉DEFAULTS.url，所以url.host就不存在了。
```

在 JavaScript 中，Object.assign 用于将一个或多个源对象的可枚举自有属性复制到目标对象。如果目标对象和源对象的某个属性值相同，Object.assign 仍然会执行赋值操作，但不会触发 set 操作（如果目标对象的属性有 setter 方法），因为值相同并不影响 setter 的触发逻辑。
**详细解释：**

1. **Object.assign 的工作原理**：
    - Object.assign(target, ...sources) 会遍历每个源对象的可枚举自有属性，并将这些属性的值复制到目标对象上。
    - 如果目标对象上已经存在某个属性，Object.assign 会直接覆盖该属性的值（通过普通的赋值操作，等价于 target[key] = source[key]）。
2. **属性值相同的情况**：
    - 如果源对象和目标对象的某个属性值相同（严格相等，===），赋值操作仍然会发生，但不会影响目标对象的值，因为新值和旧值相同。
    - 例如： javascriptCollapseWrapRunCopyconst target = \{ a: 1 \};const source = \{ a: 1 \};Object.assign(target, source);console.log(target); _// \{ a: 1 \}___在这个例子中，尽管 a 的值都是 1，Object.assign 仍然会执行 target.a = source.a 的赋值操作。
3. **关于 setter 的触发**：
    - 如果目标对象的属性是通过 Object.defineProperty 定义的，并且有 set 方法，那么每次 Object.assign 尝试赋值时（即使新旧值相同），都会触发 setter。
    - 例如： javascriptCollapseWrapRunCopyconst target = \{\};Object.defineProperty(target, 'a', \{ set(value) \{ console.log(`Setter called with value: ${value}`); \}, get() \{ return 1; \}\});const source = \{ a: 1 \};Object.assign(target, source); _// 触发 setter，打印 "Setter called with value: 1"___在这个例子中，即使 source.a 和 target.a 的值相同，setter 仍然会被调用，因为赋值操作会触发 setter。
4. **优化与性能**：
    - 即使值相同，Object.assign 不会特意跳过赋值操作，因为它没有内置的优化来检查值的相等性。
    - 如果你希望避免不必要的赋值（例如为了性能优化或避免触发 setter），需要手动检查值是否相同，或者使用其他方法（如自定义合并逻辑）。

**总结：**

- Object.assign 在合并属性时，即使值相同，仍然会执行赋值操作。
- 如果目标对象的属性有 setter，赋值操作会触发 setter，即使新旧值相同。
- 如果你想避免不必要的赋值或 setter 触发，可以在合并前手动比较值，或者使用其他方法（如 Object.keys 遍历并检查）。

如果你有更具体的场景或代码示例，可以提供给我，我可以进一步分析！

:::
