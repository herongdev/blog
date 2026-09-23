import{_ as l,o as _,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"Elasticsearch入门","description":"","frontmatter":{"title":"Elasticsearch入门","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/Elasticsearch入门.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/Elasticsearch入门.md"}'),p={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/Elasticsearch介绍/Elasticsearch入门.md"};function c(i,a,t,u,r,o){return _(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Elasticsearch****是什么**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Elasticsearch是一个基于Apache Lucene(TM)的开源搜索引擎，无论在开源还是专有领域，Lucene可以被认为是迄今为止最先进、性能最好的、功能最全的搜索引擎库。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是，Lucene只是一个库。想要发挥其强大的作用，你需使用Java并要将其集成到你的应用中。Lucene非常复杂，你需要深入的了解检索相关知识来理解它是如何工作的。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"Elasticsearch也是使用Java编写并使用Lucene来建立索引并实现搜索功能，但是它的目的是通过简单连贯的RESTful API让全文搜索变得简单并隐藏Lucene的复杂性。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"不过，Elasticsearch不仅仅是Lucene和全文搜索引擎，它还提供：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"分布式的实时文件存储，每个字段都被索引并可被搜索")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"实时分析的分布式搜索引擎")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以扩展到上百台服务器，处理PB级结构化或非结构化数据")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"而且，所有的这些功能被集成到一台服务器，你的应用可以通过简单的RESTful API、各种语言的客户端甚至命令行与之交互。上手Elasticsearch非常简单，它提供了许多合理的缺省值，并对初学者隐藏了复杂的搜索引擎理论。它开箱即用（安装即可使用），只需很少的学习既可在生产环境中使用。Elasticsearch在Apache 2 license下许可使用，可以免费下载、使用和修改。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"随着知识的积累，你可以根据不同的问题领域定制Elasticsearch的高级特性，这一切都是可配置的，并且配置非常灵活。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Elasticsearch****中涉及到的重要概念**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Elasticsearch有几个核心概念。从一开始理解这些概念会对整个学习过程有莫大的帮助。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1） 接近实时（NRT） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"Elasticsearch是一个接近实时的搜索平台。这意味着，从索引一个文档直到这个文档能够被搜索到有一个轻微的延迟（通常是1秒）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2） 集群（cluster） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个集群就是由一个或多个节点组织在一起，它们共同持有你整个的数据，并一起提供索引和搜索功能。一个集群由一个唯一的名字标识，这个名字默认就是“elasticsearch”。这个名字是重要的，因为一个节点只能通过指定某个集群的名字，来加入这个集群。在产品环境中显式地设定这个名字是一个好习惯，但是使用默认值来进行测试/开发也是不错的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3） 节点（node） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个节点是你集群中的一个服务器，作为集群的一部分，它存储你的数据，参与集群的索引和搜索功能。和集群类似，一个节点也是由一个名字来标识的，默认情况下，这个名字是一个随机的漫威漫画角色的名字，这个名字会在启动的时候赋予节点。这个名字对于管理工作来说挺重要的，因为在这个管理过程中，你会去确定网络中的哪些服务器对应于Elasticsearch集群中的哪些节点。")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个节点可以通过配置集群名称的方式来加入一个指定的集群。默认情况下，每个节点都会被安排加入到一个叫做“elasticsearch”的集群中，这意味着，如果你在你的网络中启动了若干个节点，并假定它们能够相互发现彼此，它们将会自动地形成并加入到一个叫做“elasticsearch”的集群中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在一个集群里，只要你想，可以拥有任意多个节点。而且，如果当前你的网络中没有运行任何Elasticsearch节点，这时启动一个节点，会默认创建并加入一个叫做“elasticsearch”的集群。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（4） 索引（index） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个索引就是一个拥有几分相似特征的文档的集合。比如说，你可以有一个客户数据的索引，另一个产品目录的索引，还有一个订单数据的索引。一个索引由一个名字来标识（必须全部是小写字母的），并且当我们要对对应于这个索引中的文档进行索引、搜索、更新和删除的时候，都要使用到这个名字。索引类似于关系型数据库中Database的概念。在一个集群中，如果你想，可以定义任意多的索引。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（5） 类型（type） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"在一个索引中，你可以定义一种或多种类型。一个类型是你的索引的一个逻辑上的分类/分区，其语义完全由你来定。通常，会为具有一组共同字段的文档定义一个类型。比如说，我们假设你运营一个博客平台并且将你所有的数据存储到一个索引中。在这个索引中，你可以为用户数据定义一个类型，为博客数据定义另一个类型，当然，也可以为评论数据定义另一个类型。类型类似于关系型数据库中Table的概念。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（6）文档（document） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个文档是一个可被索引的基础信息单元。比如，你可以拥有某一个客户的文档，某一个产品的一个文档，当然，也可以拥有某个订单的一个文档。文档以JSON（Javascript Object Notation）格式来表示，而JSON是一个到处存在的互联网数据交互格式。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"在一个index/type里面，只要你想，你可以存储任意多的文档。注意，尽管一个文档，物理上存在于一个索引之中，文档必须被索引/赋予一个索引的type。文档类似于关系型数据库中Record的概念。实际上一个文档除了用户定义的数据外，还包括==_index==、==_type==和==_id==字段。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（7） 分片和复制（shards & replicas） ")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个索引可以存储超出单个结点硬件限制的大量数据。比如，一个具有10亿文档的索引占据1TB的磁盘空间，而任一节点都没有这样大的磁盘空间；或者单个节点处理搜索请求，响应太慢。")]),s(`
`),n("span",{class:"line"},[n("span",null,"为了解决这个问题，Elasticsearch提供了将索引划分成多份的能力，这些份就叫做分片。当你创建一个索引的时候，你可以指定你想要的分片的数量。每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"分片之所以重要，主要有两方面的原因：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"允许你水平分割/扩展你的内容容量")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"允许你在分片（潜在地，位于多个节点上）之上进行分布式的、并行的操作，进而提高性能/吞吐量")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"至于一个分片怎样分布，它的文档怎样聚合回搜索请求，是完全由Elasticsearch管理的，对于作为用户的你来说，这些都是透明的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在一个网络/云的环境里，失败随时都可能发生，在某个分片/节点不知怎么的就处于离线状态，或者由于任何原因消失了。这种情况下，有一个故障转移机制是非常有用并且是强烈推荐的。为此目的，Elasticsearch允许你创建分片的一份或多份拷贝，这些拷贝叫做复制分片，或者直接叫复制。复制之所以重要，主要有两方面的原因：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在分片/节点失败的情况下，提供了高可用性。因为这个原因，注意到复制分片从不与原/主要（original/primary）分片置于同一节点上是非常重要的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"扩展你的搜索量/吞吐量，因为搜索可以在所有的复制上并行运行")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"总之，每个索引可以被分成多个分片。一个索引也可以被复制0次（意思是没有复制）或多次。一旦复制了，每个索引就有了主分片（作为复制源的原来的分片）和复制分片（主分片的拷贝）之别。分片和复制的数量可以在索引创建的时候指定。在索引创建之后，你可以在任何时候动态地改变复制数量，但是不能改变分片的数量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"默认情况下，Elasticsearch中的每个索引被分片5个主分片和1个复制，这意味着，如果你的集群中至少有两个节点，你的索引将会有5个主分片和另外5个复制分片（1个完全拷贝），这样的话每个索引总共就有10个分片。一个索引的多个分片可以存放在集群中的一台主机上，也可以存放在多台主机上，这取决于你的集群机器数量。主分片和复制分片的具体位置是由ES内在的策略所决定的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"以上部分内容转自[Elasticsearch](http://blog.csdn.net/cnweike/article/details/33736429)基础教程，并对其进行了补充。")]),s(`
`),n("span",{class:"line"},[n("span",null," **ES****的配置**")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置文件所在的目录路径如下：$ES_HOME/config/elasticsearch.yml。 ")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面介绍一些重要的配置项及其含义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"（1）cluster.name: elasticsearch")]),s(`
`),n("span",{class:"line"},[n("span",null,"_配置__elasticsearch__的集群名称，默认是__elasticsearch__。__elasticsearch__会自动发现在同一网段下的集群名为__elasticsearch__的主机，如果在同一网段下有多个集群，就可以用这个属性来区分不同的集群。生成环境时建议更改。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）node.name: “Franz Kafka”")]),s(`
`),n("span",{class:"line"},[n("span",null,"_节点名，默认随机指定一个__name__列表中名字，该列表在__elasticsearch__的__jar__包中__config__文件夹里__name.txt__文件中，其中有很多作者添加的有趣名字，大部分是漫威动漫里面的人物名字。生成环境中建议更改以能方便的指定集群中的节点对应的机器_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）node.master: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"_指定该节点是否有资格被选举成为__node__，默认是__true__，__elasticsearch__默认集群中的第一台启动的机器为__master__，如果这台机挂了就会重新选举__master__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（4）node.data: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"_指定该节点是否存储索引数据，默认为__true__。如果节点配置__node.master:false__并且__node.data: false__，则该节点将起到负载均衡的作用_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（5）index.number_of_shards: 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置默认索引分片个数，默认为__5__片。经本人测试，索引分片对__ES__的查询性能有很大的影响，在应用环境，应该选择适合的分片大小。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（6）index.number_of_replicas:")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置默认索引副本个数，默认为__1__个副本。此处的__1__个副本是指__index.number_of_shards__的一个完全拷贝；默认__5__个分片__1__个拷贝；即总分片数为__10__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（7）path.conf: /path/to/conf")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置配置文件的存储路径，默认是__es__根目录下的__config__文件夹。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（8）path.data:/path/to/data1,/path/to/data2")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置索引数据的存储路径，默认是__es__根目录下的__data__文件夹，可以设置多个存储路径，用逗号隔开。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（9）path.work:/path/to/work")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置临时文件的存储路径，默认是__es__根目录下的__work__文件夹。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（10）path.logs: /path/to/logs")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置日志文件的存储路径，默认是__es__根目录下的__logs__文件夹_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（11）path.plugins: /path/to/plugins")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置插件的存放路径，默认是__es__根目录下的__plugins__文件夹_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（12）bootstrap.mlockall: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置为__true__来锁住内存。因为当__jvm__开始__swapping__时__es__的效率会降低，所以要保证它不__swap__，可以把__ES_MIN_MEM__和__ES_MAX_MEM__两个环境变量设置成同一个值，并且保证机器有足够的内存分配给__es__。同时也要允许__elasticsearch__的进程可以锁住内存，__linux__下可以通过__ulimit -l unlimited__命令。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（13）network.bind_host: 192.168.0.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置绑定的__ip__地址，可以是__ipv4__或__ipv6__的，默认为__0.0.0.0__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（14）network.publish_host: 192.168.0.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置其它节点和该节点交互的__ip__地址，如果不设置它会自动判断，值必须是个真实的__ip__地址。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（15）network.host: 192.168.0.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"_这个参数是用来同时设置__bind_host__和__publish_host__上面两个参数。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（16）transport.tcp.port: 9300")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置节点间交互的__tcp__端口，默认是__9300__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（17）transport.tcp.compress: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置是否压缩__tcp__传输时的数据，默认为__false__，不压缩。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（18）http.port: 9200")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置对外服务的__http__端口，默认为__9200__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（19）http.max_content_length: 100mb")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置内容的最大容量，默认__100mb_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（20）http.enabled: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"_是否使用__http__协议对外提供服务，默认为__true__，开启。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（21）gateway.type: local")]),s(`
`),n("span",{class:"line"},[n("span",null,"_gateway__的类型，默认为__local__即为本地文件系统，可以设置为本地文件系统，分布式文件系统，__hadoop__的__HDFS__，和__amazon__的__s3__服务器，其它文件系统的设置。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（22）gateway.recover_after_nodes: 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置集群中__N__个节点启动时进行数据恢复，默认为__1__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（23）gateway.recover_after_time: 5m")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置初始化数据恢复进程的超时时间，默认是__5__分钟。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（24）gateway.expected_nodes: 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置这个集群中节点的数量，默认为__2__，一旦这__N__个节点启动，就会立即进行数据恢复。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（25）cluster.routing.allocation.node_initial_primaries_recoveries: 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"_初始化数据恢复时，并发恢复线程的个数，默认为__4__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（26）cluster.routing.allocation.node_concurrent_recoveries: 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"_添加删除节点或负载均衡时并发恢复线程的个数，默认为__4__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（27）indices.recovery.max_size_per_sec: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置数据恢复时限制的带宽，如入__100mb__，默认为__0__，即无限制。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（28）indices.recovery.concurrent_streams: 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置这个参数来限制从其它分片恢复数据时最大同时打开并发流的个数，默认为__5__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（29）discovery.zen.minimum_master_nodes: 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置这个参数来保证集群中的节点可以知道其它__N__个有__master__资格的节点。默认为__1__，对于大的集群来说，可以设置大一点的值（__2-4__）_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（30）discovery.zen.ping.timeout: 3s")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置集群中自动发现其它节点时__ping__连接超时时间，默认为__3__秒，对于比较差的网络环境可以高点的值来防止自动发现时出错。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（31）discovery.zen.ping.multicast.enabled: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置是否打开多播发现节点，默认是__true__。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"（32）discovery.zen.ping.unicast.hosts: [“host1”, “host2:port”, “host3 [portX-portY] “]")]),s(`
`),n("span",{class:"line"},[n("span",null,"_设置集群中__master__节点的初始列表，可以通过这些节点来自动发现新加入集群的节点。_")]),s(`
`),n("span",{class:"line"},[n("span",null,"除了上面的在安装时配置文件中就自带的配置项外，本人在实际使用过程还使用到了下面的配置：")]),s(`
`),n("span",{class:"line"},[n("span",null,"==threadpool:====￼==    ==search:====￼==        ==type: fixed====￼==        ==min: 60====￼==        ==max: 80====￼==        ==queue_size: 1000====￼====//== ==配置====es====服务器的执行查询操作时所用线程池，====fix====固定线程数的线程池。==")]),s(`
`),n("span",{class:"line"},[n("span",null," ==index :====￼==    ==store:====￼==        ==type:== ==memory====￼====//== ==表示索引存储在内存中，当然====es====不太建议这么做。经本人测试，做查询时，使用内存索引并不会比正常的索引快。==")]),s(`
`),n("span",{class:"line"},[n("span",null," ==index.mapper.dynamic: false====￼====//== ==禁止自动创建====mapping====。默认情况下，====es====可以根据数据类型自动创建====mapping====。配置成这样，可以禁止自动创建====mapping====的行为。至于什么是====mapping====，在之后的博文中再介绍。==")]),s(`
`),n("span",{class:"line"},[n("span",null," ==index.query.parse.allow_unmapped_fields: false== ==￼====//== ==不能查找没有在====mapping====中定义的属性==")]),s(`
`),n("span",{class:"line"},[n("span",null," 以上总结介绍了Elasticsearch中的一些基础知识，包括其中的一些核心概念。只有理解了ES中的这些核心概念，才能对更加得心应手地使用ES，发挥其强大的搜索能力。同时，也介绍了ES的安装和运行，ES的安装和运行是很简单的，只需要极少的简单步骤，就可以开始体验ES。ES的配置非常丰富，安装时自带的配置文件只包含一部分比较核心的配置项，更多的配置内容需要自己去阅读ES的源码时才能被发现。")])])])])],-1)])])}const m=l(p,[["render",c]]);export{d as __pageData,m as default};
