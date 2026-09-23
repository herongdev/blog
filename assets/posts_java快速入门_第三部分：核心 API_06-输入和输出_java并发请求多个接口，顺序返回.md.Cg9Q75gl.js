import{_ as l,o as r,c as n,j as e,a as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"java并发请求多个接口，顺序返回","description":"","frontmatter":{"title":"java并发请求多个接口，顺序返回","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/06-输入和输出/java并发请求多个接口，顺序返回.md","filePath":"posts/java快速入门/第三部分：核心 API/06-输入和输出/java并发请求多个接口，顺序返回.md"}'),u={name:"posts/java快速入门/第三部分：核心 API/06-输入和输出/java并发请求多个接口，顺序返回.md"};function o(s,a,i,p,c,d){return r(),n("div",null,[...a[0]||(a[0]=[e("div",null,[e("p",null,[t("最近有个需求，从一个"),e("code",null,"api"),t("拿数据，但是"),e("code",null,"api"),t("时间参数又有范围限制，因此需要自己将时间分成多段，多次请求"),e("code",null,"api"),t("，并且最终返回的数据需要保持原有的顺序")]),e("p",null,"package com.test001.www.threadpool;"),e("p",null,"import java.util.LinkedList; import java.util.List; import java.util.Vector; import java.util.concurrent.Callable; import java.util.concurrent.ExecutorService; import java.util.concurrent.Executors; import java.util.concurrent.Future;"),e("p",null,"public class ThreadPoolTest {"),e("pre",null,[e("code",null,`public static void main(String[] args)\\{
    ArrayThreadPool\\<User\\> pool = new ArrayThreadPool\\<\\>();
    for (int i = 5; i \\> 0; i--)\\{
        Integer data = i;
        pool.submit(()-\\>\\{￼//
`)]),e("p",null,"==这个地方可以写一个函数，参数可以从外层传入=="),e("pre",null,[e("code",null,`           System.out.println("
`)]),e("p",null,"==网络操作开始=="),e("p",null,'"+data); Thread.sleep(data*1000); System.out.println(" ==网络操作结束=='),e("p",null,'"+data); return new User(data); }); } List<User> users = pool.get(); for (User u :users){ System.out.println(u); } pool.stop(); } }'),e("p",null,"class User{ private int i; public User(int a){ i=a; }"),e("pre",null,[e("code",null,`@Override
public String toString() \\{
    return "user="+i;
\\}
`)]),e("p",null,"}"),e("p",null,"class ArrayThreadPool<T>{ private Vector<Future<T>> futureList = new Vector<>(); ExecutorService executor = Executors.newCachedThreadPool(); public ArrayThreadPool submit(Callable<T> task){ Future<T> result = executor.submit(task); futureList.add(result); return this; }"),e("pre",null,[e("code",null,`public List\\<T\\> get()\\{
    List\\<T\\> result = new LinkedList\\<\\>();
    for (Future\\<T\\> future :
            futureList) \\{
        try \\{
            result.add(future.get());
        \\}catch (Exception e)\\{
            result.add(null);
        \\}

    \\}
    return result;
\\}

public void stop()\\{
    executor.shutdown();
\\}
`)]),e("p",null,[t("} 使用"),e("code",null,"java"),t("自带线程池实现")]),e("p",null,"> 来自"),e("p",null,[t("<"),e("a",{href:"https://www.shuzhiduo.com/A/8Bz88PK6zx/%5C",target:"_blank",rel:"noreferrer"},"https://www.shuzhiduo.com/A/8Bz88PK6zx/\\"),t(">")]),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span")])])])])],-1)])])}const m=l(u,[["render",o]]);export{h as __pageData,m as default};
