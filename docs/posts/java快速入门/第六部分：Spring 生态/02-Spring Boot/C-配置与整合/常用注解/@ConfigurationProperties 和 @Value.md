---
title: @ConfigurationProperties 和 @Value
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@ConfigurationProperties 和 @Value 都是Spring Boot提供的两种常见的配置属性绑定方法，它们都可以将配置文件中的属性绑定到Java对象中。但它们有一些明显的区别和使用场景：

1. @ConfigurationProperties：

- 属性分组：允许您为配置创建一个带有多个属性的bean。这对于将配置组织成分层结构特别有用。
- 类型安全：它支持复杂的类型安全配置，如列表、集合、映射等。
- 元数据支持：使用 @ConfigurationProperties 可以提供一组属性的元数据，这有助于生成配置元数据文件，进而可以为IDE提供自动补全功能。
- 松散绑定：它支持松散的属性绑定。例如，camelCase, snake_case, kebab-case 可以自由地在属性名称中使用。
- 验证：与JSR-303 bean验证集成，允许在bean属性上使用 @Valid、@NotNull 等注解。
- 使用场景：当您有多个相关的配置属性，或者希望利用类型安全和验证功能时，推荐使用此方法。

2. @Value：

- 单一属性：用于将单一配置属性值注入到bean的字段或方法参数中。
- SpEL支持：支持Spring表达式语言（SpEL），允许您在属性值中执行计算或引用其他属性。
- 使用场景：当您只需要注入一两个属性，或者需要SpEL能力时，可以选择此方法。

是否可以相互替代？

- 在某些情况下，它们可以相互替代，例如，当您只绑定一个简单属性时。
- 但在大多数情况下，@ConfigurationProperties 提供了更多的功能和灵活性，尤其是当处理多个相关的属性或需要验证功能时。

总结：
虽然两者都能完成属性的绑定，但是@ConfigurationProperties 更适用于处理复杂、分组或需要验证的配置属性，而 @Value 则更适合简单的属性绑定或需要使用SpEL的场景。在实际开发中，您可以根据具体需求选择合适的方式。
