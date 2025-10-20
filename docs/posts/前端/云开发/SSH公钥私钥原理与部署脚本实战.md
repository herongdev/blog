---
title: SSH 公钥私钥原理与部署脚本实战
date: 2024-01-15 10:00:00
categories:
  - 云开发
  - 运维部署
tags:
  - SSH
  - 密钥认证
  - 自动化部署
  - Jenkins
  - Bash
description: 深入解析 SSH 公钥私钥的加密原理，结合实际的 Jenkins + Gitee + 远程服务器部署脚本，详细说明密钥在通信过程中的加解密流程。
---

## 1. 公钥和私钥的生成

当你生成一对 SSH 密钥时，会得到一个公钥和一个私钥：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- **公钥 (Public Key)**：这是你可以公开分享的部分，通常存放在 `id_rsa.pub` 文件中。
- **私钥 (Private Key)**：这是你需要保密的部分，通常存放在 `id_rsa` 文件中。

---

## 2. 加密数据

### 发送数据到服务器

当你向服务器发送数据时，服务器会使用你的公钥加密数据。只有持有与你公钥匹配的私钥的人才能解密这些数据。

### 完整流程：

#### 1. **客户端 (你) 生成密钥对**

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### 2. **客户端将公钥上传到服务器**

```bash
cat ~/.ssh/id_rsa.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### 3. **服务器使用你的公钥加密数据**

- 服务器用公钥加密一段信息，比如一个会话密钥。
- 加密过程大致如下（伪代码表示）：

```python
encrypted_data = encrypt_with_public_key(public_key, data)
```

#### 4. **客户端使用私钥解密数据**

- 客户端收到加密数据后，用私钥解密：

```python
decrypted_data = decrypt_with_private_key(private_key, encrypted_data)
```

---

## 3. 解密数据

### 验证服务器身份

当你连接到服务器时，服务器会向你发送一个加密的信息，你用你的私钥解密并返回结果以证明你是密钥的拥有者。

#### 1. **服务器生成加密挑战**

- 服务器生成一个随机数或消息，并用你的公钥加密：

```python
challenge = generate_random_challenge()
encrypted_challenge = encrypt_with_public_key(public_key, challenge)
```

#### 2. **客户端解密挑战**

- 客户端收到加密挑战，用私钥解密：

```python
decrypted_challenge = decrypt_with_private_key(private_key, encrypted_challenge)
```

#### 3. **客户端返回解密结果**

- 客户端将解密后的挑战返回服务器以验证身份：

```python
send_to_server(decrypted_challenge)
```

#### 4. **服务器验证挑战结果**

- 服务器验证收到的解密结果是否正确：

```python
if decrypted_challenge == original_challenge:
    authenticate_client()
```

---

## 4. 安全通信

- **公钥加密**：只能用公钥加密，私钥解密。保证了只有持有私钥的人才能读取数据。
- **私钥签名**：用私钥生成签名，公钥验证签名。保证了数据确实由持有私钥的人发送。

---

## 5. 详细过程举例

假设你要通过 SSH 连接到一个远程服务器：

### 1. **生成密钥对**

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 2. **将公钥添加到服务器的 `authorized_keys`**

```bash
cat ~/.ssh/id_rsa.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 3. **连接服务器**

```bash
ssh user@server
```

### 4. **身份验证过程**

- 服务器发送加密挑战。
- 客户端用私钥解密挑战并返回。
- 服务器验证解密结果，确认客户端身份。

---

## 6. 公钥和私钥管理最佳实践

- **私钥保密**：私钥必须保密，不能与任何人分享。
- **权限设置**：设置私钥文件权限，使只有拥有者可读写：

```bash
chmod 600 ~/.ssh/id_rsa
```

- **定期更换密钥**：定期更换 SSH 密钥，确保安全性。
- **公钥只读**：确保公钥可以公开访问，但不会泄露私钥信息。

---

## 小结

SSH 公钥和私钥通过非对称加密机制保障了数据传输的安全性。公钥用于加密和验证签名，私钥用于解密和生成签名。这种机制确保了数据在传输过程中的机密性和完整性。

---

## 实战：Jenkins 自动部署脚本

以下是一个完整的 Bash 部署脚本示例，演示如何使用 SSH 密钥进行自动化部署：

