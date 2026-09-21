---
title: "25个你不得不知道的数组reduce高级用法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "背景 距离上一篇技术文章《 1.5 万字概括 ES6 全部特性》发布到现在，已经有整整 4 个月没有输出过一篇技术文章了。哈哈，不是不想写，而是实在太忙，这段时间每天不是上班就是加班，完全没有自己的时间。这篇文章也是抽空之余完成，希望大家喜欢，谢谢大家继续支持我。 本文首发于『搜。"
sidebarWeight: 84
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-数组/归并方法/25个你不得不知道的数组reduce高级用法.md"
---
::: v-pre

# 25个你不得不知道的数组reduce高级用法

> 本节目标：理解“25个你不得不知道的数组reduce高级用法”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**背景**
距离上一篇技术文章《`1.5`万字概括`ES6`全部特性》发布到现在，已经有整整`4`个月没有输出过一篇技术文章了。哈哈，不是不想写，而是实在太忙，这段时间每天不是上班就是加班，完全没有自己的时间。这篇文章也是抽空之余完成，希望大家喜欢，谢谢大家继续支持我。
本文首发于『搜狐技术产品』公众号，首发内容与博客内容略有不同，博客内容今早发布时额外有所增加
`reduce`作为`ES5`新增的常规数组方法之一，对比`forEach`、`filter`和`map`，在实际使用上好像有些被忽略，发现身边的人极少使用它，导致这个如此强大的方法被逐渐埋没。
如果经常使用`reduce`，怎么可能放过如此好用的它呢！我还是得把他从尘土中取出来擦干净，奉上它的高级用法给大家。一个如此好用的方法不应该被大众埋没。
下面对`reduce`的语法进行简单说明，详情可查看`MDN`的

```
reduce()
```

的相关说明。

- 定义：对数组中的每个元素执行一个自定义的累计器，将其结果汇总为单个返回值
- 形式：`array.reduce((t, v, i, a) =\> {}, initValue)`
- 参数
    - `callback`：回调函数`(`必选`)`
    - `initValue`：初始值`(`可选`)`
- 回调函数的参数
    - ```
        total(t)
        ```

        ：累计器完成计算的返回值`(`必选`)`
    - ```
        value(v)
        ```

        ：当前元素`(`必选`)`
    - ```
        index(i)
        ```

        ：当前元素的索引`(`可选`)`
    - ```
        array(a)
        ```

        ：当前元素所属的数组对象`(`可选`)`
- 过程
    - 以`t`作为累计结果的初始值，不设置`t`则以数组第一个元素为初始值
    - 开始遍历，使用累计器处理`v`，将`v`的映射结果累计到`t`上，结束此次循环，返回`t`
    - 进入下一次循环，重复上述操作，直至数组最后一个元素
    - 结束遍历，返回最终的`t`

`reduce`的精华所在是将累计器逐个作用于数组成员上，**把上一次输出的值作为下一次输入的值**。下面举个简单的栗子，看看`reduce`的计算结果。

```
const arr = [3, 5, 1, 4, 2];const a = arr.reduce((t, v) => t + v);//
```

等同于

```
const b = arr.reduce((t, v) => t + v, 0);
```

复制代码
代码不太明白没关系，贴一个`reduce`的作用动图应该就会明白了。

`reduce`实质上是一个累计器函数，通过用户自定义的累计器对数组成员进行自定义累计，得出一个由累计器生成的值。另外`reduce`还有一个胞弟`reduceRight`，两个方法的功能其实是一样的，只不过`reduce`是升序执行，`reduceRight`是降序执行。
对空数组调用`reduce()`和`reduceRight()`是不会执行其回调函数的，可认为`reduce()`对空数组无效
**高级用法**
单凭以上一个简单栗子不足以说明`reduce`是个什么。为了展示`reduce`的魅力，我为大家提供`25`种场景来应用`reduce`的高级用法。有部分高级用法可能需要结合其他方法来实现，这样为`reduce`的多元化提供了更多的可能性。
部分示例代码的写法可能有些骚，看得不习惯可自行整理成自己的习惯写法
**累加累乘**

