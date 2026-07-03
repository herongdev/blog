---
title: @Resource
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@Resource 注解用于依赖注入（Dependency Injection），它是 Java 的标准 API 的一部分，并在 javax.annotation 包中定义。这个注解用于自动装配（autowiring）bean，它会根据名称或类型来解析并注入依赖关系。在 Spring 框架或 Java EE 应用程序中，这个注解常用于注入组件、服务、或其他业务对象。

当你在一个类中使用 @Resource 注解，框架（如 Spring）会查找并自动将匹配的 bean 注入到带注解的字段上。

例如，在下面的代码片段中：
@Resource
private PlaceMapper placeMapper;
@Resource 注解告诉 Spring（或其他支持依赖注入的容器）要找一个名为 placeMapper 的 bean，并将其注入到该字段中。这样，你就可以在该类中使用 placeMapper 对象来访问其提供的方法，而无需手动创建对象或初始化。

@Resource vs @Autowired
在 Spring 框架中，你还经常会看到另一个用于依赖注入的注解：@Autowired。

@Autowired 默认按类型（Type）进行自动装配。
@Resource 默认按名称（Name）进行自动装配。
两者都可以通过设置属性来改变这一默认行为。

使用示例
假设你有一个 PlaceMapper 的实现类：
@Component
public class PlaceMapperImpl implements PlaceMapper {
// ... 实现方法
}
现在，你想在另一个类中使用 PlaceMapper。你可以使用 @Resource 进行自动注入：
@Service
public class PlaceService {

@Resource
private PlaceMapper placeMapper;   // ... 使用 placeMapper 的方法
}
这样，PlaceMapperImpl 的一个实例会被自动注入到 PlaceService 的 placeMapper 字段中。你可以在 PlaceService 类中使用这个 placeMapper 对象，而无需手动初始化它。
