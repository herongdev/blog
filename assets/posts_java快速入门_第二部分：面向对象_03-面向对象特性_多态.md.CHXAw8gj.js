import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"多态","description":"","frontmatter":{"title":"多态","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/多态.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/多态.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/多态.md"};function c(u,l,t,o,d,r){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"多态是继封装、继承之后，面向对象的第三大特性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"生活中，比如跑的动作，小猫、小狗和大象，跑起来是不一样的。再比如飞的动作，昆虫、鸟类和飞机，飞起来也是不一样的。可见，同一行为，通过不同的事物，可以体现出来的不同的形态。多态，描述的就是这样的状态。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**多态**： 是指同一行为，具有多个不同表现形式。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**前提【重点】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 继承或者实现【二选一】")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 方法的重写【意义体现：不重写，无意义】")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 父类引用指向子类对象【格式体现】")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**多态的体现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"父类类型 变量名 = new 子类对象；")]),s(`
`),n("span",{class:"line"},[n("span",null,"变量名.方法名();")]),s(`
`),n("span",{class:"line"},[n("span",null,"父类类型：指子类对象继承的父类类型，或者实现的父接口类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Fu f = new Zi();")]),s(`
`),n("span",{class:"line"},[n("span",null,"f.method();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**当使用多态方式调用方法时，首先检查父类中是否有该方法，如果没有，则编译错误；如果有，执行的是子类重写后方法。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义父类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract class Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义子类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Cat extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃鱼");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Dog extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃骨头");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 多态形式，创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a1 = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用的是 Cat 的 eat")]),s(`
`),n("span",{class:"line"},[n("span",null,"a1.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 多态形式，创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a2 = new Dog();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用的是 Dog 的 eat")]),s(`
`),n("span",{class:"line"},[n("span",null,"a2.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**多态的好处**")]),s(`
`),n("span",{class:"line"},[n("span",null,"实际开发的过程中，父类类型作为方法形式参数，传递子类对象给方法，进行方法的调用，更能体现出多态的扩展性与便利。代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义父类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract class Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义子类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Cat extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃鱼");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Dog extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃骨头");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 多态形式，创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Cat c = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"Dog d = new Dog();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用showCatEat")]),s(`
`),n("span",{class:"line"},[n("span",null,"showCatEat(c);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用showDogEat")]),s(`
`),n("span",{class:"line"},[n("span",null,"showDogEat(d);")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"以上两个方法, 均可以被showAnimalEat(Animal a)方法所替代")]),s(`
`),n("span",{class:"line"},[n("span",null,"而执行效果一致")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"showAnimalEat(c);")]),s(`
`),n("span",{class:"line"},[n("span",null,"showAnimalEat(d);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void showCatEat (Cat c){")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void showDogEat (Dog d){")]),s(`
`),n("span",{class:"line"},[n("span",null,"d.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void showAnimalEat (Animal a){")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"由于多态特性的支持，showAnimalEat方法的Animal类型，是Cat和Dog的父类类型，父类类型接收子类对象，当然可以把Cat对象和Dog对象，传递给方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当eat方法执行时，多态规定，执行的是子类重写的方法，那么效果自然与showCatEat、showDogEat方法一致，所以showAnimalEat完全可以替代以上两方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"不仅仅是替代，在扩展性方面，无论之后再多的子类出现，我们都不需要编写showXxxEat方法了，直接使用showAnimalEat都可以完成。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以，多态的好处，体现在，可以使程序编写的更简单，并有良好的扩展。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**引用类型转换**")]),s(`
`),n("span",{class:"line"},[n("span",null,"多态的转型分为向上转型与向下转型两种：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**向上转型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**向上转型**：多态本身是子类类型向父类类型向上转换的过程，这个过程是默认的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"当父类引用指向一个子类对象时，便是向上转型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"父类类型 变量名 = new 子类类型();")]),s(`
`),n("span",{class:"line"},[n("span",null,"如：Animal a = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**向下转型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**向下转型**：父类类型向子类类型向下转换的过程，这个过程是强制的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"一个已经向上转型的子类对象，将父类引用转为子类引用，可以使用强制类型转换的格式，便是向下转型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"子类类型 变量名 = (子类类型) 父类变量名;")]),s(`
`),n("span",{class:"line"},[n("span",null,"如:Cat c =(Cat) a;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**为什么要转型**")]),s(`
`),n("span",{class:"line"},[n("span",null,'当使用多态方式调用方法时，首先检查父类中是否有该方法，如果没有，则编译错误。也就是说，**不能调用**子类拥有，而父类没有的方法。编译都错误，更别说运行了。这也是多态给我们带来的一点"小麻烦"。')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以，想要调用子类特有的方法，必须做向下转型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"转型演示，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"abstract class Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"abstract void eat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Cat extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃鱼");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void catchMouse() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("抓老鼠");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Dog extends Animal {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void eat() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("吃骨头");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void watchHouse() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("看家");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向上转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.eat(); // 调用的是 Cat 的 eat")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向下转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Cat c = (Cat)a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.catchMouse(); // 调用的是 Cat 的 catchMouse")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**转型的异常**")]),s(`
`),n("span",{class:"line"},[n("span",null,"转型的过程中，一不小心就会遇到这样的问题，请看如下代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向上转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.eat(); // 调用的是 Cat 的 eat")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向下转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Dog d = (Dog)a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"d.watchHouse(); // 调用的是 Dog 的 watchHouse 【运行报错】")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这段代码可以通过编译，但是运行时，却报出了 ClassCastException ，类型转换异常！这是因为，明明创建了Cat类型对象，运行时，当然不能转换成Dog对象的。这两个类型并没有任何继承关系，不符合类型转换的定义。")]),s(`
`),n("span",{class:"line"},[n("span",null,"为了避免ClassCastException的发生，Java提供了 instanceof 关键字，给引用变量做类型的校验，格式如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"变量名 instanceof 数据类型")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果变量属于该数据类型，返回true。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果变量不属于该数据类型，返回false。")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以，转换前，我们最好先做一个判断，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向上转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Animal a = new Cat();")]),s(`
`),n("span",{class:"line"},[n("span",null,"a.eat(); // 调用的是 Cat 的 eat")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 向下转型")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (a instanceof Cat){")]),s(`
`),n("span",{class:"line"},[n("span",null,"Cat c = (Cat)a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.catchMouse(); // 调用的是 Cat 的 catchMouse")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else if (a instanceof Dog){")]),s(`
`),n("span",{class:"line"},[n("span",null,"Dog d = (Dog)a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"d.watchHouse(); // 调用的是 Dog 的 watchHouse")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例分析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"进行描述笔记本类，实现笔记本使用USB鼠标、USB键盘")]),s(`
`),n("span",{class:"line"},[n("span",null,"USB接口，包含开启功能、关闭功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"笔记本类，包含运行功能、关机功能、使用USB设备功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"鼠标类，要实现USB接口，并具备点击的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"键盘类，要实现USB接口，具备敲击的方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"**3.3** **案例实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义USB接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface USB {")]),s(`
`),n("span",{class:"line"},[n("span",null,"void open();// 开启功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"void close();// 关闭功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义鼠标类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Mouse implements USB {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void open() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("鼠标开启，红灯闪一闪");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void close() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("鼠标关闭，红灯熄灭");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void click(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("鼠标单击");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义键盘类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class KeyBoard implements USB {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void open() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("键盘开启，绿灯闪一闪");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void close() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("键盘关闭，绿灯熄灭");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void type(){")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("键盘打字");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义笔记本类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Laptop {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本开启运行功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void run() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("笔记本运行");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本使用usb设备，这时当笔记本对象调用这个功能时，必须给其传递一个符合USB规则的USB设备")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void useUSB(USB usb) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 判断是否有USB设备")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (usb != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"usb.open();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 类型转换,调用特有方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"if(usb instanceof Mouse){")]),s(`
`),n("span",{class:"line"},[n("span",null,"Mouse m = （Mouse）usb；")]),s(`
`),n("span",{class:"line"},[n("span",null,"m.click();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}else if (usb instanceof KeyBoard){")]),s(`
`),n("span",{class:"line"},[n("span",null,"KeyBoard kb = (KeyBoard)usb;")]),s(`
`),n("span",{class:"line"},[n("span",null,"kb.type();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"usb.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void shutDown() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("笔记本关闭");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"测试类，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Test {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建笔记本实体对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Laptop lt = new Laptop();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本开启")]),s(`
`),n("span",{class:"line"},[n("span",null,"lt.run();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建鼠标实体对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Usb u = new Mouse();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本使用鼠标")]),s(`
`),n("span",{class:"line"},[n("span",null,"lt.useUSB(u);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建键盘实体对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"KeyBoard kb = new KeyBoard();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本使用键盘")]),s(`
`),n("span",{class:"line"},[n("span",null,"lt.useUSB(kb);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 笔记本关闭")]),s(`
`),n("span",{class:"line"},[n("span",null,"lt.shutDown();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(i,[["render",c]]);export{b as __pageData,v as default};
