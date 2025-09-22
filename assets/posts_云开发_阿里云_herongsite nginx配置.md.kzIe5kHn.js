import{_ as i,c as a,o as n,ag as l}from"./chunks/framework.oqSrIbQK.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"posts/云开发/阿里云/herongsite nginx配置.md","filePath":"posts/云开发/阿里云/herongsite nginx配置.md","lastUpdated":1758544231000}'),p={name:"posts/云开发/阿里云/herongsite nginx配置.md"};function e(t,s,h,k,r,d){return n(),a("div",null,[...s[0]||(s[0]=[l(`<ol><li><code>/etc/nginx/nginx.conf</code>（主配置，已合并我建议的优化）</li><li><code>/etc/nginx/sites-available/vitepress</code>（站点配置）</li></ol><h3 id="etc-nginx-nginx-conf" tabindex="-1"><code>/etc/nginx/nginx.conf</code> <a class="header-anchor" href="#etc-nginx-nginx-conf" aria-label="Permalink to &quot;\`/etc/nginx/nginx.conf\`&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 复杂逻辑：Nginx 主配置文件，保留你的原始结构并做必要优化</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">user </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">www-data;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">worker_processes </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">auto;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pid </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/run/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">include </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/etc/nginx/modules-enabled/*.conf;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    worker_connections </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">768</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # multi_accept on;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Basic Settings</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    sendfile </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    tcp_nopush </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    types_hash_max_size </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2048</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # server_tokens off;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # server_names_hash_bucket_size 64;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # server_name_in_redirect off;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    include </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/etc/nginx/mime.types;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default_type </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">application/octet-stream;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # SSL Settings</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 复杂逻辑：仅启用现代 TLS，避免老旧 TLSv1/1.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_protocols </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ssl_prefer_server_ciphers </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Logging Settings</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    access_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/var/log/nginx/access.log;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    error_log </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /var/log/nginx/error.log;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Gzip Settings</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 复杂逻辑：补充常见文本/前端资源类型与最小压缩长度</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_types </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text/plain text/css application/json application/javascript application/xml application/rss+xml image/svg+xml;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    gzip_min_length </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1024</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 复杂逻辑：加载站点级虚拟主机配置（Debian/Ubuntu 习惯）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    include </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/etc/nginx/sites-enabled/*;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h3 id="etc-nginx-sites-available-vitepress" tabindex="-1"><code>/etc/nginx/sites-available/vitepress</code> <a class="header-anchor" href="#etc-nginx-sites-available-vitepress" aria-label="Permalink to &quot;\`/etc/nginx/sites-available/vitepress\`&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 复杂逻辑：VitePress 静态站，支持前端路由 &amp; 静态资源缓存</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">your.domain.com;   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← 改成你的域名或服务器IP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/var/www/vitepress-site;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ← GitHub Actions rsync 到这里</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 复杂逻辑：前端路由；未命中文件回退到 index.html</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 复杂逻辑：静态资源缓存与日志优化</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~*</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> \\.(?:css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    access_log </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Cache-Control </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;public, max-age=604800, immutable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h3 id="启用站点-命令" tabindex="-1">启用站点（命令） <a class="header-anchor" href="#启用站点-命令" aria-label="Permalink to &quot;启用站点（命令）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 复杂逻辑：创建软链接启用站点并校验配置，然后热重载</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/sites-available/vitepress</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/sites-enabled/vitepress</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span></code></pre></div><p>/etc/nginx/sites-enabled/vitepress 通常是一个软链接，指向 /etc/nginx/sites-available/vitepress，内容与 available 一致。</p><blockquote><p>只需把 <code>server_name</code> 改成你的域名或公网 IP，并确保 <code>/var/www/vitepress-site</code> 由 <code>deploy:deploy</code> 持有（供 rsync 写入）。</p></blockquote>`,11)])])}const E=i(p,[["render",e]]);export{c as __pageData,E as default};
