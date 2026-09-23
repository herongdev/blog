import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"62. Process Creation (fork, exec, wait)","description":"The Little Book of C — 62. Process Creation (fork, exec, wait)","frontmatter":{"title":"62. Process Creation (fork, exec, wait)","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Working Close to the System"],"description":"The Little Book of C — 62. Process Creation (fork, exec, wait)","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":62,"sidebarWeight":62,"lang":"en-US","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait)","alternateZh":"/posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait)"},"headers":[],"relativePath":"posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait).md","filePath":"posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait).md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait).md"};function t(l,s,o,c,d,r){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait))</p><p>Every program in a Unix-like system runs inside a process, a running instance of a program with its own memory, file descriptors, and environment. When you type<code>ls</code> or<code>cat</code>, the shell doesn’t just “jump” into those programs. It creates a new process to run them.</p><p>In C, you can do exactly the same thing, create new processes, run other programs, and synchronize them.</p><p>This section teaches you how<code>fork()</code>,<code>exec()</code>, and<code>wait()</code> work together, the three essential building blocks of process control.</p><h4 id="step-1-the-idea-of-a-process" tabindex="-1">Step 1. The Idea of a Process <a class="header-anchor" href="#step-1-the-idea-of-a-process" aria-label="Permalink to &quot;Step 1. The Idea of a Process&quot;">​</a></h4><p>When your program starts, it runs as one process, with:</p><ul><li>a PID (process ID),</li><li>its own memory space,</li><li>file descriptors (stdin, stdout, stderr),</li><li>and environment variables.</li></ul><p>You can check your own PID:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;My PID is %d\\n&quot;, getpid());</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc pid.c -o pid</span></span>
<span class="line"><span>./pid</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>My PID is 5231</span></span></code></pre></div><h4 id="step-2-creating-a-new-process-with-fork" tabindex="-1">Step 2. Creating a New Process with fork() <a class="header-anchor" href="#step-2-creating-a-new-process-with-fork" aria-label="Permalink to &quot;Step 2. Creating a New Process with fork()&quot;">​</a></h4><p><code>fork()</code> creates a new process by duplicating the current one.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid &lt; 0) {</span></span>
<span class="line"><span>        perror(&quot;fork failed&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        printf(&quot;Child process! PID = %d\\n&quot;, getpid());</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        printf(&quot;Parent process! PID = %d, child PID = %d\\n&quot;, getpid(), pid);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc fork_demo.c -o fork_demo</span></span>
<span class="line"><span>./fork_demo</span></span></code></pre></div><p>Example output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent process! PID = 5231, child PID = 5232</span></span>
<span class="line"><span>Child process! PID = 5232</span></span></code></pre></div><ul><li><code>fork()</code> returns 0 in the child process</li><li><code>fork()</code> returns child PID in the parent process</li><li>Both processes continue executing from the same point</li></ul><h4 id="step-3-independent-memory-after-fork" tabindex="-1">Step 3. Independent Memory After fork() <a class="header-anchor" href="#step-3-independent-memory-after-fork" aria-label="Permalink to &quot;Step 3. Independent Memory After fork()&quot;">​</a></h4><p>Each process gets a copy of the parent’s memory. Changing a variable in the child doesn’t affect the parent.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int counter = 0;</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        counter += 10;</span></span>
<span class="line"><span>        printf(&quot;Child counter: %d\\n&quot;, counter);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        counter += 1;</span></span>
<span class="line"><span>        printf(&quot;Parent counter: %d\\n&quot;, counter);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent counter: 1</span></span>
<span class="line"><span>Child counter: 10</span></span></code></pre></div><p>Each process has its own copy of<code>counter</code>.</p><h4 id="step-4-replacing-a-process-image-with-exec" tabindex="-1">Step 4. Replacing a Process Image with exec() <a class="header-anchor" href="#step-4-replacing-a-process-image-with-exec" aria-label="Permalink to &quot;Step 4. Replacing a Process Image with exec()&quot;">​</a></h4><p>After<code>fork()</code>, the child can replace itself with a new program using<code>exec()</code>.</p><p>There are multiple versions:</p><ul><li><code>execl(path, arg0, arg1, ..., NULL)</code></li><li><code>execv(path, argv[])</code></li><li><code>execlp(file, arg0, arg1, ..., NULL)</code>, searches<code>$PATH</code></li><li><code>execvp(file, argv[])</code>, most commonly used</li></ul><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Before exec\\n&quot;);</span></span>
<span class="line"><span>    execlp(&quot;ls&quot;, &quot;ls&quot;, &quot;-l&quot;, NULL);</span></span>
<span class="line"><span>    printf(&quot;This will not run if exec succeeds\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc exec_demo.c -o exec_demo</span></span>
<span class="line"><span>./exec_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before exec</span></span>
<span class="line"><span>(total listing from \`ls\`)</span></span></code></pre></div><p>After<code>exec</code>, the current process image is replaced, the PID stays the same, but the program running inside changes.</p><h4 id="step-5-combining-fork-and-exec" tabindex="-1">Step 5. Combining fork() and exec() <a class="header-anchor" href="#step-5-combining-fork-and-exec" aria-label="Permalink to &quot;Step 5. Combining fork() and exec()&quot;">​</a></h4><p>This is how your shell launches commands.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        execlp(&quot;echo&quot;, &quot;echo&quot;, &quot;Hello from child&quot;, NULL);</span></span>
<span class="line"><span>        perror(&quot;exec failed&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        printf(&quot;Parent is waiting...\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent is waiting...</span></span>
<span class="line"><span>Hello from child</span></span></code></pre></div><p>The parent forks; the child replaces itself with<code>echo</code>.</p><h4 id="step-6-waiting-for-the-child-wait-and-waitpid" tabindex="-1">Step 6. Waiting for the Child (wait() and waitpid()) <a class="header-anchor" href="#step-6-waiting-for-the-child-wait-and-waitpid" aria-label="Permalink to &quot;Step 6. Waiting for the Child (wait() and waitpid())&quot;">​</a></h4><p>The parent can wait for its child process to finish.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        printf(&quot;Child running\\n&quot;);</span></span>
<span class="line"><span>        execlp(&quot;sleep&quot;, &quot;sleep&quot;, &quot;1&quot;, NULL);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        printf(&quot;Parent waiting for child...\\n&quot;);</span></span>
<span class="line"><span>        wait(NULL);</span></span>
<span class="line"><span>        printf(&quot;Child finished\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc wait_demo.c -o wait_demo</span></span>
<span class="line"><span>./wait_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent waiting for child...</span></span>
<span class="line"><span>Child running</span></span>
<span class="line"><span>Child finished</span></span></code></pre></div><h4 id="step-7-checking-exit-status" tabindex="-1">Step 7. Checking Exit Status <a class="header-anchor" href="#step-7-checking-exit-status" aria-label="Permalink to &quot;Step 7. Checking Exit Status&quot;">​</a></h4><p>You can get the child’s exit code using<code>waitpid()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        _exit(42);  // child exits with status 42</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        int status;</span></span>
<span class="line"><span>        waitpid(pid, &amp;status, 0);</span></span>
<span class="line"><span>        if (WIFEXITED(status))</span></span>
<span class="line"><span>            printf(&quot;Child exited with code %d\\n&quot;, WEXITSTATUS(status));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child exited with code 42</span></span></code></pre></div><h4 id="step-8-multiple-children" tabindex="-1">Step 8. Multiple Children <a class="header-anchor" href="#step-8-multiple-children" aria-label="Permalink to &quot;Step 8. Multiple Children&quot;">​</a></h4><p>You can spawn multiple processes and wait for them all:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 3; i++) {</span></span>
<span class="line"><span>        pid_t pid = fork();</span></span>
<span class="line"><span>        if (pid == 0) {</span></span>
<span class="line"><span>            printf(&quot;Child %d PID %d\\n&quot;, i, getpid());</span></span>
<span class="line"><span>            _exit(0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 3; i++)</span></span>
<span class="line"><span>        wait(NULL);</span></span>
<span class="line"><span>    printf(&quot;All children done\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child 0 PID 5321</span></span>
<span class="line"><span>Child 1 PID 5322</span></span>
<span class="line"><span>Child 2 PID 5323</span></span>
<span class="line"><span>All children done</span></span></code></pre></div><h4 id="step-9-orphan-and-zombie-processes" tabindex="-1">Step 9. Orphan and Zombie Processes <a class="header-anchor" href="#step-9-orphan-and-zombie-processes" aria-label="Permalink to &quot;Step 9. Orphan and Zombie Processes&quot;">​</a></h4><p>If the parent doesn’t call<code>wait()</code>, the child becomes a zombie (terminated, but still in process table). If the parent terminates before the child, the child becomes an orphan and gets adopted by<code>init</code>(PID 1).</p><p>Run this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ps -l | grep Z</span></span></code></pre></div><p>You’ll see zombie processes marked with a<code>Z</code>.</p><h4 id="tiny-code-minimal-shell-launcher" tabindex="-1">Tiny Code: Minimal Shell Launcher <a class="header-anchor" href="#tiny-code-minimal-shell-launcher" aria-label="Permalink to &quot;Tiny Code: Minimal Shell Launcher&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char *argv[] = {&quot;ls&quot;, &quot;-1&quot;, NULL};</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        execvp(argv[0], argv);</span></span>
<span class="line"><span>        perror(&quot;exec failed&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        wait(NULL);</span></span>
<span class="line"><span>        printf(&quot;Command finished\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc mini_shell.c -o mini_shell</span></span>
<span class="line"><span>./mini_shell</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(file listing)</span></span>
<span class="line"><span>Command finished</span></span></code></pre></div><h4 id="step-10-why-it-matters" tabindex="-1">Step 10. Why It Matters <a class="header-anchor" href="#step-10-why-it-matters" aria-label="Permalink to &quot;Step 10. Why It Matters&quot;">​</a></h4><p><code>fork()</code>,<code>exec()</code>, and<code>wait()</code> form the core process model of Unix. Every command-line program, daemon, and service uses these under the hood.</p><p>They let you:</p><ul><li>Launch other programs</li><li>Build parallel workers</li><li>Implement your own shell</li><li>Control process trees and jobs</li></ul><p>Once you understand these, you’re ready to dive into inter-process communication, making your processes talk via pipes and redirection.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a program that forks two children, one runs<code>date</code>, one runs<code>whoami</code>.</li><li>Modify it to wait for both children to finish.</li><li>Create a program that forks a child, but the parent exits immediately (observe orphan adoption).</li><li>Write your own<code>run(command)</code> function using<code>fork()</code>,<code>execvp()</code>, and<code>waitpid()</code>.</li><li>Combine all this into a tiny shell that accepts commands and executes them interactively.</li></ol><p>Next, you’ll learn how these processes can communicate and share data, using file descriptors, pipes, and redirection in the next section.</p>`,80)])])}const g=a(i,[["render",t]]);export{u as __pageData,g as default};
