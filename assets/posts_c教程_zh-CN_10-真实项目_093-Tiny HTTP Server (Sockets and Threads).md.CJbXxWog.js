import{_ as n,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"93. 微型 HTTP 服务器（套接字和线程）","description":"The Little Book of C 中文版 — 93. 微型 HTTP 服务器（套接字和线程）","frontmatter":{"title":"93. 微型 HTTP 服务器（套接字和线程）","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 93. 微型 HTTP 服务器（套接字和线程）","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":93,"sidebarWeight":93,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads)","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads)"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads).md","filePath":"posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads).md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads).md"};function t(i,s,c,o,d,r){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads))</p><p>现在您已经知道如何构建命令行工具了，是时候让您的程序与网络对话了。在本节中，您将构建一个小型多线程 HTTP 服务器，这是网络驱动力的一个小型、最小的克隆。</p><p>您将学习套接字、线程、请求解析和响应生成，所有这些都是从第一原理开始的。</p><h4 id="步骤-1-目标" tabindex="-1">步骤 1. 目标 <a class="header-anchor" href="#步骤-1-目标" aria-label="Permalink to &quot;步骤 1. 目标&quot;">​</a></h4><p>我们将创建一个简单的 HTTP 服务器：</p><ul><li>监听端口<code>8080</code></li><li>接受多个连接（每个线程一个）</li><li>解析最小的 HTTP 请求</li><li>使用静态 HTML 页面进行响应</li></ul><p>该项目结合了文件 I/O、网络和并发性，这三个 C 最强大的功能。</p><h4 id="步骤-2-项目布局" tabindex="-1">步骤 2. 项目布局 <a class="header-anchor" href="#步骤-2-项目布局" aria-label="Permalink to &quot;步骤 2. 项目布局&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tinyhttp/</span></span>
<span class="line"><span> ├── server.c</span></span>
<span class="line"><span> ├── Makefile</span></span>
<span class="line"><span> └── index.html</span></span></code></pre></div><h4 id="第三步-核心理念" tabindex="-1">第三步：核心理念 <a class="header-anchor" href="#第三步-核心理念" aria-label="Permalink to &quot;第三步：核心理念&quot;">​</a></h4><p>服务器将：</p><p>1.创建一个socket并将其绑定到8080端口。 2. 监听连接。 3. 接受客户。 4. 在新线程中处理请求。 5. 发送 HTTP 响应。 6. 关闭插座并重复。</p><h4 id="步骤-4-小代码-server-c" tabindex="-1">步骤 4. 小代码：server.c <a class="header-anchor" href="#步骤-4-小代码-server-c" aria-label="Permalink to &quot;步骤 4. 小代码：server.c&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;arpa/inet.h&gt;</span></span>
<span class="line"><span>#include &lt;pthread.h&gt;</span></span>
<span class="line"><span>#define PORT 8080</span></span>
<span class="line"><span>#define BUF_SIZE 4096</span></span>
<span class="line"><span>void *handle_client(void *arg) {</span></span>
<span class="line"><span>    int client_fd = *(int *)arg;</span></span>
<span class="line"><span>    free(arg);</span></span>
<span class="line"><span>    char buffer[BUF_SIZE];</span></span>
<span class="line"><span>    int bytes = read(client_fd, buffer, sizeof(buffer) - 1);</span></span>
<span class="line"><span>    if (bytes &lt;= 0) {</span></span>
<span class="line"><span>        close(client_fd);</span></span>
<span class="line"><span>        return NULL;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    buffer[bytes] = &#39;\\0&#39;;</span></span>
<span class="line"><span>    // Basic HTTP response</span></span>
<span class="line"><span>    const char *body = &quot;&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello from TinyHTTP!&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;&quot;;</span></span>
<span class="line"><span>    char response[BUF_SIZE];</span></span>
<span class="line"><span>    snprintf(response, sizeof(response),</span></span>
<span class="line"><span>        &quot;HTTP/1.1 200 OK\\r\\n&quot;</span></span>
<span class="line"><span>        &quot;Content-Type: text/html\\r\\n&quot;</span></span>
<span class="line"><span>        &quot;Content-Length: %zu\\r\\n&quot;</span></span>
<span class="line"><span>        &quot;Connection: close\\r\\n\\r\\n&quot;</span></span>
<span class="line"><span>        &quot;%s&quot;, strlen(body), body);</span></span>
<span class="line"><span>    write(client_fd, response, strlen(response));</span></span>
<span class="line"><span>    close(client_fd);</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int server_fd = socket(AF_INET, SOCK_STREAM, 0);</span></span>
<span class="line"><span>    if (server_fd == -1) {</span></span>
<span class="line"><span>        perror(&quot;socket failed&quot;);</span></span>
<span class="line"><span>        exit(EXIT_FAILURE);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    int opt = 1;</span></span>
<span class="line"><span>    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &amp;opt, sizeof(opt));</span></span>
<span class="line"><span>    struct sockaddr_in addr = {0};</span></span>
<span class="line"><span>    addr.sin_family = AF_INET;</span></span>
<span class="line"><span>    addr.sin_addr.s_addr = INADDR_ANY;</span></span>
<span class="line"><span>    addr.sin_port = htons(PORT);</span></span>
<span class="line"><span>    if (bind(server_fd, (struct sockaddr *)&amp;addr, sizeof(addr)) &lt; 0) {</span></span>
<span class="line"><span>        perror(&quot;bind failed&quot;);</span></span>
<span class="line"><span>        close(server_fd);</span></span>
<span class="line"><span>        exit(EXIT_FAILURE);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (listen(server_fd, 10) &lt; 0) {</span></span>
<span class="line"><span>        perror(&quot;listen failed&quot;);</span></span>
<span class="line"><span>        close(server_fd);</span></span>
<span class="line"><span>        exit(EXIT_FAILURE);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;TinyHTTP running on http://localhost:%d\\n&quot;, PORT);</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        int client_fd;</span></span>
<span class="line"><span>        struct sockaddr_in client;</span></span>
<span class="line"><span>        socklen_t len = sizeof(client);</span></span>
<span class="line"><span>        client_fd = accept(server_fd, (struct sockaddr *)&amp;client, &amp;len);</span></span>
<span class="line"><span>        if (client_fd &lt; 0) {</span></span>
<span class="line"><span>            perror(&quot;accept failed&quot;);</span></span>
<span class="line"><span>            continue;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        int *pclient = malloc(sizeof(int));</span></span>
<span class="line"><span>        *pclient = client_fd;</span></span>
<span class="line"><span>        pthread_t tid;</span></span>
<span class="line"><span>        pthread_create(&amp;tid, NULL, handle_client, pclient);</span></span>
<span class="line"><span>        pthread_detach(tid);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    close(server_fd);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-5-构建并运行" tabindex="-1">步骤 5. 构建并运行 <a class="header-anchor" href="#步骤-5-构建并运行" aria-label="Permalink to &quot;步骤 5. 构建并运行&quot;">​</a></h4><p>生成文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -std=c23 -pthread -O2 -Wall -Wextra</span></span>
<span class="line"><span>all: server</span></span>
<span class="line"><span>server: server.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) server.c -o server</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f server</span></span></code></pre></div><p>构建并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>./server</span></span></code></pre></div><p>打开浏览器并访问：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://localhost:8080</span></span></code></pre></div><p>你应该看到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello from TinyHTTP!</span></span></code></pre></div><h4 id="步骤-6-工作原理" tabindex="-1">步骤 6. 工作原理 <a class="header-anchor" href="#步骤-6-工作原理" aria-label="Permalink to &quot;步骤 6. 工作原理&quot;">​</a></h4><p>套接字设置：服务器创建一个 TCP 套接字（<code>socket()</code>），将其绑定到端口 8080 并监听。</p><p>Accept循环：主线程等待连接。</p><p>线程：每个连接都由一个新线程处理（<code>pthread_create</code>），同时允许多个客户端。</p><p>HTTP 解析：最少，仅读取请求标头，暂时忽略其余部分。</p><p>响应：静态 HTML 主体被写入套接字。</p><p>清理：每个线程在响应后关闭其客户端套接字。</p><h4 id="第-7-步-扩展它" tabindex="-1">第 7 步：扩展它 <a class="header-anchor" href="#第-7-步-扩展它" aria-label="Permalink to &quot;第 7 步：扩展它&quot;">​</a></h4><p>为了使其更真实，请添加：</p><p>提供静态文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *f = fopen(&quot;index.html&quot;, &quot;r&quot;);</span></span></code></pre></div><p>解析请求的第一行以获取路径。</p><p>如果文件不存在则返回 404。</p><p>添加 MIME 类型<code>.html</code>,<code>.css</code>,<code>.js</code>,<code>.png</code>.</p><p>添加带有时间戳的日志记录。</p><h4 id="步骤-8-跨平台注释" tabindex="-1">步骤 8. 跨平台注释 <a class="header-anchor" href="#步骤-8-跨平台注释" aria-label="Permalink to &quot;步骤 8. 跨平台注释&quot;">​</a></h4><ul><li>使用<code>#ifdef _WIN32</code>包括<code>&lt;winsock2.h&gt;</code>并初始化<code>WSAStartup()</code>.</li><li>代替<code>close()</code>和<code>closesocket()</code>在 Windows 上。</li><li>使用来自的线程<code>&lt;threads.h&gt;</code>仅适用于 C11 版本。</li></ul><h4 id="第-9-步-为什么它很重要" tabindex="-1">第 9 步：为什么它很重要 <a class="header-anchor" href="#第-9-步-为什么它很重要" aria-label="Permalink to &quot;第 9 步：为什么它很重要&quot;">​</a></h4><p>从头开始构建 HTTP 服务器将教会您 Web 的真正工作原理：</p><ul><li>套接字：所有网络软件的基础。</li><li>并发：如何同时处理多个用户。</li><li>协议：了解请求/响应格式。</li><li>系统思考：干净地组合多个低级 C 功能。</li></ul><p>您不再只是编写程序，而是在塑造机器之间的通信。</p><h4 id="第-10-步-亲自尝试一下" tabindex="-1">第 10 步：亲自尝试一下 <a class="header-anchor" href="#第-10-步-亲自尝试一下" aria-label="Permalink to &quot;第 10 步：亲自尝试一下&quot;">​</a></h4><ol><li>为每个客户端连接添加日志记录。</li><li>提供静态文件（<code>index.html</code>,<code>style.css</code>).</li><li>实施<code>/time</code>返回系统时间的端点。</li><li>基准测试<code>curl</code>或者<code>ab</code>.</li><li>扩展到HTTP/1.1持久连接。</li></ol><p>接下来，您将构建 94. 一个简单的键值存储，您将在其中学习基于文件的持久性、索引和序列化，这是用纯 C 编写数据库的第一步。</p>`,47)])])}const T=n(l,[["render",t]]);export{u as __pageData,T as default};
