import{_ as e,o as a,c as p,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"vue中涉及的字符串模板与dom模板","description":"字符串模板 字符串模板就是写在 vue 中的 template 中定义的模板，如 .vue 的单文件组件模板和定义组件时 template 属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被 vue 进行解析编译之后再被浏览器渲染，所以不受限于 html 结构和标签的命。","frontmatter":{"title":"vue中涉及的字符串模板与dom模板","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"字符串模板 字符串模板就是写在 vue 中的 template 中定义的模板，如 .vue 的单文件组件模板和定义组件时 template 属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被 vue 进行解析编译之后再被浏览器渲染，所以不受限于 html 结构和标签的命。","sidebarWeight":24,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/基础/vue中涉及的字符串模板与dom模板.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/vue中涉及的字符串模板与dom模板.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/vue中涉及的字符串模板与dom模板.md"}'),t={name:"posts/Vue系统教程/01-快速开始与工程环境/vue中涉及的字符串模板与dom模板.md"};function i(c,s,u,o,d,h){return a(),p("div",null,[...s[0]||(s[0]=[l("div",null,[l("h1",{id:"vue中涉及的字符串模板与dom模板",tabindex:"-1"},[n("vue中涉及的字符串模板与dom模板 "),l("a",{class:"header-anchor",href:"#vue中涉及的字符串模板与dom模板","aria-label":'Permalink to "vue中涉及的字符串模板与dom模板"'},"​")]),l("blockquote",null,[l("p",null,[n("本节目标：理解“vue中涉及的字符串模板与dom模板”的核心思路，并能把它用于实际开发或面试表达。 字符串模板 字符串模板就是写在"),l("code",null,"vue"),n("中的"),l("code",null,"template"),n("中定义的模板，如"),l("code",null,".vue"),n("的单文件组件模板和定义组件时"),l("code",null,"template"),n("属性值的模板。字符串模板不会在页面初始化参与页面的渲染，会被"),l("code",null,"vue"),n("进行解析编译之后再被浏览器渲染，所以不受限于"),l("code",null,"html"),n("结构和标签的命名。 "),l("code",null,"dom"),n("模板"),l("code",null,"("),n("或者称为"),l("code",null,"Html"),n("模板")])]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,")")]),n(`
`),l("span",{class:"line"},[l("span",null,"dom")])])])]),l("p",null,[n("模板就是写在"),l("code",null,"html"),n("文件中，一打开就会被浏览器进行解析渲染的，所以要遵循"),l("code",null,"html"),n("结构和标签的命名，否则浏览器不解析也就不能获取内容了。 下面的例子不会被正确渲染"),l("code",null,","),n(" 会被解析成"),l("code",null,"mycomponent,"),n("但是注册的"),l("code",null,"vue"),n("的组件是"),l("code",null,"MyComponent"),n("，因此无法渲染。")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<!DOCTYPE html>")]),n(`
`),l("span",{class:"line"},[l("span",null,"<head>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <meta charset="utf-8">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <title>Vue Component</title>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</head>")]),n(`
`),l("span",{class:"line"},[l("span",null,"<body>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <div id="app">')]),n(`
`),l("span",{class:"line"},[l("span",null,"    Hello Vue")]),n(`
`),l("span",{class:"line"},[l("span",null,"    <MyComponent></MyComponent>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"><\/script>')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <script>")]),n(`
`),l("span",{class:"line"},[l("span",null,"    //")])])])]),l("p",null,"全局注册"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"    Vue.component('MyComponent', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      template: '<div>")])])])]),l("p",null,"组件类容"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</div>'")]),n(`
`),l("span",{class:"line"},[l("span",null,"    });")]),n(`
`),l("span",{class:"line"},[l("span",null,"    new Vue({")]),n(`
`),l("span",{class:"line"},[l("span",null,"      el: '#app'")]),n(`
`),l("span",{class:"line"},[l("span",null,"    });")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <\/script>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</body>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</html>")])])])]),l("p",null,"所以，下面的例子就可以正常显示了："),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"<!DOCTYPE <html>")]),n(`
`),l("span",{class:"line"},[l("span",null,"<head>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <meta charset="utf-8">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <title>Vue Component</title>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</head>")]),n(`
`),l("span",{class:"line"},[l("span",null,"<body>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <div id="app">Hello Vue')]),n(`
`),l("span",{class:"line"},[l("span",null,"    <my-component></my-component>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  </div>")]),n(`
`),l("span",{class:"line"},[l("span",null,'  <script src="https: //cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js">')]),n(`
`),l("span",{class:"line"},[l("span",null,"  <\/script>")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <script>//")])])])]),l("p",null,"全局注册"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"    Vue.component('my-component', {")]),n(`
`),l("span",{class:"line"},[l("span",null,"      template: '<div>")])])])]),l("p",null,"组件类容"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"</div>'")]),n(`
`),l("span",{class:"line"},[l("span",null,"    });")]),n(`
`),l("span",{class:"line"},[l("span",null,"    new Vue({")]),n(`
`),l("span",{class:"line"},[l("span",null,"      el: '#app'")]),n(`
`),l("span",{class:"line"},[l("span",null,"    });")]),n(`
`),l("span",{class:"line"},[l("span",null,"  <\/script>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</body>")]),n(`
`),l("span",{class:"line"},[l("span",null,"</html>")])])])]),l("p",null,[n("因为"),l("code",null,"html"),n("对大小写不敏感，所以在"),l("code",null,"DOM"),n("模板中使用组件必须使用"),l("code",null,"kebab-case"),n("命名法"),l("code",null,"("),n("短横线命名"),l("code",null,")"),n("。")]),l("p",null,[n("因此"),l("code",null,","),n("对于组件名称的命名，可参考如下实现： 一、在单文件组件、"),l("code",null,"JSX"),n("和字符串模板中：")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"PascalCase")]),n(`
`),l("span",{class:"line"},[l("span",null,"<MyComponent/>")])])])]),l("p",null,[n("二、在 "),l("code",null,"DOM"),n(" 模板中")]),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,":kebab-case")]),n(`
`),l("span",{class:"line"},[l("span",null,"<my-component></my-component>")])])])]),l("p",null,"三、或者在所有地方:"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span",null,"kebab-case")]),n(`
`),l("span",{class:"line"},[l("span",null,"<my-component></my-component>")])])])])],-1)])])}const r=e(t,[["render",i]]);export{v as __pageData,r as default};
