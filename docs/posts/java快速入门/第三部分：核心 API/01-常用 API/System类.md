---
title: System类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
`` `java.lang.System` ``类中提供了大量的静态方法，可以获取与系统相关的信息或系统级操作，在`System`类的`API`文档中，常用的方法有：

- `public static long currentTimeMillis()`
：返回以毫秒为单位的当前时间。

- `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)`
：将数组中指定的数据拷贝到另一个数组中。

`## 3.1 currentTimeMillis`**方法**
实际上，`currentTimeMillis`方法就是 获取当前系统时间与`1970`年`01`月`01`日`00:00`点之间的毫秒差值

java
import java.util.Date;
public class SystemDemo {
public static void main(String[] args) {
 //
`获取当前时间毫秒值`
System.out.println(System.currentTimeMillis());
// 1516090531144
}
}
`###`

**练习**
验证`for`循环打印数字`1-9999`所需要使用的时间（毫秒）

~~~java
public class SystemTest1 {
public static void main(String[] args) {
long start = System.currentTimeMillis();
for (int i = 0; i \< 10000; i++) {
System.out.println(i);
}
long end = System.currentTimeMillis();
System.out.println("
共耗时毫秒：

" + (end - start));
}
}
~~~
## 3.2 arraycopy
**方法**

* `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)`
：将数组中指定的数据拷贝到另一个数组中。
数组的拷贝动作是系统级的，性能很高。
System.arraycopy方法具有5个参数，含义分别为：
`|` 参数序号 `|` 参数名称 `|` 参数类型 `|` 参数含义

- |
- | ---- | ------- | ------ | ---------- |
- | 1 | src | Object |

源数组

- |
- | 2 | srcPos | int |

源数组索引起始位置

- |
- | 3 | dest | Object |

目标数组

- |
- | 4 | destPos | int |

目标数组索引起始位置

- |
- | 5 | length | int |

复制元素个数

- |
- ###

**练习**
将`src`数组中前`3`个元素，复制到`dest`数组的前`3`个位置上复制元素前：`src`数组元素

`[1,2,3,4,5]`

，`dest`数组元素

`[6,7,8,9,10]`

复制元素后：`src`数组元素

`[1,2,3,4,5]`

，`dest`数组元素

`[1,2,3,9,10]`java
import java.util.Arrays;
public class Demo11SystemArrayCopy {
public static void main(String[] args) {
int[] src = new int[]{1,2,3,4,5};
int[] dest = new int[]{6,7,8,9,10};
System.arraycopy( src, 0, dest, 0, 3);
/*
- 代码运行后：两个数组中的元素发生了变化
- `src`数组元素

[1,2,3,4,5]
dest
`数组元素`
[1,2,3,9,10]
*/
}
}
