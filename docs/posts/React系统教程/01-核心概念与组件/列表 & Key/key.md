---
title: "key"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。 要是你有兴趣了解更多的话，这里有一篇文章深入解析为什么 key 是必须的可以参考。 key 只是在兄弟节点之间必须唯一 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。"
sidebarWeight: 63
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/列表 & Key/key.md"
---
::: v-pre

# key

> 本节目标：理解“key”的核心思路，并能把它用于实际开发或面试表达。
```
让我们来给每个列表元素分配一个 key 属性来解决上面的那个警告：
key 帮助 React 识别哪些元素改变了，比如被添加或删除。
因此你应当给数组中的每一个元素赋予一个确定的标识。
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

```
一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。
通常，我们使用数据中的 id 来作为元素的 key：
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

```
当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) key 的负面影响这一篇文章。
```

如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。
要是你有兴趣了解更多的话，这里有一篇文章[深入解析为什么](https://react.docschina.org/docs/reconciliation.html#recursing-on-children) key 是必须的可以参考。

```
**用** **key** **提取组件**
元素的 key 只有放在就近的数组上下文中才有意义。
比方说，如果你[提取](https://react.docschina.org/docs/components-and-props.html#extracting-components)出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。
**例子：不正确的使用** **key** **的方式**
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
**一个好的经验法则是：在** **map()** **方法中的元素需要设置** **key** **属性。**
```

**key** **只是在兄弟节点之间必须唯一**
数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

```
key 会传递信息给 React ，但不会传递给你的组件。
如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title}
  />
);
上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key。
```

```
**在** **JSX** **中嵌入** **map()**
在上面的例子中，我们声明了一个单独的 listItems 变量并将其包含在 JSX 中：
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem
      key={number.toString()}
      value={number}
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
JSX 允许在大括号中[嵌入任何表达式](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 map() 返回的结果：
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem
          key={number.toString()}
          value={number}
        />)}
    </ul>
  );
}
这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。
但请记住，如果一个 map() 嵌套了太多层级，那可能就是你[提取组件](https://react.docschina.org/docs/components-and-props.html#extracting-components)的一个好时机。
```
 \> 来自

```
 <https://react.docschina.org/docs/lists-and-keys.html>
```

:::
