import{_ as e,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"字体图标使用","description":"如果图标未显示出来，有可能是样式问题， IconFont 内啊的 svg 图片默认样式为 1em ，即父元素的 fontsize 的大小，因此可以设置一下样式，就可能显示出来了。 渲染结果。","frontmatter":{"title":"字体图标使用","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","性能与实战"],"description":"如果图标未显示出来，有可能是样式问题， IconFont 内啊的 svg 图片默认样式为 1em ，即父元素的 fontsize 的大小，因此可以设置一下样式，就可能显示出来了。 渲染结果。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/应用/字体图标使用.md"},"headers":[],"relativePath":"posts/React系统教程/05-性能与实战/字体图标使用.md","filePath":"posts/React系统教程/05-性能与实战/字体图标使用.md"}'),i={name:"posts/React系统教程/05-性能与实战/字体图标使用.md"};function p(c,l,o,u,d,r){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"字体图标使用",tabindex:"-1"},[s("字体图标使用 "),n("a",{class:"header-anchor",href:"#字体图标使用","aria-label":'Permalink to "字体图标使用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“字体图标使用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"import {  Icon } from 'antd';")]),s(`
`),n("span",{class:"line"},[n("span",null,"const IconFont = Icon.createFromIconfontCN({")]),s(`
`),n("span",{class:"line"},[n("span",null,"    scriptUrl: '//at.alicdn.com/t/font_1850507_vweltrt6qrg.js'")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const genExtraIcon = () => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <IconFont")]),s(`
`),n("span",{class:"line"},[n("span",null,'        type="icon-liangdu"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        rotate={90}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        onClick={event => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            event.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            setState({ ...state, theme: !state.theme });")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // console.log(state.theme);")]),s(`
`),n("span",{class:"line"},[n("span",null,'            // console.log("genExtraIcon");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("p",null,[s("如果图标未显示出来，有可能是样式问题，"),n("code",null,"IconFont"),s("内啊的"),n("code",null,"svg"),s("图片默认样式为"),n("code",null,"1em"),s("，即父元素的"),n("code",null,"fontsize"),s("的大小，因此可以设置一下样式，就可能显示出来了。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"<IconFont")]),s(`
`),n("span",{class:"line"},[n("span",null,'    type="ico-maintenanceDel"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    style={{ fontSize: 16 }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    onClick={(e) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        e.stopPropagation();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        handleFileManagerDelete(uId);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/>")])])])]),n("p",null,"渲染结果"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'<i style="font-size: 16px;" tabindex="-1" class="anticon">')]),s(`
`),n("span",{class:"line"},[n("span",null,'    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">')]),s(`
`),n("span",{class:"line"},[n("span",null,'        <use xlink:href="#ico-maintenanceDel"></use>')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </svg>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</i>")])])])])],-1)])])}const m=e(i,[["render",p]]);export{g as __pageData,m as default};
