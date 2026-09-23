import{_ as l,o as e,c as p,j as a,a as n}from"./chunks/framework.DJo0M80U.js";const k=JSON.parse('{"title":"安装kibana","description":"","frontmatter":{"title":"安装kibana","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/安装kibana.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/安装kibana.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/安装kibana.md"};function t(c,s,o,r,d,u){return e(),p("div",null,[...s[0]||(s[0]=[a("div",null,[a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[a("code",null,[a("span",{class:"line"},[a("span",null,"大概过程：下载，解压，配置，试运行，在浏览器中运行")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"下载地址：https://www.elastic.co/cn/downloads/kibana，下载时注意与elasticsearch的版本匹配，")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"解压到合适目录，")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"先修改一下配置")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"进入kibana/config/目录，vim kibana.yml，主要修改：")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"- 试运行，使用bin文件中的命令打开：")]),n(`
`),a("span",{class:"line"},[a("span",null,"- ./bin/kibana")]),n(`
`),a("span",{class:"line"},[a("span",null,"- 提示：")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"`在浏览器中打开上述地址即可进入页面`")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span")]),n(`
`),a("span",{class:"line"},[a("span",null,"kibana发请求是对我们普通请求方式的简化，如POST _analyze")]),n(`
`),a("span",{class:"line"},[a("span",null,"实际上相当于方法为POST，地址为http://192.168.199.130:9200/_analyze，其中的主机地址，我们在安装Elasticsearch时配置过了。")])])])])],-1)])])}const v=l(i,[["render",t]]);export{k as __pageData,v as default};
