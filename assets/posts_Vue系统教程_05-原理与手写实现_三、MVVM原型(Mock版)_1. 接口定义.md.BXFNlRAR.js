import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"1. 接口定义","description":"围绕“1. 接口定义”整理的概念、示例与实践笔记。","frontmatter":{"title":"1. 接口定义","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"围绕“1. 接口定义”整理的概念、示例与实践笔记。","sidebarWeight":1,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/min-vue/三、MVVM原型(Mock版)/1. 接口定义.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/三、MVVM原型(Mock版)/1. 接口定义.md","filePath":"posts/Vue系统教程/05-原理与手写实现/三、MVVM原型(Mock版)/1. 接口定义.md"}'),t={name:"posts/Vue系统教程/05-原理与手写实现/三、MVVM原型(Mock版)/1. 接口定义.md"};function i(c,l,u,o,d,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"_1-接口定义",tabindex:"-1"},[s("1. 接口定义 "),n("a",{class:"header-anchor",href:"#_1-接口定义","aria-label":'Permalink to "1. 接口定义"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“1. 接口定义”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们MVVM的框架接口和Vue3一模一样。")]),s(`
`),n("span",{class:"line"},[n("span",null,"初始化需要确定")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"视图模板")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"数据模型")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"模型行为 - 比如我们希望click的时候数据模型的message会会倒序排列。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const App = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"  template: `")]),s(`
`),n("span",{class:"line"},[n("span",null,'  <input v-model="message"/>')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <button @click='click'>{{message}}</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  `,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  setup() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 数据劫持")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const state = new Proxy(")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        message: "Hello Vue 3!!",')]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set(target, key, value, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          const ret = Reflect.set(target, key, value, receiver);")]),s(`
`),n("span",{class:"line"},[n("span",null,"          // 触发函数响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"          effective();")]),s(`
`),n("span",{class:"line"},[n("span",null,"          return ret;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const click = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      state.message = state.message.split("").reverse().join("");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return { state, click };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"const { createApp } = Vue;")]),s(`
`),n("span",{class:"line"},[n("span",null,'createApp(App).mount("#app");')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**2.** **程序骨架**")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const Vue = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  createApp(config) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 编译过程")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const compile = (template) => (content, dom) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 生成渲染函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const render = compile(config.template);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      mount: function (container) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const dom = document.querySelector(container);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 实现setup函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const setupResult = config.setup();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 数据响应更新视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effective = () => render(setupResult, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        render(setupResult, dom);")]),s(`
`),n("span",{class:"line"},[n("span",null,"      },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**3.** **编译渲染函数**")]),s(`
`),n("span",{class:"line"},[n("span",null,"MVVM框架中的渲染函数是会通过视图模板的编译建立的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 编译函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 输入值为视图模板")]),s(`
`),n("span",{class:"line"},[n("span",null,"const compile = (template) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //渲染函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (observed, dom) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 渲染过程")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"简单的说就是对视图模板进行解析并生成渲染函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"大概要处理以下三件事")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"确定哪些值需要根据数据模型渲染")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// <button>{{message}}</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 将数据渲染到视图")]),s(`
`),n("span",{class:"line"},[n("span",null,"button = document.createElement('button')")]),s(`
`),n("span",{class:"line"},[n("span",null,"button.innerText = observed.message")]),s(`
`),n("span",{class:"line"},[n("span",null,"dom.appendChild(button)")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"绑定模型事件")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"// <button @click='click'>{{message}}</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 绑定模型事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"button.addEventListener('click', () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return config.methods.click.apply(observed)")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"确定哪些输入项需要双向绑定")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'// <input v-model="message"/>')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建keyup事件监听输入项修改")]),s(`
`),n("span",{class:"line"},[n("span",null,"input.addEventListener('keyup', function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  observed.message = this.value")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"完整的代码")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const compile = (template) => (observed, dom) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 重新渲染")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let input = dom.querySelector('input')")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!input) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    input = document.createElement('input')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    input.setAttribute('value', observed.message)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    input.addEventListener('keyup', function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      observed.message = this.value")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dom.appendChild(input)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  let button = dom.querySelector('button')")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!button) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('create button')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    button = document.createElement('button')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    button.addEventListener('click', () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return config.methods.click.apply(observed)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dom.appendChild(button)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  button.innerText = observed.message")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(t,[["render",i]]);export{g as __pageData,v as default};
