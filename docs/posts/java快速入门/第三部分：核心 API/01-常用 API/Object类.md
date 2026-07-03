---
title: Object类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
`` `java.lang.Object` ``类是`Java`语言中的根类，即所有类的父类。它中描述的所有方法子类都可以使用。在对象实例化的时候，最终找的父类就是`Object`。
如果一个类没有特别指定父类，那么默认则继承自`Object`类。例如：

java
public class MyClass /*extends Object*/ {
  // ...
}

 根据`JDK`源代码及`Object`类的`API`文档，`Object`类当中包含的方法有`11`个。今天我们主要学习其中的`2`个：

* `public String toString()`
：返回该对象的字符串表示。

* `public boolean equals(Object obj)`
：指示其他某个对象是否与此对象`“`相等`”`。

`## 1.2 toString`**方法**
`###` **方法摘要**

* `public String toString()`
：返回该对象的字符串表示。
`toString`方法返回该对象的字符串表示，其实该字符串内容就是对象的类型`+@+`内存地址值。
由于`toString`方法返回的结果是内存地址，而在开发中，经常需要按照对象的属性得到相应的字符串表现形式，因此也需要重写它。
`###` **覆盖重写**
如果不希望使用`toString`方法的默认行为，则可以对它进行覆盖重写。例如自定义的`Person`类：

java
public class Person {
private String name;
private int age;
@Override
public String toString() {
return "Person{" + "name='" + name + '\'' + ", age=" + age + '}';
}
//
`省略构造器与`
Getter Setter
}

 在`IntelliJ IDEA`中，可以点击`` `Code` ``菜单中的`` `Generate...` ``，也可以使用快捷键`` `alt+insert` ``，点击`` `toString()` ``选项。选择需要包含的成员变量并确定。如下图所示：

`\>`

小贴士： 在我们直接使用输出语句输出对象名的时候`,`其实通过该对象调用了其`toString()`方法。

`## 1.3 equals`**方法**
`###` **方法摘要**

* `public boolean equals(Object obj)`
：指示其他某个对象是否与此对象`“`相等`”`。
调用成员方法`equals`并指定参数为另一个对象，则可以判断这两个对象是否是相同的。这里的`“`相同`”`有默认和自定义两种方式。
`###` **默认地址比较**
如果没有覆盖重写`equals`方法，那么`Object`类中默认进行`` `==` ``运算符的对象地址比较，只要不是同一个对象，结果必然为`false`。
`###` **对象内容比较**
如果希望进行对象的内容比较，即所有或指定的部分成员变量相同就判定两个对象相同，则可以覆盖重写`equals`方法。例如：

java
import java.util.Objects;
public class Person {   
    private String name;
    private int age;
    
@Override
public boolean equals(Object o) {
//
`如果对象地址一样，则认为相同`
if (this == o)
return true;
//
`如果参数为空，或者类型信息不一样，则认为不同`
if (o == null || getClass() != o.getClass())
return false;
//
`转换为当前类型`
Person person = (Person) o;
//
要求基本类型相等，并且将引用类型交给`java.util.Objects`类的`equals`静态方法取用结果

return age == person.age && Objects.equals(name, person.name);
}
}

 这段代码充分考虑了对象为空、类型一致等问题，但方法内容并不唯一。大多数`IDE`都可以自动生成`equals`方法的代码内容。在`IntelliJ IDEA`中，可以使用`` `Code` ``菜单中的`` `Generate…` ``选项，也可以使用快捷键`` `alt+insert` ``，并选择`` `equals() and hashCode()` ``进行自动代码生成。如下图所示：

`\> tips`

：`Object`类当中的`hashCode`等其他方法，今后学习。

`## 1.4 Objects`**类**
在刚才`IDEA`自动重写`equals`代码中，使用到了`` `java.util.Objects` ``类，那么这个类是什么呢？
在`**JDK7**`添加了一个`Objects`工具类，它提供了一些方法来操作对象，它由一些静态的实用方法组成，这些方法是`null-save`（空指针安全的）或`null-tolerant`（容忍空指针的），用于计算对象的`hashcode`、返回对象的字符串表示形式、比较两个对象。

在比较两个对象的时候，`Object`的`equals`方法容易抛出空指针异常，而`Objects`类中的`equals`方法就优化了这个问题。方法如下：

* `public static boolean equals(Object a, Object b)`:
判断两个对象是否相等。
我们可以查看一下源码，学习一下：

~~~java
public static boolean equals(Object a, Object b) {
return (a == b) || (a != null && a.equals(b));
}
~~~
```
