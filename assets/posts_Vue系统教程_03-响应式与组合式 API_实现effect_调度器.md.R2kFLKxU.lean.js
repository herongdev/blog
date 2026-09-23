import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"调度器","description":"围绕“调度器”整理的概念、示例与实践笔记。","frontmatter":{"title":"调度器","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“调度器”整理的概念、示例与实践笔记。","sidebarWeight":95,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/实现effect/调度器.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/调度器.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/实现effect/调度器.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/实现effect/调度器.md"};function c(i,l,u,f,r,o){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"调度器",tabindex:"-1"},[s("调度器 "),n("a",{class:"header-anchor",href:"#调度器","aria-label":'Permalink to "调度器"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“调度器”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export class ReactiveEffect {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public deps = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public active = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(public fn, ==public== ==scheduler==) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  run() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!this.active) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = activeEffect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 这里我们需要在执行用户函数之前将之前收集的内容清空")]),s(`
`),n("span",{class:"line"},[n("span",null,"      cleanupEffect(this)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return this.fn();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect = this.parent;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.parent = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==stop====()== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==if== ==(====this====.====active====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==this====.====active== ===== ==false====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==cleanupEffect====(====this====);== ==//== ==停止====effect====的收集==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export const effect = (fn, options: any = {}) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const _effect = new ReactiveEffect(fn, options.scheduler);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  _effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 将实例的Run方法绑定到effect上，然后作为返回值返回")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const runner = _effect.run.bind(_effect); // 绑定this执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 将effect挂载到runner函数上")]),s(`
`),n("span",{class:"line"},[n("span",null,"  runner.effect = _effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return runner")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function trigger(target, type, key, value, oldValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const depsMap = targetMap.get(target);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) return; // 触发的值不在模板中使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let effects = depsMap.get(key); // 找到了属性对应的effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 永远在执行之前 先拷贝一份来执行， 不要关联引用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (effects) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    triggerEffects(effects)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function triggerEffects(effects) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effects = new Set(effects);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  effects.forEach(effect => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 我们在执行effect的时候，又要执行自己，那我们需要屏蔽掉，不要无限调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (effect !== activeEffect) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (effect.scheduler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 如果用户传入了调度函数，则用用户的")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effect.scheduler();")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effect.run() // 否则默认刷新视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  });")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function track(target, type, key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!activeEffect) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let depsMap = targetMap.get(target);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!depsMap) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    targetMap.set(target, (depsMap = new Map()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let dep = depsMap.get(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!dep) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    depsMap.set(key, (dep = new Set()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  trackEffects(dep);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export function trackEffects(dep) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (activeEffect) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let shouldTrack = !dep.has(activeEffect); // 去重了")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (shouldTrack) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dep.add(activeEffect);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 存放的是属性对应的set")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect.deps.push(dep);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(t,[["render",c]]);export{h as __pageData,g as default};
