import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse(`{"title":"Vue3 事件名匹配流程图","description":"视觉版（更形象） 记忆口诀 \\\\ emit 用驼峰，监听用短横 \\\\ 子组件 emit('myEvent') \\\\ 父组件 @my event \\"...\\"。","frontmatter":{"title":"Vue3 事件名匹配流程图","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","模板、组件与交互"],"description":"视觉版（更形象） 记忆口诀 \\\\ emit 用驼峰，监听用短横 \\\\ 子组件 emit('myEvent') \\\\ 父组件 @my event \\"...\\"。","sidebarWeight":107,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/自定义事件/Vue3 事件名匹配流程图.md"},"headers":[],"relativePath":"posts/Vue系统教程/02-模板、组件与交互/Vue3 事件名匹配流程图.md","filePath":"posts/Vue系统教程/02-模板、组件与交互/Vue3 事件名匹配流程图.md"}`),i={name:"posts/Vue系统教程/02-模板、组件与交互/Vue3 事件名匹配流程图.md"};function t(u,l,c,o,d,r){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"vue3-事件名匹配流程图",tabindex:"-1"},[s("Vue3 事件名匹配流程图 "),n("a",{class:"header-anchor",href:"#vue3-事件名匹配流程图","aria-label":'Permalink to "Vue3 事件名匹配流程图"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Vue3 事件名匹配流程图”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"          子组件 emit('myEvent')")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"        defineEmits(['myEvent'])")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"   Vue 内部事件注册表保存 'myEvent' (原样)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"        模板编译阶段（父组件模板）")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,'<Child @my-event="handler">   <-- 模板中的事件名会被编译成小写+kebab-case')]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,'   Vue 将 "my-event" 转换成 "myEvent" 去匹配注册的事件')]),s(`
`),n("span",{class:"line"},[n("span",null,"                  │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                  ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"          匹配成功 → 调用 handler()")])])])]),n("hr"),n("h3",{id:"视觉版-更形象",tabindex:"-1"},[s("视觉版（更形象） "),n("a",{class:"header-anchor",href:"#视觉版-更形象","aria-label":'Permalink to "视觉版（更形象）"'},"​")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," 子组件")]),s(`
`),n("span",{class:"line"},[n("span",null," ┌───────────────────────────────┐")]),s(`
`),n("span",{class:"line"},[n("span",null," │ emit('myEvent', data)         │")]),s(`
`),n("span",{class:"line"},[n("span",null," └───────────────┬───────────────┘")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"         Vue 保留原名 'myEvent'")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 ▼")]),s(`
`),n("span",{class:"line"},[n("span",null," 父组件模板")]),s(`
`),n("span",{class:"line"},[n("span",null," ┌───────────────────────────────┐")]),s(`
`),n("span",{class:"line"},[n("span",null,' │ <Child @my-event="onChild" /> │  ← 必须写成 kebab-case')]),s(`
`),n("span",{class:"line"},[n("span",null," └───────────────────────────────┘")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"   编译器将 my-event → myEvent 匹配 emit")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 ▼")]),s(`
`),n("span",{class:"line"},[n("span",null,"          调用 onChild(data)")])])])]),n("hr"),n("h3",{id:"记忆口诀",tabindex:"-1"},[s("记忆口诀 "),n("a",{class:"header-anchor",href:"#记忆口诀","aria-label":'Permalink to "记忆口诀"'},"​")]),n("p",null,[s("> "),n("strong",null,[n("strong",null,"emit 用驼峰，监听用短横")]),s(" > 子组件 "),n("code",null,"emit('myEvent')"),s(" > 父组件 "),n("code",null,'@my-event="..."')])],-1)])])}const v=a(i,[["render",t]]);export{h as __pageData,v as default};
