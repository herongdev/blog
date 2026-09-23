import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Iterator迭代器","description":"","frontmatter":{"title":"Iterator迭代器","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator迭代器.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator迭代器.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator迭代器.md"};function t(c,l,r,o,u,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**## 2.1 Iterator****接口**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在程序开发中，经常需要遍历集合中的所有元素。针对这种需求，JDK专门提供了一个接口`java.util.Iterator`。`Iterator`接口也是Java集合中的一员，但它与`Collection`、`Map`接口有所不同，`Collection`接口与`Map`接口主要用于存储元素，而`Iterator`主要用于迭代访问（即遍历）`Collection`中的元素，因此`Iterator`对象也被称为迭代器。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"想要遍历Collection集合，那么就要获取该集合迭代器完成迭代操作，下面介绍一下获取迭代器的方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public Iterator iterator()`: 获取集合对应的迭代器，用来遍历集合中的元素的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面介绍一下迭代的概念：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* ********迭代********：即Collection集合元素的通用获取方式。在取元素之前先要判断集合中有没有元素，如果有，就把这个元素取出来，继续在判断，如果还有就再取出出来。一直把集合中的所有元素全部取出。这种取出方式专业术语称为迭代。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator接口的常用方法如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public E next()`:返回迭代的下一个元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public boolean hasNext()`:如果仍有元素可以迭代，则返回 true。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"接下来我们通过案例学习如何使用Iterator迭代集合中元素：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class IteratorDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用多态方式 创建对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection\\<String\\> coll = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 添加元素到集合")]),s(`
`),n("span",{class:"line"},[n("span",null,'coll.add("串串星人");')]),s(`
`),n("span",{class:"line"},[n("span",null,'coll.add("吐槽星人");')]),s(`
`),n("span",{class:"line"},[n("span",null,'coll.add("汪星人");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//遍历")]),s(`
`),n("span",{class:"line"},[n("span",null,"//使用迭代器 遍历 每个集合对象都有自己的迭代器")]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator\\<String\\> it = coll.iterator();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 泛型指的是 迭代出 元素的数据类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"while(it.hasNext()){ //判断是否有迭代元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"String s = it.next();//获取迭代出的元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(s);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> tips:：在进行集合元素取出时，如果集合中已经没有元素了，还继续使用迭代器的next方法，将会发生java.util.NoSuchElementException没有集合元素的错误。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**## 2.2** **迭代器的实现原理**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们在之前案例已经完成了Iterator遍历集合的整个过程。当遍历集合时，首先通过调用t集合的iterator()方法获得迭代器对象，然后使用hashNext()方法判断集合中是否存在下一个元素，如果存在，则调用next()方法将元素取出，否则说明已到达了集合末尾，停止遍历元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator迭代器对象在遍历集合时，内部采用指针的方式来跟踪集合中的元素，为了让初学者能更好地理解迭代器的工作原理，接下来通过一个图例来演示Iterator对象迭代元素的过程：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在调用Iterator的next方法之前，迭代器的索引位于第一个元素之前，不指向任何元素，当第一次调用迭代器的next方法后，迭代器的索引会向后移动一位，指向第一个元素并将该元素返回，当再次调用next方法时，迭代器的索引会指向第二个元素并将该元素返回，依此类推，直到hasNext方法返回false，表示到达了集合的末尾，终止对元素的遍历。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"## 2.3 增强for")]),s(`
`),n("span",{class:"line"},[n("span",null,"增强for循环(也称for each循环)是****JDK1.5****以后出来的一个高级for循环，专门用来遍历数组和集合的。它的内部原理其实是个Iterator迭代器，所以在遍历的过程中，不能对集合中的元素进行增删操作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"for(元素的数据类型 变量 : Collection集合or数组){")]),s(`
`),n("span",{class:"line"},[n("span",null,"  //写操作代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"它用于遍历Collection和数组。通常只进行遍历元素，不要在遍历的过程中对集合元素进行增删操作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**####** **练习****1****：遍历数组**")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class NBForDemo1 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        int[] arr = {3,5,6,87};")]),s(`
`),n("span",{class:"line"},[n("span",null," //使用增强for遍历数组")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for(int a : arr){//a代表数组中的每个元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"            System.out.println(a);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"**####** **练习****2:****遍历集合**")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class NBFor {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Collection\\<String\\> coll = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("小河神");')]),s(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("老河神");')]),s(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("神婆");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    //使用增强for遍历")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for(String s :coll){//接收变量s代表 代表被遍历到的集合元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"        System.out.println(s);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> tips: 新for循环必须有被遍历的目标。目标只能是Collection或者是数组。新式for仅仅作为遍历操作出现。")])])])])],-1)])])}const g=a(i,[["render",t]]);export{v as __pageData,g as default};
