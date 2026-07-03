---
title: @EqualsAndHashCode(callSuper = true)报错
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
在使用Lombok的`@Data`、`@EqualsAndHashCode`和`@ToString`注解时，如果你的类没有继承其他类（除了Java的`Object`类），那么`callSuper`参数设置为`true`是没有意义的，并且可能会导致编译错误。这是因为`callSuper=true`是指示Lombok在生成`equals`和`hashCode`方法时包括父类的字段，如果父类只是`Object`，则不需要这样做，因为`Object`类本身的字段不应该包含在你的`equals`和`hashCode`实现中。

从您提供的`PlacePageDO`类定义来看，它没有明显地继承自其他自定义类，所以`callSuper`应该设置为`false`或者直接省略该属性。

修改后的代码应该是：

```java
@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = true)
public class PlacePageDO {
@TableId
private Integer id;   @TableField("name_zh")
private String nameZh;

@TableField("name_en")
private String nameEn;

@TableField("description")
private String description;

// 使用 FileDO 列表，注意这里不需要 @TableField 注解，
// 因为它不对应数据库的直接列，而是通过查询获得
private List\<FileDO\> files;
}
关于`@TableField`注解的使用，这里的`@TableField("name_en")`注解在`List\<FileDO\> files`字段上是不合适的，因为：
1. `files`字段是从关联表获取数据，而非直接对应数据库的某个列。
2. `@TableField`注解通常用于标注实体类字段和数据库列的映射关系，而`files`字段应该通过服务层的逻辑来填充数据。

通常，关联的数据在MyBatis或MyBatis-Plus中通过编写特定的查询来处理，然后在服务层中将这些数据设置到相应的DO对象中。如果`files`字段确实需要通过注解进行某种特殊的处理，请确保其逻辑符合预期，并且提供正确的注解属性。
