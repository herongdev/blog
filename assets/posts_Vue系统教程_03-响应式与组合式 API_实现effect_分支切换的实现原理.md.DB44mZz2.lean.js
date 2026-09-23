import{_ as e,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"分支切换的实现原理","description":"Effect是一个函数，它首先会执行一次，执行的时候就进行了一次依赖收集； 这次的依赖收集中用到的依赖数据的更新，肯定会触发找到effect，并调用它的run方法； 到此，已经实现了响应式，即数据变化，重新执行run方法； 但是，此时执行run方法时，是一些数据发生了变化，代码可。","frontmatter":{"title":"分支切换的实现原理","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"Effect是一个函数，它首先会执行一次，执行的时候就进行了一次依赖收集； 这次的依赖收集中用到的依赖数据的更新，肯定会触发找到effect，并调用它的run方法； 到此，已经实现了响应式，即数据变化，重新执行run方法； 但是，此时执行run方法时，是一些数据发生了变化，代码可。","sidebarWeight":90,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/分支切换的实现原理.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/分支切换的实现原理.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/分支切换的实现原理.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/分支切换的实现原理.md"};function c(i,l,u,f,r,o){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"分支切换的实现原理",tabindex:"-1"},[s("分支切换的实现原理 "),n("a",{class:"header-anchor",href:"#分支切换的实现原理","aria-label":'Permalink to "分支切换的实现原理"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“分支切换的实现原理”的核心思路，并能把它用于实际开发或面试表达。 Effect是一个函数，它首先会执行一次，执行的时候就进行了一次依赖收集； 这次的依赖收集中用到的依赖数据的更新，肯定会触发找到effect，并调用它的run方法； 到此，已经实现了响应式，即数据变化，重新执行run方法； 但是，此时执行run方法时，是一些数据发生了变化，代码可能走了不同的条件判断，执行所依赖的数据可能已经变化了，也就是说有一些数据项我们可能不依赖它了，它的变化，我们不要再更新了！ 所以，我们在执行run方法前，把之前可能无效的依赖收集清空，并在此次run的时候，记录下此次依赖的数据项，也就是重新做依赖收集，这样，我们才能在这次用到的依赖项更新时，重新运行run;")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"原理：")])])])]),n("p",null,"effect传入的函数，会首先执行一次，在执行的过程中收集了一次依赖；"),n("p",null,"接下来发生了依赖值的变化，由于之前依赖收集过，所以，effect的函数自然会重新执行一次，其实这已经实现了响应式；即数据变化了，重新执行了函数；"),n("p",null,"但由于条件表达式的存在，我们再次运行函数时，有可能我们依赖的值不再是之前的值，也就是说，之前的依赖值我们在这次运行中用不到了，如果这个用不到的依赖值变化时，我们是不需要重新运行函数的，这样可以提高性能；、"),n("p",null,"由于这次执行函数时，我们可以清楚地知道要依赖哪些值，并且也会进行依赖收集，所以，在执行函数之前，将之前的依赖收集全部清空，在这次运行函数时，我们重新收集，并且，这次收集才是正确的，只有这次计算中的依赖项变化，我们才运行函数，之前的依赖项变化我们不再理会；"),n("p",null,"接下来，只有上一次运行的函数中用到的依赖项变化了，我传递才找到activeEffect，并重新执行函数；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这一次执行函数，会执行新的代码，确定新的依赖项；")])])])]),n("p",null,"同样，我们在运行函数之前，把之前的依赖项清空；也就是将所以属性对应的set中的当前effect删除掉，这们，当属性更新时，我们当前effect是不会重新运行fn的；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <script src="./reactivity.global.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { effect, reactive } = VueReactivity;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const state = reactive({ flag: true, name: 'jw', age: 30 })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      console.log('render')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      document.body.innerHTML = state.flag ? state.name : state.age")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state.flag = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log('修改name，原则上不更新')")]),s(`
`),n("span",{class:"line"},[n("span",null,"        state.name = 'zf'")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }, 1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, 1000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"修改src/effect.ts代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"添加一个方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"function cleanupEffect(effect) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const { deps } = effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  for (let i = 0; i < deps.length; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    deps[i].delete(effect); // 解除effect，重新依赖收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effect.deps.length = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class ReactiveEffect {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public deps = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public active = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(public fn) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  run() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!this.active) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = activeEffect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==这里我们需要在执行用户函数之前将之前收集的内容清空==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==cleanupEffect====(====this====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this.parent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"修改trigger方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function trigger(target, type, key, value, oldValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const depsMap = targetMap.get(target);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) return; // 触发的值不在模板中使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let effects = depsMap.get(key); // 找到了属性对应的effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==if== ==(====effects====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==effects== ===== ==new== ==Set====(====effects====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==effects====.====forEach====(====effect== ===>== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==if== ==(====effect== ==!==== ==activeEffect====)== ==effect====.====run====();==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==})==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=e(p,[["render",c]]);export{h as __pageData,g as default};
