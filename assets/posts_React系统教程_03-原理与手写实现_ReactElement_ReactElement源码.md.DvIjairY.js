import{_ as s,o as a,c as t,j as e,a as n}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"ReactElement源码","description":"围绕“ReactElement源码”整理的概念、示例与实践笔记。","frontmatter":{"title":"ReactElement源码","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“ReactElement源码”整理的概念、示例与实践笔记。","sidebarWeight":5,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/ReactElement/ReactElement源码.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/ReactElement/ReactElement源码.md","filePath":"posts/React系统教程/03-原理与手写实现/ReactElement/ReactElement源码.md"}'),p={name:"posts/React系统教程/03-原理与手写实现/ReactElement/ReactElement源码.md"};function i(c,l,r,o,u,m){return a(),t("div",null,[...l[0]||(l[0]=[e("div",null,[e("h1",{id:"reactelement源码",tabindex:"-1"},[n("ReactElement源码 "),e("a",{class:"header-anchor",href:"#reactelement源码","aria-label":'Permalink to "ReactElement源码"'},"​")]),e("blockquote",null,[e("p",null,"本节目标：理解“ReactElement源码”的核心思路，并能把它用于实际开发或面试表达。")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span",null,"var ReactElement = function (type, key, ref, self, source, owner, props) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"  var element = {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // This tag allows us to uniquely identify this as a React Element")]),n(`
`),e("span",{class:"line"},[e("span",null,"    $$typeof: REACT_ELEMENT_TYPE,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // Built-in properties that belong on the element")]),n(`
`),e("span",{class:"line"},[e("span",null,"    type: type,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    key: key,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    ref: ref,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    props: props,")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // Record the component responsible for creating this element.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    _owner: owner")]),n(`
`),e("span",{class:"line"},[e("span",null,"  };")]),n(`
`),e("span",{class:"line"},[e("span",null,"  {")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // The validation flag is currently mutative. We put it on")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // an external backing store so that we can freeze the whole object.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // This can be replaced with a WeakMap once they are implemented in")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // commonly used development environments.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // the validation flag non-enumerable (where possible, which should")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // include every environment we run tests in), so the test framework")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // ignores it.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    Object.defineProperty(element._store, 'validated', {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      configurable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      enumerable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      writable: true,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      value: false")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }); // self and source are DEV only properties.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    Object.defineProperty(element, '_self', {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      configurable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      enumerable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      writable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      value: self")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }); // Two elements created in two different places should be considered")]),n(`
`),e("span",{class:"line"},[e("span",null,"    // equal for testing purposes and therefore we hide it from enumeration.")]),n(`
`),e("span",{class:"line"},[e("span",null,"    Object.defineProperty(element, '_source', {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      configurable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      enumerable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      writable: false,")]),n(`
`),e("span",{class:"line"},[e("span",null,"      value: source")]),n(`
`),e("span",{class:"line"},[e("span",null,"    });")]),n(`
`),e("span",{class:"line"},[e("span",null,"    if (Object.freeze) {")]),n(`
`),e("span",{class:"line"},[e("span",null,"      Object.freeze(element.props);")]),n(`
`),e("span",{class:"line"},[e("span",null,"      Object.freeze(element);")]),n(`
`),e("span",{class:"line"},[e("span",null,"    }")]),n(`
`),e("span",{class:"line"},[e("span",null,"  }")]),n(`
`),e("span",{class:"line"},[e("span",null,"  return element;")]),n(`
`),e("span",{class:"line"},[e("span",null,"};")])])])])],-1)])])}const h=s(p,[["render",i]]);export{f as __pageData,h as default};
