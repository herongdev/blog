import{_ as l,o as e,c as t,j as s,a}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"其它错误处理","description":"","frontmatter":{"title":"其它错误处理","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/其它错误处理.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/其它错误处理.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/其它错误处理.md"};function p(c,n,o,r,u,d){return e(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Elasticsearch 报错处理")]),a(`
`),s("span",{class:"line"},[s("span",null,"1.Elasticsearch启动节点过少：")]),a(`
`),s("span",{class:"line"},[s("span",null,"failed to obtainnode locks, tried [[/home/user1/elasticsearch-5.6.1/data/elasticsearch]] withlock id [0]; maybe these locations are not writable or multiple nodes werestarted without increasing [node.max_local_storage_nodes：")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"出现这种情况是应为配置文件设置为单节点，而elasticsearch在一台服务器上多启动。需要把多余的elasticsearch 进程杀死即可")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"ps -ef | grepelastic")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"kill -9 -进程号（7472）")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"2. 报错：")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"ERROR: bootstrap checks failed")]),a(`
`),s("span",{class:"line"},[s("span",null,"system call filters failed to install; check the logs and fix yourconfiguration or disable system call filters at your own risk")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"原因：")]),a(`
`),s("span",{class:"line"},[s("span",null,"这是在因为Centos6不支持SecComp，而ES5.2.0默认bootstrap.system_call_filter为true进行检测，所以导致检测失败，失败后直接导致ES不能启动。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"解决：")]),a(`
`),s("span",{class:"line"},[s("span",null,"在elasticsearch.yml中配置bootstrap.system_call_filter为false，注意要在Memory下面:")]),a(`
`),s("span",{class:"line"},[s("span",null,"bootstrap.memory_lock: false")]),a(`
`),s("span",{class:"line"},[s("span",null,"bootstrap.system_call_filter: false")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"要是出现配置错误，可能是修改配置文件错误：注意空格什么的。（也碰到自己莫名其妙就是错误，别人一改就好的神奇情况）")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"3. “Elasticsearchrequires at least Java 8 but your Java versionfrom XXXX does not meet this requirement")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null," 这个错误忘记截图了，困扰了我蛮久的，我的jdk为1.8刚从官网下载的（还热乎着啊）。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"原因：推测是es启动使用的是普通用户，所以java环境可能受到权限限制无法进行访问")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null," 解决：直接将es放置在/home目录下的启动用户目录下，如home/user/这样可以有效的避免es启动时各种权限问题。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"4.还用一种 bootstrap checks failed错误")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"system call filters failed to install; check the logs and fix your configuration or disable system call filters at your")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"原因：出现错误的原因：是因为centos6.x操作系统不支持SecComp，而elasticsearch 5.5.2默认bootstrap.system_call_filter为true进行检测，所以导致检测失败，失败后直接导致ES不能启动。")]),a(`
`),s("span",{class:"line"},[s("span",null,"————————————————")]),a(`
`),s("span",{class:"line"},[s("span",null,"版权声明：本文为CSDN博主「和弦c调来编程」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。")]),a(`
`),s("span",{class:"line"},[s("span",null,"原文链接：https://blog.csdn.net/qq_38977441/article/details/80406126")])])])])],-1)])])}const f=l(i,[["render",p]]);export{m as __pageData,f as default};
