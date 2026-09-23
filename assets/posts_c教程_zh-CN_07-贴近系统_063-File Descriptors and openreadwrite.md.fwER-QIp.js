import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"63. 文件描述符和打开/读/写","description":"The Little Book of C 中文版 — 63. 文件描述符和打开/读/写","frontmatter":{"title":"63. 文件描述符和打开/读/写","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 63. 文件描述符和打开/读/写","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":63,"sidebarWeight":63,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/063-File Descriptors and openreadwrite"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite.md","filePath":"posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite.md"};function i(l,s,o,c,d,r){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/063-File Descriptors and openreadwrite)</p><p>现在您可以创建和管理进程了，让我们探讨一下这些进程如何通过文件描述符与文件、设备甚至彼此之间进行通信。</p><p>文件描述符 (FD) 是 Unix 和 C 中最简单但最强大的抽象之一。一切，文件、管道、套接字、终端，都由一个小整数句柄表示。一旦了解了如何打开、读取、写入和关闭文件描述符，您就可以与 Unix 机器上的任何 I/O 系统进行交互。</p><h4 id="步骤-1-什么是文件描述符" tabindex="-1">步骤 1. 什么是文件描述符？ <a class="header-anchor" href="#步骤-1-什么是文件描述符" aria-label="Permalink to &quot;步骤 1. 什么是文件描述符？&quot;">​</a></h4><p>文件描述符是一个整数，用于标识进程中的打开资源。默认情况下，每个进程都以三个打开描述符开始：</p><table tabindex="0"><thead><tr><th>FD</th><th>符号名称</th><th>描述</th></tr></thead><tbody><tr><td>0</td><td><code>STDIN_FILENO</code></td><td>标准输入（键盘）</td></tr><tr><td>1</td><td><code>STDOUT_FILENO</code></td><td>标准输出（屏幕）</td></tr><tr><td>2</td><td><code>STDERR_FILENO</code></td><td>标准错误（屏幕）</td></tr></tbody></table><p>每次打开文件、套接字或管道时，内核都会为您提供最低的未使用 FD。</p><h4 id="步骤-2-使用-open-打开文件" tabindex="-1">步骤 2. 使用 open() 打开文件 <a class="header-anchor" href="#步骤-2-使用-open-打开文件" aria-label="Permalink to &quot;步骤 2. 使用 open() 打开文件&quot;">​</a></h4><p>可以直接使用系统调用层打开文件，而不用<code>fopen()</code>来自工作室。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span><span>     // open</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span><span>    // close, read, write</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span><span>     // perror</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;data.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1) {</span></span>
<span class="line"><span>        perror(&quot;open failed&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;File descriptor: %d\\n&quot;, fd);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc open_demo.c -o open_demo</span></span>
<span class="line"><span>./open_demo</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>File descriptor: 3</span></span></code></pre></div><h4 id="步骤-3-从文件中读取" tabindex="-1">步骤 3. 从文件中读取 <a class="header-anchor" href="#步骤-3-从文件中读取" aria-label="Permalink to &quot;步骤 3. 从文件中读取&quot;">​</a></h4><p><code>read(fd, buffer, size)</code>将原始字节读入内存缓冲区。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;data.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1) return 1;</span></span>
<span class="line"><span>    char buf[64];</span></span>
<span class="line"><span>    ssize_t n = read(fd, buf, sizeof(buf) - 1);</span></span>
<span class="line"><span>    if (n &gt; 0) {</span></span>
<span class="line"><span>        buf[n] = &#39;\\0&#39;;</span></span>
<span class="line"><span>        printf(&quot;Read %zd bytes: %s\\n&quot;, n, buf);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Read 12 bytes: Hello world</span></span></code></pre></div><h4 id="步骤-4-写入文件" tabindex="-1">步骤 4. 写入文件 <a class="header-anchor" href="#步骤-4-写入文件" aria-label="Permalink to &quot;步骤 4. 写入文件&quot;">​</a></h4><p><code>write(fd, buffer, size)</code>将原始字节从内存写入文件描述符。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;out.txt&quot;, O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>    const char msg[] = &quot;Writing from C using write()\\n&quot;;</span></span>
<span class="line"><span>    write(fd, msg, strlen(msg));</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这会覆盖<code>out.txt</code>与您的留言。标志：</p><p>-<code>O_WRONLY</code>→ 只写 -<code>O_CREAT</code>→ 如果不存在则创建 -<code>O_TRUNC</code>→ 截断（清除）现有内容</p><p>最后的论点<code>0644</code>设置 Unix 权限：</p><ul><li>所有者可以读/写，</li><li>团体/其他人可以阅读。</li></ul><h4 id="步骤-5-追加和非阻塞模式" tabindex="-1">步骤 5. 追加和非阻塞模式 <a class="header-anchor" href="#步骤-5-追加和非阻塞模式" aria-label="Permalink to &quot;步骤 5. 追加和非阻塞模式&quot;">​</a></h4><p>您可以使用按位或组合标志：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fd = open(&quot;log.txt&quot;, O_WRONLY | O_CREAT | O_APPEND, 0644);</span></span></code></pre></div><p><code>O_APPEND</code>每次写入之前将文件偏移量移至末尾，非常适合日志。</p><p>您还可以以非阻塞方式打开文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fd = open(&quot;pipe&quot;, O_RDONLY | O_NONBLOCK);</span></span></code></pre></div><p>对于套接字或命名管道上的 I/O 很有用。</p><h4 id="步骤-6-复制描述符" tabindex="-1">步骤 6. 复制描述符 <a class="header-anchor" href="#步骤-6-复制描述符" aria-label="Permalink to &quot;步骤 6. 复制描述符&quot;">​</a></h4><p>您可以使用复制 FD<code>dup()</code>或者<code>dup2()</code>。这就是重定向的工作原理（<code>&gt;</code>在贝壳中）。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;output.txt&quot;, O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>    dup2(fd, STDOUT_FILENO);  // redirect stdout to file</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    printf(&quot;This goes into output.txt!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>后<code>dup2</code>，打印到标准输出的所有内容都会转到<code>output.txt</code>.</p><p>运行并检查：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./redir_demo</span></span>
<span class="line"><span>cat output.txt</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This goes into output.txt!</span></span></code></pre></div><h4 id="步骤-7-偏移量和-lseek" tabindex="-1">步骤 7. 偏移量和 lseek() <a class="header-anchor" href="#步骤-7-偏移量和-lseek" aria-label="Permalink to &quot;步骤 7. 偏移量和 lseek()&quot;">​</a></h4><p>您可以使用以下命令在文件内移动<code>lseek(fd, offset, whence)</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;data.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    lseek(fd, 5, SEEK_SET); // move to byte 5</span></span>
<span class="line"><span>    char buf[16];</span></span>
<span class="line"><span>    read(fd, buf, 10);</span></span>
<span class="line"><span>    buf[10] = &#39;\\0&#39;;</span></span>
<span class="line"><span>    printf(&quot;Chunk: %s\\n&quot;, buf);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>whence</code>可以是：</p><p>-<code>SEEK_SET</code>（从开始） -<code>SEEK_CUR</code>（从当前） -<code>SEEK_END</code>（从末尾开始）</p><h4 id="步骤-8-错误检查和返回值" tabindex="-1">步骤 8. 错误检查和返回值 <a class="header-anchor" href="#步骤-8-错误检查和返回值" aria-label="Permalink to &quot;步骤 8. 错误检查和返回值&quot;">​</a></h4><p>所有系统调用都会返回：</p><ul><li>非负值→成功 -<code>-1</code>→ 错误（检查<code>errno</code>)</li></ul><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;missing.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1)</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Error: %s\\n&quot;, strerror(errno));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Error: No such file or directory</span></span></code></pre></div><h4 id="小代码-使用系统调用复制文件" tabindex="-1">小代码：使用系统调用复制文件 <a class="header-anchor" href="#小代码-使用系统调用复制文件" aria-label="Permalink to &quot;小代码：使用系统调用复制文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int src = open(&quot;source.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    int dst = open(&quot;copy.txt&quot;, O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>    if (src == -1 || dst == -1) {</span></span>
<span class="line"><span>        perror(&quot;open failed&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    char buf[256];</span></span>
<span class="line"><span>    ssize_t n;</span></span>
<span class="line"><span>    while ((n = read(src, buf, sizeof(buf))) &gt; 0)</span></span>
<span class="line"><span>        write(dst, buf, n);</span></span>
<span class="line"><span>    close(src);</span></span>
<span class="line"><span>    close(dst);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc copy.c -o copy</span></span>
<span class="line"><span>./copy</span></span></code></pre></div><p>现在<code>copy.txt</code>与<code>source.txt</code>，使用纯系统调用。</p><h4 id="步骤-9-从-stdin-读取并写入-stdout" tabindex="-1">步骤 9. 从 STDIN 读取并写入 STDOUT <a class="header-anchor" href="#步骤-9-从-stdin-读取并写入-stdout" aria-label="Permalink to &quot;步骤 9. 从 STDIN 读取并写入 STDOUT&quot;">​</a></h4><p>您可以使用<code>read(0, ...)</code>和<code>write(1, ...)</code>直接用于控制台 I/O。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char buf[64];</span></span>
<span class="line"><span>    ssize_t n = read(STDIN_FILENO, buf, sizeof(buf));</span></span>
<span class="line"><span>    write(STDOUT_FILENO, buf, n);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./echo_demo</span></span>
<span class="line"><span>hello world</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hello world</span></span></code></pre></div><p>这是每个 shell 命令的本质。</p><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>文件描述符统一了所有内容的 I/O：</p><ul><li>常规文件</li><li>管道和插座</li><li>设备和终端</li></ul><p>它们可以让您准确控制数据如何流入和流出您的程序，这是系统工具、服务器和操作系统级编程的基础。</p><p>一旦理解了这些原语，您就可以构建自己的工具版本，例如<code>cat</code>,<code>tee</code>，甚至是简单的贝壳。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.写一个迷你<code>cat</code>克隆使用<code>read()</code>和<code>write()</code>. 2. 使用<code>dup2()</code>将 stdout 和 stderr 重定向到文件。 3.使用添加错误消息<code>perror()</code>并处理<code>EINTR</code>. 4. 使用<code>lseek()</code>在打印之前跳过文件的前 N ​​个字节。 5. 实现一个简单的文件追加器<code>O_APPEND</code>.</p><p>接下来，您将使用这些文件描述符来使进程进行通信、构建管道和重定向，这与 shell 用于连接命令的机制相同<code>ls | grep</code>.</p>`,75)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};