```
function Accumulation(...vals) {    return vals.reduce((t, v) => t + v, 0);}
function Multiplication(...vals) {    return vals.reduce((t, v) => t * v, 1);}
```

复制代码

```
Accumulation(1, 2, 3, 4, 5); // 15Multiplication(1, 2, 3, 4, 5); // 120
```

复制代码
**权重求和**

```
const scores = [    { score: 90, subject: "chinese", weight: 0.5 },    { score: 95, subject: "math", weight: 0.3 },    { score: 85, subject: "english", weight: 0.2 }];const result = scores.reduce((t, v) => t + v.score * v.weight, 0); // 90.5
```

复制代码
**代替**

```
reverse
function Reverse(arr = []) {    return arr.reduceRight((t, v) => (t.push(v), t), []);}
```

复制代码

```
Reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]
```

复制代码
**代替**`map`**和**

```
filter
const arr = [0, 1, 2, 3];
//
```

代替`map`：

```
[0, 2, 4, 6]const a = arr.map(v => v * 2);const b = arr.reduce((t, v) => [...t, v * 2], []);
//
```

代替`filter`：

```
[2, 3]const c = arr.filter(v => v > 1);const d = arr.reduce((t, v) => v > 1 ? [...t, v] : t, []);
//
```

代替`map`和`filter`：

```
[4, 6]const e = arr.map(v => v * 2).filter(v => v > 2);const f = arr.reduce((t, v) => v * 2 > 2 ? [...t, v * 2] : t, []);
```

复制代码
**代替**`some`**和**

```
every
const scores = [    { score: 45, subject: "chinese" },    { score: 90, subject: "math" },    { score: 60, subject: "english" }];
//
```

代替`some`：至少一门合格

```
const isAtLeastOneQualified = scores.reduce((t, v) => t || v.score >= 60, false); // true
//
```

代替`every`：全部合格

```
const isAllQualified = scores.reduce((t, v) => t && v.score >= 60, true); // false
```

复制代码
**数组分割**

```
function Chunk(arr = [], size = 1) {    return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];}
```

复制代码

```
const arr = [1, 2, 3, 4, 5];Chunk(arr, 2); // [[1, 2], [3, 4], [5]]
```

复制代码
**数组过滤**

```
function Difference(arr = [], oarr = []) {    return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);}
```

复制代码

```
const arr1 = [1, 2, 3, 4, 5];const arr2 = [2, 3, 6]Difference(arr1, arr2); // [1, 4, 5]
```

复制代码
**数组填充**

```
function Fill(arr = [], val = "", start = 0, end = arr.length) {    if (start < 0 || start >= end || end > arr.length) return arr;    return [        ...arr.slice(0, start),        ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),        ...arr.slice(end, arr.length)    ];}
```

复制代码

```
const arr = [0, 1, 2, 3, 4, 5, 6];Fill(arr, "aaa", 2, 5); // [0, 1, "aaa", "aaa", "aaa", 5, 6]
```

复制代码
**数组扁平**

```
function Flat(arr = []) {    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])}
```

复制代码

