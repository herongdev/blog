1. `/etc/nginx/nginx.conf`（主配置，已合并我建议的优化）
2. `/etc/nginx/sites-available/vitepress`（站点配置）

### `/etc/nginx/nginx.conf`

```nginx
# 复杂逻辑：Nginx 主配置文件，保留你的原始结构并做必要优化
user www-data;
worker_processes auto;
pid /run/nginx.pid;

include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    # multi_accept on;
}

http {

    ##
    # Basic Settings
    ##

    sendfile on;
    tcp_nopush on;
    types_hash_max_size 2048;
    # server_tokens off;

    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ##
    # SSL Settings
    ##

    # 复杂逻辑：仅启用现代 TLS，避免老旧 TLSv1/1.1
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    ##
    # Logging Settings
    ##

    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    ##
    # Gzip Settings
    ##

    gzip on;
    # 复杂逻辑：补充常见文本/前端资源类型与最小压缩长度
    gzip_types text/plain text/css application/json application/javascript application/xml application/rss+xml image/svg+xml;
    gzip_min_length 1024;

    # 复杂逻辑：加载站点级虚拟主机配置（Debian/Ubuntu 习惯）
    include /etc/nginx/sites-enabled/*;
}
```

---

### `/etc/nginx/sites-available/vitepress`

```nginx
# 复杂逻辑：VitePress 静态站，支持前端路由 & 静态资源缓存
server {
  listen 80;
  server_name your.domain.com;   # ← 改成你的域名或服务器IP

  root /var/www/vitepress-site;  # ← GitHub Actions rsync 到这里
  index index.html;

  # 复杂逻辑：前端路由；未命中文件回退到 index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 复杂逻辑：静态资源缓存与日志优化
  location ~* \.(?:css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public, max-age=604800, immutable";
  }
}
```

---

### 启用站点（命令）

```bash
# 复杂逻辑：创建软链接启用站点并校验配置，然后热重载
sudo ln -s /etc/nginx/sites-available/vitepress /etc/nginx/sites-enabled/vitepress
sudo nginx -t && sudo systemctl reload nginx
```

/etc/nginx/sites-enabled/vitepress 通常是一个软链接，指向
/etc/nginx/sites-available/vitepress，内容与 available 一致。

> 只需把 `server_name` 改成你的域名或公网 IP，并确保 `/var/www/vitepress-site` 由 `deploy:deploy` 持有（供 rsync 写入）。
