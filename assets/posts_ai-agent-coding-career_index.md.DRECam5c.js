import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"AI Agent 编码转岗路线","description":"面向程序员的 Agent 编码能力升级路线：从会用 AI 写代码，到能设计可计划、可审批、可验证、可回放的 Coding Agent Runtime。","frontmatter":{"title":"AI Agent 编码转岗路线","description":"面向程序员的 Agent 编码能力升级路线：从会用 AI 写代码，到能设计可计划、可审批、可验证、可回放的 Coding Agent Runtime。","date":"2026-06-13T00:00:00.000Z","tags":["AI Agent","Coding Agent","AI 应用工程师","程序员转型","Agent 编码"]},"headers":[],"relativePath":"posts/ai-agent-coding-career/index.md","filePath":"posts/ai-agent-coding-career/index.md","lastUpdated":1790163617000}'),t={name:"posts/ai-agent-coding-career/index.md"};function i(l,a,o,c,d,r){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="ai-agent-编码转岗路线" tabindex="-1">AI Agent 编码转岗路线 <a class="header-anchor" href="#ai-agent-编码转岗路线" aria-label="Permalink to &quot;AI Agent 编码转岗路线&quot;">​</a></h1><p>这不是一个“背几个提示词就转 AI”的系列。</p><p>这个栏目解决的是一个更具体的问题：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>程序员如何从会用 AI 写代码，</span></span>
<span class="line"><span>升级为能设计、控制和验证 Coding Agent 的工程师。</span></span></code></pre></div><h2 id="适合谁" tabindex="-1">适合谁 <a class="header-anchor" href="#适合谁" aria-label="Permalink to &quot;适合谁&quot;">​</a></h2><p>适合：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>有 1-5 年开发经验</span></span>
<span class="line"><span>会前端、后端或全栈其中一个方向</span></span>
<span class="line"><span>已经在用 Cursor / Copilot / Codex / Claude Code</span></span>
<span class="line"><span>但说不清 agent 背后的工程系统</span></span>
<span class="line"><span>想转向 AI 应用工程师、Agent 工程师、AI 提效工具工程师</span></span></code></pre></div><p>暂时不适合：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>完全零基础转码</span></span>
<span class="line"><span>只想学提示词模板</span></span>
<span class="line"><span>只想做一次性 AI 套壳</span></span>
<span class="line"><span>期待保就业或保薪资承诺</span></span></code></pre></div><h2 id="主线项目" tabindex="-1">主线项目 <a class="header-anchor" href="#主线项目" aria-label="Permalink to &quot;主线项目&quot;">​</a></h2><p>主线项目叫 Mini Codex。</p><p>它不是为了复制成熟产品，而是为了训练一套可迁移的工程能力：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户任务</span></span>
<span class="line"><span>-&gt; Agent Run</span></span>
<span class="line"><span>-&gt; 状态机</span></span>
<span class="line"><span>-&gt; 读取项目上下文</span></span>
<span class="line"><span>-&gt; Tool Registry</span></span>
<span class="line"><span>-&gt; Permission Policy</span></span>
<span class="line"><span>-&gt; 生成 plan</span></span>
<span class="line"><span>-&gt; 人工确认</span></span>
<span class="line"><span>-&gt; 生成 diff</span></span>
<span class="line"><span>-&gt; 人工确认</span></span>
<span class="line"><span>-&gt; apply patch</span></span>
<span class="line"><span>-&gt; verify</span></span>
<span class="line"><span>-&gt; repair</span></span>
<span class="line"><span>-&gt; trace</span></span>
<span class="line"><span>-&gt; eval</span></span></code></pre></div><p>学完后，你应该能说清：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>为什么 Coding Agent 不是 Chatbot</span></span>
<span class="line"><span>为什么模型不能直接碰文件系统</span></span>
<span class="line"><span>为什么 prompt 不是安全边界</span></span>
<span class="line"><span>为什么 diff review 是 human gate 的核心</span></span>
<span class="line"><span>为什么没有 verify 就不能说任务完成</span></span>
<span class="line"><span>为什么 trace / eval 决定 agent 能不能持续变好</span></span></code></pre></div><h2 id="免费课" tabindex="-1">免费课 <a class="header-anchor" href="#免费课" aria-label="Permalink to &quot;免费课&quot;">​</a></h2><p>免费课暂定：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Mini Codex v2 基础课</span></span></code></pre></div><p>你会从 0 做出一个本地 CLI 版 Mini Codex：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Day 0：为什么 AI 编程不是 prompt 技巧</span></span>
<span class="line"><span>Day 1：创建 Agent Run，让任务可持久化</span></span>
<span class="line"><span>Day 2：状态机，让 Agent 不能乱跑</span></span>
<span class="line"><span>Day 3：Tool Registry，模型只提意图</span></span>
<span class="line"><span>Day 4：Permission Policy，Prompt 不是安全边界</span></span>
<span class="line"><span>Day 5：Plan / Diff Review，不让 AI 静默改仓库</span></span>
<span class="line"><span>Day 6：Apply / Verify，完成必须可证明</span></span>
<span class="line"><span>Day 7：Trace / Eval，把一次成功变成持续改进</span></span></code></pre></div><p>课程平台入口：</p><ul><li><a href="/blog/posts/ai-agent-coding-career/mini-codex-v2-open-source">Mini Codex v2 基础课发布说明</a></li><li><a href="/blog/posts/ai-agent-coding-career/mini-codex-v2-open-source-en">Mini Codex v2 open course</a></li><li><a href="https://github.com/herongdev/min-codex-hands-on-v2" target="_blank" rel="noreferrer">GitHub 开源仓库</a></li><li><a href="/blog/file-tools/courses">进入课程列表</a></li><li>本地开发时访问 <code>http://127.0.0.1:3000/courses</code></li></ul><h2 id="高级课" tabindex="-1">高级课 <a class="header-anchor" href="#高级课" aria-label="Permalink to &quot;高级课&quot;">​</a></h2><p>高级课会继续把 toy but runnable 升级到 work-useful：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>真实模型适配</span></span>
<span class="line"><span>AGENTS.md / 项目规则</span></span>
<span class="line"><span>Code Context Collector</span></span>
<span class="line"><span>prompt injection 防护</span></span>
<span class="line"><span>sandbox profile</span></span>
<span class="line"><span>checkpoint / rollback</span></span>
<span class="line"><span>Git / worktree</span></span>
<span class="line"><span>MCP</span></span>
<span class="line"><span>skills</span></span>
<span class="line"><span>hooks</span></span>
<span class="line"><span>memory</span></span>
<span class="line"><span>subtask / subagent</span></span>
<span class="line"><span>desktop workbench</span></span>
<span class="line"><span>eval dashboard</span></span>
<span class="line"><span>面试作品包装</span></span></code></pre></div><h2 id="第一批文章" tabindex="-1">第一批文章 <a class="header-anchor" href="#第一批文章" aria-label="Permalink to &quot;第一批文章&quot;">​</a></h2><p>建议从这些主题开始读：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. AI 编程最难的不是生成代码，而是控制它怎么改代码</span></span>
<span class="line"><span>2. Coding Agent 和 Copilot 到底差在哪</span></span>
<span class="line"><span>3. 为什么第一课要写 Agent Run，而不是先调模型</span></span>
<span class="line"><span>4. Tool Registry：模型不能直接碰你的文件系统</span></span>
<span class="line"><span>5. Prompt 不是安全边界：手写一个最小权限策略</span></span>
<span class="line"><span>6. 为什么我不让 AI 静默改仓库，而是先生成 diff</span></span>
<span class="line"><span>7. 没有 verify 的 AI 编码，只是“看起来完成”</span></span></code></pre></div><p>后面这个栏目会围绕一个原则展开：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>少讲玄学，多讲可运行的工程闭环。</span></span></code></pre></div>`,30)])])}const u=s(t,[["render",i]]);export{h as __pageData,u as default};
