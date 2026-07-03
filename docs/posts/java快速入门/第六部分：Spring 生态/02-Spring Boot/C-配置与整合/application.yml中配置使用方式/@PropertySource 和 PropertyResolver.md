---
title: @PropertySource 和 PropertyResolver
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@PropertySource 和 PropertyResolver 是 Spring Framework 中用于处理外部配置属性的两个重要接口和注解。它们在 Spring Boot 项目中用于处理和访问外部配置数据，例如属性文件和YAML文件。这些外部配置可以定义在 application.properties 或 application.yaml 文件中，也可以定义在其他外部配置源中。

1. @PropertySource 注解
@PropertySource 注解用于指定外部配置文件的位置，并将其加载到 Spring 的 Environment 中。它通常用于 .properties 文件，但也可以通过定制解析器用于其他类型的文件，例如YAML文件。
@Configuration
@PropertySource(value = "classpath:application.yaml", factory = YamlPropertySourceFactory.class)
public class AppConfig {
}
在这个例子中，YamlPropertySourceFactory 是一个自定义的 PropertySourceFactory 实现，它能够解析 YAML 文件。这是一个简单的实现例子：
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertySourceFactory;
public class YamlPropertySourceFactory implements PropertySourceFactory {
@Override
public PropertySource\<?\> createPropertySource(String name, EncodedResource resource) throws IOException {
// Implement YAML parsing logic here
return null;
}
}

2. PropertyResolver 接口
PropertyResolver 是一个接口，它定义了如何解析属性的方法，例如 getProperty(String key) 或 containsProperty(String key)。Environment 接口继承了 PropertyResolver 接口，所以它也提供了解析属性的方法。因此，你可以通过 Environment 对象来解析和访问外部配置属性。
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
@Component
public class AppConfig {
@Autowired
private Environment env;   public String getMessage() {
return env.getProperty("app.message");
}
}

好处:

1. 统一的属性访问: 通过 Environment 对象，你可以统一地访问所有的配置属性，不管它们来自于哪个外部配置源。
2. 类型安全: 你可以通过 Environment 对象的 getProperty 方法以类型安全的方式访问配置属性，例如 env.getProperty("app.timeout", Integer.class)。
3. 配置属性校验: 通过 @Validated 和 JSR-303 校验注解，你可以在 @ConfigurationProperties 类中校验配置属性。

综上，通过结合使用 @PropertySource，PropertyResolver 和 Environment，你可以以一种灵活、类型安全和统一的方式访问和使用外部配置属性。
