import{_ as n,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"65. Signals and Signal Handlers","description":"The Little Book of C — 65. Signals and Signal Handlers","frontmatter":{"title":"65. Signals and Signal Handlers","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Working Close to the System"],"description":"The Little Book of C — 65. Signals and Signal Handlers","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":65,"sidebarWeight":65,"lang":"en-US","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers","alternateZh":"/posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers"},"headers":[],"relativePath":"posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers.md","filePath":"posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers.md"};function t(l,s,o,d,c,r){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers)</p><p>When you press Ctrl+C and your program stops, that’s not magic, it’s a signal. Signals are how the operating system tells your process that something important has happened.</p><p>They’re asynchronous, lightweight messages from the kernel or other processes. Your C program can catch, ignore, or handle them, giving you full control over shutdowns, interrupts, and errors.</p><h4 id="step-1-what-is-a-signal" tabindex="-1">Step 1. What Is a Signal? <a class="header-anchor" href="#step-1-what-is-a-signal" aria-label="Permalink to &quot;Step 1. What Is a Signal?&quot;">​</a></h4><p>A signal is an integer code sent to a process to notify it of an event.</p><table tabindex="0"><thead><tr><th>Signal</th><th>Meaning</th><th>Default Action</th></tr></thead><tbody><tr><td><code>SIGINT</code></td><td>Interrupt (Ctrl+C)</td><td>Terminate</td></tr><tr><td><code>SIGTERM</code></td><td>Termination request</td><td>Terminate</td></tr><tr><td><code>SIGKILL</code></td><td>Forced kill (cannot catch)</td><td>Terminate immediately</td></tr><tr><td><code>SIGSEGV</code></td><td>Invalid memory access</td><td>Core dump</td></tr><tr><td><code>SIGCHLD</code></td><td>Child process exited</td><td>Ignore or handle</td></tr><tr><td><code>SIGALRM</code></td><td>Timer expired</td><td>Terminate</td></tr><tr><td><code>SIGUSR1</code>,<code>SIGUSR2</code></td><td>User-defined</td><td>Terminate (unless handled)</td></tr></tbody></table><p>You can list all signals:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -l</span></span></code></pre></div><p>Output example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1) SIGHUP  2) SIGINT  3) SIGQUIT  9) SIGKILL  15) SIGTERM  ...</span></span></code></pre></div><h4 id="step-2-sending-signals" tabindex="-1">Step 2. Sending Signals <a class="header-anchor" href="#step-2-sending-signals" aria-label="Permalink to &quot;Step 2. Sending Signals&quot;">​</a></h4><p>Any process can send a signal to another using the<code>kill()</code> system call.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = getpid();</span></span>
<span class="line"><span>    printf(&quot;My PID: %d\\n&quot;, pid);</span></span>
<span class="line"><span>    pause();  // wait for signal</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Run this in one terminal:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./signal_wait</span></span></code></pre></div><p>Then in another:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -SIGUSR1 &lt;pid&gt;</span></span></code></pre></div><p>The program will wake up from<code>pause()</code> and terminate (default behavior for SIGUSR1).</p><h4 id="step-3-installing-a-signal-handler" tabindex="-1">Step 3. Installing a Signal Handler <a class="header-anchor" href="#step-3-installing-a-signal-handler" aria-label="Permalink to &quot;Step 3. Installing a Signal Handler&quot;">​</a></h4><p>You can override the default action by installing a handler function.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void handle_sigint(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nCaught signal %d (SIGINT). Exiting gracefully.\\n&quot;, sig);</span></span>
<span class="line"><span>    _exit(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, handle_sigint);</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;Running... Press Ctrl+C to stop.\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc sigint_demo.c -o sigint_demo</span></span>
<span class="line"><span>./sigint_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Running... Press Ctrl+C to stop.</span></span>
<span class="line"><span>Running... Press Ctrl+C to stop.</span></span>
<span class="line"><span>^C</span></span>
<span class="line"><span>Caught signal 2 (SIGINT). Exiting gracefully.</span></span></code></pre></div><h4 id="step-4-using-sigaction-modern-api" tabindex="-1">Step 4. Using sigaction() (Modern API) <a class="header-anchor" href="#step-4-using-sigaction-modern-api" aria-label="Permalink to &quot;Step 4. Using sigaction() (Modern API)&quot;">​</a></h4><p><code>signal()</code> is simple but inconsistent across systems. The recommended modern interface is<code>sigaction()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void handler(int sig) {</span></span>
<span class="line"><span>    write(STDOUT_FILENO, &quot;Caught signal\\n&quot;, 14);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct sigaction sa = {0};</span></span>
<span class="line"><span>    sa.sa_handler = handler;</span></span>
<span class="line"><span>    sigaction(SIGUSR1, &amp;sa, NULL);</span></span>
<span class="line"><span>    printf(&quot;PID: %d\\n&quot;, getpid());</span></span>
<span class="line"><span>    while (1) pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Send a signal:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -SIGUSR1 &lt;pid&gt;</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Caught signal</span></span></code></pre></div><p>Unlike<code>signal()</code>, this version is reliable and reentrant-safe (you can call only async-safe functions like<code>write()</code> inside handlers).</p><h4 id="step-5-ignoring-and-resetting-signals" tabindex="-1">Step 5. Ignoring and Resetting Signals <a class="header-anchor" href="#step-5-ignoring-and-resetting-signals" aria-label="Permalink to &quot;Step 5. Ignoring and Resetting Signals&quot;">​</a></h4><p>You can ignore a signal:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>signal(SIGINT, SIG_IGN);</span></span></code></pre></div><p>Or reset to default behavior:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>signal(SIGINT, SIG_DFL);</span></span></code></pre></div><p>This can be useful if you don’t want Ctrl+C to interrupt certain sections of code.</p><h4 id="step-6-sending-signals-to-other-processes" tabindex="-1">Step 6. Sending Signals to Other Processes <a class="header-anchor" href="#step-6-sending-signals-to-other-processes" aria-label="Permalink to &quot;Step 6. Sending Signals to Other Processes&quot;">​</a></h4><p>Example: parent signaling its child.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void child_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;Child got signal %d\\n&quot;, sig);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        signal(SIGUSR1, child_handler);</span></span>
<span class="line"><span>        while (1) pause();</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>        printf(&quot;Parent sending SIGUSR1\\n&quot;);</span></span>
<span class="line"><span>        kill(pid, SIGUSR1);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>        kill(pid, SIGTERM);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent sending SIGUSR1</span></span>
<span class="line"><span>Child got signal 10</span></span></code></pre></div><h4 id="step-7-blocking-and-unblocking-signals" tabindex="-1">Step 7. Blocking and Unblocking Signals <a class="header-anchor" href="#step-7-blocking-and-unblocking-signals" aria-label="Permalink to &quot;Step 7. Blocking and Unblocking Signals&quot;">​</a></h4><p>Sometimes you want to delay signal handling. You can use<code>sigprocmask()</code> to block signals temporarily.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    sigset_t set;</span></span>
<span class="line"><span>    sigemptyset(&amp;set);</span></span>
<span class="line"><span>    sigaddset(&amp;set, SIGINT);</span></span>
<span class="line"><span>    sigprocmask(SIG_BLOCK, &amp;set, NULL);</span></span>
<span class="line"><span>    printf(&quot;SIGINT blocked for 5 seconds...\\n&quot;);</span></span>
<span class="line"><span>    sleep(5);</span></span>
<span class="line"><span>    printf(&quot;Unblocking now.\\n&quot;);</span></span>
<span class="line"><span>    sigprocmask(SIG_UNBLOCK, &amp;set, NULL);</span></span>
<span class="line"><span>    while (1) pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Press Ctrl+C during the block, nothing happens. Once unblocked, it terminates normally.</p><h4 id="step-8-timers-with-alarm-and-sigalrm" tabindex="-1">Step 8. Timers with alarm() and SIGALRM <a class="header-anchor" href="#step-8-timers-with-alarm-and-sigalrm" aria-label="Permalink to &quot;Step 8. Timers with alarm() and SIGALRM&quot;">​</a></h4><p>You can set a timer that sends a signal after a delay.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;Timer expired!\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGALRM, handler);</span></span>
<span class="line"><span>    alarm(3);  // after 3 seconds, send SIGALRM</span></span>
<span class="line"><span>    printf(&quot;Waiting...\\n&quot;);</span></span>
<span class="line"><span>    pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Waiting...</span></span>
<span class="line"><span>Timer expired!</span></span></code></pre></div><h4 id="step-9-cleaning-up-on-exit" tabindex="-1">Step 9. Cleaning Up on Exit <a class="header-anchor" href="#step-9-cleaning-up-on-exit" aria-label="Permalink to &quot;Step 9. Cleaning Up on Exit&quot;">​</a></h4><p>Signals let you implement graceful cleanup (e.g., close files, delete temp files).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void cleanup(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nCleaning up before exit...\\n&quot;);</span></span>
<span class="line"><span>    unlink(&quot;tempfile.tmp&quot;);</span></span>
<span class="line"><span>    _exit(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, cleanup);</span></span>
<span class="line"><span>    open(&quot;tempfile.tmp&quot;, O_CREAT | O_WRONLY, 0644);</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;Running... (Ctrl+C to exit)\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now pressing Ctrl+C removes the temporary file safely.</p><h4 id="tiny-code-graceful-shutdown-server" tabindex="-1">Tiny Code: Graceful Shutdown Server <a class="header-anchor" href="#tiny-code-graceful-shutdown-server" aria-label="Permalink to &quot;Tiny Code: Graceful Shutdown Server&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>volatile sig_atomic_t running = 1;</span></span>
<span class="line"><span>void stop(int sig) {</span></span>
<span class="line"><span>    running = 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, stop);</span></span>
<span class="line"><span>    printf(&quot;Server running. Press Ctrl+C to stop.\\n&quot;);</span></span>
<span class="line"><span>    while (running) {</span></span>
<span class="line"><span>        printf(&quot;Handling request...\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Server shutting down cleanly.\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-10-why-it-matters" tabindex="-1">Step 10. Why It Matters <a class="header-anchor" href="#step-10-why-it-matters" aria-label="Permalink to &quot;Step 10. Why It Matters&quot;">​</a></h4><p>Signals are essential for:</p><ul><li>Graceful termination (Ctrl+C)</li><li>Timeouts and alarms</li><li>Child process monitoring (<code>SIGCHLD</code>)</li><li>Error handling (segmentation faults)</li><li>Daemon and server control</li></ul><p>Every real-world Unix program, from editors to web servers, depends on correct signal handling for stability.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a program that ignores SIGINT for 5 seconds, then restores default behavior.</li><li>Catch SIGTERM and print “Termination requested”.</li><li>Make a parent send SIGUSR1 to its child every second.</li><li>Use<code>alarm()</code> to implement a timeout for user input.</li><li>Add a signal handler to your shell that cleans up child processes before exit.</li></ol><p>Next, you’ll learn how programs share and map memory directly, using<code>mmap()</code>, a system call that powers databases, shared memory, and file-backed data structures.</p>`,66)])])}const u=n(i,[["render",t]]);export{h as __pageData,u as default};
