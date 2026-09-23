import{_ as a,o as n,c as e,a5 as i}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"48. Reading Configuration Files","description":"The Little Book of C — 48. Reading Configuration Files","frontmatter":{"title":"48. Reading Configuration Files","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Input Output and Files"],"description":"The Little Book of C — 48. Reading Configuration Files","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":48,"sidebarWeight":48,"lang":"en-US","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files","alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files"},"headers":[],"relativePath":"posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files.md","filePath":"posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files.md"};function p(l,s,o,c,r,d){return n(),e("div",null,[...s[0]||(s[0]=[i(`<p>[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files)</p><p>As your C programs grow, hardcoding settings like file paths, thresholds, or user preferences becomes limiting. Configuration files let your program read settings at runtime, a critical capability for tools, servers, and embedded systems.</p><p>You’ll learn how to read and parse configuration files using standard I/O and string handling.</p><h4 id="the-goal" tabindex="-1">The Goal <a class="header-anchor" href="#the-goal" aria-label="Permalink to &quot;The Goal&quot;">​</a></h4><p>A configuration file might look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>port=8080</span></span>
<span class="line"><span>host=localhost</span></span>
<span class="line"><span>max_clients=100</span></span>
<span class="line"><span>log_file=server.log</span></span></code></pre></div><p>Your program should:</p><ol><li>Open the file</li><li>Read it line by line</li><li>Split each line into<code>key</code> and<code>value</code></li><li>Store or use those values</li></ol><h4 id="step-1-define-a-structure-for-config" tabindex="-1">Step 1. Define a Structure for Config <a class="header-anchor" href="#step-1-define-a-structure-for-config" aria-label="Permalink to &quot;Step 1. Define a Structure for Config&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#define MAX_LINE 128</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int port;</span></span>
<span class="line"><span>    char host[64];</span></span>
<span class="line"><span>    int max_clients;</span></span>
<span class="line"><span>    char log_file[64];</span></span>
<span class="line"><span>} Config;</span></span></code></pre></div><p>This<code>Config</code> struct will hold parsed values.</p><h4 id="step-2-implement-the-parser" tabindex="-1">Step 2. Implement the Parser <a class="header-anchor" href="#step-2-implement-the-parser" aria-label="Permalink to &quot;Step 2. Implement the Parser&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void load_config(const char *filename, Config *cfg) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>This function:</p><ul><li>Reads each line</li><li>Ignores comments and empty lines</li><li>Extracts key-value pairs using<code>sscanf()</code></li><li>Updates fields in<code>Config</code></li></ul><h4 id="step-3-use-the-configuration" tabindex="-1">Step 3. Use the Configuration <a class="header-anchor" href="#step-3-use-the-configuration" aria-label="Permalink to &quot;Step 3. Use the Configuration&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Config cfg = {0};</span></span>
<span class="line"><span>    load_config(&quot;config.txt&quot;, &amp;cfg);</span></span>
<span class="line"><span>    printf(&quot;Server settings:\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;Host: %s\\n&quot;, cfg.host);</span></span>
<span class="line"><span>    printf(&quot;Port: %d\\n&quot;, cfg.port);</span></span>
<span class="line"><span>    printf(&quot;Max clients: %d\\n&quot;, cfg.max_clients);</span></span>
<span class="line"><span>    printf(&quot;Log file: %s\\n&quot;, cfg.log_file);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Run with a<code>config.txt</code> file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>host=127.0.0.1</span></span>
<span class="line"><span>port=9090</span></span>
<span class="line"><span>max_clients=250</span></span>
<span class="line"><span>log_file=/tmp/server.log</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Server settings:</span></span>
<span class="line"><span>Host: 127.0.0.1</span></span>
<span class="line"><span>Port: 9090</span></span>
<span class="line"><span>Max clients: 250</span></span>
<span class="line"><span>Log file: /tmp/server.log</span></span></code></pre></div><h4 id="tiny-code-default-fallbacks" tabindex="-1">Tiny Code: Default Fallbacks <a class="header-anchor" href="#tiny-code-default-fallbacks" aria-label="Permalink to &quot;Tiny Code: Default Fallbacks&quot;">​</a></h4><p>You can initialize sensible defaults before reading the file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Config cfg = {</span></span>
<span class="line"><span>    .port = 8080,</span></span>
<span class="line"><span>    .host = &quot;localhost&quot;,</span></span>
<span class="line"><span>    .max_clients = 100,</span></span>
<span class="line"><span>    .log_file = &quot;server.log&quot;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>This ensures your program still works even if the file is missing some values.</p><h4 id="step-4-optional-handle-quoted-values" tabindex="-1">Step 4. Optional: Handle Quoted Values <a class="header-anchor" href="#step-4-optional-handle-quoted-values" aria-label="Permalink to &quot;Step 4. Optional: Handle Quoted Values&quot;">​</a></h4><p>If you expect values with spaces (like<code>name=&quot;My Server&quot;</code>), you can modify parsing logic:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (sscanf(line, &quot;%63[^=]=\\&quot;%63[^\\&quot;]\\&quot;&quot;, key, value) == 2) {</span></span>
<span class="line"><span>    // handle quoted strings</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-5-optional-generic-storage" tabindex="-1">Step 5. Optional: Generic Storage <a class="header-anchor" href="#step-5-optional-generic-storage" aria-label="Permalink to &quot;Step 5. Optional: Generic Storage&quot;">​</a></h4><p>For more flexible systems, you can use a hash table or array of key-value pairs instead of fixed fields:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char key[64];</span></span>
<span class="line"><span>    char value[64];</span></span>
<span class="line"><span>} KVPair;</span></span>
<span class="line"><span>KVPair settings[100];</span></span></code></pre></div><p>This allows loading arbitrary keys without recompiling the program.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Configuration files let you:</p><ul><li>Separate code from data, no need to recompile to change behavior</li><li>Adapt to environments, dev, test, production</li><li>Make your program reusable by others</li></ul><p>They’re used everywhere, from<code>.ini</code> and<code>.conf</code> files to complex YAML/JSON formats in modern systems.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add support for<code>#</code> comments and empty lines (skip them safely).</li><li>Make the parser print a warning for unknown keys.</li><li>Add a function<code>save_config()</code> that writes the struct back to a file.</li><li>Add<code>reload_config()</code> to update settings at runtime.</li><li>Implement your own<code>.ini</code> format parser supporting<code>[section]</code> headers.</li></ol><p>With configuration files, your C programs gain flexibility and real-world usability, they can adapt, reload, and persist settings just like professional systems software. Next, you’ll learn how to serialize and deserialize structs to disk, the next level of persistent data handling in Section 49.</p>`,39)])])}const g=a(t,[["render",p]]);export{h as __pageData,g as default};
