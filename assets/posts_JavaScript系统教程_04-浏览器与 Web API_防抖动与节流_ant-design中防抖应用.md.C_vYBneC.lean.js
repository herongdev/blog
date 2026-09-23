import{_ as a,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"ant-design中防抖应用","description":"围绕“ant-design中防抖应用”整理的概念、示例与实践笔记。","frontmatter":{"title":"ant-design中防抖应用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"围绕“ant-design中防抖应用”整理的概念、示例与实践笔记。","sidebarWeight":71,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/防抖动与节流/ant-design中防抖应用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/防抖动与节流/ant-design中防抖应用.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/防抖动与节流/ant-design中防抖应用.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/防抖动与节流/ant-design中防抖应用.md"};function p(o,s,c,r,d,u){return l(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"ant-design中防抖应用",tabindex:"-1"},[e("ant-design中防抖应用 "),n("a",{class:"header-anchor",href:"#ant-design中防抖应用","aria-label":'Permalink to "ant-design中防抖应用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“ant-design中防抖应用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import React, { PureComponent } from 'react';")]),e(`
`),n("span",{class:"line"},[n("span",null,"import Debounce from 'lodash-decorators/debounce';")]),e(`
`),n("span",{class:"line"},[n("span",null,"export default class GlobalHeader extends PureComponent {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    componentWillUnmount() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        this.triggerResizeEvent.cancel();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    /* eslint-disable*/")]),e(`
`),n("span",{class:"line"},[n("span",null,"    @Debounce(600)")]),e(`
`),n("span",{class:"line"},[n("span",null,"    triggerResizeEvent() {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        // eslint-disable-line")]),e(`
`),n("span",{class:"line"},[n("span",null,"        const event = document.createEvent('HTMLEvents');")]),e(`
`),n("span",{class:"line"},[n("span",null,"        event.initEvent('resize', true, false);")]),e(`
`),n("span",{class:"line"},[n("span",null,"        window.dispatchEvent(event);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    toggle = () => {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        const { collapsed, onCollapse } = this.props;")]),e(`
`),n("span",{class:"line"},[n("span",null,"        onCollapse(!collapsed);")]),e(`
`),n("span",{class:"line"},[n("span",null,"        this.triggerResizeEvent();")]),e(`
`),n("span",{class:"line"},[n("span",null,"    };")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=a(i,[["render",p]]);export{v as __pageData,m as default};
