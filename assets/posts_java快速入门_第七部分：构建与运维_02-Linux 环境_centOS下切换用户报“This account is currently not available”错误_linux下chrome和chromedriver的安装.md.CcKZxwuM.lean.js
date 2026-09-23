import{_ as s,o as a,c as r,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"linux下chrome和chromedriver的安装","description":"","frontmatter":{"title":"linux下chrome和chromedriver的安装","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/linux下chrome和chromedriver的安装.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/linux下chrome和chromedriver的安装.md"}'),o={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/centOS下切换用户报“This account is currently not available”错误/linux下chrome和chromedriver的安装.md"};function i(t,l,c,p,m,u){return a(),r("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1、安装chrome")]),e(`
`),n("span",{class:"line"},[n("span",null,"用下面的命令安装最新的 Google Chrome")]),e(`
`),n("span",{class:"line"},[n("span",null,"yum install [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)")]),e(`
`),n("span",{class:"line"},[n("span",null,"也可以下载到本地再安装")]),e(`
`),n("span",{class:"line"},[n("span",null,"wget [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)")]),e(`
`),n("span",{class:"line"},[n("span",null,"yum install ./google-chrome-stable_current_x86_64.rpm￼")]),e(`
`),n("span",{class:"line"},[n("span",null," 安装必要的库")]),e(`
`),n("span",{class:"line"},[n("span",null,"yum install mesa-libOSMesa-devel gnu-free-sans-fonts wqy-zenhei-fonts")]),e(`
`),n("span",{class:"line"},[n("span",null," ")]),e(`
`),n("span",{class:"line"},[n("span",null,"2、安装 chromedriver")]),e(`
`),n("span",{class:"line"},[n("span",null,"chrome官网 wget [https:](https://chromedriver.storage.googleapis.com/2.38/chromedriver_linux64.zip)//chromedriver.storage.googleapis.com/2.38/chromedriver_linux64.zip")]),e(`
`),n("span",{class:"line"},[n("span",null,"淘宝源（推荐）wget [http://npm.taobao.org/mirrors/chromedriver/2.41/](http://npm.taobao.org/mirrors/chromedriver/2.41/chromedriver_linux64.zip)chromedriver_linux64.zip")]),e(`
`),n("span",{class:"line"},[n("span",null,"  ")]),e(`
`),n("span",{class:"line"},[n("span",null,"将下载的文件解压，放在如下位置")]),e(`
`),n("span",{class:"line"},[n("span",null,"unzip chromedriver_linux64.zip")]),e(`
`),n("span",{class:"line"},[n("span",null,"/usr/bin/chromedriver")]),e(`
`),n("span",{class:"line"},[n("span",null,"给予执行权限")]),e(`
`),n("span",{class:"line"},[n("span",null,"chmod +x /usr/bin/chromedriver")]),e(`
`),n("span",{class:"line"},[n("span")]),e(`
`),n("span",{class:"line"},[n("span",null,"还可以参考这篇文章，虽然没试过，但感觉很牛逼 ")]),e(`
`),n("span",{class:"line"},[n("span",null," [https://intoli.com/blog/installing-google-chrome-on-centos/](https://intoli.com/blog/installing-google-chrome-on-centos/)")]),e(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),e(`
`),n("span",{class:"line"},[n("span")]),e(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.cnblogs.com/z-x-y/p/9506941.html\\>")])])])])],-1)])])}const g=s(o,[["render",i]]);export{d as __pageData,g as default};
