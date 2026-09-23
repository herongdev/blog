import{_ as e,o as a,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"createElement","description":"围绕“createElement”整理的概念、示例与实践笔记。","frontmatter":{"title":"createElement","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“createElement”整理的概念、示例与实践笔记。","sidebarWeight":17,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/JSX介绍/createElement.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/JSX介绍/createElement.md","filePath":"posts/React系统教程/01-核心概念与组件/JSX介绍/createElement.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/JSX介绍/createElement.md"};function c(i,s,r,u,o,m){return a(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"createelement",tabindex:"-1"},[l("createElement "),n("a",{class:"header-anchor",href:"#createelement","aria-label":'Permalink to "createElement"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“createElement”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import { REACT_ELEMENT_TYPE } from './ReactSymbols';")]),l(`
`),n("span",{class:"line"},[n("span",null,"import { Component } from './ReactBaseClasses';")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," *")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} type 元素的类型")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} config 配置对象")]),l(`
`),n("span",{class:"line"},[n("span",null," * @param {*} children 大儿子")]),l(`
`),n("span",{class:"line"},[n("span",null," */")]),l(`
`),n("span",{class:"line"},[n("span",null,"const RESERVED_PROPS = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    key: true,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    ref: true,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    __self: true,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    __source: true,")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"export function createElement(type, config, children) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const props = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //key是用来标识每一个稳定的元素的")]),l(`
`),n("span",{class:"line"},[n("span",null,"    let key = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (config !== null) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        key = config.key;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (let propName in config) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        if (!RESERVED_PROPS.hasOwnProperty(propName)) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            props[propName] = config[propName];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const childrenLength = arguments.length - 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    if (childrenLength === 1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props.children = children;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    } else if (childrenLength > 1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        const childArray = Array(childrenLength);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        for (let i = 0; i < childrenLength; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            childArray[i] = arguments[i + 2];")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props.children = childArray;")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //React.createElement方法返回是一个普通的JS对象，它可以描述元素样子，它就是所谓的虚拟DOm/")]),l(`
`),n("span",{class:"line"},[n("span",null,"    //虚拟DOM是跨平台，跟平台无关")]),l(`
`),n("span",{class:"line"},[n("span",null,"    const element = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        $$typeof: REACT_ELEMENT_TYPE,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        type,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        key,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        props")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return element;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"const React = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    createElement,")]),l(`
`),n("span",{class:"line"},[n("span",null,"    Component")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"export default React;")]),l(`
`),n("span",{class:"line"},[n("span",null,"/**")]),l(`
`),n("span",{class:"line"},[n("span",null," * children")]),l(`
`),n("span",{class:"line"},[n("span",null," * 有可能是一个元素，也有可能是一个字符串，也有可能是一个数字 NULL")]),l(`
`),n("span",{class:"line"},[n("span",null," * 有可能有一个儿子，也有可能没有儿子，也有可能有多个儿子")]),l(`
`),n("span",{class:"line"},[n("span",null," * props.children = null|string|number|React元素  [ null|string|number|React元素 ]")]),l(`
`),n("span",{class:"line"},[n("span",null," * ReactNode ReactElement")]),l(`
`),n("span",{class:"line"},[n("span",null," * ReactNode 表示一个可以渲染的值  null|string|number|React元素")]),l(`
`),n("span",{class:"line"},[n("span",null," */")])])])])],-1)])])}const E=e(t,[["render",c]]);export{h as __pageData,E as default};
