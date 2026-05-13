---
title: macOS 本地多 GitHub 账号克隆私有仓库教程
date: 2026-05-13 11:00:00
tags:
  - Git
  - GitHub
  - macOS
  - 私有仓库
categories:
  - 开发环境
---

## 一、整体思路

本地有多个 GitHub 账号时，克隆私有仓库最容易混淆两个东西：

### 1. Git 提交身份

这个只影响提交记录里显示谁提交的：

```bash
git config user.name
git config user.email
```

它不决定你有没有权限克隆私有仓库。

### 2. GitHub 认证账号

这个才决定你能不能 clone / pull / push 私有仓库。

如果你用的是 HTTPS：

```bash
https://github.com/org/repo.git
```

macOS 可能会从钥匙串里自动拿旧的 GitHub 凭据，导致你明明切了 `user.email`，但实际 clone 时还是另一个 GitHub 账号。

所以本地多账号克隆私有仓库的核心是：

```text
确认有权限的 GitHub 用户名
↓
清理本地旧 GitHub HTTPS 凭据
↓
使用 用户名 + Personal Access Token 重新认证
↓
token 必须勾选 repo 权限
```

### 3. 三个概念（先对齐再动手）

可以分三层看，后面全文都围绕它们：

| 概念 | 作用 | 典型配置 / 位置 |
| --- | --- | --- |
| **GitHub 账号绑定邮箱** | 网页账号上的主邮箱 / 隐私邮箱；GitHub 用 commit 里的 **email** 把提交归到某个用户 | 网页：`Settings → Emails` |
| **本地提交邮箱** | 只影响 **Author** 行长什么样；不决定能否访问仓库 | `git config user.email`（项目或 `--global`） |
| **clone / pull / push 的认证** | 谁有仓库权限，就用谁的凭据 | HTTPS：`https://用户名@github.com/...` + Token；或 SSH：`Host` + 密钥 |

一句话：**`remote URL` + Token（或 SSH 密钥）管「能不能访问仓库」；`git config user.name / user.email` 管「提交记录写成谁」。** 多账号场景下两者最好对齐到**同一个**有权限的账号，避免以后排查混乱。

---

## 二、适用场景

假设组织私有仓库地址是：

```bash
https://github.com/maxgooder/userweb.git
```

有权限的 GitHub 账号是：

```bash
herongdev
```

那么不要直接 clone：

```bash
git clone https://github.com/maxgooder/userweb.git
```

因为它可能会用本地缓存的其他 GitHub 账号。

应该显式指定用户名：

```bash
git clone https://herongdev@github.com/maxgooder/userweb.git
```

---

## 三、分步实现过程

### 1. 确认 GitHub 用户名

打开有权限的 GitHub 账号主页，例如：

```text
https://github.com/herongdev
```

这里的 `herongdev` 就是 **GitHub 用户名**（不是昵称，也不是邮箱）。

### 2. 清理 macOS 本地旧 GitHub 凭据

先清理 Git 凭据缓存：

```bash
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
```

再清理钥匙串里指定账号的凭据：

```bash
security delete-internet-password -s github.com -a herongdev
```

如果提示找不到，忽略即可。

也可以手动打开「钥匙串访问 / Keychain Access」，搜索 `github.com`，删除 GitHub 相关的 Internet password。

### 3. 生成 GitHub Personal Access Token

进入 GitHub：`Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token`。

关键点：必须勾选 **`repo`**。若漏选，clone 私有仓库时容易出现 `403`、`Write access to repository not granted` 等。

若仓库属于**组织**且开启了 **SSO**，还需在 token 详情里对该组织 **Authorize**，否则同样可能 403。

生成后复制 token（只显示一次）。

### 4. 使用有权限账号 clone

```bash
git clone https://herongdev@github.com/maxgooder/userweb.git
```

终端提示 `Password for 'https://herongdev@github.com':` 时，粘贴 **Token**（不是登录密码）。输入时终端不显示字符、也不显示星号，属正常现象；粘贴后回车即可。

### 5. 克隆成功后设置当前项目提交身份

```bash
cd userweb
git config user.name "herongdev"
git config user.email "你的 GitHub 绑定邮箱或 noreply 邮箱"
git config user.name
git config user.email
```

**`user.email` 建议**：使用当前 GitHub 账号在 `Settings → Emails` 里已验证的邮箱，或 GitHub 提供的 `数字+用户名@users.noreply.github.com`。若随便写一个未绑定到该账号的邮箱，网页上可能无法把贡献归到 `herongdev`。

---

## 四、钥匙串缓存：为什么第二次 clone 常常不再要密码

第一次成功输入 Token 后，Git / macOS 会把 **GitHub HTTPS 凭据** 写入 **钥匙串（Keychain）**。以后再对同一 `github.com` 域名执行 clone / pull / push 时，Git 会**自动**从钥匙串取出已保存的 **用户名 + Token**，所以往往**不会再提示输入密码**。

