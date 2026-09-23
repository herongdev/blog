import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"更好的属性注入方式1","description":"","frontmatter":{"title":"更好的属性注入方式1","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/更好的属性注入方式1.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/更好的属性注入方式1.md"}'),t={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot快速入门/更好的属性注入方式1.md"};function i(o,a,r,c,d,u){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这种方式适用于属性配置文件在多个地方用到")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、将之前的properties文件改名为application.properties")]),s(`
`),n("span",{class:"line"},[n("span",null,"二、新建一个类文件，用来保存属性值JdbcProperties：")]),s(`
`),n("span",{class:"line"},[n("span",null,"三、引入依赖，lombok将为我们类自动生成getter,setter等方法，是一个编译式依赖。")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<dependency\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<groupId\\>====org.projectlombok====\\</groupId\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\<artifactId\\>====lombok====\\</artifactId\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==\\</dependency\\>==")]),s(`
`),n("span",{class:"line"},[n("span",null,"便可以类上使用Data注解来自动生成以下方法；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`四、定义类成员变量，用来保存properties`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"五、修改JdbcConfig类的内容，去掉@resoure和@value注解")]),s(`
`),n("span",{class:"line"},[n("span",null,"直接引入JdbcProperties中定义的属性")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"总体是用一个类从properties中引入属性，然后在@configuration的java配置类中，把这个类传去，这样属性类和配置类分离。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"错误解决：如果lombok不生效，可能是没有在idea中安装此插件，在设置-\\>plugins中下载安装，再重启即可。")])])])])],-1)])])}const m=l(t,[["render",i]]);export{_ as __pageData,m as default};
