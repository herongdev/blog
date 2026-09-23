import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"创建索引","description":"","frontmatter":{"title":"创建索引","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/创建索引.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/创建索引.md"}'),t={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/通过Java访问kibana/创建索引.md"};function i(c,a,o,r,d,u){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**索引（****Index****）相关****API**")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）创建一个新的索引。")]),s(`
`),n("span",{class:"line"},[n("span",null,'curl -XPUT "localhost:9200/index_test"')]),s(`
`),n("span",{class:"line"},[n("span",null,"如果返回下面的信息，则说明索引创建成功。如果不是，则ES会返回相应的异常信息。通常可以通过异常信息的最后一项推断出失败的原因。")]),s(`
`),n("span",{class:"line"},[n("span",null,'==\\{====￼==    =="acknowledged"====: true====￼====\\}==')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的操作使用默认的配置信息创建一个索引。大多数情况下，我们想在索引创建的时候就将我们所需的mapping和其他配置确定好。下面的操作就可以在创建索引的同时，创建settings和mapping。")]),s(`
`),n("span",{class:"line"},[n("span",null,`==curl -XPUT== =="localhost:9200/index_test" -d ' #== ==注意这里的===='====号====￼====\\{====￼==  =="settings": \\{====￼==    =="index": \\{====￼==      =="number_of_replicas": "1",== ==#== ==设置复制数====￼==      =="number_of_shards": "5"== ==#== ==设置主分片数====￼==    ==\\}====￼==  ==\\},====￼==  =="mappings": \\{== ==#== ==创建====mapping====￼==    =="test_type": \\{== ==#== ==在====index====中创建一个新的====type(====相当于====table)====￼==      =="properties": \\{====￼==        =="name": \\{== ==#== ==创建一个字段（====string====类型数据，使用普通索引）====￼==          =="type": "string",====￼==          =="index": "not_analyzed"====￼==        ==\\},====￼==        =="age": \\{====￼==          =="type": "integer"====￼==        ==\\}====￼==      ==\\}====￼==    ==\\}====￼==  ==\\}====￼====\\}'==`)]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）删除一个索引。")]),s(`
`),n("span",{class:"line"},[n("span",null,'==curl -XDELETE "localhost:9200/index_test"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"如果返回与创建索引同样的信息，则说明删除成功。反之，则返回相应的异常信息。更多的索引操作参见ES[官网文档](http://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html)。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用****java****代码创建和删除索引：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"在test文件夹下建立相对应的包：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"修改实体类，加入创建索引时的参数注解@Document")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`在实体类中配置索引中字段类型`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`修改测试类并运行：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`运行成功`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`再打开kibana客户端测试索引创建的结果：`")])])])])],-1)])])}const m=l(t,[["render",i]]);export{g as __pageData,m as default};
