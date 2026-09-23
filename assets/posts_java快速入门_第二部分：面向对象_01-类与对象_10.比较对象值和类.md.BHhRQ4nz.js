import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"10.比较对象值和类","description":"","frontmatter":{"title":"10.比较对象值和类","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/10.比较对象值和类.md","filePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/10.比较对象值和类.md"}'),t={name:"posts/java快速入门/第二部分：面向对象/01-类与对象/10.比较对象值和类.md"};function i(c,a,o,u,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"除了强制类型转换外，还常常需要对对象执行下列3种操作：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"比较对象；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"判断对象所属的类；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"判断对象是否是特定类的实例；")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**比较对象**")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于对值进行比较的运算符：等于、不等于、小于等只能用于基本类型，而不能用于对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果将非基本类型值作为操作数，Java编译器将报错。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于这一规则，一种例外情况是用于相等关系的运算符：==（等于）和!=（不等）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于对象时，它们不是检查一个对象的值是否与另一个对象相同，而是判断运算符两边引用的是否是同一个对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要比较类的对象，并使结果有意义，必须在类中实现特殊的方法，并调用这些方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"比如String类。两个不同的String对象可能包含相同的值。然而如果使用==运算符来比较它们，则它们将被认为不相等。虽然它们的内容一致，但它们不是同一个对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"要检查两个String对象的值是否相同，可使用其equals()方法。该方法检测字符串中的每个字符，如果两个字符串的的值相同，则返回true。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"字符串字面量在Java中是经过优化的：如果使用字面量创建一个字符串，再用相同的字符内容创建一个字符串时，Java将返回原来的String对象。这样两个字符串将是同一个对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**判断对象所属的类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法getClass()是在Object类中定义的，因此所有Java对象都包含它。这个方法返回一个Class对象，指出了对象所属的类。对象的getName()返回一个表示类名的字符串。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"另一种检测方式是instanceof运算符，它使用两个操作数，左边为对象的引用，右边是类名。该表达式返回一个布尔值：如果该对象是这种类或其子类的实例，为true，否则为false。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"instanceof 运算符还可用于接口。如果对象实现了某个接口，则使用运算符instanceof测试该接口时，结果将为true。")])])])])],-1)])])}const g=l(t,[["render",i]]);export{v as __pageData,g as default};
