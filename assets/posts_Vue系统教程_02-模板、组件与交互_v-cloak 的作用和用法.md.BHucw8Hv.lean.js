import{_ as a,o as e,c as p,j as l,a as s}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"v-cloak 的作用和用法","description":"v cloak 的作用和用法 可用 v text 替换 但是有区别 用法： 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。官方 AP。","frontmatter":{"title":"v-cloak 的作用和用法","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","模板、组件与交互"],"description":"v cloak 的作用和用法 可用 v text 替换 但是有区别 用法： 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。官方 AP。","sidebarWeight":23,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/api/v-cloak 的作用和用法.md"},"headers":[],"relativePath":"posts/Vue系统教程/02-模板、组件与交互/v-cloak 的作用和用法.md","filePath":"posts/Vue系统教程/02-模板、组件与交互/v-cloak 的作用和用法.md"}'),t={name:"posts/Vue系统教程/02-模板、组件与交互/v-cloak 的作用和用法.md"};function i(c,n,o,u,d,v){return e(),p("div",null,[...n[0]||(n[0]=[l("div",null,[l("h1",{id:"v-cloak-的作用和用法",tabindex:"-1"},[s("v-cloak 的作用和用法 "),l("a",{class:"header-anchor",href:"#v-cloak-的作用和用法","aria-label":'Permalink to "v-cloak 的作用和用法"'},"​")]),l("blockquote",null,[l("p",null,"本节目标：理解“v-cloak 的作用和用法”的核心思路，并能把它用于实际开发或面试表达。")]),l("blockquote",null,[l("p",null,[s("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 "),l("code",null,"v-cloak"),s(),l("strong",null,"的作用和用法"),s(),l("strong",null,"可用"),l("code",null,"v-text"),s(),l("strong",null,"替换"),s(),l("strong",null,"但是有区别"),s(" 用法： 这个指令保持在元素上直到关联实例结束编译。和 "),l("code",null,"CSS"),s(" 规则如 "),l("code",null,"[v-cloak] { display: none }"),s(" 一起用时，这个指令可以隐藏未编译的 "),l("code",null,"Mustache"),s(" 标签直到实例准备完毕。"),l("a",{href:"https://cn.vuejs.org/v2/api/#v-cloak",target:"_blank",rel:"noreferrer"},"官方"),l("code",null,"API")])]),l("table",{tabindex:"0"},[l("thead",null,[l("tr",null,[l("th")])]),l("tbody",null,[l("tr",null,[l("td",null,"```")]),l("tr",null,[l("td",null,'<div id="app">')])])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")])])])]),l("p",null,"{{msg}} </div>"),l("div",{class:"language-text vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"text"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"|")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"`HTML` 绑定 `Vue`实例，在页面加载时会闪烁")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"然后才会出现 加载完成 字样，为了效果更明显，我们可以延后加载 `Vue` 实例")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"|   |")]),s(`
`),l("span",{class:"line"},[l("span",null,"|---|")]),s(`
`),l("span",{class:"line"},[l("span",null,"|`setTimeout(() =\\> {`")]),s(`
`),l("span",{class:"line"},[l("span",null,"  `new` `Vue({`")])])])]),l("p",null,"el: '#app',"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"    `data: {`")])])])]),l("p",null,"msg: 'hello'"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"    `}`")])])])]),l("p",null,"}) },2000)"),l("div",{class:"language-text vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"text"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"|")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"`v-cloak` 可以解决这一问题，在 `css` 中加上")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"|   |")]),s(`
`),l("span",{class:"line"},[l("span",null,"|---|")]),s(`
`),l("span",{class:"line"},[l("span",null,"|`[v-cloak] {`")])])])]),l("p",null,"display: none; }"),l("div",{class:"language-text vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"},"text"),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"|")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"在 `html` 中的加载点加上 `v-cloak`，就可以解决这一问题")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"|   |")]),s(`
`),l("span",{class:"line"},[l("span",null,"|---|")]),s(`
`),l("span",{class:"line"},[l("span",null,"|```")]),s(`
`),l("span",{class:"line"},[l("span",null,'<div id="app"')])])])]),l("p",null,[l("code",null,"v-cloak\\>")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"{{msg}}")]),s(`
`),l("span",{class:"line"},[l("span",null,"</div>")]),s(`
`),l("span",{class:"line"},[l("span",null,"```text")]),s(`
`),l("span",{class:"line"},[l("span",null,"|")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"`Vue1.x` **与** `Vue2` **中** `v-cloak` **的不同**")]),s(`
`),l("span",{class:"line"},[l("span",null,"`Vue1` 中，允许将 `Vue` 实例挂载在 `body` 上，而 `Vue2` 是不允许的，想对整个页面实例化，需要另外用一个 `div` 来容纳整个页面内容，对其进行实例化")]),s(`
`),l("span",{class:"line"},[l("span",null,"这样在使用 `v-cloak` 时，同样需要用到这种方法")]),s(`
`),l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,"**为什么我用的** `v-cloak` **无效？**")]),s(`
`),l("span",{class:"line"},[l("span",null,"在实际项目中，我们常通过 `@import` 来加载 `css` 文件")])])])]),l("p",null,"@import"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")])])])]),l("p",null,'"style.css" @import'),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")]),s(`
`),l("span",{class:"line"},[l("span",null,' `"index.css"`')]),s(`
`),l("span",{class:"line"},[l("span",null,"而 `@import` 是在页面 `DOM` 完全载入后才会进行加载，如果我们将 `[v-cloak]` 写在 `@import` 加载的 `css` 文件中，就会导致页面仍旧闪烁。")]),s(`
`),l("span",{class:"line"},[l("span",null,"为了避免这种情况，我们可以将 `[v-cloak]` 写在 `link` 引入的 `css` 中，或者写一个内联 `css` 样式，这样就得到了解决。")])])])])],-1)])])}const g=a(t,[["render",i]]);export{r as __pageData,g as default};
