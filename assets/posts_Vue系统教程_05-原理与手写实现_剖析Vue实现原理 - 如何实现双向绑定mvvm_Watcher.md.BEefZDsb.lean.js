import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Watcher","description":"围绕“Watcher”整理的概念、示例与实践笔记。","frontmatter":{"title":"Watcher","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"围绕“Watcher”整理的概念、示例与实践笔记。","sidebarWeight":19,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/Watcher.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Watcher.md","filePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Watcher.md"}'),t={name:"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Watcher.md"};function i(c,l,u,r,d,h){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"watcher",tabindex:"-1"},[s("Watcher "),n("a",{class:"header-anchor",href:"#watcher","aria-label":'Permalink to "Watcher"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Watcher”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Watcher(vm, expOrFn, cb) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.cb = cb;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.vm = vm;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.expOrFn = expOrFn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.depIds = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof expOrFn === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.getter = expOrFn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.getter = this.parseGetter(expOrFn.trim());")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.value = this.get();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Watcher.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor: Watcher,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    update: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    run: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var value = this.get();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var oldVal = this.value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (value !== oldVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.value = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.cb.call(this.vm, value, oldVal);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    addDep: function (dep) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 1. 每次调用run()的时候会触发相应属性的getter")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // getter里面会触发dep.depend()，继而触发这里的addDep")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 则不需要将当前watcher添加到该属性的dep里")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (!this.depIds.hasOwnProperty(dep.id)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            dep.addSub(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.depIds[dep.id] = dep;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Dep.target = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var value = this.getter.call(this.vm, this.vm);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Dep.target = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    parseGetter: function (exp) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (/[^\\w.$]/.test(exp)) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var exps = exp.split('.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return function (obj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            for (var i = 0, len = exps.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (!obj) return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                obj = obj[exps[i]];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return obj;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])])],-1)])])}const v=a(t,[["render",i]]);export{m as __pageData,v as default};
