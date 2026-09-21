---
title: "Spring Boot 整合 Lombok"
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
description: "什么是 项目是一个第三方的 Java 工具库，它会自动插入编辑器和构建工具中， Lombok 提供了一组非常有用的注释，用来消除 Java 类中的大量样板代码，比如 setter getter 方法、构造方法等等， 仅仅在原来的 JavaBean 类上使用 @Data 注解就可以。"
sidebarWeight: 3
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/Spring Boot 整合 Lombok/Spring Boot 整合 Lombok.md"
---
::: v-pre

# Spring Boot 整合 Lombok

> 本节目标：理解“Spring Boot 整合 Lombok”的核心思路，并能把它用于实际开发或面试表达。
**什么是**

```
 Lombok
Lombok
```

==项目是一个第三方的== `Java` ==工具库，它会自动插入编辑器和构建工具中，==`Lombok`==提供了一组非常有用的注释，用来消除==`Java`==类中的大量样板代码，比如== `setter getter` ==方法、构造方法等等，== ==仅仅在原来的== `JavaBean` ==类上使用== `@Data` ==注解就可以替换数百行代码从而使代码变得更加清爽、简洁且易于维护。==
==大家可以将它理解为一个工具，仅此而已，千万不要觉得它是一个非用不可的框架。==
**为什么要用** `Lombok`
**为什么新蜂商城第一版中没有使用** `Lombok`
==在讲解为什么要使用== `Lombok` ==之前，我先来讲一下在新蜂商城的第一个版本中为什么没有使用== `Lombok`==。==

- ==非必要==

==首先是第一个原因，它并不是一个必要的插件。==
==之前第一个版本的== `newbee-mall` ==项目中，我并没有使用这个工具，随着开源时间的增长，很多人知道了新蜂商城项目，我也因此收到了很多朋友的提醒，让我在项目中使用== `Lombok` ==工具。==
==但是我觉得，这仅仅是个插件、是个工具而已，它不是== `JDK` ==也不是== `MySQL` ==这种基础组件，也并不是每个开发者都知道它、了解它，所以我并没有把它添加到第一个版本的新蜂商城项目中。==
==因为这与我对第一版新蜂商城的想法有些不同，第一版我就是要用比较简单、比较少的依赖或者工具来实现这个商城，因为这个商城项目的受众非常广、经验跨度也比较大，所以，我也要考虑到新手、小白、==`1-3`==年经验的== `Java` ==学习者和== `Java` ==开发者，我不会选择一些非必要的插件或者框架放到第一版的新蜂商城项目中，让大家都能顺利的运行和使用是第一个版本的新蜂商城所追求的。==

- ==对小白不友好==

==这是第二个原因，虽然它仅仅是个工具，但是它多少还是有一些使用成本的。==
==我对于== `Lombok` ==也比较熟，用了也比较久，所以我知道使用== `Lombok` ==不仅仅是把它整合到项目代码里去，还需要在开发工具中安装它的插件，否则代码里会一片飘红，代码上的红色波浪线会让你有些抓狂，而安装这个插件又有一点麻烦，所以这是我在第一版的新蜂商城项目中没有使用它的第二个原因，对于新手来说== `Lombok` ==是一个不小的麻烦。==

- ==强迫队友==

==这是另外一个原因，属于思维拓展了，因为这一点并不是第一版新蜂商城项目不使用== `Lombok` ==的原因。==
==如果是自己单独写项目的话可能不用在意这个，但是在工作中往往是需要进行团队协作的。在一个开发小组中，其中一个开发者用到了== `Lombok`==，但是其他同事没有使用或者不知情的情况下会造成一些负面影响，==`Lombok` ==的使用要求开发者在开发工具中中安装对应的插件，如果未安装插件的话，打开一个使用了== `Lombok` ==的项目的话会提示找不到方法等错误。也就是说，如果项目组中有一个人使用了==`Lombok`==，那么其他人最好也要安装== `Lombok` ==插件，否则协同开发时会出现一些小问题，我曾经就是在不知情的情况下被强迫过。==
`Lombok` **的优点**
==说完了它的小缺点，我们再来看一下为什么== `Lombok` ==这么受欢迎，接下来我用一个简单的例子来让大家认识一下它的优点。==
==以下是新蜂商城中轮播图== `POJO` ==对象的字段及定义：==

```
    //
```

==轮播图==

```
 JavaBean    public class Carousel {        private Integer carouselId;        private String carouselUrl;        private String redirectUrl;        private Integer carouselRank;        private Byte isDeleted;        private Date createTime;        private Integer createUser;        private Date updateTime;        private Integer updateUser;    }
```
 ==如果想要在项目中使用这个对象，我们就必须还要给每一个字段加上== `setter` ==和== `getter` ==方法，有可能还要写构造方法、==`equals()` ==方法、==`toString()` ==方法等等，这些方法量多而且没有技术含量，但是我们又不得不去写它们。==
==此时，==`Lombok` ==出现了，这个工具的主要作用是通过一些注解，消除刚刚提到的这种看似无用但是又不得不写的代码，==`Lombok` ==的解决方式如下：==

```
    @Data    public class Carousel {        private Integer carouselId;        private String carouselUrl;        private String redirectUrl;        private Integer carouselRank;        private Byte isDeleted;        private Date createTime;        private Integer createUser;        private Date updateTime;        private Integer updateUser;    }
```
 ==仅仅加一个== `@Data` ==注解即可，接下来我们再来看一下== `Carousel` ==这个== `POJO` ==类的结构：==
==我们仅仅在类上添加了一个注解，并没有添加== `setter/getter` ==等方法，但是这些方法已经自动生成了，这就是== `Lombok` ==的作用。==
`Lombok` ==想要解决的是在我们== `POJO` ==类中大量的== `getter/setter`==、==`equals()`==、==`toString()` ==等等可能不会用到但是仍然需要在类中定义的方法，在使用== `Lombok` ==之后，将由其它来自动帮你实现代码生成，将极大减少你的代码量、精简和优化这些== `POJO` ==类。==
==在这一版的新蜂商城项目中使用== `Lombok` ==的原因总结如下：==

- ==很多人对此都提了建议，希望我将== `Lombok` ==添加到项目中==
- ==减少部分冗余代码==

==既然选择了它，那它肯定也有它的优点，既然用到了它，我就要告诉大家怎样整合== `Lombok`==、怎样在== `IDEA` ==中安装== `Lombok` ==插件，让你们顺利的使用它。所以接下来的两篇文章中我会介绍== `Lombok` ==的整合以及插件安装时需要注意的问题。==

:::
