import{_ as l,o as a,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"toRef和toRefs","description":"把对一个对象属性的访问，变成了对一个对象value属性的访问； 这样，我们创建了一个值，这个值可以用于其它effect中，在effect中，我们从value上取值时，我们收集了effect，之后，我们对这个值的value进行赋值时，我们可以让effect的run方法重新执行一次。","frontmatter":{"title":"toRef和toRefs","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"把对一个对象属性的访问，变成了对一个对象value属性的访问； 这样，我们创建了一个值，这个值可以用于其它effect中，在effect中，我们从value上取值时，我们收集了effect，之后，我们对这个值的value进行赋值时，我们可以让effect的run方法重新执行一次。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/Ref实现/toRef和toRefs.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/toRef和toRefs.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/toRef和toRefs.md"}'),o={name:"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/toRef和toRefs.md"};function c(p,n,u,i,f,r){return a(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"toref和torefs",tabindex:"-1"},[s("toRef和toRefs "),e("a",{class:"header-anchor",href:"#toref和torefs","aria-label":'Permalink to "toRef和toRefs"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“toRef和toRefs”的核心思路，并能把它用于实际开发或面试表达。 把对一个对象属性的访问，变成了对一个对象value属性的访问；")]),e("p",null,"这样，我们创建了一个值，这个值可以用于其它effect中，在effect中，我们从value上取值时，我们收集了effect，之后，我们对这个值的value进行赋值时，我们可以让effect的run方法重新执行一次；"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"export function toRef(object, key) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  return new ObjectRefImpl(object, key);")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"class ObjectRefImpl { // 只是将.value属性代理到原始类型上")]),s(`
`),e("span",{class:"line"},[e("span",null,"  constructor(public object, public key) { }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  get value() {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    return this.object[this.key];")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  set value(newValue) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    this.object[this.key] = newValue")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"**toRefs**")]),s(`
`),e("span",{class:"line"},[e("span",null,"在内部循环调用了toRef，让对象上的每个属性变成了ref；")]),s(`
`),e("span",{class:"line"},[e("span",null,"之后 ，当在effect中使用ref.value时收集依赖，设置ref的值时，让effect.run执行；")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function toRefs(object) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  const result = isArray(object) ? new Array(object.length) : {};")]),s(`
`),e("span",{class:"line"},[e("span",null,"  for (let key in object) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    result[key] = toRef(object, key);")]),s(`
`),e("span",{class:"line"},[e("span",null,"  }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  return result")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const v=l(o,[["render",c]]);export{h as __pageData,v as default};
