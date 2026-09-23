import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"内部类","description":"","frontmatter":{"title":"内部类","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/内部类.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/内部类.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/内部类.md"};function c(u,l,t,o,r,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"将一个类A定义在另一个类B里面，里面的那个类A就称为**内部类**，B则称为**外部类**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员内部类** ：定义在**类中方法外**的类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 外部类 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 内部类{")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在描述事物时，若一个事物内部还包含其他事物，就可以使用内部类这种结构。比如，汽车类 Car 中包含发动机类 Engine ，这时， Engine 就可以使用内部类来描述，定义在成员位置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码举例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Car { //外部类")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Engine { //内部类")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**访问特点**")]),s(`
`),n("span",{class:"line"},[n("span",null,"内部类可以直接访问外部类的成员，包括私有成员。")]),s(`
`),n("span",{class:"line"},[n("span",null,"外部类要访问内部类的成员，必须要建立内部类的对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**创建内部类对象格式：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"外部类名.内部类名 对象名 = new 外部类型().new 内部类型()；")]),s(`
`),n("span",{class:"line"},[n("span",null,"访问演示，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义类：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`定义测试类：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"内部类仍然是一个独立的类，在编译之后会内部类会被编译成独立的.class文件，但是前面冠以外部类的类名和$符号 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"比如，Person$Heart.class")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**匿名内部类【重点】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**匿名内部类** ：是内部类的简化写法。它的本质是一个带具体实现的父类或者父接口的匿名的**子类对象**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"开发中，最常用到的内部类就是匿名内部类了。以接口举例，当你使用一个接口时，似乎得做如下几步操作，")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 定义子类")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 重写接口中的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 调用重写后的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们的目的，最终只是为了调用方法，那么能不能简化一下，把以上四步合成一步呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"匿名内部类就是做这样的快捷方式。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**前提**")]),s(`
`),n("span",{class:"line"},[n("span",null,"匿名内部类必须**继承一个父类**或者**实现一个父接口**。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**格式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"new 父类名或者接口名(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 方法重写")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void method() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 执行语句")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"以接口为例，匿名内部类的使用，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract class FlyAble{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void fly();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建匿名内部类，并调用：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`通常在方法的形式参数是接口或者抽象类时，也可以将匿名内部类作为参数传递。代码如下：`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"以上两步，也可以简化为一步，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class InnerDemo3 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建匿名内部类,直接传递给showFly(FlyAble f)")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"showFly( new FlyAble(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void fly() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("我飞了~~~");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void showFly(FlyAble f) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"f.fly();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const f=a(i,[["render",c]]);export{b as __pageData,f as default};
