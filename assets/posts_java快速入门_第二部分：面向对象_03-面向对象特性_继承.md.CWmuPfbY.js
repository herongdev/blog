import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"继承","description":"","frontmatter":{"title":"继承","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/继承.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/继承.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/继承.md"};function c(u,l,t,r,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**继承**：就是子类继承父类的**属性**和**行为**。子类可以直接访问父类中的**非私有**的属性和行为。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**好处**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 提高**代码的复用性**。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 类与类之间产生了关系，是**多态的前提**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**继承的格式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过 extends 关键字，可以声明一个子类继承另外一个父类，定义格式如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 父类 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class 子类 extends 父类 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"继承对成员变量的影响")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员变量不重名**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果子类父类中出现**不重名**的成员变量，这时的访问是**没有影响的**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员变量重名**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果子类父类中出现**重名**的成员变量，这时的访问是**有影响的**。代码如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"子父类中出现了同名的成员变量时，在子类中需要访问父类中非私有成员变量时，需要使用 super 关键字，修饰父类成员变量，类似于之前学过的 this 。 使用格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"super.父类成员变量名")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：Fu 类中的成员变量是非私有的，子类中可以直接访问。若Fu 类中的成员变量私有了，子类是不能 直接访问的。通常编码时，我们遵循封装的原则，使用private修饰成员变量，那么如何访问父类的私有成员变量呢？对！可以在父类中提供公共的getXxx方法和setXxx方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**继承对成员方法的影响**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员方法不重名**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果子类父类中出现**不重名**的成员方法，这时的调用是**没有影响的**。对象调用方法时，会先在子类中查找有没有对应的方法，若子类中存在就会执行子类中的方法，若子类中不存在就会执行父类中相应的方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员方法重名——重写****(Override)**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果子类父类中出现**重名**的成员方法，这时的访问是一种特殊情况，叫做**方法重写** (Override)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**方法重写** ：子类中出现与父类一模一样的方法时（返回值类型，方法名和参数列表都相同），会出现覆盖效果，也称为重写或者复写。**声明不变，重新实现**。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**重写的应用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"子类可以根据需要，定义特定于自己的行为。既沿袭了父类的功能名称，又根据子类的需要重新实现父类方法，从而进行扩展增强。比如新的手机增加来电显示头像的功能，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Phone {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void sendMessage(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("发短信");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void call(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("打电话");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void showNum(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("来电显示号码");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"//智能手机类")]),s(`
`),n("span",{class:"line"},[n("span",null,"class NewPhone extends Phone {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//重写父类的来电显示号码功能，并增加自己的显示姓名和图片功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void showNum(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//调用父类已经存在的功能使用super")]),s(`
`),n("span",{class:"line"},[n("span",null,"super.showNum();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//增加自己特有显示姓名和图片功能")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("显示来电姓名");')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("显示头像");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ExtendsDemo06 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建子类对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"NewPhone np = new NewPhone()；")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用父类继承而来的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"np.call();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用子类重写的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"np.showNum();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：这里重写时，用到super.父类成员方法，表示调用父类的成员方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**注意事项**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 子类方法覆盖父类方法，必须要保证权限大于等于父类权限。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**继承对构造方法的影响**")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造方法的定义格式和作用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 构造方法的名字是与类名一致的。所以子类是无法继承父类构造方法的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 构造方法的作用是初始化成员变量的。所以子类的初始化过程中，必须先执行父类的初始化动作。子类的构造方法中默认有一个 super() ，表示调用父类的构造方法，父类成员变量初始化后，才可以给子类使用。代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Fu {")]),s(`
`),n("span",{class:"line"},[n("span",null,"private int n;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fu(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("Fu()");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Zi extends Fu {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Zi(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"// super（），调用父类构造方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"super();")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("Zi（）");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ExtendsDemo07{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main (String args[]){")]),s(`
`),n("span",{class:"line"},[n("span",null,"Zi zi = new Zi();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fu（）")]),s(`
`),n("span",{class:"line"},[n("span",null,"Zi（）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**super****和****this**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**父类空间优先于子类对象产生**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在每次创建子类对象时，先初始化父类空间，再创建其子类对象本身。目的在于子类对象中包含了其对应的父类空间，便可以包含其父类的成员，如果父类成员非private修饰，则子类可以随意使用父类成员。代码体现在子类的构造方法调用时，一定先调用父类的构造方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**super****和****this****的含义**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**super** ：代表父类的**存储空间标识**(可以理解为父亲的引用)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**this** ：代表**当前对象的引用**(谁调用就代表谁)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**super****和****this****的用法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 访问成员")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.成员变量 ‐‐ 本类的")]),s(`
`),n("span",{class:"line"},[n("span",null,"super.成员变量 ‐‐ 父类的")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.成员方法名() ‐‐ 本类的")]),s(`
`),n("span",{class:"line"},[n("span",null,"super.成员方法名() ‐‐ 父类的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 访问构造方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"this(...) ‐‐ 本类的构造方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"super(...) ‐‐ 父类的构造方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"子类的每个构造方法中均有默认的super()，调用父类的空参构造。手动调用父类构造会覆盖默认的super()。")]),s(`
`),n("span",{class:"line"},[n("span",null,"super() 和 this() 都必须是在构造方法的第一行，所以不能同时出现。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**继承的特点**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. Java只支持单继承，不支持多继承。")]),s(`
`),n("span",{class:"line"},[n("span",null,"//一个类只能有一个父类，不可以有多个父类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class C extends A{} //ok")]),s(`
`),n("span",{class:"line"},[n("span",null,"class C extends A，B... //error")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. Java支持多层继承(继承体系)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class A{}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class B extends A{}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class C extends B{}")]),s(`
`),n("span",{class:"line"},[n("span",null,"顶层父类是Object类。所有的类默认继承Object，作为父类。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 子类和父类是一种相对的概念。")])])])])],-1)])])}const v=a(i,[["render",c]]);export{m as __pageData,v as default};
