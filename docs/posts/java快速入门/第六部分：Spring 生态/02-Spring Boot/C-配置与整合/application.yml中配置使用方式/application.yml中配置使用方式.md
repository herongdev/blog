---
title: application.yml中配置使用方式
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
1. 使用 @Value 注解
你可以使用 @Value 注解将 application.yaml 文件中的配置值注入到你的Bean属性中。
例如：
# application.yaml
app:
message: Hello World
￼import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
@Component
public class AppConfig {   @Value("${app.message}")
private String message;   public String getMessage() {
return message;
}
}

2. 使用 @ConfigurationProperties 注解
如果你有一组配置属性，你可以创建一个Java类，并使用 @ConfigurationProperties 注解将 application.yaml 文件中的配置值绑定到该类的属性上。
例如：
# application.yaml
app:
name: My Application
version: 1.0
￼import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {   private String name;
private String version;   // Getters and Setters
}

3. 使用 Environment 对象
你还可以注入 Environment 对象，并使用它来访问 application.yaml 文件中的配置值。
例如：
# application.yaml
app:
message: Hello World
￼import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
@Component
public class AppConfig {   @Autowired
private Environment env;   public String getMessage() {
return env.getProperty("app.message");
}
}

4. 使用 @PropertySource 和 PropertyResolver
这种方法允许你将一个 @PropertySource 注解与一个 PropertyResolver 或 Environment 对象结合使用来访问 application.yaml 文件中的配置值。
例如：
# application.yaml
app:
message: Hello World
￼import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
@Configuration
@PropertySource("classpath:application.yaml")
public class AppConfig {   @Autowired
private Environment env;   public String getMessage() {
return env.getProperty("app.message");
}
}

请注意， @PropertySource 通常用于加载 .properties 文件。为了处理 .yaml 文件，你可能需要额外配置或使用上述其他方法。

这些方法可以帮助你根据项目的需求选择最适合的方式来访问和使用 application.yaml 文件中的配置值。
