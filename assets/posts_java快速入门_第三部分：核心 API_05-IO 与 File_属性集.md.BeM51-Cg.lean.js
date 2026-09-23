import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"属性集","description":"","frontmatter":{"title":"属性集","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/属性集.md","filePath":"posts/java快速入门/第三部分：核心 API/05-IO 与 File/属性集.md"}'),t={name:"posts/java快速入门/第三部分：核心 API/05-IO 与 File/属性集.md"};function i(r,l,c,o,u,g){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**概述**")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.util.Properties 继承于 Hashtable ，来表示一个持久的属性集。它使用键值结构存储数据，每个键及其对应值都是一个字符串。该类也被许多Java类使用，比如获取系统属性时， System.getProperties 方法就是返回一个 Properties 对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Properties****类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**构造方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Properties() :创建一个空的属性列表。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**基本的存储方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Object setProperty(String key, String value) ： 保存一对属性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String getProperty(String key) ：使用此属性列表中指定的键搜索属性值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Set\\<String\\> stringPropertyNames() ：所有键的名称的集合。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ProDemo {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws FileNotFoundException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建属性集对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Properties properties = new Properties();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 添加键值对元素")]),s(`
`),n("span",{class:"line"},[n("span",null,'properties.setProperty("filename", "a.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,'properties.setProperty("length", "209385038");')]),s(`
`),n("span",{class:"line"},[n("span",null,'properties.setProperty("location", "D:\\\\a.txt");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 打印属性集对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(properties);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 通过键,获取属性值")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(properties.getProperty("filename"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(properties.getProperty("length"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(properties.getProperty("location"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历属性集,获取所有键的集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<String\\> strings = properties.stringPropertyNames();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 打印键值对")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (String key : strings ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(key+" ‐‐ "+properties.getProperty(key));')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**与流相关的方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void load(InputStream inStream) ： 从字节输入流中读取键值对。")]),s(`
`),n("span",{class:"line"},[n("span",null,"参数中使用了字节输入流，通过流对象，可以关联到某文件上，这样就能够加载文本中的数据了。文本数据格式:")]),s(`
`),n("span",{class:"line"},[n("span",null,"filename=a.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"length=209385038")]),s(`
`),n("span",{class:"line"},[n("span",null,"location=D:\\a.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"加载代码演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class ProDemo2 {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) throws FileNotFoundException {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建属性集对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Properties pro = new Properties();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 加载文本中信息到属性集")]),s(`
`),n("span",{class:"line"},[n("span",null,'pro.load(new FileInputStream("read.txt"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历集合并打印")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<String\\> strings = pro.stringPropertyNames();")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (String key : strings ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(key+" ‐‐ "+pro.getProperty(key));')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"输出结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"filename ‐‐ a.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"length ‐‐ 209385038")]),s(`
`),n("span",{class:"line"},[n("span",null,"location ‐‐ D:\\a.txt")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士：文本中的数据，必须是键值对形式，可以使用空格、等号、冒号等符号分隔。")])])])])],-1)])])}const y=a(t,[["render",i]]);export{d as __pageData,y as default};
