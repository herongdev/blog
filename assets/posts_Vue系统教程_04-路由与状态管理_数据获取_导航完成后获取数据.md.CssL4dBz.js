import{_ as a,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"导航完成后获取数据","description":"当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。 假设我们有一个 Post 组件，需要基于 $route.params.id。","frontmatter":{"title":"导航完成后获取数据","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","路由与状态管理"],"description":"当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。 假设我们有一个 Post 组件，需要基于 $route.params.id。","sidebarWeight":49,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vueRouter/数据获取/导航完成后获取数据.md"},"headers":[],"relativePath":"posts/Vue系统教程/04-路由与状态管理/数据获取/导航完成后获取数据.md","filePath":"posts/Vue系统教程/04-路由与状态管理/数据获取/导航完成后获取数据.md"}'),p={name:"posts/Vue系统教程/04-路由与状态管理/数据获取/导航完成后获取数据.md"};function i(r,l,o,c,u,d){return e(),t("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"导航完成后获取数据",tabindex:"-1"},[n("导航完成后获取数据 "),s("a",{class:"header-anchor",href:"#导航完成后获取数据","aria-label":'Permalink to "导航完成后获取数据"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“导航完成后获取数据”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。")]),n(`
`),s("span",{class:"line"},[s("span",null,"假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据：")]),n(`
`),s("span",{class:"line"},[s("span",null,"<template>")]),n(`
`),s("span",{class:"line"},[s("span",null,'  <div class="post">')]),n(`
`),s("span",{class:"line"},[s("span",null,'    <div v-if="loading" class="loading">')]),n(`
`),s("span",{class:"line"},[s("span",null,"      Loading...")]),n(`
`),s("span",{class:"line"},[s("span",null,"    </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,'    <div v-if="error" class="error">')]),n(`
`),s("span",{class:"line"},[s("span",null,"      {{ error }}")]),n(`
`),s("span",{class:"line"},[s("span",null,"    </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,'    <div v-if="post" class="content">')]),n(`
`),s("span",{class:"line"},[s("span",null,"      <h2>{{ post.title }}</h2>")]),n(`
`),s("span",{class:"line"},[s("span",null,"      <p>{{ post.body }}</p>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</template>")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      loading: false,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      post: null,")]),n(`
`),s("span",{class:"line"},[s("span",null,"      error: null")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  created() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 组件创建完后获取数据，")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 此时 data 已经被 observed 了")]),n(`
`),s("span",{class:"line"},[s("span",null,"    this.fetchData()")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  watch: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    // 如果路由有变化，会再次执行该方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"    '$route': 'fetchData'")]),n(`
`),s("span",{class:"line"},[s("span",null,"  },")]),n(`
`),s("span",{class:"line"},[s("span",null,"  methods: {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    fetchData() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.error = this.post = null")]),n(`
`),s("span",{class:"line"},[s("span",null,"      this.loading = true")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // replace getPost with your data fetching util / API wrapper")]),n(`
`),s("span",{class:"line"},[s("span",null,"      getPost(")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.$route.params.id,")]),n(`
`),s("span",{class:"line"},[s("span",null,"        (err, post) => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"          this.loading = false")]),n(`
`),s("span",{class:"line"},[s("span",null,"          if (err) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.error = err.toString()")]),n(`
`),s("span",{class:"line"},[s("span",null,"          } else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            this.post = post")]),n(`
`),s("span",{class:"line"},[s("span",null,"          }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        })")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("p",null,[n('当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。 假设我们有一个 Post 组件，需要基于 $route.params.id 获取文章数据： <template> <div class="post"> <div v-if="loading" class="loading">Loading...</div> <div v-if="error" class="error">{{ error }}</div> <div v-if="post" class="content"> <h2>{{ post.title }}</h2> <p>{{ post.body }}</p> </div> </div> </template> js export default { data() { return { loading: false, post: null, error: null, } }, created() { // watch 路由的参数，以便再次获取数据 this.$watch( () => this.$route.params, () => { this.fetchData() }, // 组件创建完后获取数据， // 此时 data 已经被 observed 了 { immediate: true } ) }, methods: { fetchData() { this.error = this.post = null this.loading = true // replace '),s("code",null,"getPost"),n(" with your data fetching util / API wrapper getPost(this.$route.params.id, (err, post) => { this.loading = false if (err) { this.error = err.toString() } else { this.post = post } }) }, }, }")])],-1)])])}const f=a(p,[["render",i]]);export{g as __pageData,f as default};
