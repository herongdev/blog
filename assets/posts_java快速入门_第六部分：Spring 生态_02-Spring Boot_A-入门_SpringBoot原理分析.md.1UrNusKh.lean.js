import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"SpringBoot原理分析","description":"","frontmatter":{"title":"SpringBoot原理分析","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot原理分析.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot原理分析.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/A-入门/SpringBoot原理分析.md"};function o(r,l,t,c,u,g){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**起步依赖原理分析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**分析****spring-boot-starter-parent**")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击pom.xml中的spring-boot-starter-parent，跳转到了spring-boot-starter-parent的pom.xml，xml配置如下（只摘抄了部分重点配置）：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击pom.xml中的spring-boot-starter-dependencies，跳转到了spring-boot-starter-dependencies的pom.xml，xml配置如下（只摘抄了部分重点配置）：")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-maven-plugin\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</project\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-dependencies\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<relativePath\\>../../spring-boot-dependencies\\</relativePath\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<properties\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<activemq.version\\>5.15.3\\</activemq.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<antlr2.version\\>2.7.7\\</antlr2.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<appengine-sdk.version\\>1.9.63\\</appengine-sdk.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artemis.version\\>2.4.0\\</artemis.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<aspectj.version\\>1.8.13\\</aspectj.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<assertj.version\\>3.9.1\\</assertj.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<atomikos.version\\>4.0.6\\</atomikos.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<bitronix.version\\>2.1.4\\</bitronix.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<build-helper-maven-plugin.version\\>3.0.0\\</build-helper-maven-plugin.version\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"从上面的spring-boot-starter-dependencies的pom.xml中我们可以发现，一部分坐标的版本、依赖管理、插件管理已经定义好，所以我们的SpringBoot工程继承spring-boot-starter-parent后已经具备版本锁定等配置了。所以起步依赖的作用就是进行依赖的传递。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**分析****spring-boot-starter-web**")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击pom.xml中的spring-boot-starter-web，跳转到了spring-boot-starter-web的pom.xml，xml配置如下（只摘抄了部分重点配置）：")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<byte-buddy.version\\>1.7.11\\</byte-buddy.version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</properties\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-test\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.jetbrains.kotlin\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>kotlin-maven-plugin\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>$\\{kotlin.version\\}\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.jooq\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>jooq-codegen-maven\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>$\\{jooq.version\\}\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-maven-plugin\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</build\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<?xml version="1.0" encoding="UTF-8"?\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,'\\<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0')]),s(`
`),n("span",{class:"line"},[n("span",null,'[http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)"')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns="http://maven.apache.org/POM/4.0.0"')]),s(`
`),n("span",{class:"line"},[n("span",null,'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<modelVersion\\>4.0.0\\</modelVersion\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starters\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-web\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<name\\>Spring Boot Web Starter\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-json\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework.boot\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-boot-starter-tomcat\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>2.0.1.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.hibernate.validator\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>hibernate-validator\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>6.0.9.Final\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-web\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>5.0.5.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId\\>org.springframework\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<artifactId\\>spring-webmvc\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<version\\>5.0.5.RELEASE\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<scope\\>compile\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</project\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼从上面的spring-boot-starter-web的pom.xml中我们可以发现，spring-boot-starter-web就是将web开发要使用的spring-web、spring-webmvc等坐标进行了“打包”，这样我们的工程只要引入spring-boot-starter-web起步依赖的坐标就可以进行web开发了，同样体现了依赖传递的作用。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**自动配置原理解析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击查看启动类MySpringBootApplication上的注解@SpringBootApplication")]),s(`
`),n("span",{class:"line"},[n("span",null,"注解@SpringBootApplication的源码其中，@SpringBootConfifiguration：等同与@Confifiguration，既标注该类是Spring的一个配置类")]),s(`
`),n("span",{class:"line"},[n("span",null,"@EnableAutoConfifiguration：SpringBoot自动配置功能开启")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootApplication")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MySpringBootApplication \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"SpringApplication.run(MySpringBootApplication.class);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Target(ElementType.TYPE)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Retention(RetentionPolicy.RUNTIME)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Documented")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Inherited")]),s(`
`),n("span",{class:"line"},[n("span",null,"@SpringBootConfiguration")]),s(`
`),n("span",{class:"line"},[n("span",null,"@EnableAutoConfiguration")]),s(`
`),n("span",{class:"line"},[n("span",null,"@ComponentScan(excludeFilters = \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Filter(type = FilterType.CUSTOM, classes =")]),s(`
`),n("span",{class:"line"},[n("span",null,"AutoConfigurationExcludeFilter.class) \\})")]),s(`
`),n("span",{class:"line"},[n("span",null,"public @interface SpringBootApplication \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* Exclude specific auto-configuration classes such that they will never be")]),s(`
`),n("span",{class:"line"},[n("span",null,"applied.")]),s(`
`),n("span",{class:"line"},[n("span",null,"* @return the classes to exclude")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"@AliasFor(annotation = EnableAutoConfiguration.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"Class\\<?\\>[] exclude() default \\{\\};")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击查看注解@EnableAutoConfifiguration")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中，@Import(AutoConfifigurationImportSelector.class) 导入了AutoConfifigurationImportSelector类")]),s(`
`),n("span",{class:"line"},[n("span",null,"按住Ctrl点击查看AutoConfifigurationImportSelector源码")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中，SpringFactoriesLoader.loadFactoryNames 方法的作用就是从META-INF/spring.factories文件中读取指定")]),s(`
`),n("span",{class:"line"},[n("span",null,"类对应的类名称列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Target(ElementType.TYPE)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Retention(RetentionPolicy.RUNTIME)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Documented")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Inherited")]),s(`
`),n("span",{class:"line"},[n("span",null,"@AutoConfigurationPackage")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Import(AutoConfigurationImportSelector.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"public @interface EnableAutoConfiguration \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String[] selectImports(AnnotationMetadata annotationMetadata) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<String\\> configurations = getCandidateConfigurations(annotationMetadata,")]),s(`
`),n("span",{class:"line"},[n("span",null,"attributes);")]),s(`
`),n("span",{class:"line"},[n("span",null,"configurations = removeDuplicates(configurations);")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<String\\> exclusions = getExclusions(annotationMetadata, attributes);")]),s(`
`),n("span",{class:"line"},[n("span",null,"checkExcludedClasses(configurations, exclusions);")]),s(`
`),n("span",{class:"line"},[n("span",null,"configurations.removeAll(exclusions);")]),s(`
`),n("span",{class:"line"},[n("span",null,"configurations = filter(configurations, autoConfigurationMetadata);")]),s(`
`),n("span",{class:"line"},[n("span",null,"fireAutoConfigurationImportEvents(configurations, exclusions);")]),s(`
`),n("span",{class:"line"},[n("span",null,"return StringUtils.toStringArray(configurations);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"protected List\\<String\\> getCandidateConfigurations(AnnotationMetadata metadata,")]),s(`
`),n("span",{class:"line"},[n("span",null,"AnnotationAttributes attributes) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"List\\<String\\> configurations = SpringFactoriesLoader.loadFactoryNames(")]),s(`
`),n("span",{class:"line"},[n("span",null,"getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());")]),s(`
`),n("span",{class:"line"},[n("span",null,"return configurations;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"spring.factories 文件中有关自动配置的配置信息如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面配置文件存在大量的以Confifiguration为结尾的类名称，这些类就是存有自动配置信息的类，而SpringApplication在获取这些类名后再加载。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们以ServletWebServerFactoryAutoConfifiguration为例来分析源码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"其中，")]),s(`
`),n("span",{class:"line"},[n("span",null,"@EnableConfifigurationProperties(ServerProperties.class) 代表加载ServerProperties服务器配置属性类")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConf")]),s(`
`),n("span",{class:"line"},[n("span",null,"iguration,\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration")]),s(`
`),n("span",{class:"line"},[n("span",null,",\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfigu")]),s(`
`),n("span",{class:"line"},[n("span",null,"ration,\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\\")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,"@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@ConditionalOnClass(ServletRequest.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@ConditionalOnWebApplication(type = Type.SERVLET)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@EnableConfigurationProperties(ServerProperties.class)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Import(\\{ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServletWebServerFactoryConfiguration.EmbeddedJetty.class,")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServletWebServerFactoryConfiguration.EmbeddedUndertow.class \\})")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ServletWebServerFactoryAutoConfiguration \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"... ... ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼进入ServerProperties.class源码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,'其中，prefifix = "server" 表示SpringBoot配置文件中的前缀，SpringBoot会将配置文件中以server开始的属性映射到该类的字段中。映射关系如下：')])])])])],-1)])])}const v=a(i,[["render",o]]);export{f as __pageData,v as default};
