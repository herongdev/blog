---
title: DO
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
package cn.iocoder.yudao.module.place.dal.dataobject;

import cn.iocoder.yudao.framework.mybatis.core.dataobject.BaseDO;
import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

/**
* 地点 DO (Data Object)
* 该类定义了地点数据的属性及其Getter和Setter方法等。DO类通常与数据库的表结构一一对应，用于在应用程序中表示数据库中的一行数据。
*
* @author 芋道源码
*/
@TableName("place") // MyBatis-Plus注解，表名为 "place"
@KeySequence("system_group_seq") // MyBatis-Plus注解，用于 Oracle、PostgreSQL、Kingbase、DB2、H2 数据库的主键自增。如果是 MySQL 等数据库，可不写。
@Data // Lombok注解，为类所有属性生成getter/setter方法
@EqualsAndHashCode(callSuper = true) // Lombok注解，生成equals方法和hashCode方法，并且可以使用父类的属性
@ToString(callSuper = true) // Lombok注解，生成toString方法，并且可以使用父类的属性
@Builder // Lombok注解，为类创建builder
@NoArgsConstructor // Lombok注解，生成无参数构造方法
@AllArgsConstructor // Lombok注解，生成全参数构造方法
public class PlaceDO extends BaseDO {

/**
* 编号，代表唯一的地点ID
*/
@TableId // MyBatis-Plus注解，标识该字段为数据库表的主键
private Long id;

/**
* 名字，代表地点的名称
*/
private String name;

/**
* 描述，代表对地点的描述信息
*/
private String description;

/**
* 状态，代表地点的状态。取值由 {@link TODO common_status 对应的类} 枚举定义
*/
private Byte status;
}

DO (Data Object) 是用于与数据库交互的对象，它与数据库中的表结构对应。

在 ORM（Object-Relational Mapping，对象-关系映射）中，我们通常使用 DO 对象来表示数据库中的一行数据。这样，我们可以在程序中通过操作 DO 对象来实现对数据库的增删改查。

在这个 PlaceDO 类中，id, name, description, status 等字段分别对应 place 表的各个字段。通过 @TableName、@TableId 等 MyBatis-Plus 的注解，我们将这些字段与数据库表结构关联起来。同时，通过 Lombok 的注解，如 @Data、@Builder、@NoArgsConstructor、@AllArgsConstructor 等，我们可以为这个 DO 类生成常用的 getter、setter 方法、无参/全参构造函数、以及 builder 模式等。
