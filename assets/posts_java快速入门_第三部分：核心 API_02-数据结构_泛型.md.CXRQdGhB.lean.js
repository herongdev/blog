import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"泛型","description":"","frontmatter":{"title":"泛型","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/泛型.md"};function c(u,l,t,r,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**## 3.1** **泛型概述**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在前面学习集合时，我们都知道集合中是可以存放任意对象的，只要把对象存储集合后，那么这时他们都会被提升成Object类型。当我们在取出每一个对象，并且进行相应的操作，这时必须采用类型转换。")]),s(`
`),n("span",{class:"line"},[n("span",null,"大家观察下面代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class GenericDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Collection coll = new ArrayList();")]),s(`
`),n("span",{class:"line"},[n("span",null,'        coll.add("abc");')]),s(`
`),n("span",{class:"line"},[n("span",null,'        coll.add("itcast");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        coll.add(5);//由于集合没有做任何限定，任何类型都可以给其中存放")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Iterator it = coll.iterator();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        while(it.hasNext()){")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //需要打印每个字符串的长度,就要把迭代出来的对象转成String类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"            String str = (String) it.next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            System.out.println(str.length());")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"程序在运行时发生了问题****java.lang.ClassCastException****。 为什么会发生类型转换异常呢？ 我们来分析下：由于集合中什么类型的元素都可以存储。导致取出时强转引发运行时 ClassCastException。 怎么来解决这个问题呢？ Collection虽然可以存储各种对象，但实际上通常Collection只存储同一类型对象。例如都是存储字符串对象。因此在JDK5之后，新增了********泛型********(****Generic****)语法，让你在设计API时可以指定类或方法支持泛型，这样我们使用API的时候也变得更为简洁，并得到了编译时期的语法检查。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* ********泛型********：可以在类或方法中预支地使用未知的类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> tips:一般在创建对象时，将未知的类型确定具体的类型。当没有指定泛型时，默认类型为Object类型。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 3.2** **使用泛型的好处**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上一节只是讲解了泛型的引入，那么泛型带来了哪些好处呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 将运行时期的ClassCastException，转移到了编译时期变成了编译失败。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 避免了类型强转的麻烦。")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过我们如下代码体验一下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class GenericDemo2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<String\\> list = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("abc");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("itcast");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// list.add(5);//当集合明确类型后，存放类型不一致就会编译报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 集合已经明确具体存放的元素类型，那么在使用迭代器的时候，迭代器也同样会知道具体遍历元素类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator\\<String\\> it = list.iterator();")]),s(`
`),n("span",{class:"line"},[n("span",null,"while(it.hasNext()){")]),s(`
`),n("span",{class:"line"},[n("span",null,"String str = it.next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//当使用Iterator\\<String\\>控制元素类型后，就不需要强转了。获取到的元素直接就是String类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(str.length());")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> tips:泛型是数据类型的一部分，我们将类名与泛型合并一起看做数据类型。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 3.3** **泛型的定义与使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们在集合中会大量使用到泛型，这里来完整地学习泛型知识。")]),s(`
`),n("span",{class:"line"},[n("span",null,"泛型，用来灵活地将数据类型应用到不同的类、方法、接口当中。将数据类型作为参数进行传递。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**###** **定义和使用含有泛型的类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 class 类名\\<代表泛型的变量\\> { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，API中的ArrayList集合：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ArrayList\\<E\\>{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean add(E e){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"public E get(int index){ }")]),s(`
`),n("span",{class:"line"},[n("span",null," ....")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用泛型： 即什么时候确定泛型。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在创建对象的时候确定泛型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，`ArrayList\\<String\\> list = new ArrayList\\<String\\>();`")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时，变量E的值就是String类型,那么我们的类型就可以理解为：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ArrayList\\<String\\>{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean add(String e){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String get(int index){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"再例如，`ArrayList\\<Integer\\> list = new ArrayList\\<Integer\\>();`")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时，变量E的值就是Integer类型,那么我们的类型就可以理解为：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ArrayList\\<Integer\\> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean add(Integer e) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Integer get(int index) { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"举例自定义泛型类")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MyGenericClass\\<MVP\\> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //没有MVP类型，在这里代表 未知的一种数据类型 未来传递什么就是什么类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"    private MVP mvp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setMVP(MVP mvp) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.mvp = mvp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public MVP getMVP() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return mvp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用:")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class GenericClassDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public static void main(String[] args) {        ")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建一个泛型为String的类")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyGenericClass\\<String\\> my = new MyGenericClass\\<String\\>();   ")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用setMVP")]),s(`
`),n("span",{class:"line"},[n("span",null,'my.setMVP("大胡子登登");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 调用getMVP")]),s(`
`),n("span",{class:"line"},[n("span",null,"String mvp = my.getMVP();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(mvp);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建一个泛型为Integer的类")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyGenericClass\\<Integer\\> my2 = new MyGenericClass\\<Integer\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"my2.setMVP(123);     ")]),s(`
`),n("span",{class:"line"},[n("span",null,"Integer mvp2 = my2.getMVP();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"**###** **含有泛型的方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 \\<代表泛型的变量\\> 返回值类型 方法名(参数){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MyGenericMethod {  ")]),s(`
`),n("span",{class:"line"},[n("span",null,"public \\<MVP\\> void show(MVP mvp) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    System.out.println(mvp.getClass());")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public \\<MVP\\> MVP show2(MVP mvp) {   ")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return mvp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用格式：********调用方法时，确定泛型的类型********")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class GenericMethodDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyGenericMethod mm = new MyGenericMethod();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 演示看方法提示")]),s(`
`),n("span",{class:"line"},[n("span",null,'mm.show("aaa");')]),s(`
`),n("span",{class:"line"},[n("span",null,"mm.show(123);")]),s(`
`),n("span",{class:"line"},[n("span",null,"mm.show(12.45);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"**###** **含有泛型的接口**")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 interface接口名\\<代表泛型的变量\\> { }")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如，")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface MyGenericInterface\\<E\\>{")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public abstract void add(E e);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public abstract E getE();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"****1****、定义类时确定泛型的类型********")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MyImp1 implements MyGenericInterface\\<String\\> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void add(String e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 省略...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public String getE() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时，泛型E的值就是String类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"****2****、始终不确定泛型的类型，直到创建对象时，确定泛型的类型********")]),s(`
`),n("span",{class:"line"},[n("span",null,"例如")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MyImp2\\<E\\> implements MyGenericInterface\\<E\\> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public void add(E e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 省略...")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public E getE() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"确定泛型：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class GenericInterface {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"MyImp2\\<String\\> my = new MyImp2\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'my.add("aa");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 3.4** **泛型通配符**")]),s(`
`),n("span",{class:"line"},[n("span",null,"当使用泛型类或者接口时，传递的数据中，泛型类型不确定，可以通过通配符\\<?\\>表示。但是一旦使用泛型的通配符后，只能使用Object类中的共性方法，集合中元素自身方法无法使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**####** **通配符基本使用**")]),s(`
`),n("span",{class:"line"},[n("span",null,"泛型的通配符:********不知道使用什么类型来接收的时候****,****此时可以使用****?,?****表示未知通配符。********")]),s(`
`),n("span",{class:"line"},[n("span",null,"此时只能接受数据,不能往该集合中存储数据。")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<Intger\\> list1 = new ArrayList\\<Integer\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<String\\> list2 = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void getElement(Collection\\<?\\> coll){}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//？代表可以接收任意类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> tips:泛型不存在继承关系 Collection\\<Object\\> list = new ArrayList\\<String\\>();这种是错误的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**####** **通配符高级使用****----****受限泛型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"之前设置泛型的时候，实际上是可以任意设置的，只要是类就可以设置。但是在JAVA的泛型中可以指定一个泛型的********上限********和********下限********。")]),s(`
`),n("span",{class:"line"},[n("span",null,"********泛型的上限********：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* ********格式********： `类型名称 \\<? extends 类 \\> 对象名称`")]),s(`
`),n("span",{class:"line"},[n("span",null,"* ********意义********： `只能接收该类型及其子类`")]),s(`
`),n("span",{class:"line"},[n("span",null,"********泛型的下限********：")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ********格式********： `类型名称 \\<? super 类 \\> 对象名称`")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ********意义********： `只能接收该类型及其父类型`")]),s(`
`),n("span",{class:"line"},[n("span",null,"比如：现已知Object类，String 类，Number类，Integer类，其中Number是Integer的父类")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<Integer\\> list1 = new ArrayList\\<Integer\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<String\\> list2 = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<Number\\> list3 = new ArrayList\\<Number\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<Object\\> list4 = new ArrayList\\<Object\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list2);//报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement(list4);//报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement2(list1);//报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement2(list2);//报错")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement2(list3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"getElement2(list4);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 泛型的上限：此时的泛型?，必须是Number类型或者Number类型的子类")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void getElement1(Collection\\<? extends Number\\> coll){}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 泛型的下限：此时的泛型?，必须是Number类型或者Number类型的父类")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void getElement2(Collection\\<? super Number\\> coll){}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**#** **第四章** **集合综合案例**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 4.1** **案例介绍**")]),s(`
`),n("span",{class:"line"},[n("span",null,"按照斗地主的规则，完成洗牌发牌的动作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"具体规则：")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用54张牌打乱顺序,三个玩家参与游戏，三人交替摸牌，每人17张牌，最后三张留作底牌。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 4.2** **案例分析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 准备牌：")]),s(`
`),n("span",{class:"line"},[n("span",null,"牌可以设计为一个ArrayList\\<String\\>,每个字符串为一张牌。")]),s(`
`),n("span",{class:"line"},[n("span",null,"每张牌由花色数字两部分组成，我们可以使用花色集合与数字集合嵌套迭代完成每张牌的组装。")]),s(`
`),n("span",{class:"line"},[n("span",null,"牌由Collections类的shuffle方法进行随机排序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 发牌")]),s(`
`),n("span",{class:"line"},[n("span",null,"将每个人以及底牌设计为ArrayList\\<String\\>,将最后3张牌直接存放于底牌，剩余牌通过对3取模依次发牌。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 看牌")]),s(`
`),n("span",{class:"line"},[n("span",null,"直接打印每个集合。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 4.3** **代码实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"import java.util.ArrayList;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import java.util.Collections;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Poker {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 1: 准备牌操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.1 创建牌盒 将来存储牌面的")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> pokerBox = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.2 创建花色集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> colors = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.3 创建数字集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> numbers = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.4 分别给花色 以及 数字集合添加元素")]),s(`
`),n("span",{class:"line"},[n("span",null,'colors.add("♥");')]),s(`
`),n("span",{class:"line"},[n("span",null,'colors.add("♦");')]),s(`
`),n("span",{class:"line"},[n("span",null,'colors.add("♠");')]),s(`
`),n("span",{class:"line"},[n("span",null,'colors.add("♣");')]),s(`
`),n("span",{class:"line"},[n("span",null,"for(int i = 2;i\\<=10;i++){")]),s(`
`),n("span",{class:"line"},[n("span",null,'numbers.add(i+"");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'numbers.add("J");')]),s(`
`),n("span",{class:"line"},[n("span",null,'numbers.add("Q");')]),s(`
`),n("span",{class:"line"},[n("span",null,'numbers.add("K");')]),s(`
`),n("span",{class:"line"},[n("span",null,'numbers.add("A");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.5 创造牌 拼接牌操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 拿出每一个花色 然后跟每一个数字 进行结合 存储到牌盒中")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (String color : colors) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//color每一个花色")]),s(`
`),n("span",{class:"line"},[n("span",null,"//遍历数字集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"for(String number : numbers){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//结合")]),s(`
`),n("span",{class:"line"},[n("span",null,"String card = color+number;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//存储到牌盒中")]),s(`
`),n("span",{class:"line"},[n("span",null,"pokerBox.add(card);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1.6大王小王")]),s(`
`),n("span",{class:"line"},[n("span",null,'pokerBox.add("小☺");')]),s(`
`),n("span",{class:"line"},[n("span",null,'pokerBox.add("大☠"); ')]),s(`
`),n("span",{class:"line"},[n("span",null,"// System.out.println(pokerBox);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//洗牌 是不是就是将 牌盒中 牌的索引打乱")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Collections类 工具类 都是 静态方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"// shuffer方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* static void shuffle(List\\<?\\> list)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 使用默认随机源对指定列表进行置换。")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"//2:洗牌")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collections.shuffle(pokerBox);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3 发牌")]),s(`
`),n("span",{class:"line"},[n("span",null,"//3.1 创建 三个 玩家集合 创建一个底牌集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> player1 = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> player2 = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> player3 = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> dipai = new ArrayList\\<String\\>();  ")]),s(`
`),n("span",{class:"line"},[n("span",null,"//遍历 牌盒 必须知道索引")]),s(`
`),n("span",{class:"line"},[n("span",null,"for(int i = 0;i\\<pokerBox.size();i++){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//获取 牌面")]),s(`
`),n("span",{class:"line"},[n("span",null,"String card = pokerBox.get(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//留出三张底牌 存到 底牌集合中")]),s(`
`),n("span",{class:"line"},[n("span",null,"if(i\\>=51){//存到底牌集合中")]),s(`
`),n("span",{class:"line"},[n("span",null,"dipai.add(card);")]),s(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//玩家1 %3 ==0")]),s(`
`),n("span",{class:"line"},[n("span",null,"if(i%3==0){")]),s(`
`),n("span",{class:"line"},[n("span",null,"  player1.add(card);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}else if(i%3==1){//玩家2")]),s(`
`),n("span",{class:"line"},[n("span",null,"  player2.add(card);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}else{//玩家3")]),s(`
`),n("span",{class:"line"},[n("span",null,"  player3.add(card);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//看看")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("令狐冲："+player1);')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("田伯光："+player2);')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("绿竹翁："+player3);')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("底牌："+dipai);')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")])])])])],-1)])])}const y=a(i,[["render",c]]);export{m as __pageData,y as default};
