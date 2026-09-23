import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"面向对象封装","description":"","frontmatter":{"title":"面向对象封装","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品表设计/面向对象封装.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品表设计/面向对象封装.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/商品表设计/面向对象封装.md"};function c(t,a,o,r,u,m){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"规格组类")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Group \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"Long id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Long cid;//所属分类")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<Param\\> params;规格参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"规格参数类")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Param \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"Long id;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Long groupId;//所属级id")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"boolean numeric;// 是否数值类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"String unit;")]),s(`
`),n("span",{class:"line"},[n("span",null,"boolean searching;//是否作为商品筛选条件")]),s(`
`),n("span",{class:"line"},[n("span",null,"String segments; // 数值筛选条件如何分段")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"实现分类管理接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"在item微服务的ly-item-interface下新建com.leyou.item.pojo.SpecGroup.java类，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写Mapper，在ly-item-service下新建com.leyou.item.mapper.SpecGroupMapper.java，类型选接口，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写service，在ly-item-service下新建com.leyou.item.service.SpecificationService，不分规格组和规格参数，写在一个文件中，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写controller，在ly-item-service下新建com.leyou.item.web.SpecificationControlller.java，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"请求接口地址为：http://api.leyou.com/api/item/spec/groups/77")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"依次完善代码，先是controller")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`再次是service，`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"controller调用service的方法，service调用mapper中的通用方法select，查询条件为实体类的非空属性。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在ExceptionEnum.java中添加一个异常：")])])])])],-1)])])}const g=l(i,[["render",c]]);export{v as __pageData,g as default};
