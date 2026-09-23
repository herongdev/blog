import{_ as a,o as p,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"final","description":"","frontmatter":{"title":"final","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/final.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/final.md"}'),e={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/final.md"};function c(u,l,t,r,o,f){return p(),i("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Java提供了 final 关键字， 用于修饰**不可改变**内容。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**final**： 不可改变。可以用于修饰类、方法和变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"类：被修饰的类，不能被继承。")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法：被修饰的方法，不能被重写。")]),s(`
`),n("span",{class:"line"},[n("span",null,"变量：被修饰的变量，不能被重新赋值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**修饰类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"final class 类名 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**修饰方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 final 返回值类型 方法名(参数列表){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//方法体")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"重写被 final 修饰的方法，编译时就会报错。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**修饰变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. **局部变量——基本类型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"基本类型的局部变量，被final修饰后，只能赋值一次，不能再更改。代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FinalDemo1 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 声明变量，使用final修饰")]),s(`
`),n("span",{class:"line"},[n("span",null,"final int a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第一次赋值")]),s(`
`),n("span",{class:"line"},[n("span",null,"a = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第二次赋值")]),s(`
`),n("span",{class:"line"},[n("span",null,"a = 20; // 报错,不可重新赋值")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 声明变量，直接赋值，使用final修饰")]),s(`
`),n("span",{class:"line"},[n("span",null,"final int b = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 第二次赋值")]),s(`
`),n("span",{class:"line"},[n("span",null,"b = 20; // 报错,不可重新赋值")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"思考，如下两种写法，哪种可以通过编译？")]),s(`
`),n("span",{class:"line"},[n("span",null,"写法1：")]),s(`
`),n("span",{class:"line"},[n("span",null,"final int c = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< 10; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"c = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(c);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"写法2：")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< 10; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"final int c = i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(c);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"根据 final 的定义，写法1报错！写法2，为什么通过编译呢？因为每次循环，都是一次新的变量c。这也是大家需要注意的地方。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**局部变量——引用类型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"引用类型的局部变量，被final修饰后，只能指向一个对象，地址不能再更改。但是不影响对象内部的成员变量值的修改，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class FinalDemo2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建 User 对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"final User u = new User();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建 另一个 User对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"u = new User(); // 报错，指向了新的对象，地址值改变。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用setName方法")]),s(`
`),n("span",{class:"line"},[n("span",null,'u.setName("张三"); // 可以修改')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**成员变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"成员变量涉及到初始化的问题，初始化方式有两种，只能二选一：")]),s(`
`),n("span",{class:"line"},[n("span",null,"显示初始化；")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class User {")]),s(`
`),n("span",{class:"line"},[n("span",null,'final String USERNAME = "张三";')]),s(`
`),n("span",{class:"line"},[n("span",null,"private int age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构造方法初始化。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class User {")]),s(`
`),n("span",{class:"line"},[n("span",null,"final String USERNAME ;")]),s(`
`),n("span",{class:"line"},[n("span",null,"private int age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public User(String username, int age) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.USERNAME = username;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"被final修饰的常量名称，一般都有书写规范，所有字母都**大写**。")])])])])],-1)])])}const m=a(e,[["render",c]]);export{g as __pageData,m as default};
