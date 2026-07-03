---
title: AR模式
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
`ActiveRecord`模式，通过操作实体对象，直接操作数据库表。与`ORM`有点类似。
示例如下
`1.` 让实体类`User`继承自

Model
packagecom.example.mp.po;

importcom.baomidou.mybatisplus.annotation.SqlCondition;
importcom.baomidou.mybatisplus.annotation.TableField;
importcom.baomidou.mybatisplus.extension.activerecord.Model;
importlombok.Data;
importlombok.EqualsAndHashCode;
importjava.time.LocalDateTime;
@EqualsAndHashCode(callSuper = false)@DatapublicclassUserextendsModel\<User\> {
privateLong id;
@TableField(condition = SqlCondition.LIKE)privateString name;
@TableField(condition = "%s &gt; #{%s}")privateInteger age;
privateString email;
privateLong managerId;
privateLocalDateTime createTime;
}
复制代码
`2.` 直接调用实体对象上的方法

@TestpublicvoidinsertAr(){
Useruser=newUser();
user.setId(15L);
user.setName("
我是`AR`猪

");
user.setAge(1);
user.setEmail("ar@baomidou.com");
user.setManagerId(1L);
booleansuccess=user.insert(); //
插入

System.out.println(success);
}
 复制代码
`3.` 结果

其他示例
`//` 查询

@TestpublicvoidselectAr(){
Useruser=newUser();
        user.setId(15L);
Userresult=user.selectById();
System.out.println(result);
}
//
更新

@TestpublicvoidupdateAr(){
Useruser=newUser();
user.setId(15L);
user.setName("
王全蛋

");
user.updateById();
}
//
删除

@TestpublicvoiddeleteAr(){
Useruser=newUser();
user.setId(15L);
user.deleteById();
}
 复制代码
