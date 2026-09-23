import{_ as a,o as n,c as p,j as s,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"数据劫持","description":"最重要的是defineProperty方法，对data的属性使用Object.defineProperty进行劫持处理；即定义了每一个属性的get和Set方法； 由于要对对象的属性进行深层遍历，我们添加关键的一行代码，对对象的属性进行递归处理：。","frontmatter":{"title":"数据劫持","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"最重要的是defineProperty方法，对data的属性使用Object.defineProperty进行劫持处理；即定义了每一个属性的get和Set方法； 由于要对对象的属性进行深层遍历，我们添加关键的一行代码，对对象的属性进行递归处理：。","sidebarWeight":61,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/手写/使用我们的Vue/数据劫持.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数据劫持.md","filePath":"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数据劫持.md"}'),i={name:"posts/Vue系统教程/05-原理与手写实现/使用我们的Vue/数据劫持.md"};function t(c,l,u,o,d,r){return n(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"数据劫持",tabindex:"-1"},[e("数据劫持 "),s("a",{class:"header-anchor",href:"#数据劫持","aria-label":'Permalink to "数据劫持"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“数据劫持”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在src下新增observe目录，并在其中建立index.js")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"定义observe方法")]),e(`
`),s("span",{class:"line"},[s("span",null,"主要逻辑：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"看传入的值是否为对象，如果不是，不做处理；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果是对象，调用new Observe()返回一个Observe实例；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"我们在调用new时，在构造函数中做了很多事情；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"export function observe(value) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    if (!isObject(value)) return;")]),e(`
`),s("span",{class:"line"},[s("span",null,"    // 利用new Class方式的特点")]),e(`
`),s("span",{class:"line"},[s("span",null,"    // 调用函数")]),e(`
`),s("span",{class:"line"},[s("span",null,"    // 返回一个实例")]),e(`
`),s("span",{class:"line"},[s("span",null,"    // 这个实例我们加上了很多实例属性和方法")]),e(`
`),s("span",{class:"line"},[s("span",null,"    return new Observer(value)")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"类Observe")]),e(`
`),s("span",{class:"line"},[s("span",null,"主要逻辑：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"在构造函数中，我们调用实例方法walk来对值进行处理；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"walk方法中主要是使用Object.kes来对属性进行循环处理；")])])])]),s("p",null,"最重要的是defineProperty方法，对data的属性使用Object.defineProperty进行劫持处理；即定义了每一个属性的get和Set方法；"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'import { isObject } from "../utils";')]),e(`
`),s("span",{class:"line"},[s("span",null,"class Observer {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    constructor(value) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"        // 核心是循环对象")]),e(`
`),s("span",{class:"line"},[s("span",null,"        this.walk(value);")]),e(`
`),s("span",{class:"line"},[s("span",null,"    }")]),e(`
`),s("span",{class:"line"},[s("span",null,"    walk(data) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"        // 使用defineProperty重新定义")]),e(`
`),s("span",{class:"line"},[s("span",null,"        Object.keys(data).forEach(key => {")]),e(`
`),s("span",{class:"line"},[s("span",null,"            defineReactive(data, key, data[key])")]),e(`
`),s("span",{class:"line"},[s("span",null,"        })")]),e(`
`),s("span",{class:"line"},[s("span",null,"    }")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"function defineReactive(obj, key, value) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    Object.defineProperty(obj, key, {")]),e(`
`),s("span",{class:"line"},[s("span",null,"        get() {")]),e(`
`),s("span",{class:"line"},[s("span",null,"            // 闭包，此vaule会向上层的value进行查找")]),e(`
`),s("span",{class:"line"},[s("span",null,"            return value;")]),e(`
`),s("span",{class:"line"},[s("span",null,"        },")]),e(`
`),s("span",{class:"line"},[s("span",null,"        set(newValue) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"            value = newValue;")]),e(`
`),s("span",{class:"line"},[s("span",null,"        }")]),e(`
`),s("span",{class:"line"},[s("span",null,"    })")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,"由于要对对象的属性进行深层遍历，我们添加关键的一行代码，对对象的属性进行递归处理："),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"vue性能问题")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"vue应用了defineProperty需要一加载的时候就进行递归操作，所以耗性能；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"此外： 如果data层次过深也会浪费性能；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"性能优化的原则：")]),e(`
`),s("span",{class:"line"},[s("span",null," 1) 不需要响应式的数据不要放在data中，因为所有的数据都会增加get和set；")]),e(`
`),s("span",{class:"line"},[s("span",null," 2) 不要写数据的时候层次过深， 尽量扁平化数据；")]),e(`
`),s("span",{class:"line"},[s("span",null," 3) 不要频繁获取数据和修改数据；")]),e(`
`),s("span",{class:"line"},[s("span",null," 4) 如果数据不需要响应式 可以使用Object.freeze 冻结属性；")]),e(`
`),s("span",{class:"line"},[s("span",null,"function defineReactive(obj, key, value) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    ==observe====(====value====);==")]),e(`
`),s("span",{class:"line"},[s("span",null,"    Object.defineProperty(obj, key, {")]),e(`
`),s("span",{class:"line"},[s("span",null,"        get() {")]),e(`
`),s("span",{class:"line"},[s("span",null,"            // 闭包，此vaule会向上层的value进行查找")]),e(`
`),s("span",{class:"line"},[s("span",null,"            return value;")]),e(`
`),s("span",{class:"line"},[s("span",null,"        },")]),e(`
`),s("span",{class:"line"},[s("span",null,"        set(newValue) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"            value = newValue;")]),e(`
`),s("span",{class:"line"},[s("span",null,"        }")]),e(`
`),s("span",{class:"line"},[s("span",null,"    })")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"其中不要频繁获取数据是指：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"先计算出变量值，再赋值给data对象；")])])])])],-1)])])}const g=a(i,[["render",t]]);export{v as __pageData,g as default};
