---
title: Springboot starter开发之traceId请求日志链路追踪
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
隐 风

于 2021-10-04 16:09:43 发布

4233
收藏 9
分类专栏： springboot企业级实战 文章标签： spring java spring boot
版权

springboot企业级实战
专栏收录该内容
5 篇文章4 订阅
已订阅
一、请求链路追踪是什么？
能标识一次请求的完整流程，包括日志打印、响应标识等，以便于出现问题可以快速定位并解决问题。

二、使用步骤
1. 相关知识点
ThreadLocal：一种保证一种规避多线程访问出现线程不安全的方法，当我们在创建一个变量后，如果每个线程对其进行访问的时候访问的都是线程自己的变量这样就不会存在线程不安全问题。
MDC：（Mapped Diagnostic Context，映射调试上下文）是 log4j 和 logback 提供的一种方便在多线程条件下记录日志的功能，基于ThreadLocal实现的一种工具类。
拦截器：基于拦截器对每个请求注入traceId。
2. 代码实现
封装TraceId工具类：
/**
* @author yinfeng
* @description traceId工具类
* @since 2021/10/2 11:10
*/
public class TraceIdUtil {
private static final String TRACE_ID = "traceId";

public static void set() {
MDC.put(TRACE_ID, generate());
}

public static String get() {
return MDC.get(TRACE_ID);
}

public static void remove() {
MDC.remove(TRACE_ID);
}

public static String generate() {
return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
springboot环境注入工具类
/**
* @author yinfeng
* @description 资源配置工具类
* @since 2021/10/2 0:02
*/
public class PropertySourcesUtil {

private static final String NAME = "aop.yinfeng";

private static ConfigurableEnvironment environment;
private static SpringApplication application;

public static void setEnvironment(ConfigurableEnvironment environment) {
if (PropertySourcesUtil.environment == null) {
PropertySourcesUtil.environment = environment;
}
}

public static SpringApplication getApplication() {
return application;
}

public static void setApplication(SpringApplication application) {
PropertySourcesUtil.application = application;
}

public static void set(String key, Object value) {
getSourceMap().put(key, value);
}

public static Object get(String key) {
return getSourceMap().get(key);
}

public static Map\<String, Object\> getSourceMap() {
PropertySource\<?\> propertySource = environment.getPropertySources().get(NAME);
Map\<String, Object\> source;
if (propertySource == null) {
source = new LinkedHashMap\<String, Object\>();
propertySource = new MapPropertySource(NAME, source);
environment.getPropertySources().addLast(propertySource);
}
source = (Map\<String, Object\>) propertySource.getSource();
return source;
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
支持配置的日志实体类：
/**
* @author yinfeng
* @description 日志配置类
* @since 2021/10/1 17:45
*/
@Data
@ConfigurationProperties(prefix = "aop.logging")
public class LogProperties {

private String logDir;
// 因为logback和log4j的日志格式略有不同，所以提供2种打印格式
private String logbackPattern = "%d{yyyy-MM-dd HH:mm:ss.SSS} %X{traceId} %-5level %logger{30} : %msg%n";
private String log4jPattern = "%d{yyyy-MM-dd HH:mm:ss.SSS} %X{traceId} %-5level %clr{%-30.30c{1.}}{cyan} : %msg%n";
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
环境增强注入配置：因为请求链路追踪在各个服务中比较常用，所以以starter的形式进行封装，在spring环境加载后进行配置注入。
/**
* @author yinfeng
* @description 环境注入抽象类
* @since 2021/10/1 17:55
*/
public abstract class AbstractEnvironmentPostProcessor implements EnvironmentPostProcessor {

private static final String DEV = "dev";
private static final String STG = "stg";
private static final String PRD = "prod";

@Override
public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
PropertySourcesUtil.setEnvironment(environment);
final List\<String\> profiles = Arrays.asList(environment.getActiveProfiles());
if (profiles.contains(PRD)) {
doPrd(environment, application);
} else if (profiles.contains(STG)) {
doStg(environment, application);
} else {
doDev(environment, application);
}
onProfile(environment, application);
}

protected void doPrd(ConfigurableEnvironment environment, SpringApplication application) {
}

protected void doStg(ConfigurableEnvironment environment, SpringApplication application) {
}

protected void doDev(ConfigurableEnvironment environment, SpringApplication application) {
}

protected void onProfile(ConfigurableEnvironment environment, SpringApplication application) {
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
/**
* @author yinfeng
* @description 日志环境注入
* @since 2021/10/1 17:52
*/
@EnableConfigurationProperties(LogProperties.class)
public class LogEnvAdvice extends AbstractEnvironmentPostProcessor {

@Override
protected void onProfile(ConfigurableEnvironment environment, SpringApplication application) {
final Binder binder = Binder.get(environment);
final BindResult\<LogProperties\> bindResult = binder.bind("aop.logging", Bindable.of(LogProperties.class));
LogProperties logProperties = new LogProperties();
if (bindResult.isBound()) {
logProperties = bindResult.get();
}
// 配置日志打印格式
if (isLogback(application)) {
PropertySourcesUtil.set("logging.pattern.console", logProperties.getLogbackPattern());
PropertySourcesUtil.set("logging.pattern.file", logProperties.getLogbackPattern());
return;
}
PropertySourcesUtil.set("logging.pattern.console", logProperties.getLog4jPattern());
PropertySourcesUtil.set("logging.pattern.file", logProperties.getLog4jPattern());
}

/**
* 判断是否是logback日志格式
*
* @param application application
* @return
*/
private boolean isLogback(SpringApplication application) {
final LoggingSystem loggingSystem = LoggingSystem.get(application.getClassLoader());
return LogbackLoggingSystem.class.equals(loggingSystem.getClass());
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
在spring.factory文件配置log环境注入类
org.springframework.boot.env.EnvironmentPostProcessor=com.yinfeng.common.enviroment.LogEnvAdvice
1
配置拦截器，在每个请求进入时注入traceId，因为基于threadLocal实现，所以需要在请求完成后进行手动清除，否则gc会扫描不到
/**
* @author yinfeng
* @description 日志拦截器
* @since 2021/10/2 11:09
*/
public class LogInterceptor implements HandlerInterceptor {

@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
TraceIdUtil.set();
return true;
}

/**
* 回收资源，防止oom
* @param request
* @param response
* @param handler
* @param ex
* @throws Exception
*/
@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
TraceIdUtil.remove();
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
/**
* @author yinfeng
* @description 拦截器增强
* @since 2021/10/2 11:15
*/
public class InterceptorAdvice implements WebMvcConfigurer {

@Override
public void addInterceptors(InterceptorRegistry registry) {
// 将拦截器注入到容器中
final InterceptorRegistration registration = registry.addInterceptor(new LogInterceptor()).order(Integer.MIN_VALUE);
registration.addPathPatterns("/**");
}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
3. 测试一下效果
到此为止，通过traceId追踪请求链路代码基本完成，下面咱们来测认识一下

在pom文件中引入咱们的starter
\<dependency\>
\<groupId\>com.yinfeng\</groupId\>
\<artifactId\>common-starter\</artifactId\>
\<version\>1.0.0\</version\>
\<exclusions\>
\<exclusion\>
\<groupId\>org.mybatis\</groupId\>
\<artifactId\>mybatis\</artifactId\>
\</exclusion\>
\<exclusion\>
\<groupId\>com.github.jsqlparser\</groupId\>
\<artifactId\>jsqlparser\</artifactId\>
\</exclusion\>
\</exclusions\>
\</dependency\>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
通过knife4j接口文档发送请求

查看日志：可以看到咱们所有的业务日志打印都会带上traceId，方便咱们快速定位问题

三、总结：下一节咱们来说对全局响应体包装和traceId链路追踪的结合。都看到这里了，麻烦各位老铁给个赞吧
————————————————
版权声明：本文为CSDN博主「隐 风」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/a1774381324/article/details/120600130
