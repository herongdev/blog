import{_ as a,o as s,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"36. Linked Lists from Scratch","description":"The Little Book of C — 36. Linked Lists from Scratch","frontmatter":{"title":"36. Linked Lists from Scratch","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 36. Linked Lists from Scratch","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":36,"sidebarWeight":36,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch","alternateZh":"/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch.md","filePath":"posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch.md"};function p(l,n,o,r,d,c){return s(),e("div",null,[...n[0]||(n[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch)</p><p>Now that you understand how to group data with<code>struct</code>, it’s time to make it dynamic. A linked list is one of the most fundamental data structures in C, built entirely with pointers and structs. It teaches you how memory, pointers, and iteration really work.</p><h4 id="what-is-a-linked-list" tabindex="-1">What Is a Linked List? <a class="header-anchor" href="#what-is-a-linked-list" aria-label="Permalink to &quot;What Is a Linked List?&quot;">​</a></h4><p>A linked list is a collection of nodes, where each node stores:</p><ol><li>Data (of any type you choose), and</li><li>A pointer to the next node.</li></ol><p>Unlike arrays, linked lists aren’t fixed in size, you can add or remove nodes anytime without reallocating large blocks of memory.</p><h4 id="basic-node-structure" tabindex="-1">Basic Node Structure <a class="header-anchor" href="#basic-node-structure" aria-label="Permalink to &quot;Basic Node Structure&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>This defines a “node” that holds an integer and a pointer to the next node in the list. If<code>next</code> is<code>NULL</code>, it’s the end of the list.</p><h4 id="creating-and-traversing-a-linked-list" tabindex="-1">Creating and Traversing a Linked List <a class="header-anchor" href="#creating-and-traversing-a-linked-list" aria-label="Permalink to &quot;Creating and Traversing a Linked List&quot;">​</a></h4><p>Let’s build a simple three-node list:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10 20 30</span></span></code></pre></div><h4 id="tiny-code-build-insert-delete" tabindex="-1">Tiny Code: Build, Insert, Delete <a class="header-anchor" href="#tiny-code-build-insert-delete" aria-label="Permalink to &quot;Tiny Code: Build, Insert, Delete&quot;">​</a></h4><p>Let’s make it reusable, define helper functions for common operations.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Linked list contents:</span></span>
<span class="line"><span>5 -&gt; 10 -&gt; 15 -&gt; NULL</span></span></code></pre></div><h4 id="why-use-linked-lists" tabindex="-1">Why Use Linked Lists? <a class="header-anchor" href="#why-use-linked-lists" aria-label="Permalink to &quot;Why Use Linked Lists?&quot;">​</a></h4><ul><li>Dynamic size: Easily grow or shrink as needed.</li><li>Efficient insertions and deletions: No need to shift elements as in arrays.</li><li>Great for learning memory handling: You directly allocate and free each node.</li></ul><p>But they also have trade-offs:</p><ul><li>Slower random access (must traverse from the head).</li><li>Slightly higher memory usage due to pointer fields.</li></ul><h4 id="variants-you-ll-meet-later" tabindex="-1">Variants You’ll Meet Later <a class="header-anchor" href="#variants-you-ll-meet-later" aria-label="Permalink to &quot;Variants You’ll Meet Later&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>Singly Linked List</td><td>Each node points to the next one (like above).</td></tr><tr><td>Doubly Linked List</td><td>Each node has<code>prev</code> and<code>next</code> pointers.</td></tr><tr><td>Circular Linked List</td><td>The last node links back to the first.</td></tr><tr><td>Sentinel List</td><td>Uses dummy head/tail nodes to simplify logic.</td></tr></tbody></table><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Linked lists are a window into manual memory management, you handle creation, traversal, and cleanup. They’re used in:</p><ul><li>Kernels (e.g., Linux<code>list_head</code>)</li><li>Compilers (symbol tables, token streams)</li><li>Dynamic containers (queues, allocators)</li></ul><p>You’re not just learning a data structure, you’re learning how to think in pointers.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Implement a function<code>int length(Node *head)</code> that counts the number of nodes.</li><li>Write<code>insert_front()</code> and<code>insert_after()</code> functions.</li><li>Implement a<code>find()</code> function that returns a pointer to a node with a given value.</li><li>Modify the<code>delete_list()</code> function to print which node is being freed.</li><li>Extend the struct to include a<code>char name[20]</code> and print both the name and value.</li></ol><p>You’ve now built one of the most essential dynamic structures in computer science, entirely from scratch. Next, you’ll build on this foundation to create stacks and queues, two of the most common and useful data abstractions in systems programming.</p>`,32)])])}const m=a(i,[["render",p]]);export{h as __pageData,m as default};
