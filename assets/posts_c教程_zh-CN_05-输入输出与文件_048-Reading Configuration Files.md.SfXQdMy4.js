import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"48. 读取配置文件","description":"The Little Book of C 中文版 — 48. 读取配置文件","frontmatter":{"title":"48. 读取配置文件","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","05-输入输出与文件","中文"],"description":"The Little Book of C 中文版 — 48. 读取配置文件","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":48,"sidebarWeight":48,"alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files"},"headers":[],"relativePath":"posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files.md","filePath":"posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files.md"};function l(t,s,o,c,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files)</p><p>随着 C 程序的增长，文件路径、阈值或用户首选项等硬编码设置变得有限。配置文件允许您的程序在运行时读取设置，这是工具、服务器和嵌入式系统的关键功能。</p><p>您将学习如何使用标准 I/O 和字符串处理来读取和解析配置文件。</p><h4 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h4><p>配置文件可能如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>port=8080</span></span>
<span class="line"><span>host=localhost</span></span>
<span class="line"><span>max_clients=100</span></span>
<span class="line"><span>log_file=server.log</span></span></code></pre></div><p>你的程序应该：</p><p>1.打开文件 2.逐行阅读 3. 将每一行分成<code>key</code>和<code>value</code> 4. 存储或使用这些值</p><h4 id="步骤-1-定义-config-的结构" tabindex="-1">步骤 1. 定义 Config 的结构 <a class="header-anchor" href="#步骤-1-定义-config-的结构" aria-label="Permalink to &quot;步骤 1. 定义 Config 的结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#define MAX_LINE 128</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int port;</span></span>
<span class="line"><span>    char host[64];</span></span>
<span class="line"><span>    int max_clients;</span></span>
<span class="line"><span>    char log_file[64];</span></span>
<span class="line"><span>} Config;</span></span></code></pre></div><p>这<code>Config</code>struct 将保存解析后的值。</p><h4 id="步骤-2-实现解析器" tabindex="-1">步骤 2. 实现解析器 <a class="header-anchor" href="#步骤-2-实现解析器" aria-label="Permalink to &quot;步骤 2. 实现解析器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void load_config(const char *filename, Config *cfg) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;r&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open config file&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    char line[MAX_LINE];</span></span>
<span class="line"><span>    while (fgets(line, sizeof(line), fp)) {</span></span>
<span class="line"><span>        line[strcspn(line, &quot;\\n&quot;)] = &#39;\\0&#39;; // remove newline</span></span>
<span class="line"><span>        if (line[0] == &#39;#&#39; || strlen(line) == 0)</span></span>
<span class="line"><span>            continue; // skip comments and blanks</span></span>
<span class="line"><span>        char key[64], value[64];</span></span>
<span class="line"><span>        if (sscanf(line, &quot;%63[^=]=%63s&quot;, key, value) == 2) {</span></span>
<span class="line"><span>            if (strcmp(key, &quot;port&quot;) == 0)</span></span>
<span class="line"><span>                cfg-&gt;port = atoi(value);</span></span>
<span class="line"><span>            else if (strcmp(key, &quot;host&quot;) == 0)</span></span>
<span class="line"><span>                strncpy(cfg-&gt;host, value, sizeof(cfg-&gt;host));</span></span>
<span class="line"><span>            else if (strcmp(key, &quot;max_clients&quot;) == 0)</span></span>
<span class="line"><span>                cfg-&gt;max_clients = atoi(value);</span></span>
<span class="line"><span>            else if (strcmp(key, &quot;log_file&quot;) == 0)</span></span>
<span class="line"><span>                strncpy(cfg-&gt;log_file, value, sizeof(cfg-&gt;log_file));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个功能：</p><ul><li>读取每一行</li><li>忽略注释和空行</li><li>使用提取键值对<code>sscanf()</code></li><li>更新字段<code>Config</code></li></ul><h4 id="步骤-3-使用配置" tabindex="-1">步骤 3. 使用配置 <a class="header-anchor" href="#步骤-3-使用配置" aria-label="Permalink to &quot;步骤 3. 使用配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Config cfg = {0};</span></span>
<span class="line"><span>    load_config(&quot;config.txt&quot;, &amp;cfg);</span></span>
<span class="line"><span>    printf(&quot;Server settings:\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;Host: %s\\n&quot;, cfg.host);</span></span>
<span class="line"><span>    printf(&quot;Port: %d\\n&quot;, cfg.port);</span></span>
<span class="line"><span>    printf(&quot;Max clients: %d\\n&quot;, cfg.max_clients);</span></span>
<span class="line"><span>    printf(&quot;Log file: %s\\n&quot;, cfg.log_file);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>运行<code>config.txt</code>文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>host=127.0.0.1</span></span>
<span class="line"><span>port=9090</span></span>
<span class="line"><span>max_clients=250</span></span>
<span class="line"><span>log_file=/tmp/server.log</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Server settings:</span></span>
<span class="line"><span>Host: 127.0.0.1</span></span>
<span class="line"><span>Port: 9090</span></span>
<span class="line"><span>Max clients: 250</span></span>
<span class="line"><span>Log file: /tmp/server.log</span></span></code></pre></div><h4 id="小代码-默认后备" tabindex="-1">小代码：默认后备 <a class="header-anchor" href="#小代码-默认后备" aria-label="Permalink to &quot;小代码：默认后备&quot;">​</a></h4><p>您可以在读取文件之前初始化合理的默认值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Config cfg = {</span></span>
<span class="line"><span>    .port = 8080,</span></span>
<span class="line"><span>    .host = &quot;localhost&quot;,</span></span>
<span class="line"><span>    .max_clients = 100,</span></span>
<span class="line"><span>    .log_file = &quot;server.log&quot;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这可以确保即使文件缺少某些值，您的程序仍然可以运行。</p><h4 id="步骤-4-可选-处理引用的值" tabindex="-1">步骤 4. 可选：处理引用的值 <a class="header-anchor" href="#步骤-4-可选-处理引用的值" aria-label="Permalink to &quot;步骤 4. 可选：处理引用的值&quot;">​</a></h4><p>如果您期望带有空格的值（例如<code>name=&quot;My Server&quot;</code>），可以修改解析逻辑：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (sscanf(line, &quot;%63[^=]=\\&quot;%63[^\\&quot;]\\&quot;&quot;, key, value) == 2) {</span></span>
<span class="line"><span>    // handle quoted strings</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-5-可选-通用存储" tabindex="-1">步骤 5. 可选：通用存储 <a class="header-anchor" href="#步骤-5-可选-通用存储" aria-label="Permalink to &quot;步骤 5. 可选：通用存储&quot;">​</a></h4><p>对于更灵活的系统，您可以使用哈希表或键值对数组来代替固定字段：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char key[64];</span></span>
<span class="line"><span>    char value[64];</span></span>
<span class="line"><span>} KVPair;</span></span>
<span class="line"><span>KVPair settings[100];</span></span></code></pre></div><p>这允许加载任意密钥而无需重新编译程序。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>配置文件让您：</p><ul><li>将代码与数据分开，无需重新编译即可改变行为</li><li>适应环境、开发、测试、生产</li><li>使您的程序可以被其他人重用</li></ul><p>它们无处不在，从<code>.ini</code>和<code>.conf</code>现代系统中复杂的 YAML/JSON 格式的文件。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加支持<code>#</code>注释和空行（安全地跳过它们）。 2. 让解析器打印未知键的警告。 3.添加功能<code>save_config()</code>将结构写回文件。 4.添加<code>reload_config()</code>在运行时更新设置。 5. 实施你自己的<code>.ini</code>格式解析器支持<code>[section]</code>标头。</p><p>通过配置文件，您的 C 程序可以获得灵活性和实际可用性，它们可以像专业系统软件一样适应、重新加载和保留设置。接下来，您将学习如何将结构序列化和反序列化到磁盘，这是第 49 节中持久数据处理的下一个级别。</p>`,39)])])}const g=a(i,[["render",l]]);export{h as __pageData,g as default};
