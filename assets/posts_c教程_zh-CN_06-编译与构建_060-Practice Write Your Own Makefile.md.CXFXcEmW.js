import{_ as s,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"60. 练习：编写自己的 Makefile","description":"The Little Book of C 中文版 — 60. 练习：编写自己的 Makefile","frontmatter":{"title":"60. 练习：编写自己的 Makefile","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","06-编译与构建","中文"],"description":"The Little Book of C 中文版 — 60. 练习：编写自己的 Makefile","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"60","sidebarWeight":"60","alternateZh":"/posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile","alternateEn":"/posts/c教程/en-US/06-Compilation and Build/060-Practice Write Your Own Makefile"},"headers":[],"relativePath":"posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile.md","filePath":"posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile.md"};function i(t,a,c,o,d,h){return n(),e("div",null,[...a[0]||(a[0]=[p(`<p>[English version](/posts/c教程/en-US/06-Compilation and Build/060-Practice Write Your Own Makefile)</p><h4 id="跟练交付物" tabindex="-1">跟练交付物 <a class="header-anchor" href="#跟练交付物" aria-label="Permalink to &quot;跟练交付物&quot;">​</a></h4><ul><li>已具备状态：完成第 051-059 课，能重新编译上一章示例。</li><li>工作目录：<code>~/c-course-labs/060-makefile-lab</code>。</li><li>第一条命令：macOS / Linux 运行 <code>mkdir -p ~/c-course-labs/060-makefile-lab &amp;&amp; cd ~/c-course-labs/060-makefile-lab</code>；Windows PowerShell 运行 <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\060-makefile-lab&quot;; Set-Location &quot;$HOME\\c-course-labs\\060-makefile-lab&quot;</code>。</li><li>成功证据：保留源码、可执行文件、<code>evidence.md</code>，并记录<code>make</code>、修改一个 <code>.c</code> 后的增量构建、<code>make clean</code> 三段记录。</li><li>本章边界：本章关注可重复构建；暂不要求 CMake、Ninja 或跨平台发布流水线。</li><li>重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 <code>evidence.md</code> 方便复盘。</li></ul><p>现在您已经了解了 C 构建过程的工作原理、预处理、编译、链接和库，是时候将所有内容与您自己的 Makefile 结合在一起了。</p><p><code>make</code>是 C 开发中最古老、最强大的自动化工具之一。它监视文件时间戳，仅构建已更改的内容，并允许您以简洁的方式定义构建规则。</p><p>通过编写自己的 Makefile，您将像专业人士一样自动化整个编译工作流程。</p><h4 id="步骤-1-创建项目" tabindex="-1">步骤 1. 创建项目 <a class="header-anchor" href="#步骤-1-创建项目" aria-label="Permalink to &quot;步骤 1. 创建项目&quot;">​</a></h4><p>让我们构建一个小型多文件项目：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>project/</span></span>
<span class="line"><span>├── Makefile</span></span>
<span class="line"><span>├── main.c</span></span>
<span class="line"><span>├── math.c</span></span>
<span class="line"><span>├── math.h</span></span>
<span class="line"><span>└── string_utils.c</span></span></code></pre></div><p>主程序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;math.h&quot;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;2 + 3 = %d\\n&quot;, add(2, 3));</span></span>
<span class="line"><span>    printf(&quot;2 * 3 = %d\\n&quot;, mul(2, 3));</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>数学.c</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &quot;math.h&quot;</span></span>
<span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>int mul(int a, int b) { return a * b; }</span></span></code></pre></div><p>数学.h</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#ifndef MATH_H</span></span>
<span class="line"><span>#define MATH_H</span></span>
<span class="line"><span>int add(int a, int b);</span></span>
<span class="line"><span>int mul(int a, int b);</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><h4 id="步骤-2-编写最简单的-makefile" tabindex="-1">步骤 2. 编写最简单的 Makefile <a class="header-anchor" href="#步骤-2-编写最简单的-makefile" aria-label="Permalink to &quot;步骤 2. 编写最简单的 Makefile&quot;">​</a></h4><p>生成文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>main: main.c math.c</span></span>
<span class="line"><span>    gcc main.c math.c -o main</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>./main</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2 + 3 = 5</span></span>
<span class="line"><span>2 * 3 = 6</span></span></code></pre></div><p>这可行，但是<code>make</code>每次都会重建所有内容，即使只更改了一个文件。</p><p>让我们让它变得更聪明。</p><h4 id="步骤-3-拆分编译步骤" tabindex="-1">步骤 3. 拆分编译步骤 <a class="header-anchor" href="#步骤-3-拆分编译步骤" aria-label="Permalink to &quot;步骤 3. 拆分编译步骤&quot;">​</a></h4><p>单独编译成目标文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -Wall -std=c99</span></span>
<span class="line"><span>main: main.o math.o</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) main.o math.o -o main</span></span>
<span class="line"><span>main.o: main.c math.h</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c main.c</span></span>
<span class="line"><span>math.o: math.c math.h</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c math.c</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f *.o main</span></span></code></pre></div><p>现在当你跑步时<code>make</code>，它构建了<code>.o</code>文件仅一次，并且仅重新编译更改的内容。</p><p>测试一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>touch math.c</span></span>
<span class="line"><span>make</span></span></code></pre></div><p>你只会看到<code>math.o</code>是重建的。</p><h4 id="步骤-4-添加自动依赖关系处理" tabindex="-1">步骤 4. 添加自动依赖关系处理 <a class="header-anchor" href="#步骤-4-添加自动依赖关系处理" aria-label="Permalink to &quot;步骤 4. 添加自动依赖关系处理&quot;">​</a></h4><p>使用模式规则来避免对每个重复命令<code>.c</code>文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -Wall -std=c99</span></span>
<span class="line"><span>OBJS = main.o math.o string_utils.o</span></span>
<span class="line"><span>TARGET = app</span></span>
<span class="line"><span>$(TARGET): $(OBJS)</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)</span></span>
<span class="line"><span>%.o: %.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c $&lt; -o $@</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f $(OBJS) $(TARGET)</span></span></code></pre></div><p><code>$&lt;</code>表示“第一个依赖项”（例如<code>main.c</code>).<code>$@</code>意思是“目标”（比如<code>main.o</code>).</p><p>现在 Makefile 适用于任何<code>.c</code>自动归档。</p><h4 id="步骤-5-添加调试和发布目标" tabindex="-1">步骤 5. 添加调试和发布目标 <a class="header-anchor" href="#步骤-5-添加调试和发布目标" aria-label="Permalink to &quot;步骤 5. 添加调试和发布目标&quot;">​</a></h4><p>真实的项目有多种构建模式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -Wall -std=c99</span></span>
<span class="line"><span>DEBUG_FLAGS = -g -O0 -DDEBUG</span></span>
<span class="line"><span>RELEASE_FLAGS = -O2 -DNDEBUG</span></span>
<span class="line"><span>OBJS = main.o math.o</span></span>
<span class="line"><span>TARGET = app</span></span>
<span class="line"><span>.PHONY: all clean debug release</span></span>
<span class="line"><span>all: release</span></span>
<span class="line"><span>debug: CFLAGS += $(DEBUG_FLAGS)</span></span>
<span class="line"><span>debug: $(TARGET)</span></span>
<span class="line"><span>release: CFLAGS += $(RELEASE_FLAGS)</span></span>
<span class="line"><span>release: $(TARGET)</span></span>
<span class="line"><span>$(TARGET): $(OBJS)</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)</span></span>
<span class="line"><span>%.o: %.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c $&lt; -o $@</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f $(OBJS) $(TARGET)</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make debug</span></span>
<span class="line"><span>./app</span></span></code></pre></div><p>然后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make clean</span></span>
<span class="line"><span>make release</span></span></code></pre></div><p>调试版本具有以下符号<code>gdb</code>;发布版本已优化。</p><h4 id="步骤-6-添加静态和共享库目标" tabindex="-1">步骤 6. 添加静态和共享库目标 <a class="header-anchor" href="#步骤-6-添加静态和共享库目标" aria-label="Permalink to &quot;步骤 6. 添加静态和共享库目标&quot;">​</a></h4><p>将这些添加到您的 Makefile 中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>libmylib.a: math.o</span></span>
<span class="line"><span>    ar rcs libmylib.a math.o</span></span>
<span class="line"><span>libmylib.so: math.o</span></span>
<span class="line"><span>    $(CC) -shared -o libmylib.so math.o</span></span></code></pre></div><p>现在您可以构建一个可重用的库：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make libmylib.a</span></span>
<span class="line"><span>make libmylib.so</span></span></code></pre></div><h4 id="步骤-7-添加安装和帮助" tabindex="-1">步骤 7. 添加安装和帮助 <a class="header-anchor" href="#步骤-7-添加安装和帮助" aria-label="Permalink to &quot;步骤 7. 添加安装和帮助&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>install:</span></span>
<span class="line"><span>    cp app /usr/local/bin/</span></span>
<span class="line"><span>help:</span></span>
<span class="line"><span>    @echo &quot;make [target]&quot;</span></span>
<span class="line"><span>    @echo &quot;Targets: all, debug, release, clean, install, libmylib.a, libmylib.so&quot;</span></span></code></pre></div><p>这<code>@</code>抑制命令回显，仅打印您的消息。</p><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make help</span></span></code></pre></div><h4 id="步骤-8-使用变量作为路径和选项" tabindex="-1">步骤 8. 使用变量作为路径和选项 <a class="header-anchor" href="#步骤-8-使用变量作为路径和选项" aria-label="Permalink to &quot;步骤 8. 使用变量作为路径和选项&quot;">​</a></h4><p>通过对相关标志进行分组来清理 Makefile：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>SRC = $(wildcard *.c)</span></span>
<span class="line"><span>OBJ = $(SRC:.c=.o)</span></span>
<span class="line"><span>CFLAGS = -Wall -Wextra -std=c99</span></span>
<span class="line"><span>LDFLAGS = -lm</span></span>
<span class="line"><span>TARGET = app</span></span>
<span class="line"><span>$(TARGET): $(OBJ)</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f $(OBJ) $(TARGET)</span></span></code></pre></div><p><code>wildcard</code>和<code>patsubst</code>让你自动包含新的<code>.c</code>随着项目的增长而生成的文件。</p><h4 id="小代码-最终完善的-makefile" tabindex="-1">小代码：最终完善的 Makefile <a class="header-anchor" href="#小代码-最终完善的-makefile" aria-label="Permalink to &quot;小代码：最终完善的 Makefile&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -Wall -Wextra -std=c99 -O2</span></span>
<span class="line"><span>LDFLAGS = -lm</span></span>
<span class="line"><span>SRC = $(wildcard *.c)</span></span>
<span class="line"><span>OBJ = $(SRC:.c=.o)</span></span>
<span class="line"><span>TARGET = app</span></span>
<span class="line"><span>all: $(TARGET)</span></span>
<span class="line"><span>$(TARGET): $(OBJ)</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)</span></span>
<span class="line"><span>%.o: %.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c $&lt; -o $@</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f $(OBJ) $(TARGET)</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>./app</span></span></code></pre></div><p>这种模式简单、健壮且可扩展，是几乎所有 C 构建系统的基础。</p><h4 id="步骤9-makefile调试" tabindex="-1">步骤9.Makefile调试 <a class="header-anchor" href="#步骤9-makefile调试" aria-label="Permalink to &quot;步骤9.Makefile调试&quot;">​</a></h4><p>查看有哪些命令<code>make</code>正在运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make VERBOSE=1</span></span></code></pre></div><p>或者跟踪变量扩展：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make -p</span></span></code></pre></div><p>添加<code>@echo &quot;Building $@&quot;</code>为了清楚起见，在命令之前。</p><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>精心设计的 Makefile：</p><ul><li>自动化您的整个 C 构建工作流程</li><li>避免重新编译未更改的文件</li><li>扩展到大型多目录项目</li><li>使您的构建可跨系统重现</li></ul><p>这是您迈向 CMake、Meson 或 Bazel 等专业构建系统的第一步，所有这些系统都建立在这些原则之上。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加一个新的<code>.c</code>文件并观察 Makefile 自动编译它。 2.添加一个<code>test</code>编译和运行单元测试的目标。 3. 使用添加彩色输出<code>tput</code>或 ANSI 转义。 4. 在一次运行中构建静态库和共享库。 5. 将 Makefile 转换为使用多个目录 (<code>src/</code>,<code>include/</code>,<code>build/</code>).</p><p>恭喜！您已经完成了第 6 章 – 编译和构建过程。您现在了解了源代码如何成为可执行文件、从预处理器到链接器的每个阶段以及其间的每个工具。</p><p>接下来，我们将深入了解第 7 章：靠近系统工作，您的程序开始通过系统调用、进程和文件直接与操作系统交互。</p>`,77)])])}const b=s(l,[["render",i]]);export{u as __pageData,b as default};
