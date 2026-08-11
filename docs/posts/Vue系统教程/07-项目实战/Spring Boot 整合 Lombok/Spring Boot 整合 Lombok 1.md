---
title: "Spring Boot 整合 Lombok 1"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "整合 Lombok 还是比较简单的，只需要在 Spring Boot 项目的 pom.xml 依赖文件中添加 Lombok 的依赖即可： 这里我用到的是 1.18.8 版本，你可以根据需求自己修改这个版本号。 定义一个 POJO 并添加 @Data 注解： 之后你就可以在其它类中。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/Spring Boot 整合 Lombok/Spring Boot 整合 Lombok 1.md"
---
::: v-pre

# Spring Boot 整合 Lombok 1

> 本节目标：理解“Spring Boot 整合 Lombok 1”的核心思路，并能把它用于实际开发或面试表达。
==整合== `Lombok` ==还是比较简单的，只需要在== `Spring Boot` ==项目的== `pom.xml` ==依赖文件中添加== `Lombok` ==的依赖即可：==

```
        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <version>1.18.8</version>            <scope>provided</scope>        </dependency>
```
 ==这里我用到的是== `1.18.8` ==版本，你可以根据需求自己修改这个版本号。==
==定义一个== `POJO` ==并添加== `@Data` ==注解：==

```
    @Data    public class NewBeeMallPOJO {       private String title;       private int number;     private Date createTime;    }
```
 ==之后你就可以在其它类中构造== `NewBeeMallPOJO` ==类以及调用其中的== `getter/setter toString()` ==等方法了。==

```
    NewBeeMallPOJO newBeeMallPOJO = new NewBeeMallPOJO();        newBeeMallPOJO.setNumber(2);        System.out.println(newBeeMallPOJO.toString());
@Data
```

 ==注解是一个比较霸道的注解，它不仅能够生成== `POJO` ==类所有属性的== `get()` ==和== `set()` ==方法，此外还提供了==`equals`==、==`canEqual`==、==`hashCode`==、==`toString` ==方法。==
==如果你不想要生成这么多内容，也可以使用其它的注解来实现你的需求：==

- `@Setter` ==注解在属性上，为属性提供== `setting` ==方法==
- `@Getter` ==注解在属性上，为属性提供== `getting` ==方法==
- `@Log4j` ==注解在类上，为类提供一个== ==属性名为==`log` ==的== `log4j` ==日志对象==
- `@NoArgsConstructor` ==注解在类上，为类提供一个无参的构造方法==
- `@AllArgsConstructor` ==注解在类上，为类提供一个全参的构造方法==
- `@Builder` ==被注解的类加个构造者模式==
- `@Synchronized` ==加同步锁==
- `@NonNull` ==如果给参数加个这个注解== ==参数为==`null`==会抛出空指针异常==
- `@Value` ==注解和== `@Data` ==类似，区别在于它会把所有成员变量默认定义为== `private final` ==修饰，并且不会生成==`set`==方法。==

==部分注解我也写了测试== `demo`==，如下所示。==

```
    @AllArgsConstructor    @ToString    public class NewBeeMallPOJO3 {            @Getter        private String title;        @Getter        private int number;        @Getter        private Date createTime;        }
```
 ==主要是测试全字段构造方法、单独的== `toString()` ==方法以及字段的== `getter` ==方法：==

```
    @Test    public void testGetterAndToString() {        NewBeeMallPOJO3 newBeeMallPOJO3 = new NewBeeMallPOJO3("Lombok
```

==测试==

```
", 3, new Date());
```

```
System.out.println(newBeeMallPOJO3.getTitle());        System.out.println(newBeeMallPOJO3.getNumber());        System.out.println(newBeeMallPOJO3.getClass());        System.out.println(newBeeMallPOJO3.toString());    }
```
 ==构造者模式模式大家也可以注意一下，添加了== `@Builder` ==注解后就可以使用这种方式来构造类的实例，案例如下：==

```
    @Builder    public class NewBeeMallPOJO2 {        private String title;        private int number;        private Date createTime;    }
    @Test    public void testBuilder() {        NewBeeMallPOJO2.NewBeeMallPOJO2Builder builder = NewBeeMallPOJO2.builder();        NewBeeMallPOJO2 newBeeMallPOJO2 =                builder.number(1)                        .title("Lombok
```

==测试==

```
")                        .createTime(new Date())                        .build();
```

```
System.out.println(newBeeMallPOJO2.toString());    }
```
 ==以上所涉及到的源码已经整理好并上传到百度云，地址和提取密码如下：==``==链接==

```
: https://pan.baidu.com/s/1h3VUW2J2HBythGf-AeE9-g
```

==提取码==

```
: vyty
```
 **我对于** `Lombok` **这个工具的看法**
==对于类似== `Lombok` ==这种工具的使用，其实也有一些争论，有人觉得很方便推荐大家使用，也有些人会发表一些反对言论，什么破坏封装性啦、影响代码阅读性之类的言论等等，在这里我也说一下我的看法。==

1. ==这个工具并不是非用不可，之前我也已经谈过，它就是一个工具而已。==
2. ==使用这个工具确实会给开发者带来一些便利，简化了一些开发内容。==
3. ==这个工具也有一些缺点，之前也谈过，我并不反对大家用这个工具，但是使用时一定要和队友沟通好。==
4. `Lombok` ==只是一个工具而已，千万不要上纲上线。==

==总结下来，==`Lombok` ==有一些缺点，但是我们也不能忽视它的优点，工具就在这里，你爱用就用，不爱用就把相关依赖去掉，然后自己生成== `POJO` ==类的方法即可，反正这些方法的生成也都有快捷键，千万不要上纲上线，我就想问一句话，不用== `Lombok`==，你代码的封装性就有了？你代码的阅读性就能好了？不见得吧。==
**总结**
==这节课主要介绍了== `Lombok` ==这个插件，从它的优缺点到它的整合，也解释了为什么在第一版本的新蜂商城项目中为什么没有使用== `Lombok`==，至于这个版本使用了== `Lombok` ==也是因为它的方便，现在这个版本的后端代码里有很多都用到了== `Lombok` ==的注解：==

==大家在下载源码后也能够看到，接下来的一篇文章我会介绍一下== `Lombok` ==插件安装时需要注意的事情，让大家都能够无困扰的使用== `Lombok` ==这个工具。==
 \> 来自

```
 <https://juejin.im/book/6844733826191589390/section/6844733826275475463>
```

:::
