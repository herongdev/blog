import{_ as s,o as n,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"85. Threading with pthreads","description":"The Little Book of C — 85. Threading with pthreads","frontmatter":{"title":"85. Threading with pthreads","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Portable and Modern C"],"description":"The Little Book of C — 85. Threading with pthreads","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":85,"sidebarWeight":85,"lang":"en-US","alternateEn":"/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads","alternateZh":"/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads"},"headers":[],"relativePath":"posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads.md","filePath":"posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads.md"};function i(l,a,r,o,d,c){return n(),e("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads)</p><p>Modern computers run many things at once. Your web browser, text editor, and compiler all share CPU time through threads. In C, the most widely used threading API is POSIX threads, or pthreads. It’s low-level, portable, and gives you fine-grained control over parallel execution.</p><p>This section will teach you how to create, manage, and synchronize threads safely.</p><h4 id="step-1-what-is-a-thread" tabindex="-1">Step 1. What Is a Thread? <a class="header-anchor" href="#step-1-what-is-a-thread" aria-label="Permalink to &quot;Step 1. What Is a Thread?&quot;">​</a></h4><p>A thread is a lightweight execution unit that shares the same memory space as other threads in a process.</p><table tabindex="0"><thead><tr><th>Process</th><th>Thread</th></tr></thead><tbody><tr><td>Has its own memory (stack, heap, code)</td><td>Shares memory with other threads</td></tr><tr><td>Created by OS</td><td>Created by process</td></tr><tr><td>Expensive to start</td><td>Cheap and fast to start</td></tr><tr><td>Communicates via IPC</td><td>Communicates via shared memory</td></tr></tbody></table><p>Threads are ideal for tasks like handling multiple network requests, performing parallel computation, or keeping a UI responsive.</p><h4 id="step-2-including-pthreads" tabindex="-1">Step 2. Including pthreads <a class="header-anchor" href="#step-2-including-pthreads" aria-label="Permalink to &quot;Step 2. Including pthreads&quot;">​</a></h4><p>To use pthreads, include the header:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span></code></pre></div><p>When compiling, link with the pthread library:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc program.c -o program -lpthread</span></span></code></pre></div><h4 id="step-3-creating-threads" tabindex="-1">Step 3. Creating Threads <a class="header-anchor" href="#step-3-creating-threads" aria-label="Permalink to &quot;Step 3. Creating Threads&quot;">​</a></h4><p>Each thread runs a separate function. The function must take and return<code>void *</code>.</p><p>Tiny Code: Basic Thread Creation</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void* task(void* arg) {</span></span>
<span class="line"><span>    printf(&quot;Hello from thread! Arg = %d\\n&quot;, *(int*)arg);</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t thread;</span></span>
<span class="line"><span>    int value = 42;</span></span>
<span class="line"><span>    pthread_create(&amp;thread, NULL, task, &amp;value);</span></span>
<span class="line"><span>    pthread_join(thread, NULL);</span></span>
<span class="line"><span>    printf(&quot;Main thread finished.\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello from thread! Arg = 42</span></span>
<span class="line"><span>Main thread finished.</span></span></code></pre></div><p>Explanation:</p><ul><li><code>pthread_create</code> starts a new thread.</li><li><code>pthread_join</code> waits for it to finish.</li></ul><h4 id="step-4-multiple-threads" tabindex="-1">Step 4. Multiple Threads <a class="header-anchor" href="#step-4-multiple-threads" aria-label="Permalink to &quot;Step 4. Multiple Threads&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void* work(void* arg) {</span></span>
<span class="line"><span>    int id = *(int*)arg;</span></span>
<span class="line"><span>    printf(&quot;Thread %d running\\n&quot;, id);</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t threads[3];</span></span>
<span class="line"><span>    int ids[] = {1, 2, 3};</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 3; i++)</span></span>
<span class="line"><span>        pthread_create(&amp;threads[i], NULL, work, &amp;ids[i]);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 3; i++)</span></span>
<span class="line"><span>        pthread_join(threads[i], NULL);</span></span>
<span class="line"><span>    printf(&quot;All threads done.\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output order may vary, threads run concurrently.</p><h4 id="step-5-race-conditions" tabindex="-1">Step 5. Race Conditions <a class="header-anchor" href="#step-5-race-conditions" aria-label="Permalink to &quot;Step 5. Race Conditions&quot;">​</a></h4><p>When two threads modify the same variable at the same time, bad things happen. This is called a race condition.</p><p>Example (unsafe):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int counter = 0;</span></span>
<span class="line"><span>void* increment(void* arg) {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 100000; i++)</span></span>
<span class="line"><span>        counter++;</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t t1, t2;</span></span>
<span class="line"><span>    pthread_create(&amp;t1, NULL, increment, NULL);</span></span>
<span class="line"><span>    pthread_create(&amp;t2, NULL, increment, NULL);</span></span>
<span class="line"><span>    pthread_join(t1, NULL);</span></span>
<span class="line"><span>    pthread_join(t2, NULL);</span></span>
<span class="line"><span>    printf(&quot;Counter = %d\\n&quot;, counter);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Expected:<code>200000</code> Actual: unpredictable (e.g.<code>137421</code>), because increments overlap.</p><h4 id="step-6-using-mutexes-mutual-exclusion-locks" tabindex="-1">Step 6. Using Mutexes (Mutual Exclusion Locks) <a class="header-anchor" href="#step-6-using-mutexes-mutual-exclusion-locks" aria-label="Permalink to &quot;Step 6. Using Mutexes (Mutual Exclusion Locks)&quot;">​</a></h4><p>A mutex ensures that only one thread modifies shared data at a time.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int counter = 0;</span></span>
<span class="line"><span>pthread_mutex_t lock;</span></span>
<span class="line"><span>void* increment(void* arg) {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 100000; i++) {</span></span>
<span class="line"><span>        pthread_mutex_lock(&amp;lock);</span></span>
<span class="line"><span>        counter++;</span></span>
<span class="line"><span>        pthread_mutex_unlock(&amp;lock);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t t1, t2;</span></span>
<span class="line"><span>    pthread_mutex_init(&amp;lock, NULL);</span></span>
<span class="line"><span>    pthread_create(&amp;t1, NULL, increment, NULL);</span></span>
<span class="line"><span>    pthread_create(&amp;t2, NULL, increment, NULL);</span></span>
<span class="line"><span>    pthread_join(t1, NULL);</span></span>
<span class="line"><span>    pthread_join(t2, NULL);</span></span>
<span class="line"><span>    pthread_mutex_destroy(&amp;lock);</span></span>
<span class="line"><span>    printf(&quot;Counter = %d\\n&quot;, counter);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now the output will consistently be<code>200000</code>.</p><h4 id="step-7-condition-variables" tabindex="-1">Step 7. Condition Variables <a class="header-anchor" href="#step-7-condition-variables" aria-label="Permalink to &quot;Step 7. Condition Variables&quot;">​</a></h4><p>Condition variables let threads wait for a signal. They’re used to coordinate producer–consumer models.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>pthread_mutex_t lock;</span></span>
<span class="line"><span>pthread_cond_t cond;</span></span>
<span class="line"><span>int ready = 0;</span></span>
<span class="line"><span>void* worker(void* arg) {</span></span>
<span class="line"><span>    pthread_mutex_lock(&amp;lock);</span></span>
<span class="line"><span>    while (!ready)</span></span>
<span class="line"><span>        pthread_cond_wait(&amp;cond, &amp;lock);</span></span>
<span class="line"><span>    printf(&quot;Worker got the signal!\\n&quot;);</span></span>
<span class="line"><span>    pthread_mutex_unlock(&amp;lock);</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t t;</span></span>
<span class="line"><span>    pthread_mutex_init(&amp;lock, NULL);</span></span>
<span class="line"><span>    pthread_cond_init(&amp;cond, NULL);</span></span>
<span class="line"><span>    pthread_create(&amp;t, NULL, worker, NULL);</span></span>
<span class="line"><span>    sleep(1);</span></span>
<span class="line"><span>    pthread_mutex_lock(&amp;lock);</span></span>
<span class="line"><span>    ready = 1;</span></span>
<span class="line"><span>    pthread_cond_signal(&amp;cond);</span></span>
<span class="line"><span>    pthread_mutex_unlock(&amp;lock);</span></span>
<span class="line"><span>    pthread_join(t, NULL);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-8-thread-attributes" tabindex="-1">Step 8. Thread Attributes <a class="header-anchor" href="#step-8-thread-attributes" aria-label="Permalink to &quot;Step 8. Thread Attributes&quot;">​</a></h4><p>You can control thread behavior using<code>pthread_attr_t</code>:</p><ul><li>Stack size</li><li>Detach state (joinable or detached)</li><li>Scheduling policy</li></ul><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pthread_attr_t attr;</span></span>
<span class="line"><span>pthread_attr_init(&amp;attr);</span></span>
<span class="line"><span>pthread_attr_setdetachstate(&amp;attr, PTHREAD_CREATE_DETACHED);</span></span>
<span class="line"><span>pthread_create(&amp;thread, &amp;attr, task, NULL);</span></span>
<span class="line"><span>pthread_attr_destroy(&amp;attr);</span></span></code></pre></div><p>Detached threads free resources automatically when done.</p><h4 id="step-9-thread-safety-and-best-practices" tabindex="-1">Step 9. Thread Safety and Best Practices <a class="header-anchor" href="#step-9-thread-safety-and-best-practices" aria-label="Permalink to &quot;Step 9. Thread Safety and Best Practices&quot;">​</a></h4><ul><li>Protect all shared data with mutexes.</li><li>Avoid global variables when possible.</li><li>Use thread-safe functions (<code>strtok_r</code> instead of<code>strtok</code>).</li><li>Keep critical sections short.</li><li>Join or detach all threads before program exit.</li></ul><h4 id="step-10-tiny-code-parallel-sum" tabindex="-1">Step 10. Tiny Code: Parallel Sum <a class="header-anchor" href="#step-10-tiny-code-parallel-sum" aria-label="Permalink to &quot;Step 10. Tiny Code: Parallel Sum&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#define N 4</span></span>
<span class="line"><span>int partial[4];</span></span>
<span class="line"><span>void* compute(void* arg) {</span></span>
<span class="line"><span>    int id = *(int*)arg;</span></span>
<span class="line"><span>    int start = id * 25;</span></span>
<span class="line"><span>    int sum = 0;</span></span>
<span class="line"><span>    for (int i = start; i &lt; start + 25; i++)</span></span>
<span class="line"><span>        sum += i;</span></span>
<span class="line"><span>    partial[id] = sum;</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pthread_t threads[N];</span></span>
<span class="line"><span>    int ids[N];</span></span>
<span class="line"><span>    for (int i = 0; i &lt; N; i++) {</span></span>
<span class="line"><span>        ids[i] = i;</span></span>
<span class="line"><span>        pthread_create(&amp;threads[i], NULL, compute, &amp;ids[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    int total = 0;</span></span>
<span class="line"><span>    for (int i = 0; i &lt; N; i++) {</span></span>
<span class="line"><span>        pthread_join(threads[i], NULL);</span></span>
<span class="line"><span>        total += partial[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Total sum = %d\\n&quot;, total);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This program splits a task across multiple threads and combines results.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Threads make your programs faster, more responsive, and scalable. They allow C to fully exploit modern multi-core CPUs, from servers to embedded systems. Learning pthreads means learning how real systems multitask efficiently and safely.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a program that starts 5 threads, each printing its ID.</li><li>Add a shared counter and protect it with a mutex.</li><li>Implement a producer–consumer queue using condition variables.</li><li>Use<code>pthread_attr_t</code> to create detached worker threads.</li><li>Profile your program’s performance as you increase the thread count.</li></ol><p>Next, you’ll explore atomic operations and memory models, how modern CPUs ensure consistency when multiple threads share data without locks.</p>`,51)])])}const m=s(p,[["render",i]]);export{u as __pageData,m as default};
