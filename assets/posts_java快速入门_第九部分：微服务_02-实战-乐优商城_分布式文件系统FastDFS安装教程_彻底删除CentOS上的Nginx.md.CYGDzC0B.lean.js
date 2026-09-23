import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"彻底删除CentOS上的Nginx","description":"","frontmatter":{"title":"彻底删除CentOS上的Nginx","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/彻底删除CentOS上的Nginx.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/彻底删除CentOS上的Nginx.md"}'),o={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/彻底删除CentOS上的Nginx.md"};function i(p,a,c,r,g,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**删除使用****yum****安装的****nginx****方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1.停止Nginx软件")]),s(`
`),n("span",{class:"line"},[n("span",null,"[root@localhost ~]# service nginx stop")]),s(`
`),n("span",{class:"line"},[n("span",null,"2.删除Nginx的自动启动")]),s(`
`),n("span",{class:"line"},[n("span",null,"[root@localhost ~]# chkconfig nginx off")]),s(`
`),n("span",{class:"line"},[n("span",null,"3.从源头删除Nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"[root@localhost ~]# rm -rf /usr/sbin/nginx￼[root@localhost ~]# rm -rf /etc/nginx￼[root@localhost ~]# rm -rf /etc/init.d/nginx￼4.再使用yum清理")]),s(`
`),n("span",{class:"line"},[n("span",null,"  [root@localhost ~]# yum remove nginx")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.csdn.net/xinyflove/article/details/83108379\\>")])])])])],-1)])])}const m=l(o,[["render",i]]);export{x as __pageData,m as default};
