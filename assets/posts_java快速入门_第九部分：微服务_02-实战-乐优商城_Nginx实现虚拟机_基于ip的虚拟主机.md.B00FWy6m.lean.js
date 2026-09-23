import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"基于ip的虚拟主机","description":"","frontmatter":{"title":"基于ip的虚拟主机","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于ip的虚拟主机.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于ip的虚拟主机.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Nginx实现虚拟机/基于ip的虚拟主机.md"};function t(c,a,o,r,u,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**1****、基于****ip****的虚拟主机**")]),s(`
`),n("span",{class:"line"},[n("span",null,"需要一台服务器绑定多个ip地址。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**方法一（系统重启后会失效）：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用标准的网络配置工具（比如ifconfig和route命令）添加lP别名：")]),s(`
`),n("span",{class:"line"},[n("span",null,"**方法二（永久修改，推荐）：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1、将/etc/sysconfig/network-scripts/ifcfg-eth0文件复制一份，命名为ifcfg-eth0:1")]),s(`
`),n("span",{class:"line"},[n("span",null,"修改其中内容：")]),s(`
`),n("span",{class:"line"},[n("span",null,"DEVICE=eth0:1")]),s(`
`),n("span",{class:"line"},[n("span",null,"IPADDR=192.168.25.103")]),s(`
`),n("span",{class:"line"},[n("span",null,"其他项不用修改")]),s(`
`),n("span",{class:"line"},[n("span",null,"2、重启系统：reboot")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置****nginx****基于****ip****地址的虚拟主机**")]),s(`
`),n("span",{class:"line"},[n("span",null,"基于ip的虚拟主机配置（配置多个server，把server_name修改为虚拟的ip地址）：")]),s(`
`),n("span",{class:"line"},[n("span",null,"修改Nginx的原始配置文件：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 复制Nginx安装目录下的html文件夹，并将其中的index.html稍作修改：")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 重启Nginx服务即可。")])])])])],-1)])])}const f=l(i,[["render",t]]);export{_ as __pageData,f as default};
