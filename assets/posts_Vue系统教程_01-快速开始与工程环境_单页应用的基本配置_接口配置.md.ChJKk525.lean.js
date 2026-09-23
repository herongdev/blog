import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"接口配置","description":"围绕“接口配置”整理的概念、示例与实践笔记。","frontmatter":{"title":"接口配置","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","快速开始与工程环境"],"description":"围绕“接口配置”整理的概念、示例与实践笔记。","sidebarWeight":49,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/安装配置/单页应用的基本配置/接口配置.md"},"headers":[],"relativePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/接口配置.md","filePath":"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/接口配置.md"}'),t={name:"posts/Vue系统教程/01-快速开始与工程环境/单页应用的基本配置/接口配置.md"};function i(u,l,c,r,o,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"接口配置",tabindex:"-1"},[s("接口配置 "),n("a",{class:"header-anchor",href:"#接口配置","aria-label":'Permalink to "接口配置"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“接口配置”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在项目的开发过程中，我们也少不了与后台服务器进行数据的获取和交互，这一般都是通过接口完成的，那么我们如何进行合理的接口配置呢？我们可以在 src 目录下新建 services 文件夹用于存放接口文件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==└──== ==src======    ==└──== ==services======        ==├──== ==http.js==      ==#== ==接口封装======        ==├──== ==moduleA.js==    ==# A====模块接口======        ==└──== ==moduleB.js==    ==# B====模块接口==")]),s(`
`),n("span",{class:"line"},[n("span",null,"为了让接口便于管理，我们同样使用不同的文件来配置不同模块的接口，同时由于接口的调用 ajax 请求代码重复部分较多，我们可以对其进行简单的封装，比如在 http.js 中（fetch为例）：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* http.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"import 'whatwg-fetch'")]),s(`
`),n("span",{class:"line"},[n("span",null,"// HTTP 工具类")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default class Http {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static async request(method, url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const param = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      method: method,")]),s(`
`),n("span",{class:"line"},[n("span",null,"      headers: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        'Content-Type': 'application/json'")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (method === 'GET') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      url += this.formatQuery(data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      param['body'] = JSON.stringify(data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // Tips.loading();"),n("span",null," // 可调用 loading 组件")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return fetch(url, param).then(response => this.isSuccess(response))")]),s(`
`),n("span",{class:"line"},[n("span",null,"      .then(response => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return response.json()")]),s(`
`),n("span",{class:"line"},[n("span",null,"      })")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 判断请求是否成功")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static isSuccess(res) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (res.status >= 200 && res.status < 300) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      return res")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.requestException(res)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理异常")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static requestException(res) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const error = new Error(res.statusText)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    error.response = res")]),s(`
`),n("span",{class:"line"},[n("span",null,"    throw error")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // url处理")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static formatQuery(query) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let params = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (query) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      for (let item in query) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        let vals = query[item];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (vals !== undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"          params.push(item + '=' + query[item])")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return params.length ? '?' + params.join('&') : '';")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 get 请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static get(url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this.request('GET', url, data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 put 请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static put(url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this.request('PUT', url, data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 post 请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static post(url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this.request('POST', url, data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 patch 请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static patch(url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this.request('PATCH', url, data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 处理 delete 请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"  static delete(url, data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return this.request('DELETE', url, data)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"封装完毕后我们在 moduleA.js 中配置一个 github 的开放接口：==https://api.github.com/repos/octokit/octokit.rb==")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* moduleA.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Http from './http'")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取测试数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const getTestData = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return Http.get('https://api.github.com/repos/octokit/octokit.rb')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"然后在项目页面中进行调用，会成功获取 github 返回的数据，但是一般我们在项目中配置接口的时候会直接省略项目 url 部分，比如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* moduleA.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"import Http from './http'")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取测试数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"export const getTestData = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return Http.get('/repos/octokit/octokit.rb')")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这时候我们再次调用接口的时候会发现其调用地址为本地地址：==http://127.0.0.1:8080/repos/octokit/octokit.rb==，那么为了让其指向 ==https://api.github.com==，我们需要在 vue.config.js 中进行 devServer 的配置：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* vue.config.js */")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  devServer: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // string | Object 代理设置")]),s(`
`),n("span",{class:"line"},[n("span",null,"  proxy: {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 接口是 '/repos' 开头的才用代理")]),s(`
`),n("span",{class:"line"},[n("span",null,"    '/repos': {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      target: '[https://api.github.com](https://api.github.com)', // 目标地址")]),s(`
`),n("span",{class:"line"},[n("span",null,"        changeOrigin: true, // 是否改变源地址")]),s(`
`),n("span",{class:"line"},[n("span",null,"              // pathRewrite: {'^/api': ''}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 devServer 中 我们配置 proxy 进行接口的代理，将我们本地地址转换为真实的服务器地址，此时我们同样能顺利的获取到数据，不同点在于接口状态变成了 304（重定向）：")])])])])],-1)])])}const g=a(t,[["render",i]]);export{m as __pageData,g as default};
