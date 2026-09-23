import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Compile","description":"围绕“Compile”整理的概念、示例与实践笔记。","frontmatter":{"title":"Compile","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","原理与手写实现"],"description":"围绕“Compile”整理的概念、示例与实践笔记。","sidebarWeight":17,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理/剖析Vue实现原理 - 如何实现双向绑定mvvm/Compile.md"},"headers":[],"relativePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Compile.md","filePath":"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Compile.md"}'),i={name:"posts/Vue系统教程/05-原理与手写实现/剖析Vue实现原理 - 如何实现双向绑定mvvm/Compile.md"};function t(c,s,u,o,d,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"compile",tabindex:"-1"},[l("Compile "),n("a",{class:"header-anchor",href:"#compile","aria-label":'Permalink to "Compile"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Compile”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Compile(el, vm) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.$vm = vm;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    this.$el = this.isElementNode(el) ? el : document.querySelector(el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (this.$el) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.$fragment = this.node2Fragment(this.$el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.init();")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.$el.appendChild(this.$fragment);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Compile.prototype = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    constructor: Compile,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    node2Fragment: function (el) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var fragment = document.createDocumentFragment(),")]),l(`
`),n("span",{class:"line"},[n("span",null,"            child;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 将原生节点拷贝到fragment")]),l(`
`),n("span",{class:"line"},[n("span",null,"        while (child = el.firstChild) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            fragment.appendChild(child);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return fragment;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    init: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.compileElement(this.$fragment);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    compileElement: function (el) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var childNodes = el.childNodes,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            _this = this;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        [].slice.call(childNodes).forEach(function (node) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            var text = node.textContent;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            var reg = /\\{\\{(.*)\\}\\}/;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (_this.isElementNode(node)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                _this.compile(node);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            } else if (_this.isTextNode(node) && reg.test(text)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                _this.compileText(node, RegExp.$1.trim());")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (node.childNodes && node.childNodes.length) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                _this.compileElement(node);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    compile: function (node) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var nodeAttrs = node.attributes,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            _this = this;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        [].slice.call(nodeAttrs).forEach(function (attr) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            var attrName = attr.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (_this.isDirective(attrName)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                var exp = attr.value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"                var dir = attrName.substring(2);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                // 事件指令")]),l(`
`),n("span",{class:"line"},[n("span",null,"                if (_this.isEventDirective(dir)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    compileUtil.eventHandler(node, _this.$vm, exp, dir);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    // 普通指令")]),l(`
`),n("span",{class:"line"},[n("span",null,"                } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    compileUtil[dir] && compileUtil[dir](node, _this.$vm, exp);")]),l(`
`),n("span",{class:"line"},[n("span",null,"                }")]),l(`
`),n("span",{class:"line"},[n("span",null,"                node.removeAttribute(attrName);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    compileText: function (node, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        compileUtil.text(node, this.$vm, exp);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    isDirective: function (attr) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return attr.indexOf('v-') == 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    isEventDirective: function (dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return dir.indexOf('on') === 0;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    isElementNode: function (node) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return node.nodeType == 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    isTextNode: function (node) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return node.nodeType == 3;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 指令处理集合")]),l(`
`),n("span",{class:"line"},[n("span",null,"var compileUtil = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    text: function (node, vm, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.bind(node, vm, exp, 'text');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    html: function (node, vm, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.bind(node, vm, exp, 'html');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    model: function (node, vm, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.bind(node, vm, exp, 'model');")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var _this = this,")]),l(`
`),n("span",{class:"line"},[n("span",null,"            val = this._getVMVal(vm, exp);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        node.addEventListener('input', function (e) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            var newValue = e.target.value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (val === newValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                return;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"            _this._setVMVal(vm, exp, newValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"            val = newValue;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    class: function (node, vm, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.bind(node, vm, exp, 'class');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    bind: function (node, vm, exp, dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var updaterFn = updater[dir + 'Updater'];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        updaterFn && updaterFn(node, this._getVMVal(vm, exp));")]),l(`
`),n("span",{class:"line"},[n("span",null,"        new Watcher(vm, exp, function (value, oldValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            updaterFn && updaterFn(node, value, oldValue);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 事件处理")]),l(`
`),n("span",{class:"line"},[n("span",null,"    eventHandler: function (node, vm, exp, dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var eventType = dir.split(':')[1],")]),l(`
`),n("span",{class:"line"},[n("span",null,"            fn = vm.$options.methods && vm.$options.methods[exp];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (eventType && fn) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            node.addEventListener(eventType, fn.bind(vm), false);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    _getVMVal: function (vm, exp) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var val = vm;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        exp = exp.split('.');")]),l(`
`),n("span",{class:"line"},[n("span",null,"        exp.forEach(function (k) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            val = val[k];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return val;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    _setVMVal: function (vm, exp, value) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var val = vm;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        exp = exp.split('.');")]),l(`
`),n("span",{class:"line"},[n("span",null,"        exp.forEach(function (k, i) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            // 非最后一个key，更新val的值")]),l(`
`),n("span",{class:"line"},[n("span",null,"            if (i < exp.length - 1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                val = val[k];")]),l(`
`),n("span",{class:"line"},[n("span",null,"            } else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"                val[k] = value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"            }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        });")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var updater = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    textUpdater: function (node, value) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        node.textContent = typeof value == 'undefined' ? '' : value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    htmlUpdater: function (node, value) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        node.innerHTML = typeof value == 'undefined' ? '' : value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    classUpdater: function (node, value, oldValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var className = node.className;")]),l(`
`),n("span",{class:"line"},[n("span",null,"        className = className.replace(oldValue, '').replace(/\\s$/, '');")]),l(`
`),n("span",{class:"line"},[n("span",null,"        var space = className && String(value) ? ' ' : '';")]),l(`
`),n("span",{class:"line"},[n("span",null,"        node.className = className + space + value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    },")]),l(`
`),n("span",{class:"line"},[n("span",null,"    modelUpdater: function (node, value, oldValue) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        node.value = typeof value == 'undefined' ? '' : value;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")])])])])],-1)])])}const h=a(i,[["render",t]]);export{v as __pageData,h as default};
