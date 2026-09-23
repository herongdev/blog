import{_ as a,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"18. 返回值和函数签名","description":"The Little Book of C 中文版 — 18. 返回值和函数签名","frontmatter":{"title":"18. 返回值和函数签名","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","02-语言基础","中文"],"description":"The Little Book of C 中文版 — 18. 返回值和函数签名","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":18,"sidebarWeight":18,"alternateZh":"/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures","alternateEn":"/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures"},"headers":[],"relativePath":"posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures.md","filePath":"posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures.md"};function t(l,n,o,c,d,r){return s(),e("div",null,[...n[0]||(n[0]=[p(`<p>[English version](/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures)</p><p>函数不仅执行任务，而且经常将结果传达给调用者。他们通过返回值来做到这一点。每个 C 函数都有一个签名，一个定义其返回类型、名称和参数的声明。熟悉签名和返回值可以帮助您编写干净、可预测和模块化的程序。</p><h4 id="函数签名解释" tabindex="-1">函数签名解释 <a class="header-anchor" href="#函数签名解释" aria-label="Permalink to &quot;函数签名解释&quot;">​</a></h4><p>函数签名如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return_type function_name(parameter_list);</span></span></code></pre></div><p>它告诉编译器：</p><ol><li>函数返回什么样的值（<code>int</code>,<code>double</code>,<code>void</code>， ETC。）</li><li>函数叫什么</li><li>它需要什么参数及其类型</li></ol><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int max(int a, int b);</span></span></code></pre></div><p>这说：“<code>max</code>是一个接受两个整数并返回一个整数的函数。”</p><h4 id="返回值" tabindex="-1">返回值 <a class="header-anchor" href="#返回值" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p>您使用<code>return</code>关键字从函数发送回值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int x, int y) {</span></span>
<span class="line"><span>    return x + y;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>返回值的类型必须与函数声明的返回类型匹配。</p><p>如果函数不需要返回任何内容，请将其声明为<code>void</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void greet(void) {</span></span>
<span class="line"><span>    printf(&quot;Hello!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>一个<code>void</code>函数仍然可以执行操作，只是不产生结果。</p><h4 id="多个返回点" tabindex="-1">多个返回点 <a class="header-anchor" href="#多个返回点" aria-label="Permalink to &quot;多个返回点&quot;">​</a></h4><p>如果满足某些条件，您可以提前返回。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int divide(int a, int b) {</span></span>
<span class="line"><span>    if (b == 0) {</span></span>
<span class="line"><span>        printf(&quot;Error: division by zero!\\n&quot;);</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这对于错误处理或输入验证很常见。</p><h4 id="返回不同的数据类型" tabindex="-1">返回不同的数据类型 <a class="header-anchor" href="#返回不同的数据类型" aria-label="Permalink to &quot;返回不同的数据类型&quot;">​</a></h4><p>您可以返回任何类型，而不仅仅是整数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>double average(double a, double b) {</span></span>
<span class="line"><span>    return (a + b) / 2.0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>char first_letter(const char *word) {</span></span>
<span class="line"><span>    return word[0];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>_Bool is_even(int n) {</span></span>
<span class="line"><span>    return n % 2 == 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对于更复杂的数据，您稍后将学习如何返回指针或结构。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个完整的示例，显示了几种返回类型和签名：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdbool.h&gt;</span></span>
<span class="line"><span>// function declarations</span></span>
<span class="line"><span>int add(int x, int y);</span></span>
<span class="line"><span>double divide(double a, double b);</span></span>
<span class="line"><span>bool is_even(int n);</span></span>
<span class="line"><span>void greet(const char *name);</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    greet(&quot;C Programmer&quot;);</span></span>
<span class="line"><span>    int sum = add(7, 3);</span></span>
<span class="line"><span>    double quotient = divide(10.0, 4.0);</span></span>
<span class="line"><span>    bool check = is_even(sum);</span></span>
<span class="line"><span>    printf(&quot;Sum: %d\\n&quot;, sum);</span></span>
<span class="line"><span>    printf(&quot;Quotient: %.2f\\n&quot;, quotient);</span></span>
<span class="line"><span>    printf(&quot;Is sum even? %s\\n&quot;, check ? &quot;Yes&quot; : &quot;No&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// function definitions</span></span>
<span class="line"><span>int add(int x, int y) {</span></span>
<span class="line"><span>    return x + y;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>double divide(double a, double b) {</span></span>
<span class="line"><span>    if (b == 0.0) {</span></span>
<span class="line"><span>        printf(&quot;Cannot divide by zero.\\n&quot;);</span></span>
<span class="line"><span>        return 0.0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bool is_even(int n) {</span></span>
<span class="line"><span>    return n % 2 == 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void greet(const char *name) {</span></span>
<span class="line"><span>    printf(&quot;Hello, %s!\\n&quot;, name);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc return_demo.c -o return_demo</span></span>
<span class="line"><span>./return_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, C Programmer!</span></span>
<span class="line"><span>Sum: 10</span></span>
<span class="line"><span>Quotient: 2.50</span></span>
<span class="line"><span>Is sum even? Yes</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>返回值是函数通信的方式。通过设计清晰且有意义的签名：</p><ul><li>您使您的代码可预测，每个函数都有明确的目的和输出。</li><li>编译器可以检查正确性，不匹配的类型会引发警告。</li><li>您可以组合函数，一个函数的返回成为另一个函数的输入。</li></ul><p>在大型系统中，一致的签名和有意义的返回类型构成了良好 API 设计的支柱。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个函数<code>max(a, b)</code>返回两个整数中较大的一个。</li><li>编写函数<code>to_upper(char c)</code>返回字符的大写版本。 3.修改一个<code>divide()</code>返回的函数<code>-1</code>如果发生被零除。</li><li>创建一个<code>sum_to_n(int n)</code>返回从 1 到所有数字的总和<code>n</code>.</li><li>尝试使用<code>void</code>打印另一个函数调用结果的函数。</li></ol><p>返回值赋予您的函数目的，它们将简单的操作转化为可重用的构建块，使您的程序具有表现力、模块化和活力。</p>`,39)])])}const b=a(i,[["render",t]]);export{h as __pageData,b as default};
