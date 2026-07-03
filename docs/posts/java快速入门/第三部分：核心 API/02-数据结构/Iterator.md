---
title: Iterator
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
```
接口Iterator提供了一种以定义好的顺序遍历一系列元素的标准方式。虽然不能在数据结构外使用这个接口，但了解Iterator接口的工作原理将有助于您理解其他Java数据结构。

接口Iterator定义的三个方法：
public boolean hasNext();
public Object next();
public void remove();
这些方法都没有任何代码，因为接口不提供实现。实现接口的类必须提供定义方法的代码。

方法hasNext()定义了结构是否还包含其他元素。可调用该方法来查看是否可以断续遍历结构。

方法next()获得结构中的下一个元素。如果没有更多的元素，next()将引发NoSuchElementException异常。为避免产生这种异常，应结合使用hasNext()和next()来确保还有元素可检索。

下面的whild循环使用这两种方法来遍历一个名为users的数据结构对象，该对象实现了接口Iterator:
while(users.hasNext()){
 Object ob = users.next();
System.out.println(ob);
}

方法next()总是返回一个Object对象，您可以将其转换为数据结构存储的类对象。下面的例子将其转换为String对象：
while (users.hasNext()){
String ob = (String) users.next();
System.out.println(ob);
}
注意：由于Iterator是接口，所以不能将经用作数据结构；相反，您在实现了接口的数据结构中使用Iterator定义的方法。这为很多Java标准数据结构提供了一致的接口，使得它们学习和使用起来更容易。
```
