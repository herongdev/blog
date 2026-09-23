import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"SpringBoot的配置文件","description":"","frontmatter":{"title":"SpringBoot的配置文件","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/SpringBoot的配置文件.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/SpringBoot的配置文件.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/C-配置与整合/SpringBoot的配置文件/SpringBoot的配置文件.md"};function t(c,a,r,u,o,g){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**SpringBoot****配置文件类型和作用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringBoot是基于约定的，所以很多配置都有默认值，但如果想使用自己的配置替换默认配置的话，就可以使用application.properties或者application.yml（application.yaml）进行配置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringBoot默认会从Resources目录下加载application.properties或application.yml（application.yaml）文件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'@ConfigurationProperties(prefix = "server", ignoreUnknownFields = true)')]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ServerProperties {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* Server HTTP port.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"private Integer port;")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* Network address to which the server should bind.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"private InetAddress address;")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼其中，application.properties文件是键值对类型的文件，之前一直在使用，所以此处不在对properties文件的格式进行阐述。除了properties文件外，SpringBoot还可以使用yml文件进行配置，下面对yml文件进行讲解。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**application.yml****配置文件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**yml****配置文件简介**")]),s(`
`),n("span",{class:"line"},[n("span",null,"YML文件格式是YAML (YAML Aint Markup Language)编写的文件格式，YAML是一种直观的能够被电脑识别的的数据数据序列化格式，并且容易被人类阅读，容易和脚本语言交互的，可以被支持YAML库的不同的编程语言程序导入，比如： C/C++, Ruby, Python, Java, Perl, C#, PHP等。YML文件是以数据为核心的，比传统的xml方式更加简洁。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"YML文件的扩展名可以使用.yml或者.yaml。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**yml****配置文件的语法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置普通数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"语法： key: value")]),s(`
`),n("span",{class:"line"},[n("span",null,"示例代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：value之前有一个空格")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置对象数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"语法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"key:")]),s(`
`),n("span",{class:"line"},[n("span",null,"key1: value1")]),s(`
`),n("span",{class:"line"},[n("span",null,"key2: value2")]),s(`
`),n("span",{class:"line"},[n("span",null,"或者：")]),s(`
`),n("span",{class:"line"},[n("span",null,"key: {key1: value1,key2: value2}")]),s(`
`),n("span",{class:"line"},[n("span",null,"示例代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：key1前面的空格个数不限定，在yml语法中，相同缩进代表同一个级别")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置****Map****数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"同上面的对象写法")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: haohao")]),s(`
`),n("span",{class:"line"},[n("span",null,"person:")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: haohao")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 31")]),s(`
`),n("span",{class:"line"},[n("span",null,"addr: beijing")]),s(`
`),n("span",{class:"line"},[n("span",null,"#或者")]),s(`
`),n("span",{class:"line"},[n("span",null,"person: {name: haohao,age: 31,addr: beijing}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置数组（List、Set）数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"语法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"key:")]),s(`
`),n("span",{class:"line"},[n("span",null,"- value1")]),s(`
`),n("span",{class:"line"},[n("span",null,"- value2")]),s(`
`),n("span",{class:"line"},[n("span",null,"或者：")]),s(`
`),n("span",{class:"line"},[n("span",null,"key: [value1,value2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"示例代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：value1与之前的 - 之间存在一个空格")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**SpringBoot****配置信息的查询**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面提及过，SpringBoot的配置文件，主要的目的就是对配置信息进行修改的，但在配置时的key从哪里去查询呢？我们可以查阅SpringBoot的官方文档")]),s(`
`),n("span",{class:"line"},[n("span",null,"文档URL：https://docs.spring.io/spring-boot/docs/2.0.1.RELEASE/reference/htmlsingle/#common-application-")]),s(`
`),n("span",{class:"line"},[n("span",null,"properties")]),s(`
`),n("span",{class:"line"},[n("span",null,"常用的配置摘抄如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"city:")]),s(`
`),n("span",{class:"line"},[n("span",null,"- beijing")]),s(`
`),n("span",{class:"line"},[n("span",null,"- tianjin")]),s(`
`),n("span",{class:"line"},[n("span",null,"- shanghai")]),s(`
`),n("span",{class:"line"},[n("span",null,"- chongqing")]),s(`
`),n("span",{class:"line"},[n("span",null,"#或者")]),s(`
`),n("span",{class:"line"},[n("span",null,"city: [beijing,tianjin,shanghai,chongqing]")]),s(`
`),n("span",{class:"line"},[n("span",null,"#集合中的元素是对象形式")]),s(`
`),n("span",{class:"line"},[n("span",null,"student:")]),s(`
`),n("span",{class:"line"},[n("span",null,"- name: zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"score: 100")]),s(`
`),n("span",{class:"line"},[n("span",null,"- name: lisi")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 28")]),s(`
`),n("span",{class:"line"},[n("span",null,"score: 88")]),s(`
`),n("span",{class:"line"},[n("span",null,"- name: wangwu")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 38")]),s(`
`),n("span",{class:"line"},[n("span",null,"score: 90")]),s(`
`),n("span",{class:"line"},[n("span",null,"# QUARTZ SCHEDULER (QuartzProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.quartz.jdbc.initialize-schema=embedded # Database schema initialization mode.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.quartz.jdbc.schema=classpath:org/quartz/impl/jdbcjobstore/tables_@@platform@@.")]),s(`
`),n("span",{class:"line"},[n("span",null,"sql # Path to the SQL file to use to initialize the database schema.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.quartz.job-store-type=memory # Quartz job store type.")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼我们可以通过配置application.poperties 或者 application.yml 来修改SpringBoot的默认配置")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"application.properties文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"application.yml文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.quartz.properties.*= # Additional Quartz Scheduler properties.")]),s(`
`),n("span",{class:"line"},[n("span",null,"# ----------------------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"# WEB PROPERTIES")]),s(`
`),n("span",{class:"line"},[n("span",null,"# ----------------------------------------")]),s(`
`),n("span",{class:"line"},[n("span",null,"# EMBEDDED SERVER CONFIGURATION (ServerProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.port=8080 # Server HTTP port.")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.servlet.context-path= # Context path of the application.")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.servlet.path=/ # Path of the main dispatcher servlet.")]),s(`
`),n("span",{class:"line"},[n("span",null,"# HTTP encoding (HttpEncodingProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.http.encoding.charset=UTF-8 # Charset of HTTP requests and responses. Added to")]),s(`
`),n("span",{class:"line"},[n("span",null,'the "Content-Type" header if not set explicitly.')]),s(`
`),n("span",{class:"line"},[n("span",null,"# JACKSON (JacksonProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.jackson.date-format= # Date format string or a fully-qualified date format")]),s(`
`),n("span",{class:"line"},[n("span",null,"class name. For instance, `yyyy-MM-dd HH:mm:ss`.")]),s(`
`),n("span",{class:"line"},[n("span",null,"# SPRING MVC (WebMvcProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.mvc.servlet.load-on-startup=-1 # Load on startup priority of the dispatcher")]),s(`
`),n("span",{class:"line"},[n("span",null,"servlet.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.mvc.static-path-pattern=/** # Path pattern used for static resources.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.mvc.view.prefix= # Spring MVC view prefix.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.mvc.view.suffix= # Spring MVC view suffix.")]),s(`
`),n("span",{class:"line"},[n("span",null,"# DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.driver-class-name= # Fully qualified name of the JDBC driver. Auto-")]),s(`
`),n("span",{class:"line"},[n("span",null,"detected based on the URL by default.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.password= # Login password of the database.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.url= # JDBC URL of the database.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.datasource.username= # Login username of the database.")]),s(`
`),n("span",{class:"line"},[n("span",null,"# JEST (Elasticsearch HTTP client) (JestProperties)")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.elasticsearch.jest.password= # Login password.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.elasticsearch.jest.proxy.host= # Proxy host the HTTP client should use.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.elasticsearch.jest.proxy.port= # Proxy port the HTTP client should use.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.elasticsearch.jest.read-timeout=3s # Read timeout.")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.elasticsearch.jest.username= # Login username.")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.port=8888")]),s(`
`),n("span",{class:"line"},[n("span",null,"server.servlet.context-path=demo")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼**配置文件与配置类的属性映射方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用注解****@Value****映射**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们可以通过@Value注解将配置文件中的值映射到一个Spring管理的Bean的字段上")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"application.properties配置如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"或者，application.yml配置如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"实体Bean代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"浏览器访问地址：http://localhost:8080/quick 结果如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"server:")]),s(`
`),n("span",{class:"line"},[n("span",null,"port: 8888")]),s(`
`),n("span",{class:"line"},[n("span",null,"servlet:")]),s(`
`),n("span",{class:"line"},[n("span",null,"context-path: /demo")]),s(`
`),n("span",{class:"line"},[n("span",null,"person:")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"person:")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Controller")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class QuickStartController {")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${person.name}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${person.age}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"private Integer age;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@RequestMapping("/quick")')]),s(`
`),n("span",{class:"line"},[n("span",null,"@ResponseBody")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String quick(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'return "springboot 访问成功! name="+name+",age="+age;')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用注解****@ConfifigurationProperties****映射**")]),s(`
`),n("span",{class:"line"},[n("span",null,'通过注解@ConfifigurationProperties(prefifix="配置文件中的key的前缀")可以将配置文件中的配置自动与实体进行映射')]),s(`
`),n("span",{class:"line"},[n("span",null,"application.properties配置如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"或者，application.yml配置如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"实体Bean代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"person:")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"person:")]),s(`
`),n("span",{class:"line"},[n("span",null,"name: zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"age: 18")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Controller")]),s(`
`),n("span",{class:"line"},[n("span",null,'@ConfigurationProperties(prefix = "person")')]),s(`
`),n("span",{class:"line"},[n("span",null,"public class QuickStartController {")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"private Integer age;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@RequestMapping("/quick")')]),s(`
`),n("span",{class:"line"},[n("span",null,"@ResponseBody")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String quick(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'return "springboot 访问成功! name="+name+",age="+age;')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setName(String name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setAge(Integer age) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"浏览器访问地址：http://localhost:8080/quick 结果如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：使用@ConfifigurationProperties方式可以进行配置文件与实体字段的自动映射，但需要字段必须提供set方法才可以，而使用@Value注解修饰的字段不需要提供set方法")])])])])],-1)])])}const m=l(i,[["render",t]]);export{h as __pageData,m as default};
