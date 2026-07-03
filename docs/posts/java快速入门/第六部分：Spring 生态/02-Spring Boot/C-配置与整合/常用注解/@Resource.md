---
title: @Resource
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@Resource 是 Java 的标准注解，用于字段注入或方法注入，它可以注入一个 Spring 管理的 bean 到目标类中。它可以被用作构造函数注入的替代方法，尽管构造函数注入通常被认为是更好的实践，因为它可以确保依赖项的不变性，并且在某些情况下可以使类更易于测试。

这是使用 @Resource 的一个示例:
@Service
public class SomeOtherService {
@Resource
private DatabaseUtils databaseUtils;
public void someMethod() {
DatabaseConfig config = ...; // 获取或创建DatabaseConfig对象
String tableName = ...; // 设置表名
FieldConfig fieldFilter = ...; // 设置字段过滤配置
try {
List\<Map\<String, Object\>\> fieldInfoList = databaseUtils.fetchFieldInfoFromDatabase(config, tableName, fieldFilter);
// ... (处理返回的字段信息列表)
} catch (DatabaseOperationException e) {
// ... (处理异常)
}
}
}
在上述示例中, @Resource 注解被用于 databaseUtils 字段，指示 Spring 框架自动注入 DatabaseUtils bean。然后在 someMethod 方法中通过 databaseUtils 实例调用 fetchFieldInfoFromDatabase 方法。

尽管 @Resource 可以工作, 但通常推荐使用构造器注入，因为它提供了一些额外的好处，比如不变性和更好的测试支持。而且, 从 Spring 4.3 开始，如果一个类只有一个构造函数，那么 @Autowired 注解是可选的，Spring 会自动使用那个构造函数进行注入，这使得构造函数注入更为方便和简洁。

**确保依赖项的不变性（Dependency Immutability）**
指的是一旦依赖项被初始化，它们不应该被更改。在 Java 和 Spring 中，这通常是通过使用构造函数注入实现的，而不是字段注入或者方法注入。构造函数注入有助于确保对象在被构造后立即进入有效状态，同时也有助于保持类的不变性，从而避免了潜在的错误和意外的状态改变。

示例：
首先，我们来看一个采用字段注入的例子：
@Service
public class SomeService {
@Autowired
private DependencyA dependencyA;   public void doSomething() {
dependencyA.execute();
}
}
在这种情况下，dependencyA 是一个可变的字段，因为它可以在类的实例创建后的任何时间被更改。

现在，我们使用构造函数注入来重写上面的类：
@Service
public class SomeService {
private final DependencyA dependencyA;
@Autowired
public SomeService(DependencyA dependencyA) {
this.dependencyA = dependencyA;
}   public void doSomething() {
dependencyA.execute();
}
}
在这个版本中，dependencyA 是一个 final 字段，并通过构造函数进行初始化。这意味着一旦 SomeService 被创建，dependencyA 就不能再被更改。这种方式确保了依赖项的不变性。

比喻：
想象你正在构建一座房子。如果你在建造过程中固定了所有的墙壁和支撑结构（即构造函数注入），那么房子将是稳固的，不会轻易变形。这就是不变性 - 一旦构建完成，结构就固定不变了。

相比之下，如果墙壁和支撑结构是可以移动或更改的（即字段注入），那么房子就可能会因为结构的变动而变得不稳定，甚至可能会崩溃。这种情况就没有确保不变性，房子的结构随时可能发生变化，导致不可预知的结果。

通过这个比喻，你可以理解为什么构造函数注入有助于确保依赖项的不变性，而字段注入或方法注入则没有这个保证。
