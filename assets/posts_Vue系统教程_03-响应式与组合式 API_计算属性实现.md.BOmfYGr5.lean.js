import{_ as e,o as a,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"计算属性实现","description":"计算属性的特点：缓存，如果依赖项没有变化，不会重新运行；所以计算属性中有一个缓存的标识，如果这个依赖有变化，要重新执行get，没有变化就不重新执行get； 这个属性是 dirty：是否是脏的； 计算属性是一个effect，依赖的属性变化了，会更新dirty的值； 计算属性可以放到。","frontmatter":{"title":"计算属性实现","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"计算属性的特点：缓存，如果依赖项没有变化，不会重新运行；所以计算属性中有一个缓存的标识，如果这个依赖有变化，要重新执行get，没有变化就不重新执行get； 这个属性是 dirty：是否是脏的； 计算属性是一个effect，依赖的属性变化了，会更新dirty的值； 计算属性可以放到。","sidebarWeight":123,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/计算属性实现.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/计算属性实现.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/计算属性实现.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/计算属性实现.md"};function i(c,l,u,r,f,o){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"计算属性实现",tabindex:"-1"},[s("计算属性实现 "),n("a",{class:"header-anchor",href:"#计算属性实现","aria-label":'Permalink to "计算属性实现"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“计算属性实现”的核心思路，并能把它用于实际开发或面试表达。 计算属性的特点：缓存，如果依赖项没有变化，不会重新运行；所以计算属性中有一个缓存的标识，如果这个依赖有变化，要重新执行get，没有变化就不重新执行get； 这个属性是_dirty：是否是脏的；")]),n("p",null,"计算属性是一个effect，依赖的属性变化了，会更新dirty的值； 计算属性可以放到一个effect中使用；"),n("p",null,"当计算属性依赖的值变化了，get函数会执行，同时依赖于计算属性的effect也会执行；"),n("p",null,"依赖的值变化了会触发计算属性effect重新执行， 计算属性重新执行的时候会触发外层effect来执行；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"计算属性套计算属性也是一样的；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建文件reactivity/src/computed.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { isFunction } from "@vue/shared"')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { ReactiveEffect, trackEffects } from "./effect";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export const computed = (getterOrOptions) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 整理参数；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 先定义两个变量存储我们最终需要的值；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 根据用户传入的参数的不同，给予相应赋值；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let getter;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let setter;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isFunction(getterOrOptions)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getter = getterOrOptions;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setter = () => { console.warn('no set') }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getter = getterOrOptions.get;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setter = getterOrOptions.set;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 调用computed函数实际上是创建一个ReactiveEffect实例，它不同于effect函数，默认不会执行；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // effect函数默认会执行一次，即创建一个ReactiveEffect实例，然后调用实例run方法；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // ReactiveEffect构造函数接受一个函数和一个scheduler作为参数；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return new ComputedRefImpl(getter, setter);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"到此,computed()执行完毕；也就是说如果我们不对computed()进行取值或赋值操作，computed的get和set是不会再执行的；实际工作中，计算属性如果没有被使用，是不会执行的；比如在模板中使用，且模板默认的v-if条件是true，如果是false，也相当于没有使用；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在packages/shared/src/index.ts中添加几个工具方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const isObject = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof value === 'object' && value !== null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const isString = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof value === 'string'")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const isNumber = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof value === 'number'")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const isFunction = (value) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return typeof value === 'function'")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const isArray = Array.isArray;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const assign = Object.assign")])])])]),n("p",null,"computed返回的computedRefImpl实例只有一个属性，这个属性是访问器属性，只有get和set方法来定义对值的访问和修改； 当在计算属性上取Value属性时，会触发ComputedRefImpl实例的get value方法，在这个方法中，我们调用我们创建的ReactiveEffect的run方法，就是执行一下getter函数，这里会进行依赖收集，当前effect就是使用计算属性value的effect;我们把这个effect放到了计算属性实例的deps上，下次，我们在set方法中并这些effect依次执行；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class ComputedRefImpl {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 放在实例上便于调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public _dirty = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public __v_readonly = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public __v_isRef = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public _value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 默认使用空Set")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public dep = new Set();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(getter, public setter) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.effect = new ReactiveEffect(getter, () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 使用了调度器，当依赖项变化时，执行这个调度器函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 类中的属性访问器，底层就是Object.defineProperty")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 计算属性使用的时候是使用.value来使用的，所以使用计算属性的地方")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 会调用这个实例的get方法，在get方法中，我们调用实例上的effect的run方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这个run方法会进行依赖收集，")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 也就是说取计算属性的value属性，会调用我们当初传入的getter函数；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  get value() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 做依赖收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"    trackEffects(this.dep);")]),s(`
`),n("span",{class:"line"},[n("span",null,"     // 使用_dirty来进行缓存逻辑；")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (this._dirty) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this._dirty = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this._value = this.effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this._value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  set value(newValue) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 直接调用setter")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setter(newValue)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"我们执行计算属性的getter函数时，已经进行了依赖收集；现在，我们修改计算属性的依赖项，自然会让ComputedRefImpl的effect这个effect重新执行getter函数，但由于有调度器的存在，我们执行的是我们创建effect时传入的调度器函数；"),n("p",null,"让依赖计算属性的effect，在计算属性变化时，能再执行，其它非effect实现，自然不用更新； 所以，我们在get value()方法中，进行依赖收集，如同我们在new Proxy的get方法中所做的一样；目的是一样的，让value记住effect，然后设置value的值时，重新执行effect。"),n("p",null,"我们将这个effect存在了实例的dep属性上，它的值是一个Set，里面存放了它影响到的effect；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"get value() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 做依赖收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==trackEffects====(====this====.====dep====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 使用_dirty来进行缓存逻辑；")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this._dirty) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this._dirty = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this._value = this.effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return this._value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class ComputedRefImpl {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 放在实例上便于调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public effect;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public _dirty = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public __v_readonly = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public __v_isRef = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public _value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==//== ==默认使用空====Set==")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==public== ==dep== ===== ==new== ==Set====();==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"trackEffects方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function trackEffects(dep) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (activeEffect) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let shouldTrack = !dep.has(activeEffect); // 去重了")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (shouldTrack) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      dep.add(activeEffect);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 存放的是属性对应的set")]),s(`
`),n("span",{class:"line"},[n("span",null,"      activeEffect.deps.push(dep);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接下来，当计算属性值变化时，我们要让dep里的effect执行；")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor(getter, public setter) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.effect = new ReactiveEffect(getter, () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 使用了调度器，当依赖项变化时，执行这个调度器函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 重置")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!this._dirty) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this._dirty = true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==//== ==实现触发更新==")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ==triggerEffects====(====this====.====dep====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"triggerEffects代码")]),s(`
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
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<!DOCTYPE html>")]),s(`
`),n("span",{class:"line"},[n("span",null,'<html lang="en">')]),s(`
`),n("span",{class:"line"},[n("span",null,"<head>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <meta charset="UTF-8">')]),s(`
`),n("span",{class:"line"},[n("span",null,'  <meta http-equiv="X-UA-Compatible" content="IE=edge">')]),s(`
`),n("span",{class:"line"},[n("span",null,'  <meta name="viewport" content="width=device-width, initial-scale=1.0">')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <title>Document</title>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</head>")]),s(`
`),n("span",{class:"line"},[n("span",null,"<body>")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <script src="./reactivity.global.js"><\/script>')]),s(`
`),n("span",{class:"line"},[n("span",null,'  <div id="app"></div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let waiting = false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { effect, reactive, computed } = VueReactivity;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const state = reactive({ firstname: '姜', lastname: '文' });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const fullName = computed(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      console.log('runner')")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return state.firstname + state.lastname")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      app.innerHTML = fullName.value")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state.firname = '珠'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, 1000)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <\/script>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</body>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</html>")])])])])],-1)])])}const h=e(t,[["render",i]]);export{g as __pageData,h as default};
