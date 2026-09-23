import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Elasticsearch介绍","description":"","frontmatter":{"title":"Elasticsearch介绍","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/Elasticsearch介绍.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/Elasticsearch介绍.md"}'),c={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/开始商城用户界面/Elasticsearch介绍.md"};function i(t,a,u,o,r,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"商城类网站商品的数量非常多而杂。如果快速展示出用户想要的商品，并进行合理的过滤，尽快促成交易，是搜索系统要研究的核心。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"面对这样复杂的寻索业务和数据量，使用传统数据库搜索就显得力不从心，一般我们都会使用全文搜索技术，比如之前大家学习过的Solr。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"还有：Elasticsearch。相比solr而言，速度更快是其主要优势。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"主要过程：")]),s(`
`),n("span",{class:"line"},[n("span",null,"下载，解压（免安装），重命名/修改权限，修改配置，试运行，报错，解决，重运行")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"先下载，下载地址：[https://www.elastic.co/cn/downloads/elasticsearch](https://www.elastic.co/cn/downloads/elasticsearch)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们安装在centerOs虚拟机上安装：")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、上传到虚拟机上/home/herong目录下，解压")]),s(`
`),n("span",{class:"line"},[n("span",null,"tar -zxvf elasticsearch-6.2.4")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"出于安全原因，elasticsearch不能使用root用户运行，只能使用普通用户，所以要修改文件夹普通用户运行的权限，先可使用 id herong，来查看当前用户的uid gid 和组")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`目前这个文件夹的权限属于root帐户`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"赋予leyou用户对这个文件夹的权限：")]),s(`
`),n("span",{class:"line"},[n("span",null,"chown leyou:leyou elasticsearch-6.2.4/  -R(全局递归进行更改)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"输入ll命令，可以看到现在这个文件属于leyou即我们指定的帐户了")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`修改一下文件夹的名字，并进入，然后可以看到文件目录及文件`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`bin为运行目录，config就是配置文件目录，我们进行一下配置`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`vim jvm.options进行修改`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 主要修改内存，因为我们的虚拟机总内存才2G，然后退出保存：Wq")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 再修改vim elasticsearch.yml文件，主要修改了路径和ip")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 保存并退出:wq")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 由于data目录没有，我们cd到elasticsearch目录下并mkdir data；")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 试启动：注意不用使用root帐户")]),s(`
`),n("span",{class:"line"},[n("span",null,"- cd到bin目录下，并使用elasticsearch启动")]),s(`
`),n("span",{class:"line"},[n("span",null,"- cd bin")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ./elasticsearch")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 出现三个错误，依次解决掉才行")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 可能报错:")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ==解决办法：==")]),s(`
`),n("span",{class:"line"},[n("span",null,"- # 在最后面追加下面内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"- *** hard nofile 65536")]),s(`
`),n("span",{class:"line"},[n("span",null,"- *** soft nofile 65536")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ***  是启动herong的用户")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 线程数量不够")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`改虚拟内存`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有的错误修改完毕后，一定要重启你的xshell终端，否则配置无效。")]),s(`
`),n("span",{class:"line"},[n("span",null,"输入exit，断开连接，然后再输入")]),s(`
`),n("span",{class:"line"},[n("span",null,"ssh root@192.168.199.130")]),s(`
`),n("span",{class:"line"},[n("span",null,"进行重新连接，再次./elasticsearch命令，输出")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面是前台启动方式，一旦关闭Linux shell，ES服务就会停止。所以是实际使用过程中，绝对不会使用这种方式去启动ES。除了上面的启动方式外，还可以加上一定的启动参数。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null," ==./elasticsearch== ==–====d== ==#====在后台运行====Elasticsearch==")]),s(`
`),n("span",{class:"line"},[n("span",null," ==./elasticsearch -d -Xmx2g -Xms2g== ==#====后台启动，启动时指定内存大小（====2G====）==")]),s(`
`),n("span",{class:"line"},[n("span",null," ==./elasticsearch -d -Des.logger.level=DEBUG  #====可以在日志中打印出更加详细的信息。==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**再运行：**在浏览器中输入上图所示地址：192.168.199.130:9200，可见如下界面：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"原始数据为：")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "name" : "9foS8uk",')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "cluster_name" : "elasticsearch",')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "cluster_uuid" : "O2AYgqL6R8KcsPOBTZotKA",')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "version" : {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "number" : "6.2.4",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "build_hash" : "ccec39f",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "build_date" : "2018-04-12T20:37:28.497551Z",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "build_snapshot" : false,')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "lucene_version" : "7.2.1",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "minimum_wire_compatibility_version" : "5.6.0",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "minimum_index_compatibility_version" : "5.0.0"')]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "tagline" : "You Know, for Search"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const _=l(c,[["render",i]]);export{m as __pageData,_ as default};
