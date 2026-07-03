---
title: Swagger使用
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
创建 `Controller` 类并新增接口信息
在 `controller` 包下新增 `TestSwaggerController.java`，代码如下：
`Package`

ltd.newbee.mall.controller;
importltd.newbee.mall.entity.User;
importio.swagger.annotations.ApiImplicitParam;
importio.swagger.annotations.ApiImplicitParams;
importio.swagger.annotations.ApiOperation;
importorg.springframework.web.bind.annotation.*;
importjava.util.*;
@RestControllerpublicclassTestSwaggerController{
staticMap\<Integer, User\> usersMap = Collections.synchronizedMap(newHashMap\<Integer, User\>());
//
初始化

 usersMapstatic{
        Useruser=newUser();
        user.setId(1);
        user.setName("newbee1");
        user.setPassword("111111");
        Useruser2=newUser();
        user2.setId(2);
        user2.setName("newbee2");
        user2.setPassword("222222");
        usersMap.put(1, user);
        usersMap.put(2, user2);
    }
@ApiOperation(value = "
获取用户列表

", notes = "")@GetMapping("/users")publicList\<User\> getUserList(){
        List\<User\> users = newArrayList\<User\>(usersMap.values());
        returnusers;
    }
@ApiOperation(value = "
新增用户`", notes = "`根据`User`对象新增用户`")@ApiImplicitParam(name = "user", value = "`用户实体

", required = true, dataType = "User")@PostMapping("/users")publicString postUser(@RequestBodyUser user){
        usersMap.put(user.getId(), user);
        return"
新增成功

";
    }
@ApiOperation(value = "
获取用户详细信息`", notes = "`根据`id`来获取用户详细信息`")@ApiImplicitParam(name = "id", value = "`用户

id", required = true, dataType = "int")@GetMapping("/users/{id}")publicUser getUser(@PathVariableInteger id){
        returnusersMap.get(id);
    }
@ApiOperation(value = "
更新用户详细信息

", notes = "")@ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "
用户

id", required = true, dataType = "int"),
            @ApiImplicitParam(name = "user", value = "
用户实体

user", required = true, dataType = "User")
    })@PutMapping("/users/{id}")publicString putUser(@PathVariableInteger id, @RequestBodyUser user){
        UsertempUser=usersMap.get(id);
        tempUser.setName(user.getName());
        tempUser.setPassword(user.getPassword());
        usersMap.put(id, tempUser);
        return"
更新成功

";
    }
@ApiOperation(value = "
删除用户`", notes = "`根据`id`删除对象`")@ApiImplicitParam(name = "id", value = "`用户

id", required = true, dataType = "int")@DeleteMapping("/users/{id}")publicString deleteUser(@PathVariableInteger id){
        usersMap.remove(id);
        return"
删除成功

";
    }
}
 我们新增了一个 `controller` 类并定义了 `5` 个接口，并且在每个接口上通过`@ApiOperation`注解来给`API`增加说明、通过`@ApiImplicitParams`、`@ApiImplicitParam`注解来给参数增加说明。
接口测试
在介绍 `Swagger` 的时候我们就说过，它不仅仅是一个接口文档工具，它也是一个接口测试工具，我们可以通过它向后端发送请求、传输参数并获取返回数据，通过这种方式我们也能够进行接口测试，接下来对这些接口进行实际的测试。
用户列表接口
首先我们点进列表接口，接口的右上方有 `Try it out` 按钮：

点击它来准备发送用户列表接口请求，之后页面上会出现 `Execute` 按钮：

点击它之后会实际的向后端发送用户列表请求，请求成功后可以在页面中看到请求信息，以及返回数据，在 `Response body` 信息框中我们可以看到两条用户数据，接口请求成功且数据如预期中的数据一致，证明这个接口是没有问题的。

用户添加接口
首先我们点进新增接口，接口的右上方有 `Try it out` 按钮，点击它来尝试发送请求，由于这个接口需要传输用户数据，因此页面上会出现用户信息录入框，我们在这里依次填写需要添加的用户数据，之后页面上会出现 `Execute` 按钮，点击它之后会实际的向后端发送用户添加请求，请求成功后可以在页面中看到添加成功。

为了验证是否已经添加成功，我们再去请求依次用户列表请求，此时 `Response body` 信息框中我们可以看到 `3` 条用户数据，接口请求成功且数据如预期中的数据一致，证明用户添加这个接口也是没有问题的。

用户详情接口
点进用户详情接口，接口的右上方有 `Try it out` 按钮，点击它来尝试发送请求，由于这个接口需要传输用户 `id`，因此页面上会出现 `id` 录入框，我们在这里想要查询 `id` 为 `4` 的用户数据就在信息录入框中输入 `4`，之后页面上会出现 `Execute` 按钮，点击它之后会实际的向后端发送用户详情信息请求，请求成功后可以在页面中看到 `id` 为 `4` 的用户数据：

接口请求成功且数据如预期中的数据一致，证明用户详情这个接口也是没有问题的。
用户更新接口
测试过程与用户添加接口类似，省略。
用户删除接口
测试过程与用户详情类似，删除成功后可以再次请求列表接口确认接口的实现逻辑是否正确。
总结
由于用户更新接口和用户删除接口的操作过程与前面的几个类似因此选择了省略，同学们可以自行测试。
本篇文章中所涉及的源码已经整理好并上传到百度云，地址和提取密码如下：
链接

: https://pan.baidu.com/s/1X0m1le_zBaPJhEI4Di7-9A
 提取码`: bpjm`

同时，你也可以根据本文内容多写几个 `Controller` 类来熟悉一下 `Swagger`，多多练习才能进步。

来自

 \<https://juejin.cn/book/6844733826191589390/section/6844733826288058382\>
```
