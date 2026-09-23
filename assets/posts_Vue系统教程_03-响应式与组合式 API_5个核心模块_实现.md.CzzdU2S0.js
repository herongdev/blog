import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"实现","description":"围绕“实现”整理的概念、示例与实践笔记。","frontmatter":{"title":"实现","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“实现”整理的概念、示例与实践笔记。","sidebarWeight":13,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/5个核心模块/实现.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/5个核心模块/实现.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/5个核心模块/实现.md"}'),t={name:"posts/Vue系统教程/03-响应式与组合式 API/5个核心模块/实现.md"};function i(c,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"实现",tabindex:"-1"},[s("实现 "),n("a",{class:"header-anchor",href:"#实现","aria-label":'Permalink to "实现"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实现”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建")]),s(`
`),n("span",{class:"line"},[n("span",null,"runtime-core")]),s(`
`),n("span",{class:"line"},[n("span",null,"runtime-dom")]),s(`
`),n("span",{class:"line"},[n("span",null,"并使用npm init -y，初始化；")]),s(`
`),n("span",{class:"line"},[n("span",null,"记得修改package.json中的name值；")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建文件")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"修改script/dev.js")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"创建软链")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"结果为：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"运行yarn dev 后")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"实现createApp和h方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用举例")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建文件：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"nodeOps.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const nodeOps = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    createElement(tagName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return document.createElement(tagName)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    remove(child) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const parent = child.parentNode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (parent) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            parent.removeChild(child)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    querySelector(selector) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return document.querySelector(selector)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    insert(child, parent, anchor = null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        parent.insertBefore(child, anchor)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setElementText(el,text){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el.textContent = text; // innerHTML会有风险")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    createText(text){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return document.createTextNode(text);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setText(node,text){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        node.nodeValue = text")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"patchPorp.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,'import { patchAttr } from "./modules/attr";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { patchClass } from "./modules/class";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { patchEvent } from "./modules/event";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import { patchStyle } from "./modules/style";')])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"export const patchProp = (el, key, prevVal, nextVal) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    switch (key) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        case 'class': // dom操作 el.className")]),s(`
`),n("span",{class:"line"},[n("span",null,"            patchClass(el,nextVal)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        case 'style': // el.style.background")]),s(`
`),n("span",{class:"line"},[n("span",null,"            patchStyle(el, prevVal, nextVal); // 样式要比对前后")]),s(`
`),n("span",{class:"line"},[n("span",null,"            break;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        default:")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (/^on[a-z]/.test(key)) { // el.addEventListener")]),s(`
`),n("span",{class:"line"},[n("span",null,"                patchEvent(el,key,nextVal)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            } else { // el.setAttribute")]),s(`
`),n("span",{class:"line"},[n("span",null,"                patchAttr(el,key,nextVal)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"新建以下文件：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchClass(el,nextVal){")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if(nextVal == null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        nextVal = '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    el.className = nextVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"stye.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchStyle(el, prevVal, nextVal){")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const style = el.style; // 元素的样式")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if(nextVal == null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el.removeAttribute('style')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }else{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(prevVal){ // 之前有现在没有了 需要移除")]),s(`
`),n("span",{class:"line"},[n("span",null,"            for(let key in prevVal){")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 if(nextVal[key] == null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"                     style[key] = ''; // 样式给空就清除掉了")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for(let key in nextVal){")]),s(`
`),n("span",{class:"line"},[n("span",null,"            style[key] = nextVal[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"attr.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchAttr(el,key,nextVal){")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if(nextVal == null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el.removeAttribute(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }else{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        el.setAttribute(key,nextVal);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"events.ts")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function patchEvent(el, key, nextVal) { // onXXX")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const invokers = el._vei || (el._vei = {}); // 用来缓存绑定的事件")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const exists = invokers[key];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (exists && nextVal) { // el.addEventListener('click')")]),s(`
`),n("span",{class:"line"},[n("span",null,"        exists.value = nextVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const eventName = key.slice(2).toLowerCase();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (nextVal) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const fn = invokers[key] = createInvoker(nextVal);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            el.addEventListener(eventName,fn)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            el.removeEventListener(eventName, exists); //移除函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // let fn = () =》{ fn.xxx()}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // fn.xxx = preFn")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // el.addEventListenr(fn)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // fn.xxx = nextVal")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createInvoker(fn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const invoker = (e) => { invoker.value(e) }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    invoker.value = fn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return invoker;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(t,[["render",i]]);export{v as __pageData,g as default};
