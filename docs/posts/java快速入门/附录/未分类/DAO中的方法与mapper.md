---
title: DAO中的方法与mapper
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
getCount 方法的具体实现通常在 MyBatis 的 Mapper XML 文件中。这个 XML 文件通常与你的 DAO 接口（在这个例子中是 ProjectManagementDao）在同一个包下，并且它们的名字通常是相同的。在这个 XML 文件中，你将会看到一个与 getCount 方法相对应的 \<select\> 标签。在这个标签里，会有一个 SQL 语句来执行实际的数据库操作。这就是 MyBatis 的工作方式，即将 SQL 语句和 Java 代码分开，使得你的代码更容易阅读和维护。

你应该找到一个类似于 ProjectManagementDao.xml 的文件，并在其中找到类似下面的内容：
\<select id="getCount" parameterType="map" resultType="com.zhsl.sgc.vo.ManagementCountVo"\>
-- 这里是具体的 SQL 语句
\</select\>
以上的 id 与 parameterType 属性对应于 getCount 方法的名称和参数，resultType 对应于 getCount 方法的返回类型。

如果你无法在项目中找到对应的 Mapper XML 文件，那可能是使用了 MyBatis 的注解功能。在这种情况下，具体的 SQL 语句会以注解的形式直接写在 DAO 接口的方法上。例如：
@Select("SELECT ...")
ManagementCountVo getCount(@Param("countYear") String countYear, @Param("countRegion") String countRegion);
请注意，我上面只是举例，具体的 SQL 语句会根据实际需求编写。

具体实现代码：
package com.aoip.base.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface BaseDao\<T\> extends BaseMapper\<T\> {
}

packagecom.aoip.base.dao;

importcom.aoip.orm.mybatis.datascope.DataScope;
importcom.baomidou.mybatisplus.core.conditions.Wrapper;
importcom.baomidou.mybatisplus.core.metadata.IPage;
importjava.util.List;
importorg.apache.ibatis.annotations.Param;

public interface BusinessDao\<T\> extends BaseDao\<T\>{
List\<T\>selectList(@Param("ew")Wrapper\<T\>var1,@Param("dataScope")DataScopevar2);

IPage\<T\>listPage(IPage\<T\>var1,@Param("ew")Wrapper\<T\>var2);

IPage\<T\>listPage(IPage\<T\>var1,@Param("ew")Wrapper\<T\>var2,@Param("dataScope")DataScopevar3);

IPage\<T\>selectPage(IPage\<T\>var1,@Param("ew")Wrapper\<T\>var2,@Param("dataScope")DataScopevar3);
}

import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
* \<p\>
* 项目进度管理表 Mapper 接口
* \</p\>
*
* @author 张三
* @since 2023-05-26
*/
public interface ProjectManagementDao extends BusinessDao\<ProjectManagement\> {
/**
* 进度报表统计 -- 根据年份，统计地区为查询条件
* 1.项目总个数
* 2.已开工个数：建设进度字段不为null
* 3.已完工个数
*/
ManagementCountVo getCount(@Param("countYear") String countYear, @Param("countRegion") String countRegion);
/**
* 根据年份，统计地区为查询条件 计划投资报表
*/
List\<CountVo\> getSourcesCount(@Param("countYear") String countYear, @Param("countRegion") String countRegion,@Param("doneInvest") String doneInvest);
/**
* 根据年份，统计地区为查询条件 计划投资报表
*/
Integer getElseCount(@Param("countYear") String countYear, @Param("countRegion") String countRegion,@Param("doneInvest") String doneInvest);
/**
* 按照年份来统计总数
*/
Integer getYearCount(@Param("year")String year);
}

这是一个使用了 MyBatis 框架的 Java 接口，定义了与数据库操作相关的方法。在这个例子中，这些方法都是与 "项目进度管理表" 相关的。下面，我会详细解释 getCount 方法及其相关的注解和参数。

1. getCount 方法：

这个方法的作用是获取特定年份和地区的项目进度统计信息。它返回一个 ManagementCountVo 对象，这个对象可能包含如下的信息：

项目总个数
已开工个数（建设进度字段不为null）
已完工个数
这些信息可能是基于某个年份和地区进行的统计。

2. @Param 注解：

@Param 是 MyBatis 的一个注解，它用于将方法参数传递给映射 SQL 语句。在 MyBatis 的 SQL 映射语句中，可以使用 #{paramName} 的形式来引用这些参数。

在这个 getCount 方法中，@Param 注解用于将方法的参数（countYear 和 countRegion）传递给 SQL 映射语句。

3. 参数：

countYear: 这个参数应该是一个表示年份的字符串，例如 "2023"。它应该是用来指定要获取哪一年的项目进度统计信息的。
countRegion: 这个参数应该是一个表示地区的字符串，例如 "北京"。它应该是用来指定要获取哪个地区的项目进度统计信息的。
请注意，实际的 SQL 映射语句（在 MyBatis 的 Mapper XML 文件或者注解中）决定了这些参数如何被使用，以及 getCount 方法的具体行为。

