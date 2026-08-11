---
title: "字符串处理Unicode相关方法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "码位或码点转字符 方法可以将一个码位转换为字符，但是它只适用于 BMP 范围内的码位 ( 即从 U+0000 到 U+FFFF) 。如果将它用于转换超过 BMP 外的码位，将不会得到想要的结果。 fromCharCode() 可以接受一个指定的 Unicode 的值，然后返回一个。"
sidebarWeight: 32
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-字符串/字符串的表示方式/字符串处理Unicode相关方法.md"
---
::: v-pre

# 字符串处理Unicode相关方法

> 本节目标：理解“字符串处理Unicode相关方法”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**码位或码点转字符**

```
String.fromCharCode()
String.fromCharCode()
```

方法可以将一个码位转换为字符，但是它只适用于`BMP`范围内的码位`(`即从 `U+0000` 到 `U+FFFF)`。如果将它用于转换超过`BMP`外的码位，将不会得到想要的结果。
`fromCharCode()`可以接受一个指定的`Unicode`的值，然后返回一个字符串。该方法是`String`的静态方法，字符串中的每个字符都由单独的`Unicode`数字编码指定。基本语法如下所示

```
:
String.fromCharCode(n1, n2, ......nx);
```
 比如如下代码：

```
var n = String.fromCharCode(72,69,76,76,79); console.log(n); //
```

打印的值为：

```
"HELLO"
String.fromCharCode()
```

**的缺点是：**
对于在 `U+0000` 到 `U+FFFF` 范围之外的码位是获取不到结果的，我们看下：
`String.fromCharCode(0x1F4A9);`
打印的结果如下：

解决的方法当然也有，但是方法也不是很好，但是幸运的是，`ES6`中引入了

```

String.fromCodePoint(codePoint)

```

该方法的优点是可以用于任何的`Unicode`编码，它是范围更广，是从 `U+0000` 到 `U+10FFFF;` 我们可以继续使用该方法测试下上面的

```
demo;
String.fromCodePoint(0x1F4A9);
```
 在`chrome`浏览器下执行的结果如下所示`:`

**获取字符串的码位或码点**
`String.prototype.charAt(position)`
该方法是用来检索包含字符串中的第一个字符。
比如如下代码：
`'abcdeb'.charAt(1); //` 打印 `b`

`String.prototype.charCodeAt(position)`
该方法的含义是：从字符串中获取码位`,` 检索字符串中第一个字符的码位。
比如如下代码：
`'ABC'.charCodeAt(1); //` 输出结果为`66;`
如上是字符串 `'ABC';` 找到第`2`个字符串的码位。

`codePointAt()`
JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
var s = "𠮷";
s.length // 2s.charAt(0) // ''s.charAt(1) // ''s.charCodeAt(0) // 55362s.charCodeAt(1) // 57271
上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是0x20BB7，UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，而且charAt()方法无法读取整个字符，charCodeAt()方法只能分别返回前两个字节和后两个字节的值。
ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
let s = '𠮷a';
s.codePointAt(0) // 134071s.codePointAt(1) // 57271
s.codePointAt(2) // 97
codePointAt()方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt()方法的结果与charCodeAt()方法相同。
总之，codePointAt()方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt()方法相同。

```
codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。
let s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7"s.codePointAt(2).toString(16) // "61"
```

```
注意
codePointAt()方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是1，但是必须向codePointAt()方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
let s = '𠮷a';for (let ch of s) {  console.log(ch.codePointAt(0).toString(16));}// 20bb7// 61
另一种方法也可以，使用扩展运算符（...）进行展开运算。
let arr = [...'𠮷a']; // arr.length === 2arr.forEach(  ch => console.log(ch.codePointAt(0).toString(16)));// 20bb7// 61
```

```
codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {  return c.codePointAt(0) > 0xFFFF;}
is32Bit("𠮷") // trueis32Bit("a") // false
```

**二：**`JS`**中**`Unicode`**编码与**`String`**相互转换**
`1.` 字符串转`Unicode`
第一种方式：

```
var str='\u6211\u662f\u4e2d\u56fd\u4ebaChina';var ret1 = eval("'" + str + "'");console.log(ret1); //
```

打印出：我是中国人`China`
第二种方式：

```
var str='\u6211\u662f\u4e2d\u56fd\u4ebaChina';var ret2 = (new Function("return '" + str + "'"))();console.log(ret2); //
```

打印出：我是中国人`China`
第三种方式

