import{_ as n,o as s,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"28. 函数指针和回调","description":"The Little Book of C 中文版 — 28. 函数指针和回调","frontmatter":{"title":"28. 函数指针和回调","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","03-内存","中文"],"description":"The Little Book of C 中文版 — 28. 函数指针和回调","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":28,"sidebarWeight":28,"alternateZh":"/posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks","alternateEn":"/posts/c教程/en-US/03-Working with Memory/028-Function Pointers and Callbacks"},"headers":[],"relativePath":"posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks.md","filePath":"posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks.md"};function t(l,a,o,c,d,r){return s(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/03-Working with Memory/028-Function Pointers and Callbacks)</p><p>C 中的函数也是值，它们存在于内存中并且像变量一样有地址。函数指针是存储函数地址的指针，允许您间接调用该函数。这个想法为 C 中的回调、事件系统、自定义排序器和插件架构提供了支持。</p><h4 id="什么是函数指针" tabindex="-1">什么是函数指针？ <a class="header-anchor" href="#什么是函数指针" aria-label="Permalink to &quot;什么是函数指针？&quot;">​</a></h4><p>一样<code>int *</code>指向一个整数，函数指针指向一个函数。</p><p>句法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return_type (*pointer_name)(parameter_types);</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int (*func_ptr)(int, int) = add;</span></span></code></pre></div><p>现在您可以通过指针调用该函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int result = func_ptr(2, 3); // same as add(2, 3)</span></span></code></pre></div><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>下面是一个完整的示例，展示了如何声明、分配和调用函数指针：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>int sub(int a, int b) { return a - b; }</span></span>
<span class="line"><span>int mul(int a, int b) { return a * b; }</span></span>
<span class="line"><span>void operate(int x, int y, int (*op)(int, int)) {</span></span>
<span class="line"><span>    printf(&quot;Result: %d\\n&quot;, op(x, y)); // call through pointer</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int (*f)(int, int); // declaration</span></span>
<span class="line"><span>    f = add;</span></span>
<span class="line"><span>    printf(&quot;Add via pointer: %d\\n&quot;, f(5, 3));</span></span>
<span class="line"><span>    f = sub;</span></span>
<span class="line"><span>    printf(&quot;Subtract via pointer: %d\\n&quot;, f(5, 3));</span></span>
<span class="line"><span>    printf(&quot;\\nUsing callback function:\\n&quot;);</span></span>
<span class="line"><span>    operate(4, 6, mul); // pass function pointer as argument</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc func_pointer_demo.c -o func_pointer_demo</span></span>
<span class="line"><span>./func_pointer_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>通过指针添加：8</span></span>
<span class="line"><span>通过指针减：2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用回调函数：</span></span>
<span class="line"><span>结果：24</span></span></code></pre></div><h4 id="数组中的函数指针" tabindex="-1">数组中的函数指针 <a class="header-anchor" href="#数组中的函数指针" aria-label="Permalink to &quot;数组中的函数指针&quot;">​</a></h4><p>您还可以在数组中存储多个函数指针，这对于构建操作表很有用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int (*ops[3])(int, int) = {add, sub, mul};</span></span>
<span class="line"><span>for (int i = 0; i &lt; 3; i++)</span></span>
<span class="line"><span>    printf(&quot;ops[%d](4, 2) = %d\\n&quot;, i, ops[i](4, 2));</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ops[0](4, 2) = 6</span></span>
<span class="line"><span>ops[1](4, 2) = 2</span></span>
<span class="line"><span>ops[2](4, 2) = 8</span></span></code></pre></div><p>这种模式是 C 中调度表、解释器和虚拟函数系统的基础。</p><h4 id="回调" tabindex="-1">回调 <a class="header-anchor" href="#回调" aria-label="Permalink to &quot;回调&quot;">​</a></h4><p>回调是作为参数传递给另一个函数的函数，让被调用者“回调”到用户代码中。这种模式在事件驱动和模块化设计中至关重要。</p><p>示例：接受回调的简单迭代器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void for_each(int *arr, int n, void (*callback)(int)) {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>        callback(arr[i]);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void print_square(int x) {</span></span>
<span class="line"><span>    printf(&quot;%d^2 = %d\\n&quot;, x, x * x);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int nums[] = {1, 2, 3, 4, 5};</span></span>
<span class="line"><span>    for_each(nums, 5, print_square); // pass callback</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1^2 = 1</span></span>
<span class="line"><span>2^2 = 4</span></span>
<span class="line"><span>3^2 = 9</span></span>
<span class="line"><span>4^2 = 16</span></span>
<span class="line"><span>5^2 = 25</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>函数指针可以让你：</p><ul><li>选择运行时的行为（动态调度）。</li><li>将逻辑传递到库中而无需重新编译它们。</li><li>构建框架、事件处理程序、解释器和插件。</li><li>用优雅的调度表取代巨大的开关盒结构。</li></ul><p>它们也是 C 的实现方式：</p><p>-<code>qsort()</code>和<code>bsearch()</code>比较函数，</p><ul><li>信号处理程序（<code>signal(SIGINT, handler)</code>）， 和</li><li>GUI 或内核中的系统回调。</li></ul><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写三个算术函数并将它们存储在函数指针数组中。</li><li>建立一个<code>calculate(a, b, char op)</code>函数根据以下条件选择正确的函数指针<code>op</code>.</li><li>实现回调式循环，为每个数组元素调用用户定义的函数。</li><li>传递一个函数指针<code>qsort()</code>从<code>&lt;stdlib.h&gt;</code>按降序对整数进行排序。</li><li>编写一个小型菜单系统，根据用户选择调用正确的功能。</li></ol><p>函数指针和回调为您的程序提供灵活性和抽象性，而不会牺牲速度。它们是 C 实现动态行为的方式，是数据和可执行逻辑之间的桥梁。</p>`,38)])])}const b=n(i,[["render",t]]);export{u as __pageData,b as default};
