---
title: Service CRUD 接口
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
另外一套`CRUD`是`Service`层的，只需要编写一个接口，继承`IService`，并创建一个接口实现类，即可食用。（这个接口提供的`CRUD`方法，和`Mapper`接口提供的功能大同小异，比较明显的区别在于：

- `IService`支持了更多的批量化操作，如`saveBatch`，`saveOrUpdateBatch`等方法。
- 支持链式调用；

食用示例如下
`1.` 首先，新建一个接口，继承

IService
package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.po.User;
public interface UserService extends IService\<User\> {
}

`2.` 创建这个接口的实现类，并继承`ServiceImpl`，最后打上`@Service`注解，注册到`Spring`容器中，即可食用
`package com.example.demo.service.impl;`

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.mappers.UserMapper;
import com.example.demo.po.User;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Service;
@Service
public class UserServiceImpl extends ServiceImpl\<UserMapper, User\> implements UserService {
}

`3.` 测试代码

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.demo.po.User;
import com.example.demo.service.UserService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
public class ServiceTest {

 @Autowired

 private UserService userService;

 @Test

 public void testGetOne() {

 LambdaQueryWrapper\<User\> wrapper = Wrappers.\<User\>lambdaQuery();

 wrapper.gt(User::getAge, 28);

 //
第二参数指定为`false,`使得在查到了多行记录时`,`不抛出异常`,`而返回第一条记录
   

 User one = userService.getOne(wrapper, false);

 System.out.println(one);

 }
}

`IService`也支持链式调用，代码写起来非常简洁，查询示例如下

@Test
public void testChain() {
  List\<User\> list = userService.lambdaQuery()
    .gt(User::getAge, 39)
    .likeRight(User::getName, "
王

")
    .list();
  list.forEach(System.out::println);
}
更新示例如下

@Test
public void testChain() {
  userService.lambdaUpdate()
    .gt(User::getAge, 39)
    .likeRight(User::getName, "
王

")
    .set(User::getEmail, "w39@baomidou.com")
    .update();
}
删除示例如下

  @Test
  public void testChain() {
    userService.lambdaUpdate()
      .like(User::getName, "
青蛙

")
      .remove();
  }
```
