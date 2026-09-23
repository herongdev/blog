import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"2.数组原理内存图","description":"","frontmatter":{"title":"2.数组原理内存图","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Java基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第一部分：语言基础/02-数组/2.数组原理内存图.md","filePath":"posts/java快速入门/第一部分：语言基础/02-数组/2.数组原理内存图.md"}'),i={name:"posts/java快速入门/第一部分：语言基础/02-数组/2.数组原理内存图.md"};function c(t,a,r,u,o,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"内存是计算机中的重要原件，临时存储区域，作用是运行程序。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们编写的程序是存放在硬盘中的，硬盘中的程序是不会运行的，必须放进内存中才能运行，运行完毕后会清空内存。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Java虚拟机要运行程序，必须要对内存进行空间的分配和管理。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Java****虚拟机的内存划分**")]),s(`
`),n("span",{class:"line"},[n("span",null,"为了提高运算效率，就对空间进行了不同区域的划分，因为每一片区域都有特定的处理数据方式和内存管理方式。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**JVM****的内存划分：**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"|")]),s(`
`),n("span",{class:"line"},[n("span",null,"**区域名称**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**作用**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"寄存器")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"给CPU使用，和我们开发无关。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"本地方法栈")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"JVM在使用操作系统功能的时候使用，和我们开发无关。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法区")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"存储可以运行的class文件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"堆内存")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"存储对象或者数组，new来创建的，都存储在堆内存。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法栈")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法运行时使用的内存，比如main方法运行，进入方法栈中执行。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**数组在内存中的存储**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**一个数组内存图**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr = new int[3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr);//[I@5f150435")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null," 以上方法执行，输出的结果是`[I@5f150435`，这个是什么呢？是数组在内存中的地址。`new`出来的内容，都是在堆内存中存储的，而方法中的变量`arr`保存的是数组的地址。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**输出**`arr[0]`**，就会输出**`arr`**保存的内存地址中数组中**`0`**索引上的元素**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**两个数组内存图**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr = new int[3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr2 = new int[2];")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr2);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span",null,"**两个变量指向一个数组**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义数组，存储`3`个元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr = new int[3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")]),s(`
`),n("span",{class:"line"},[n("span",null,"数组索引进行赋值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr[0] = 5; arr[1] = 6; arr[2] = 7;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出`3`个索引上的元素值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr[0]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr[2]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义数组变量`arr2`，将`arr`的地址赋值给")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"arr2")]),s(`
`),n("span",{class:"line"},[n("span",null,"int[] arr2 = arr; arr2[1] = 9;")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(arr[1]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")])])])])],-1)])])}const _=l(i,[["render",c]]);export{v as __pageData,_ as default};
