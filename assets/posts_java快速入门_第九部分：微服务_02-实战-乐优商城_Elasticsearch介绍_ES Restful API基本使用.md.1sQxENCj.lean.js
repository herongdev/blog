import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"ES Restful API基本使用","description":"","frontmatter":{"title":"ES Restful API基本使用","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/ES Restful API基本使用.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/ES Restful API基本使用.md"}'),t={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/ES Restful API基本使用.md"};function i(c,a,u,o,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ES为开发者提供了非常丰富的基于HTTP协议的Rest API，只需要向ES服务端发送简单的Rest请求，就可以实现非常强大的功能。本篇文章主要介绍ES中常用操作的Rest API的使用，同时会讲解ES的源代码工程中的API接口文档，通过了解这个API文档的接口描述结构，就基本上可以实现ES中的绝大部分功能。")]),s(`
`),n("span",{class:"line"},[n("span",null,"_注意：查询是__ES__的核心。作为一个先进的搜索引擎，__ES__中提供了多种查询接口。本篇仅仅会涉及查询__API__的结构，而具体如何使用__ES__所提供的各种查询__API__，会在接下来的博文中做详细介绍。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"**基础知识**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果之前没有用过类似于ES这样的索引数据库（暂且将ES归为数据库类，与传统的数据库有较大的区别），要理解本篇博文介绍的API是有些难度的。本节先介绍一些基础知识，对理解全文有很帮助。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Mapping****详解**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Mapping是ES中的一个很重要的内容，它类似于传统关系型数据中table的schema，用于定义一个索引（index）的某个类型（type）的数据的结构。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在传统关系型数据库，我们必须首先创建table并同时定义其schema，如下面的SQL语句。下面代码中小括号内的代码的作用就是定义person_info的schema（模式）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"==create table person_info====￼====(====￼==    ==name varchar(20),====￼==    ==age tinyint== ==￼====)==")]),s(`
`),n("span",{class:"line"},[n("span",null,"在ES中，我们无需手动创建type（相当于table）和mapping(相关与schema)。在默认配置下，ES可以根据插入的数据自动地创建type及其mapping。在下面的API介绍部分中，会做相关的试验。当然，在实际使用过程中我们可能就想硬性规定mapping，可以通过配置文件关闭ES的自动创建mapping功能。")]),s(`
`),n("span",{class:"line"},[n("span",null,"mapping中主要包括字段名、字段数据类型和字段索引类型这3个方面的定义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"字段名：这就不用说了，与传统数据库字段名作用一样，就是给字段起个唯一的名字，好让系统和用户能识别。")]),s(`
`),n("span",{class:"line"},[n("span",null,"字段数据类型：定义该字段保存的数据的类型，不符合数据类型定义的数据不能保存到ES中。下表列出的是ES中所支持的数据类型。（大类是对所有类型的一种归类，小类是实际使用的类型。）")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"**大类**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**包含的小类**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"String")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"string")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Whole number")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"byte, short, integer, long")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Floating point")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"float, double")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Boolean")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"boolean")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Date")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"date")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"字段索引类型：索引是ES中的核心，ES之所以能够实现实时搜索，完全归功于Lucene这个优秀的Java开源索引。在传统数据库中，如果字段上建立索引，我们仍然能够以它作为查询条件进行查询，只不过查询速度慢点。而在ES中，字段如果不建立索引，则就不能以这个字段作为查询条件来搜索。也就是说，不建立索引的字段仅仅能起到数据载体的作用。string类型的数据肯定是日常使用得最多的数据类型，下面介绍mapping中string类型字段可以配置的索引类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"**索引类型**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**解释**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"analyzed")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"首先分析这个字符串，然后再建立索引。换言之，以全文形式索引此字段。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"not_analyzed")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"索引这个字段，使之可以被搜索，但是索引内容和指定值一样。不分析此字段。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"no")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"不索引这个字段。这个字段不能被搜索到。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果索引类型设置为analyzed，在表示ES会先对这个字段进行分析（一般来说，就是自然语言中的分词），ES内置了不少分析器（analyser），如果觉得它们对中文的支持不好，也可以使用第三方分析器。由于笔者在实际项目中仅仅将ES用作普通的数据查询引擎，所以并没有研究过这些分析器。如果将ES当做真正的搜索引擎，那么挑选正确的分析器是至关重要的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"mapping中除了上面介绍的3个主要的内容外，还有其他的定义内容，详见[官网文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-core-types.html)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**常用的****Rest API****介绍**")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面介绍一下ES中的一些常用的Rest API。掌握了这些API的用法，基本上就可以简单地使用ES了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们需要借助能够发送HTTP请求的工具调用这些API，工具是可以任意的，包括网页浏览器。这里利用Linux上的curl命令来发送HTTP请求。基本的命令结构为：")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ==curl \\<-Xaction\\> url -d== =='body'====￼==  ==#== ==这里的====action====表示====HTTP====协议中的各种动作，包括====GET====、====POST====、====PUT====、====DELETE====等。==")]),s(`
`),n("span",{class:"line"},[n("span",null," _注意。文中的示例代码里面包含了用户注释的文字，就是_ _#_ _号后面的文字。运行代码时，请注意删除这些注释。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"**查看集群（****Cluster****）信息相关****API**")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）查看集群健康信息。")]),s(`
`),n("span",{class:"line"},[n("span",null,'  ==curl -XGET "localhost:9200/_cat/heath?v"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"返回结果为：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==epoch      timestamp cluster       status node.total node.data shards pri relo init unassign pending_tasks== ==￼====1440206633 18====:23:53==  ==elasticsearch green           1         1      0   0    0    0        0             0==")]),s(`
`),n("span",{class:"line"},[n("span",null," 返回结果的主要字段意义：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"cluster：集群名，是在ES的配置文件中配置的cluster.name的值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"status：集群状态。集群共有green、yellow或red中的三种状态。green代表一切正常（集群功能齐全），yellow意味着所有的数据都是可用的，但是某些复制没有被分配（集群功能齐全），red则代表因为某些原因，某些数据不可用。如果是red状态，则要引起高度注意，数据很有可能已经丢失。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"node.total：集群中的节点数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"node.data：集群中的数据节点数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"shards：集群中总的分片数量。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"pri：主分片数量，英文全称为private。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"relo：复制分片总数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"unassign：未指定的分片数量，是应有分片数和现有的分片数的差值（包括主分片和复制分片）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们也可以在请求中添加help参数来查看每个操作返回结果字段的意义。")]),s(`
`),n("span",{class:"line"},[n("span",null,'  ==curl -XGET "localhost:9200/_cat/heath?help"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"返回结果如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==epoch         | t,time                                   | seconds== ==since 1970-01-01 00====:====00====:====00==  ==￼====timestamp     | ts,hms,hhmmss                            | time in== ==HH:MM:====SS==                   ==￼====cluster       | cl                                       | cluster name==                       ==￼====status        | st                                       | health status==                      ==￼====node.total    | nt,nodeTotal                             | total== ==number== ==of nodes==              ==￼====node.data     | nd,nodeData                              |== ==number== ==of nodes that can store data====￼====shards        | t,sh,shards.total,shardsTotal            | total== ==number== ==of shards==             ==￼====pri           | p,shards.primary,shardsPrimary           |== ==number== ==of primary shards==           ==￼====relo          | r,shards.relocating,shardsRelocating     |== ==number== ==of relocating nodes==         ==￼====init          | i,shards.initializing,shardsInitializing |== ==number== ==of initializing nodes==       ==￼====unassign      | u,shards.unassigned,shardsUnassigned     |== ==number== ==of unassigned shards==        ==￼====pending_tasks | pt,pendingTasks                          |== ==number== ==of pending tasks==")]),s(`
`),n("span",{class:"line"},[n("span",null,"确实是很好很强大。有了这个东东，就可以减少看文档的时间。ES中许多API都可以添加help参数来显示字段含义，哪些可以这么做呢？每个API都试试就知道了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"当然，如果你觉得返回的东西太多，看着眼烦，我们也可以人为地指定返回的字段。")]),s(`
`),n("span",{class:"line"},[n("span",null,'==curl -XGET "localhost:9200/_cat/health?h=cluster,pri,relo&v"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"这次的返回结果就简单很多罗。对于患有严重强迫症的患者来说，这是福音啊！")]),s(`
`),n("span",{class:"line"},[n("span",null,"==cluster==       ==pri relo== ==￼====elasticsearch   0    0==")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）查看集群中的节点信息。")]),s(`
`),n("span",{class:"line"},[n("span",null,'==curl -XGET "localhost:9200/_cat/nodes?v"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"返回节点的详细信息如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==host==          ==ip==            ==heap====.percent== ==ram====.percent== ==load node====.role== ==master name==    ==￼====master====.hadoop== ==localhost==            ==3          35 0.00== ==d==         ==*==      ==Ezekiel==")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）查看集群中的索引信息。")]),s(`
`),n("span",{class:"line"},[n("span",null,'==curl -XGET "localhost:9200/_cat/indices?v"==')]),s(`
`),n("span",{class:"line"},[n("span",null,"返回集群中的索引信息如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==health status index==      ==pri rep docs====.count== ==docs====.deleted== ==store====.size== ==pri====.store.size== ==￼====yellow open==   ==index_test==   ==5   1          0            0       575====b==           ==575====b==")]),s(`
`),n("span",{class:"line"},[n("span",null," 更多的查看和监视ES的API参见[官网文档](http://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**映射（****Mapping****）相关****API**")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）创建索引的mapping。")]),s(`
`),n("span",{class:"line"},[n("span",null,`==curl -XPUT== =='localhost:9200/index_test/_mapping/test_type' -d '== ==￼===={====￼==  =="test_type": {== ==#== ==注意，这里的====test_type====与====url====上的====test_type====名保存一致====￼==      =="properties": {====￼==        =="name": {====￼==          =="type": "string",====￼==          =="index": "not_analyzed"====￼==        ==},====￼==        =="age": {====￼==          =="type": "integer"====￼==        ==}====￼==      ==}====￼==    ==}====￼==  ==}'==`)]),s(`
`),n("span",{class:"line"},[n("span",null,"如果不想单独创建mapping，可以使用上一节的方法（创建索引时创建mappings）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"假设我们的项目中有多个环境（开发环境、测试环境等），那每一个环境的mapping总要一致的吧，那每次创建一次mappings就比较麻烦了，而且还容易导致数据不一致。莫急，ES还给我们准备另外一种创建mapping的方式。可以按照下面的步骤来做。")]),s(`
`),n("span",{class:"line"},[n("span",null,"步骤1 创建一个扩展名为test_type.json的文件名，其中type_test就是mapping所对应的type名。")]),s(`
`),n("span",{class:"line"},[n("span",null,"步骤2 在test_type.json中输入mapping信息。假设你的mapping如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,'=={====￼==  =="test_type": { #== ==注意，这里的====test_type====与====json====文件名必须一致====￼==      =="properties": {====￼==        =="name": {====￼==          =="type": "string",====￼==          =="index": "not_analyzed"====￼==        ==},====￼==        =="age": {====￼==          =="type": "integer"====￼==        ==}====￼==      ==}====￼==    ==}====￼==  ==}==')]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span",null,"步骤3 在$ES_HOME/config/路径下创建mappings/index_test子目录，这里的index_test目录名必须与我们要建立的索引名一致。将test_type.json文件拷贝到index_tes目录下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"步骤4 创建index_test索引。操作如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,'==curl -XPUT== =="localhost:9200/index_test"== ==#== ==注意，这里的索引名必须与====mappings====下新建的====index_test====目录名一致==')]),s(`
`),n("span",{class:"line"},[n("span",null,"这样我们就创建了一个新的索引，并且使用了test_type.json所定义的mapping作为索引的mapping。就是这么简单方便！")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）删除mapping。")]),s(`
`),n("span",{class:"line"},[n("span",null,"==curl -XDELETE 'localhost:9200/index_test/_mapping/test_type'==")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）查看索引的mapping。")]),s(`
`),n("span",{class:"line"},[n("span",null,"==curl -XGET 'localhost:9200/index_test/_mapping/test_type'==")]),s(`
`),n("span",{class:"line"},[n("span",null," 更多的mapping相关操作参加[官网文档](http://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**文档（****document****）相关****API**")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）新增一个文档。")]),s(`
`),n("span",{class:"line"},[n("span",null,`==curl -XPUT== =='localhost:9200/index_test/test_type/1?pretty' -d '== ==#== ==这里的====pretty====参数的作用是使得返回的====json====显示地更加好看。====1====是文档的====id====值（唯一键）。====￼===={====￼==    =="name": "zhangsan",====￼==    =="age" : "12"====￼====}'==`)]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）更新一个文档")]),s(`
`),n("span",{class:"line"},[n("span",null,`==curl -XPOST== =='localhost:9200/index_test/test_type/1?pretty' -d '== ==#== ==这里的====1====必须是索引中已经存在====id====，否则就会变成新增文档操作====￼===={====￼==    =="name": "lisi",====￼==    =="age" : "12"====￼====}'==`)]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）删除一个文档")]),s(`
`),n("span",{class:"line"},[n("span",null,"==curl -XDELETE== =='localhost:9200/index_test/test_type/1?pretty'== ==#== ==这里的====1====必须是索引中已经存在====id==")]),s(`
`),n("span",{class:"line"},[n("span",null,"（4）查询单个文档")]),s(`
`),n("span",{class:"line"},[n("span",null,"==curl -XGET 'localhost:9200/index_test/test_type/1?pretty'==")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的操作仅仅查询id为1的一条文档，这样看似乎ES的查询也太弱了。前面已经说过了，查询操作是ES中的核心，是其立身的根本。但是本文的重点并不在这里，为了防止文章的篇幅过长，之后将专本介绍ES中的查询操作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**源代码中提供的****Rest API****文档结构**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ES的源代码托管在[Github](https://github.com/elastic/elasticsearch)上。将源代码下载下来之后，里面有一个文件夹专门存放ES中绝大部分的Rest API。有了这些文档，就不必每次都要到官网上查询接口文档了（PS：ES的官网真的很慢）。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面以cat.health.json文件为例简单地介绍这些Rest API文档的结构。一旦结构搞清楚了，文档看起来就比较顺心，ES用起来就更加得心应手了！")]),s(`
`),n("span",{class:"line"},[n("span",null,'=={====￼==  =="cat.health": {====￼==    =="documentation": "====http://www.elastic.co/guide/en/elasticsearch/reference/master/cat-health.html====",== ==#== ==该文档对应的官方站点====￼==    =="methods": ["GET"],== ==￼==    =="url": {== ==# url====部分可选====￼==      =="path": "/_cat/health",==  ==￼==      =="paths": ["/_cat/health"],====￼==      =="parts": {====￼==      ==},====￼==      =="params": {====￼==        =="local": {====￼==          =="type" : "boolean",====￼==          =="description" : "Return local information, do not retrieve the state from master node (default: false)"====￼==        ==},====￼==        =="master_timeout": {====￼==          =="type" : "time",====￼==          =="description" : "Explicit operation timeout for connection to master node"====￼==        ==},====￼==        =="h": {====￼==            =="type": "list",====￼==            =="description" : "Comma-separated list of column names to display"====￼==        ==},====￼==        =="help": {====￼==          =="type": "boolean",====￼==          =="description": "Return help information",====￼==          =="default": false====￼==        ==},====￼==        =="ts": {====￼==          =="type": "boolean",====￼==          =="description": "Set to false to disable timestamping",====￼==          =="default": true====￼==        ==},====￼==        =="v": {====￼==          =="type": "boolean",====￼==          =="description": "Verbose mode. Display column headers",====￼==          =="default": true====￼==        ==}====￼==      ==}====￼==    ==},====￼==    =="body": null====￼==  ==}====￼====}==')]),s(`
`),n("span",{class:"line"},[n("span",null,"上面文档接口所对应的Reqeust操作如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,`==curl -XGET "localhost:9200/_cat/health?v" -d 'body'==`)]),s(`
`),n("span",{class:"line"},[n("span",null," 该操作命令可划分为5个部分，下面把这5个部分与文档对应起来。通过这个例子，就可以在阅读其他文档后，使用正确的操作了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"第1部分（-XGET）：对应文档中methods所包含的GET操作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"第2部分（localhost:9200）：是ES服务端所在主机的hostname和port。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"第3部分（/_cat/health）：对应文档中的url。其中path是最简单的url；paths是除了path之外的其他url；parts描述和解释paths里面的url的可变部分（通常用{}包裹，如{index}）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"第4部分v：表示参数，对应文档中的params。像“v”这种boolean类型的参数，不需要特意指定其布尔值（true或者false），出现即表示true，否则为false。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"第5部分body：表示要传递的数据主体,对应文档中的body。如果body里面指明“required=true”,则表示必须传入body数据。具体body里面需要传怎样的数据，则可以访问文档中的documentation字段所指明的官方站点进行查询。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**总结**")]),s(`
`),n("span",{class:"line"},[n("span",null,"本文重点介绍了ES中的一些常用Rest API的用法，并在开始部分简单地介绍了一些基础知识（Rest和mapping）。掌握了这些API的调用，就可以利用ES完成简单的应用程序了。当然，ES的API远不止这些，如果想要更加深入地了解ES的使用及其内部原理，建议先仔细地阅读ES的[官网文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)。然后[下载](https://github.com/elastic/elasticsearch)其源代码进行研究。")]),s(`
`),n("span",{class:"line"},[n("span",null,"想进阶的同学，请参考：**Elasticsearch:** **权威指南**")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.cnblogs.com/sunsky303/p/9438737.html\\>")])])])])],-1)])])}const _=l(t,[["render",i]]);export{m as __pageData,_ as default};
