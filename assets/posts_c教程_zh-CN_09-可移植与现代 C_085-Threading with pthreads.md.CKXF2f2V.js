import{_ as n,o as s,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"85. 使用 pthread 进行线程处理","description":"The Little Book of C 中文版 — 85. 使用 pthread 进行线程处理","frontmatter":{"title":"85. 使用 pthread 进行线程处理","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","09-可移植与现代 C","中文"],"description":"The Little Book of C 中文版 — 85. 使用 pthread 进行线程处理","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":85,"sidebarWeight":85,"alternateZh":"/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads","alternateEn":"/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads"},"headers":[],"relativePath":"posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads.md","filePath":"posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads.md"};function i(l,a,d,c,r,o){return s(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads)</p><p>现代计算机同时运行许多东西。您的 Web 浏览器、文本编辑器和编译器都通过线程共享 CPU 时间。在 C 语言中，最广泛使用的线程 API 是 POSIX 线程，或 pthreads。它是低级的、可移植的，并为您提供对并行执行的细粒度控制。</p><p>本节将教您如何安全地创建、管理和同步线程。</p><h4 id="步骤-1-什么是线程" tabindex="-1">步骤 1. 什么是线程？ <a class="header-anchor" href="#步骤-1-什么是线程" aria-label="Permalink to &quot;步骤 1. 什么是线程？&quot;">​</a></h4><p>线程是一个轻量级的执行单元，与进程中的其他线程共享相同的内存空间。</p><table tabindex="0"><thead><tr><th>流程</th><th>主题</th></tr></thead><tbody><tr><td>拥有自己的内存（栈、堆、代码）</td><td>与其他线程共享内存</td></tr><tr><td>由操作系统创建</td><td>由进程创建</td></tr><tr><td>起步贵</td><td>便宜且快速启动</td></tr><tr><td>通过IPC通讯</td><td>通过共享内存进行通信</td></tr></tbody></table><p>线程非常适合处理多个网络请求、执行并行计算或保持 UI 响应等任务。</p><h4 id="步骤-2-包括-pthreads" tabindex="-1">步骤 2. 包括 pthreads <a class="header-anchor" href="#步骤-2-包括-pthreads" aria-label="Permalink to &quot;步骤 2. 包括 pthreads&quot;">​</a></h4><p>要使用 pthreads，请包含标头：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span></code></pre></div><p>编译时，链接pthread库：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc program.c -o program -lpthread</span></span></code></pre></div><h4 id="步骤-3-创建线程" tabindex="-1">步骤 3. 创建线程 <a class="header-anchor" href="#步骤-3-创建线程" aria-label="Permalink to &quot;步骤 3. 创建线程&quot;">​</a></h4><p>每个线程运行一个单独的函数。该函数必须接受并返回<code>void *</code>.</p><p>小代码：基本线程创建</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello from thread! Arg = 42</span></span>
<span class="line"><span>Main thread finished.</span></span></code></pre></div><p>解释：</p><p>-<code>pthread_create</code>启动一个新线程。 -<code>pthread_join</code>等待它完成。</p><h4 id="步骤-4-多线程" tabindex="-1">步骤 4. 多线程 <a class="header-anchor" href="#步骤-4-多线程" aria-label="Permalink to &quot;步骤 4. 多线程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出顺序可能会有所不同，线程同时运行。</p><h4 id="步骤-5-竞争条件" tabindex="-1">步骤 5. 竞争条件 <a class="header-anchor" href="#步骤-5-竞争条件" aria-label="Permalink to &quot;步骤 5. 竞争条件&quot;">​</a></h4><p>当两个线程同时修改同一个变量时，就会发生不好的事情。这称为竞争条件。</p><p>示例（不安全）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>预期的：<code>200000</code>实际：不可预测（例如<code>137421</code>），因为增量重叠。</p><h4 id="步骤-6-使用互斥锁-互斥锁" tabindex="-1">步骤 6. 使用互斥锁（互斥锁） <a class="header-anchor" href="#步骤-6-使用互斥锁-互斥锁" aria-label="Permalink to &quot;步骤 6. 使用互斥锁（互斥锁）&quot;">​</a></h4><p>互斥体确保一次只有一个线程修改共享数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>现在输出将始终是<code>200000</code>.</p><h4 id="步骤-7-条件变量" tabindex="-1">步骤 7. 条件变量 <a class="header-anchor" href="#步骤-7-条件变量" aria-label="Permalink to &quot;步骤 7. 条件变量&quot;">​</a></h4><p>条件变量让线程等待信号。它们用于协调生产者-消费者模型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-8-线程属性" tabindex="-1">步骤 8. 线程属性 <a class="header-anchor" href="#步骤-8-线程属性" aria-label="Permalink to &quot;步骤 8. 线程属性&quot;">​</a></h4><p>您可以使用控制线程行为<code>pthread_attr_t</code>:</p><ul><li>堆栈大小</li><li>分离状态（可连接或分离）</li><li>调度策略</li></ul><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pthread_attr_t attr;</span></span>
<span class="line"><span>pthread_attr_init(&amp;attr);</span></span>
<span class="line"><span>pthread_attr_setdetachstate(&amp;attr, PTHREAD_CREATE_DETACHED);</span></span>
<span class="line"><span>pthread_create(&amp;thread, &amp;attr, task, NULL);</span></span>
<span class="line"><span>pthread_attr_destroy(&amp;attr);</span></span></code></pre></div><p>分离线程完成后会自动释放资源。</p><h4 id="步骤-9-线程安全和最佳实践" tabindex="-1">步骤 9. 线程安全和最佳实践 <a class="header-anchor" href="#步骤-9-线程安全和最佳实践" aria-label="Permalink to &quot;步骤 9. 线程安全和最佳实践&quot;">​</a></h4><ul><li>使用互斥体保护所有共享数据。</li><li>尽可能避免全局变量。</li><li>使用线程安全函数（<code>strtok_r</code>而不是<code>strtok</code>).</li><li>保持关键部分简短。</li><li>在程序退出之前加入或分离所有线程。</li></ul><h4 id="步骤-10-小代码-并行求和" tabindex="-1">步骤 10. 小代码：并行求和 <a class="header-anchor" href="#步骤-10-小代码-并行求和" aria-label="Permalink to &quot;步骤 10. 小代码：并行求和&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;pthread.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>该程序将任务拆分为多个线程并组合结果。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>线程使您的程序更快、响应更灵敏且可扩展。它们允许 C 语言充分利用现代多核 CPU，从服务器到嵌入式系统。学习 pthread 意味着了解真实系统如何高效、安全地执行多任务。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个程序，启动 5 个线程，每个线程打印其 ID。</li><li>添加一个共享计数器并用互斥体保护它。</li><li>使用条件变量实现生产者-消费者队列。</li><li>使用<code>pthread_attr_t</code>创建分离的工作线程。</li><li>随着线程数的增加，分析程序的性能。</li></ol><p>接下来，您将探索原子操作和内存模型，以及现代 CPU 如何在多个线程共享无锁数据时确保一致性。</p>`,51)])])}const g=n(t,[["render",i]]);export{u as __pageData,g as default};
