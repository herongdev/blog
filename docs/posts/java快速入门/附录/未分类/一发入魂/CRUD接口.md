---
title: CRUD接口
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
`mp`封装了一些最基础的`CRUD`方法，只需要直接继承`mp`提供的接口，无需编写任何`SQL`，即可食用。`mp`提供了两套接口，分别是`Mapper CRUD`接口和`Service CRUD`接口。并且`mp`还提供了条件构造器`Wrapper`，可以方便地组装`SQL`语句中的`WHERE`条件，参见条件构造器小节

`Mapper CRUD`接口
只需定义好实体类，然后创建一个接口，继承`mp`提供的`BaseMapper`，即可食用。`mp`会在`mybatis`启动时，自动解析实体类和表的映射关系，并注入带有通用`CRUD`方法的`mapper`。`BaseMapper`里提供的方法，部分列举如下：

- `insert(T entity)` 插入一条记录
- `deleteById(Serializable id)` 根据主键`id`删除一条记录
- `delete(Wrapper\<T\> wrapper)` 根据条件构造器`wrapper`进行删除
- `selectById(Serializable id)` 根据主键`id`进行查找
- `selectBatchIds(Collection idList)` 根据主键`id`进行批量查找
- `selectByMap(Map\<String,Object\> map)` 根据`map`中指定的列名和列值进行等值匹配查找
- `selectMaps(Wrapper\<T\> wrapper)` 根据 `wrapper` 条件，查询记录，将查询结果封装为一个`Map`，`Map`的`key`为结果的列，`value`为值
- `selectList(Wrapper\<T\> wrapper)` 根据条件构造器`wrapper`进行查询
- `update(T entity, Wrapper\<T\> wrapper)` 根据条件构造器`wrapper`进行更新
- `updateById(T entity)`
- `...`

简单的食用示例如前文快速入门小节，下面讲解几个比较特别的方法

- selectMaps
- BaseMapper

接口还提供了一个`selectMaps`方法，这个方法会将查询结果封装为一个`Map`，`Map`的`key`为结果的列，`value`为值
该方法的使用场景如下：
• 只查部分列
当某个表的列特别多，而`SELECT`的时候只需要选取个别列，查询出的结果也没必要封装成`Java`实体类对象时（只查部分列时，封装成实体后，实体对象中的很多属性会是`null`），则可以用`selectMaps`，获取到指定的列后，再自行进行处理即可
比如

@Test
public void test3() {
  QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();
  wrapper.select("id","name","email").likeRight("name","
黄

");
  List\<Map\<String, Object\>\> maps = userMapper.selectMaps(wrapper);
  maps.forEach(System.out::println);
}
进行数据统计
比如
`//` 按照直属上级进行分组，查询每组的平均年龄，最大年龄，最小年龄

/**
 * select avg(age) avg_age ,min(age) min_age, max(age) max_age from user group by manager_id having sum(age) \< 500;
 **/
@Test
public void test3() {
  QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();
  wrapper.select("manager_id", "avg(age) avg_age", "min(age) min_age", "max(age) max_age")
    .groupBy("manager_id").having("sum(age) \< {0}", 500);
  List\<Map\<String, Object\>\> maps = userMapper.selectMaps(wrapper);
  maps.forEach(System.out::println);
}

`selectObjs`
只会返回第一个字段（第一列）的值，其他字段会被舍弃
比如

@Test
public void test3() {
  QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();
  wrapper.select("id", "name").like("name", "
黄

");
  List\<Object\> objects = userMapper.selectObjs(wrapper);
  objects.forEach(System.out::println);
}
 得到的结果，只封装了第一列的`id`

`selectCount`
查询满足条件的总数，注意，使用这个方法，不能调用`QueryWrapper`的`select`方法设置要查询的列了。这个方法会自动添加`select count(1)`
比如

@Test
public void test3() {
  QueryWrapper\<User\> wrapper = new QueryWrapper\<\>();
  wrapper.like("name", "
黄

");
  Integer count = Math.toIntExact(userMapper.selectCount(wrapper));
  System.out.println(count);
}
```
