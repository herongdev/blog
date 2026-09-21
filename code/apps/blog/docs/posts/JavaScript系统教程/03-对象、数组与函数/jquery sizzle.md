---
title: "jquery sizzle"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "文档规定， css 的标识符可以包含转义字符和任意 ISO10646 作为数字编码。 // 例如标识符“ B&W? ”可以写成“ B\\26W\\3F ”。 // 且只能包含 中划线 // 下划线 //ISO10646 标准中的 U+00A0 和它之后的字符 // 不能以数字， //。"
sidebarWeight: 113
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-正则/jquery sizzle.md"
---
::: v-pre

# jquery sizzle

> 本节目标：理解“jquery sizzle”的核心思路，并能把它用于实际开发或面试表达。
```
whitespace="[\\x20\\t\\r\\n\\f]",
```

```
//http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
//w3c
```

文档规定，`css`的标识符可以包含转义字符和任意`ISO10646`作为数字编码。
`//`例如标识符“`B&W?`”可以写成“`B\26W\3F`”。
`//`且只能包含

```
//[a-zA-Z0-9]
//
```

中划线
`//`下划线
`//ISO10646`标准中的`U+00A0`和它之后的字符

`//`不能以数字，
`//`两个中划线
`//`中划线后跟一个数字
`//`作为标识符的开始。

```
identifier="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
```

```
//Attributeselectors:http://www.w3.org/TR/selectors/#attribute-selectors
//[(
```

标识符`)`关系操作符`='(\\.|[^\\'])*'`或者`"(\\.|[^\\"])*"`或者`(`标识符

```
)]
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+
//Operator(capture2)
"*([*^$|!~]?=)"+whitespace+
//"AttributevaluesmustbeCSSidentifiers[capture5]orstrings[capture3orcapture4]"
//
```

匹配一个字面的`'\'`字符而非转义字符，用正则表达式要用`/\\/`，用字符串要用

```
'\\\\'
//
```

单引号`'`和双引号`"`在正则里不用转义

```
,
//
```

在字符串中，如果用单引号包括的双引号，可以不转义
`//`如果用双引号包括的单引号也可以不转义
`//`但如果用双引号包括双引号或用单引号包括单引号，则要转义

```
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+
"*\\]",
```

```
pseudos=":("+identifier+")(?:\\(("+
//ToreducethenumberofselectorsneedingtokenizeinthepreFilter,preferarguments:
//1.quoted(capture3;capture4orcapture5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+
//2.simple(capture6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+
//3.anythingelse(capture2)
".*"+
")\\)|)",
```

:::
