---
title: ArrayList类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
**引入——对象数组**
数组的长度是固定的，无法适应数据变化的需求。

`java.util.ArrayList` 是大小**可变的数组**的实现，存储在内的数据称为元素。 `ArrayList` 中可不断添加元素，其大小也自动增长。

`ArrayList`**使用步骤**
**查看类**
`java.util.ArrayList \<E\>` ：该类需要 `import`导入使后使用。

`\<E\>`

，表示一种指定的数据类型，叫做泛型。 `E` ，取自`Element`（元素）的首字母。在出现 `E` 的地方，我们使用一种引用数据类型将其替换即可，表示我们将存储哪种引用类型的元素。
代码如下：

`ArrayList\<String\>`

，

`ArrayList\<Student\>`

**查看构造方法**

public ArrayList()
：构造一个内容为空的集合。
基本格式

:
ArrayList\<String\> list = new ArrayList\<String\>();
 在`JDK 7`后`,`右侧泛型的尖括号之内可以留空，但是`\<\>`仍然要写。
简化格式：

ArrayList\<String\> list = new ArrayList\<\>();
**查看成员方法**

public boolean add(E e)
： 将指定的元素添加到此集合的尾部。
参数 `E e` ，在构造`ArrayList`对象时， `\<E\>` 指定了什么数据类型，那么 `add(E e)` 方法中，只能添加什么数据类型的对象。
使用`ArrayList`类，存储三个字符串元素，代码如下：

public class Test02StudentArrayList {
public static void main(String[] args) {
//
创建学生数组

ArrayList\<String\> list = new ArrayList\<\>();
//
创建学生对象

`String s1 = "`

曹操

";
String s2 = "
刘备

";
String s3 = "
孙权

";
//
打印学生`ArrayList`集合

System.out.println(list);
//
把学生对象作为元素添加到集合

list.add(s1);
list.add(s2);
list.add(s3);
//
打印学生`ArrayList`集合

System.out.println(list);
}
}
**常用方法和遍历**
对于元素的操作`,`基本体现在——增、删、查。常用的方法有：

public boolean add(E e)
：将指定的元素添加到此集合的尾部。

public E remove(int index)
：移除此集合中指定位置上的元素。返回被删除的元素。

public E get(int index)
：返回此集合中指定位置上的元素。返回获取的元素。

public int size()
：返回此集合中的元素数。遍历集合时，可以控制索引范围，防止越界。

**如何存储基本数据类型**
`ArrayList`对象不能存储基本类型，只能存储引用类型的数据。类似 `\<int\>` **不能写**，但是存储基本数据类型对应的包装类型是可以的。所以，想要存储基本类型数据， `\<\>` 中的数据类型，必须转换后才能编写，

转换写法如下：

![byte short long float double char boolean Byte Sho...](Exported%20image%2020260703000421-0.png)

那么存储基本类型数据，代码如下：
`ArrayList`**练习**
**数值添加到集合**
生成`6`个`1~33`之间的随机整数`,`添加到集合`,`并遍历

public class Test01ArrayList {
public static void main(String[] args) {
//
创建`Random` 对象

Random random = new Random();
//
创建`ArrayList` 对象

ArrayList\<Integer\> list = new ArrayList\<\>();
//
添加随机数到集合

for (int i = 0; i \< 6; i++) {
int r = random.nextInt(33) + 1;
list.add(r);
}
//
遍历集合输出

for (int i = 0; i \< list.size(); i++) {
System.out.println(list.get(i));
}
}
}
**打印集合方法**
定义以指定格式打印集合的方法`(ArrayList`类型作为参数`)`，使用`{}`扩起集合，使用`@`分隔每个元素。
格式参照 `{`元素 `@`元素`@`元素`}`。

public class Test03ArrayList {
public static void main(String[] args) {
//
创建集合对象

ArrayList\<String\> list = new ArrayList\<String\>();
//
添加字符串到集合中

`list.add("`

张三丰

");
list.add("
宋远桥

");
list.add("
张无忌

");
list.add("
殷梨亭

");
//
调用方法

printArrayList(list);
}

public static void printArrayList(ArrayList\<String\> list) {
//
拼接左括号

System.out.print("{");
//
遍历集合

for (int i = 0; i \< list.size(); i++) {
//
获取元素

String s = list.get(i);
//
拼接`@`符号

`if (i != list.size()`

‐

 1) {
System.out.print(s + "@");
} else {
//
拼接右括号

System.out.print(s + "}");
}
}
}
}
**获取集合方法**
定义获取所有偶数元素集合的方法`(ArrayList`类型作为返回值

)
public class Test04ArrayList {
public static void main(String[] args) {
//
创建`Random` 对象

Random random = new Random();
//
创建`ArrayList` 对象

ArrayList\<Integer\> list = new ArrayList\<\>();
//
添加随机数到集合

for (int i = 0; i \< 20; i++) {
int r = random.nextInt(1000) + 1;
list.add(r);
}
//
调用偶数集合的方法

ArrayList\<Integer\> arrayList = getArrayList(list);
System.out.println(arrayList);
}

public static ArrayList\<Integer\> getArrayList(ArrayList\<Integer\> list) {
//
创建小集合`,`来保存偶数

ArrayList\<Integer\> smallList = new ArrayList\<\>();
//
遍历

list
for (int i = 0; i \< list.size(); i++) {
//
获取元素

Integer num = list.get(i);
//
判断为偶数`,`添加到小集合中

if (num % 2 == 0){
smallList.add(num);
}
}
//
返回小集合

return smallList;
}
}
```