```bash
#!/bin/bash
# 设置环境变量
REMOTE_SERVER=172.18.6.250
REMOTE_USER=root
# 通用的部署目录
DEPLOY_DIR=/usr/local/deployment
TEMP_DIR=/usr/local/temp_deployment
# Jenkins 环境变量
REPO_URL=git@gitee.com:herongxhr/mianshiti.git
SSH_KEY_PATH=/var/lib/jenkins/.ssh/id_rsa

# 打印操作步骤
echo "开始部署脚本..."
echo "使用的仓库地址: $REPO_URL"
echo "使用的SSH密钥路径: $SSH_KEY_PATH"

# 创建临时目录
echo "创建临时目录..."
mkdir -p $TEMP_DIR

# 克隆代码仓库到临时目录
echo "正在克隆代码仓库..."
git clone $REPO_URL $TEMP_DIR/mianshiti || { echo "Git 克隆失败"; exit 1; }

# 压缩代码
echo "压缩代码..."
tar -czf $TEMP_DIR/mianshiti.tar.gz -C $TEMP_DIR mianshiti || { echo "创建压缩包失败"; exit 1; }

# 确保远程服务器上的部署目录存在
echo "确保远程服务器上的部署目录存在..."
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_SERVER "mkdir -p $DEPLOY_DIR" || { echo "远程服务器上创建目录失败"; exit 1; }

# 上传代码到远程服务器
echo "上传代码到远程服务器..."
scp -i $SSH_KEY_PATH $TEMP_DIR/mianshiti.tar.gz $REMOTE_USER@$REMOTE_SERVER:$DEPLOY_DIR || { echo "上传失败"; exit 1; }

# SSH到远程服务器进行部署
echo "在远程服务器上进行部署..."
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_SERVER << EOF
    set -e
    echo "解压代码..."
    cd $DEPLOY_DIR
    tar -xzf mianshiti.tar.gz || { echo "解压失败"; exit 1; }
    cd mianshiti || { echo "目录 'mianshiti' 未找到"; exit 1; }
    echo "构建Docker镜像..."
    docker-compose build web || { echo "Docker 构建失败"; exit 1; }
    echo "启动所有服务..."
    docker-compose up -d || { echo "Docker 启动失败"; exit 1; }
EOF

echo "部署完成。"
```

---

## 脚本中的 SSH 通信过程详解

### 1. SSH 公钥和私钥的生成

当你生成一对 SSH 密钥时，会得到一个公钥和一个私钥：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- **公钥 (Public Key)**：这是你可以公开分享的部分，通常存放在 `id_rsa.pub` 文件中。
- **私钥 (Private Key)**：这是你需要保密的部分，通常存放在 `id_rsa` 文件中。

### 2. 上传公钥到服务器

在你的脚本中，`REPO_URL` 是 Gitee 仓库的地址，`SSH_KEY_PATH` 是 Jenkins 使用的私钥文件路径。

你需要确保公钥已经上传到远程服务器的 `~/.ssh/authorized_keys` 文件中：

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```

### 3. SSH 通信过程中的加解密

#### 客户端连接服务器

当你在 Jenkins 中执行脚本时，使用 SSH 连接到远程服务器。具体过程如下：

#### 1. **客户端发起连接**

```bash
ssh -i /var/lib/jenkins/.ssh/id_rsa $REMOTE_USER@$REMOTE_SERVER
```

#### 2. **服务器发送公钥加密的挑战信息**

服务器使用存储在 `~/.ssh/authorized_keys` 文件中的公钥加密一个随机生成的挑战信息，并将其发送给客户端。

#### 3. **客户端使用私钥解密挑战信息**

客户端使用私钥解密挑战信息：

```python
decrypted_challenge = decrypt_with_private_key(private_key, encrypted_challenge)
```

#### 4. **客户端返回解密后的挑战信息**

客户端将解密后的挑战信息发送回服务器，以证明其拥有私钥。

#### 5. **服务器验证解密结果**

服务器验证解密结果，如果匹配，则允许客户端连接。

---

## 使用密钥进行通信的完整过程

结合你的脚本，以下是 SSH 和密钥通信的加解密过程的完整解释：

### 创建和设置环境变量

```bash
REMOTE_SERVER=172.18.6.250
REMOTE_USER=root
DEPLOY_DIR=/usr/local/deployment
TEMP_DIR=/usr/local/temp_deployment
REPO_URL=git@gitee.com:herongxhr/mianshiti.git
SSH_KEY_PATH=/var/lib/jenkins/.ssh/id_rsa
```

### 打印操作步骤

```bash
echo "开始部署脚本..."
echo "使用的仓库地址: $REPO_URL"
echo "使用的SSH密钥路径: $SSH_KEY_PATH"
```

### 创建临时目录

```bash
mkdir -p $TEMP_DIR
```

### 克隆代码仓库到临时目录

```bash
git clone $REPO_URL $TEMP_DIR/mianshiti || { echo "Git 克隆失败"; exit 1; }
```

### 压缩代码

```bash
tar -czf $TEMP_DIR/mianshiti.tar.gz -C $TEMP_DIR mianshiti || { echo "创建压缩包失败"; exit 1; }
```

### 确保远程服务器上的部署目录存在

```bash
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_SERVER "mkdir -p $DEPLOY_DIR" || { echo "远程服务器上创建目录失败"; exit 1; }
```

### 上传代码到远程服务器

```bash
scp -i $SSH_KEY_PATH $TEMP_DIR/mianshiti.tar.gz $REMOTE_USER@$REMOTE_SERVER:$DEPLOY_DIR || { echo "上传失败"; exit 1; }
```

### 在远程服务器上进行部署

```bash
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_SERVER << EOF
    set -e
    echo "解压代码..."
    cd $DEPLOY_DIR
    tar -xzf mianshiti.tar.gz || { echo "解压失败"; exit 1; }
    cd mianshiti || { echo "目录 'mianshiti' 未找到"; exit 1; }

    echo "构建Docker镜像..."
    docker-compose build web || { echo "Docker 构建失败"; exit 1; }

    echo "启动所有服务..."
    docker-compose up -d || { echo "Docker 启动失败"; exit 1; }