\<mapper namespace="com.zhsl.sgc.dao.ProjectManagementDao"\>

\<!--进度报表统计 根据年份，统计地区为查询条件
1.项目总个数
2.已开工个数：建设进度字段不为null
3.已完工个数 --\>
\<select id="getCount" resultType="com.zhsl.sgc.vo.ManagementCountVo"\>
SELECT count(1) AS projectNum,
(SELECT COUNT(1) FROM SGC_PROJECT_MANAGEMENT
WHERE BTSCHEDULE IS NOT NULL AND SCHEDULE IS NOT NULL) as inServiceNum,
(SELECT COUNT(1) FROM SGC_PROJECT_MANAGEMENT
WHERE BTSCHEDULE = 'D' AND SCHEDULE = '100%') as completedNum
FROM SGC_PROJECT_MANAGEMENT
\<where\>
\<choose\>
\<when test="countYear != null and countYear != '' "\>
and THEIRYEAR = #{countYear}
\</when\>
\<otherwise\>
and THEIRYEAR = DATE_FORMAT(NOW(),'%Y')
\</otherwise\>
\</choose\>
\<if test="countRegion != null and countRegion != ''"\>
and THEIRDISTRICT like concat('%',#{countRegion},'%')
\</if\>
\</where\>
\</select\>

这是一个 MyBatis 的 XML 映射文件中的 \<select\> 标签，用于定义 SQL 查询语句。它和具体的数据库 SQL 语法结合，提供了一种灵活而强大的数据查询方式。以下是该 \<select\> 标签内部各部分的解释：

id="getCount": 这指定了该 SQL 查询语句与 ProjectManagementDao 接口中的哪个方法相对应，即 getCount 方法。

resultType="com.zhsl.sgc.vo.ManagementCountVo": 这指定了该 SQL 查询语句的返回结果应该被封装到哪个 Java 类中，即 ManagementCountVo 类。

SELECT count(1) AS projectNum: 这个查询统计了 SGC_PROJECT_MANAGEMENT 表中的总记录数，并将结果存储在别名为 projectNum 的返回字段中。

SELECT COUNT(1) FROM SGC_PROJECT_MANAGEMENT WHERE BTSCHEDULE IS NOT NULL AND SCHEDULE IS NOT NULL: 这个子查询统计了 SGC_PROJECT_MANAGEMENT 表中 BTSCHEDULE 和 SCHEDULE 字段都不为 NULL 的记录数，并将结果存储在别名为 inServiceNum 的返回字段中。

SELECT COUNT(1) FROM SGC_PROJECT_MANAGEMENT WHERE BTSCHEDULE = 'D' AND SCHEDULE = '100%': 这个子查询统计了 SGC_PROJECT_MANAGEMENT 表中 BTSCHEDULE 字段为 'D'，且 SCHEDULE 字段为 '100%' 的记录数，并将结果存储在别名为 completedNum 的返回字段中。

\<where\>: 它生成 WHERE 子句。

\<choose\>, \<when\>, \<otherwise\>: 这三个标签是 MyBatis 的条件判断标签，等同于 Java 中的 switch 和 if-else 语句。

\<if\>: MyBatis 的条件判断标签，等同于 Java 中的 if 语句。

对于具体的 SQL 语句和 MyBatis 标签的使用，要根据实际的数据表结构和业务需求来定。所以这个 SQL 查询语句可能不适用于其他的数据表。如果你有其他数据表的相关需求，可能需要编写新的 SQL 查询语句和 MyBatis XML 映射文件来满足这些需求。

注意：你给出的代码中 likt 应该是拼写错误，应该为 like。

在MyBatis的映射文件中，\<where\>、\<if\>、\<choose\>、\<when\>、\<otherwise\>等元素可以被用来动态生成SQL语句。

\<where\>: 用于生成一个where子句，自动处理"where"关键字和"and"或"or"关键字的位置，使得生成的SQL更为准确。

\<if\>: 用于进行条件判断。"test"属性中的内容就是判断的条件。当test中的表达式为true时，会包含该\<if\>标签内的SQL片段，否则不会包含。例如，test="countRegion != null and countRegion != ''"，意味着当countRegion参数不为null并且不为空字符串时，才会在生成的SQL中添加 and THEIRDISTRICT like concat('%',#{countRegion},'%')这段SQL。

\<choose\>、\<when\>、\<otherwise\>: 与Java中的switch-case-default结构类似，用于在多个条件中选择一个。\<when\>表示当某个条件为真时要做的事情，\<otherwise\>表示当所有\<when\>中的条件都不为真时做的事情。

在你给出的例子中，test属性被用来判断是否要包含特定的SQL片段。如果countYear不为null且不为空字符串，则在生成的SQL中添加and THEIRYEAR = #{countYear}；否则，添加and THEIRYEAR = DATE_FORMAT(NOW(),'%Y')。同样地，只有当countRegion不为null且不为空字符串时，才在生成的SQL中添加and THEIRDISTRICT like concat('%',#{countRegion},'%')。这样做可以让我们的SQL根据不同的参数动态地变化，从而更灵活地应对不同的查询需求。
