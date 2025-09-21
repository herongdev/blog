---
title: 阿里云 ECS：密码/密钥登录一文通（去重精编版）
date: 2025-09-21
tags: [SSH, 公钥私钥, 阿里云ECS, FileZilla]
---

## 正确认知（核心概念）

- **公钥**：放在服务器 `~/.ssh/authorized_keys`，是“可信名单”。
- **私钥**：只保存在本地设备，用来**对登录挑战签名**。私钥绝不上传。
- **认证过程**：客户端用私钥签名 → 服务器用已存公钥验证 → 验证通过即放行。

## 标准做法（按优先级执行）

### A. 密钥登录（推荐）

1. **为每台设备生成独立密钥对**（更安全）

   - macOS/Linux：

     ```bash
     ssh-keygen -t ed25519 -C "my-mac"
     ```

   - Windows：

     - 用 **PuTTYgen** 生成 `.ppk`（或用 OpenSSH 同上生成 `id_ed25519`）

2. **把各设备“公钥”加入服务器**

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh
   # 复杂逻辑：向“可信名单”追加公钥
   echo "ssh-ed25519 AAAAC3...你的公钥..." >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **确认 SSH 允许公钥认证**

   ```bash
   # 复杂逻辑：打开公钥认证；是否禁用密码视需求而定
   # /etc/ssh/sshd_config
   PubkeyAuthentication yes
   PasswordAuthentication no
   # 修改后
   sudo systemctl restart sshd
   ```

4. 可选：也可在**阿里云控制台**“绑定/更换密钥对”，平台会自动把公钥写入实例；你本地保管好下载到的**私钥**（仅有一次下载机会）。

### B. 临时启用“密码登录”（兜底）

1. 重装系统后，之前密码登录可能会失效；如果我们给服务器绑定新的密钥对，密码登录也会失效，这时，我们要去控制台**重置实例密码**。
2. `sshd_config` 打开 `PasswordAuthentication yes` → `sudo systemctl restart sshd`。
3. 登录成功后，尽快回到 **仅密钥** 或 **密钥优先** 的策略。

## FileZilla 正确姿势（SFTP）

- 协议：`SFTP`
- 主机：ECS 公网 IP/域名；端口 `22`；用户名（镜像常见：`ubuntu` 或 `root`）
- 登录类型：**密钥文件**

  - Windows：选 `.ppk`（若手头是 `.pem`，用 PuTTYgen `Load`→`Save private key` 转 `.ppk`）
  - macOS/Linux：直接选 `.pem` 或 `~/.ssh/id_ed25519`

- 连接失败排查：

  1. 安全组是否放行 22；
  2. 用户名是否正确；
  3. 私钥权限（macOS/Linux：`chmod 600 私钥`）；
  4. 查看日志：Ubuntu 看 `/var/log/auth.log`，CentOS 看 `/var/log/secure`。

## 多设备如何用？

- **更安全**：每台设备生成一把独立密钥，对应公钥都加入同一台服务器的 `authorized_keys`。
- **更省事**（不推荐）：复制同一私钥到多设备，风险面更大。
- **撤销更简单**：独立密钥方案下，想禁用某设备，直接从 `authorized_keys` 删除对应公钥行即可。

## 一句话版最终总结（可替换你原文）

> **服务器预存“公钥名单”，本地保管“私钥”。登录时，本地用私钥对挑战签名，服务器用公钥验证，无需传输私钥。重装系统后需重新写入公钥或重置密码。推荐每台设备各自生成密钥对，把各自公钥加入服务器的 `authorized_keys`，以密钥登录为主、密码登录为辅。**

**本质**

1. **这台电脑本地必须持有与该公钥成对的“私钥”**（可带口令短语 passphrase）。
2. **公钥要加到服务器目标用户的“允许列表”**（通常是 `~/.ssh/authorized_keys`，或通过阿里云控制台绑定后由系统写入）。
3. 服务器侧要允许：`PubkeyAuthentication yes`，安全组放行 `22`，用户名正确（如 `ubuntu`/`root`），公钥/目录权限合理（`~/.ssh` 700、`authorized_keys` 600）。

> 小结：**哪台电脑 = 拥有对应私钥 + 其公钥已在服务器名单中** → 就能用密钥登录。多个设备可各自一把密钥，往 `authorized_keys` 里各加一行即可。
