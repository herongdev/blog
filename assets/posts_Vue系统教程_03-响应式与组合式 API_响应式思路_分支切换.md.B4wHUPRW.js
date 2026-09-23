import{_ as a,o as l,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"分支切换","description":"effectFn内部存在一个三元表达式，根据字段obj.ok值的不同会执行不同的代码分支。当字段obj.ok的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换； 解决方法是： 每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除掉； 删掉后，副作用函数的。","frontmatter":{"title":"分支切换","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"effectFn内部存在一个三元表达式，根据字段obj.ok值的不同会执行不同的代码分支。当字段obj.ok的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换； 解决方法是： 每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除掉； 删掉后，副作用函数的。","sidebarWeight":77,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/响应式思路/分支切换.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/分支切换.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/分支切换.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/响应式思路/分支切换.md"};function c(i,e,o,u,d,f){return l(),t("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"分支切换",tabindex:"-1"},[n("分支切换 "),s("a",{class:"header-anchor",href:"#分支切换","aria-label":'Permalink to "分支切换"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“分支切换”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"分支切换的定义：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"const data = { ok: true, text: 'hello world' }")]),n(`
`),s("span",{class:"line"},[s("span",null,"const obj = new Proxy(data, {})")]),n(`
`),s("span",{class:"line"},[s("span",null,"effect(function effectFn() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  document.body.innerText = obj.ok ? obj.text : 'not'")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")])])])]),s("p",null,"effectFn内部存在一个三元表达式，根据字段obj.ok值的不同会执行不同的代码分支。当字段obj.ok的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"分支切换可能会产生遗留的副作用函数；")])])])]),s("p",null,"解决方法是： 每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除掉； 删掉后，副作用函数的执行过程，我们重新构建新的依赖关系，这样，只有当这次建立的依赖关系中的相关值变化，我们的effect才会执行，也才有必要执行；"),s("p",null,"如何在每次副作用执行前，将其从相关联的依赖集合中移除呢？ 要将一个副作用函数从所有与之关联的依赖集合中移除，就需要明确知道哪些依赖集合中包含了它，因为我们需要重要设计副作用函数，我们将在副作用函数上添加一个deps属性，该属性是一个数组，用来存储所有包含当前副作用函数的依赖的集合；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"也就是说这个数组中存储的是依赖集合，就是weakmap->map->set这个集合；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// 用一个全局变量存储当前激活的 effect 函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"let activeEffect")]),n(`
`),s("span",{class:"line"},[s("span",null,"function effect(fn) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 一、将fn函数包装到新函数中")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const effectFn = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect")]),n(`
`),s("span",{class:"line"},[s("span",null,"    activeEffect = effectFn")]),n(`
`),s("span",{class:"line"},[s("span",null,"    fn()")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 二、给这个新函数添加一个属性")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合")]),n(`
`),s("span",{class:"line"},[s("span",null,"  effectFn.deps = []")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 三、执行新定义的副作用函数")]),n(`
`),s("span",{class:"line"},[s("span",null,"  effectFn()")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"那么在哪里将依赖集合收集到effectFn.deps中呢，应该是在Track函数中，最我们读取属性的时候，我们定义依赖集合的时候，让它们相互收集；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"function track(target, key) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  let depsMap = bucket.get(target)")]),n(`
`),s("span",{class:"line"},[s("span",null,"  if (!depsMap) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    bucket.set(target, (depsMap = new Map()))")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  let deps = depsMap.get(key)")]),n(`
`),s("span",{class:"line"},[s("span",null,"  if (!deps) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    depsMap.set(key, (deps = new Set()))")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  deps.add(activeEffect)")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 在这里收集依赖集合；")]),n(`
`),s("span",{class:"line"},[s("span",null,"  activeEffect.deps.push(deps)")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])])],-1)])])}const g=a(p,[["render",c]]);export{h as __pageData,g as default};
