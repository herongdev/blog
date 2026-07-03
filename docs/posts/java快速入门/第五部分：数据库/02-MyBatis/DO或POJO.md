---
title: DO或POJO
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
数据映射类，通常也叫做实体类或者POJO (Plain Old Java Object)。

主要

- 使用@TableName注解来关联数据库表名
- 使用lomok注解来简化类；
- 要继承extends BaseDO类；
- 使用@TableId和@TableField来关联数据库表的字段；

package cn.iocoder.yudao.module.place.dal.dataobject;

import cn.iocoder.yudao.framework.mybatis.core.dataobject.BaseDO;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

@TableName("activity_types")
@Data // Lombok注解，为类所有属性生成getter/setter方法
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = true)
@Builder // Lombok注解，为类创建builder
@NoArgsConstructor // Lombok注解，生成无参数构造方法
@AllArgsConstructor
public class ActivityTypeDO extends BaseDO {

@TableId // MyBatis-Plus注解，标识该字段为数据库表的主键
private Integer id;

@TableField("type_name")
private String typeName;

@TableField("description")// 对应数据库的type_name字段
private String description; // 对应数据库的description字段

}
