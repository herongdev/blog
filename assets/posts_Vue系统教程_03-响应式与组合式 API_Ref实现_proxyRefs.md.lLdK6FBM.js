import{_ as l,o as a,c as t,j as e,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"proxyRefs","description":"围绕“proxyRefs”整理的概念、示例与实践笔记。","frontmatter":{"title":"proxyRefs","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"围绕“proxyRefs”整理的概念、示例与实践笔记。","sidebarWeight":23,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/Ref实现/proxyRefs.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/proxyRefs.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/proxyRefs.md"}'),r={name:"posts/Vue系统教程/03-响应式与组合式 API/Ref实现/proxyRefs.md"};function p(o,n,u,i,c,f){return a(),t("div",null,[...n[0]||(n[0]=[e("div",null,[e("h1",{id:"proxyrefs",tabindex:"-1"},[s("proxyRefs "),e("a",{class:"header-anchor",href:"#proxyrefs","aria-label":'Permalink to "proxyRefs"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“proxyRefs”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"把ref变回为proxy；")]),s(`
`),e("span",{class:"line"},[e("span",null,"如果是取值操作，是ref就取ref.value;")]),s(`
`),e("span",{class:"line"},[e("span",null,"如果是赋值操作，是ref就设置ref.value=newValue")]),s(`
`),e("span",{class:"line"},[e("span",null,"export function proxyRefs(object) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"  return new Proxy(object, {")]),s(`
`),e("span",{class:"line"},[e("span",null,"    get(target, key, recevier) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      let r = Reflect.get(target, key, recevier);")]),s(`
`),e("span",{class:"line"},[e("span",null,"      return r.__v_isRef ? r.value : r")]),s(`
`),e("span",{class:"line"},[e("span",null,"    },")]),s(`
`),e("span",{class:"line"},[e("span",null,"    set(target, key, value, recevier) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"      let oldValue = target[key];")]),s(`
`),e("span",{class:"line"},[e("span",null,"      if (oldValue.__v_isRef) {")]),s(`
`),e("span",{class:"line"},[e("span",null,"        oldValue.value = value;")]),s(`
`),e("span",{class:"line"},[e("span",null,"        return true;")]),s(`
`),e("span",{class:"line"},[e("span",null,"      } else {")]),s(`
`),e("span",{class:"line"},[e("span",null,"        return Reflect.set(target, key, value, recevier);")]),s(`
`),e("span",{class:"line"},[e("span",null,"      }")]),s(`
`),e("span",{class:"line"},[e("span",null,"    }")]),s(`
`),e("span",{class:"line"},[e("span",null,"  })")]),s(`
`),e("span",{class:"line"},[e("span",null,"}")])])])])],-1)])])}const y=l(r,[["render",p]]);export{x as __pageData,y as default};
