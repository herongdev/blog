import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"关联响应数据与Effect","description":"为了方便，我们Set数据结构中所存储的副使用函数集合称为key的依赖集合。","frontmatter":{"title":"关联响应数据与Effect","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"为了方便，我们Set数据结构中所存储的副使用函数集合称为key的依赖集合。","sidebarWeight":76,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/响应式思路/关联响应数据与Effect.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/关联响应数据与Effect.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/关联响应数据与Effect.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/关联响应数据与Effect.md"};function c(i,l,u,o,d,f){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"关联响应数据与effect",tabindex:"-1"},[s("关联响应数据与Effect "),n("a",{class:"header-anchor",href:"#关联响应数据与effect","aria-label":'Permalink to "关联响应数据与Effect"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“关联响应数据与Effect”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在被操作的目标字段和副作用函数之间建立关系；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"有以下情况：")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、有两个副作用函数同时读取同一个对象的属性值：")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(function effectFn1() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(function effectFn2() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么关系如下：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"二、如果一个副作用函数中读取了同一个对象的两个不同属性：")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(function effectFn() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text1")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text2")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么关系如下：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"三、如果在不同的副作用函数中读取出两个不同对象的不同属性：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"effect(function effectFn1() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text1")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(function effectFn2() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  obj.text2")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么关系如下：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"总之，我们建立的这种关系就是一个树形结构。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Weekmap由target--> Map构成")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Map由key --> Set 构成")])])])]),n("p",null,"为了方便，我们Set数据结构中所存储的副使用函数集合称为key的依赖集合；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"WeakMap经常用于存储那些只有当key所引用的对象存在时（没有被回收）才有价格的信息。在下面的场景中，如果target对象没有任何引用了，说明用户侧不再需要它了，这时垃圾回收器会完成回收任务。但如果使用Map来代替WeakMap，那么即使用户侧的代码对Target没有任何引用，这个target也不会被回收，最终可能导致内存溢出；")]),s(`
`),n("span",{class:"line"},[n("span",null,"<body></body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 存储副作用函数的桶")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const bucket = new WeakMap()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 原始数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const data = { text: 'hello world' }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 对原始数据的代理")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const obj = new Proxy(data, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 拦截读取操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 将副作用函数 activeEffect 添加到存储副作用函数的桶中")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let depsMap = bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (!depsMap) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        bucket.set(target, (depsMap = new Map()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      let deps = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (!deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        depsMap.set(key, (deps = new Set()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      deps.add(activeEffect)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 返回属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return target[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 拦截设置操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"    set(target, key, newVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 设置属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,"      target[key] = newVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 把副作用函数从桶里取出并执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const depsMap = bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (!depsMap) return")]),s(`
`),n("span",{class:"line"},[n("span",null,"      const effects = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      effects && effects.forEach(fn => fn())")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 用一个全局变量存储当前激活的 effect 函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let activeEffect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function effect(fn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect")]),s(`
`),n("span",{class:"line"},[n("span",null,"    activeEffect = fn")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 执行副作用函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    fn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('effect run')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    document.body.innerText = obj.text")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    obj.text = 'hello vue3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }, 1000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"<\/script>")])])])])],-1)])])}const h=a(t,[["render",c]]);export{g as __pageData,h as default};
