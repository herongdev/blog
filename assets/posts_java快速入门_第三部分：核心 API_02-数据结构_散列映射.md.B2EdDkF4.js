import{_ as l,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"散列映射","description":"","frontmatter":{"title":"散列映射","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/散列映射.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/散列映射.md"}'),c={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/散列映射.md"};function i(t,a,o,h,u,r){return e(),p("div",null,[...a[0]||(a[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"类HashMap实现了接口Map，并提供了键映射数据结构的完整实现。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"HashMap（散列映射）让您能够基于某种类型的键值来存储数据，并具有由负载系数定义的效率。负载系数是一个0.0~1.0的浮点数，它决定了散列映射如何以及何时为更多的元素分配空间。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"与链表一样，散列映射也有容量（分配的内存量）。如果长度超过了容量和负载系数的乘积，散列映射将通过重新散列（rehash)来增加容量。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"负载系数超接近1.0，内存使用效率超高，但代价是查找元素的时间越长。同样，负载系数超接近0.0，查找的效率超高，但浪费的内存超多。决定散列映射的负载系数时，取决于将如何使用散列映射以及看重的是性能还是内存的使用效率。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"**如何创建：**")]),n(`
`),s("span",{class:"line"},[s("span",null,"有三种方式来创建HashMap（散列映射）：")]),n(`
`),s("span",{class:"line"},[s("span",null,"第一个构造函数创建默认的散列映射，其初始容量为16，负载系数为0.75：")]),n(`
`),s("span",{class:"line"},[s("span",null,"HashMap hash = new HashMap();")]),n(`
`),s("span",{class:"line"},[s("span",null,"第二个构造函数创建具有指定初始容量且负载系数为0.75的散列映射：")]),n(`
`),s("span",{class:"line"},[s("span",null,"HashMap hash = new Hash(20);")]),n(`
`),s("span",{class:"line"},[s("span",null,"第三个构造函数创建具有指定初始容量和负载系数的散列映射：")]),n(`
`),s("span",{class:"line"},[s("span",null,"HashMap hash = new HashMap(20,0.5F);")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"**常用方法：**")]),n(`
`),s("span",{class:"line"},[s("span",null,"类HashMap实现了Map定义的所有抽象方法。它还实现了其他一些方法，用于实现散列映射特有的功能，如：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"clear()方法，它删除散列映射中的所有值和元素：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"hash.clear();")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"方法contains(Object)检查散列映射是否包含指定的对象：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Rectangle box = new Rectangle(0,0,5,5);")]),n(`
`),s("span",{class:"line"},[s("span",null,"boolean isThere = hash.containsValue(box);")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"方法containsKey(String)在散列映射中查找指定的键值：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,'boolean isThere = hash.containsKey("Small");')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"**用处：**")]),n(`
`),s("span",{class:"line"},[s("span",null,"散列映射的实际用处在于，它能够表示那些根据值进行查找或引用时太耗时的数据。换句话说，处理复杂数据时，如果使用键值比对数据对象本身进行比较来访问这些数据的效率更高，则散列映射将很有用。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"这种键值是通过计算得到的，被称为散列码（hash code)，它们唯一地标识了HashMap（散列映射）中的每个元素。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"在Java类库中，大量地使用了这种计算和使用散列码以存储和引用对象的技术。所有类的超类Object定义了一个hashCode()方法，在大多数标准的Java类中都覆盖了这个方法。定义了方法hashCode()的类都能够通过散列映射进行高效地存储和访问。要被散列，类还必须方法equals()，该方法定义了一种判断两个对象是否相等的方式。equals()方法通常对类中定义的所有成员变量进行直接比较。")])])])])],-1)])])}const _=l(c,[["render",i]]);export{v as __pageData,_ as default};
