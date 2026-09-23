import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"34. 位域和内存打包","description":"The Little Book of C 中文版 — 34. 位域和内存打包","frontmatter":{"title":"34. 位域和内存打包","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 34. 位域和内存打包","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":34,"sidebarWeight":34,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/034-Bitfields and Memory Packing","alternateEn":"/posts/c教程/en-US/04-Structuring Data/034-Bitfields and Memory Packing"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/034-Bitfields and Memory Packing.md","filePath":"posts/c教程/zh-CN/04-数据结构/034-Bitfields and Memory Packing.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/04-数据结构/034-Bitfields and Memory Packing.md"};function t(l,s,c,o,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/034-Bitfields and Memory Packing)</p><p>C 允许您使用位域将数据布局控制到位级别。它们允许您在结构内紧凑地存储小值，非常适合标志、配置寄存器或通信协议。与打包相结合，您可以将数据压缩到最小的空间，同时仍然保持易于符号操作。</p><h4 id="什么是位域" tabindex="-1">什么是位域？ <a class="header-anchor" href="#什么是位域" aria-label="Permalink to &quot;什么是位域？&quot;">​</a></h4><p>位字段允许您定义为内部字段分配的确切位数。<code>struct</code>.</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Flags {</span></span>
<span class="line"><span>    unsigned int is_visible : 1;</span></span>
<span class="line"><span>    unsigned int is_enabled : 1;</span></span>
<span class="line"><span>    unsigned int has_error  : 1;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这里，每个字段仅使用 1 位，而不是完整的 4 字节<code>int</code>。这意味着 8 个这样的标志可以轻松容纳在一个字节中。</p><h4 id="声明和使用位域" tabindex="-1">声明和使用位域 <a class="header-anchor" href="#声明和使用位域" aria-label="Permalink to &quot;声明和使用位域&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>struct Status {</span></span>
<span class="line"><span>    unsigned int connected : 1;</span></span>
<span class="line"><span>    unsigned int error     : 1;</span></span>
<span class="line"><span>    unsigned int active    : 1;</span></span>
<span class="line"><span>    unsigned int reserved  : 5; // padding bits</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Status s = {1, 0, 1, 0};</span></span>
<span class="line"><span>    printf(&quot;Connected: %u, Active: %u\\n&quot;, s.connected, s.active);</span></span>
<span class="line"><span>    s.error = 1;</span></span>
<span class="line"><span>    printf(&quot;Error now: %u\\n&quot;, s.error);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Connected: 1, Active: 1</span></span>
<span class="line"><span>Error now: 1</span></span></code></pre></div><p>尽管有 4 个字段，但整个结构通常只占用 1 个字节。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个完整的示例，演示了打包标志和打印位值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>struct DeviceStatus {</span></span>
<span class="line"><span>    unsigned int powered_on : 1;</span></span>
<span class="line"><span>    unsigned int connected  : 1;</span></span>
<span class="line"><span>    unsigned int has_error  : 1;</span></span>
<span class="line"><span>    unsigned int battery_low: 1;</span></span>
<span class="line"><span>    unsigned int reserved   : 4;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void print_bits(unsigned char byte) {</span></span>
<span class="line"><span>    for (int i = 7; i &gt;= 0; i--)</span></span>
<span class="line"><span>        printf(&quot;%d&quot;, (byte &gt;&gt; i) &amp; 1);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct DeviceStatus d = {1, 1, 0, 0, 0};</span></span>
<span class="line"><span>    printf(&quot;Size of DeviceStatus: %zu bytes\\n&quot;, sizeof(d));</span></span>
<span class="line"><span>    unsigned char *raw = (unsigned char*)&amp;d;</span></span>
<span class="line"><span>    printf(&quot;Binary layout: &quot;);</span></span>
<span class="line"><span>    print_bits(*raw);</span></span>
<span class="line"><span>    d.has_error = 1;</span></span>
<span class="line"><span>    printf(&quot;Updated binary: &quot;);</span></span>
<span class="line"><span>    print_bits(*raw);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出（可能因平台而异）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Size of DeviceStatus: 1 bytes</span></span>
<span class="line"><span>Binary layout: 00000011</span></span>
<span class="line"><span>Updated binary: 00000111</span></span></code></pre></div><h4 id="嵌套位域示例" tabindex="-1">嵌套位域示例 <a class="header-anchor" href="#嵌套位域示例" aria-label="Permalink to &quot;嵌套位域示例&quot;">​</a></h4><p>您甚至可以在嵌套结构中使用位字段来创建紧凑但富有表现力的数据模型：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Sensor {</span></span>
<span class="line"><span>    unsigned id       : 4;  // 0–15</span></span>
<span class="line"><span>    unsigned type     : 3;  // 0–7</span></span>
<span class="line"><span>    unsigned active   : 1;  // boolean</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>struct Device {</span></span>
<span class="line"><span>    struct Sensor sensors[2];</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>现在，每个传感器条目都整齐地装入一个字节中。</p><h4 id="内存打包" tabindex="-1">内存打包 <a class="header-anchor" href="#内存打包" aria-label="Permalink to &quot;内存打包&quot;">​</a></h4><p>默认情况下，编译器可能会插入填充字节来对齐字段以加快访问速度。如果您想要更紧密的打包，例如，将二进制数据保存到文件或通过网络发送时，您可以请求打包结构。</p><p>编译器指令因系统而异：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#pragma pack(push, 1)</span></span>
<span class="line"><span>struct Packet {</span></span>
<span class="line"><span>    char type;</span></span>
<span class="line"><span>    unsigned int length;</span></span>
<span class="line"><span>    short checksum;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>#pragma pack(pop)</span></span></code></pre></div><p>现在，结构体紧密包装，字段之间没有对齐填充。</p><h4 id="实际系统中的位域" tabindex="-1">实际系统中的位域 <a class="header-anchor" href="#实际系统中的位域" aria-label="Permalink to &quot;实际系统中的位域&quot;">​</a></h4><p>位域在系统编程中无处不在：</p><ul><li>硬件控制寄存器：代表设备的开/关位。</li><li>网络协议：TCP、UDP 或 IP 标头中的标志。</li><li>压缩和序列化：状态或元数据的紧凑表示。</li><li>嵌入式系统：将 RAM 的每个字节保存在微控制器中。</li></ul><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-label="Permalink to &quot;局限性&quot;">​</a></h4><ul><li>位字段排序（哪个位是“第一个”）取决于实现，因编译器和平台而异。</li><li>它们无法跨架构可靠地跨越字边界。</li><li>位域不能直接用指针寻址（<code>&amp;field</code>不允许）。</li><li>如果跨不同系统传输，字节序很重要。</li></ul><p>对于便携式位级控制（尤其是在网络中），许多工程师使用显式位运算符。</p><h4 id="手动按位控制" tabindex="-1">手动按位控制 <a class="header-anchor" href="#手动按位控制" aria-label="Permalink to &quot;手动按位控制&quot;">​</a></h4><p>有时您会更喜欢手动蒙版和班次：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsigned char flags = 0;</span></span>
<span class="line"><span>flags |= (1 &lt;&lt; 0); // set bit 0</span></span>
<span class="line"><span>flags |= (1 &lt;&lt; 2); // set bit 2</span></span>
<span class="line"><span>flags &amp;= ~(1 &lt;&lt; 0); // clear bit 0</span></span></code></pre></div><p>这种方法更便携、更明确，但对于大量标志来说可读性较差。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>位域使您能够对内存布局和二进制表示进行紧凑的控制。它们在以下方面至关重要：</p><ul><li>嵌入式固件</li><li>网络堆栈</li><li>内核驱动程序</li><li>压缩库</li></ul><p>只要您了解对齐和可移植性问题，它们就会使您的代码富有表现力且高效。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>定义一个结构体<code>Permissions</code>具有 1 位字段<code>read</code>,<code>write</code>， 和<code>execute</code>.</li><li>打印其尺寸并检查其紧凑程度。</li><li>使用位域结构来表示简化的 TCP 标头（SYN、ACK、FIN 等标志）。</li><li>使用<code>#pragma pack(1)</code>并观察尺寸差异。</li><li>使用按位运算符编写函数来设置、清除和切换位。</li></ol><p>位域是 C 与硬件相遇的地方。它们让你不仅可以用字节来与机器对话，还可以用位来与机器对话，这是计算机的真正语言。接下来，您将重新审视枚举，并了解它们如何通过为值赋予符号含义来补充这些紧凑的结构。</p>`,43)])])}const g=a(i,[["render",t]]);export{h as __pageData,g as default};
