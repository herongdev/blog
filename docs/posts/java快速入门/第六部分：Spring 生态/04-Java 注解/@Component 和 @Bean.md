---
title: @Component 和 @Bean
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@Component 和 @Bean 都用于定义 Spring Bean，并由 Spring 容器进行管理。然而，它们用于不同的场景并具有不同的用途：

@Component
定义方式：@Component 是一个类级别的注解，用于定义一个 Spring Bean。
用途：用于定义不需要进行额外配置的 Spring Bean。Spring 框架会自动扫描所有使用 @Component 注解的类，并在应用上下文中创建 Bean 实例。
依赖注入：Spring 自动处理依赖注入。
使用场景：当 Bean 不需要多个实例并且没有特殊的初始化逻辑时，通常使用 @Component。
子注解：@Service、@Repository 和 @Controller 是 @Component 的特殊化形式，用于特定类型的 Bean。
样例代码：
java
Copy code
@Component
public class MyComponent {
// ...
}
@Bean
定义方式：@Bean 是一个方法级别的注解，通常在一个使用 @Configuration 注解的类中使用。
用途：用于定义需要进行一些额外配置或需要以编程方式进行初始化的 Spring Bean。
依赖注入：依赖注入需要手动处理或通过其他的 @Bean 方法参数实现。
使用场景：当你需要创建一个 Bean 的多个实例，或者你需要进行复杂的 Bean 初始化逻辑时。
样例代码：
java
Copy code
@Configuration
public class MyConfig {
@Bean
public MyBean myBean() {
// Initialization logic
return new MyBean();
}
}
小结
@Component 用于类定义，Spring 会自动创建 Bean。
@Bean 用于方法定义，通常在 @Configuration 类中使用，用于创建并返回实际的 Bean。
这两种方法都允许您注册 Spring Bean，但是根据您的具体需求和使用场景，您可能会选择其中一种。
