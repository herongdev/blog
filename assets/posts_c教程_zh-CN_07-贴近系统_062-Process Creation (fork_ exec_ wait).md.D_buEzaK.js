import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"62. 进程创建（fork、exec、等待）","description":"The Little Book of C 中文版 — 62. 进程创建（fork、exec、等待）","frontmatter":{"title":"62. 进程创建（fork、exec、等待）","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 62. 进程创建（fork、exec、等待）","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":62,"sidebarWeight":62,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait)","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait)"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait).md","filePath":"posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait).md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait).md"};function l(t,s,c,o,d,h){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait))</p><p>类 Unix 系统中的每个程序都在进程内运行，进程是程序的运行实例，具有自己的内存、文件描述符和环境。当您输入时<code>ls</code>或者<code>cat</code>，shell 不只是“跳”到这些程序中。它创建一个新进程来运行它们。</p><p>在 C 中，您可以做完全相同的事情，创建新进程，运行其他程序并同步它们。</p><p>本节教您如何<code>fork()</code>,<code>exec()</code>， 和<code>wait()</code>过程控制的三个基本组成部分协同工作。</p><h4 id="步骤-1-流程的想法" tabindex="-1">步骤 1. 流程的想法 <a class="header-anchor" href="#步骤-1-流程的想法" aria-label="Permalink to &quot;步骤 1. 流程的想法&quot;">​</a></h4><p>当您的程序启动时，它作为一个进程运行，其中：</p><ul><li>PID（进程ID），</li><li>自己的内存空间，</li><li>文件描述符（stdin、stdout、stderr）、</li><li>和环境变量。</li></ul><p>你可以检查自己的PID：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;My PID is %d\\n&quot;, getpid());</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc pid.c -o pid</span></span>
<span class="line"><span>./pid</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>My PID is 5231</span></span></code></pre></div><h4 id="步骤-2-使用-fork-创建新进程" tabindex="-1">步骤 2. 使用 fork() 创建新进程 <a class="header-anchor" href="#步骤-2-使用-fork-创建新进程" aria-label="Permalink to &quot;步骤 2. 使用 fork() 创建新进程&quot;">​</a></h4><p><code>fork()</code>通过复制当前进程来创建一个新进程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc fork_demo.c -o fork_demo</span></span>
<span class="line"><span>./fork_demo</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent process! PID = 5231, child PID = 5232</span></span>
<span class="line"><span>Child process! PID = 5232</span></span></code></pre></div><p>-<code>fork()</code>子进程中返回0 -<code>fork()</code>返回父进程中子进程的PID</p><ul><li>两个进程从同一点继续执行</li></ul><h4 id="步骤3-fork-后的独立内存" tabindex="-1">步骤3.fork()后的独立内存 <a class="header-anchor" href="#步骤3-fork-后的独立内存" aria-label="Permalink to &quot;步骤3.fork()后的独立内存&quot;">​</a></h4><p>每个进程都会获取父进程内存的副本。更改子级中的变量不会影响父级。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent counter: 1</span></span>
<span class="line"><span>Child counter: 10</span></span></code></pre></div><p>每个进程都有自己的副本<code>counter</code>.</p><h4 id="步骤-4-使用-exec-替换进程映像" tabindex="-1">步骤 4. 使用 exec() 替换进程映像 <a class="header-anchor" href="#步骤-4-使用-exec-替换进程映像" aria-label="Permalink to &quot;步骤 4. 使用 exec() 替换进程映像&quot;">​</a></h4><p>后<code>fork()</code>，孩子可以使用新程序替换自己<code>exec()</code>.</p><p>有多个版本：</p><p>-<code>execl(path, arg0, arg1, ..., NULL)</code> -<code>execv(path, argv[])</code> -<code>execlp(file, arg0, arg1, ..., NULL)</code>, 搜索<code>$PATH</code> -<code>execvp(file, argv[])</code>, 最常用的</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Before exec\\n&quot;);</span></span>
<span class="line"><span>    execlp(&quot;ls&quot;, &quot;ls&quot;, &quot;-l&quot;, NULL);</span></span>
<span class="line"><span>    printf(&quot;This will not run if exec succeeds\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc exec_demo.c -o exec_demo</span></span>
<span class="line"><span>./exec_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before exec</span></span>
<span class="line"><span>(total listing from \`ls\`)</span></span></code></pre></div><p>后<code>exec</code>，当前进程映像被替换，PID保持不变，但里面运行的程序发生了变化。</p><h4 id="步骤-5-组合-fork-和-exec" tabindex="-1">步骤 5. 组合 fork() 和 exec() <a class="header-anchor" href="#步骤-5-组合-fork-和-exec" aria-label="Permalink to &quot;步骤 5. 组合 fork() 和 exec()&quot;">​</a></h4><p>这就是 shell 启动命令的方式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent is waiting...</span></span>
<span class="line"><span>Hello from child</span></span></code></pre></div><p>父分叉；孩子将自己替换为<code>echo</code>.</p><h4 id="步骤-6-等待子进程-wait-和-waitpid" tabindex="-1">步骤 6. 等待子进程（wait() 和 waitpid()） <a class="header-anchor" href="#步骤-6-等待子进程-wait-和-waitpid" aria-label="Permalink to &quot;步骤 6. 等待子进程（wait() 和 waitpid()）&quot;">​</a></h4><p>父进程可以等待其子进程完成。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc wait_demo.c -o wait_demo</span></span>
<span class="line"><span>./wait_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent waiting for child...</span></span>
<span class="line"><span>Child running</span></span>
<span class="line"><span>Child finished</span></span></code></pre></div><h4 id="步骤-7-检查退出状态" tabindex="-1">步骤 7. 检查退出状态 <a class="header-anchor" href="#步骤-7-检查退出状态" aria-label="Permalink to &quot;步骤 7. 检查退出状态&quot;">​</a></h4><p>您可以使用以下方式获取孩子的退出代码<code>waitpid()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child exited with code 42</span></span></code></pre></div><h4 id="步骤-8-多个孩子" tabindex="-1">步骤 8. 多个孩子 <a class="header-anchor" href="#步骤-8-多个孩子" aria-label="Permalink to &quot;步骤 8. 多个孩子&quot;">​</a></h4><p>您可以生成多个进程并等待它们全部：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child 0 PID 5321</span></span>
<span class="line"><span>Child 1 PID 5322</span></span>
<span class="line"><span>Child 2 PID 5323</span></span>
<span class="line"><span>All children done</span></span></code></pre></div><h4 id="步骤-9-孤儿进程和僵尸进程" tabindex="-1">步骤 9. 孤儿进程和僵尸进程 <a class="header-anchor" href="#步骤-9-孤儿进程和僵尸进程" aria-label="Permalink to &quot;步骤 9. 孤儿进程和僵尸进程&quot;">​</a></h4><p>如果家长不打电话<code>wait()</code>，子进程变成僵尸（已终止，但仍在进程表中）。如果父母在孩子之前终止，孩子就会成为孤儿并被收养<code>init</code>（PID 1）。</p><p>运行这个：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ps -l | grep Z</span></span></code></pre></div><p>你会看到僵尸进程标有<code>Z</code>.</p><h4 id="小代码-最小的-shell-启动器" tabindex="-1">小代码：最小的 Shell 启动器 <a class="header-anchor" href="#小代码-最小的-shell-启动器" aria-label="Permalink to &quot;小代码：最小的 Shell 启动器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc mini_shell.c -o mini_shell</span></span>
<span class="line"><span>./mini_shell</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(file listing)</span></span>
<span class="line"><span>Command finished</span></span></code></pre></div><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p><code>fork()</code>,<code>exec()</code>， 和<code>wait()</code>形成了Unix的核心进程模型。每个命令行程序、守护进程和服务都在底层使用它们。</p><p>他们让你：</p><ul><li>启动其他程序</li><li>建立并行工作人员</li><li>实现你自己的外壳</li><li>控制进程树和作业</li></ul><p>一旦理解了这些，您就可以深入了解进程间通信，使您的进程通过管道和重定向进行通信。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个程序，分叉两个子进程，其中一个运行<code>date</code>, 一个运行<code>whoami</code>. 2.修改为等待两个孩子都完成。</li><li>创建一个程序，分叉一个子进程，但父进程立即退出（观察孤儿收养）。</li><li>自己写<code>run(command)</code>函数使用<code>fork()</code>,<code>execvp()</code>， 和<code>waitpid()</code>.</li><li>将所有这些组合到一个微型 shell 中，该 shell 接受命令并以交互方式执行它们。</li></ol><p>接下来，您将在下一节中了解这些进程如何使用文件描述符、管道和重定向来通信和共享数据。</p>`,81)])])}const g=a(i,[["render",l]]);export{u as __pageData,g as default};
