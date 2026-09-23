import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"添加反向依赖","description":"单向是指属性记录了Effect； 反向是指让effect也记录了它被哪些属性收集过； 这样做的好处是为了可以清理。","frontmatter":{"title":"添加反向依赖","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"单向是指属性记录了Effect； 反向是指让effect也记录了它被哪些属性收集过； 这样做的好处是为了可以清理。","sidebarWeight":94,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/添加反向依赖.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/添加反向依赖.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/添加反向依赖.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/添加反向依赖.md"};function c(i,l,u,f,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"添加反向依赖",tabindex:"-1"},[s("添加反向依赖 "),n("a",{class:"header-anchor",href:"#添加反向依赖","aria-label":'Permalink to "添加反向依赖"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“添加反向依赖”的核心思路，并能把它用于实际开发或面试表达。 单向是指属性记录了Effect； 反向是指让effect也记录了它被哪些属性收集过； 这样做的好处是为了可以清理；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"使用反向依赖的例子：")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  flag ? this.name : this.age")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"flag为true时，name收集了effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"flag为false时，age收集了effect；此时，我们要把name收集的effect清空，这时要通过effect将所有的记录都删掉，再把age的加进去；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export let activeEffect = undefined;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 拥有一个run方法，就是执行effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ReactiveEffect {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==public== ==deps== ===== ==[];==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 创建的effect默认是激活的")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public active = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // public修饰符会在实例上添加这个参数作为属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 相当于this.fn=fn")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(public fn) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  run() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果是非激活的，只需要执行函数，不需要进行依赖收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!this.active) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 第一个实例的parent是undefined")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = activeEffect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 代码执行完后，")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 一、重置activeEffect，指向parent")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this.parent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 二、重置parent指针,undefined?")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const effect = (fn) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这里的fn可以根据数据变化，重新执行；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // effect可以嵌套着写")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 创建响应式的effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const _effect = new ReactiveEffect(fn);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 默认先执行一次")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const targetMap = new WeakMap();")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function track(target, type, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 如果不是在effect中获取属性，是不跟踪的；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!activeEffect) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let depsMap = targetMap.get(target);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 将源对象与一个map关联起来；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 这个map的键是属性名，值是一个set，set中放置的是effect实例")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 当map中的属性变化时，我们把对应的set中的effect实例拿出来，调用其run方法；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 从而又执行了一次effect的fn函数；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    targetMap.set(target, (depsMap = new Map()));")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 再到这个depsMap中查找当前属性对应的Set;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let dep = depsMap.get(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!dep) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    depsMap.set(key, (dep = new Set()));")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 看set中是否存在当前的effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let shouldTrack = !dep.has(activeEffect);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (shouldTrack) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dep.add(activeEffect);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // effect实例deps属性是一个数组，里面存在着set，set中存放着属性依赖的effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 稍后清理的时候会用到；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果effect用到了两个属性，deps数组就会有两个成员set；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==activeEffect====.====deps====.====push====(====dep====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(t,[["render",c]]);export{h as __pageData,g as default};
