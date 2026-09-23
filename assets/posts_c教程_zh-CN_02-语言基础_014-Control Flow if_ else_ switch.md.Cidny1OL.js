import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"14. 控制流程：if、else、switch","description":"The Little Book of C 中文版 — 14. 控制流程：if、else、switch","frontmatter":{"title":"14. 控制流程：if、else、switch","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","02-语言基础","中文"],"description":"The Little Book of C 中文版 — 14. 控制流程：if、else、switch","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"14","sidebarWeight":"14","alternateZh":"/posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch","alternateEn":"/posts/c教程/en-US/02-Language Basics/014-Control Flow if, else, switch"},"headers":[],"relativePath":"posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch.md","filePath":"posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch.md"};function i(l,s,o,c,d,r){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/02-Language Basics/014-Control Flow if, else, switch)</p><p>当程序可以决定时，当它们可以根据数据或条件选择一条路径或另一条路径时，程序就会变得强大。在 C 语言中，控制流语句为您提供了这种能力。它们决定您的程序如何在代码的不同部分中移动。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int temperature = 30;</span></span>
<span class="line"><span>    if (temperature &gt; 35) {</span></span>
<span class="line"><span>        printf(&quot;It&#39;s too hot!\\n&quot;);</span></span>
<span class="line"><span>    } else if (temperature &gt; 25) {</span></span>
<span class="line"><span>        printf(&quot;It&#39;s warm.\\n&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        printf(&quot;It&#39;s cool.\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>It&#39;s warm.</span></span></code></pre></div><p>这就是在 C 中表达逻辑的方式：通过检查条件并仅执行匹配的代码。</p><h4 id="if-和-else-结构" tabindex="-1">if 和 else 结构 <a class="header-anchor" href="#if-和-else-结构" aria-label="Permalink to &quot;if 和 else 结构&quot;">​</a></h4><p>基本模式如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (condition) {</span></span>
<span class="line"><span>    // do something if true</span></span>
<span class="line"><span>} else if (another_condition) {</span></span>
<span class="line"><span>    // do something else</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    // default action</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>每个<code>if</code>或者<code>else if</code>检查必须评估为的条件<code>true</code>（非零）或<code>false</code>（零）。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int score = 85;</span></span>
<span class="line"><span>if (score &gt;= 90)</span></span>
<span class="line"><span>    printf(&quot;Grade: A\\n&quot;);</span></span>
<span class="line"><span>else if (score &gt;= 80)</span></span>
<span class="line"><span>    printf(&quot;Grade: B\\n&quot;);</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    printf(&quot;Grade: C or below\\n&quot;);</span></span></code></pre></div><h4 id="比较和布尔逻辑" tabindex="-1">比较和布尔逻辑 <a class="header-anchor" href="#比较和布尔逻辑" aria-label="Permalink to &quot;比较和布尔逻辑&quot;">​</a></h4><p>C没有内置的<code>bool</code>输入较旧的标准，但从 C99 开始，您可以包含它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdbool.h&gt;</span></span>
<span class="line"><span>bool is_ready = true;</span></span>
<span class="line"><span>if (is_ready) printf(&quot;Let&#39;s go!\\n&quot;);</span></span></code></pre></div><p>在幕后，<code>true</code>只是<code>1</code>和<code>false</code>是<code>0</code>.</p><h4 id="嵌套-if-语句" tabindex="-1">嵌套 if 语句 <a class="header-anchor" href="#嵌套-if-语句" aria-label="Permalink to &quot;嵌套 if 语句&quot;">​</a></h4><p>您可以嵌套决策以实现更复杂的逻辑：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (x &gt; 0) {</span></span>
<span class="line"><span>    if (x % 2 == 0)</span></span>
<span class="line"><span>        printf(&quot;Positive even number\\n&quot;);</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        printf(&quot;Positive odd number\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>请注意，过多的嵌套会使代码更难阅读。当逻辑变得复杂时，考虑重新组织或使用<code>switch</code>陈述。</p><h4 id="switch-语句" tabindex="-1">switch 语句 <a class="header-anchor" href="#switch-语句" aria-label="Permalink to &quot;switch 语句&quot;">​</a></h4><p><code>switch</code>是一种针对多个固定值测试一个变量的简洁方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int day = 3;</span></span>
<span class="line"><span>    switch (day) {</span></span>
<span class="line"><span>        case 1:</span></span>
<span class="line"><span>            printf(&quot;Monday\\n&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case 2:</span></span>
<span class="line"><span>            printf(&quot;Tuesday\\n&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case 3:</span></span>
<span class="line"><span>            printf(&quot;Wednesday\\n&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            printf(&quot;Another day\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Wednesday</span></span></code></pre></div><p>每个<code>case</code>标签标记了一个潜在的分支。<code>break</code>阻止开关“掉入”下一个案例。</p><p>您可以对多个案例进行分组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>switch (ch) {</span></span>
<span class="line"><span>    case &#39;a&#39;:</span></span>
<span class="line"><span>    case &#39;A&#39;:</span></span>
<span class="line"><span>        printf(&quot;Letter A detected\\n&quot;);</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="三元运算符" tabindex="-1">三元运算符 <a class="header-anchor" href="#三元运算符" aria-label="Permalink to &quot;三元运算符&quot;">​</a></h4><p>为了快速做出决定，您可以使用条件运算符：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int age = 20;</span></span>
<span class="line"><span>printf(&quot;%s\\n&quot;, (age &gt;= 18) ? &quot;Adult&quot; : &quot;Minor&quot;);</span></span></code></pre></div><p>这相当于：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (age &gt;= 18)</span></span>
<span class="line"><span>    printf(&quot;Adult\\n&quot;);</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    printf(&quot;Minor\\n&quot;);</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>控制流为您的程序提供智能。您的代码不是直接运行，而是对输入、条件和数据做出反应。 C 的分支语句简单但灵活，它们是从排序算法到操作系统调度程序的所有内容的构建块。</p><p>当您了解如何控制执行时，您可以精确地塑造程序的逻辑。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>编写一个程序：</p><ul><li>从用户处读取一个整数。</li><li>打印它是正数、负数还是零。</li></ul><p>扩展一下：</p><ul><li>如果是正数，则打印它是偶数还是奇数。</li></ul><p>使用一个<code>switch</code>陈述：</p><ul><li>询问数字 1-7。</li><li>打印匹配的星期几。</li></ul><p>尝试更换你的<code>if</code>在有意义的情况下使用三元运算符的语句。</p><p>控制流是你在代码中思考的方式，它是你教你的程序像你一样做出决策的方式。</p>`,46)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};
