import{_ as a,o as i,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"1.Collections","description":"","frontmatter":{"title":"1.Collections","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/1.Collections.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/1.Collections.md"}'),e={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/1.Collections.md"};function t(c,l,o,u,r,d){return i(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"集合是java中提供的一种容器，可以用来存储多个数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**集合和数组区别**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 数组的长度是固定的。集合的长度是可变的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 数组中存储的是同一类型的元素，可以存储基本数据类型值。集合存储的都是对象。而且对象的类型可以不一致。在开发中一般当对象多的时候，使用集合进行存储。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"集合按照其存储结构可以分为两大类，分别是单列集合`java.util.Collection`和双列集合`java.util.Map`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Collection**：单列集合类的根接口，用于存储一系列符合某种规则的元素，它有两个重要的子接口，分别是`java.util.List`和`java.util.Set`。其中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"`List`的特点是元素有序、元素可重复。")]),s(`
`),n("span",{class:"line"},[n("span",null,"`Set`的特点是元素无序，而且不可重复。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`List`接口的主要实现类有`java.util.ArrayList`和`java.util.LinkedList`，")]),s(`
`),n("span",{class:"line"},[n("span",null,"`Set`接口的主要实现类有`java.util.HashSet`和`java.util.TreeSet`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection 常用功能")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection是所有单列集合的父接口，定义了单列集合(List和Set)通用的一些方法，这些方法可用于操作所有的单列集合。方法如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public boolean add(E e)`： 把给定的对象添加到当前集合中 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* public static \\<T\\> boolean addAll(Collection\\<T\\> c, T... elements) :往集合中添加一些元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public boolean remove(E e)`: 把给定的对象在当前集合中删除。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public void clear()` :清空集合中所有的元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public boolean contains(E e)`: 判断当前集合中是否包含给定的对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public boolean isEmpty()`: 判断当前集合是否为空。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public int size()`: 返回集合中元素的个数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* `public Object[] toArray()`: 把集合中的元素，存储到数组中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* public static void shuffle(List\\<?\\> list) 打乱顺序 :打乱集合顺序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* public static \\<T\\> void sort(List\\<T\\> list) :将集合中元素按照默认规则排序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"*  public static \\<T\\> void sort(List\\<T\\> list，Comparator\\<? super T\\> ) :将集合中元素按照指定规则排序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class CollectionsDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<Integer\\> list = new ArrayList\\<Integer\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//原来写法")]),s(`
`),n("span",{class:"line"},[n("span",null,"//list.add(12);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//list.add(14);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//list.add(15);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//list.add(1000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//采用工具类 完成 往集合中添加元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collections.addAll(list, 5, 222, 1，2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//排序方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collections.sort(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"[5, 222, 1, 2]")]),s(`
`),n("span",{class:"line"},[n("span",null,"[1, 2, 5, 222]")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼public static \\<T\\> void sort(List\\<T\\> list) :将集合中元素按照默认规则排序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果存储的是字符串类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class CollectionsDemo2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> list = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("cba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("aba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("sba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("nba");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//排序方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collections.sort(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"[aba, cba, nba, sba]")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们使用的是默认的规则完成字符串的排序，那么默认规则是怎么定义出来的呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"在JAVA中提供了两种比较实现的方式，一种是比较死板的采用 java.lang.Comparable 接口去实现，一种是灵活的当我需要做排序的时候在去选择的java.util.Comparator 接口完成。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"那么我们采用的 public static \\<T\\> void sort(List\\<T\\> list) 这个方法完成的排序，实际上要求了被排序的类型需要实现Comparable接口完成比较的功能，在String类型上如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public final class String implements java.io.Serializable, Comparable\\<String\\>, CharSequence {")]),s(`
`),n("span",{class:"line"},[n("span",null,"String类实现了这个接口，并完成了比较规则的定义，但是这样就把这种规则写死了，那比如我想要字符串按照第一个字符降序排列，那么这样就要修改String的源代码，这是不可能的了，那么这个时候我们可以使用public static \\<T\\> void sort(List\\<T\\> list，Comparator\\<? super T\\> ) :将集合中元素按照指定规则排序，这个里面就涉及到了Comparator这个接口，位于位于java.util包下，排序是comparator能实现的功能之一,该接口代表一个比较器，比较器具有可比性！顾名思义就是做排序的，通俗地讲需要比较两个对象谁排在前谁排在后，那么比较的方法就是：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int compare(String o1, String o2) ：比较其两个参数的顺序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"两个对象比较的结果有三种：大于，等于，小于。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果要按照升序排序， 则o1 小于o2，返回（负数），相等返回0，01大于02返回（正数）")]),s(`
`),n("span",{class:"line"},[n("span",null," 如果要按照降序排序，则o1 小于o2，返回（正数），相等返回0，01大于02返回（负数）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"操作如下:")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class CollectionsDemo3 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<String\\> list = new ArrayList\\<String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("cba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("aba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("sba");')]),s(`
`),n("span",{class:"line"},[n("span",null,'list.add("nba");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//排序方法 按照第一个单词的降序")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collections.sort(list, new Comparator\\<String\\>() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int compare(String o1, String o2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return o2.charAt(0) ‐ o1.charAt(0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(list);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"[sba, nba, cba, aba]")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**简述****Comparable****和****Comparator****两个接口的区别。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Comparable**：强行对实现它的每个类的对象进行整体排序。这种排序被称为类的自然排序，类的compareTo方法被称为它的自然比较方法。只能在类中实现compareTo()一次，不能经常修改类的代码实现自己想要的排序。实现此接口的对象列表（和数组）可以通过Collections.sort（和Arrays.sort）进行自动排序，对象可以用作有序映射中的键或有序集合中的元素，无需指定比较器。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Comparator**强行对某个对象进行整体排序。可以将Comparator 传递给sort方法（如Collections.sort或Arrays.sort），从而允许在排序顺序上实现精确控制。还可以使用Comparator来控制某些数据结构（如有序set或有序映射）的顺序，或者为那些没有自然顺序的对象collection提供排序。")])])])])],-1)])])}const v=a(e,[["render",t]]);export{m as __pageData,v as default};
