import{_ as l,o as e,c as t,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"data快捷访问","description":"注意，这是对使用vm.属性名这种方式取值和赋值的拦截，不是对data.属性名上取值和赋值的拦截； 配置访问vue实例data的快捷方式； 对vm[键名]这种对值的访问方式进行拦截，把这种取值代理到对vm. data的访问； 思考： 为什么要对象拦截后再进行快捷访问拦截？ 如果键名。","frontmatter":{"title":"data快捷访问","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"注意，这是对使用vm.属性名这种方式取值和赋值的拦截，不是对data.属性名上取值和赋值的拦截； 配置访问vue实例data的快捷方式； 对vm[键名]这种对值的访问方式进行拦截，把这种取值代理到对vm. data的访问； 思考： 为什么要对象拦截后再进行快捷访问拦截？ 如果键名。","sidebarWeight":56,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/使用我们的Vue/data快捷访问.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/data快捷访问.md","filePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/data快捷访问.md"}'),p={name:"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/data快捷访问.md"};function i(d,s,u,c,o,r){return e(),t("div",null,[...s[0]||(s[0]=[a("div",null,[a("h1",{id:"data快捷访问",tabindex:"-1"},[n("data快捷访问 "),a("a",{class:"header-anchor",href:"#data快捷访问","aria-label":'Permalink to "data快捷访问"'},"​")]),a("blockquote",null,[a("p",null,"本节目标：理解“data快捷访问”的核心思路，并能把它用于实际开发或面试表达。 注意，这是对使用vm.属性名这种方式取值和赋值的拦截，不是对data.属性名上取值和赋值的拦截； 配置访问vue实例data的快捷方式；")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"首先，将options.data定义到实例的vm._data上去；")])])])]),a("p",null,"对vm[键名]这种对值的访问方式进行拦截，把这种取值代理到对vm.__data的访问；"),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"在src/state.js中")]),n(`
`),a("span",{class:"line"},[a("span",null,"function initData(vm) {")]),n(`
`),a("span",{class:"line"},[a("span",null,"  // 用户传入的数据")]),n(`
`),a("span",{class:"line"},[a("span",null,"  let data = vm.$options.data;")]),n(`
`),a("span",{class:"line"},[a("span",null,"  // 只有根实例可以data是一个对象")]),n(`
`),a("span",{class:"line"},[a("span",null,"  data = vm._data = isFunction(data) ? data.call(vm) : data;")]),n(`
`),a("span",{class:"line"},[a("span",null,"  // 需要将data变成响应式的")]),n(`
`),a("span",{class:"line"},[a("span",null,"  // 观测对象中的属性")]),n(`
`),a("span",{class:"line"},[a("span",null,"  observe(data);")]),n(`
`),a("span",{class:"line"},[a("span",null,"  for (let key in data) { // vm.message => vm._data.message")]),n(`
`),a("span",{class:"line"},[a("span",null,"    proxy(vm, key, '_data');// 代理vm上的取值和设置值 和  vm._data 没关系了")]),n(`
`),a("span",{class:"line"},[a("span",null,"  }")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"// 取值的时候做代理，不是暴力的把_data 属性赋予给vm")]),n(`
`),a("span",{class:"line"},[a("span",null,"// 而且直接赋值会有命名冲突问题")]),n(`
`),a("span",{class:"line"},[a("span",null,"function proxy(vm, key, source) {")]),n(`
`),a("span",{class:"line"},[a("span",null,"  Object.defineProperty(vm, key, {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    get() {")]),n(`
`),a("span",{class:"line"},[a("span",null,"      // vm._data.message")]),n(`
`),a("span",{class:"line"},[a("span",null,"      return vm[source][key];")]),n(`
`),a("span",{class:"line"},[a("span",null,"    },")]),n(`
`),a("span",{class:"line"},[a("span",null,"    set(newValue) {")]),n(`
`),a("span",{class:"line"},[a("span",null,"      // vm._data.message = newValue")]),n(`
`),a("span",{class:"line"},[a("span",null,"      vm[source][key] = newValue;")]),n(`
`),a("span",{class:"line"},[a("span",null,"    }")]),n(`
`),a("span",{class:"line"},[a("span",null,"  })")]),n(`
`),a("span",{class:"line"},[a("span",null,"}")])])])]),a("p",null,"思考： 为什么要对象拦截后再进行快捷访问拦截？ 如果键名是$或__开头的特殊属性，会怎么样？")],-1)])])}const _=l(p,[["render",i]]);export{v as __pageData,_ as default};
