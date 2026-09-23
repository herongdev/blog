import{_ as e,o as a,c as p,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"React","description":"创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 里没有 ref 属性的 可能是 React 元素对象，也可能是一个字符串 数字 元素 函数。","frontmatter":{"title":"React","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 里没有 ref 属性的 可能是 React 元素对象，也可能是一个字符串 数字 元素 函数。","sidebarWeight":30,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实现/8.基本生命周期 /React.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/8.基本生命周期/React.md","filePath":"posts/React系统教程/03-原理与手写实现/8.基本生命周期/React.md"}'),t={name:"posts/React系统教程/03-原理与手写实现/8.基本生命周期/React.md"};function i(c,s,o,u,d,r){return a(),p("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"react",tabindex:"-1"},[n("React "),l("a",{class:"header-anchor",href:"#react","aria-label":'Permalink to "React"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“React”的核心思路，并能把它用于实际开发或面试表达。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"import { wrapToVdom } from './utils';")]),n(`
`),l("span",{class:"line"},[l("span",null,"import Component from './Component';")]),n(`
`),l("span",{class:"line"},[l("span",null,"import { REACT_ELEMENT, REACT_FORWARD_REF } from './constants';")]),n(`
`),l("span",{class:"line"},[l("span",null,"/**")]),n(`
`),l("span",{class:"line"},[l("span",null," * createElement('h1',null,'a','b');")]),n(`
`),l("span",{class:"line"},[l("span",null," *")])])])]),l("p",null,[n("创建一个虚拟"),l("code",null,"DOM"),n("，也就是一个"),l("code",null,"React"),n("元素")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," * @param {*} type")])])])]),l("p",null,"元素的类型"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"span div p")]),n(`
`),l("span",{class:"line"},[l("span",null," * @param {*} config")])])])]),l("p",null,"配置对象"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," className style")]),n(`
`),l("span",{class:"line"},[l("span",null," * @param {*} children")])])])]),l("p",null,[n("儿子，有可能独生子"),l("code",null,"("),n("对象"),l("code",null,")"),n("，也可能是多个"),l("code",null,"("),n("数组")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,")")]),n(`
`),l("span",{class:"line"},[l("span",null," */")]),n(`
`),l("span",{class:"line"},[l("span",null,"function createElement(type, config, children) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    let ref;//")])])])]),l("p",null,[n("可以通过 "),l("code",null,"ref"),n("引用此元素")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"    let key;//")])])])]),l("p",null,"可以唯一标识一个子元素"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"    if (config) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        delete config.__source;")]),n(`
`),l("span",{class:"line"},[l("span",null,"        delete config.__self;")]),n(`
`),l("span",{class:"line"},[l("span",null,"        ref = config.ref;")]),n(`
`),l("span",{class:"line"},[l("span",null,"        key = config.key;")]),n(`
`),l("span",{class:"line"},[l("span",null,"        delete config.ref;//props")])])])]),l("p",null,[n("里没有"),l("code",null,"ref"),n("属性的")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"        delete config.key;")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    let props = { ...config };")]),n(`
`),l("span",{class:"line"},[l("span",null,"    if (arguments.length > 3) {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);")]),n(`
`),l("span",{class:"line"},[l("span",null,"    } else {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        props.children = wrapToVdom(children);//children")])])])]),l("p",null,[n("可能是"),l("code",null,"React"),n("元素对象，也可能是一个字符串 数字")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," null undefined")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return { $$typeof: REACT_ELEMENT, type, ref, key, props };//React")])])])]),l("p",null,"元素"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"function createRef() {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return { current: null };")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"function forwardRef(render) {//TODO")]),n(`
`),l("span",{class:"line"},[l("span",null,"    return {")]),n(`
`),l("span",{class:"line"},[l("span",null,"        $$typeof: REACT_FORWARD_REF,")]),n(`
`),l("span",{class:"line"},[l("span",null,"        render //")])])])]),l("p",null,"函数组件"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null," TextInput(props, forwardRef)")]),n(`
`),l("span",{class:"line"},[l("span",null,"    }")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"const React = {")]),n(`
`),l("span",{class:"line"},[l("span",null,"    createElement,")]),n(`
`),l("span",{class:"line"},[l("span",null,"    Component,")]),n(`
`),l("span",{class:"line"},[l("span",null,"    createRef,")]),n(`
`),l("span",{class:"line"},[l("span",null,"    forwardRef")]),n(`
`),l("span",{class:"line"},[l("span",null,"}")]),n(`
`),l("span",{class:"line"},[l("span",null,"export default React;")])])])])],-1)])])}const v=e(t,[["render",i]]);export{g as __pageData,v as default};
