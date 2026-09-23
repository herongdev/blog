import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"Vuex 配置","description":"围绕“Vuex 配置”整理的概念、示例与实践笔记。","frontmatter":{"title":"Vuex 配置","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"围绕“Vuex 配置”整理的概念、示例与实践笔记。","sidebarWeight":44,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/安装配置/单页应用的基本配置/Vuex 配置.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/Vuex 配置.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/Vuex 配置.md"}'),t={name:"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/Vuex 配置.md"};function u(i,l,o,c,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"vuex-配置",tabindex:"-1"},[s("Vuex 配置 "),n("a",{class:"header-anchor",href:"#vuex-配置","aria-label":'Permalink to "Vuex 配置"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Vuex 配置”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这里我们先来看一下使用 CLI 生成的配置文件 store.js 中的内容：")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Vue from 'vue'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Vuex from 'vuex'")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vue.use(Vuex)")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default new Vuex.Store({")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mutations: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  actions: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"该配置文件便是 Vuex 的配置文件，主要有 4 个核心点：state、mutations、actions 及 getter，详细的介绍大家可以参考官方文档：[核心概念](https://vuex.vuejs.org/zh/guide/state.html)，这里我用一句话介绍它们之间的关系就是：**我们可以通过** **actions** **异步提交** **mutations** **去** **修改** **state** **的值并通过** **getter** **获取**。")]),s(`
`),n("span",{class:"line"},[n("span",null,"需要注意的是不是每一个项目都适合使用 Vuex，如果你的项目是中大型项目，那么使用 Vuex 来管理错综复杂的状态数据是很有帮助的，而为了后期的拓展性和可维护性，这里不建议使用 CLI 生成的一份配置文件来管理所有的状态操作，我们可以把它拆分为以下目录：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==└──== ==store======    ==├──== ==index.js==          ==#== ==我们组装模块并导出== ==store== ==的地方======    ==├──== ==actions.js==        ==#== ==根级别的== ==action======    ==├──== ==mutations.js==      ==#== ==根级别的== ==mutation======    ==└──== ==modules======        ==├──== ==moduleA.js==    ==# A====模块======        ==└──== ==moduleB.js==    ==# B====模块==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"与单个 store.js 文件不同的是，我们按模块进行了划分，每个模块中都可以包含自己 4 个核心功能。比如模块 A 中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* moduleA.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"const moduleA = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    text: 'hello'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mutations: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    addText(state, txt) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 这里的 `state` 对象是模块的局部状态")]),s(`
`),n("span",{class:"line"},[n("span",null,"      state.text += txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  actions: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    setText({ commit }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      commit('addText', ' world')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  getters: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getText(state) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return state.text + '!'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default moduleA")]),s(`
`),n("span",{class:"line"},[n("span",null,"上方我们导出 A 模块，并在 index.js 中引入：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* index.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Vue from 'vue'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Vuex from 'vuex'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import moduleA from './modules/moduleA'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import moduleB from './modules/moduleB'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { mutations } from './mutations'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import actions from './actions'")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vue.use(Vuex)")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default new Vuex.Store({")]),s(`
`),n("span",{class:"line"},[n("span",null,"  state: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    groups: [1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  modules: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    moduleA, // 引入 A 模块")]),s(`
`),n("span",{class:"line"},[n("span",null,"    moduleB, // 引入 B 模块")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  actions, // 根级别的 action")]),s(`
`),n("span",{class:"line"},[n("span",null,"  mutations, // 根级别的 mutations")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 根级别的 getters")]),s(`
`),n("span",{class:"line"},[n("span",null,"  getters: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    getGroups(state) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return state.groups")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")]),s(`
`),n("span",{class:"line"},[n("span",null,"这样项目中状态的模块划分就更加清晰，对应模块的状态我们只需要修改相应模块文件即可。详细的案例代码可参考文末 github 地址。")])])])])],-1)])])}const V=a(t,[["render",u]]);export{x as __pageData,V as default};
