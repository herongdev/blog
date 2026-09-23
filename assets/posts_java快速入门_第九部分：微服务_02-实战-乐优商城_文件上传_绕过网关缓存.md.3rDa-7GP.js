import{_ as e,o as l,c as t,j as a,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"绕过网关缓存","description":"","frontmatter":{"title":"绕过网关缓存","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/文件上传/绕过网关缓存.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/文件上传/绕过网关缓存.md"}'),p={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/文件上传/绕过网关缓存.md"};function i(c,n,o,r,d,u){return l(),t("div",null,[...n[0]||(n[0]=[a("div",null,[a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"默认情况下，所有的请求经过Zuul网关的代理，默认会通过SpringMVC预先对请求进行处理，缓存。普通请求并不会有什么影响，但是对于文件上传，就会造成不必要的网络负担，在高并发时，可能导致网络阻塞，Zuul网关不可用，以至于整个系统瘫痪。")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"所以，我们上传文件需要绕过请求的缓存，直接通过路由到达目标微服务：")]),s(`
`),a("span",{class:"line"},[a("span",null,"可以通过nginx的rewrite指令实现这一需求：")]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"Nginx提供rewrite指令，用于对地址进行重写，格式为：")]),s(`
`),a("span",{class:"line"},[a("span",null,'rewrite "用来匹配路径的正则" 重写后的路径 [指令]：')]),s(`
`),a("span",{class:"line"},[a("span")]),s(`
`),a("span",{class:"line"},[a("span",null,"编辑nginx.conf文件")])])])])],-1)])])}const v=e(p,[["render",i]]);export{g as __pageData,v as default};
