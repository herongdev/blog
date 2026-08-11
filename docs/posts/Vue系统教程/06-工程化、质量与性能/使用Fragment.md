---
title: "使用Fragment"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "Fragment 可以让你聚合一个子元素列表 , 并且不在 DOM 中增加额外节点； Fragment 还可以用在只允许放置特定子标签的结构中，如 table,ul ； Fragment 看起来像空的 JSX 标签； React from ReactDOM from Table。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/使用Fragment.md"
---
::: v-pre

# 使用Fragment

> 本节目标：理解“使用Fragment”的核心思路，并能把它用于实际开发或面试表达。
- `Fragment`可以让你聚合一个子元素列表`,`并且不在`DOM`中增加额外节点；
- `Fragment`还可以用在只允许放置特定子标签的结构中，如`table,ul`；
- `Fragment` 看起来像空的 `JSX` 标签；
```
index.js
import
```

 `React` `from`

```
'react';
import
```

 `ReactDOM` `from`

```
'react-dom';
import
```

 `Table` `from`

```
'./components/Table';
let
```

 `data` `=` `[`
  `{` `id:`

```
1,
```

 `name:`

```
'zhufeng',
```

 `age:` `10` `},`
  `{` `id:`

```
2,
```

 `name:`

```
'jiagou',
```

 `age:` `10`

```
}
]
ReactDOM.render(
```

```
<Table
```

```
data={data}
```

```
/>,
```

```
document.getElementById('root')
);
```

`src\components\Table.js`

`import` `React` `from`

```
"react";
class
```

 `Columns` `extends`

```
React.Component
```

 `{`

```
render()
```

 `{`
    `let` `data` `=`

```
this.props.data;
```
     `return` `(`
      `\<\>`

```
<td>{data.id}</td>
```

```
<td>{data.name}</td>
```

```
<td>{data.age}</td>
```
       `\</\>`
    `)`

```
}
}
export
```

 `default` `class` `Table` `extends`

```
React.Component
```

 `{`

```
render()
```

 `{`
    `return` `(`

```
<table>
```

```
<thead>
```

```
<tr>
```

```
<td>ID</td>
```

```
<td>Name</td>
```

```
<td>Age</td>
```

```
</tr>
```

```
</thead>
```

```
<tbody>
```
           `{`

```
this.props.data.map((item,
```

```
index)
```

 `=\>` `(`

```
<tr
```

```
key={index}>
```

```
<Columns
```

```
data={item}
```

 `/\>`

```
</tr>))
```
           `}`

```
</tbody>
```

```
</table>
```
     `);`

```
}
}
```

:::
