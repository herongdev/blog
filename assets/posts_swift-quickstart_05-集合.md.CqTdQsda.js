import{_ as n,c as a,o as p,ag as i}from"./chunks/framework.oqSrIbQK.js";const d=JSON.parse('{"title":"Swift 入门（5）：集合类型（Array、Set、Dictionary）","description":"","frontmatter":{"title":"Swift 入门（5）：集合类型（Array、Set、Dictionary）","date":"2025-09-14T00:00:00.000Z","categories":"Swift","tags":["Swift","iOS","教程"]},"headers":[],"relativePath":"posts/swift-quickstart/05-集合.md","filePath":"posts/swift-quickstart/05-集合.md","lastUpdated":1757829226000}'),l={name:"posts/swift-quickstart/05-集合.md"};function t(e,s,c,r,h,k){return p(),a("div",null,[...s[0]||(s[0]=[i(`<h1 id="swift-入门-5-集合类型-array、set、dictionary" tabindex="-1">Swift 入门（5）：集合类型（Array、Set、Dictionary） <a class="header-anchor" href="#swift-入门-5-集合类型-array、set、dictionary" aria-label="Permalink to &quot;Swift 入门（5）：集合类型（Array、Set、Dictionary）&quot;">​</a></h1><blockquote><p>Swift 提供了三种常用集合类型：<strong>数组（Array）</strong>、<strong>集合（Set）</strong> 和 <strong>字典（Dictionary）</strong>。掌握它们就能处理大部分数据存储与操作。</p></blockquote><hr><h2 id="数组-array" tabindex="-1">数组（Array） <a class="header-anchor" href="#数组-array" aria-label="Permalink to &quot;数组（Array）&quot;">​</a></h2><p>数组是有序的元素集合，可以包含重复值。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 添加元素</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">numbers.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 访问元素</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(numbers[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 遍历</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(num)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>简写：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let fruits = [&quot;Apple&quot;, &quot;Banana&quot;, &quot;Cherry&quot;]</span></span>
<span class="line"><span>print(fruits.count)      // 3</span></span>
<span class="line"><span>print(fruits.contains(&quot;Banana&quot;))  // true</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 集合（Set）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>集合是 **无序且唯一** 的元素集合。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>var set: Set&lt;String&gt; = [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set.insert(&quot;D&quot;)</span></span>
<span class="line"><span>set.insert(&quot;A&quot;)   // 已存在，不会重复</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(set.contains(&quot;C&quot;))  // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历（顺序不保证）</span></span>
<span class="line"><span>for item in set {</span></span>
<span class="line"><span>    print(item)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>集合常用于 **去重**：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let nums = [1, 2, 2, 3, 3, 4]</span></span>
<span class="line"><span>let uniqueNums = Set(nums)</span></span>
<span class="line"><span>print(uniqueNums)  // {2, 3, 1, 4}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 字典（Dictionary）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>字典是 **键值对** 的集合。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>var dict: [String: Int] = [</span></span>
<span class="line"><span>    &quot;Alice&quot;: 25,</span></span>
<span class="line"><span>    &quot;Bob&quot;: 30</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 访问</span></span>
<span class="line"><span>print(dict[&quot;Alice&quot;])  // Optional(25)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 修改</span></span>
<span class="line"><span>dict[&quot;Alice&quot;] = 26</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 新增</span></span>
<span class="line"><span>dict[&quot;Charlie&quot;] = 22</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历</span></span>
<span class="line"><span>for (name, age) in dict {</span></span>
<span class="line"><span>    print(&quot;\\(name): \\(age)&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 集合运算（Set 特有）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`swift</span></span>
<span class="line"><span>let set1: Set = [1, 2, 3]</span></span>
<span class="line"><span>let set2: Set = [3, 4, 5]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 交集</span></span>
<span class="line"><span>print(set1.intersection(set2))  // [3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 并集</span></span>
<span class="line"><span>print(set1.union(set2))  // [1, 2, 3, 4, 5]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 差集</span></span>
<span class="line"><span>print(set1.subtracting(set2))  // [1, 2]</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 小结</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **Array**：有序，可重复 → 适合顺序存储。</span></span>
<span class="line"><span>- **Set**：无序，唯一 → 适合去重、集合运算。</span></span>
<span class="line"><span>- **Dictionary**：键值对 → 适合映射关系。</span></span></code></pre></div>`,7)])])}const u=n(l,[["render",t]]);export{d as __pageData,u as default};
