import{_ as n,o as s,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"16. 功能及参数","description":"The Little Book of C 中文版 — 16. 功能及参数","frontmatter":{"title":"16. 功能及参数","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","02-语言基础","中文"],"description":"The Little Book of C 中文版 — 16. 功能及参数","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":16,"sidebarWeight":16,"alternateZh":"/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters","alternateEn":"/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters"},"headers":[],"relativePath":"posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters.md","filePath":"posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters.md"};function t(l,a,o,c,d,r){return s(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters)</p><p>函数是您将程序分解为更小、可重用的部分的方法。每个函数执行一项特定任务，您可以在需要时调用它，传入数据（参数），并获取一些内容（返回值）。函数使您的代码组织有序、可测试且更易于理解。</p><h4 id="函数的结构" tabindex="-1">函数的结构 <a class="header-anchor" href="#函数的结构" aria-label="Permalink to &quot;函数的结构&quot;">​</a></h4><p>C 中的函数有四个主要部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return_type function_name(parameter_list) {</span></span>
<span class="line"><span>    // body of the function</span></span>
<span class="line"><span>    return value;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这里：</p><p>-<code>int</code>是返回类型 -<code>add</code>是名字 -<code>(int a, int b)</code>是参数 -<code>return a + b;</code>将结果发送回调用者</p><h4 id="声明和定义函数" tabindex="-1">声明和定义函数 <a class="header-anchor" href="#声明和定义函数" aria-label="Permalink to &quot;声明和定义函数&quot;">​</a></h4><p>在 C 语言中，必须在使用函数之前声明它。该声明告诉编译器会发生什么。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b); // declaration (prototype)</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int result = add(3, 4);</span></span>
<span class="line"><span>    printf(&quot;Result: %d\\n&quot;, result);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int add(int a, int b) { // definition</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Result: 7</span></span></code></pre></div><h4 id="传递参数" tabindex="-1">传递参数 <a class="header-anchor" href="#传递参数" aria-label="Permalink to &quot;传递参数&quot;">​</a></h4><p>当您调用函数时，参数按值传递，并创建每个值的副本。更改函数内部的参数不会影响原始变量。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void change(int x) {</span></span>
<span class="line"><span>    x = 10;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int a = 5;</span></span>
<span class="line"><span>    change(a);</span></span>
<span class="line"><span>    printf(&quot;%d\\n&quot;, a); // still 5</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果你想修改原始变量，请使用指针（你将在第 3 章中探讨这一点）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void change(int *x) {</span></span>
<span class="line"><span>    *x = 10;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="返回值" tabindex="-1">返回值 <a class="header-anchor" href="#返回值" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p>函数可以使用返回值<code>return</code>。返回值的类型必须与函数声明的返回类型匹配。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>double average(double a, double b) {</span></span>
<span class="line"><span>    return (a + b) / 2.0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果不返回任何内容，请使用<code>void</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void greet(void) {</span></span>
<span class="line"><span>    printf(&quot;Hello!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个结合了多个函数和参数的完整程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>// function declarations</span></span>
<span class="line"><span>int add(int a, int b);</span></span>
<span class="line"><span>int subtract(int a, int b);</span></span>
<span class="line"><span>double divide(double a, double b);</span></span>
<span class="line"><span>void greet(const char *name);</span></span>
<span class="line"><span>// main function</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    greet(&quot;C Learner&quot;);</span></span>
<span class="line"><span>    int sum = add(10, 5);</span></span>
<span class="line"><span>    int diff = subtract(10, 5);</span></span>
<span class="line"><span>    double quotient = divide(10.0, 5.0);</span></span>
<span class="line"><span>    printf(&quot;Sum: %d\\n&quot;, sum);</span></span>
<span class="line"><span>    printf(&quot;Difference: %d\\n&quot;, diff);</span></span>
<span class="line"><span>    printf(&quot;Quotient: %.2f\\n&quot;, quotient);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// function definitions</span></span>
<span class="line"><span>int add(int a, int b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int subtract(int a, int b) {</span></span>
<span class="line"><span>    return a - b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>double divide(double a, double b) {</span></span>
<span class="line"><span>    if (b == 0) {</span></span>
<span class="line"><span>        printf(&quot;Error: division by zero!\\n&quot;);</span></span>
<span class="line"><span>        return 0.0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void greet(const char *name) {</span></span>
<span class="line"><span>    printf(&quot;Hello, %s!\\n&quot;, name);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc functions_demo.c -o functions_demo</span></span>
<span class="line"><span>./functions_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, C Learner!</span></span>
<span class="line"><span>Sum: 15</span></span>
<span class="line"><span>Difference: 5</span></span>
<span class="line"><span>Quotient: 2.00</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>函数是每个程序的构建块。他们让你：</p><ul><li>将大问题分解为更小的步骤</li><li>重用代码而不是重写它</li><li>独立测试每个部分</li><li>使程序更易于阅读和维护</li></ul><p>在 C 中，您将使用函数来完成所有事情，从算术助手到内存分配器、系统调用和模块化库。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个返回两个数字中较大者的函数。</li><li>创建一个<code>void</code>打印欢迎消息的功能。 3.添加一个<code>multiply()</code>函数并从中调用它<code>main()</code>.</li><li>修改程序以从用户输入中读取数字并将其作为参数传递。</li><li>通过删除顶部的声明进行实验，查看出现的编译器错误，然后修复它。</li></ol><p>函数是 C 程序的增长方式。每个都是一个小工具，它们组合在一起就成为完整的系统。</p>`,38)])])}const b=n(i,[["render",t]]);export{h as __pageData,b as default};
