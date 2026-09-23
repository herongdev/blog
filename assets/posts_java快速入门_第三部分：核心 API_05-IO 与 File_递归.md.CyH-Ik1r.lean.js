import{_ as a,o as p,c as i,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"递归","description":"","frontmatter":{"title":"递归","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/递归.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/递归.md"}'),e={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/递归.md"};function u(c,s,t,r,o,m){return p(),i("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**2.1** **概述**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**递归**：指在当前方法内调用自己的这种现象。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**递归的分类****:**")]),l(`
`),n("span",{class:"line"},[n("span",null,"递归分为两种，直接递归和间接递归。")]),l(`
`),n("span",{class:"line"},[n("span",null,"直接递归称为方法自身调用自己。")]),l(`
`),n("span",{class:"line"},[n("span",null,"间接递归可以A方法调用B方法，B方法调用C方法，C方法调用A方法。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**注意事项**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"递归一定要有条件限定，保证递归能够停止下来，否则会发生栈内存溢出。")]),l(`
`),n("span",{class:"line"},[n("span",null,"在递归中虽然有限定条件，但是递归次数不能太多。否则也会发生栈内存溢出。")]),l(`
`),n("span",{class:"line"},[n("span",null,"构造方法,禁止递归")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class Demo01DiGui {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// a();")]),l(`
`),n("span",{class:"line"},[n("span",null,"b(1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"* 3.构造方法,禁止递归")]),l(`
`),n("span",{class:"line"},[n("span",null,"* 编译报错:构造方法是创建对象使用的,不能让对象一直创建下去")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"public Demo01DiGui() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//Demo01DiGui();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"* 2.在递归中虽然有限定条件，但是递归次数不能太多。否则也会发生栈内存溢出。")]),l(`
`),n("span",{class:"line"},[n("span",null,"* 4993")]),l(`
`),n("span",{class:"line"},[n("span",null,'* Exception in thread "main" java.lang.StackOverflowError')]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"private static void b(int i) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(i);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//添加一个递归结束的条件,i==5000的时候结束//添加一个递归结束的条件,i==5000的时候结束")]),l(`
`),n("span",{class:"line"},[n("span",null,"if(i==5000){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return;//结束方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"b(++i);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,'* 1.递归一定要有条件限定，保证递归能够停止下来，否则会发生栈内存溢出。 Exception in thread "main"')]),l(`
`),n("span",{class:"line"},[n("span",null,"* java.lang.StackOverflowError")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"private static void a() {")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("a方法");')]),l(`
`),n("span",{class:"line"},[n("span",null,"a();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2.2** **递归累加求和**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**计算****1 ~ n****的和**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析**：num的累和 = num + (num-1)的累和，所以可以把累和的操作定义成一个方法，递归调用。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**实现代码**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class DiGuiDemo {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//计算1~num的和，使用递归完成")]),l(`
`),n("span",{class:"line"},[n("span",null,"int num = 5;")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 调用求和的方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"int sum = getSum(num);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 输出结果")]),l(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(sum);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"通过递归算法实现.")]),l(`
`),n("span",{class:"line"},[n("span",null,"参数列表:int")]),l(`
`),n("span",{class:"line"},[n("span",null,"返回值类型: int")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static int getSum(int num) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"num为1时,方法返回1,")]),l(`
`),n("span",{class:"line"},[n("span",null,"相当于是方法的出口,num总有是1的情况")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"if(num == 1){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"num不为1时,方法返回 num +(num‐1)的累和")]),l(`
`),n("span",{class:"line"},[n("span",null,"递归调用getSum方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"return num + getSum(num‐1);return num + getSum(num‐1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码执行图解**")]),l(`
`),n("span",{class:"line"},[n("span",null,"小贴士：递归一定要有条件限定，保证递归能够停止下来，次数不要太多，否则会发生栈内存溢出。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**2.3** **递归求阶乘**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**阶乘**：所有小于及等于该数的正整数的积。")]),l(`
`),n("span",{class:"line"},[n("span",null,"n的阶乘：n! = n * (n‐1) *...* 3 * 2 * 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析**：这与累和类似,只不过换成了乘法运算，学员可以自己练习，需要注意阶乘值符合int类型的范围。")]),l(`
`),n("span",{class:"line"},[n("span",null,"推理得出：n! = n * (n‐1)!")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码实现**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class DiGuiDemo {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//计算n的阶乘，使用递归完成")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"int n = 3;")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 调用求阶乘的方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"int value = getValue(n);")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 输出结果**2.4** **递归打印多级目录**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析**：多级目录的打印，就是当目录的嵌套。遍历之前，无从知道到底有多少级目录，所以我们还是要使用递归实")]),l(`
`),n("span",{class:"line"},[n("span",null,"现。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码实现**：")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("阶乘为:"+ value);')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"通过递归算法实现.")]),l(`
`),n("span",{class:"line"},[n("span",null,"参数列表:int")]),l(`
`),n("span",{class:"line"},[n("span",null,"返回值类型: int")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static int getValue(int n) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 1的阶乘为1")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (n == 1) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return 1;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"n不为1时,方法返回 n! = n*(n‐1)!")]),l(`
`),n("span",{class:"line"},[n("span",null,"递归调用getValue方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"return n * getValue(n ‐ 1);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class DiGuiDemo2 {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 创建File对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'File dir = new File("D:\\\\aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 调用打印目录方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir(dir);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void printDir(File dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 获取子文件和目录")]),l(`
`),n("span",{class:"line"},[n("span",null,"File[] files = dir.listFiles();")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环打印")]),l(`
`),n("span",{class:"line"},[n("span",null,"/*")]),l(`
`),n("span",{class:"line"},[n("span",null,"判断:")]),l(`
`),n("span",{class:"line"},[n("span",null,"当是文件时,打印绝对路径.")]),l(`
`),n("span",{class:"line"},[n("span",null,"当是目录时,继续调用打印目录的方法,形成递归调用.")]),l(`
`),n("span",{class:"line"},[n("span",null,"*/")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (File file : files) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 判断")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (file.isFile()) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 是文件,输出文件绝对路径")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件名:"+ file.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 是目录,输出目录绝对路径")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("目录:"+file.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 继续遍历,调用printDir,形成递归// 继续遍历,调用printDir,形成递归")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"**第三章 综合案例**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3.1** **文件搜索**")]),l(`
`),n("span",{class:"line"},[n("span",null,"搜索 D:\\aaa 目录中的 .java 文件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. 目录搜索，无法判断多少级目录，所以使用递归，遍历所有目录。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. 遍历目录时，获取的子文件，通过文件名称，判断是否符合条件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码实现**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class DiGuiDemo3 {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 创建File对象")]),l(`
`),n("span",{class:"line"},[n("span",null,'File dir = new File("D:\\\\aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,"// 调用打印目录方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir(dir);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void printDir(File dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 获取子文件和目录")]),l(`
`),n("span",{class:"line"},[n("span",null,"File[] files = dir.listFiles();")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环打印")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (File file : files) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (file.isFile()) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 是文件，判断文件名并输出文件绝对路径")]),l(`
`),n("span",{class:"line"},[n("span",null,'if (file.getName().endsWith(".java")) {')]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件名:" + file.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 是目录，继续遍历,形成递归")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3.2** **文件过滤器优化**")]),l(`
`),n("span",{class:"line"},[n("span",null,"java.io.FileFilter 是一个接口，是File的过滤器。 该接口的对象可以传递给File类的 listFiles(FileFilter)")]),l(`
`),n("span",{class:"line"},[n("span",null,"作为参数， 接口中只有一个方法。boolean accept(File pathname) ：测试pathname是否应该包含在当前File目录中，符合则返回true。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析**：")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. 接口作为参数，需要传递子类对象，重写其中方法。我们选择匿名内部类方式，比较简单。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. accept 方法，参数为File，表示当前File下所有的子文件和子目录。保留住则返回true，过滤掉则返回")]),l(`
`),n("span",{class:"line"},[n("span",null,"false。保留规则：")]),l(`
`),n("span",{class:"line"},[n("span",null,"1. 要么是.java文件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"2. 要么是目录，用于继续遍历。")]),l(`
`),n("span",{class:"line"},[n("span",null,"3. 通过过滤器的作用， listFiles(FileFilter) 返回的数组元素中，子文件对象都是符合条件的，可以直接打")]),l(`
`),n("span",{class:"line"},[n("span",null,"印。")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码实现：**")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class DiGuiDemo4 {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'File dir = new File("D:\\\\aaa");')]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir2(dir);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void printDir2(File dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 匿名内部类方式,创建过滤器子类对象")]),l(`
`),n("span",{class:"line"},[n("span",null,"File[] files = dir.listFiles(new FileFilter() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),l(`
`),n("span",{class:"line"},[n("span",null,"public boolean accept(File pathname) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'return pathname.getName().endsWith(".java")||pathname.isDirectory();')]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环打印")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (File file : files) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (file.isFile()) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件名:" + file.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir2(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"**3.3 Lambda****优化**")]),l(`
`),n("span",{class:"line"},[n("span",null,"**分析：** FileFilter 是只有一个方法的接口，因此可以用lambda表达式简写。")]),l(`
`),n("span",{class:"line"},[n("span",null,"lambda格式：")]),l(`
`),n("span",{class:"line"},[n("span",null,"()‐\\>{ }")]),l(`
`),n("span",{class:"line"},[n("span",null,"**代码实现：**public static void printDir3(File dir) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// lambda的改写")]),l(`
`),n("span",{class:"line"},[n("span",null,"File[] files = dir.listFiles(f ‐\\>{")]),l(`
`),n("span",{class:"line"},[n("span",null,'return f.getName().endsWith(".java") || f.isDirectory();')]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 循环打印")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (File file : files) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (file.isFile()) {")]),l(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("文件名:" + file.getAbsolutePath());')]),l(`
`),n("span",{class:"line"},[n("span",null,"} else {")]),l(`
`),n("span",{class:"line"},[n("span",null,"printDir3(file);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const F=a(e,[["render",u]]);export{f as __pageData,F as default};
