import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"23. 数组和指针算术","description":"The Little Book of C 中文版 — 23. 数组和指针算术","frontmatter":{"title":"23. 数组和指针算术","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","03-内存","中文"],"description":"The Little Book of C 中文版 — 23. 数组和指针算术","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":23,"sidebarWeight":23,"alternateZh":"/posts/c教程/zh-CN/03-内存/023-Arrays and Pointer Arithmetic","alternateEn":"/posts/c教程/en-US/03-Working with Memory/023-Arrays and Pointer Arithmetic"},"headers":[],"relativePath":"posts/c教程/zh-CN/03-内存/023-Arrays and Pointer Arithmetic.md","filePath":"posts/c教程/zh-CN/03-内存/023-Arrays and Pointer Arithmetic.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/03-内存/023-Arrays and Pointer Arithmetic.md"};function t(l,a,r,c,o,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/03-Working with Memory/023-Arrays and Pointer Arithmetic)</p><p>数组是包含相同类型元素的连续存储单元块。数组和指针在 C 中紧密相连，事实上，数组的名称通常表现为指向其第一个元素的指针。了解数组和指针算术如何协同工作是编写快速、内存高效的程序的关键。</p><h4 id="声明和使用数组" tabindex="-1">声明和使用数组 <a class="header-anchor" href="#声明和使用数组" aria-label="Permalink to &quot;声明和使用数组&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int numbers[5] = {10, 20, 30, 40, 50};</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span>        printf(&quot;numbers[%d] = %d\\n&quot;, i, numbers[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>numbers[0] = 10</span></span>
<span class="line"><span>numbers[1] = 20</span></span>
<span class="line"><span>numbers[2] = 30</span></span>
<span class="line"><span>numbers[3] = 40</span></span>
<span class="line"><span>numbers[4] = 50</span></span></code></pre></div><p>这里：</p><p>-<code>numbers</code>是一个由五个整数组成的数组。</p><ul><li>每个元素在内存中彼此相邻存储。</li><li>编译器知道每个<code>int</code>占用相同的字节数，因此可以找到<code>numbers[i]</code>快速使用指针运算。</li></ul><h4 id="数组名称作为指针" tabindex="-1">数组名称作为指针 <a class="header-anchor" href="#数组名称作为指针" aria-label="Permalink to &quot;数组名称作为指针&quot;">​</a></h4><p>当您使用数组的名称（不带索引）时，它充当指向其第一个元素的指针。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int numbers[3] = {1, 2, 3};</span></span>
<span class="line"><span>int *p = numbers;  // same as &amp;numbers[0]</span></span>
<span class="line"><span>printf(&quot;%d %d %d\\n&quot;, *p, *(p + 1), *(p + 2));</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 2 3</span></span></code></pre></div><p>每次向指针加 1 时，它都会向前移动一个元素，不是一个字节，而是该类型的一个对象。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个显示数组访问和指针算术的完整示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int arr[5] = {2, 4, 6, 8, 10};</span></span>
<span class="line"><span>    int *ptr = arr; // arr decays to pointer to arr[0]</span></span>
<span class="line"><span>    printf(&quot;Accessing with array index:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span>        printf(&quot;arr[%d] = %d\\n&quot;, i, arr[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\nAccessing with pointer arithmetic:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span>        printf(&quot;*(ptr + %d) = %d\\n&quot;, i, *(ptr + i));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\nAddresses in memory:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span>        printf(&quot;&amp;arr[%d] = %p\\n&quot;, i, (void *)&amp;arr[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc array_pointer.c -o array_pointer</span></span>
<span class="line"><span>./array_pointer</span></span></code></pre></div><p>输出（地址会有所不同）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>使用数组索引访问：</span></span>
<span class="line"><span>arr[0] = 2</span></span>
<span class="line"><span>arr[1] = 4</span></span>
<span class="line"><span>arr[2] = 6</span></span>
<span class="line"><span>arr[3] = 8</span></span>
<span class="line"><span>arr[4] = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用指针算术访问：</span></span>
<span class="line"><span>*(ptr + 0) = 2</span></span>
<span class="line"><span>*(ptr + 1) = 4</span></span>
<span class="line"><span>*(ptr + 2) = 6</span></span>
<span class="line"><span>*(ptr + 3) = 8</span></span>
<span class="line"><span>*（指针+ 4）= 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>内存中的地址：</span></span>
<span class="line"><span>&amp;arr[0] = 0x7ffcc73f9a60</span></span>
<span class="line"><span>&amp;arr[1] = 0x7ffcc73f9a64</span></span>
<span class="line"><span>&amp;arr[2] = 0x7ffcc73f9a68</span></span>
<span class="line"><span>&amp;arr[3] = 0x7ffcc73f9a6c</span></span>
<span class="line"><span>&amp;arr[4] = 0x7ffcc73f9a70</span></span></code></pre></div><p>您可以看到每个元素相距 4 个字节（典型大小为<code>int</code>).</p><h4 id="指针运算规则" tabindex="-1">指针运算规则 <a class="header-anchor" href="#指针运算规则" aria-label="Permalink to &quot;指针运算规则&quot;">​</a></h4><p>当您移动指针时，C 会自动按它们指向的类型的大小进行缩放：</p><table tabindex="0"><thead><tr><th>表达</th><th>意义</th></tr></thead><tbody><tr><td><code>p + 1</code></td><td>移至下一个元素</td></tr><tr><td><code>p - 1</code></td><td>移至上一个元素</td></tr><tr><td><code>*(p + i)</code></td><td>访问当前元素之后的第 i 个元素</td></tr><tr><td><code>p2 - p1</code></td><td>返回两个指针之间的元素数量</td></tr></tbody></table><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int *start = arr;</span></span>
<span class="line"><span>int *end = arr + 5;</span></span>
<span class="line"><span>printf(&quot;Array length: %ld\\n&quot;, end - start); // prints 5</span></span></code></pre></div><h4 id="常见陷阱" tabindex="-1">常见陷阱 <a class="header-anchor" href="#常见陷阱" aria-label="Permalink to &quot;常见陷阱&quot;">​</a></h4><p>越界访问访问超出数组有效范围的内存会导致未定义的行为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arr[5] = 99; // invalid! array has only indices 0-4</span></span></code></pre></div><p>数组衰减 当传递给函数时，数组“衰减”为指针，它们会丢失大小信息。您必须手动传递长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void print_array(int *arr, int len);</span></span></code></pre></div><p>指针混淆 请记住<code>arr[i]</code>和<code>*(arr + i)</code>意思是一样的。混合它们很好，但为了可读性要保持一致。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>数组和指针构成了 C 数据结构的基础。您将使用它们来构建：</p><ul><li>字符串（数组<code>char</code>)</li><li>矩阵（数组的数组）</li><li>链表和树（通过指针算术）</li></ul><p>一旦您习惯将数组视为通过指针访问的连续内存块，您就可以像真正的系统程序员一样开始设计自己的数据结构。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个仅使用指针打印数组的函数（无<code>[]</code>句法）。</li><li>创建一个数组<code>char</code>并将其打印为字符串和单独的字符。</li><li>声明一个包含 10 个数字的数组，然后使用指针对它们求和。</li><li>打印两个元素之间的地址差。</li><li>创建一个二维数组并使用嵌套循环打印它。</li></ol><p>在 C 语言中，数组和指针是同一枚硬币的两面。一旦理解了它们的联系，您就会发现直接内存访问是多么强大、优雅。</p>`,41)])])}const b=s(i,[["render",t]]);export{u as __pageData,b as default};
