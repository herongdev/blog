import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Linux关闭防火墙。","description":"","frontmatter":{"title":"Linux关闭防火墙。","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/Linux关闭防火墙。.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/Linux关闭防火墙。.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/Linux关闭防火墙。.md"};function c(p,a,u,o,r,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==按理说通过虚拟机====ip + web====服务端口，即可在浏览器访问虚拟机的====web====服务。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==但是由于====CentOS====的防火墙问题，对应====web====端口无法访问。通过配置====CentOS====防火墙来解决。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"==CentOS 7====使用====firewalld====来管理防火墙。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==运行==**systemctl status firewalld**==命令查看当前防火墙的状态。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果防火墙的状态参数是====inactive====，则防火墙为关闭状态。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果防火墙的状态参数是====active====，则防火墙为开启状态。本示例中防火墙为开启状态，因此需要关闭防火墙。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==关闭防火墙。如果防火墙为关闭状态可以忽略此步骤。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果您想临时关闭防火墙，运行命令==**systemctl stop firewalld**==。====￼==**说明** ==这只是暂时关闭防火墙，下次重启====Linux====后，防火墙还会开启。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==如果您想永久关闭防火墙，运行命令==**systemctl disable firewalld**==。====￼==**说明** ==如果您想重新开启防火墙，具体操作，请参见====firewalld====官网信息====。==")]),s(`
`),n("span",{class:"line"},[n("span",null,"[](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/64105/156862602732172_zh-CN.png)")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://help.aliyun.com/document_detail/51376.html?spm=a2c4g.11186623.2.9.cdb85672PTuHBv#concept-51376-zh\\>")])])])])],-1)])])}const v=l(i,[["render",c]]);export{m as __pageData,v as default};
