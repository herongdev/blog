import{_ as l,o as p,c as e,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"商品微服务","description":"","frontmatter":{"title":"商品微服务","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品微服务/商品微服务.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品微服务/商品微服务.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品微服务/商品微服务.md"};function c(t,a,o,u,r,d){return p(),e("div",null,[...a[0]||(a[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"数据表设计：要基于商品的分类设计而不是基于商品设计。")]),n(`
`),s("span",{class:"line"},[s("span",null,"同一商品的属性值不同，")]),n(`
`),s("span",{class:"line"},[s("span",null,"所以将键与值分开保存，键和分类关联，值与商品关联。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"**横表和竖表**")]),n(`
`),s("span",{class:"line"},[s("span",null,"按照传统设计，以规格参数作为数据库字段名，如品牌、型号等都是字段，那么表的字段会无限多，这样的表称为横表。，一条信息，描述所有数据。例如：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"我们不这么做，我们一条信息，只描述一条规格属性，也就是把规格参数作为字段的的值，而非字段本身。这样的设计称为竖表设计。例如：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`不过，规格和规格组也要单独保存，都采用竖表设计，所以我们一两张表：`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"- `规格组：tb_spec_group`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    `一个商品分类下有多个规格组`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"- `规格参数：tb_spec_param`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"    `一个规格组下，有多个规格参数`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null," ")]),n(`
`),s("span",{class:"line"},[s("span",null,"`规格组表：`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`规格参数表：`")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"`用Java对象进行描述的话就是：`")])])])])],-1)])])}const m=l(i,[["render",c]]);export{v as __pageData,m as default};
