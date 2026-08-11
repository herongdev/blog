---
title: "SyntaxError JSON.parse bad parsing"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "信息 SyntaxError: JSON.parse: unterminated string literalSyntaxError: JSON.parse: bad control character in string literalSyntaxError: JSON.par。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/需求实现/SyntaxError JSON.parse bad parsing.md"
---
::: v-pre

# SyntaxError JSON.parse bad parsing

> 本节目标：理解“SyntaxError JSON.parse bad parsing”的核心思路，并能把它用于实际开发或面试表达。
**信息**
SyntaxError: JSON.parse: unterminated string literalSyntaxError: JSON.parse: bad control character in string literalSyntaxError: JSON.parse: bad character in string literalSyntaxError: JSON.parse: bad Unicode escapeSyntaxError: JSON.parse: bad escape characterSyntaxError: JSON.parse: unterminated stringSyntaxError: JSON.parse: no number after minus signSyntaxError: JSON.parse: unexpected non-digitSyntaxError: JSON.parse: missing digits after decimal pointSyntaxError: JSON.parse: unterminated fractional numberSyntaxError: JSON.parse: missing digits after exponent indicatorSyntaxError: JSON.parse: missing digits after exponent signSyntaxError: JSON.parse: exponent part is missing a numberSyntaxError: JSON.parse: unexpected end of dataSyntaxError: JSON.parse: unexpected keywordSyntaxError: JSON.parse: unexpected characterSyntaxError: JSON.parse: end of data while reading object contentsSyntaxError: JSON.parse: expected property name or '\}'SyntaxError: JSON.parse: end of data when ',' or ']' was expectedSyntaxError: JSON.parse: expected ',' or ']' after array elementSyntaxError: JSON.parse: end of data when property name was expectedSyntaxError: JSON.parse: expected double-quoted property nameSyntaxError: JSON.parse: end of data after property name when ':' was expectedSyntaxError: JSON.parse: expected ':' after property name in objectSyntaxError: JSON.parse: end of data after property value in objectSyntaxError: JSON.parse: expected ',' or '\}' after property value in objectSyntaxError: JSON.parse: expected ',' or '\}' after property-value pair in object literalSyntaxError: JSON.parse: property names must be double-quoted stringsSyntaxError: JSON.parse: expected property name or '\}'SyntaxError: JSON.parse: unexpected characterSyntaxError: JSON.parse: unexpected non-whitespace character after JSON data
**错误类型**
[SyntaxError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
**哪里出错了?**
[JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 会把一个字符串解析成 JSON 对象。如果字符串书写正确，那么其将会被解析成一个有效的 JSON，但是这个字符串被检测出错误语法的时候将会抛出错误。
**示例**
**JSON.parse() 不允许在末尾添加多余的逗号**
下面两行代码都会抛出错误:
JSON.parse('[1, 2, 3, 4, ]');JSON.parse('\{"foo" : 1, \}');// SyntaxError JSON.parse: unexpected character// at line 1 column 14 of the JSON data
省略末尾多余的逗号解析 JSON 就是正确:
JSON.parse('[1, 2, 3, 4 ]');JSON.parse('\{"foo" : 1 \}');
**JSON 的属性名必须使用双引号**
属性名上不能使用单引号，例如： 'foo'。
JSON.parse("\{'foo' : 1 \}");// SyntaxError: JSON.parse: expected property name or '\}'// at line 1 column 2 of the JSON data
取而代之，写成 "foo"：
JSON.parse('\{"foo" : 1 \}');
**前导 0 和小数点**
数字不能用 0 开头，比如01，并且你的小数点后面必须跟着至少一个数字。
JSON.parse('\{"foo" : 01 \}');// SyntaxError: JSON.parse: expected ',' or '\}' after property value// in object at line 1 column 2 of the JSON data
JSON.parse('\{"foo" : 1. \}');// SyntaxError: JSON.parse: unterminated fractional number// at line 1 column 2 of the JSON data
正确的写法应该是只写一个1，不书写前面的0。在小数点的后面至少要跟上一个数字:
JSON.parse('\{"foo" : 1 \}');JSON.parse('\{"foo" : 1.0 \}');
 \> 来自 \<[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse)\>

:::
