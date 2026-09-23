import{_ as n,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"70. Practice: Mini Shell in C","description":"The Little Book of C — 70. Practice: Mini Shell in C","frontmatter":{"title":"70. Practice: Mini Shell in C","date":"2026-07-04","categories":"[C 教程]","tags":"[C, Little Book of C, Working Close to the System]","description":"The Little Book of C — 70. Practice: Mini Shell in C","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":"70","sidebarWeight":"70","lang":"en-US","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C","alternateZh":"/posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C"},"headers":[],"relativePath":"posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C.md","filePath":"posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C.md"};function l(t,s,o,c,d,r){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C)</p><h4 id="follow-along-deliverable" tabindex="-1">Follow-Along Deliverable <a class="header-anchor" href="#follow-along-deliverable" aria-label="Permalink to &quot;Follow-Along Deliverable&quot;">​</a></h4><ul><li>Assumed state: lessons 061-069 are complete and you can rebuild the previous example.</li><li>Working directory: <code>~/c-course-labs/070-mini-shell</code>.</li><li>First command: on macOS / Linux run <code>mkdir -p ~/c-course-labs/070-mini-shell &amp;&amp; cd ~/c-course-labs/070-mini-shell</code>; on Windows PowerShell run <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\070-mini-shell&quot;; Set-Location &quot;$HOME\\c-course-labs\\070-mini-shell&quot;</code>.</li><li>Success evidence: keep the source file, executable, <code>evidence.md</code>, and record <code>pwd</code>, <code>echo</code>, and one pipe or redirection command record.</li><li>Boundary for this lab: This lab builds an observable shell prototype. Job control, a full scripting language, and a production sandbox are out of scope.</li><li>Reset: remove the executable, temporary data, and generated output for this lab; keep source and <code>evidence.md</code> for review.</li></ul><p>It’s time to bring together everything you’ve learned so far, system calls, process creation, pipes, redirection, and signal handling, into one cohesive project.</p><p>In this section, you’ll build a minimal interactive shell, just like<code>bash</code> or<code>zsh</code>, but stripped down to the essentials. It will run commands, handle input/output redirection, and even support pipelines.</p><h4 id="step-1-what-you-ll-build" tabindex="-1">Step 1. What You’ll Build <a class="header-anchor" href="#step-1-what-you-ll-build" aria-label="Permalink to &quot;Step 1. What You’ll Build&quot;">​</a></h4><p>Your mini shell will:</p><ol><li>Display a prompt like<code>$</code></li><li>Read user input (e.g.,<code>ls -l</code>,<code>cat file.txt</code>)</li><li>Parse it into command and arguments</li><li>Create a new process using<code>fork()</code></li><li>Replace the process image with the requested command using<code>execvp()</code></li><li>Wait for the child to finish</li></ol><p>Optional extensions:</p><ul><li>Handle signals (Ctrl+C) gracefully</li><li>Redirect output to a file (<code>&gt;</code> redirection)</li><li>Chain commands using pipes (<code>|</code>)</li></ul><h4 id="step-2-core-loop-skeleton" tabindex="-1">Step 2. Core Loop Skeleton <a class="header-anchor" href="#step-2-core-loop-skeleton" aria-label="Permalink to &quot;Step 2. Core Loop Skeleton&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>#define MAX 1024</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char input[MAX];</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;$ &quot;);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>        if (!fgets(input, sizeof(input), stdin))</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // Remove newline</span></span>
<span class="line"><span>        input[strcspn(input, &quot;\\n&quot;)] = 0;</span></span>
<span class="line"><span>        // Exit command</span></span>
<span class="line"><span>        if (strcmp(input, &quot;exit&quot;) == 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // Tokenize input</span></span>
<span class="line"><span>        char *args[64];</span></span>
<span class="line"><span>        int i = 0;</span></span>
<span class="line"><span>        char *token = strtok(input, &quot; &quot;);</span></span>
<span class="line"><span>        while (token) {</span></span>
<span class="line"><span>            args[i++] = token;</span></span>
<span class="line"><span>            token = strtok(NULL, &quot; &quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        args[i] = NULL;</span></span>
<span class="line"><span>        // Fork and execute</span></span>
<span class="line"><span>        pid_t pid = fork();</span></span>
<span class="line"><span>        if (pid == 0) {</span></span>
<span class="line"><span>            execvp(args[0], args);</span></span>
<span class="line"><span>            perror(&quot;execvp&quot;);</span></span>
<span class="line"><span>            exit(1);</span></span>
<span class="line"><span>        } else if (pid &gt; 0) {</span></span>
<span class="line"><span>            wait(NULL);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            perror(&quot;fork&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Goodbye!\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc mini_shell.c -o mini_shell</span></span>
<span class="line"><span>./mini_shell</span></span></code></pre></div><p>Try commands:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ ls</span></span>
<span class="line"><span>$ pwd</span></span>
<span class="line"><span>$ echo hello world</span></span>
<span class="line"><span>$ exit</span></span></code></pre></div><h4 id="step-3-handling-errors-gracefully" tabindex="-1">Step 3. Handling Errors Gracefully <a class="header-anchor" href="#step-3-handling-errors-gracefully" aria-label="Permalink to &quot;Step 3. Handling Errors Gracefully&quot;">​</a></h4><p>If you enter a wrong command:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ xyz</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>execvp: No such file or directory</span></span></code></pre></div><p>This happens because the program handles<code>execvp()</code> failure properly with<code>perror()</code>, just as you learned in section 69.</p><h4 id="step-4-adding-signal-handling" tabindex="-1">Step 4. Adding Signal Handling <a class="header-anchor" href="#step-4-adding-signal-handling" aria-label="Permalink to &quot;Step 4. Adding Signal Handling&quot;">​</a></h4><p>Let’s make Ctrl+C stop the running command, but not kill the shell itself.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>void sigint_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nType &#39;exit&#39; to quit.\\n$ &quot;);</span></span>
<span class="line"><span>    fflush(stdout);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, sigint_handler);</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now the shell ignores Ctrl+C while waiting for input, instead of terminating.</p><h4 id="step-5-supporting-output-redirection" tabindex="-1">Step 5. Supporting Output Redirection <a class="header-anchor" href="#step-5-supporting-output-redirection" aria-label="Permalink to &quot;Step 5. Supporting Output Redirection&quot;">​</a></h4><p>We’ll add<code>&gt;</code> redirection like:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ echo Hello &gt; out.txt</span></span></code></pre></div><p>Add this before the<code>execvp()</code> call in the child:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>for (int j = 0; args[j]; j++) {</span></span>
<span class="line"><span>    if (strcmp(args[j], &quot;&gt;&quot;) == 0) {</span></span>
<span class="line"><span>        args[j] = NULL;</span></span>
<span class="line"><span>        int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>        dup2(fd, STDOUT_FILENO);</span></span>
<span class="line"><span>        close(fd);</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now<code>stdout</code> of the command goes to the file instead of the screen.</p><h4 id="step-6-supporting-input-redirection" tabindex="-1">Step 6. Supporting Input Redirection <a class="header-anchor" href="#step-6-supporting-input-redirection" aria-label="Permalink to &quot;Step 6. Supporting Input Redirection&quot;">​</a></h4><p>Similarly, for<code>&lt;</code> redirection:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ cat &lt; in.txt</span></span></code></pre></div><p>Add:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (strcmp(args[j], &quot;&lt;&quot;) == 0) {</span></span>
<span class="line"><span>    args[j] = NULL;</span></span>
<span class="line"><span>    int fd = open(args[j + 1], O_RDONLY);</span></span>
<span class="line"><span>    dup2(fd, STDIN_FILENO);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    break;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-7-adding-pipe-support" tabindex="-1">Step 7. Adding Pipe Support <a class="header-anchor" href="#step-7-adding-pipe-support" aria-label="Permalink to &quot;Step 7. Adding Pipe Support&quot;">​</a></h4><p>To handle commands like:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ ls | wc -l</span></span></code></pre></div><p>We create two processes connected by a pipe.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int pipefd[2];</span></span>
<span class="line"><span>pipe(pipefd);</span></span>
<span class="line"><span>pid_t p1 = fork();</span></span>
<span class="line"><span>if (p1 == 0) {</span></span>
<span class="line"><span>    dup2(pipefd[1], STDOUT_FILENO);</span></span>
<span class="line"><span>    close(pipefd[0]);</span></span>
<span class="line"><span>    execlp(&quot;ls&quot;, &quot;ls&quot;, NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>pid_t p2 = fork();</span></span>
<span class="line"><span>if (p2 == 0) {</span></span>
<span class="line"><span>    dup2(pipefd[0], STDIN_FILENO);</span></span>
<span class="line"><span>    close(pipefd[1]);</span></span>
<span class="line"><span>    execlp(&quot;wc&quot;, &quot;wc&quot;, &quot;-l&quot;, NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>close(pipefd[0]);</span></span>
<span class="line"><span>close(pipefd[1]);</span></span>
<span class="line"><span>wait(NULL);</span></span>
<span class="line"><span>wait(NULL);</span></span></code></pre></div><p>That’s the same pattern you saw in section 64,<code>ls | wc -l</code>.</p><h4 id="step-8-combining-all-features" tabindex="-1">Step 8. Combining All Features <a class="header-anchor" href="#step-8-combining-all-features" aria-label="Permalink to &quot;Step 8. Combining All Features&quot;">​</a></h4><p>Your shell now:</p><ul><li>Parses user input</li><li>Spawns child processes</li><li>Handles I/O redirection</li><li>Supports Ctrl+C interruption</li><li>Runs simple pipelines</li></ul><p>With ~150 lines of code, you have a working Unix shell prototype.</p><h4 id="step-9-tiny-code-full-mini-shell" tabindex="-1">Step 9. Tiny Code: Full Mini Shell <a class="header-anchor" href="#step-9-tiny-code-full-mini-shell" aria-label="Permalink to &quot;Step 9. Tiny Code: Full Mini Shell&quot;">​</a></h4><p>Here’s the clean, minimal version:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>void sigint_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\n$ &quot;);</span></span>
<span class="line"><span>    fflush(stdout);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, sigint_handler);</span></span>
<span class="line"><span>    char input[1024];</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;$ &quot;);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>        if (!fgets(input, sizeof(input), stdin)) break;</span></span>
<span class="line"><span>        input[strcspn(input, &quot;\\n&quot;)] = 0;</span></span>
<span class="line"><span>        if (strcmp(input, &quot;exit&quot;) == 0) break;</span></span>
<span class="line"><span>        char *args[64];</span></span>
<span class="line"><span>        int i = 0;</span></span>
<span class="line"><span>        char *token = strtok(input, &quot; &quot;);</span></span>
<span class="line"><span>        while (token) {</span></span>
<span class="line"><span>            args[i++] = token;</span></span>
<span class="line"><span>            token = strtok(NULL, &quot; &quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        args[i] = NULL;</span></span>
<span class="line"><span>        pid_t pid = fork();</span></span>
<span class="line"><span>        if (pid == 0) {</span></span>
<span class="line"><span>            for (int j = 0; args[j]; j++) {</span></span>
<span class="line"><span>                if (strcmp(args[j], &quot;&gt;&quot;) == 0) {</span></span>
<span class="line"><span>                    int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>                    dup2(fd, STDOUT_FILENO);</span></span>
<span class="line"><span>                    close(fd);</span></span>
<span class="line"><span>                    args[j] = NULL;</span></span>
<span class="line"><span>                } else if (strcmp(args[j], &quot;&lt;&quot;) == 0) {</span></span>
<span class="line"><span>                    int fd = open(args[j + 1], O_RDONLY);</span></span>
<span class="line"><span>                    dup2(fd, STDIN_FILENO);</span></span>
<span class="line"><span>                    close(fd);</span></span>
<span class="line"><span>                    args[j] = NULL;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            execvp(args[0], args);</span></span>
<span class="line"><span>            perror(&quot;execvp&quot;);</span></span>
<span class="line"><span>            exit(1);</span></span>
<span class="line"><span>        } else if (pid &gt; 0) {</span></span>
<span class="line"><span>            wait(NULL);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Exiting shell.\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Try it out, it’s a real, interactive shell.</p><h4 id="step-10-why-it-matters" tabindex="-1">Step 10. Why It Matters <a class="header-anchor" href="#step-10-why-it-matters" aria-label="Permalink to &quot;Step 10. Why It Matters&quot;">​</a></h4><p>This exercise combines everything you’ve learned in Chapter 7:</p><ul><li>System calls (<code>fork</code>,<code>exec</code>,<code>wait</code>,<code>pipe</code>,<code>dup2</code>)</li><li>Signals (<code>SIGINT</code>)</li><li>File descriptors and redirection</li><li>Error handling with<code>errno</code></li><li>Environment inheritance</li></ul><p>You’ve just built a simplified version of the core that powers every Unix shell, from<code>bash</code> to<code>zsh</code> to<code>fish</code>.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add support for pipelines (<code>|</code>) by chaining multiple commands.</li><li>Implement background processes with<code>&amp;</code>.</li><li>Add<code>cd</code> and<code>pwd</code> as built-in commands.</li><li>Display the exit code after each command.</li><li>Handle multiple spaces and quoted arguments.</li></ol><p>Next, we’ll move into Chapter 8: Debugging, Testing, and Profiling, starting with gdb, your most powerful ally in understanding and fixing C programs.</p>`,58)])])}const g=n(i,[["render",l]]);export{h as __pageData,g as default};
