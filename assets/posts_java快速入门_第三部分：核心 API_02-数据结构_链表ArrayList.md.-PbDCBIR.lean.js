import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"链表ArrayList","description":"","frontmatter":{"title":"链表ArrayList","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/链表ArrayList.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/链表ArrayList.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/链表ArrayList.md"};function t(r,a,c,o,u,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"类ArrayList是最流行的Java数据结构之一，它实现了可缩放的对象数组，比数组更灵活、更有用。由于类ArrayList负责根据需要改变长度，所以它必须根据元素的增加和删除决定缩放多少。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**如何创建：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"要创建ArrayList对象，可使用不接受任何参数的构造函数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList golfer = new ArrayList();")]),s(`
`),n("span",{class:"line"},[n("span",null,"该构造函数创建了一个不含任何元素的默认链表。所有链表刚创建时都为空。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"链表的长度（size)指的是它当前存储的元素数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"链表的容量（capacity)总是大于或等于其长度。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"创建指定容量的链表：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList golfer = new ArrayList(30)；")]),s(`
`),n("span",{class:"line"},[n("span",null,"将给该列表分配足够的内存，以支持30个元素。达到指定的容量后，链表将自动加长，增加的长度为初始容量的一半。因此加入第30个元素后，golfer的容量将增加到45。给链表分配额外的空间需要时间，还需要消耗内存，因此创建链表时，最好根据预期要使用的元素数指定其容量。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**常用方法：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"不能像数组那样使用方括号[]来访问链表中的元素，而必须使用ArrayList类的方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"add(Object)方法将元素加入到链表中，如下所示：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'golfer.add("Park");')]),s(`
`),n("span",{class:"line"},[n("span",null,`golfer.add('Lewis");`)]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可使用方法add(int,Object)和remove(int)分别将元素加入到指定位置以及删除指定位置的元素：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,`golfer.add(1,'"Kim");`)]),s(`
`),n("span",{class:"line"},[n("span",null,'golfer.add(0,"Thompson")')]),s(`
`),n("span",{class:"line"},[n("span",null,"golfer.remove(3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"第一个add()调用将一个元素加入到索引1指定的位置，即字符串Park和Lewis之间。第二个add()调用将一个元素插入到索引0指定的位置，即链表表头。原来的元素都向后移动一个位置，以容纳插入的字符串Thompson。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法removeElement()删除指定的元素:")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'golfer.remove("Pressel")；')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"lastElement()返回一个Object。ArrayList可用于存储各种类型的对象，同时必须将返回值转换为加入到链表中的类型，如下get方法一样。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法get()让您能够通过索引来检索链表中的元素，如下：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"String s1 = （String） golfer.get(0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"String s2 = (String) golfer.get(2);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以使用set()方法来修改指定的元素：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'golfer.set(1,"Pressel");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法clear()可以删除所有的元素：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"golfer.clear();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList类还提供了一些不通过索引来处理元素的方法。这些方法在链表中搜索特定的元素，其中第一个是方法contains(Object)，它检验链表是否包含指定的元素：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'boolean isThere = golfer.contains("Kerr");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"另一个搜索方法是indexOf()方法，它找出元素的索引：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'int I = golfer.indexOf("Ko");')]),s(`
`),n("span",{class:"line"},[n("span",null,"如果链表包含指定的元素，indexOf()方法将返回该元素的索引，否则返回-1。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**判断和操纵链表长度的方法：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"int size = golfer.size();")]),s(`
`),n("span",{class:"line"},[n("span",null,"链表有两个与长度相关的属性：长度和容量。长度指的是链表包含多少个元素，而容量是分配用来存储元素的内存量。容量总是大于或等于长度。可以使用方法trimToSize()来使容量与长度相等：")]),s(`
`),n("span",{class:"line"},[n("span",null,"golfer.trimToSize();")]),s(`
`),n("span",{class:"line"},[n("span",null,"==Java====类库还包含====Vector====类，这种数据结构的工作原理与链表很像。这个类是已摒弃的集合，这是因为====ArrayList====优于====Vector==")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**遍历数据结构**")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以使用iterator()，它返回一个Iterator，其中包含可供您遍历的元素列表：")]),s(`
`),n("span",{class:"line"},[n("span",null,"Iterator it = golfer.iterator();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以使用迭代器来依次遍历元素。这个例子可以使用接口Itterator定义的方法来处理列表it")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的for循环使用迭代器及其方法来遍历整个链表：")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (Iterator I = golfer.iterator(); i.hasNext();)")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name = (String) i.next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const m=l(i,[["render",t]]);export{f as __pageData,m as default};
