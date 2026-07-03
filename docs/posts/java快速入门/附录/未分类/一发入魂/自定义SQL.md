---
title: 自定义SQL
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
当`mp`提供的方法还不能满足需求时，则可以自定义`SQL`。

原生`mybatis`
示例如下
注解方式

packagecom.example.mp.mappers;
importcom.baomidou.mybatisplus.core.mapper.BaseMapper;
importcom.example.mp.po.User;
importorg.apache.ibatis.annotations.Select;
importjava.util.List;
/**
 * @Authoryogurtzzz
 * @Date2021/3/18 11:21
 **/public

interface UserMapper

`extends` `BaseMapper\<User\> {`

@Select("select * from user")
List\<User\> selectRaw();
}

`xml`方式

\<?xml version="1.0"encoding="UTF-8"?\>\<!DOCTYPE mapperPUBLIC"-//mybatis.org//DTD Mapper 3.0//EN""http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>
\<mapper namespace="com.example.mp.mappers.UserMapper"\>
\<select

id="selectRaw"resultType="com.example.mp.po.User"\>
SELECT * FROM user
    \</select\>
\</mapper\>

packagecom.example.mp.mappers;
importcom.baomidou.mybatisplus.core.mapper.BaseMapper;
importcom.example.mp.po.User;
importorg.apache.ibatis.annotations.Select;
importjava.util.List;
Public

interface UserMapper extends BaseMapper\<User\> {
List\<User\> selectRaw();
}
 使用`xml`时，若`xml`文件与`mapper`接口文件不在同一目录下，则需要在`application.yml`中配置`mapper.xml`的存放路径

mybatis-plus:
mapper-locations:/mappers/*
 若有多个地方存放`mapper`，则用数组形式进行配置

mybatis-plus:
mapper-locations:
-/mappers/*
-/com/example/mp/*
测试代码如下

@TestpublicvoidtestCustomRawSql(){
List\<User\> users = userMapper.selectRaw();
users.forEach(System.out::println);
}
结果
`mybatis-plus`
也可以使用`mp`提供的`Wrapper`条件构造器，来自定义`SQL`
示例如下
注解方式

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.example.mp.po.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;
public interface UserMapper extends BaseMapper\<User\> {

 // SQL
中不写`WHERE`关键字，且固定使用`${ew.customSqlSegment}`
 

 @Select("select * from user ${ew.customSqlSegment}")

 List\<User\> findAll(@Param(Constants.WRAPPER) Wrapper\<User\> wrapper);
}
packagecom.example.mp.mappers;
importcom.baomidou.mybatisplus.core.conditions.Wrapper;
importcom.baomidou.mybatisplus.core.mapper.BaseMapper;
importcom.baomidou.mybatisplus.core.toolkit.Constants;
importcom.example.mp.po.User;
importorg.apache.ibatis.annotations.Param;
importorg.apache.ibatis.annotations.Select;
importjava.util.List;
publicinterfaceUserMapperextendsBaseMapper\<User\> {
// SQL
中不写`WHERE`关键字，且固定使用

${ew.customSqlSegment}@Select("select * from user ${ew.customSqlSegment}")List\<User\> findAll(@Param(Constants.WRAPPER)Wrapper\<User\> wrapper);
}

`xml`方式

package com.example.mp.mappers;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.mp.po.User;
import java.util.List;
public interface UserMapper extends BaseMapper\<User\> {

 List\<User\> findAll(Wrapper\<User\> wrapper);
}

\<!-- UserMapper.xml --\>
\<?xml version="1.0" encoding="UTF-8"?\>
\<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>
\<mapper namespace="com.example.mp.mappers.UserMapper"\>

 \<select id="findAll" resultType="com.example.mp.po.User"\>

 SELECT * FROM user ${ew.customSqlSegment}

 \</select\>
\</mapper\>
 **sxxx**

packagecom.example.mp.mappers;
importcom.baomidou.mybatisplus.core.conditions.Wrapper;
importcom.baomidou.mybatisplus.core.mapper.BaseMapper;
importcom.example.mp.po.User;
importjava.util.List;
publicinterfaceUserMapperextendsBaseMapper\<User\> {
List\<User\> findAll(Wrapper\<User\> wrapper);
}
 复制代码

\<!-- UserMapper.xml --\>\<?xml version="1.0"encoding="UTF-8"?\>\<!DOCTYPE mapperPUBLIC"-//mybatis.org//DTD Mapper 3.0//EN""http://mybatis.org/dtd/mybatis-3-mapper.dtd"\>\<mappernamespace="com.example.mp.mappers.UserMapper"\>\<selectid="findAll"resultType="com.example.mp.po.User"\>SELECT * FROM user ${ew.customSqlSegment}
    \</select\>\</mapper\>
复制代码

`
`
