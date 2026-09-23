import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"Iterator","description":"","frontmatter":{"title":"Iterator","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator.md"}'),p={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/Iterator.md"};function i(r,a,o,c,u,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"接口Iterator提供了一种以定义好的顺序遍历一系列元素的标准方式。虽然不能在数据结构外使用这个接口，但了解Iterator接口的工作原理将有助于您理解其他Java数据结构。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口Iterator定义的三个方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean hasNext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Object next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void remove();")]),s(`
`),n("span",{class:"line"},[n("span",null,"这些方法都没有任何代码，因为接口不提供实现。实现接口的类必须提供定义方法的代码。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法hasNext()定义了结构是否还包含其他元素。可调用该方法来查看是否可以断续遍历结构。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法next()获得结构中的下一个元素。如果没有更多的元素，next()将引发NoSuchElementException异常。为避免产生这种异常，应结合使用hasNext()和next()来确保还有元素可检索。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的whild循环使用这两种方法来遍历一个名为users的数据结构对象，该对象实现了接口Iterator:")]),s(`
`),n("span",{class:"line"},[n("span",null,"while(users.hasNext()){")]),s(`
`),n("span",{class:"line"},[n("span",null," Object ob = users.next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(ob);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法next()总是返回一个Object对象，您可以将其转换为数据结构存储的类对象。下面的例子将其转换为String对象：")]),s(`
`),n("span",{class:"line"},[n("span",null,"while (users.hasNext()){")]),s(`
`),n("span",{class:"line"},[n("span",null,"String ob = (String) users.next();")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(ob);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：由于Iterator是接口，所以不能将经用作数据结构；相反，您在实现了接口的数据结构中使用Iterator定义的方法。这为很多Java标准数据结构提供了一致的接口，使得它们学习和使用起来更容易。")])])])])],-1)])])}const v=l(p,[["render",i]]);export{x as __pageData,v as default};
