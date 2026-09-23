import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"文件从本机上传到虚拟机","description":"","frontmatter":{"title":"文件从本机上传到虚拟机","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统/文件从本机上传到虚拟机.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统/文件从本机上传到虚拟机.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统/文件从本机上传到虚拟机.md"};function c(t,a,u,r,o,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**一、使用****FileZilla****上传文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.****启动虚拟机，打开****Linux****终端，输入****ifconfig****命令查看****IP****地址**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==IP====地址为====192.168.59.6==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.****打开****FileZilla****，输入****IP****地址，用户名，密码，端口号，点击快速连接**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==连接成功后，左边为本机资源目录，右边为虚拟机目录，左边选中文件，右键选择上传，即可上传成功==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**二、使用****SecureCRT****或****Xshell****上传文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==SecureCRT====和====Xshell====安装包== ")]),s(`
`),n("span",{class:"line"},[n("span",null,"==链接：====https://pan.baidu.com/s/1EVRka8cFpnqxmBlqoypxig== ==密码：====bji1==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.****使用****SercureCRT****上传文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**（****1****）连接虚拟机**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==点击快速连接，输入输入====IP====地址，用户名== ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`==点击连接后输入密码，点击====OK====，即可连接成功==`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**（****2****）打开****sftp****窗口**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==点击已连接窗口，右键选择连接====sftp====，将需要上传的文件拖入已经打开的====sftp====窗口即可== ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **2.****使用****Xshell****上传文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **（****1****）连接虚拟机**")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ==打开====Xshell====，点击新建会话==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==在弹出窗口输入====IP====地址，协议选择====sftp====，名称可随意取，点击连接。== ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`==输入用户名和密码==`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`==出现下图即链接成功，可以直接拖动文件到下面窗口即可上传==`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==**====上述步骤，协议改为====ssh====可链接虚拟机中====Linux====，打开窗口可执行在====Linux====终端下同样操作==")]),s(`
`),n("span",{class:"line"},[n("span",null,"**三、使用****rz****命令上传**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.****安装****rz**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==先在终端输入====rz====查看是否已经安装，没有则执行== ==yum install -y lrzsz== ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2.****连接虚拟机并执行****rz**")]),s(`
`),n("span",{class:"line"},[n("span",null,"==依照第二种办法中的步骤，使用====SecureCRT====或====Xshell====连接虚拟机，协议====ssh,====在窗口中输入====rz,====在弹出窗口中选择要上传的文件打开即可上传。== ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`上述所有方法都必须启动Linux，登录成功才可执行，上传成功后可在终端输入ls命令查看是否成功上传`")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.csdn.net/amin_hui/article/details/81837257\\>")])])])])],-1)])])}const f=l(i,[["render",c]]);export{h as __pageData,f as default};