EOF

echo "部署完成。"
```

---

## 两种场景的 SSH 通信详解

在你的脚本中，你使用了 SSH 密钥对与 Gitee 和远程部署服务器进行通信。以下是详细解释如何在这两个场景中通过 SSH 和密钥进行安全通信的完整过程。

### 场景一：与 Gitee 的 SSH 通信过程

#### 1.1 生成 SSH 密钥对

你需要先生成 SSH 密钥对：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- **公钥 (Public Key)**：存储在 `~/.ssh/id_rsa.pub` 文件中。这个公钥会被上传到 Gitee。
- **私钥 (Private Key)**：存储在 `~/.ssh/id_rsa` 文件中。这个私钥会保存在 Jenkins 服务器上。

#### 1.2 上传公钥到 Gitee

在 Gitee 的设置页面，将生成的公钥 `id_rsa.pub` 添加到 Gitee 的 SSH 公钥列表中。

#### 1.3 在 Jenkins 上使用私钥

在 Jenkins 上，确保私钥文件存在并且 Jenkins 用户有权限读取这个私钥：

```bash
sudo cp ~/.ssh/id_rsa /var/lib/jenkins/.ssh/id_rsa
sudo chown jenkins:jenkins /var/lib/jenkins/.ssh/id_rsa
sudo chmod 600 /var/lib/jenkins/.ssh/id_rsa
```

### 场景二：与远程部署服务器的 SSH 通信过程

#### 2.1 生成 SSH 密钥对

这与上述过程相同，你可以使用同一对密钥对。

#### 2.2 上传公钥到远程服务器

将生成的公钥 `id_rsa.pub` 添加到远程服务器的 `~/.ssh/authorized_keys` 文件中：

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.18.6.250
```

#### 2.3 在脚本中使用私钥

确保在脚本中使用正确的私钥路径：

```bash
SSH_KEY_PATH=/var/lib/jenkins/.ssh/id_rsa
```

---

## 详细的 SSH 通信流程

### 1. SSH 通信与 Gitee

- **发起连接**：Jenkins 使用私钥 `/var/lib/jenkins/.ssh/id_rsa` 发起与 Gitee 的 SSH 连接。
- **Gitee 发送公钥加密的挑战**：Gitee 使用你上传的公钥加密一个挑战信息并发送给 Jenkins。
- **Jenkins 解密挑战**：Jenkins 使用私钥解密挑战信息。
- **验证**：Jenkins 将解密后的信息发送回 Gitee，Gitee 验证解密信息正确性，允许连接。

### 2. SSH 通信与远程服务器

- **发起连接**：Jenkins 使用相同的私钥发起与远程服务器的 SSH 连接。
- **远程服务器发送公钥加密的挑战**：远程服务器使用 `~/.ssh/authorized_keys` 文件中的公钥加密一个挑战信息并发送给 Jenkins。
- **Jenkins 解密挑战**：Jenkins 使用私钥解密挑战信息。
- **验证**：Jenkins 将解密后的信息发送回远程服务器，远程服务器验证解密信息正确性，允许连接。

---

## 总结

通过 SSH 公钥私钥机制，我们可以实现安全、自动化的代码部署流程。关键要点：

1. **密钥对生成**：使用 `ssh-keygen` 生成公钥和私钥
2. **公钥分发**：将公钥上传到 Gitee 和远程服务器
3. **私钥保护**：妥善保管私钥，设置正确的文件权限
4. **自动化认证**：在脚本中使用 `-i` 参数指定私钥路径
5. **安全通信**：通过挑战-响应机制验证身份，确保通信安全

这种方式避免了在脚本中硬编码密码，大大提升了自动化部署的安全性和便利性。
