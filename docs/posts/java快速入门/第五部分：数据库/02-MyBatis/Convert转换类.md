---
title: Convert转换类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
- 使用@Mapper注解定义一个Interface：

@Mapper
public interface PlaceConvert

- 注意，这个Mapper注解来自：import org.mapstruct.Mapper;
- 生成此转换器的实例，使用MapStruct的工厂方法Mappers.getMapper()。

PlaceConvert _INSTANCE_=Mappers._getMapper_(PlaceConvert.class);
//定义一个方法，用于将数据对象PlaceDO转换成响应视图对象PlaceRespVO。
PlaceRespVO convert(PlaceDO bean);

//这个接口的作用是作为数据对象（DataObject，简称DO）和视图对象（ViewObject，简称VO）之间的转换器。
//数据对象通常用于在数据库和服务层之间传递数据，而视图对象则用于在服务层和前端之间传递数据。这样的设计可以保证层间的隔离性，每一层只需要关心其相邻层的数据对象即可，无需关心其他层的实现细节。
//这个转换器接口使用了MapStruct框架，MapStruct是一种用于生成类型安全的Bean映射类（也就是数据转换类）的工具，它可以自动生成这些映射类，从而避免了手动编写转换代码的麻烦。
//这个接口的作用可以比作一个翻译器。假设我们有两种语言：
//一种是用在数据库和服务层间的"数据对象语言"（PlaceDO），
//另一种是用在服务层和前端间的"视图对象语言"（PlaceRespVO）。
//这两种语言的内容基本一致，但是它们的表达方式（也就是数据的结构）可能会有所不同。
//那么，我们就需要一个"翻译器"来将一种语言翻译成另一种语言，这就是PlaceConvert接口的作用。
//那么，MapStruct框架又是什么呢？它就像一个聪明的"翻译机"。
//如果你需要做很多的翻译工作，自己一一地翻译会很累，而且容易出错。
//MapStruct就是一个自动化的翻译工具，你只需要告诉它源语言和目标语言的规则（也就是定义一个接口和方法），
//它就可以帮你生成一个高效且类型安全的"翻译器"，让你的翻译工作变得更简单，更容易维护。
