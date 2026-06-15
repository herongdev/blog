---
title: ACR 与 SAE 部署链路大白话：镜像拉取与 Secret 权限
date: 2026-06-13
tags:
  - 阿里云
  - ACR
  - SAE
  - Docker
  - 部署
categories:
  - 云开发
---

可以，我给你用“大白话版”讲一下这套关系。

现在这套部署链路是：

```text
你的代码
  -> 构建成 Docker 镜像
  -> 推到 ACR 镜像仓库
  -> SAE 从 ACR 拉镜像
  -> SAE 启动容器
  -> 容器读取 Secret 里的 .env.prod
  -> backend 连接 ECS 上的 MySQL / Redis / RabbitMQ / Qdrant / model-api
```

核心角色是这几个：

**1. ACR：仓库**
ACR 只负责存 Docker 镜像。比如：

```text
crpi-tszoj5zgyyzneya4.cn-shenzhen.personal.cr.aliyuncs.com/herong/maquan:ad7d2960
```

它就像“镜像文件的网盘”。  
它不运行程序，只保存镜像。

**2. SAE：运行平台**
SAE 负责把镜像拉下来，然后运行成容器。  
它类似一个托管版 Docker/Kubernetes，你不用自己管服务器进程。

**3. ECS：现在还在放依赖服务**
你的数据库、Redis、RabbitMQ、Qdrant、model-api 目前还在 ECS 上。  
所以 SAE 的 backend 启动后，还要访问 ECS 私网 IP：

```text
192.168.182.143
```

**4. Secret：密钥柜**
我们有两类 Secret，不是一回事：

```text
maquan-acr-pull-secret
```

这是给 SAE 拉 ACR 镜像用的，相当于“仓库钥匙”。

```text
maquan-backend-prod-env
```

这是给 backend 运行用的，里面是 `.env.prod`，相当于“应用配置和业务密钥”。

刚才为什么失败？

因为控制台能看到镜像，不代表运行时容器也能拉镜像。

这里有两个身份：

```text
你登录阿里云控制台的主账号
```

它可以在页面上看到 ACR 镜像。

```text
SAE 运行时的 Pod / 容器
```

它要自己去 ACR 拉镜像。这个运行时没有自动继承你的控制台登录态，所以需要 `maquan-acr-pull-secret`。

之前报错：

```text
pull access denied
insufficient_scope
ImagePullBackOff
```

意思就是：SAE 找到了仓库地址，但没有钥匙，仓库拒绝它拉取。

权限关系可以理解成：

```text
本地电脑 push 镜像到 ACR
需要：ACR 用户名 + 固定密码

ECS 服务器 pull 镜像
需要：服务器 docker login 过 ACR

SAE pull 镜像
需要：SAE 里的私有镜像仓库登录 Secret

backend 连接数据库/Redis
需要：.env.prod 里的账号密码 + 网络能通
```

所以“能拉镜像”和“能连数据库”是两关：

```text
第一关：SAE -> ACR
靠 maquan-acr-pull-secret

第二关：SAE backend -> ECS 私网服务
靠 VPC / 安全组 / .env.prod
```

现在如果镜像已经能拉下来，说明第一关过了。下一步要看容器日志和健康检查，如果 backend 正常启动并且 `/api/v1/health` 通过，才说明第二关也基本过了。
