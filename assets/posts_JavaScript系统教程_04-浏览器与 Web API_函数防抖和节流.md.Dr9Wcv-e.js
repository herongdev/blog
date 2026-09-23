import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"函数防抖和节流","description":"防抖：短时间内多次触发同一个事件，只执行最后一次，或者在开始时执行，中间不执行。比如公交车上车，要等待最后一个乘客上车； 节流：节流是连续触发事件的过程中以一定时间间隔执行函数。节流会稀释你的执行频率，比如每间隔 1 秒钟，只会执行一次函数，无论这 1 秒钟内触发了多少次事件。","frontmatter":{"title":"函数防抖和节流","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","浏览器与 Web API"],"description":"防抖：短时间内多次触发同一个事件，只执行最后一次，或者在开始时执行，中间不执行。比如公交车上车，要等待最后一个乘客上车； 节流：节流是连续触发事件的过程中以一定时间间隔执行函数。节流会稀释你的执行频率，比如每间隔 1 秒钟，只会执行一次函数，无论这 1 秒钟内触发了多少次事件。","sidebarWeight":55,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/DOM/函数防抖和节流.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/04-浏览器与 Web API/函数防抖和节流.md","filePath":"posts/JavaScript系统教程/04-浏览器与 Web API/函数防抖和节流.md"}'),i={name:"posts/JavaScript系统教程/04-浏览器与 Web API/函数防抖和节流.md"};function p(o,e,c,r,u,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"函数防抖和节流",tabindex:"-1"},[s("函数防抖和节流 "),n("a",{class:"header-anchor",href:"#函数防抖和节流","aria-label":'Permalink to "函数防抖和节流"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“函数防抖和节流”的核心思路，并能把它用于实际开发或面试表达。 防抖：短时间内多次触发同一个事件，只执行最后一次，或者在开始时执行，中间不执行。比如公交车上车，要等待最后一个乘客上车； 节流：节流是连续触发事件的过程中以一定时间间隔执行函数。节流会稀释你的执行频率，比如每间隔"),n("code",null,"1"),s("秒钟，只会执行一次函数，无论这"),n("code",null,"1"),s("秒钟内触发了多少次事件；")])]),n("p",null,"都为解决高频事件而来，"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," scroll mousewhell mousemover touchmove onresize")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ant-design-pro globalPageHeader")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React, { PureComponent } from 'react';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { Icon } from 'antd';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Link from 'umi/link';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Debounce from 'lodash-decorators/debounce';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import styles from './index.less';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import RightContent from './RightContent';")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class GlobalHeader extends PureComponent {")]),s(`
`),n("span",{class:"line"},[n("span",null,"componentWillUnmount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.triggerResizeEvent.cancel();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* eslint-disable*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Debounce(600)")]),s(`
`),n("span",{class:"line"},[n("span",null,"triggerResizeEvent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// eslint-disable-line")]),s(`
`),n("span",{class:"line"},[n("span",null,"const event = document.createEvent('HTMLEvents');")]),s(`
`),n("span",{class:"line"},[n("span",null,"event.initEvent('resize', true, false);")]),s(`
`),n("span",{class:"line"},[n("span",null,"window.dispatchEvent(event);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"toggle = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"const { collapsed, onCollapse } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"onCollapse(!collapsed);")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.triggerResizeEvent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])])],-1)])])}const v=l(i,[["render",p]]);export{h as __pageData,v as default};