```
:
var str='\u6211\u662f\u4e2d\u56fd\u4ebaChina';var ret3 = unescape(str.replace(/\u/g, '%u'));console.log(ret3); //
```

打印出：我是中国人

```
China
2. Unicode
```

**转字符串**
`function`

```
string2unicode(str)
```

 `{`
    `var` `html` `=`

```
'';
```
     `for`

```
(let
```

 `i` `=`

```
0;
```

 `i` `\<`

```
str.length;
```

```
i++)
```

 `{`

```
console.log(str.charCodeAt(i))
```
         `html` `+=`

```
"\\u"
```

 `+`

```
str.charCodeAt(i).toString(16);
```
     `}`
    `return`

```
html;
}
var
```

 `str` `=` `"`我是中国人

```
";
var
```

 `s2u` `=`

```
string2unicode(str);
console.log(s2u);
```

 `//` 打印出`:`

```
\u6211\u662f\u4e2d\u56fd\u4eba
console.log(eval("'"
```

 `+` `s2u` `+`

```
"'"));
```

 `//` 输出：我是中国人
如上代码，使用的语法是：

```
number.toString(radix);
radix
```

参数可选；它值可以是`2`、`8`、`16`，表示以多少进制来显示。
更多了解可以看对应的

```
API(https://www.runoob.com/jsref/jsref-tostring-number.html)
```
 如下代码演示

```
:
var num = 15;var a = num.toString();var b = num.toString(2);var c = num.toString(8);var d = num.toString(16);
console.log(a); // 15console.log(b); // 1111console.log(c); // 17console.log(d); // f
```
 如上字符串转`Unicode`的方法 `string2unicode` 有缺陷的，比如中文里面包含英文的话，就不行了，请看如下代码：
`function`

```
string2unicode(str)
```

 `{`
    `var` `html` `=`

```
'';
```
     `for`

```
(let
```

 `i` `=`

```
0;
```

 `i` `\<`

```
str.length;
```

```
i++)
```

 `{`
        `html` `+=`

```
"\\u"
```

 `+`

```
str.charCodeAt(i).toString(16);
```
     `}`
    `return`

```
html;
}
var
```

 `str` `=` `"`我是中国人

```
a";
var
```

 `s2u` `=`

```
string2unicode(str);
console.log(s2u);
```

 `//` 打印结果为`:`

```
\u6211\u662f\u4e2d\u56fd\u4eba\u61
console.log(eval("'"
```

 `+` `s2u` `+`

```
"'"));
```
 如上代码就报错了，因为`JS`自身的`Unicode`转字符串不能识别不足`4`位的`unicode`。因此我们要对 `string2unicode`方法改进一下。
我们可以在`chrome`控制台看下打印信息如下：

`function`

```
string2unicode(str)
```

 `{`
    `var` `html` `=`

```
'';
```
     `var` `rets` `=`

```
'';
```
     `for`

```
(let
```

 `i` `=`

```
0;
```

 `i` `\<`

```
str.length;
```

```
i++)
```

 `{`
        `//` 获取码位
        `var` `c1` `=`

```
str.charCodeAt(i);
```
         `//` 转换成`16`进制
        `var` `c16` `=`

```
c1.toString(16);
```
         `//` `0xf` 代表`16`进制`f`，转换成`10`进制就是`15`
        `if`

```
(c1
```

 `\<`

```
0xf)
```

 `{`
            `html` `+=`

```
"\\u"
```

 `+` `"000"` `+`

```
c16;
```
         `}` `else` `if`

```
(c1
```

 `\<`

```
0xff)
```

 `{`
            `html` `+=`

```
"\\u"
```

 `+` `"00"` `+`

```
c16;
```
         `}` `else` `if`

```
(c1
```

 `\<`

```
0xfff)
```

 `{`
            `html` `+=`

```
"\\u"
```

 `+` `'0'` `+`

```
c16;
```
         `}` `else` `{`
            `html` `+=`

```
"\\u"
```

 `+`

```
c16;
```
         `}`
    `}`
    `rets` `+=`

```
html;
```
     `return`

```
rets;
}
var
```

 `str` `=` `"`我是中国人

```
a";
var
```

 `s2u` `=`

```
string2unicode(str);
console.log(s2u);
```

 `//` 打印结果为`:`

```
\u6211\u662f\u4e2d\u56fd\u4eba\u61
console.log(eval("'"
```

 `+` `s2u` `+`

```
"'"));
```

 `//` 打印`:` 我是中国人`a`

:::
