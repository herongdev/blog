import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"37. 具有结构的堆栈和队列","description":"The Little Book of C 中文版 — 37. 具有结构的堆栈和队列","frontmatter":{"title":"37. 具有结构的堆栈和队列","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 37. 具有结构的堆栈和队列","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":37,"sidebarWeight":37,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs","alternateEn":"/posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs.md","filePath":"posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs.md"};function l(i,s,c,o,u,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs)</p><p>您已经学习了如何构建链表，现在您将使用该基础来创建两种经典的数据结构：堆栈（LIFO，后进先出）和队列（FIFO，先进先出）。两者对于现实世界的程序都是必不可少的，从解析表达式到管理任务和内核调度。</p><h4 id="_1-堆栈" tabindex="-1">1. 堆栈 <a class="header-anchor" href="#_1-堆栈" aria-label="Permalink to &quot;1. 堆栈&quot;">​</a></h4><p>堆栈就像一堆盘子。您添加到顶部（推送），并从顶部删除（弹出）。</p><p>运营：</p><p>-<code>push(x)</code>→ 将项目添加到顶部 -<code>pop()</code>→ 删除顶部项目 -<code>peek()</code>→ 查看顶部的项目而不将其移除</p><h4 id="使用链表实现堆栈" tabindex="-1">使用链表实现堆栈 <a class="header-anchor" href="#使用链表实现堆栈" aria-label="Permalink to &quot;使用链表实现堆栈&quot;">​</a></h4><p>每个堆栈节点保存数据和指向下一个节点的指针。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>} Node;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Node *top;</span></span>
<span class="line"><span>} Stack;</span></span>
<span class="line"><span>Stack* create_stack(void) {</span></span>
<span class="line"><span>    Stack *s = malloc(sizeof(Stack));</span></span>
<span class="line"><span>    s-&gt;top = NULL;</span></span>
<span class="line"><span>    return s;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void push(Stack *s, int value) {</span></span>
<span class="line"><span>    Node *n = malloc(sizeof(Node));</span></span>
<span class="line"><span>    n-&gt;value = value;</span></span>
<span class="line"><span>    n-&gt;next = s-&gt;top;</span></span>
<span class="line"><span>    s-&gt;top = n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int pop(Stack *s) {</span></span>
<span class="line"><span>    if (!s-&gt;top) {</span></span>
<span class="line"><span>        printf(&quot;Stack underflow!\\n&quot;);</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Node *temp = s-&gt;top;</span></span>
<span class="line"><span>    int val = temp-&gt;value;</span></span>
<span class="line"><span>    s-&gt;top = temp-&gt;next;</span></span>
<span class="line"><span>    free(temp);</span></span>
<span class="line"><span>    return val;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int peek(const Stack *s) {</span></span>
<span class="line"><span>    return s-&gt;top ? s-&gt;top-&gt;value : -1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_stack(Stack *s) {</span></span>
<span class="line"><span>    while (s-&gt;top) pop(s);</span></span>
<span class="line"><span>    free(s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Stack *s = create_stack();</span></span>
<span class="line"><span>    push(s, 10);</span></span>
<span class="line"><span>    push(s, 20);</span></span>
<span class="line"><span>    push(s, 30);</span></span>
<span class="line"><span>    printf(&quot;Top: %d\\n&quot;, peek(s));</span></span>
<span class="line"><span>    printf(&quot;Popped: %d\\n&quot;, pop(s));</span></span>
<span class="line"><span>    printf(&quot;Popped: %d\\n&quot;, pop(s));</span></span>
<span class="line"><span>    printf(&quot;Top now: %d\\n&quot;, peek(s));</span></span>
<span class="line"><span>    free_stack(s);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Top: 30</span></span>
<span class="line"><span>Popped: 30</span></span>
<span class="line"><span>Popped: 20</span></span>
<span class="line"><span>Top now: 10</span></span></code></pre></div><h4 id="为什么使用堆栈" tabindex="-1">为什么使用堆栈？ <a class="header-anchor" href="#为什么使用堆栈" aria-label="Permalink to &quot;为什么使用堆栈？&quot;">​</a></h4><p>堆栈用于：</p><ul><li>函数调用（调用堆栈）</li><li>撤消/重做系统</li><li>解析表达式（例如，评估<code>(2 + 3) * 4</code>)</li><li>图中的深度优先搜索（DFS）</li></ul><h4 id="_2-队列" tabindex="-1">2. 队列 <a class="header-anchor" href="#_2-队列" aria-label="Permalink to &quot;2. 队列&quot;">​</a></h4><p>队列就像商店里的队伍。您添加到后面（入队），并从前面删除（出队）。</p><p>运营：</p><p>-<code>enqueue(x)</code>→ 添加到末尾 -<code>dequeue()</code>→ 从前面拆下</p><h4 id="使用链表实现队列" tabindex="-1">使用链表实现队列 <a class="header-anchor" href="#使用链表实现队列" aria-label="Permalink to &quot;使用链表实现队列&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>} Node;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Node *front;</span></span>
<span class="line"><span>    Node *rear;</span></span>
<span class="line"><span>} Queue;</span></span>
<span class="line"><span>Queue* create_queue(void) {</span></span>
<span class="line"><span>    Queue *q = malloc(sizeof(Queue));</span></span>
<span class="line"><span>    q-&gt;front = q-&gt;rear = NULL;</span></span>
<span class="line"><span>    return q;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void enqueue(Queue *q, int value) {</span></span>
<span class="line"><span>    Node *n = malloc(sizeof(Node));</span></span>
<span class="line"><span>    n-&gt;value = value;</span></span>
<span class="line"><span>    n-&gt;next = NULL;</span></span>
<span class="line"><span>    if (q-&gt;rear == NULL) {</span></span>
<span class="line"><span>        q-&gt;front = q-&gt;rear = n;</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    q-&gt;rear-&gt;next = n;</span></span>
<span class="line"><span>    q-&gt;rear = n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int dequeue(Queue *q) {</span></span>
<span class="line"><span>    if (q-&gt;front == NULL) {</span></span>
<span class="line"><span>        printf(&quot;Queue underflow!\\n&quot;);</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Node *temp = q-&gt;front;</span></span>
<span class="line"><span>    int val = temp-&gt;value;</span></span>
<span class="line"><span>    q-&gt;front = temp-&gt;next;</span></span>
<span class="line"><span>    if (q-&gt;front == NULL)</span></span>
<span class="line"><span>        q-&gt;rear = NULL;</span></span>
<span class="line"><span>    free(temp);</span></span>
<span class="line"><span>    return val;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void print_queue(const Queue *q) {</span></span>
<span class="line"><span>    for (Node *p = q-&gt;front; p != NULL; p = p-&gt;next)</span></span>
<span class="line"><span>        printf(&quot;%d &quot;, p-&gt;value);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_queue(Queue *q) {</span></span>
<span class="line"><span>    while (q-&gt;front) dequeue(q);</span></span>
<span class="line"><span>    free(q);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Queue *q = create_queue();</span></span>
<span class="line"><span>    enqueue(q, 1);</span></span>
<span class="line"><span>    enqueue(q, 2);</span></span>
<span class="line"><span>    enqueue(q, 3);</span></span>
<span class="line"><span>    printf(&quot;Queue: &quot;);</span></span>
<span class="line"><span>    print_queue(q);</span></span>
<span class="line"><span>    printf(&quot;Dequeued: %d\\n&quot;, dequeue(q));</span></span>
<span class="line"><span>    printf(&quot;Dequeued: %d\\n&quot;, dequeue(q));</span></span>
<span class="line"><span>    printf(&quot;Remaining: &quot;);</span></span>
<span class="line"><span>    print_queue(q);</span></span>
<span class="line"><span>    free_queue(q);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Queue: 1 2 3 </span></span>
<span class="line"><span>Dequeued: 1</span></span>
<span class="line"><span>Dequeued: 2</span></span>
<span class="line"><span>Remaining: 3</span></span></code></pre></div><h4 id="堆栈与队列总结" tabindex="-1">堆栈与队列总结 <a class="header-anchor" href="#堆栈与队列总结" aria-label="Permalink to &quot;堆栈与队列总结&quot;">​</a></h4><table tabindex="0"><thead><tr><th>特色</th><th>堆栈</th><th>队列</th></tr></thead><tbody><tr><td>访问订单</td><td>LIFO（后进先出）</td><td>FIFO（先进先出）</td></tr><tr><td>主要业务</td><td>推/弹出</td><td>入队/出队</td></tr><tr><td>用于</td><td>递归、解析、回溯</td><td>任务调度、缓冲</td></tr><tr><td>示例</td><td>撤消系统</td><td>打印机工作</td></tr></tbody></table><h4 id="小代码练习-双队列堆栈" tabindex="-1">小代码练习：双队列堆栈 <a class="header-anchor" href="#小代码练习-双队列堆栈" aria-label="Permalink to &quot;小代码练习：双队列堆栈&quot;">​</a></h4><p>这是一个最小的片段，可让您在堆栈和队列模式之间切换：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { STACK_MODE, QUEUE_MODE } Mode;</span></span></code></pre></div><p>您可以使用相同的链表逻辑，但更改是否在头部（堆栈）或尾部（队列）添加新节点。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>堆栈和队列行为是每个主要系统抽象的基础：</p><ul><li>CPU调度</li><li>IO缓冲</li><li>事件循环</li><li>表达式解析</li><li>递归算法</li></ul><p>用原始 C 语言构建它们可以巩固您对基于指针的数据结构和内存所有权的理解。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>实施<code>is_empty()</code>对于堆栈和队列。</li><li>扩展队列以处理字符串而不是整数。 3.添加功能<code>reverse_queue()</code>使用堆栈。</li><li>实现一个具有固定最大大小的“有界队列”。</li><li>编写一个小程序，使用队列模拟顾客到达。</li></ol><p>堆栈和队列是内存和时间的控制流原语。接下来，您将它们与散列和函数指针结合起来构建您自己的散列表，这是 C 中高效查找和符号表的基础。</p>`,35)])])}const q=n(t,[["render",l]]);export{h as __pageData,q as default};
