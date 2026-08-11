---
title: "JSON.parse"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "JSON.parse(\"[{\\\"ssid\\\":\\\"\\\\\\\"Linksys Velop\\\\\\\"\\\"}]\") 在字符串中，碰到 \\ 都会被当作转义符，如果要表示 \\ 字符串本身，要使用 \\\\; 在这段双引号包裹的字符串中，如果使用单引号，是不用转义的； 但为了反 json 时不出错。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-字符串/JSON.parse.md"
---
::: v-pre

# JSON.parse

> 本节目标：理解“JSON.parse”的核心思路，并能把它用于实际开发或面试表达。
`JSON.parse("[{\"ssid\":\"\\\"Linksys Velop\\\"\"}]")`

在字符串中，碰到`\`都会被当作转义符，如果要表示`\`字符串本身，要使用`\\;`
在这段双引号包裹的字符串中，如果使用单引号，是不用转义的；
但为了反`json`时不出错，当要表示双引号本身时，必须使用转义符`\`进行转义；
所以里面的双引号全用`\"`来表示；

`Json.parse`时：

- 参数必须字符串；
- 当碰到字符串中的`\`时，会当它是一个转义字符；
- 所以，`\"\\\",`会被认为是：引号开头；
- 然后又碰到了`\`， 同样当成转义符，那么它后面的 `\` 就会被当成了普通字符串，这样的结果就是：`"\`；
- 再接下来，又出现了一个`\"`，这个`\`被认为是转义符号，后面加`"`，表示转义一个特殊字符，也就是把有特殊含义的引号变成字符串`"`本身，所以结果是：`"\";`
- 整个`\"\\\"Linksys Velop\\\"\"`就是：`"\"Linksys Velop\"";`
- 也就是在js代码中，属性ssid的值为`"\"Linksys Velop\""`的字符串；
- 这个字符串在显示时，同样会把其中的\当成转义符号，所以`\"`就是要表示一个双引号字符串，也就是包含双引号的字符串；

结果为：
`{`

```
 "ssid": "\"Linksys Velop\"",
```

```
 "hiddenSSID": false,
```

```
 "networkId": 0,
```

```
 "priority": 0,
```

```
 "status": 2,
```

```
 "preSharedKey": "*"
},
```

:::
