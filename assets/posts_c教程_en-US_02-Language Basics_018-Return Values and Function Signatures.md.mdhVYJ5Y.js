import{_ as a,o as s,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"18. Return Values and Function Signatures","description":"The Little Book of C — 18. Return Values and Function Signatures","frontmatter":{"title":"18. Return Values and Function Signatures","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Language Basics"],"description":"The Little Book of C — 18. Return Values and Function Signatures","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":18,"sidebarWeight":18,"lang":"en-US","alternateEn":"/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures","alternateZh":"/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures"},"headers":[],"relativePath":"posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures.md","filePath":"posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures.md"};function p(o,n,l,r,c,u){return s(),e("div",null,[...n[0]||(n[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures)</p><p>Functions not only perform tasks but often communicate results back to the caller. They do this through return values. Every C function has a signature, a declaration that defines its return type, name, and parameters. Getting comfortable with signatures and return values helps you write clean, predictable, and modular programs.</p><h4 id="function-signatures-explained" tabindex="-1">Function Signatures Explained <a class="header-anchor" href="#function-signatures-explained" aria-label="Permalink to &quot;Function Signatures Explained&quot;">​</a></h4><p>A function signature looks like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return_type function_name(parameter_list);</span></span></code></pre></div><p>It tells the compiler:</p><ol><li>What kind of value the function returns (<code>int</code>,<code>double</code>,<code>void</code>, etc.)</li><li>What the function is called</li><li>What arguments it expects and their types</li></ol><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int max(int a, int b);</span></span></code></pre></div><p>This says: “<code>max</code> is a function that takes two integers and returns an integer.”</p><h4 id="returning-values" tabindex="-1">Returning Values <a class="header-anchor" href="#returning-values" aria-label="Permalink to &quot;Returning Values&quot;">​</a></h4><p>You use the<code>return</code> keyword to send a value back from a function.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int x, int y) {</span></span>
<span class="line"><span>    return x + y;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The type of the value you return must match the function’s declared return type.</p><p>If a function doesn’t need to return anything, declare it as<code>void</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void greet(void) {</span></span>
<span class="line"><span>    printf(&quot;Hello!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>A<code>void</code> function can still perform actions, it just doesn’t produce a result.</p><h4 id="multiple-return-points" tabindex="-1">Multiple Return Points <a class="header-anchor" href="#multiple-return-points" aria-label="Permalink to &quot;Multiple Return Points&quot;">​</a></h4><p>You can return early if certain conditions are met.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int divide(int a, int b) {</span></span>
<span class="line"><span>    if (b == 0) {</span></span>
<span class="line"><span>        printf(&quot;Error: division by zero!\\n&quot;);</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This is common for error handling or input validation.</p><h4 id="returning-different-data-types" tabindex="-1">Returning Different Data Types <a class="header-anchor" href="#returning-different-data-types" aria-label="Permalink to &quot;Returning Different Data Types&quot;">​</a></h4><p>You can return any type, not just integers.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>double average(double a, double b) {</span></span>
<span class="line"><span>    return (a + b) / 2.0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>char first_letter(const char *word) {</span></span>
<span class="line"><span>    return word[0];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>_Bool is_even(int n) {</span></span>
<span class="line"><span>    return n % 2 == 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>For more complex data, you’ll later learn how to return pointers or structs.</p><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a complete example showing several return types and signatures:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc return_demo.c -o return_demo</span></span>
<span class="line"><span>./return_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, C Programmer!</span></span>
<span class="line"><span>Sum: 10</span></span>
<span class="line"><span>Quotient: 2.50</span></span>
<span class="line"><span>Is sum even? Yes</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Return values are how functions communicate. By designing clear and meaningful signatures:</p><ul><li>You make your code predictable, every function has a defined purpose and output.</li><li>The compiler can check correctness, mismatched types raise warnings.</li><li>You can compose functions, one function’s return becomes another’s input.</li></ul><p>In large systems, consistent signatures and meaningful return types form the backbone of good API design.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a function<code>max(a, b)</code> that returns the larger of two integers.</li><li>Write a function<code>to_upper(char c)</code> that returns an uppercase version of a character.</li><li>Modify a<code>divide()</code> function to return<code>-1</code> if division by zero occurs.</li><li>Create a<code>sum_to_n(int n)</code> that returns the sum of all numbers from 1 to<code>n</code>.</li><li>Try using a<code>void</code> function that prints the result of another function call.</li></ol><p>Return values give your functions purpose, they turn simple actions into reusable building blocks that make your programs expressive, modular, and alive.</p>`,39)])])}const g=a(i,[["render",p]]);export{h as __pageData,g as default};
