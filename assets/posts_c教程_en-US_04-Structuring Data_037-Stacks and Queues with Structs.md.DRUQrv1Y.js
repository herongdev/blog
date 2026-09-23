import{_ as n,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"37. Stacks and Queues with Structs","description":"The Little Book of C — 37. Stacks and Queues with Structs","frontmatter":{"title":"37. Stacks and Queues with Structs","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 37. Stacks and Queues with Structs","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":37,"sidebarWeight":37,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs","alternateZh":"/posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs.md","filePath":"posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs.md"};function l(i,s,u,o,c,r){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs)</p><p>You’ve learned how to build a linked list, now you’ll use that foundation to create two classic data structures: Stacks (LIFO, Last In, First Out) and Queues (FIFO, First In, First Out). Both are essential for real-world programs, from parsing expressions to managing tasks and kernel scheduling.</p><h4 id="_1-the-stack" tabindex="-1">1. The Stack <a class="header-anchor" href="#_1-the-stack" aria-label="Permalink to &quot;1. The Stack&quot;">​</a></h4><p>A stack is like a pile of plates. You add to the top (push), and remove from the top (pop).</p><p>Operations:</p><ul><li><code>push(x)</code>→ add an item to the top</li><li><code>pop()</code>→ remove the top item</li><li><code>peek()</code>→ look at the top item without removing it</li></ul><h4 id="stack-implementation-using-linked-list" tabindex="-1">Stack Implementation Using Linked List <a class="header-anchor" href="#stack-implementation-using-linked-list" aria-label="Permalink to &quot;Stack Implementation Using Linked List&quot;">​</a></h4><p>Each stack node holds data and a pointer to the next node.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Top: 30</span></span>
<span class="line"><span>Popped: 30</span></span>
<span class="line"><span>Popped: 20</span></span>
<span class="line"><span>Top now: 10</span></span></code></pre></div><h4 id="why-use-a-stack" tabindex="-1">Why Use a Stack? <a class="header-anchor" href="#why-use-a-stack" aria-label="Permalink to &quot;Why Use a Stack?&quot;">​</a></h4><p>Stacks are used in:</p><ul><li>Function calls (the call stack)</li><li>Undo/redo systems</li><li>Parsing expressions (e.g., evaluating<code>(2 + 3) * 4</code>)</li><li>Depth-first search (DFS) in graphs</li></ul><h4 id="_2-the-queue" tabindex="-1">2. The Queue <a class="header-anchor" href="#_2-the-queue" aria-label="Permalink to &quot;2. The Queue&quot;">​</a></h4><p>A queue is like a line at a store. You add to the back (enqueue), and remove from the front (dequeue).</p><p>Operations:</p><ul><li><code>enqueue(x)</code>→ add to the end</li><li><code>dequeue()</code>→ remove from the front</li></ul><h4 id="queue-implementation-using-linked-list" tabindex="-1">Queue Implementation Using Linked List <a class="header-anchor" href="#queue-implementation-using-linked-list" aria-label="Permalink to &quot;Queue Implementation Using Linked List&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Queue: 1 2 3 </span></span>
<span class="line"><span>Dequeued: 1</span></span>
<span class="line"><span>Dequeued: 2</span></span>
<span class="line"><span>Remaining: 3</span></span></code></pre></div><h4 id="stack-vs-queue-summary" tabindex="-1">Stack vs Queue Summary <a class="header-anchor" href="#stack-vs-queue-summary" aria-label="Permalink to &quot;Stack vs Queue Summary&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Feature</th><th>Stack</th><th>Queue</th></tr></thead><tbody><tr><td>Access Order</td><td>LIFO (Last In, First Out)</td><td>FIFO (First In, First Out)</td></tr><tr><td>Main Operations</td><td>push / pop</td><td>enqueue / dequeue</td></tr><tr><td>Used For</td><td>Recursion, parsing, backtracking</td><td>Task scheduling, buffering</td></tr><tr><td>Example</td><td>Undo system</td><td>Printer jobs</td></tr></tbody></table><h4 id="tiny-code-exercise-dual-queue-stack" tabindex="-1">Tiny Code Exercise: Dual Queue-Stack <a class="header-anchor" href="#tiny-code-exercise-dual-queue-stack" aria-label="Permalink to &quot;Tiny Code Exercise: Dual Queue-Stack&quot;">​</a></h4><p>Here’s a minimal snippet that lets you switch between stack and queue mode:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { STACK_MODE, QUEUE_MODE } Mode;</span></span></code></pre></div><p>You could use the same linked list logic but change whether new nodes are added at the head (stack) or tail (queue).</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Stack and queue behavior underlie every major system abstraction:</p><ul><li>CPU scheduling</li><li>IO buffering</li><li>Event loops</li><li>Expression parsing</li><li>Recursive algorithms</li></ul><p>Building them in raw C solidifies your understanding of pointer-based data structures and memory ownership.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Implement<code>is_empty()</code> for both stack and queue.</li><li>Extend the queue to handle strings instead of ints.</li><li>Add a function<code>reverse_queue()</code> using a stack.</li><li>Implement a “bounded queue” that has a fixed maximum size.</li><li>Write a small program simulating customer arrivals using a queue.</li></ol><p>Stacks and queues are the control flow primitives of memory and time. Next, you’ll combine them with hashing and function pointers to build your own hash table, the basis for efficient lookups and symbol tables in C.</p>`,35)])])}const g=n(t,[["render",l]]);export{h as __pageData,g as default};
