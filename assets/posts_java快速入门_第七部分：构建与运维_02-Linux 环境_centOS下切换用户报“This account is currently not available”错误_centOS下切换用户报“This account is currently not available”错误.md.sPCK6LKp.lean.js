import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"centOS下切换用户报“This account is currently not available”错误","description":"","frontmatter":{"title":"centOS下切换用户报“This account is currently not available”错误","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/centOS下切换用户报“This account is currently not available”错误.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/centOS下切换用户报“This account is currently not available”错误.md"}'),c={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/centOS下切换用户报“This account is currently not available”错误.md"};function i(p,a,o,u,r,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"上网搜索了一圈之后发现是用户的shell禁止登录了")]),s(`
`),n("span",{class:"line"},[n("span",null,"**解决方法：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"只要开启shell登录即可。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**操作步骤：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.**用vi查看账户信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"cat /etc/passwd | grep 用户名")]),s(`
`),n("span",{class:"line"},[n("span",null,'发现它的shell是“/sbin/nologin”（表示禁止shell登录），需要将起改成"/bin/bash",如下图所示：')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **2**.修改信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"- vi /etc/passwd")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"输入命令修改完毕后，保存退出")]),s(`
`),n("span",{class:"line"},[n("span",null,"**3**.切换用户")]),s(`
`),n("span",{class:"line"},[n("span",null,"su 用户名")]),s(`
`),n("span",{class:"line"},[n("span",null,"**补充操作：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看系统中有哪些用户：cut -d : -f 1 /etc/passwd ")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看可以登录系统的用户：cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看用户操作：w命令(需要root权限) ")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看某一用户：w 用户名 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看登录用户：who ")]),s(`
`),n("span",{class:"line"},[n("span",null,"查看用户登录历史记录：last")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.csdn.net/Muz_victory/article/details/88814160\\>")])])])])],-1)])])}const _=l(c,[["render",i]]);export{h as __pageData,_ as default};