典型流程：

```text
第一次 clone → 输入 herongdev + Token
→ macOS 钥匙串保存 github.com 相关凭据
→ 第二次 clone（例如另一个仓库）
→ Git 自动读钥匙串
→ 不再询问密码
```

一般**不会再让你输入密码**的前提是：以后 clone 时仍然**在 URL 里写明有权限的 GitHub 用户名**，例如：

```bash
git clone https://herongdev@github.com/maxgooder/app02.git
```

此时钥匙串里可以理解为已保存 **`github.com` + `herongdev` + Token** 这一类条目；Git 会按 **主机名 + 用户名** 自动取出对应 Token，后续同一组合通常一路静默。

### 关键区别：带用户名 vs 不带用户名

#### 情况 1：明确写用户名（推荐）

```bash
git clone https://herongdev@github.com/maxgooder/app02.git
git clone https://otheruser@github.com/some-org/private-repo.git
```

macOS 钥匙串可以分别保存 **`github.com` + `herongdev`** 与 **`github.com` + `otheruser`** 两套凭据，以后各走各的账号，互不影响；只要 Token 未过期且仍有权限，对应仓库的 clone / pull / push 往往**都不必再输密码**。

#### 情况 2：不写用户名（多账号时不建议）

```bash
git clone https://github.com/maxgooder/app02.git
```

若你之前已经用 **`https://herongdev@github.com/...`** 成功登录过并输入过 Token，钥匙串里通常已有 **`github.com` + `herongdev` + Token** 这一类条目。此时再克隆**不带用户名**的 `https://github.com/...`，Git 会向钥匙串索取 **`github.com`** 对应的凭据，**很大概率仍会拿到 `herongdev`**，于是仓库有权限时可能**直接成功、也不再问密码**。

**但不建议依赖这种「默认行为」**：若你之后又用**另一个** GitHub 账号做过 HTTPS 并成功把 Token 写进钥匙串，那么在 URL **不指定用户名**时，究竟匹配哪一条缓存凭据就可能**变得不确定**（与录入顺序、凭据助手策略等有关），轻则仍「碰巧成功」，重则 **`Repository not found` / `403`**。

更稳妥的做法仍是：**私有仓库始终在 URL 里写 `https://用户名@github.com/...`**，并在已 clone 的仓库里用 **`git remote set-url`** 把 `origin` 固定成带用户名的地址（见下文「一条规则」与「已经 clone 过的仓库」）。

### 一条规则

克隆私有仓库时，一律带上**有权限的** GitHub 用户名：

```bash
git clone https://用户名@github.com/组织名/仓库名.git
```

例如：

```bash
git clone https://herongdev@github.com/maxgooder/app02.git
git clone https://otheruser@github.com/other-org/other-repo.git
```

### 已经 clone 过的仓库也要固定 remote

进入仓库检查：

```bash
git remote -v
```

最好看到 `origin` 为：

```bash
origin  https://herongdev@github.com/maxgooder/app02.git (fetch)
origin  https://herongdev@github.com/maxgooder/app02.git (push)
```

若不是，改成带用户名的 URL：

```bash
git remote set-url origin https://herongdev@github.com/maxgooder/app02.git
```

这样 pull / push 时也会稳定走 **`github.com` + `herongdev`** 对应的钥匙串条目。

### 怎么确认当前钥匙串里默认是谁（无用户名 URL 时）

若你仍会用 `https://github.com/...` 这种地址，可用下面命令看 Git **当前会填什么默认凭据**（多账号排查时有用）：

```bash
echo "url=https://github.com" | git credential fill
```

若输出里能看到 `username=herongdev` 以及 `password=...`（或 `ghp_...` / `gho_...` 等），说明在**不写用户名、只按 `https://github.com` 要凭据**时，当前环境**大概率会填成 `herongdev`**——这只代表「此刻的默认解析结果」，**不等于**以后多账号混用时仍稳定。不同 Git / 凭据助手版本输出格式可能略有差异。

### 想重新输入密码 / Token

可先按用户名精确擦除再操作：

```bash
printf "protocol=https\nhost=github.com\nusername=herongdev\n\n" | git credential-osxkeychain erase
```

或删除钥匙串中的 Internet password：

```bash
security delete-internet-password -s github.com -a herongdev
```

之后再 clone，会重新走凭据输入流程。

### 小结

第二次不打密码是**正常现象**：**Token 已被钥匙串缓存**。以后再克隆时，只要继续写 **`https://herongdev@github.com/...`**，通常会**自动用已保存的 Token**，不必再输入密码。

若 URL **不写用户名**、只用 `https://github.com/...`，在你**只缓存过 `herongdev`** 时，**当前很可能仍会默认走 `herongdev` 并直接成功**；但一旦为**多个** GitHub 账号都缓存过 HTTPS 凭据，这种写法就**不可靠**。**私有仓库最好始终使用 `https://用户名@github.com/...`**，并在 clone 与 `origin` 里都固定带用户名。

