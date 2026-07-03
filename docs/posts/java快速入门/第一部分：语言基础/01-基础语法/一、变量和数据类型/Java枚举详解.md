---
title: Java枚举详解
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
枚举对应英文`(enumeration,`简写 `enum)`；

- 枚举是一组常量的集合；
- 枚举属于一种特殊的类，里面只包含一组有限的特定的对象；
- 不需要提供 `setXxxx()` 方法，因为枚举对象值通常为只读；
- 对枚举对象`/`属性使用 `static+final` 共同修饰；

`static+final` _只有修饰基本数据类型、_`String`_类型才不会加载类，修饰对象或者方法还是会加载类_
`final` _修饰对象_`(`_引用_`)`_只是保证引用的指向不变，但不能保证对象本身不变_

- 枚举对象名通常使用全部大写，与常量的命名规范一样；
- 枚举对象根据需要，也可以有多个属性；

自定义类实现枚举

- 将构造器私有化，目的是防止被`new`出对象
- 去掉 `setXxxx()` 方法，防止属性被修改
- 在`Season`内部，直接创建固定对象
- 对外暴露对象`(`通过为对象添加 `public static final` 修饰符`)`

public class Demo03 {
    public static void main(String[] args) {
        System.out.println(Season.AUTUMN);
        System.out.println(Season.SUMMER);
    }
}

class Season {
    private String name;
    private String desc;
    //
定义了四个对象
`//`加`final`是为了使引用不能被修改
`public static final Season SPRING = new Season("`春天`", "`温暖

");
    public static final Season WINTER = new Season("
冬天`", "`寒冷

");
    public static final Season SUMMER = new Season("
夏天`", "`炎热

");
    public static final Season AUTUMN = new Season("
秋天`", "`凉爽

");

    private Season(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }
 ​

    public String getName() {
        return name;
    }
    public String getDesc() {
        return desc;
    }
    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
使用`enum`关键字实现枚举

- 使用 `enum` 关键字代替 `class`；
- 常量对象名`(`实参列表`)`；
- `public static final Season2 SPRING = new Season2("`春天`", "`温暖`");` 等价于 `SPRING("`春天`", "`温暖`");`
- 如果有多个对象，需要使用 ，间隔；
- 如果使用 `enum` 关键字来实现枚举，要求将定义的常量对象写在最前面；

public class Demo04 {
    public static void main(String[] args) {
        System.out.println(Season2.SPRING);
        System.out.println(Season2.SUMMER);
    }
}

enum  Season2 {
    SPRING("
春天`", "`温暖`"),WINTER("`夏天`", "`炎热`"),SUMMER("`夏天`", "`炎热`"),AUTUMN("`秋天`", "`凉爽`");`
​

    private String name;
    private String desc;
 ​

    private Season2(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public String getName() {
        return name;
    }
    public String getDesc() {
        return desc;
    }

    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
 注意事项

- _当我们使用_`enum`_关键字开发一个枚举类时，默认会继承_`Enum`_类；而且该枚举类是一个_`final`_类_
- _如果使用无参构造器创建枚举对象，则可以省略小括号；_
- _当有多个枚举对象时，使用_ _，隔开，最后以一个分号结尾；_
- _枚举对象必须放在枚举类的行首；_

`enum`的常用方法
_使用关键字_`enum`_时，会隐式继承_`Enum`_类，这样就可以使用_`Enum`_类的相关方法_

- `toString()`：`Enum`类已经重写过了，返回的是当前对象名；子类可以重写该方法，用于返回对象的属性信息；
- `name()`：返回当前对象名`(`常量名`)`，子类中不能重写；
- `ordinal()`：返回当前对象的位置号，默认从`0`开始；
- `values()`：返回当前枚举类中所有的常量对象；
- `valueOf()`：将字符串转换成已有的枚举对象，要求字符串必须为已有的常量名，否则报异常！
- `compareTo()`：比较两个枚举常量的大小`(`编号`),`返回的结果是两个枚举常量的编号相减得到的数；

public class Demo05 {
    public static void main(String[] args) {
        Season2 autumn = Season2.AUTUMN;

        System.out.println(autumn.name());

        System.out.println(autumn.ordinal());

        Season2[] values = Season2.values();
        for (Season2 season : values) {
            System.out.println(season);
        }

        Season2 autumn1 = Season2.valueOf("AUTUMN");
        System.out.println("season1="+autumn1);
        System.out.println(autumn == autumn1);

        System.out.println(Season2.AUTUMN.compareTo(Season2.SUMMER));
    }
}
enum  Season2{
    SPRING("
春天`", "`温暖`"),WINTER("`冬天`", "`寒冷`"),SUMMER("`夏天`", "`炎热`"),AUTUMN("`秋天`", "`凉爽

");

    private String name;
    private String desc;

    private Season2(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }
    public String getName() {
        return name;
    }
    public String getDesc() {
        return desc;
    }
    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}

`enum`的使用细节

- _使用_`enum`_关键字创建的枚举类，就不能再继承其它类了，因为使用_`enum`_创建的枚举类会隐式的继承_`Enum`_类，而_`Java`_是单继承机制__；_
- _枚举类和普通类一样，可以实现接口；_

项目实践

package com.mincheng.organization.common;
import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
public enum ResultCode {

 SUCCESS(true),

 FAIL(false, 500, "
服务器出错

"),

 /*
参数错误：`1000 - 1999 */`
 

 /*
用户错误：`2000 - 2999 */`
 

 /*
接口异常：

3000 - 3999 */;

 private ResultCode(Boolean success) {

 this.success = success;
   `}`
 

 private ResultCode(Boolean success, Integer errorCode, String errorMessage) {

 this.success = success;

 this.errorCode = errorCode;

 this.errorMessage = errorMessage;
   `}`
 

 private Boolean success;

 private Integer errorCode;

 private String errorMessage;
}
- 先定义枚举对象
- 再定义构造函数或属性；
- 构造函数默认就是`private`，不必要加；
