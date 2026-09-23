import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"runtime-core-src-renderer.ts","description":"接下来调用createRenderer的Render方法，这个方法主要调用patch方法，patch方法里，会进行新老vnode是否全等和是否同一个vnode的判断，如果不是同一个vnode就直接把老的卸载掉，然后把旧vnode置为空；接下来vnode相同的逻辑了，即更新dom操。","frontmatter":{"title":"runtime-core-src-renderer.ts","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"接下来调用createRenderer的Render方法，这个方法主要调用patch方法，patch方法里，会进行新老vnode是否全等和是否同一个vnode的判断，如果不是同一个vnode就直接把老的卸载掉，然后把旧vnode置为空；接下来vnode相同的逻辑了，即更新dom操。","sidebarWeight":36,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/patchElement/runtime-core-src-renderer.ts.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-renderer.ts.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-renderer.ts.md"}'),i={name:"posts/Vue系统教程/03-响应式与组合式 API/patchElement/runtime-core-src-renderer.ts.md"};function t(c,l,r,u,o,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"runtime-core-src-renderer-ts",tabindex:"-1"},[s("runtime-core-src-renderer.ts "),n("a",{class:"header-anchor",href:"#runtime-core-src-renderer-ts","aria-label":'Permalink to "runtime-core-src-renderer.ts"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“runtime-core-src-renderer.ts”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,'  <script src="./runtime-dom.global.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let { createRenderer, h, render, Text } = VueRuntimeDOM")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render(h('h1', { style: { color: 'red' } }, '1111'), app);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      render(h('h1', { style: { color: 'blue', background: 'red' } }, '1111'), app);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, 1000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"对于以一模板代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们进入了render方法，")]),s(`
`),n("span",{class:"line"},[n("span",null,"第一参数是h方法，进入，由于参数是3个，并且最后参数不是vnode，执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"return createVnode(type, propsOrChildren, children);")]),s(`
`),n("span",{class:"line"},[n("span",null,"相当将参数不动传给createVnode，当只有三个参数，并且第三个参数不是Vnode时；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来，创建Vnode，")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于type为h1，字符串，最终得到vnode为：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"其中ShapeFlags表明它的子元素是文本；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来执行render方法，它的内部调用了createRenderer方法，这个方法在runtime-core中，")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function render(vnode, container) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 在创建渲染器的时候 传入选项")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createRenderer(renderOptions).render(vnode, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"即把一个对象渲染到一个容器中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"先调用createRenderer方法，它的参数为操作dom的自定义api和patchProps方法，即如何处理各类型属性值，并进行增删更新操作；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"它的参数renderOptions我们定义如下")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const nodeOps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 增加 删除 修改 查询")]),s(`
`),n("span",{class:"line"},[n("span",null,"  insert(child, parent, anchor = null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // insertBefore 可以等价于appendChild")]),s(`
`),n("span",{class:"line"},[n("span",null,"    parent.insertBefore(child, anchor);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  remove(child) { // 删除节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const parentNode = child.parentNode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (parentNode) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      parentNode.removeChild(child)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setElementText(el, text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.textContent = text;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setText(node, text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // document.createTextNode()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    node.nodeValue = text;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  querySelector(selector) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.querySelector(selector)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  parentNode(node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return node.parentNode")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  nextSibling(node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return node.nextSibling")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createElement(tagName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.createElement(tagName);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createText(text) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return document.createTextNode(text);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"createRenderer方法返回一个包含Rendre方法的对象，render方法如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// vnode 虚拟dom")]),s(`
`),n("span",{class:"line"},[n("span",null,"const render = (vnode, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 渲染过程是用你传入的renderOptions来渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (vnode == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 卸载逻辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (container._vnode) { // 之前确实渲染过了，那么就卸载掉dom")]),s(`
`),n("span",{class:"line"},[n("span",null,"      unmount(container._vnode); // el")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这里既有初始化的逻辑，又有更新的逻辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patch(container._vnode || null, vnode, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  container._vnode = vnode")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果当前vnode是空的话")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来进入到patch方法中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个方法会比较前后两个vnode，从而决定操作：")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果老vnode有，只是新旧类型不同，就卸载掉老的Dom，接下来就都是没有老vnode的情况了，有一个情况是新vnode也没有，还有一个情况是有新的vnode，我们就假设都有即可；在具体处理时，再考虑老vnode为空的情况")]),s(`
`),n("span",{class:"line"},[n("span",null,"添加的时候，要看一下vnode的类型：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const patch = (n1, n2, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //  核心的patch方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (n1 === n2) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (n1 && !isSameVnode(n1, n2)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 判断两个元素是否相同，不相同卸载在添加")]),s(`
`),n("span",{class:"line"},[n("span",null,"    unmount(n1); // 删除老的")]),s(`
`),n("span",{class:"line"},[n("span",null,"    n1 = null")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { type, shapeFlag } = n2")]),s(`
`),n("span",{class:"line"},[n("span",null,"  switch (type) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    case Text:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      processText(n1, n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    default:")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (shapeFlag & ShapeFlags.ELEMENT) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        processElement(n1, n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们的新vnode是元素而不是文本，执行processElement方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const processElement = (n1, n2, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (n1 === null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    mountElement(n2, container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 元素比对")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patchElement(n1, n2)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在老vnode为空的情况下，即初始渲染，")]),s(`
`),n("span",{class:"line"},[n("span",null,"做以下四件事：")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、创建元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"二、创建属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"三、处理子元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"四、将元素插入到容器")]),s(`
`),n("span",{class:"line"},[n("span",null,"const mountElement = (vnode, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let { type, props, children, shapeFlag } = vnode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let el = vnode.el = hostCreateElement(type);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 将真实元素挂载到这个虚拟节点上，后续用于复用节点和更新")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for (let key in props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      hostPatchProp(el, key, null, props[key])")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) { // 文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"    hostSetElementText(el, children)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"    mountChildren(children, el)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  hostInsert(el, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"至此，首次渲染完成；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来，我们render一个新的h()方法返回的虚拟dom：")]),s(`
`),n("span",{class:"line"},[n("span",null,"这次创建的vnode为：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"主要是属性不一样，类型type是一样的；")])])])]),n("p",null,"接下来调用createRenderer的Render方法，这个方法主要调用patch方法，patch方法里，会进行新老vnode是否全等和是否同一个vnode的判断，如果不是同一个vnode就直接把老的卸载掉，然后把旧vnode置为空；接下来vnode相同的逻辑了，即更新dom操作；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"执行patchElement操作：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const patchElement = (n1, n2) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 先复用节点、在比较属性、在比较儿子")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let el = n2.el = n1.el;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let oldProps = n1.props || {}; // 对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let newProps = n2.props || {}; // 对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"  patchProps(oldProps, newProps, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  patchChildren(n1, n2, el);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"比较属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"const patchProps = (oldProps, newProps, el) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in newProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 新的里面有，如果老的有就是覆盖，没有就是新增")]),s(`
`),n("span",{class:"line"},[n("span",null,"    hostPatchProp(el, key, oldProps[key], newProps[key]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let key in oldProps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果老的里面有新的没有，则是删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (newProps[key] == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      hostPatchProp(el, key, oldProps[key], null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const patchChildren = (n1, n2, el) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比较两个虚拟节点的儿子的差异 ， el就是当前的父节点")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const c1 = n1 && n1.children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const c2 = n2 && n2.children;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 文本  空的null  数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 比较两个儿子列表的差异了")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const mountChildren = (children, container) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < children.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let child = normalize(children[i])")]),s(`
`),n("span",{class:"line"},[n("span",null,"    patch(null, child, container)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const normalize = (child) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isString(child)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return createVnode(Text, null, child)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return child")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=e(i,[["render",t]]);export{v as __pageData,g as default};
