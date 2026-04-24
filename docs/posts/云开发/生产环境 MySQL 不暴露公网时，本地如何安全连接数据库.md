---
title: 生产环境 MySQL 不暴露公网时，本地如何安全连接数据库
date: 2026-04-24 00:00:00
tags:
  - MySQL
  - SSH Tunnel
  - 服务器安全
  - 部署安全
categories:
  - 部署运维
---

## 一、整体实现思路

生产环境数据库**不要直接开放 3306 到公网**，否则容易被扫描、爆破、撞库。

正确做法是：

```txt
本地电脑
  ↓ SSH 加密连接
服务器 SSH
  ↓ 转发到服务器本机
MySQL 127.0.0.1:3306
```

也就是：

```txt
本地连接 127.0.0.1:13306
实际访问 服务器内部 127.0.0.1:3306
```

这样 MySQL 对公网不可见，但你本地仍然可以安全连接。

---

## 二、服务器侧配置 MySQL 只监听本机

找到 MySQL 配置文件，常见位置：

```bash
/etc/mysql/mysql.conf.d/mysqld.cnf
```

或：

```bash
/etc/my.cnf
```

修改：

```ini
# 只允许服务器本机访问 MySQL，不监听公网网卡
bind-address = 127.0.0.1
```

然后重启 MySQL：

```bash
sudo systemctl restart mysql
```

检查监听状态：

```bash
ss -lntp | grep 3306
```

理想结果类似：

```txt
127.0.0.1:3306
```

不要是：

```txt
0.0.0.0:3306
```

也不要是：

```txt
公网IP:3306
```

---

## 三、防火墙关闭 MySQL 公网端口

如果你用的是 `ufw`：

```bash
# 禁止公网访问 MySQL
sudo ufw deny 3306
```

只保留必要端口：

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
```

查看状态：

```bash
sudo ufw status
```

如果你用的是云服务器安全组，也要在云厂商控制台关闭 `3306` 入站规则。

---

## 四、本地电脑通过 SSH 隧道连接 MySQL

在你本地电脑执行：

```bash
# 将本地 13306 端口转发到服务器内部的 MySQL 3306
ssh -L 13306:127.0.0.1:3306 root@你的服务器公网IP
```

保持这个终端不要关闭。

然后你本地数据库客户端连接：

```txt
Host: 127.0.0.1
Port: 13306
User: 数据库用户名
Password: 数据库密码
Database: 数据库名
```

注意：这里不是连服务器公网 IP，而是连你自己电脑的：

```txt
127.0.0.1:13306
```

---

## 五、Navicat / DataGrip / DBeaver 配置方式

如果你用数据库客户端，一般都有 SSH Tunnel 配置。

### 数据库连接配置

```txt
Host: 127.0.0.1
Port: 3306
User: 数据库用户名
Password: 数据库密码
```

### SSH 隧道配置

```txt
SSH Host: 服务器公网 IP
SSH Port: 22
SSH User: root 或 deploy 用户
SSH Password / SSH Key: 你的 SSH 登录凭据
```

客户端会自动帮你完成：

```bash
ssh -L 本地端口:127.0.0.1:3306 服务器
```

---

## 六、项目 `.env.production` 推荐配置

如果应用和 MySQL 在同一台服务器上，生产环境可以这样：

```env
# 应用部署在服务器本机时，直接连接服务器内部 MySQL
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_db
```

不要写成：

```env
DATABASE_HOST=服务器公网IP
DATABASE_PORT=3306
```

---

## 七、最简安全方案

你的场景可以直接按这个方案做：

```txt
MySQL:
  bind-address = 127.0.0.1

服务器防火墙:
  不开放 3306
  只开放 22 / 80 / 443

本地连接:
  ssh -L 13306:127.0.0.1:3306 root@服务器公网IP

数据库客户端:
  连接 127.0.0.1:13306
```

---

## 八、最终检查清单

```md
- [ ] MySQL 监听地址是 127.0.0.1:3306
- [ ] 云服务器安全组没有开放 3306
- [ ] Linux 防火墙没有开放 3306
- [ ] 本地通过 SSH Tunnel 连接数据库
- [ ] 生产应用通过 127.0.0.1:3306 访问 MySQL
- [ ] 数据库密码、JWT、微信、LLM 等密钥已经轮换
- [ ] `.env.prod` 不再提交到代码仓库
```

结论：**数据库不暴露公网，不影响本地连接；本地通过 SSH 隧道连，是个人项目和小团队部署中最推荐的方式。**
