import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"Observer","description":"围绕“Observer”整理的概念、示例与实践笔记。","frontmatter":{"title":"Observer","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"围绕“Observer”整理的概念、示例与实践笔记。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/Observer.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Observer.md","filePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Observer.md"}'),i={name:"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Observer.md"};function u(t,l,c,r,o,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"observer",tabindex:"-1"},[s("Observer "),n("a",{class:"header-anchor",href:"#observer","aria-label":'Permalink to "Observer"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Observer”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Observer(data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.data = data;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.watch(data);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Observer.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor: Observer,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    watch: function (data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var _this = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object.keys(data).forEach(function (key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            _this.convert(key, data[key]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    convert: function (key, val) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.defineReactive(this.data, key, val);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    defineReactive: function (data, key, val) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var dep = new Dep();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var childObj = observe(val);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object.defineProperty(data, key, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            enumerable: true, // 可枚举")]),s(`
`),n("span",{class:"line"},[n("span",null,"            configurable: false, // 不能再define")]),s(`
`),n("span",{class:"line"},[n("span",null,"            get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (Dep.target) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    dep.depend();")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return val;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            set: function (newVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (newVal === val) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"                val = newVal;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 新的值是object的话，进行监听")]),s(`
`),n("span",{class:"line"},[n("span",null,"                childObj = observe(newVal);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 通知订阅者")]),s(`
`),n("span",{class:"line"},[n("span",null,"                dep.notify();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"function observe(value, vm) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!value || typeof value !== 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return new Observer(value);")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var uid = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Dep() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.id = uid++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.subs = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"Dep.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    addSub: function (sub) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.subs.push(sub);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    depend: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Dep.target.addDep(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    removeSub: function (sub) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var index = this.subs.indexOf(sub);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (index != -1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.subs.splice(index, 1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    notify: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.subs.forEach(function (sub) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            sub.update();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"Dep.target = null;")])])])])],-1)])])}const f=a(i,[["render",u]]);export{b as __pageData,f as default};
