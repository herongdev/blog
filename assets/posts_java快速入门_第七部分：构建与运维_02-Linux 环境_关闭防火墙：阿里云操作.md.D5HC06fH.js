import{_ as l,o as e,c as t,j as s,a}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"关闭防火墙：阿里云操作","description":"","frontmatter":{"title":"关闭防火墙：阿里云操作","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/关闭防火墙：阿里云操作.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/关闭防火墙：阿里云操作.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/关闭防火墙：阿里云操作.md"};function p(c,n,o,u,d,r){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"关闭防火墙：阿里云操作")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==运行==**systemctl status firewalld**==命令查看当前防火墙的状态。==")]),a(`
`),s("span",{class:"line"},[s("span",null,"[](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==如果防火墙的状态参数是====inactive====，则防火墙为关闭状态。==")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==如果防火墙的状态参数是====active====，则防火墙为开启状态。本示例中防火墙为开启状态，因此需要关闭防火墙。==")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==关闭防火墙。如果防火墙为关闭状态可以忽略此步骤。==")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==如果您想临时关闭防火墙，运行命令==**systemctl stop firewalld**==。====￼==**说明** ==这只是暂时关闭防火墙，下次重启====Linux====后，防火墙还会开启。==")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"==如果您想永久关闭防火墙，运行命令==**systemctl disable firewalld**==。====￼==**说明** ==如果您想重新开启防火墙，具体操作，请参见====firewalld====官网信息====。==")]),a(`
`),s("span",{class:"line"},[s("span",null,"[](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)")])])])])],-1)])])}const h=l(i,[["render",p]]);export{m as __pageData,h as default};
