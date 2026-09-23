import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const w=JSON.parse('{"title":"IO异常的处理","description":"","frontmatter":{"title":"IO异常的处理","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/IO异常的处理.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/IO异常的处理.md"}'),c={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/IO异常的处理.md"};function i(u,l,r,t,o,f){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**JDK7****前处理**")]),s(`
`),n("span",{class:"line"},[n("span",null,"之前的入门练习，我们一直把异常抛出，而实际开发中并不能这样处理，建议使用 try...catch...finally 代码块，处理异常部分，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class HandleException1 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 声明变量")]),s(`
`),n("span",{class:"line"},[n("span",null,"FileWriter fw = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'fw = new FileWriter("fw.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据")]),s(`
`),n("span",{class:"line"},[n("span",null,'fw.write("黑马程序员"); //黑马程序员')]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (IOException e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.printStackTrace();")]),s(`
`),n("span",{class:"line"},[n("span",null,"} finally {")]),s(`
`),n("span",{class:"line"},[n("span",null,"try {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (fw != null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"fw.close();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (IOException e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.printStackTrace();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**JDK7****的处理****(****扩展知识点了解内容****)**")]),s(`
`),n("span",{class:"line"},[n("span",null,"还可以使用JDK7优化后的 try-with-resource 语句，该语句确保了每个资源在语句结束时关闭。所谓的资源（resource）是指在程序完成后，必须关闭的对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"try (创建流对象语句，如果多个,使用';'隔开) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 读写数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (IOException e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.printStackTrace();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**代码使用演示：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class HandleException2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'try ( FileWriter fw = new FileWriter("fw.txt"); ) {')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据")]),s(`
`),n("span",{class:"line"},[n("span",null,'fw.write("黑马程序员"); //黑马程序员')]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (IOException e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.printStackTrace();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**JDK9****的改进****(****扩展知识点了解内容****)**")]),s(`
`),n("span",{class:"line"},[n("span",null,"JDK9中 try-with-resource 的改进，对于**引入对象**的方式，支持的更加简洁。被引入的对象，同样可以自动关闭，无需手动close，我们来了解一下格式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"改进前格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 被final修饰的对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'final Resource resource1 = new Resource("resource1");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 普通对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'Resource resource2 = new Resource("resource2");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 引入方式：创建新的变量保存")]),s(`
`),n("span",{class:"line"},[n("span",null,"try (Resource r1 = resource1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Resource r2 = resource2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"改进后格式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 被final修饰的对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'final Resource resource1 = new Resource("resource1");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 普通对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'Resource resource2 = new Resource("resource2");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 引入方式：直接引入")]),s(`
`),n("span",{class:"line"},[n("span",null,"try (resource1; resource2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"改进后，代码使用演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class TryDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws IOException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'final FileReader fr = new FileReader("in.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,'FileWriter fw = new FileWriter("out.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 引入到try中")]),s(`
`),n("span",{class:"line"},[n("span",null," try (fr; fw) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义变量")]),s(`
`),n("span",{class:"line"},[n("span",null,"int b;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 读取数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"while ((b = fr.read())!=‐1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 写出数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"fw.write(b);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"} catch (IOException e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"e.printStackTrace();")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=a(c,[["render",i]]);export{w as __pageData,h as default};
