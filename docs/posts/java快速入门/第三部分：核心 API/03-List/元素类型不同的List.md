---
title: 元素类型不同的List
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
Arrays.asList: 这个方法是 Java 中 Arrays 类的一个静态方法，用于将一个数组转换为列表（List）。在这里，Arrays.asList("已开工", inServiceNum, String.format("%.2f", inServiceRate)) 会创建一个包含三个元素的列表，其中元素分别为字符串 "已开工"，变量 inServiceNum，和一个格式化的字符串。

在 Java 中，List 中的元素可以是不同类型的。因为 List 在声明时可以使用泛型 \<Object\> 来允许其包含任何类型的对象。但是，通常我们在使用 List 时，为了程序的可读性和减少错误，通常会使用具体的类型，如 List\<String\>，List\<Integer\> 等。如果你希望 List 中的元素可以是不同类型，你可以声明 List\<Object\>，然后可以添加任何类型的对象。但是，这样做在处理 List 时可能需要额外的类型检查和转换。
