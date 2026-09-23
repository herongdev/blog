import{_ as e,o as l,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"品牌管理","description":"","frontmatter":{"title":"品牌管理","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/品牌管理/品牌管理.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/品牌管理/品牌管理.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/品牌管理/品牌管理.md"};function t(c,a,o,r,m,u){return l(),p("div",null,[...a[0]||(a[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"先在ly-item-interface下创建实体类com.leyou.item.pojo.Brand实体类")]),n(`
`),s("span",{class:"line"},[s("span",null,"代码：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"在ly-item-service下新建maper：com.leyou.item.mapper.BrandMapper，类型为interface，代码：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"再在ly-item-service下新建service：com.leyou.item.service.BrandService，")]),n(`
`),s("span",{class:"line"},[s("span",null," ")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"再在ly-item-service下新建controller:com.leyou.item.web.BrandController，")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 由于是分页查询，我们定义一个PageResult类，放在ly-common中，作为通用")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 新建com.leyou.common.vo下PageResult类，代码：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`可在ly-item-service下的配置文件中增加mybatis日志配置`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`这样在日志文件中会把SQL语句打印出来`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`在Brand.vue文件中，整理数据`")])])])])],-1)])])}const y=e(i,[["render",t]]);export{v as __pageData,y as default};