```
const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

复制代码
**数组去重**

```
function Uniq(arr = []) {    return arr.reduce((t, v) => t.includes(v) ? t : [...t, v], []);}
```

复制代码

```
const arr = [2, 1, 0, 3, 2, 1, 2];Uniq(arr); // [2, 1, 0, 3]
```

复制代码
**数组最大最小值**

```
function Max(arr = []) {    return arr.reduce((t, v) => t > v ? t : v);}
function Min(arr = []) {    return arr.reduce((t, v) => t < v ? t : v);}
```

复制代码

```
const arr = [12, 45, 21, 65, 38, 76, 108, 43];Max(arr); // 108Min(arr); // 12
```

复制代码
**数组成员独立拆解**

```
function Unzip(arr = []) {    return arr.reduce(        (t, v) => (v.forEach((w, i) => t[i].push(w)), t),        Array.from({ length: Math.max(...arr.map(v => v.length)) }).map(v => [])    );}
```

复制代码

```
const arr = [["a", 1, true], ["b", 2, false]];Unzip(arr); // [["a", "b"], [1, 2], [true, false]]
```

复制代码
**数组成员个数统计**

```
function Count(arr = []) {    return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});}
```

复制代码

```
const arr = [0, 1, 1, 2, 2, 2];Count(arr); // { 0: 1, 1: 2, 2: 3 }
```

复制代码
此方法是字符统计和单词统计的原理，入参时把字符串处理成数组即可
**数组成员位置记录**

```
function Position(arr = [], val) {    return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);}
```

复制代码

```
const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];Position(arr, 2); // [0, 4]
```

复制代码
**数组成员特性分组**

```
function Group(arr = [], key) {    return key ? arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}) : {};}
```

复制代码

```
const arr = [    { area: "GZ", name: "YZW", age: 27 },    { area: "GZ", name: "TYJ", age: 25 },    { area: "SZ", name: "AAA", age: 23 },    { area: "FS", name: "BBB", age: 21 },    { area: "SZ", name: "CCC", age: 19 }]; //
```

以地区`area`作为分组依据

```
Group(arr, "area"); // { GZ: Array(2), SZ: Array(2), FS: Array(1) }
```

复制代码
**数组成员所含关键字统计**

```
function Keyword(arr = [], keys = []) {    return keys.reduce((t, v) => (arr.some(w => w.includes(v)) && t.push(v), t), []);}
```

复制代码

```
const text = [    "
```

今天天气真好，我想出去钓鱼

```
",    "
```

我一边看电视，一边写作业

```
",    "
```

小明喜欢同桌的小红，又喜欢后桌的小君，真`TM`花心

```
",    "
```

最近上班喜欢摸鱼的人实在太多了，代码不好好写，在想入非非

```
"];const keyword = ["
```

偷懒`", "`喜欢`", "`睡觉`", "`摸鱼`", "`真好`", "`一边`", "`明天

```
"];Keyword(text, keyword); // ["
```

喜欢`", "`摸鱼`", "`真好`", "`一边

```
"]
```

复制代码
**字符串翻转**

```
function ReverseStr(str = "") {    return str.split("").reduceRight((t, v) => t + v);}
```

复制代码
`const str = "reduce`最牛逼

```
";ReverseStr(str); // "
```

逼牛最

```
ecuder"
```

复制代码
**数字千分化**

```
function ThousandNum(num = 0) {    const str = (+num).toString().split(".");    const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");    const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");    return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);}
```

复制代码

```
ThousandNum(1234); // "1,234"ThousandNum(1234.00); // "1,234"ThousandNum(0.1234); // "0.123,4"ThousandNum(1234.5678); // "1,234.567,8"
```

复制代码
**异步累计**

```
async function AsyncTotal(arr = []) {    return arr.reduce(async(t, v) => {        const at = await t;        const todo = await Todo(v);        at[v] = todo;        return at;    }, Promise.resolve({}));}
```

复制代码
`const result = await AsyncTotal(); //` 需要在`async`包围下使用``复制代码
**斐波那契数列**

```
function Fibonacci(len = 2) {    const arr = [...new Array(len).keys()];    return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [0, 1]);}
```

复制代码

```
Fibonacci(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

复制代码
`URL`**参数反序列化**

```
function ParseUrlSearch() {    return location.search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {        const [key, val] = v.split("=");        t[key] = decodeURIComponent(val);        return t;    }, {});}
```

复制代码
`//` 假设`URL`为：

```
https://www.baidu.com?age=25&name=TYJParseUrlSearch(); // { age: "25", name: "TYJ" }
```

复制代码
`URL`**参数序列化**

