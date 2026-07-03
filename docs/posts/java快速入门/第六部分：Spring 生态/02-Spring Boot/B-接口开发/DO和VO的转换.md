---
title: DO和VO的转换
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
在使用 MapStruct 这样的库来自动转换 DO（Data Object）到 VO（View Object）时，MapStruct 主要通过名字匹配属性来自动进行转换。当 DO 和 VO 之间的字段名相同且类型兼容时，MapStruct 会自动映射这些字段。如果字段名相同但类型不兼容，MapStruct 提供了多种方式来处理这些转换，比如使用表达式、自定义方法或类型转换器。
下面是一些处理 MapStruct 中字段不一致和类型转换问题的基本方法：

**### 1. **字段名不一致****
如果 DO 和 VO 的某些字段名不一致，你可以使用 `@Mapping` 注解来指定它们之间的映射关系。例如：
```java
@Mapper
public interface FileConvert {
FileConvert INSTANCE = Mappers.getMapper(FileConvert.class);
@Mapping(source = "fileName", target = "name")
@Mapping(source = "fileSize", target = "size")
FileRespVO convert(FileDO bean);
}
在这个例子中，`FileDO` 类的 `fileName` 字段会被映射到 `FileRespVO` 的 `name` 字段，`fileSize` 会被映射到 `size`。

**### 2. **字段类型不一致****
如果字段类型不一致，MapStruct 支持使用自定义的方法来转换这些类型。你可以在 Mapper 接口中定义一个方法来执行特定的转换逻辑，然后在 `@Mapping` 注解中引用这个方法。例如：
```java
@Mapper
public interface FileConvert {
FileConvert INSTANCE = Mappers.getMapper(FileConvert.class);
@Mapping(target = "size", source = "fileSize", qualifiedByName = "formatSize")
FileRespVO convert(FileDO bean);
default String formatSize(Long size) {
return size / 1024 + " KB";
}
}
这里，`fileSize` 字段是一个 `Long` 类型，需要转换成 `String` 类型表示的 KB 单位。我们定义了一个默认方法 `formatSize` 来实现这个转换，并在 `@Mapping` 注解中通过 `qualifiedByName` 属性指定使用这个方法。

**### 3. **复杂类型或列表转换****
对于复杂的对象或对象列表的转换，可以在 Mapper 接口中递归地使用其他 Mapper 或自定义的转换方法。例如，如果 `FileDO` 包含一个复杂类型或列表，可以这样做：
```java
@Mapper
public interface FileConvert {
FileConvert INSTANCE = Mappers.getMapper(FileConvert.class);
FileRespVO convert(FileDO bean);
List\<FileRespVO\> convertList(List\<FileDO\> beans); // 列表转换
}
MapStruct 会自动处理列表和数组的映射，只要它知道如何将单个元素从一个类型转换到另一个类型。
### 总结
MapStruct 提供了强大的功能来自动或手动地处理数据对象之间的映射和转换，使得从数据库层到视图层的数据传输更加简洁和安全。通过合理使用 `@Mapping` 注解和自定义转换方法，可以有效地解决字段名不一致和类型不兼容的问题。
