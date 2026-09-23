import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"watch的实现","description":"注意：监控对象是无法区分新值和旧值的，他们是同一个引用地址； watch本质是一个effect，内部会对第一个参数进行依赖收集； 第一个参数变化后，执行第二个函数，第二个函数是自定义的Scheduler。","frontmatter":{"title":"watch的实现","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"注意：监控对象是无法区分新值和旧值的，他们是同一个引用地址； watch本质是一个effect，内部会对第一个参数进行依赖收集； 第一个参数变化后，执行第二个函数，第二个函数是自定义的Scheduler。","sidebarWeight":57,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/watch的实现.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/watch的实现.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/watch的实现.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/watch的实现.md"};function c(i,l,u,o,r,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"watch的实现",tabindex:"-1"},[s("watch的实现 "),n("a",{class:"header-anchor",href:"#watch的实现","aria-label":'Permalink to "watch的实现"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“watch的实现”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"不属于响应式reactivity包中；")])])])]),n("p",null,"注意：监控对象是无法区分新值和旧值的，他们是同一个引用地址；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"watch的第一个参数：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一个对象；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一个ref；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"返回响应式值的函数；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"数组；")])])])]),n("p",null,"watch本质是一个effect，内部会对第一个参数进行依赖收集； 第一个参数变化后，执行第二个函数，第二个函数是自定义的Scheduler；"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"用到的方法/src/reactive.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function isReactive(value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return !!(value && value[ReactiveFlags.IS_REACTIVE])")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建文件reactivity/src/watch.ts;")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { ReactiveEffect } from "./effect";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { isReactive } from "./reactive";')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 本质也是一个ReactiveEffect，接受一个getter函数用来取值和依赖收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"// watch的getter也就是第一个参数，如果是对象或者一个数组，要转成一个方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 这个方法会对我们想观测的数组的属性进行递归，达到依赖收集的目的")]),s(`
`),n("span",{class:"line"},[n("span",null,"// ReactiveEffect的第二参数是自定义的调度器，当依赖变化时，执行这个调度器；")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function watch(source, cb) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let getter;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isReactive(source)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 调用get只是返回一个对象，我们要对对象中的属性进行访问")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 只有这样才能进行依赖收集，所以我们要递归循环，只要循环就会访问对象上的每一个属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 访问属性就会收集effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getter = () => source")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const job = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const newValue = effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cb(newValue, oldValue);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        oldValue = newValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 监控自己构造的函数，变化后重新执行job")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effect = new ReactiveEffect(getter, job);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    oldValue = effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'import { isFunction, isObject } from "@vue/shared";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { ReactiveEffect } from "./effect";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { isReactive } from "./reactive";')]),s(`
`),n("span",{class:"line"},[n("span",null,"==function== ==traversal====(====value====,== ==set== ===== ==new== ==Set====())== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==//== ==考虑如果对象中有循环引用的问题==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==//== ==第一步递归要有终结条件，不是对象就不在递归了==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==if== ==(!====isObject====(====value====))== ==return== ==value====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==if== ==(====set====.====has====(====value====))== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==return== ==value====;==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==set====.====add====(====value====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==for== ==(====let== ==key== ==in== ==value====)== =={==")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ==traversal====(====value====[====key====],== ==set====);==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ==return== ==value==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function watch(source, cb) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let getter;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isReactive(source)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 对数据递归循环，只要循环就会访问对象上的每一个属性，访问属性的时候会收集effect")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getter = () => ==traversal====(====source====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else if (isFunction(source)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 这里假设用户的函数返回的是对象的属性值，而不是一个对象；")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getter = source")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const job = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const newValue = effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cb(newValue, oldValue);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        oldValue = newValue;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 监控自己构造的函数，变化后重新执行job")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effect = new ReactiveEffect(getter, job);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    oldValue = effect.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(p,[["render",c]]);export{v as __pageData,g as default};
