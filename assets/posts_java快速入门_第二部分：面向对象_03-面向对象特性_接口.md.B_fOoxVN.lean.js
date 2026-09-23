import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"接口","description":"","frontmatter":{"title":"接口","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/接口.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/接口.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/接口.md"};function c(u,l,t,r,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接口，是Java语言中一种引用类型，是方法的集合，如果说类的内部封装了成员变量、构造方法和成员方法，那么接口的内部主要就是**封装了方法**，包含抽象方法（JDK 7及以前），默认方法和静态方法（JDK 8），私有方法 （JDK 9）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口的定义，它与定义类方式相似，但是使用 interface 关键字。它也会被编译成.class文件，但一定要明确它并不是类，而是另外一种引用数据类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"引用数据类型：数组，类，接口。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口的使用，它不能创建对象，但是可以被实现（ implements ，类似于被继承）。一个实现接口的类（可以看做是接口的子类），需要实现接口中所有的抽象方法，创建该类对象，就可以调用方法了，否则它必须是一个抽象类。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**定义格式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface 接口名称 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 抽象方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 默认方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 静态方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 私有方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**含有抽象方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"抽象方法：使用 abstract 关键字修饰，可以省略，没有方法体。该方法供子类实现使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface InterFaceName {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void method();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**含有默认方法和静态方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"默认方法：使用 default 修饰，不可省略，供子类调用或者子类重写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"静态方法：使用 static 修饰，供接口直接调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface InterFaceName {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void method() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 执行语句")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void method2() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 执行语句")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**含有私有方法和私有静态方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"私有方法：使用 private 修饰，供接口中的默认方法或者静态方法调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface InterFaceName {")]),s(`
`),n("span",{class:"line"},[n("span",null,"private void method() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 执行语句")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**实现的概述**")]),s(`
`),n("span",{class:"line"},[n("span",null,"类与接口的关系为实现关系，即**类实现接口**，该类可以称为接口的实现类，也可以称为接口的子类。实现的动作类似继承，格式相仿，只是关键字不同，实现使用 implements 关键字。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"非抽象子类实现接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 必须重写接口中所有抽象方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 继承了接口的默认方法，即可以直接调用，也可以重写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"实现格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 类名 implements 接口名 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 重写接口中抽象方法【必须】")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 重写接口中默认方法【可选】")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**抽象方法的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"必须全部实现，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义抽象方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void sleep();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义实现类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Animal implements LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃东西");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void sleep() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("晚上睡");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class InterfaceDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Animal();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用实现后的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.sleep();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"吃东西")]),s(`
`),n("span",{class:"line"},[n("span",null,"晚上睡")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**默认方法的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以继承，可以重写，二选一，但是只能通过实现类的对象来调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 继承默认方法，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void fly(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("天上飞");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义实现类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Animal implements LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 继承，什么都不用写，直接调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class InterfaceDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Animal();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用默认方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.fly();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"天上飞")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 重写默认方法，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void fly(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("天上飞");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义实现类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Animal implements LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void fly() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("自由自在的飞");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class InterfaceDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Animal();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用重写方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.fly();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"自由自在的飞")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**静态方法的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"静态与.class 文件相关，只能使用接口名调用，不可以通过实现类的类名或者实现类的对象调用，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void run(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("跑起来~~~");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义实现类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Animal implements LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 无法重写静态方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class InterfaceDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Animal.run();"),n("span",null," // 【错误】无法继承方法,也无法调用")]),s(`
`),n("span",{class:"line"},[n("span",null,"LiveAble.run(); //")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"跑起来~~~")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**私有方法的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"私有方法：只有默认方法可以调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"私有静态方法：默认方法和静态方法可以调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果一个接口中有多个默认方法，并且方法中有重复的内容，那么可以抽取出来，封装到私有方法中，供默认方法去调用。从设计的角度讲，私有的方法是对默认方法和静态方法的辅助。同学们在已学技术的基础上，可以自行测试。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface LiveAble {")]),s(`
`),n("span",{class:"line"},[n("span",null,"default void func(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"func1();")]),s(`
`),n("span",{class:"line"},[n("span",null,"func2();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"private void func1(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("跑起来~~~");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"private void func2(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("跑起来~~~");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**接口的多实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"之前学过，在继承体系中，一个类只能继承一个父类。而对于接口而言，一个类是可以实现多个接口的，这叫做接口的**多实现**。并且，一个类能继承一个父类，同时实现多个接口。")]),s(`
`),n("span",{class:"line"},[n("span",null,"实现格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 类名 [extends 父类名] implements 接口名1,接口名2,接口名3... {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 重写接口中抽象方法【必须】")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 重写接口中默认方法【不重名时可选】")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"[ ]： 表示可选操作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**抽象方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，有多个抽象方法时，实现类必须重写所有抽象方法**。如果抽象方法有重名的，只需要重写一次。**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**默认方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，有多个默认方法时，实现类都可继承使用。**如果默认方法有重名的，必须重写一次。**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**静态方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，存在同名的静态方法并不会冲突，原因是只能通过各自接口名访问静态方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**优先级的问题**")]),s(`
`),n("span",{class:"line"},[n("span",null,"当一个类，既继承一个父类，又实现若干个接口时，父类中的成员方法与接口中的默认方法重名，子类就近选择执行父类的成员方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**接口的多继承【了解】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个接口能继承另一个或者多个接口，这和类之间的继承比较相似。接口的继承使用 extends 关键字，子接口继承父接口的方法。**如果父接口中的默认方法有重名的，那么子接口需要重写一次。**代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义父接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface A {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void method(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("AAAAAAAAAAAAAAAAAAA");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface B {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void method(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("BBBBBBBBBBBBBBBBBBB");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义子接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface D extends A,B{")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public default void method() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("DDDDDDDDDDDDDD");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：")]),s(`
`),n("span",{class:"line"},[n("span",null,"子接口重写默认方法时，default关键字可以保留。")]),s(`
`),n("span",{class:"line"},[n("span",null,"子类重写默认方法时，default关键字不可以保留。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1.6** **其他成员特点**")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，无法定义成员变量，但是可以定义常量，其值不可以改变，默认使用public static final修饰。")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，没有构造方法，不能创建对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口中，没有静态代码块。")])])])])],-1)])])}const v=a(i,[["render",c]]);export{b as __pageData,v as default};
