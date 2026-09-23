import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"99. 打包、版本控制和文档","description":"The Little Book of C 中文版 — 99. 打包、版本控制和文档","frontmatter":{"title":"99. 打包、版本控制和文档","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 99. 打包、版本控制和文档","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":99,"sidebarWeight":99,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/099-Packaging, Versioning, and Documentation"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation.md","filePath":"posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation.md"};function l(t,a,c,o,d,r){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/099-Packaging, Versioning, and Documentation)</p><p>您已经编写了真正的 C 程序 - 现在是时候像专业人士一样打包、版本化和记录它们了。这就是使您的代码可供其他人使用并可供未来的您维护的原因。</p><h4 id="步骤1-包装的目标" tabindex="-1">步骤1. 包装的目标 <a class="header-anchor" href="#步骤1-包装的目标" aria-label="Permalink to &quot;步骤1. 包装的目标&quot;">​</a></h4><p>打包的目的是让您的项目易于：</p><ul><li>建造 （<code>make</code>,<code>cmake</code>， 或者<code>meson</code>)</li><li>安装 （<code>make install</code>)</li><li>关联 （<code>pkg-config</code>)</li><li>使用 （<code>#include &quot;yourlib.h&quot;</code>)</li></ul><p>您将创建一个结构，帮助其他人无需猜测即可构建和使用您的代码。</p><h4 id="步骤-2-标准项目布局" tabindex="-1">步骤 2. 标准项目布局 <a class="header-anchor" href="#步骤-2-标准项目布局" aria-label="Permalink to &quot;步骤 2. 标准项目布局&quot;">​</a></h4><p>C 项目的简单、常规布局：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>myproject/</span></span>
<span class="line"><span>├── include/</span></span>
<span class="line"><span>│   └── myproject.h</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── main.c</span></span>
<span class="line"><span>│   └── util.c</span></span>
<span class="line"><span>├── tests/</span></span>
<span class="line"><span>│   └── test_basic.c</span></span>
<span class="line"><span>├── Makefile</span></span>
<span class="line"><span>├── README.md</span></span>
<span class="line"><span>└── LICENSE</span></span></code></pre></div><p>-<code>include/</code>保存其他人可以包含的标头 -<code>src/</code>保存您的实施文件 -<code>tests/</code>举行单元测试 -<code>Makefile</code>定义如何构建和安装</p><h4 id="步骤-3-tiny-code-一个简单的可重用库" tabindex="-1">步骤 3.Tiny Code：一个简单的可重用库 <a class="header-anchor" href="#步骤-3-tiny-code-一个简单的可重用库" aria-label="Permalink to &quot;步骤 3.Tiny Code：一个简单的可重用库&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// include/myproject.h</span></span>
<span class="line"><span>#ifndef MYPROJECT_H</span></span>
<span class="line"><span>#define MYPROJECT_H</span></span>
<span class="line"><span>int add(int a, int b);</span></span>
<span class="line"><span>int sub(int a, int b);</span></span>
<span class="line"><span>#endif</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// src/myproject.c</span></span>
<span class="line"><span>#include &quot;myproject.h&quot;</span></span>
<span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>int sub(int a, int b) { return a - b; }</span></span></code></pre></div><h4 id="步骤-4-最小-makefile" tabindex="-1">步骤 4. 最小 Makefile <a class="header-anchor" href="#步骤-4-最小-makefile" aria-label="Permalink to &quot;步骤 4. 最小 Makefile&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC      = gcc</span></span>
<span class="line"><span>CFLAGS  = -std=c23 -O2 -Wall -Iinclude</span></span>
<span class="line"><span>LDFLAGS =</span></span>
<span class="line"><span>SRC = $(wildcard src/*.c)</span></span>
<span class="line"><span>OBJ = $(SRC:.c=.o)</span></span>
<span class="line"><span>LIB = libmyproject.a</span></span>
<span class="line"><span>.PHONY: all clean install uninstall</span></span>
<span class="line"><span>all: $(LIB)</span></span>
<span class="line"><span>$(LIB): $(OBJ)</span></span>
<span class="line"><span>    ar rcs $@ $^</span></span>
<span class="line"><span>%.o: %.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) -c $&lt; -o $@</span></span>
<span class="line"><span>install:</span></span>
<span class="line"><span>    mkdir -p /usr/local/include/myproject</span></span>
<span class="line"><span>    cp include/*.h /usr/local/include/myproject/</span></span>
<span class="line"><span>    cp $(LIB) /usr/local/lib/</span></span>
<span class="line"><span>uninstall:</span></span>
<span class="line"><span>    rm -f /usr/local/lib/$(LIB)</span></span>
<span class="line"><span>    rm -rf /usr/local/include/myproject</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f $(OBJ) $(LIB)</span></span></code></pre></div><p>构建库：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span>
<span class="line"><span>sudo make install</span></span></code></pre></div><p>然后另一个项目可以链接到它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc main.c -lmyproject -L/usr/local/lib -I/usr/local/include/myproject</span></span></code></pre></div><h4 id="步骤-5-对您的版本进行版本控制" tabindex="-1">步骤 5. 对您的版本进行版本控制 <a class="header-anchor" href="#步骤-5-对您的版本进行版本控制" aria-label="Permalink to &quot;步骤 5. 对您的版本进行版本控制&quot;">​</a></h4><p>遵循语义版本控制：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vMAJOR.MINOR.PATCH</span></span></code></pre></div><p>示例：</p><p>-<code>v1.0.0</code>– 稳定发布 -<code>v1.1.0</code>– 新功能，向后兼容 -<code>v1.1.1</code>– 错误修复，没有 API 更改 -<code>v2.0.0</code>– 重大 API 变更</p><p>在 git 中标记您的版本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git tag -a v1.0.0 -m &quot;First stable release&quot;</span></span>
<span class="line"><span>git push origin v1.0.0</span></span></code></pre></div><h4 id="步骤-6-创建-pkg-config-文件" tabindex="-1">步骤 6. 创建 pkg-config 文件 <a class="header-anchor" href="#步骤-6-创建-pkg-config-文件" aria-label="Permalink to &quot;步骤 6. 创建 pkg-config 文件&quot;">​</a></h4><p><code>pkg-config</code>让其他人轻松编译您的库。</p><p>创造<code>myproject.pc</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>前缀=/usr/local</span></span>
<span class="line"><span>exec_prefix=\${前缀}</span></span>
<span class="line"><span>libdir=\${exec_prefix}/lib</span></span>
<span class="line"><span>Includedir=\${前缀}/include/myproject</span></span>
<span class="line"><span></span></span>
<span class="line"><span>名称： 我的项​​目</span></span>
<span class="line"><span>描述：小型数学助手库</span></span>
<span class="line"><span>版本：1.0.0</span></span>
<span class="line"><span>库：-L\${libdir} -lmyproject</span></span>
<span class="line"><span>Cflags：-I\${includedir}</span></span></code></pre></div><p>将其安装在<code>/usr/local/lib/pkgconfig/</code>并测试：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pkg-config --cflags --libs myproject</span></span></code></pre></div><h4 id="步骤-7-使用-markdown-和-doxygen-进行文档记录" tabindex="-1">步骤 7. 使用 Markdown 和 Doxygen 进行文档记录 <a class="header-anchor" href="#步骤-7-使用-markdown-和-doxygen-进行文档记录" aria-label="Permalink to &quot;步骤 7. 使用 Markdown 和 Doxygen 进行文档记录&quot;">​</a></h4><p>在根目录中保留清晰的 README.md：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># myproject</span></span>
<span class="line"><span>A tiny example C library for arithmetic functions.</span></span>
<span class="line"><span>## Build</span></span></code></pre></div><p>进行 sudo 进行安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>＃＃ 用法</span></span>
<span class="line"><span>\`\`\`\`c</span></span>
<span class="line"><span>#include &lt;myproject.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>printf(&quot;%d\\n&quot;, 添加(3, 4));</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>对于 API 文档，请使用 **Doxygen**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>sudo apt install doxygen</span></span>
<span class="line"><span>doxygen -g</span></span></code></pre></div><p>编辑<code>Doxyfile</code>包含您的源路径，然后运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>doxygen Doxyfile</span></span></code></pre></div><p>文档将出现在<code>html/</code>或者<code>latex/</code>.</p><h4 id="步骤-8-许可" tabindex="-1">步骤 8. 许可 <a class="header-anchor" href="#步骤-8-许可" aria-label="Permalink to &quot;步骤 8. 许可&quot;">​</a></h4><p>添加一个<code>LICENSE</code>文件，以便其他人知道如何使用您的代码。常见的：</p><ul><li>MIT 许可证：简单、宽松</li><li>Apache 2.0：增加专利保护</li><li>GPLv3：确保衍生品保持开放</li></ul><p>源文件的 MIT 许可证标头示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* </span></span>
<span class="line"><span> * Copyright (c) 2025 Your Name</span></span>
<span class="line"><span> * Licensed under the MIT License.</span></span>
<span class="line"><span> */</span></span></code></pre></div><h4 id="步骤-9-持续集成-可选" tabindex="-1">步骤 9.持续集成（可选） <a class="header-anchor" href="#步骤-9-持续集成-可选" aria-label="Permalink to &quot;步骤 9.持续集成（可选）&quot;">​</a></h4><p>添加 GitHub Actions 或其他 CI 服务：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># .github/workflows/build.yml</span></span>
<span class="line"><span>name: Build and Test</span></span>
<span class="line"><span>on: [push, pull_request]</span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  build:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>    - uses: actions/checkout@v3</span></span>
<span class="line"><span>    - run: make</span></span>
<span class="line"><span>    - run: make test || echo &quot;No tests yet&quot;</span></span></code></pre></div><p>现在，每次推送都会自动构建。</p><h4 id="第-10-步-为什么这很重要" tabindex="-1">第 10 步：为什么这很重要 <a class="header-anchor" href="#第-10-步-为什么这很重要" aria-label="Permalink to &quot;第 10 步：为什么这很重要&quot;">​</a></h4><p>专业包装是系统工程师的一部分：</p><ul><li>您的项目可重复构建。</li><li>其他人可以轻松安装、链接和使用它们。</li><li>文档和版本标签创建信心。</li><li>许可明确了所有权。</li></ul><p>您现在已经从 C 程序员转变为 C 维护者，即其他人信任的能够提供可靠、可重用且文档齐全的软件的人。</p><p>接下来是 100. 练习：构建您自己的迷你项目，您将在其中将所有内容整合在一起，用纯 C 语言编写、构建、调试和打包一个完整的小型系统。</p>`,55)])])}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
