---
title: 位组bitset
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
- 需要表示大量的二进制数据（即只可以为1或0的比特值）时，BitSet类很有用。
- 这些值也被称为开/关值（1表示开，0表示关）或布尔值（1表示Ture，0表示false）。
- 使用BitSet类，可以用位来存储布尔值，而无须通过按位运算来提取位值。您只需使用索引来引用每一位。
- BitSet类的另一个优点，它可以自动增大，以表示程序所需要的位数。
- 下图显示了位组数据结构的逻辑组织

![Boolean Boolean 1 Boolean2 Boolean3](Exported%20image%2020260703001131-0.png)

可以使用BitSet来存储可以用布尔值模拟的属性。由于位组中的各个位是通过索引来访问的，所以可以将每个属性名定义为常量索引值，如下面的类所示：

在这个类中，属性名对应的值从0开始依次递增，所以可以使用这些值来取得或设置位组中的位，先创建一个BitSet对象：
BitSet connex = new BitSet();
该构造函数创建了一个大小没有被指定的位组。您还可以创建一个指定大小的位组：
BitSet connex = new BiSet(4);

不管使用哪个构造函数，新位组中的所有位都将被初始化为false。创建位组后，便可以使用set(int)和clear(int)方法以及您定义的索引常量来设置和清除这些位。

可以使用get方法来获得位组中的各个位：
boolean isWriteable = connex.get(Connexct.Fiex);

使用size方法，可以确定位组表示了多少位：
int numBits = connex.size();

类BitSet还可以提供用于对位组进行比较以及诸如AND,OR和XOR等按位运算的方法。这些方法都接受一个BitSet对象作为其唯一的参数。
```
