---
title: Map集合
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
```
现实生活中，我们常会看到这样的一种集合：IP地址与主机名，身份证号与个人，系统用户名与系统用户对象等，这种一一对应的关系，就叫做映射。

java.util.Map 接口为实现键映射数据结构定义了一个框架，这种结构可用于存储通过键值引用的对象。键和值可以为任意类型数据。键值的作用与数组中的索引相同，它是一个独一无二的值，可用来存取数据结构中指定位置的数据。

 **Map** **接口与** **Collection** **接口区别：**

Collection 中的集合称为单列集合， Map中的集合称为双列集合。

Collection 中的集合，元素是孤立存在的（理解为单身），向集合中存储元素采用一个个元素的方式存储。

Map 中的集合，元素是成对存在的。每个元素由键与值两部分组成，通过键可以找对所对应的值。

注意： Map 中的集合不能包含重复的键，值可以重复。

**Map****常用子类**
Map有多个子类，常用的有HashMap集合、LinkedHashMap集合。

**HashMap**：存储数据采用的哈希表结构，元素的存取顺序不能保证一致。由于要保证键的唯一、不重复，需要重写键的hashCode()方法、equals()方法。

**LinkedHashMap**：HashMap下有个子类LinkedHashMap，存储数据采用的哈希表结构+链表结构。通过链表结构可以保证元素的存取顺序一致；通过哈希表结构可以保证的键的唯一、不重复，需要重写键的hashCode()方法、equals()方法。
tips：Map接口中的集合都有两个泛型变量,在使用时，要为两个泛型变量赋予数据类型。两个泛型变量的数据类型可以相同，也可以不同。

**Map****接口中的常用方法**
Map接口中定义了很多方法，常用的如下：
public V put(K key, V value) :把指定的键与指定的值添加到Map集合中。
使用`put`方法时，若指定的键`(key)`在集合中没有，则返回`null`，并把指定的键值添加到集合中；若存在，则返回键对应的值（该值为替换前的值），并把原键值替换成指定的新值。
public V get(Object key) 根据指定的键，在Map集合中获取对应的值。
public V remove(Object key) : 把指定的键所对应的键值对元素 在Map集合中删除，返回被删除元素的值。
public Set\<K\> keySet() : 获取Map集合中所有的键，存储到Set集合中。
public Set\<Map.Entry\<K,V\>\> entrySet() : 获取到Map集合中所有的键值对对象的集合(Set集合)。
方法size()来获悉结构包含多少个元素：int size = look.size();
方法isEmpty()来检查结构是否为空：boolean isEmpty = look.isEmpty();

Map接口的方法演示
public class MapDemo {
public static void main(String[] args) {
//创建 map对象
HashMap\<String, String\> map = new HashMap\<String, String\>();
//添加元素到集合
map.put("黄晓明", "杨颖");
map.put("文章", "马伊琍");
map.put("邓超", "孙俪");
System.out.println(map);
//String remove(String key)
System.out.println(map.remove("邓超"));
System.out.println(map);
// 想要查看 黄晓明的媳妇 是谁
System.out.println(map.get("黄晓明"));
System.out.println(map.get("邓超"));
}
}

**Map****集合遍历键找值方式**
键找值方式：即通过元素中的键，获取键所对应的值
分析步骤：
1. 获取Map中所有的键，由于键是唯一的，所以返回一个Set集合存储所有的键。
2. 遍历键的Set集合，得到每一个键。
3. 根据键，获取键所对应的值。方法提示: get(K key)
代码演示：
public class MapDemo01 {
public static void main(String[] args) {
//创建Map集合对象
HashMap\<String, String\> map = new HashMap\<String,String\>();
//添加元素到集合
map.put("胡歌", "霍建华");
map.put("郭德纲", "于谦");
map.put("薛之谦", "大张伟");
//获取所有的键 获取键集
Set\<String\> keys = map.keySet();
// 遍历键集 得到 每一个键
for (String key : keys) {
//key 就是键
//获取对应值
String value = map.get(key);
System.out.println(key+"的CP是："+value);
}
}
}

**Entry****键值对对象**
我们已经知道， Map 中存放的是两种对象，一种称为**key**(键)，一种称为**value**(值)，它们在在 Map 中是一一对应关系，这一对对象又称做 Map 中的一个 Entry(项) 。 Entry 将键值对的对应关系封装成了对象。即键值对对象，这样我们在遍历 Map 集合时，就可以从每一个键值对（ Entry ）对象中获取对应的键与对应的值。
既然Entry表示了一对键和值，那么也同样提供了获取对应键和对应值得方法：
public K getKey() ：获取Entry对象中的键。
public V getValue() ：获取Entry对象中的值。
在Map集合中也提供了获取所有Entry对象的方法：
public Set\<Map.Entry\<K,V\>\> entrySet() : 获取到Map集合中所有的键值对对象的集合(Set集合)。

**Map****集合遍历键值对方式**
键值对方式：即通过集合中每个键值对(Entry)对象，获取键值对(Entry)对象中的键与值。
操作步骤与图解：
1. 获取Map集合中，所有的键值对(Entry)对象，以Set集合形式返回。方法提示: entrySet() 。
2. 遍历包含键值对(Entry)对象的Set集合，得到每一个键值对(Entry)对象。
3. 通过键值对(Entry)对象，获取Entry对象中的键与值。 方法提示: getkey() getValue()
public class MapDemo02 {
public static void main(String[] args) {
// 创建Map集合对象
HashMap\<String, String\> map = new HashMap\<String,String\>();
// 添加元素到集合
map.put("胡歌", "霍建华");
map.put("郭德纲", "于谦");
map.put("薛之谦", "大张伟");
// 获取 所有的 entry对象 entrySet
Set\<Entry\<String,String\>\> entrySet = map.entrySet();
// 遍历得到每一个entry对象
for (Entry\<String, String\> entry : entrySet) {
// 解析
String key = entry.getKey();
String value = entry.getValue();
System.out.println(key+"的CP是:"+value);
}
}
}

**HashMap****存储自定义类型键值**
练习：每位学生（姓名，年龄）都有自己的家庭住址。那么，既然有对应关系，则将学生对象和家庭住址存储到 map集合中。学生作为键, 家庭住址作为值。
注意，学生姓名相同并且年龄相同视为同一名学生。
编写学生类：
public class Student {
private String name;
private int age;
public Student() {
}
public Student(String name, int age) {
this.name = name;
this.age = age;
}
public String getName() {
return name;
}
public void setName(String name) {
this.name = name;
}
public int getAge() {
return age;
}
public void setAge(int age) {
this.age = age;
}
@Override
public boolean equals(Object o) {
if (this == o)
return true;
if (o == null || getClass() != o.getClass())
return false;
Student student = (Student) o;
return age == student.age && Objects.equals(name, student.name);
}
@Override
public int hashCode() {
return Objects.hash(name, age);
}
}
编写测试类：
public class HashMapTest {
public static void main(String[] args) {
//1,创建Hashmap集合对象。
Map\<Student,String\> map = new HashMap\<Student,String\>();
//2,添加元素。
map.put(newStudent("lisi",28), "上海");
map.put(newStudent("wangwu",22), "北京");
map.put(newStudent("zhaoliu",24), "成都");
map.put(newStudent("zhouqi",25), "广州");
map.put(newStudent("wangwu",22), "南京");
//3,取出元素。键找值方式
Set\<Student\>keySet = map.keySet();
for(Student key: keySet){
Stringvalue = map.get(key);
System.out.println(key.toString()+"....."+value);
}
}
}

当给HashMap中存放自定义对象时，如果自定义对象作为key存在，这时要保证对象唯一，必须复写对象的hashCode和equals方法。
如果要保证map中存放的key和取出的顺序一致，可以使用 java.util.LinkedHashMap 集合来存放。

**LinkedHashMap**
我们知道HashMap保证成对元素唯一，并且查询速度很快，可是成对元素存放进去是没有顺序的，那么我们要保证有序，还要速度快怎么办呢？
在HashMap下面有一个子类LinkedHashMap，它是链表和哈希表组合的一个数据存储结构。
public class LinkedHashMapDemo {
public static void main(String[] args) {
LinkedHashMap\<String, String\> map = new LinkedHashMap\<String, String\>();
map.put("邓超", "孙俪");
map.put("李晨", "范冰冰");
map.put("刘德华", "朱丽倩");
Set\<Entry\<String, String\>\> entrySet = map.entrySet();
for (Entry\<String, String\> entry : entrySet) {
System.out.println(entry.getKey() + " " + entry.getValue());
}
}
}
结果:
邓超 孙俪
李晨 范冰冰
刘德华 朱丽倩

**Map****集合练习**
**需求：**
计算一个字符串中每个字符出现次数。
**分析：**
1. 获取一个字符串对象
2. 创建一个Map集合，键代表字符，值代表次数。
3. 遍历字符串得到每个字符。
4. 判断Map中是否有该键。
5. 如果没有，第一次出现，存储次数为1；如果有，则说明已经出现过，获取到对应的值进行++，再次存储。
6. 打印最终结果
![public class MapTest public static void args Syste...](Exported%20image%2020260703001151-0.png)
