import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"抽象类","description":"","frontmatter":{"title":"抽象类","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/抽象类.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/抽象类.md"}'),c={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/抽象类.md"};function i(t,a,u,r,o,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"父类中的方法，被它的子类们重写，子类各自的实现都不尽相同。那么父类的方法声明和方法主体，只有声明还有意义，而方法主体则没有存在的意义了。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**抽象方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 abstract 关键字修饰方法，该方法就成了抽象方法，抽象方法只包含一个方法名，而没有方法体。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 abstract 返回值类型 方法名 (参数列表)；")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码举例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void run()；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**抽象类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果一个类包含抽象方法，那么该类必须是抽象类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"abstract class 类名字 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码举例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract class Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void run()；")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**抽象的使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"继承抽象类的子类**必须重写父类所有的抽象方法**。否则，该子类也必须声明为抽象类。最终，必须有子类实现该父类的抽象方法，否则，从最初的父类到最终的子类都不能创建对象，失去意义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码举例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Cat extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void run (){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("小猫在墙头走~~~")；')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class CatTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Cat c = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用run方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"小猫在墙头走~~~")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时的方法重写，是子类对父类抽象方法的完成实现，我们将这种方法重写的操作，也叫做**实现方法**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意事项**")]),s(`
`),n("span",{class:"line"},[n("span",null,"关于抽象类的使用，以下为语法上要注意的细节。")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 抽象类**不能创建对象**，如果创建，编译无法通过而报错。只能创建其非抽象子类的对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"理解：假设创建了抽象类的对象，调用抽象的方法，而抽象方法没有具体的方法体，没有意义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 抽象类中，可以有构造方法，是供子类创建对象时，初始化父类成员使用的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"理解：子类的构造方法中，有默认的super()，需要访问父类构造方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 抽象类中，不一定包含抽象方法，但是有抽象方法的类必定是抽象类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"理解：未包含抽象方法的抽象类，目的就是不想让调用者创建该类对象，通常用于某些特殊的类结构设计。")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 抽象类的子类，必须重写抽象父类中**所有的**抽象方法，否则，编译无法通过而报错。除非该子类也是抽象类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"理解：假设不重写所有抽象方法，则类中可能包含抽象方法。那么创建对象后，调用抽象的方法，没有意义。")])])])])],-1)])])}const m=l(c,[["render",i]]);export{v as __pageData,m as default};
