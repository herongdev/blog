import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"可变参数","description":"","frontmatter":{"title":"可变参数","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/可变参数.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/可变参数.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/可变参数.md"};function t(u,a,c,r,o,m){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在**JDK1.5**之后，如果我们定义一个方法需要接受多个参数，并且多个参数类型一致，我们可以对其简化成如下格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 返回值类型 方法名(参数类型... 形参名){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"其实这个书写完全等价与")]),s(`
`),n("span",{class:"line"},[n("span",null,"修饰符 返回值类型 方法名(参数类型[] 形参名){ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"只是后面这种定义，在调用时必须传递数组，而前者可以直接传递数据即可。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**JDK1.5**以后。出现了简化操作。**...** 用在参数上，称之为可变参数。同样是代表数组，但是在调用这个带有可变参数的方法时，不用创建数组(这就是简单之处)，直接将数组中的元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"作为实际参数进行传递，其实编译成的class文件，将这些元素先封装到一个数组中，在进行传递。这些动作都在编译.class文件时，自动完成了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ChangeArgs {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr = { 1, 4, 62, 431, 2 };")]),s(`
`),n("span",{class:"line"},[n("span",null,"int sum = getSum(arr);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(sum);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 6 7 2 12 2121")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 求 这几个元素和 6 7 2 12 2121")]),s(`
`),n("span",{class:"line"},[n("span",null,"int sum2 = getSum(6, 7, 2, 12, 2121);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(sum2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 完成数组 所有元素的求和 原始写法")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static int getSum(int[] arr){")]),s(`
`),n("span",{class:"line"},[n("span",null,"int sum = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for(int a : arr){")]),s(`
`),n("span",{class:"line"},[n("span",null,"sum += a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return sum;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"//可变参数写法")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static int getSum(int... arr) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"int sum = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int a : arr) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"sum += a;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return sum;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"tips: 上述add方法在同一个类中，只能存在一个。因为会发生调用的不确定性")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意：如果在方法书写时，这个方法拥有多参数，参数中包含可变参数，可变参数一定要写在参数列表的末尾位置。")])])])])],-1)])])}const v=l(i,[["render",t]]);export{g as __pageData,v as default};
