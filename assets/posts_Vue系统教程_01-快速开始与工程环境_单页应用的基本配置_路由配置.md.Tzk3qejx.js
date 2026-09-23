import{_ as l,o as a,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"路由配置","description":"默认路由模式是 hash 模式，会携带 标记，与真实 url 不符，可以改为 history 模式。","frontmatter":{"title":"路由配置","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"默认路由模式是 hash 模式，会携带 标记，与真实 url 不符，可以改为 history 模式。","sidebarWeight":50,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/安装配置/单页应用的基本配置/路由配置.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/路由配置.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/路由配置.md"}'),u={name:"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/路由配置.md"};function t(i,e,o,c,r,h){return a(),p("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"路由配置",tabindex:"-1"},[n("路由配置 "),s("a",{class:"header-anchor",href:"#路由配置","aria-label":'Permalink to "路由配置"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“路由配置”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"由于 Vue 这类型的框架都是以一个或多个单页构成，在单页内部跳转并不会重新渲染 HTML 文件，其路由可以由前端进行控制，因此我们需要在项目内部编写相应的路由文件，Vue 会解析这些文件中的配置并进行对应的跳转渲染。")]),n(`
`),s("span",{class:"line"},[s("span",null,"我们来看一下 CLI 给我们生成的 router.js 文件的配置：")]),n(`
`),s("span",{class:"line"},[s("span",null,"/* router.js */")]),n(`
`),s("span",{class:"line"},[s("span",null,"import Vue from 'vue'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import Router from 'vue-router'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import Home from './views/Home.vue' // 引入 Home 组件")]),n(`
`),s("span",{class:"line"},[s("span",null,"import About from './views/About.vue' // 引入 About 组件")]),n(`
`),s("span",{class:"line"},[s("span",null,"Vue.use(Router) // 注册路由")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default new Router({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  routes: [{")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: '/',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    name: 'home',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    component: Home")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }, {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: '/about',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    name: 'about',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    component: About")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }]")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"这份配置可以算是最基础的路由配置，有以下几点需要进行优化：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,'如果路由存在二级目录，需要添加 base 属性，否则默认为 "/"')])])])]),s("p",null,"默认路由模式是 hash 模式，会携带 # 标记，与真实 url 不符，可以改为 history 模式"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"页面组件没有进行按需加载，可以使用 ==require.ensure()== 来进行优化")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面是我们优化结束的代码：")]),n(`
`),s("span",{class:"line"},[s("span",null,"/* router.js */")]),n(`
`),s("span",{class:"line"},[s("span",null,"import Vue from 'vue'")]),n(`
`),s("span",{class:"line"},[s("span",null,"import Router from 'vue-router'")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 引入 Home 组件")]),n(`
`),s("span",{class:"line"},[s("span",null,"const Home = resolve => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  require.ensure(['./views/Home.vue'], () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    resolve(require('./views/Home.vue'))")]),n(`
`),s("span",{class:"line"},[s("span",null,"  })")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 引入 About 组件")]),n(`
`),s("span",{class:"line"},[s("span",null,"const About = resolve => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  require.ensure(['./views/About.vue'], () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    resolve(require('./views/About.vue'))")]),n(`
`),s("span",{class:"line"},[s("span",null,"  })")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"Vue.use(Router)")]),n(`
`),s("span",{class:"line"},[s("span",null,"let base = `${process.env.BASE_URL}` // 动态获取二级目录")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default new Router({")]),n(`
`),s("span",{class:"line"},[s("span",null,"  mode: 'history',")]),n(`
`),s("span",{class:"line"},[s("span",null,"  base: base,")]),n(`
`),s("span",{class:"line"},[s("span",null,"  routes: [{")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: '/',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    name: 'home',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    component: Home")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }, {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    path: '/about',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    name: 'about',")]),n(`
`),s("span",{class:"line"},[s("span",null,"    component: About")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }]")]),n(`
`),s("span",{class:"line"},[s("span",null,"})")]),n(`
`),s("span",{class:"line"},[s("span",null,"改为 history 后我们 url 的路径就变成了 ==http://127.0.0.1:8080/vue/about==，而不是原来的 ==http://127.0.0.1:8080/vue/#/about==，但是需要注意页面渲染 404 的问题，具体可查阅：[HTML5 History](https://router.vuejs.org/zh/guide/essentials/history-mode.html) 模式。")]),n(`
`),s("span",{class:"line"},[s("span",null,"而在异步加载的优化上，我们使用了 webpack 提供的 require.ensure() 进行了代码拆分，主要区别在于没有优化前，访问 Home 页面会一起加载 About 组件的资源，因为它们打包进了一个 app.js 中：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"但是优化过后，它们分别被拆分成了 2.js 和 3.js：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如此，只有当用户点击了某页面，才会加载对应页面的 js 文件，实现了按需加载的功能。")]),n(`
`),s("span",{class:"line"},[s("span",null,"==webpack== ==在编译时，会静态地解析代码中的== ==require.ensure()====，同时将模块添加到一个分开的== ==chunk== ==当中。这个新的== ==chunk== ==会被== ==webpack== ==通过== ==jsonp== ==来按需加载。==")]),n(`
`),s("span",{class:"line"},[s("span",null,"关于 ==require.ensure()== 的知识点可以参考官方文档：[require.ensure](https://webpack.js.org/api/module-methods/#require-ensure)。")]),n(`
`),s("span",{class:"line"},[s("span",null,"当然，除了使用 require.ensure 来拆分代码，[Vue Router](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97) 官方文档还推荐使用动态 ==import== 语法来进行代码分块，比如上述 require.ensure 代码可以修改为：")]),n(`
`),s("span",{class:"line"},[s("span",null,"==//== ==引入== ==Home== ==组件======**const** ==Home = () =>== **import**==(===='./views/Home.vue'====);==")]),n(`
`),s("span",{class:"line"},[s("span",null,"==//== ==引入== ==About== ==组件======**const** ==About = () =>== **import**==(===='./views/About.vue'====);==")]),n(`
`),s("span",{class:"line"},[s("span",null,"其余代码可以保持不变，仍然可以实现同样的功能。如果你想给拆分出的文件命名，可以尝试一下 webpack 提供的 ==Magic Comments==（魔法注释）：")]),n(`
`),s("span",{class:"line"},[s("span",null,"**const** ==Home = () =>== **import**==(====/* webpackChunkName:'home'*/== =='./views/Home.vue'====);==")])])])])],-1)])])}const v=l(u,[["render",t]]);export{m as __pageData,v as default};
