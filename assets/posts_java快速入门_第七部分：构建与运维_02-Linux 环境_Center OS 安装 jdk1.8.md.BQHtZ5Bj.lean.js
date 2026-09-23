import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Center OS 安装 jdk1.8","description":"","frontmatter":{"title":"Center OS 安装 jdk1.8","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Center OS 安装 jdk1.8.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Center OS 安装 jdk1.8.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/Center OS 安装 jdk1.8.md"};function c(t,a,o,u,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**1****、源码包准备：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先到官网下载jdk-8u66-linux-x64.tar.gz，")]),s(`
`),n("span",{class:"line"},[n("span",null,"[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2****、解压源码包**")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过终端在/usr/local目录下新建java文件夹，命令行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==sudo mkdir /usr/local/java====￼==然后将下载到压缩包拷贝到java文件夹中，命令行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"进入jdk源码包所在目录")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==cp jdk-8u66-linux-x64.tar.gz /usr/local/java====￼==然后进入java目录，命令行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==cd /usr/local/java====￼==解压压缩包，命令行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==sudo tar zxvf jdk-8u66-linux-x64.tar.gz====￼==然后可以把压缩包删除，命令行：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==sudo rm jdk-8u66-linux-x64.tar.gz==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**3****、设置****jdk****环境变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"这里采用全局设置方法，就是修改etc/profile，它是是所有用户的共用的环境变量")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==vi /etc/profile==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"打开之后在末尾添加")]),s(`
`),n("span",{class:"line"},[n("span",null,"export JAVA_HOME=/usr/local/java/jdk1.8.0_171")]),s(`
`),n("span",{class:"line"},[n("span",null,"export JRE_HOME=${JAVA_HOME}/jre")]),s(`
`),n("span",{class:"line"},[n("span",null,"export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib")]),s(`
`),n("span",{class:"line"},[n("span",null,"export PATH=${JAVA_HOME}/bin:$PATH")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使环境变量生效")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"source /etc/profile")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"添加软链接")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"ln -s /usr/local/java/jdk1.8.0_171/bin/java /usr/bin/java")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**5****、检验是否安装成功**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在终端")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"==java -version==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"看看是否安装成功，成功则显示如下")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.jianshu.com/p/d5a335c7da2b\\>")])])])])],-1)])])}const k=l(i,[["render",c]]);export{v as __pageData,k as default};
