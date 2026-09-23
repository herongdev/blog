import{_ as e,o as l,c as p,j as s,a}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"商品修改","description":"","frontmatter":{"title":"商品修改","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品的增，删，改/商品修改.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品的增，删，改/商品修改.md"}'),t={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品的增，删，改/商品修改.md"};function i(o,n,c,r,d,u){return l(),p("div",null,[...n[0]||(n[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"我们的列表页只有spu表的数据，但实际上我们显示商品修改时，需要tb_sku,tb_spu,tb_spu_deatail,tb_stock这四张表的数据。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"所以我们还要根据列表页的spuId来获取spuDetail，才能得到我们所要的数据，在goodsController中新增相应的方法：")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"`接下来在GoodsService中实现queryDetailById(spuId)方法：`")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"`除此外，还要查询sku列表，现在实现，先在GoodsController中新建方法：`")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"`接着在GoodsService中实现相应的方法：`")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"`在GoodsController中新建商品修改方法：`")])])])])],-1)])])}const m=e(t,[["render",i]]);export{v as __pageData,m as default};
