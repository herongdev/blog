import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Set接口","description":"","frontmatter":{"title":"Set接口","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Set接口.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Set接口.md"}'),t={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/Set接口.md"};function i(u,a,c,d,S,r){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"java.util.Set 与 Collection 接口中的方法基本一致，没有进行功能上的扩充，只是比 Collection 接口更加严格了。 Set 接口中元素无序，并且都会以某种规则保证存入的元素不出现重复。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set 集合有多个子类，这里我们介绍其中的 java.util.HashSet 、 java.util.LinkedHashSet 这两个集合。")]),s(`
`),n("span",{class:"line"},[n("span",null,"tips:Set集合取出元素的方式可以采用：迭代器、增强for。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**HashSet****集合介绍**")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.util.HashSet 是 Set 接口的一个实现类，它所存储的元素是不可重复的，并且元素都是无序的(即存取顺序不一致)。 java.util.HashSet 底层的实现其实是一个 java.util.HashMap 支持。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashSet 是根据对象的哈希值来确定元素在集合中的存储位置，因此具有良好的存取和查找性能。保证元素唯一性的方式依赖于： hashCode 与 equals 方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们先来使用一下Set集合存储，看下现象，再进行原理的讲解:")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class HashSetDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建 Set集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashSet\\<String\\> set = new HashSet\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//添加元素")]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add(new String("cba"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("abc");')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("bac");')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("cba");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//遍历")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (String name : set) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果如下，说明集合中不能存储重复元素：")]),s(`
`),n("span",{class:"line"},[n("span",null,"cba")]),s(`
`),n("span",{class:"line"},[n("span",null,"abc")]),s(`
`),n("span",{class:"line"},[n("span",null,"bac")]),s(`
`),n("span",{class:"line"},[n("span",null,'tips:根据结果我们发现字符串"cba"只存储了一个，也就是说重复的元素set集合不存储。')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**HashSet****集合存储数据的结构（哈希表）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"什么是哈希表呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"在**JDK1.8**之前，哈希表底层采用数组+链表实现，即使用链表处理冲突，同一hash值的链表都存储在一个链表里。")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是当位于一个桶中的元素较多，即hash值相等的元素较多时，通过key值依次查找的效率较低。而JDK1.8中，哈希表存储采用数组+链表+红黑树实现，当链表长度超过阈值（8）时，将链表转换为红黑树，这样大大减少了查找时间。")]),s(`
`),n("span",{class:"line"},[n("span",null,"简单的来说，哈希表是由数组+链表+红黑树（JDK1.8增加了红黑树部分）实现的，如下图所示。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 看到这张图就有人要问了，这个是怎么存储的呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 为了方便大家的理解我们结合一个存储流程图来说明一下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"总而言之，**JDK1.8**引入红黑树大程度优化了HashMap的性能，那么对于我们来讲保证HashSet集合元素的唯一， 其实就是根据对象的hashCode和equals方法来决定的。如果我们往集合中存放自定义的对象，那么保证其唯一， 就必须复写hashCode和equals方法建立属于当前对象的比较方式。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**HashSet****存储自定义类型元素**")]),s(`
`),n("span",{class:"line"},[n("span",null,"给HashSet中存放自定义类型元素时，需要重写对象中的hashCode和equals方法，建立自己的比较方式，才能保证HashSet集合中的对象唯一")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建自定义Student类")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Student {")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"private int age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Student() {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Student(String name, int age) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String getName() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setName(String name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int getAge() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setAge(int age) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean equals(Object o) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (this == o)")]),s(`
`),n("span",{class:"line"},[n("span",null,"return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (o == null || getClass() != o.getClass())")]),s(`
`),n("span",{class:"line"},[n("span",null,"return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Student student = (Student) o;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return age == student.age &&")]),s(`
`),n("span",{class:"line"},[n("span",null,"Objects.equals(name, student.name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int hashCode() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return Objects.hash(name, age);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class HashSetDemo2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建集合对象 该集合中存储 Student类型对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashSet\\<Student\\> stuSet = new HashSet\\<Student\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//存储")]),s(`
`),n("span",{class:"line"},[n("span",null,'Student stu = new Student("于谦", 43);')]),s(`
`),n("span",{class:"line"},[n("span",null,"stuSet.add(stu);")]),s(`
`),n("span",{class:"line"},[n("span",null,'stuSet.add(new Student("郭德纲", 44));')]),s(`
`),n("span",{class:"line"},[n("span",null,'stuSet.add(new Student("于谦", 43));')]),s(`
`),n("span",{class:"line"},[n("span",null,'stuSet.add(new Student("郭麒麟", 23));')]),s(`
`),n("span",{class:"line"},[n("span",null,"stuSet.add(stu);")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (Student stu2 : stuSet) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(stu2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"执行结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Student [name=郭德纲, age=44]")]),s(`
`),n("span",{class:"line"},[n("span",null,"Student [name=于谦, age=43]")]),s(`
`),n("span",{class:"line"},[n("span",null,"Student [name=郭麒麟, age=23]")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**LinkedHashSet**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们知道HashSet保证元素唯一，可是元素存放进去是没有顺序的，那么我们要保证有序，怎么办呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"在HashSet下面有一个子类 java.util.LinkedHashSet ，它是链表和哈希表组合的一个数据存储结构。")]),s(`
`),n("span",{class:"line"},[n("span",null,"演示代码如下:")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class LinkedHashSetDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<String\\> set = new LinkedHashSet\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("bbb");')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("aaa");')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("abc");')]),s(`
`),n("span",{class:"line"},[n("span",null,'set.add("bbc");')]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator\\<String\\> it = set.iterator();")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (it.hasNext()) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(it.next());")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"bbb")]),s(`
`),n("span",{class:"line"},[n("span",null,"aaa")]),s(`
`),n("span",{class:"line"},[n("span",null,"abc")]),s(`
`),n("span",{class:"line"},[n("span",null,"bbc")])])])])],-1)])])}const g=l(t,[["render",i]]);export{h as __pageData,g as default};
