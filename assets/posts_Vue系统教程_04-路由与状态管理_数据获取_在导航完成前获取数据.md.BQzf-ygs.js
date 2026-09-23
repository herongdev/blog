import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"在导航完成前获取数据","description":"\\\\ 来自。","frontmatter":{"title":"在导航完成前获取数据","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"\\\\ 来自。","sidebarWeight":48,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vueRouter/数据获取/在导航完成前获取数据.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/数据获取/在导航完成前获取数据.md","filePath":"posts/Vue系统教程/04-路由与状态管理/数据获取/在导航完成前获取数据.md"}'),p={name:"posts/Vue系统教程/04-路由与状态管理/数据获取/在导航完成前获取数据.md"};function i(o,l,u,r,c,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"在导航完成前获取数据",tabindex:"-1"},[s("在导航完成前获取数据 "),n("a",{class:"header-anchor",href:"#在导航完成前获取数据","aria-label":'Permalink to "在导航完成前获取数据"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“在导航完成前获取数据”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  data() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      post: null,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      error: null")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  beforeRouteEnter(to, from, next) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getPost(to.params.id, (err, post) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      next(vm => vm.setData(err, post))")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 路由改变前，组件就已经渲染完了")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 逻辑稍稍不同")]),s(`
`),n("span",{class:"line"},[n("span",null,"  beforeRouteUpdate(to, from, next) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.post = null")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getPost(to.params.id, (err, post) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.setData(err, post)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      next()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  methods: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setData(err, post) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (err) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.error = err.toString()")]),s(`
`),n("span",{class:"line"},[n("span",null,"      } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.post = post")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://router.vuejs.org/zh/guide/advanced/data-fetching.html#%E5%9C%A8%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E5%89%8D%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE>")])])])])],-1)])])}const g=a(p,[["render",i]]);export{m as __pageData,g as default};