---

## 五、最简命令示例

```bash
# 清理 macOS 钥匙串中的 GitHub HTTPS 凭据
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase

# 删除指定 GitHub 用户名的旧凭据，找不到可以忽略
security delete-internet-password -s github.com -a herongdev

# 使用有权限的 GitHub 用户名克隆私有仓库
git clone https://herongdev@github.com/maxgooder/userweb.git

# 进入项目后设置当前仓库的提交身份
cd userweb
git config user.name "herongdev"
git config user.email "你的 GitHub 邮箱"
```

---

## 六、常见错误排查

### 1. Repository not found

```text
remote: Repository not found.
fatal: repository ... not found
```

常见原因：地址写错；当前认证的账号无权限；钥匙串里仍是旧账号。

处理：先 `git credential-osxkeychain erase`（同上），再用带用户名的 URL 重新 clone。

### 2. Write access to repository not granted（403）

常见原因：token 未勾选 `repo`；账号无仓库权限；组织 SSO 未授权 token。

处理：重新生成 classic token 并勾选 `repo`，必要时完成组织 SSO 授权。

### 3. 输入密码时看不到内容

正常行为：用 `Command + V` 粘贴 token 后回车即可。

---

## 七、推荐做法：多账号长期使用 SSH

经常切换多个 GitHub 账号时，HTTPS 容易被钥匙串缓存干扰。可为每个账号单独生成密钥，并在 `~/.ssh/config` 里用不同 `Host` 区分，例如：

```bash
ssh-keygen -t ed25519 -C "你的 GitHub 邮箱" -f ~/.ssh/id_ed25519_github_herongdev
```

```bash
# ~/.ssh/config 片段
Host github-herongdev
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github_herongdev
  IdentitiesOnly yes
```

克隆：

```bash
git clone git@github-herongdev:maxgooder/userweb.git
```

这样 **哪把钥匙连哪个 GitHub 账号** 一目了然，不依赖钥匙串里模糊的 `github.com` 条目。

---

## 八、操作速查（绑定邮箱、本地 config、remote）

### 1. 查 GitHub 账号绑定邮箱

网页：`右上角头像 → Settings → Emails`，看 **Primary email**；若开启隐私，可使用 `...@users.noreply.github.com`。

### 2. 查本地提交用谁

```bash
git config --global user.email   # 全局
git config user.email            # 当前仓库
git config --show-origin --get user.email
```

优先级：**当前仓库 `.git/config` > 全局 `~/.gitconfig` > 系统配置**。

### 3. HTTPS 下谁负责认证

带用户名的地址：

```bash
https://herongdev@github.com/maxgooder/userweb.git
```

表示向 GitHub 认证时使用用户名 `herongdev`（配合该账号的 token）。进入仓库后可用：

```bash
git remote -v
```

确认 `origin` 是否已是 `https://herongdev@github.com/...`。若仍是 `https://github.com/...`（无用户名），pull/push 时可能又去钥匙串里「猜」账号，多账号下易乱。

### 4. 已 clone 后如何固定认证账号

**说明**：下面这条改的是 **访问远程时用的 GitHub 登录身份**，不是「提交账号」。

```bash
git remote set-url origin https://herongdev@github.com/maxgooder/userweb.git
```

再 `git remote -v` 确认即可。

### 5. 再克隆同一仓库

同一目录下重复 `git clone ... userweb` 会因目录已存在而失败；可指定新目录名：

```bash
git clone https://herongdev@github.com/maxgooder/userweb.git userweb2
```

若使用无用户名的 `https://github.com/...`，则仍可能走钥匙串里的任意缓存账号。

### 6. 推荐固定习惯

```bash
git clone https://herongdev@github.com/maxgooder/userweb.git
cd userweb
git config user.name "herongdev"
git config user.email "该账号已验证邮箱或 noreply 邮箱"
git remote -v
git config user.name
git config user.email
```

---

## 九、最终结论

本地多 GitHub 账号克隆组织私有仓库时，关键不是只改 `git config user.email`，而是 **GitHub 认证用对了谁**。

HTTPS 下推荐流程：

```text
确认有权限的 GitHub 用户名
→ 清理 macOS 钥匙串旧凭据
→ 使用 https://用户名@github.com/org/repo.git 克隆
→ 输入勾选 repo（及必要时 SSO 授权）的 token
→ 项目内单独设置 git config user.name / user.email（与账号绑定邮箱一致）
```

再记一句区分：

- **`remote URL` + Token（或 SSH）** → 有没有权限访问仓库。
- **`git config user.name / user.email`** → 提交记录显示谁；GitHub 是否把绿点算到某个用户，主要看 **email 是否绑定在该 GitHub 账号上**。

长期维护多账号，更推荐 **SSH 分 Host + 分密钥**，从根上避开 HTTPS 凭据混用。