```
function StringifyUrlSearch(search = {}) {    return Object.entries(search).reduce(        (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,        Object.keys(search).length ? "?" : ""    ).replace(/&$/, "");}
```

复制代码

```
StringifyUrlSearch({ age: 27, name: "YZW" }); // "?age=27&name=YZW"
```

复制代码
**返回对象指定键值**

```
function GetKeys(obj = {}, keys = []) {    return Object.keys(obj).reduce((t, v) => (keys.includes(v) && (t[v] = obj[v]), t), {});}
```

复制代码

```
const target = { a: 1, b: 2, c: 3, d: 4 };const keyword = ["a", "d"];GetKeys(target, keyword); // { a: 1, d: 4 }
```

复制代码
**数组转对象**

```
const people = [    { area: "GZ", name: "YZW", age: 27 },    { area: "SZ", name: "TYJ", age: 25 }];const map = people.reduce((t, v) => {    const { name, ...rest } = v;    t[name] = rest;    return t;}, {}); // { YZW: {
```

…`}, TYJ: {`…

```
} }
```

复制代码
`Redux Compose`**函数原理**

```
function Compose(...funs) {    if (funs.length === 0) {        return arg => arg;    }    if (funs.length === 1) {        return funs[0];    }    return funs.reduce((t, v) => (...arg) => t(v(...arg)));}
```

复制代码
**兼容和性能**
好用是挺好用的，但是兼容性如何呢？在

```
Caniuse
```

上搜索一番，兼容性绝对的好，可大胆在任何项目上使用。不要吝啬你的想象力，尽情发挥`reduce`的`compose`技能啦。对于时常做一些累计的功能，`reduce`绝对是首选方法。

另外，有些同学可能会问，`reduce`的性能又如何呢？下面我们通过对`for`、`forEach`、`map`和`reduce`四个方法同时做`1~100000`的累加操作，看看四个方法各自的执行时间。
`//` 创建一个长度为`100000`的数组

```
const list = [...new Array(100000).keys()];
// forconsole.time("for");let result1 = 0;for (let i = 0; i < list.length; i++) {    result1 += i + 1;}console.log(result1);console.timeEnd("for");
// forEachconsole.time("forEach");let result2 = 0;list.forEach(v => (result2 += v + 1));console.log(result2);console.timeEnd("forEach");
// mapconsole.time("map");let result3 = 0;list.map(v => (result3 += v + 1, v));console.log(result3);console.timeEnd("map");
// reduceconsole.time("reduce");const result4 = list.reduce((t, v) => t + v + 1, 0);console.log(result4);console.timeEnd("reduce");
```

复制代码

|   |   |
|---|---|
|**累加操作**|**执行时间**|
|`for`|`6.719970703125ms`|
|`forEach`|`3.696044921875ms`|
|`map`|`3.554931640625ms`|
|`reduce`|`2.806884765625ms`|

以上代码在`MacBook Pro 2019 15`寸 `16G`内存 `512G`闪存的`Chrome 79`下执行，不同的机器不同的环境下执行以上代码都有可能存在差异。
我已同时测试过多台机器和多个浏览器，连续做了`10`次以上操作，发现`reduce`总体的平均执行时间还是会比其他三个方法稍微快一点，所以大家还是放心使用啦！本文更多是探讨`reduce`的使用技巧，如对`reduce`的兼容和性能存在疑问，可自行参考相关资料进行验证。
最后，送大家一张`reduce`生成的乘法口诀表：一七得七，二七四十八，三八妇女节，五一劳动节，六一儿童节。

代码详情请戳[这里](https://codepen.io/JowayYoung/pen/ExjPboX?editors=0010)。让我们一起来发挥想象力，训练大脑思维啦，更多`JS`骚操作可查看我这篇文章[《灵活运用](https://juejin.im/post/6844903838449664013)`JS`开发技巧》。
 \> 来自

```
 <https://juejin.cn/post/6844904063729926152>
```

:::
