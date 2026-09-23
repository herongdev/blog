import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"常用注解","description":"","frontmatter":{"title":"常用注解","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/常用注解/常用注解.md","filePath":"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/常用注解/常用注解.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/01-Spring 核心/常用注解/常用注解.md"};function c(u,l,t,r,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**用于创建对象的**")]),s(`
`),n("span",{class:"line"},[n("span",null,'**相当于：****\\<bean id="" class=""\\>**')]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Component**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"把资源让 spring 来管理。相当于在 xml 中配置一个 bean。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value：指定 bean 的 id。如果不指定 value 属性，默认 bean 的 id 是当前类的类名。首字母小写。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Controller @Service @Repository**")]),s(`
`),n("span",{class:"line"},[n("span",null,"这三个注解都是针对一个的衍生注解，作用及属性都一样的，只不过提供了更加明确的语义化。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Controller****：**一般用于表现层的注解。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Service****：**一般用于业务层的注解。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Repository****：**一般用于持久层的注解。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**细节：如果注解中有且只有一个属性要赋值时，且名称是** **value****，****value** **在赋值是可以不写。**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**用于注入数据的**")]),s(`
`),n("span",{class:"line"},[n("span",null,'**相当于：****\\<property name="" ref=""\\>**')]),s(`
`),n("span",{class:"line"},[n("span",null,'**\\<property name="" value=""\\>**')]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Autowired**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"自动按照类型注入。当使用注解注入属性时，set 方法可以省略。它只能注入其他 bean 类型。当有多个")]),s(`
`),n("span",{class:"line"},[n("span",null,"类型匹配时，使用要注入的对象变量名称作为 bean 的 id，在 spring 容器查找，找到了也可以注入成功。找不到就报错。￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Qualifier")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在自动按照类型注入的基础之上，再按照 Bean 的 id 注入。它在给字段注入时不能独立使用，必须和")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Autowire 一起使用；但是给方法参数注入时，可以独立使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value：指定 bean 的 id。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Resource**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"直接按照 Bean 的 id 注入。它也只能注入其他 bean 类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"name：指定 bean 的 id。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Value**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"注入基本数据类型和 String 类型数据的")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value：用于指定值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**用于改变作用范围的：**")]),s(`
`),n("span",{class:"line"},[n("span",null,'**相当于：****\\<bean id="" class=""** **scope=""****\\>**')]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Scope**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"指定 bean 的作用范围。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value：指定范围的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"取值：singleton prototype request session globalsession")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**和生命周期相关的：****(****了解****)**")]),s(`
`),n("span",{class:"line"},[n("span",null,'**相当于：****\\<bean id="" class=""** **init-method="" destroy-method=""** **/\\>**￼**@PostConstruct**')]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于指定初始化方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@PreDestroy**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于指定销毁方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**关于** **Spring** **注解和** **XML** **的选择问题**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注解的优势：** 配置简单，维护方便（我们找到类，就相当于找到了对应的配置）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**XML** **的优势：**修改时，不用改源码。不涉及重新编译和部署。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Spring** **管理** **Bean** **方式的比较：**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"基于注解的 spring IoC 配置中，bean 对象的特点和基于 XML 配置是一模一样的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**spring** **的纯注解配置**")]),s(`
`),n("span",{class:"line"},[n("span",null,"写到此处，基于注解的 IoC 配置已经完成，但是大家都发现了一个问题：我们依然离不开 spring 的 xml 配置文件，那么能不能不写这个 bean.xml，所有配置都用注解来实现呢？当然，同学们也需要注意一下，我们选择哪种配置的原则是简化开发和配置方便，而非追求某种技术。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**待改造的问题**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们发现，之所以我们现在离不开 xml 配置文件，是因为我们有一句很关键的配置：")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 告知spring框架在，读取配置文件，创建容器时，扫描注解，依据注解创建对象，并存入容器中 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<context:component-scan base-package=_"com.itheima"_\\>\\</context:component-scan\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"如果他要也能用注解配置，那么我们就离脱离 xml 文件又进了一步。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"另外，数据源和 JdbcTemplate 的配置也需要靠注解来实现。")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置 dbAssit --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dbAssit"_ class=_"com.itheima.dbassit.DBAssit"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"dataSource"_ ref=_"dataSource"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- 配置数据源 --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<bean id=_"dataSource"_ class=_"com.mchange.v2.c3p0.ComboPooledDataSource"_\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"driverClass"_ value=_"com.mysql.jdbc.Driver"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"jdbcUrl"_ value=_"jdbc:mysql:///spring_day02"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"user"_ value=_"root"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<property name=_"password"_ value=_"1234"_\\>\\</property\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</bean\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**新注解说明**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Configuration**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于指定当前类是一个 spring 配置类，当创建容器时会从该类上加载注解。获取容器时需要使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"AnnotationApplicationContext(有@Configuration 注解的类.class)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value:用于指定配置类的字节码￼**示例代码：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* spring 的配置类，相当于 bean.xml 文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** SpringConfiguration {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经把配置文件用类来代替了，但是如何配置创建容器时要扫描的包呢？请看下一个注解。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@ComponentScan**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于指定 spring 在初始化容器时要扫描的包。作用和在 spring 的 xml 配置文件中的：")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<context:component-scan base-package="com.itheima"/\\>是一样的。')]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"basePackages：用于指定要扫描的包。和该注解中的 value 属性作用一样。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**示例代码：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* spring 的配置类，相当于 bean.xml 文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,'@ComponentScan("com.itheima")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** SpringConfiguration {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经配置好了要扫描的包，但是数据源和 JdbcTemplate 对象如何从配置文件中移除呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"请看下一个注解。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Bean**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"该注解只能写在方法上，表明使用此方法创建一个对象，并且放入 spring 容器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"name：给当前@Bean 注解方法创建的对象指定一个名称(即 bean 的 id）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**示例代码：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**/***")]),s(`
`),n("span",{class:"line"},[n("span",null,"***** **连接数据库的配置类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** JdbcConfig {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 创建一个数据源，并存入 spring 容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Bean(name="dataSource")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** DataSource createDataSource() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**try** {")]),s(`
`),n("span",{class:"line"},[n("span",null,"ComboPooledDataSource ds = **new** ComboPooledDataSource();")]),s(`
`),n("span",{class:"line"},[n("span",null,'ds.setUser("root");')]),s(`
`),n("span",{class:"line"},[n("span",null,'ds.setPassword("1234");')]),s(`
`),n("span",{class:"line"},[n("span",null,'ds.setDriverClass("com.mysql.jdbc.Driver");')]),s(`
`),n("span",{class:"line"},[n("span",null,'ds.setJdbcUrl("jdbc:mysql:///spring_day02");')]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** ds;")]),s(`
`),n("span",{class:"line"},[n("span",null,"} **catch** (Exception e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**throw new** RuntimeException(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 创建一个 DBAssit，并且也存入 spring 容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@param** dataSource")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Bean(name="dbAssit")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** DBAssit createDBAssit(DataSource dataSource) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return new** DBAssit(dataSource);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意****:**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经把数据源和 DBAssit 从配置文件中移除了，此时可以删除 bean.xml 了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是由于没有了配置文件，创建数据源的配置又都写死在类中了。如何把它们配置出来呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"请看下一个注解。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@PropertySource**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**￼properties 配置文件中，就可以使用此注解指定 properties 配置文件的位置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value[]：用于指定 properties 文件位置。如果是在类路径下，需要写上 classpath:")]),s(`
`),n("span",{class:"line"},[n("span",null,"**示例代码：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 连接数据库的配置类")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** JdbcConfig {")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${jdbc.driver}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** String driver;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${jdbc.url}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** String url;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${jdbc.username}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** String username;")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Value("${jdbc.password}")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** String password;")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 创建一个数据源，并存入 spring 容器中")]),s(`
`),n("span",{class:"line"},[n("span",null,"* **@return**")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,'@Bean(name="dataSource")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public** DataSource createDataSource() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**try** {")]),s(`
`),n("span",{class:"line"},[n("span",null,"ComboPooledDataSource ds = **new** ComboPooledDataSource();")]),s(`
`),n("span",{class:"line"},[n("span",null,"ds.setDriverClass(driver);")]),s(`
`),n("span",{class:"line"},[n("span",null,"ds.setJdbcUrl(url);")]),s(`
`),n("span",{class:"line"},[n("span",null,"ds.setUser(username);")]),s(`
`),n("span",{class:"line"},[n("span",null,"ds.setPassword(password);")]),s(`
`),n("span",{class:"line"},[n("span",null,"**return** ds;")]),s(`
`),n("span",{class:"line"},[n("span",null,"} **catch** (Exception e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**throw new** RuntimeException(e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**jdbc.properties** **文件：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"jdbc.driver=com.mysql.jdbc.Driver")]),s(`
`),n("span",{class:"line"},[n("span",null,"jdbc.url=jdbc:mysql://localhost:3306/day44_ee247_spring￼jdbc.username=root")]),s(`
`),n("span",{class:"line"},[n("span",null,"jdbc.password=1234")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时我们已经有了两个配置类，但是他们还没有关系。如何建立他们的关系呢？请看下一个注解。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Import**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于导入其他配置类，在引入其他配置类时，可以不用再写@Configuration 注解。当然，写上也没问")]),s(`
`),n("span",{class:"line"},[n("span",null,"题。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**属性：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"value[]：用于指定其他配置类的字节码。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**示例代码：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,'@ComponentScan(basePackages = "com.itheima.spring")')]),s(`
`),n("span",{class:"line"},[n("span",null,"@Import({ JdbcConfig.**class**})")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** SpringConfiguration {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,'@PropertySource("classpath:jdbc.properties")')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** JdbcConfig{")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经把要配置的都配置好了，但是新的问题产生了，由于没有配置文件了，如何获取容器呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"请看下一小节。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**通过注解获取容器：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"ApplicationContext ac =")]),s(`
`),n("span",{class:"line"},[n("span",null,"**new** AnnotationConfigApplicationContext(SpringConfiguration.**class**);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**工程结构图**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**测试类中的问题和解决思路**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在测试类中，每个测试方法都有以下两行代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,'ApplicationContext ac = **new** ClassPathXmlApplicationContext("bean.xml");')]),s(`
`),n("span",{class:"line"},[n("span",null,'IAccountService as = ac.getBean("accountService",IAccountService.**class**);')]),s(`
`),n("span",{class:"line"},[n("span",null,"这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**解决思路分析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"针对上述问题，我们需要的是程序能自动帮我们创建容器。一旦程序能自动为我们创建 spring 容器，我们就无须手动创建了，问题也就解决了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们都知道，junit 单元测试的原理（在 web 阶段课程中讲过），但显然，junit 是无法实现的，因为它自己都无法知晓我们是否使用了 spring 框架，更不用说帮我们创建 spring 容器了。不过好在，junit 给我们暴露了一个注解，可以让我们替换掉它的运行器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这时，我们需要依靠 spring 框架，因为它提供了一个运行器，可以读取配置文件（或注解）来创建容器。我们只需要告诉它配置文件在哪就行了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**配置步骤**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**第一步：拷贝整合** **junit** **的必备** **jar** **包到** **lib** **目录**")]),s(`
`),n("span",{class:"line"},[n("span",null,"此处需要注意的是，导入 jar 包时，需要导入一个 spring 中 aop 的 jar 包。￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"第二步：使用@RunWith 注解替换原有运行器")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试类")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@RunWith**(SpringJUnit4ClassRunner.**class**)")]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**第三步：使用****@ContextConfiguration** **指定** **spring** **配置文件的位置**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试类")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@RunWith(SpringJUnit4ClassRunner.**class**)")]),s(`
`),n("span",{class:"line"},[n("span",null,'**@ContextConfiguration**(locations= {"classpath:bean.xml"})')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"**locations** **属性：**用于指定配置文件的位置。如果是类路径下，需要用 **classpath:**表明")]),s(`
`),n("span",{class:"line"},[n("span",null,"**classes** **属性：**用于指定注解的类。当不使用 xml 配置时，需要用此属性指定注解类的位置。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**第四步：使用****@Autowired** **给测试类中的变量注入数据**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 测试类")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@RunWith(SpringJUnit4ClassRunner.**class**)")]),s(`
`),n("span",{class:"line"},[n("span",null,'@ContextConfiguration(locations= {"classpath:bean.xml"})')]),s(`
`),n("span",{class:"line"},[n("span",null,"**public class** AccountServiceTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"**@Autowired**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**private** IAccountService as ;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**为什么不把测试类配到** **xml** **中**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在解释这个问题之前，先解除大家的疑虑，配到 XML 中能不能用呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"答案是肯定的，没问题，可以使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么为什么不采用配置到 xml 中的方式呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个原因是这样的：")]),s(`
`),n("span",{class:"line"},[n("span",null,"第一：当我们在 xml 中配置了一个 bean，spring 加载配置文件创建容器时，就会创建对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"第二：测试类只是我们在测试功能时使用，而在项目中它并不参与程序逻辑，也不会解决需求上的问")]),s(`
`),n("span",{class:"line"},[n("span",null,"题，所以创建完了，并没有使用。那么存在容器中就会造成资源的浪费。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以，基于以上两点，我们不应该把测试配置到 xml 文件中。")])])])])],-1)])])}const g=a(i,[["render",c]]);export{b as __pageData,g as default};
