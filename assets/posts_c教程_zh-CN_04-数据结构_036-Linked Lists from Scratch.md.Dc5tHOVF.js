import{_ as n,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"36. 从头开始的链接列表","description":"The Little Book of C 中文版 — 36. 从头开始的链接列表","frontmatter":{"title":"36. 从头开始的链接列表","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 36. 从头开始的链接列表","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":36,"sidebarWeight":36,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch","alternateEn":"/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch.md","filePath":"posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch.md"};function l(i,a,c,o,d,r){return s(),e("div",null,[...a[0]||(a[0]=[p(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch)</p><p>现在您已经了解了如何对数据进行分组<code>struct</code>，是时候让它变得动态了。链表是 C 语言中最基本的数据结构之一，完全由指针和结构体构建。它教你内存、指针和迭代是如何工作的。</p><h4 id="什么是链表" tabindex="-1">什么是链表？ <a class="header-anchor" href="#什么是链表" aria-label="Permalink to &quot;什么是链表？&quot;">​</a></h4><p>链表是节点的集合，其中每个节点存储：</p><ol><li>数据（您选择的任何类型），以及</li><li>指向下一个节点的指针。</li></ol><p>与数组不同，链表的大小不固定，您可以随时添加或删除节点，而无需重新分配大块内存。</p><h4 id="基本节点结构" tabindex="-1">基本节点结构 <a class="header-anchor" href="#基本节点结构" aria-label="Permalink to &quot;基本节点结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这定义了一个“节点”，它保存一个整数和一个指向列表中下一个节点的指针。如果<code>next</code>是<code>NULL</code>，这是列表的末尾。</p><h4 id="创建和遍历链表" tabindex="-1">创建和遍历链表 <a class="header-anchor" href="#创建和遍历链表" aria-label="Permalink to &quot;创建和遍历链表&quot;">​</a></h4><p>让我们构建一个简单的三节点列表：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    // Create three nodes dynamically</span></span>
<span class="line"><span>    struct Node *a = malloc(sizeof(struct Node));</span></span>
<span class="line"><span>    struct Node *b = malloc(sizeof(struct Node));</span></span>
<span class="line"><span>    struct Node *c = malloc(sizeof(struct Node));</span></span>
<span class="line"><span>    a-&gt;value = 10; a-&gt;next = b;</span></span>
<span class="line"><span>    b-&gt;value = 20; b-&gt;next = c;</span></span>
<span class="line"><span>    c-&gt;value = 30; c-&gt;next = NULL;</span></span>
<span class="line"><span>    // Traverse and print</span></span>
<span class="line"><span>    struct Node *current = a;</span></span>
<span class="line"><span>    while (current != NULL) {</span></span>
<span class="line"><span>        printf(&quot;%d &quot;, current-&gt;value);</span></span>
<span class="line"><span>        current = current-&gt;next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    // Free memory</span></span>
<span class="line"><span>    free(a); free(b); free(c);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10 20 30</span></span></code></pre></div><h4 id="小代码-构建、插入、删除" tabindex="-1">小代码：构建、插入、删除 <a class="header-anchor" href="#小代码-构建、插入、删除" aria-label="Permalink to &quot;小代码：构建、插入、删除&quot;">​</a></h4><p>让我们使其可重用，为常见操作定义辅助函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>} Node;</span></span>
<span class="line"><span>Node* create_node(int value) {</span></span>
<span class="line"><span>    Node *n = malloc(sizeof(Node));</span></span>
<span class="line"><span>    n-&gt;value = value;</span></span>
<span class="line"><span>    n-&gt;next = NULL;</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void append(Node **head, int value) {</span></span>
<span class="line"><span>    Node *new_node = create_node(value);</span></span>
<span class="line"><span>    if (*head == NULL) {</span></span>
<span class="line"><span>        *head = new_node;</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Node *cur = *head;</span></span>
<span class="line"><span>    while (cur-&gt;next) cur = cur-&gt;next;</span></span>
<span class="line"><span>    cur-&gt;next = new_node;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void print_list(const Node *head) {</span></span>
<span class="line"><span>    for (const Node *p = head; p != NULL; p = p-&gt;next)</span></span>
<span class="line"><span>        printf(&quot;%d -&gt; &quot;, p-&gt;value);</span></span>
<span class="line"><span>    printf(&quot;NULL\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void delete_list(Node *head) {</span></span>
<span class="line"><span>    while (head) {</span></span>
<span class="line"><span>        Node *next = head-&gt;next;</span></span>
<span class="line"><span>        free(head);</span></span>
<span class="line"><span>        head = next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Node *head = NULL;</span></span>
<span class="line"><span>    append(&amp;head, 5);</span></span>
<span class="line"><span>    append(&amp;head, 10);</span></span>
<span class="line"><span>    append(&amp;head, 15);</span></span>
<span class="line"><span>    printf(&quot;Linked list contents:\\n&quot;);</span></span>
<span class="line"><span>    print_list(head);</span></span>
<span class="line"><span>    delete_list(head);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Linked list contents:</span></span>
<span class="line"><span>5 -&gt; 10 -&gt; 15 -&gt; NULL</span></span></code></pre></div><h4 id="为什么使用链表" tabindex="-1">为什么使用链表？ <a class="header-anchor" href="#为什么使用链表" aria-label="Permalink to &quot;为什么使用链表？&quot;">​</a></h4><ul><li>动态大小：根据需要轻松增大或缩小。</li><li>高效的插入和删除：无需像数组中那样移动元素。</li><li>非常适合学习内存处理：您可以直接分配和释放每个节点。</li></ul><p>但他们也有权衡：</p><ul><li>随机访问速度较慢（必须从头部开始遍历）。</li><li>由于指针字段，内存使用量略高。</li></ul><h4 id="您稍后会遇到的变体" tabindex="-1">您稍后会遇到的变体 <a class="header-anchor" href="#您稍后会遇到的变体" aria-label="Permalink to &quot;您稍后会遇到的变体&quot;">​</a></h4><table tabindex="0"><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>单链表</td><td>每个节点都指向下一个节点（如上所示）。</td></tr><tr><td>双向链表</td><td>每个节点有<code>prev</code>和<code>next</code>指针。</td></tr><tr><td>循环链表</td><td>最后一个节点链接回第一个节点。</td></tr><tr><td>哨兵名单</td><td>使用虚拟头/尾节点来简化逻辑。</td></tr></tbody></table><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>链接列表是手动内存管理的窗口，您可以处理创建、遍历和清理。它们用于：</p><ul><li>内核（例如，Linux<code>list_head</code>)</li><li>编译器（符号表、令牌流）</li><li>动态容器（队列、分配器）</li></ul><p>你不仅仅是在学习数据结构，你还在学习如何用指针来思考。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>实现一个功能<code>int length(Node *head)</code>计算节点的数量。</li><li>写<code>insert_front()</code>和<code>insert_after()</code>功能。</li><li>实施<code>find()</code>返回指向具有给定值的节点的指针的函数。</li><li>修改<code>delete_list()</code>函数打印哪个节点正在被释放。</li><li>扩展结构体以包含<code>char name[20]</code>并打印名称和值。</li></ol><p>您现在已经完全从头开始构建了计算机科学中最重要的动态结构之一。接下来，您将在此基础上创建堆栈和队列，这是系统编程中最常见和最有用的两种数据抽象。</p>`,32)])])}const g=n(t,[["render",l]]);export{u as __pageData,g as default};
