---
title: Windows 下用 SSH 连接云服务器（Hexo 教程版）
date: 2025-09-21
tags: [SSH, OpenSSH, PuTTY, 运维基础]
---

> 本文面向 **Win10** 用户，手把手完成：安装 OpenSSH 客户端 → 生成密钥 → 把公钥放到服务器 → 使用 SSH（含私钥/ssh-agent/自定义端口/主机别名）。

## 一、安装 OpenSSH 客户端（PowerShell，推荐）

### 1. 用管理员权限打开 PowerShell

- 在「开始」菜单输入 **PowerShell** → 右键 → **以管理员身份运行**。

### 2. 检查是否已安装 OpenSSH.Client

```powershell
# 复杂逻辑：查询 OpenSSH 客户端能力包是否已安装
Get-WindowsCapability -Online | Where-Object Name -Like 'OpenSSH.Client*'
```

- 若 **State = Installed**，可跳到“二、生成密钥”。

### 3. 未安装则执行安装

```powershell
# 复杂逻辑：在线安装 OpenSSH 客户端能力包
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

### 4. 验证安装

```powershell
# 复杂逻辑：重启 PowerShell 会话后检查 ssh 版本
ssh -V
```

---

## 二、生成 SSH 密钥对（如已拥有可跳过）

### 选项 A：RSA 4096（与你原文一致）

```powershell
# 复杂逻辑：在默认路径生成 RSA 4096 位密钥
ssh-keygen -t rsa -b 4096 -C "379925144@qq.com"
```

- 默认保存位置：`C:\Users\<你的用户名>\.ssh\id_rsa` 与 `id_rsa.pub`。

### 选项 B：ed25519（可选，更精简）

```powershell
# 复杂逻辑：生成 ed25519 密钥对（推荐现代算法）
ssh-keygen -t ed25519 -C "379925144@qq.com"
```

## 三、把 **公钥** 复制到服务器

> Windows 原生命令行没有 `ssh-copy-id`，你给出的做法（**WSL 或 Git Bash**）非常实用。也可以手动粘贴公钥内容到服务器的 `~/.ssh/authorized_keys`。

### 方式 1：使用 WSL 或 Git Bash 的 `ssh-copy-id`

```bash
# 复杂逻辑：将本机公钥追加到服务器目标用户的可信名单
ssh-copy-id -i ~/.ssh/id_rsa.pub 用户名@服务器IP
```

### 方式 2：手动添加（无 WSL/Git Bash 时）

```powershell
# 复杂逻辑：打印公钥内容并复制
Get-Content $env:USERPROFILE\.ssh\id_rsa.pub
```

- 将输出内容整行复制到服务器（建议先用密码或控制台登录）：

```bash
# 复杂逻辑：在服务器上创建 .ssh 目录并设置权限
mkdir -p ~/.ssh && chmod 700 ~/.ssh
# 复杂逻辑：把公钥追加到授权列表并收紧权限
echo "ssh-rsa AAAA...你的公钥..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 四、开始使用 SSH 连接

### 1. 最简单的连接（密码方式）

```powershell
# 复杂逻辑：首次连接接受服务器指纹，随后输入账号密码
ssh 用户名@服务器IP
# 示例：
ssh root@123.45.67.89
```

### 2. 指定非默认端口

```powershell
# 复杂逻辑：当服务器 SSH 端口不是 22 时，手动指定端口
ssh -p 2222 用户名@123.45.67.89
```

### 3. 使用 **私钥文件** 免输密码

```powershell
# 复杂逻辑：使用 -i 指定私钥文件
ssh -i C:\Users\Administrator\.ssh\id_rsa 用户名@123.45.67.89
```

### 4. 使用 **ssh-agent** 管理私钥（更省心）

```powershell
# 复杂逻辑：启动 ssh-agent 服务
Start-Service ssh-agent
# 复杂逻辑：把私钥交给代理（以后可直接 ssh，不用每次 -i）
ssh-add C:\Users\Administrator\.ssh\id_rsa
```

> **防火墙/安全组**：请确认 **Windows 防火墙**与**云厂商安全组**均放通 SSH（TCP 22，或你的自定义端口）。

## 五、配置主机别名（免输入 IP 与参数）

### 1. 创建 `.ssh` 目录与 `config` 文件

```powershell
# 复杂逻辑：确保 .ssh 目录与 config 文件存在
New-Item -ItemType Directory -Path $env:USERPROFILE\.ssh -Force | Out-Null
New-Item -ItemType File -Path $env:USERPROFILE\.ssh\config -Force | Out-Null
```

### 2. 在 `C:\Users\Administrator\.ssh\config` 中加入如下配置

```text
# 复杂逻辑：为目标服务器声明一个别名 myserver
Host myserver
    HostName 123.45.67.89
    User yourusername
    Port 22
    IdentityFile C:\Users\Administrator\.ssh\id_rsa
    IdentitiesOnly yes
```

保存后，直接：

```powershell
# 复杂逻辑：通过别名一键连接
ssh myserver
```

---

## 常见问题速查

- **Permission denied (publickey)**

  - 检查是否把**公钥**写入服务器 `~/.ssh/authorized_keys`；
  - 用户名是否正确（Ubuntu 常为 `ubuntu`，部分镜像是 `root`）；
  - 服务器 `sshd_config` 是否开启 `PubkeyAuthentication yes`；
  - 私钥权限是否过宽（在 Windows 上建议仅当前用户可读；若用 WSL/Git Bash，可 `chmod 600`）。

- **连接超时/被拒**

  - 安全组未放行 SSH 端口；云服务器端口变更未同步；本地网络/公司策略拦截。

- **Host key verification failed**（重装系统常见）

  - 服务器指纹改变，编辑并删除本机 `~/.ssh/known_hosts` 中对应该 IP 的一行后重连。

---

## 补充与最佳实践

- **密钥算法选择**：RSA 4096 与 ed25519 均可；若无历史兼容限制，**推荐 ed25519**。
- **多设备管理**：为每台电脑生成**独立密钥**，把各自公钥加入同一台服务器，撤销时删除对应行即可。
- **安全优先**：为私钥设置 **passphrase**；平时**以密钥登录为主**，仅在需要时临时开启密码登录。
- **与 FileZilla 配合**：协议选 **SFTP**，登录类型选**密钥文件**；若手头是 `.pem` 而你偏好 PuTTY/FileZilla，可用 **PuTTYgen** 转 `.ppk` 再选择。

---

## 一句话总结

> **服务器预存“公钥名单”，本地持“私钥”。登录时本地用私钥签名、服务器用公钥验证，无需传输私钥。Win10 用内置 OpenSSH 基本就够用；配合 ssh-agent 与 `~/.ssh/config`，连接更省心。**
