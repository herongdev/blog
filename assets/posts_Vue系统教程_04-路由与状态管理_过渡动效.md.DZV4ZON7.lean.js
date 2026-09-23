import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"过渡动效","description":"\\\\<router view\\\\ 是基本的动态组件，所以我们可以用 \\\\<transition\\\\ 组件给它添加一些过渡效果： \\\\<transition\\\\ \\\\<router view\\\\ \\\\</router view\\\\ \\\\</transition\\\\ 在这里同样适用。 \\\\ 来自。","frontmatter":{"title":"过渡动效","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"\\\\<router view\\\\ 是基本的动态组件，所以我们可以用 \\\\<transition\\\\ 组件给它添加一些过渡效果： \\\\<transition\\\\ \\\\<router view\\\\ \\\\</router view\\\\ \\\\</transition\\\\ 在这里同样适用。 \\\\ 来自。","sidebarWeight":64,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vueRouter/过渡动效.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/过渡动效.md","filePath":"posts/Vue系统教程/04-路由与状态管理/过渡动效.md"}'),i={name:"posts/Vue系统教程/04-路由与状态管理/过渡动效.md"};function p(o,a,r,u,c,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"过渡动效",tabindex:"-1"},[s("过渡动效 "),n("a",{class:"header-anchor",href:"#过渡动效","aria-label":'Permalink to "过渡动效"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“过渡动效”的核心思路，并能把它用于实际开发或面试表达。 <router-view> 是基本的动态组件，所以我们可以用 <transition> 组件给它添加一些过渡效果： <transition> <router-view></router-view> </transition> 在这里同样适用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**单个路由的过渡**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用 <transition> 并设置不同的 name。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const Foo = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  template: `")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <transition name="slide">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div class="foo">...</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </transition>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  `")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const Bar = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  template: `")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <transition name="fade">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div class="bar">...</div>')]),s(`
`),n("span",{class:"line"},[n("span",null,"    </transition>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  `")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**基于路由的动态过渡**")]),s(`
`),n("span",{class:"line"},[n("span",null,"还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"<!-- 使用动态的 transition name -->")]),s(`
`),n("span",{class:"line"},[n("span",null,'<transition :name="transitionName">')]),s(`
`),n("span",{class:"line"},[n("span",null,"  <router-view></router-view>")]),s(`
`),n("span",{class:"line"},[n("span",null,"</transition>")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 接着在父组件内")]),s(`
`),n("span",{class:"line"},[n("span",null,"// watch $route 决定使用哪种过渡")]),s(`
`),n("span",{class:"line"},[n("span",null,"watch: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  '$route' (to, from) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const toDepth = to.path.split('/').length")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const fromDepth = from.path.split('/').length")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看完整例子请[移步这里](https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js)。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1>")])])])])],-1)])])}const m=l(i,[["render",p]]);export{v as __pageData,m as default};
