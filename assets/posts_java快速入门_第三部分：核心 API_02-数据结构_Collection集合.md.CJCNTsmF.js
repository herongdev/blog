import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"Collection集合","description":"","frontmatter":{"title":"Collection集合","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Collection集合.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Collection集合.md"}'),t={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/Collection集合.md"};function i(c,s,o,u,r,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"方法演示：")]),l(`
`),n("span",{class:"line"},[n("span",null,"~~~java")]),l(`
`),n("span",{class:"line"},[n("span",null,"import java.util.ArrayList;")]),l(`
`),n("span",{class:"line"},[n("span",null,"import java.util.Collection;")]),l(`
`),n("span",{class:"line"},[n("span",null,"public class Demo1Collection {")]),l(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"     // 创建集合对象")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 使用多态形式")]),l(`
`),n("span",{class:"line"},[n("span",null,"    Collection\\<String\\> coll = new ArrayList\\<String\\>();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 使用方法")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 添加功能 boolean add(String s)")]),l(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("小李广");')]),l(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("扫地僧");')]),l(`
`),n("span",{class:"line"},[n("span",null,'    coll.add("石破天");')]),l(`
`),n("span",{class:"line"},[n("span",null,"    System.out.println(coll);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // boolean contains(E e) 判断o是否在集合中存在")]),l(`
`),n("span",{class:"line"},[n("span",null,'    System.out.println("判断 扫地僧 是否在集合中"+coll.contains("扫地僧"));')]),l(`
`),n("span",{class:"line"},[n("span",null,"    //boolean remove(E e) 删除在集合中的o元素")]),l(`
`),n("span",{class:"line"},[n("span",null,'    System.out.println("删除石破天："+coll.remove("石破天"));')]),l(`
`),n("span",{class:"line"},[n("span",null,'    System.out.println("操作之后集合中元素:"+coll);')]),l(`
`),n("span",{class:"line"},[n("span",null,"    ")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // size() 集合中有几个元素")]),l(`
`),n("span",{class:"line"},[n("span",null,'        System.out.println("集合中有"+coll.size()+"个元素");')]),l(`
`),n("span",{class:"line"},[n("span",null,"        // Object[] toArray()转换成一个Object数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"    Object[] objects = coll.toArray();")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 遍历数组")]),l(`
`),n("span",{class:"line"},[n("span",null,"    for (int i = 0; i \\< objects.length; i++) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"            System.out.println(objects[i]);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        }")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // void clear() 清空集合")]),l(`
`),n("span",{class:"line"},[n("span",null,"        coll.clear();")]),l(`
`),n("span",{class:"line"},[n("span",null,'        System.out.println("集合中内容为："+coll);')]),l(`
`),n("span",{class:"line"},[n("span",null,"        // boolean isEmpty() 判断是否为空")]),l(`
`),n("span",{class:"line"},[n("span",null,"        System.out.println(coll.isEmpty());    ")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"~~~")]),l(`
`),n("span",{class:"line"},[n("span",null,"\\> tips: 有关Collection中的方法可不止上面这些，其他方法可以自行查看API学习。")])])])])],-1)])])}const b=a(t,[["render",i]]);export{v as __pageData,b as default};
