---
title: String类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
`java.lang.String` 类代表字符串。
`Java`程序中所有的字符串文字（例如 `"abc"` ）都可以被看作是实现此类的实例。

类

`String`

中包括用于检查各个字符串的方法，比如用于**比较**字符串，**搜索**字符串，**提取**子字符串以及创建具有翻译为**大写**或**小写**的所有字符的字符串的副本。

**特点**
`1.` 字符串不变：字符串的值在创建后不能被更改。

String s1 = "abc";
s1 += "d";
System.out.println(s1); // "abcd"
//
内存中有`"abc"`，`"abcd"`两个对象，`s1`从指向`"abc"`，改变指向，指向了`"abcd"`。

`2.`

因为`String`对象是不可变的，所以它们可以被共享。

String s1 = "abc";
String s2 = "abc";
//
内存中只有一个`"abc"`对象被创建，同时被`s1`和`s2`共享。

`3. "abc"`

等效于 `char[] data={ 'a' , 'b' , 'c' }` 。

例如：

String str = "abc";
 相当于：

char data[] = {'a', 'b', 'c'};
String str = new String(data);
// String
底层是靠字符数组实现的。

**使用步骤**
查看类
`java.lang.String` ：此类不需要导入。
查看构造方法

public String()
：初始化新创建的 `String`对象，以使其表示空字符序列。

public String(char[] value)
：通过当前参数中的字符数组来构造新的`String`。

public String(byte[] bytes)
：通过使用平台的默认字符集解码当前参数中的字节数组来构造新的

`String`

。

构造举例，代码如下：

//
无参构造

`String str = new String`

（）；

//
通过字符数组构造

char chars[] = {'a', 'b', 'c'};
String str2 = new String(chars);
//
通过字节数组构造

byte bytes[] = { 97, 98, 99 };
String str3 = new String(bytes);
**常用方法**
**判断功能的方法**

public boolean equals (Object anObject)
：将此字符串与指定对象进行比较。

public boolean equalsIgnoreCase (String anotherString)
：将此字符串与指定对象进行比较，忽略大小写。

方法演示，代码如下：

public class String_Demo01 {
public static void main(String[] args) {
//
创建字符串对象

String s1 = "hello";
String s2 = "hello";
String s3 = "HELLO";
// boolean equals(Object obj):
比较字符串的内容是否相同

System.out.println(s1.equals(s2)); // true
System.out.println(s1.equals(s3)); // false
System.out.println("
‐‐‐‐‐‐‐‐‐‐‐

");
//boolean equalsIgnoreCase(String str):
比较字符串的内容是否相同`,`忽略大小写

System.out.println(s1.equalsIgnoreCase(s2)); // true
System.out.println(s1.equalsIgnoreCase(s3)); // true
System.out.println("
‐‐‐‐‐‐‐‐‐‐‐

");
}
}
Object
是” 对象”的意思，也是一种引用类型。
作为参数类型，表示任意对象都可以传递到方法中。

**获取功能的方法**

public int length ()
：返回此字符串的长度。

public String concat (String str)
：将指定的字符串连接到该字符串的末尾。

public char charAt (int index)
：返回指定索引处的 `char`值。

public int indexOf (String str)
：返回指定子字符串第一次出现在该字符串内的索引。

public String substring (int beginIndex)
：返回一个子字符串，从`beginIndex`开始截取字符串到字符串结尾。
`public String substring (int beginIndex, int endIndex)` ：返回一个子字符串，从`beginIndex`到

`endIndex`

截取字符串。含`beginIndex`，不含`endIndex`。

**转换功能的方法**

public char[] toCharArray ()
：将此字符串转换为新的字符数组。

public byte[] getBytes ()
：使用平台的默认字符集将该 `String`编码转换为新的字节数组。

public String replace (CharSequence target, CharSequence replacement)
：将与`target`匹配字符串使用`replacement`字符串替换。
`CharSequence` 是一个接口，也是一种引用类型。作为参数类型，可以把`String`对象传递到方法中。

**分割功能的方法**

public String[] split(String regex)
：将此字符串按照给定的`regex`（规则）拆分为字符串数组。
方法演示，代码如下：

public class String_Demo03 {
public static void main(String[] args) {
//
创建字符串对象

String s = "aa|bb|cc";
String[] strArray = s.split("|"); // ["aa","bb","cc"]
for(int x = 0; x \< strArray.length; x++) {
System.out.println(strArray[x]); // aa bb cc
}
}
}

`String`**类的练习**
**统计字符个数**
键盘录入一个字符，统计字符串中大小写字母及数字字符个数

public class StringTest2 {
public static void main(String[] args) {
//
键盘录入一个字符串数据

Scanner sc = new Scanner(System.in);
System.out.println("
请输入一个字符串数据：

");
String s = sc.nextLine();
//
定义三个统计变量，初始化值都是

0
int bigCount = 0;
int smallCount = 0;
int numberCount = 0;
//
遍历字符串，得到每一个字符

for(int x=0; x\<s.length(); x++) {
char ch = s.charAt(x);
//
拿字符进行判断

if(ch\>='A'&&ch\<='Z') {
bigCount++;
}else if(ch\>='a'&&ch\<='z') {
smallCount++;
}else if(ch\>='0'&&ch\<='9') {
numberCount++;
}else {
System.out.println("
该字符

`"+ch+"`

非法

");
}
}
//
输出结果

System.out.println("
大写字符：

`"+bigCount+"`

个

");
System.out.println("
小写字符：

`"+smallCount+"`

个

");
System.out.println("
数字字符：

`"+numberCount+"`

个

");
}
}
```
