import{_ as n,o as a,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"93. Tiny HTTP Server (Sockets and Threads)","description":"The Little Book of C — 93. Tiny HTTP Server (Sockets and Threads)","frontmatter":{"title":"93. Tiny HTTP Server (Sockets and Threads)","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 93. Tiny HTTP Server (Sockets and Threads)","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":93,"sidebarWeight":93,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads)","alternateZh":"/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads)"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads).md","filePath":"posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads).md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads).md"};function l(i,s,o,r,c,d){return a(),e("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads))</p><p>Now that you know how to build command-line tools, it’s time to make your program talk to the network. In this section, you’ll build a tiny multithreaded HTTP server, a small, minimal clone of what powers the web.</p><p>You’ll learn sockets, threading, request parsing, and response generation, all from first principles.</p><h4 id="step-1-the-goal" tabindex="-1">Step 1. The Goal <a class="header-anchor" href="#step-1-the-goal" aria-label="Permalink to &quot;Step 1. The Goal&quot;">​</a></h4><p>We’ll create a simple HTTP server that:</p><ul><li>Listens on port<code>8080</code></li><li>Accepts multiple connections (one per thread)</li><li>Parses a minimal HTTP request</li><li>Responds with a static HTML page</li></ul><p>This project combines file I/O, networking, and concurrency, three of C’s most powerful capabilities.</p><h4 id="step-2-project-layout" tabindex="-1">Step 2. Project Layout <a class="header-anchor" href="#step-2-project-layout" aria-label="Permalink to &quot;Step 2. Project Layout&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tinyhttp/</span></span>
<span class="line"><span> ├── server.c</span></span>
<span class="line"><span> ├── Makefile</span></span>
<span class="line"><span> └── index.html</span></span></code></pre></div><h4 id="step-3-the-core-idea" tabindex="-1">Step 3. The Core Idea <a class="header-anchor" href="#step-3-the-core-idea" aria-label="Permalink to &quot;Step 3. The Core Idea&quot;">​</a></h4><p>The server will:</p><ol><li>Create a socket and bind it to port 8080.</li><li>Listen for connections.</li><li>Accept a client.</li><li>Handle the request in a new thread.</li><li>Send an HTTP response.</li><li>Close the socket and repeat.</li></ol><h4 id="step-4-tiny-code-server-c" tabindex="-1">Step 4. Tiny Code: server.c <a class="header-anchor" href="#step-4-tiny-code-server-c" aria-label="Permalink to &quot;Step 4. Tiny Code: server.c&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-5-build-and-run" tabindex="-1">Step 5. Build and Run <a class="header-anchor" href="#step-5-build-and-run" aria-label="Permalink to &quot;Step 5. Build and Run&quot;">​</a></h4><p>Makefile</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -std=c23 -pthread -O2 -Wall -Wextra</span></span>
<span class="line"><span>all: server</span></span>
<span class="line"><span>server: server.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) server.c -o server</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f server</span></span></code></pre></div><p>Build and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>./server</span></span></code></pre></div><p>Open your browser and visit:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://localhost:8080</span></span></code></pre></div><p>You should see:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello from TinyHTTP!</span></span></code></pre></div><h4 id="step-6-how-it-works" tabindex="-1">Step 6. How It Works <a class="header-anchor" href="#step-6-how-it-works" aria-label="Permalink to &quot;Step 6. How It Works&quot;">​</a></h4><p>Socket setup: The server creates a TCP socket (<code>socket()</code>), binds it to port 8080, and listens.</p><p>Accept loop: The main thread waits for connections.</p><p>Threading: Each connection is handled by a new thread (<code>pthread_create</code>), allowing multiple clients at once.</p><p>HTTP parsing: Minimal, just reads the request header and ignores the rest for now.</p><p>Response: A static HTML body is written to the socket.</p><p>Cleanup: Each thread closes its client socket after responding.</p><h4 id="step-7-extend-it" tabindex="-1">Step 7. Extend It <a class="header-anchor" href="#step-7-extend-it" aria-label="Permalink to &quot;Step 7. Extend It&quot;">​</a></h4><p>To make it more realistic, add:</p><p>Serve static files:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *f = fopen(&quot;index.html&quot;, &quot;r&quot;);</span></span></code></pre></div><p>Parse the first line of the request to get the path.</p><p>Return 404 if the file doesn’t exist.</p><p>Add MIME types for<code>.html</code>,<code>.css</code>,<code>.js</code>,<code>.png</code>.</p><p>Add logging with timestamps.</p><h4 id="step-8-cross-platform-notes" tabindex="-1">Step 8. Cross-Platform Notes <a class="header-anchor" href="#step-8-cross-platform-notes" aria-label="Permalink to &quot;Step 8. Cross-Platform Notes&quot;">​</a></h4><ul><li>Use<code>#ifdef _WIN32</code> to include<code>&lt;winsock2.h&gt;</code> and initialize with<code>WSAStartup()</code>.</li><li>Replace<code>close()</code> with<code>closesocket()</code> on Windows.</li><li>Use threads from<code>&lt;threads.h&gt;</code> for C11-only builds.</li></ul><h4 id="step-9-why-it-matters" tabindex="-1">Step 9. Why It Matters <a class="header-anchor" href="#step-9-why-it-matters" aria-label="Permalink to &quot;Step 9. Why It Matters&quot;">​</a></h4><p>Building an HTTP server from scratch teaches you how the web really works:</p><ul><li>Sockets: the foundation of all network software.</li><li>Concurrency: how to handle many users at once.</li><li>Protocols: understanding request/response formats.</li><li>Systems thinking: combining multiple low-level C features cleanly.</li></ul><p>You’re no longer just writing programs, you’re shaping communication between machines.</p><h4 id="step-10-try-it-yourself" tabindex="-1">Step 10. Try It Yourself <a class="header-anchor" href="#step-10-try-it-yourself" aria-label="Permalink to &quot;Step 10. Try It Yourself&quot;">​</a></h4><ol><li>Add logging for each client connection.</li><li>Serve static files (<code>index.html</code>,<code>style.css</code>).</li><li>Implement a<code>/time</code> endpoint returning the system time.</li><li>Benchmark with<code>curl</code> or<code>ab</code>.</li><li>Extend to HTTP/1.1 persistent connections.</li></ol><p>Next, you’ll build 94. A Simple Key-Value Store, where you’ll learn file-based persistence, indexing, and serialization, the first step toward writing databases in pure C.</p>`,47)])])}const f=n(p,[["render",l]]);export{u as __pageData,f as default};
