import{_ as n,o as s,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"16. Functions and Parameters","description":"The Little Book of C — 16. Functions and Parameters","frontmatter":{"title":"16. Functions and Parameters","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Language Basics"],"description":"The Little Book of C — 16. Functions and Parameters","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":16,"sidebarWeight":16,"lang":"en-US","alternateEn":"/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters","alternateZh":"/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters"},"headers":[],"relativePath":"posts/c教程/en-US/02-Language Basics/016-Functions and Parameters.md","filePath":"posts/c教程/en-US/02-Language Basics/016-Functions and Parameters.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/02-Language Basics/016-Functions and Parameters.md"};function i(l,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters)</p><p>Functions are how you break a program into smaller, reusable pieces. Each function performs one specific task, you call it when needed, pass in data (parameters), and get something back (a return value). Functions make your code organized, testable, and easier to understand.</p><h4 id="the-structure-of-a-function" tabindex="-1">The Structure of a Function <a class="header-anchor" href="#the-structure-of-a-function" aria-label="Permalink to &quot;The Structure of a Function&quot;">​</a></h4><p>A function in C has four main parts:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return_type function_name(parameter_list) {</span></span>
<span class="line"><span>    // body of the function</span></span>
<span class="line"><span>    return value;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here:</p><ul><li><code>int</code> is the return type</li><li><code>add</code> is the name</li><li><code>(int a, int b)</code> are parameters</li><li><code>return a + b;</code> sends a result back to the caller</li></ul><h4 id="declaring-and-defining-functions" tabindex="-1">Declaring and Defining Functions <a class="header-anchor" href="#declaring-and-defining-functions" aria-label="Permalink to &quot;Declaring and Defining Functions&quot;">​</a></h4><p>In C, you must declare a function before using it. The declaration tells the compiler what to expect.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b); // declaration (prototype)</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int result = add(3, 4);</span></span>
<span class="line"><span>    printf(&quot;Result: %d\\n&quot;, result);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int add(int a, int b) { // definition</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Result: 7</span></span></code></pre></div><h4 id="passing-parameters" tabindex="-1">Passing Parameters <a class="header-anchor" href="#passing-parameters" aria-label="Permalink to &quot;Passing Parameters&quot;">​</a></h4><p>When you call a function, the arguments are passed by value, a copy of each value is made. Changing parameters inside the function does not affect the original variables.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void change(int x) {</span></span>
<span class="line"><span>    x = 10;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int a = 5;</span></span>
<span class="line"><span>    change(a);</span></span>
<span class="line"><span>    printf(&quot;%d\\n&quot;, a); // still 5</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>If you want to modify the original variable, use pointers (you’ll explore this in Chapter 3):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void change(int *x) {</span></span>
<span class="line"><span>    *x = 10;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="return-values" tabindex="-1">Return Values <a class="header-anchor" href="#return-values" aria-label="Permalink to &quot;Return Values&quot;">​</a></h4><p>A function can return a value using<code>return</code>. The type of the returned value must match the function’s declared return type.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>double average(double a, double b) {</span></span>
<span class="line"><span>    return (a + b) / 2.0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>To return nothing, use<code>void</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void greet(void) {</span></span>
<span class="line"><span>    printf(&quot;Hello!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a complete program that combines multiple functions and parameters:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc functions_demo.c -o functions_demo</span></span>
<span class="line"><span>./functions_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, C Learner!</span></span>
<span class="line"><span>Sum: 15</span></span>
<span class="line"><span>Difference: 5</span></span>
<span class="line"><span>Quotient: 2.00</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Functions are the building blocks of every program. They let you:</p><ul><li>Break large problems into smaller steps</li><li>Reuse code instead of rewriting it</li><li>Test each part independently</li><li>Make programs easier to read and maintain</li></ul><p>In C, you’ll use functions for everything, from arithmetic helpers to memory allocators, system calls, and modular libraries.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a function that returns the larger of two numbers.</li><li>Create a<code>void</code> function that prints a welcome message.</li><li>Add a<code>multiply()</code> function and call it from<code>main()</code>.</li><li>Modify the program to read numbers from user input and pass them as parameters.</li><li>Experiment by removing the declaration at the top, see what compiler error appears, then fix it.</li></ol><p>Functions are how C programs grow. Each one is a small tool, and together, they become complete systems.</p>`,38)])])}const g=n(p,[["render",i]]);export{h as __pageData,g as default};
