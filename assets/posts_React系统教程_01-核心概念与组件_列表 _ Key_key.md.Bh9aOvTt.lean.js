import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const k=JSON.parse('{"title":"key","description":"如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。 要是你有兴趣了解更多的话，这里有一篇文章深入解析为什么 key 是必须的可以参考。 key 只是在兄弟节点之间必须唯一 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。","frontmatter":{"title":"key","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。 要是你有兴趣了解更多的话，这里有一篇文章深入解析为什么 key 是必须的可以参考。 key 只是在兄弟节点之间必须唯一 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。","sidebarWeight":63,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/列表 & Key/key.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/列表 & Key/key.md","filePath":"posts/React系统教程/01-核心概念与组件/列表 & Key/key.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/列表 & Key/key.md"};function t(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"key",tabindex:"-1"},[s("key "),n("a",{class:"header-anchor",href:"#key","aria-label":'Permalink to "key"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“key”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"让我们来给每个列表元素分配一个 key 属性来解决上面的那个警告：")]),s(`
`),n("span",{class:"line"},[n("span",null,"key 帮助 React 识别哪些元素改变了，比如被添加或删除。")]),s(`
`),n("span",{class:"line"},[n("span",null,"因此你应当给数组中的每一个元素赋予一个确定的标识。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const numbers = [1, 2, 3, 4, 5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"const listItems = numbers.map((number) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <li key={number.toString()}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {number}")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。")]),s(`
`),n("span",{class:"line"},[n("span",null,"通常，我们使用数据中的 id 来作为元素的 key：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const todoItems = todos.map((todo) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <li key={todo.id}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {todo.text}")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const todoItems = todos.map((todo, index) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Only do this if items have no stable IDs")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <li key={index}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {todo.text}")]),s(`
`),n("span",{class:"line"},[n("span",null,"  </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) key 的负面影响这一篇文章。")])])])]),n("p",null,[s("如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。 要是你有兴趣了解更多的话，这里有一篇文章"),n("a",{href:"https://react.docschina.org/docs/reconciliation.html#recursing-on-children",target:"_blank",rel:"noreferrer"},"深入解析为什么"),s(" key 是必须的可以参考。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**用** **key** **提取组件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"元素的 key 只有放在就近的数组上下文中才有意义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"比方说，如果你[提取](https://react.docschina.org/docs/components-and-props.html#extracting-components)出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**例子：不正确的使用** **key** **的方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ListItem(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const value = props.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 错误！你不需要在这里指定 key：")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <li key={value.toString()}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {value}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </li>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function NumberList(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const numbers = props.numbers;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const listItems = numbers.map((number) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 错误！元素的 key 应该在这里指定：")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ListItem value={number} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {listItems}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const numbers = [1, 2, 3, 4, 5];")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <NumberList numbers={numbers} />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"**一个好的经验法则是：在** **map()** **方法中的元素需要设置** **key** **属性。**")])])])]),n("p",null,[n("strong",null,"key"),s(),n("strong",null,"只是在兄弟节点之间必须唯一"),s(" 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"key 会传递信息给 React ，但不会传递给你的组件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const content = posts.map((post) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Post")]),s(`
`),n("span",{class:"line"},[n("span",null,"    key={post.id}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    id={post.id}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    title={post.title}")]),s(`
`),n("span",{class:"line"},[n("span",null,"  />")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**在** **JSX** **中嵌入** **map()**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在上面的例子中，我们声明了一个单独的 listItems 变量并将其包含在 JSX 中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function NumberList(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const numbers = props.numbers;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const listItems = numbers.map((number) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ListItem")]),s(`
`),n("span",{class:"line"},[n("span",null,"      key={number.toString()}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      value={number}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {listItems}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"JSX 允许在大括号中[嵌入任何表达式](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 map() 返回的结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function NumberList(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const numbers = props.numbers;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {numbers.map((number) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ListItem")]),s(`
`),n("span",{class:"line"},[n("span",null,"          key={number.toString()}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value={number}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />)}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </ul>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。")]),s(`
`),n("span",{class:"line"},[n("span",null,"但请记住，如果一个 map() 嵌套了太多层级，那可能就是你[提取组件](https://react.docschina.org/docs/components-and-props.html#extracting-components)的一个好时机。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/lists-and-keys.html>")])])])])],-1)])])}const h=a(i,[["render",t]]);export{k as __pageData,h as default};
