import{_ as n,c as a,o as p,ag as l}from"./chunks/framework.oqSrIbQK.js";const k=JSON.parse('{"title":"Swift 入门（1）：语法速览","description":"","frontmatter":{"title":"Swift 入门（1）：语法速览","date":"2025-09-14T00:00:00.000Z","categories":"Swift","tags":["Swift","iOS","教程"]},"headers":[],"relativePath":"posts/swift-quickstart/01-语法速览.md","filePath":"posts/swift-quickstart/01-语法速览.md","lastUpdated":1757829226000}'),i={name:"posts/swift-quickstart/01-语法速览.md"};function e(t,s,c,o,r,h){return p(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="swift-入门-1-语法速览" tabindex="-1">Swift 入门（1）：语法速览 <a class="header-anchor" href="#swift-入门-1-语法速览" aria-label="Permalink to &quot;Swift 入门（1）：语法速览&quot;">​</a></h1><blockquote><p>本文属于 Swift 入门速成系列，帮助你在 <strong>8 小时内掌握最常用的语法与特性</strong>，快速读懂 AI 写的代码。<br> 本篇作为第一篇，带你 <strong>一眼看懂 Swift 的常见语法</strong>，相当于一个“速查表”。</p></blockquote><hr><h2 id="基本语法特点" tabindex="-1">基本语法特点 <a class="header-anchor" href="#基本语法特点" aria-label="Permalink to &quot;基本语法特点&quot;">​</a></h2><ul><li><strong>强类型语言</strong>：所有变量、常量都有确定类型。</li><li><strong>类型推断</strong>：大多数时候不用显式写类型，编译器能自动推断。</li><li><strong>安全性强</strong>：默认变量必须初始化，避免空指针。</li><li><strong>现代简洁</strong>：省去了大量冗余符号，代码更接近自然语言。</li></ul><hr><h2 id="变量与常量" tabindex="-1">变量与常量 <a class="header-anchor" href="#变量与常量" aria-label="Permalink to &quot;变量与常量&quot;">​</a></h2><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pi </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.14159</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 常量，不能修改</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> age </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 18</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // 变量，可以修改</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">age </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // ✅ 可以修改</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// pi = 3.14</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // ❌ 报错：常量不可修改</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 常见数据类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let name: String = &quot;Swift&quot;</span></span>
<span class="line"><span>let score: Int = 95</span></span>
<span class="line"><span>let price: Double = 19.99</span></span>
<span class="line"><span>let passed: Bool = true</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 字符串插值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let name = &quot;Alice&quot;</span></span>
<span class="line"><span>let age = 20</span></span>
<span class="line"><span>print(&quot;Hello, my name is \\(name), I am \\(age) years old.&quot;)</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 数组与字典</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>// 数组</span></span>
<span class="line"><span>var numbers = [1, 2, 3, 4]</span></span>
<span class="line"><span>numbers.append(5)</span></span>
<span class="line"><span>print(numbers[0])  // 输出 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 字典</span></span>
<span class="line"><span>var user = [&quot;name&quot;: &quot;Bob&quot;, &quot;age&quot;: &quot;22&quot;]</span></span>
<span class="line"><span>print(user[&quot;name&quot;] ?? &quot;Unknown&quot;) // Bob</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 条件语句</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let score = 85</span></span>
<span class="line"><span>if score &gt;= 90 {</span></span>
<span class="line"><span>    print(&quot;优秀&quot;)</span></span>
<span class="line"><span>} else if score &gt;= 60 {</span></span>
<span class="line"><span>    print(&quot;及格&quot;)</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    print(&quot;不及格&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 循环</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>for i in 1...5 {</span></span>
<span class="line"><span>    print(&quot;第 \\(i) 次&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var n = 3</span></span>
<span class="line"><span>while n &gt; 0 {</span></span>
<span class="line"><span>    print(n)</span></span>
<span class="line"><span>    n -= 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 函数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>func greet(name: String) -&gt; String {</span></span>
<span class="line"><span>    return &quot;Hello, \\(name)&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(greet(name: &quot;Swift&quot;)) // Hello, Swift</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 可选类型（Optionals）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>var nickname: String? = nil</span></span>
<span class="line"><span>nickname = &quot;小明&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 安全解包</span></span>
<span class="line"><span>if let nick = nickname {</span></span>
<span class="line"><span>    print(&quot;昵称：\\(nick)&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 小结</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这一篇带你快速扫了一遍 **Swift 最常见的语法**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 变量与常量（\`var\` / \`let\`）</span></span>
<span class="line"><span>- 常见数据类型（\`String\`、\`Int\`、\`Double\`、\`Bool\`）</span></span>
<span class="line"><span>- 数组与字典</span></span>
<span class="line"><span>- 条件与循环</span></span>
<span class="line"><span>- 函数</span></span>
<span class="line"><span>- 可选类型（\`?\` 和 \`if let\`）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>读完这些，你已经能看懂 70% 以上 AI 写的 Swift 代码。</span></span></code></pre></div>`,9)])])}const d=n(i,[["render",e]]);export{k as __pageData,d as default};
