import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"新增、修改和删除数据","description":"","frontmatter":{"title":"新增、修改和删除数据","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/新增、修改和删除数据.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/新增、修改和删除数据.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/新增、修改和删除数据.md"};function c(t,a,d,o,u,r){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"随机生成id")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过POST请求，可以向一个已经存在的索引库中添加数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"POST /索引库名/类型名")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'"key":"value"')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`返回了一个id值，ES中的每条数据都要有id属性，id可以随机生成，也可以自己指定`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`我们试查询一下：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`指定id查询：写出表名和id即可`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"SE的强大功能，可以在新增数据中加上之前没有定义过的字段，ES会自动创建相应字段，并根据值推断出数据类型，如果存储的是String类型数据，ES无智能判断，它就会存入两个字段，例如：存储一个name字段，智能形成两个字段：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"name:text类型")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"name.keyword:keyword类型")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"也可以配置Es的配置文件，让它不是智能推断而是按我们指定的类型，叫做动态映射(dynamic templates）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **修改数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 使用put方法，put方法也可以用来新增数据，主要是根据id来定，如果id存在为修改，不存在为新增。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**修改的话，指定****id****为存在的即可**`")])])])])],-1)])])}const m=l(i,[["render",c]]);export{v as __pageData,m as default};
