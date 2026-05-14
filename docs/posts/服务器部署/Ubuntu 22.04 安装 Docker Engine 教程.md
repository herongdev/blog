---
title: Ubuntu 22.04 安装 Docker Engine 教程
date: 2026-05-14 00:00:00
tags:
  - Ubuntu
  - Docker
  - Linux
  - DevOps
categories:
  - 服务器部署
---

## 整体思路

这篇教程使用 **Docker 官方 apt 仓库**安装 Docker Engine，适合 Ubuntu 22.04。流程是：

1. 清理旧 Docker 包；
2. 安装 curl、证书等基础工具；
3. 添加 Docker 官方 GPG 密钥；
4. 添加 Docker 官方软件源；
5. 安装 Docker Engine、Compose、Buildx；
6. 启动 Docker 并验证；
7. 可选：配置普通用户免 sudo；
8. 可选：配置镜像加速。

Docker 官方 Ubuntu 安装文档推荐通过 Docker apt 仓库安装 Docker Engine；Linux 安装后也可以按官方 post-install 步骤把用户加入 `docker` 组。([Docker Documentation][1])

---

## 一、卸载旧版本 Docker

```bash
# sudo：使用管理员权限执行命令，因为卸载系统软件包需要 root 权限
# apt remove：卸载已安装的软件包
# -y：自动回答 yes，避免安装过程中反复手动确认
# docker.io / docker-doc / docker-compose / docker-compose-v2 / podman-docker / containerd / runc：
# 这些是 Ubuntu 自带源或旧版本 Docker 相关包，先卸载可以避免和 Docker 官方版本冲突
sudo apt remove -y docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc
```

---

## 二、更新 apt 缓存并安装基础工具

```bash
# sudo：使用管理员权限
# apt update：更新本机的软件包索引，不是升级软件，只是刷新“有哪些包、有哪些版本”
sudo apt update
```

```bash
# sudo：使用管理员权限
# apt install：安装软件包
# -y：自动确认安装
# ca-certificates：让系统可以校验 HTTPS 证书，否则访问 https 软件源可能失败
# curl：用于从 Docker 官方地址下载 GPG 密钥
sudo apt install -y ca-certificates curl
```

---

## 三、创建 apt 密钥目录

```bash
# sudo：使用管理员权限
# install：这里不是“安装软件”，而是创建目录/复制文件并设置权限的 Linux 命令
# -m 0755：设置目录权限，0755 表示所有人可读可进入，只有 root 可写
# -d：表示创建目录
# /etc/apt/keyrings：apt 推荐存放第三方软件源 GPG 密钥的目录
sudo install -m 0755 -d /etc/apt/keyrings
```

---

## 四、下载 Docker 官方 GPG 密钥

```bash
# sudo：用管理员权限把密钥写入 /etc/apt/keyrings
# curl：下载远程文件
# -f：请求失败时直接报错，不输出错误页面
# -s：静默模式，减少输出
# -S：配合 -s 使用，出错时仍然显示错误信息
# -L：跟随重定向，避免下载地址跳转导致失败
# https://download.docker.com/linux/ubuntu/gpg：Docker 官方 Ubuntu GPG 密钥地址
# -o /etc/apt/keyrings/docker.asc：把下载结果保存为 docker.asc
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```bash
# sudo：使用管理员权限
# chmod：修改文件权限
# a+r：all + read，表示所有用户都可以读取这个密钥文件
# /etc/apt/keyrings/docker.asc：刚刚下载的 Docker GPG 密钥文件
# 这样 apt 在更新软件源时才能读取该密钥并验证 Docker 软件包来源
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

---

## 五、添加 Docker 官方 apt 软件源

```bash
# sudo：使用管理员权限
# tee：把输入内容写入文件
# /etc/apt/sources.list.d/docker.sources：Docker 官方 apt 源配置文件
# > /dev/null：不在终端输出 tee 写入的内容，保持终端干净
# <<EOF ... EOF：Here Document 写法，把中间多行内容作为输入传给 tee
# Types: deb：表示这是 deb 软件包源
# URIs：Docker 官方 Ubuntu 软件源地址
# Suites：当前 Ubuntu 版本代号，Ubuntu 22.04 一般是 jammy
# $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")：
#   读取系统版本信息，并自动取出 Ubuntu 代号，避免手写 jammy 写错
# Components: stable：使用 Docker 稳定版仓库
# Architectures: $(dpkg --print-architecture)：自动获取当前 CPU 架构，例如 amd64 / arm64
# Signed-By：指定使用刚才下载的 Docker GPG 密钥来校验软件包
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

---

## 六、重新更新 apt 缓存

```bash
# sudo：使用管理员权限
# apt update：重新刷新软件包索引
# 这一步会读取刚刚添加的 Docker 官方源
# 如果这一步没有报错，说明 Docker 源基本添加成功
sudo apt update
```

---

## 七、安装 Docker Engine

```bash
# sudo：使用管理员权限
# apt install：安装软件包
# -y：自动确认安装
# docker-ce：Docker Community Edition，也就是 Docker Engine 主程序
# docker-ce-cli：Docker 命令行工具，例如 docker run、docker ps
# containerd.io：容器运行时，Docker 底层依赖它管理容器生命周期
# docker-buildx-plugin：Docker Buildx 插件，用于增强镜像构建能力
# docker-compose-plugin：Docker Compose v2 插件，安装后使用 docker compose 命令
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Docker 官方 Ubuntu 安装步骤中也使用这些包名安装 Docker Engine、CLI、containerd、Buildx 和 Compose 插件。([Docker Documentation][1])

---

## 八、启动 Docker 并设置开机自启

```bash
# sudo：使用管理员权限
# systemctl：管理 systemd 服务
# enable docker：设置 docker 服务开机自动启动
sudo systemctl enable docker
```

```bash
# sudo：使用管理员权限
# systemctl start docker：立即启动 docker 服务
# 如果 Docker 已经启动，重复执行通常也不会有问题
sudo systemctl start docker
```

```bash
# sudo：使用管理员权限
# systemctl status docker：查看 docker 服务状态
# 重点看 Active 是否为 active (running)
sudo systemctl status docker
```

---

## 九、验证 Docker 是否安装成功

```bash
# sudo：使用管理员权限运行 Docker
# docker run：运行一个容器
# hello-world：Docker 官方测试镜像
# 第一次运行时，本机会先拉取 hello-world 镜像，然后启动测试容器
# 如果看到 Hello from Docker!，说明 Docker 可以正常拉取镜像并运行容器
sudo docker run hello-world
```

```bash
# docker version：查看 Docker 客户端和服务端版本
# Client：本地 docker 命令行版本
# Server：Docker daemon 服务端版本
# 如果 Server 部分能正常显示，说明 Docker 后台服务正在运行
docker version
```

```bash
# docker compose version：查看 Docker Compose v2 插件版本
# 注意这里是 docker compose，中间是空格
# 老版本 docker-compose 是独立命令，现在推荐使用 docker compose
docker compose version
```

---

## 十、可选：让当前用户不用 sudo 执行 Docker

默认情况下，普通用户执行 Docker 可能会遇到权限问题。可以把当前用户加入 `docker` 用户组。官方也提供了这类 post-install 操作，但需要注意：`docker` 组拥有接近 root 的权限，不要随便给不可信用户加入这个组。([Docker Documentation][2])

```bash
# sudo：使用管理员权限
# groupadd docker：创建 docker 用户组
# 2>/dev/null：把错误信息丢弃，例如 docker 组已存在时不显示错误
# || true：即使 groupadd 失败也继续执行，避免因为 docker 组已存在而中断脚本
sudo groupadd docker 2>/dev/null || true
```

```bash
# sudo：使用管理员权限
# usermod：修改用户信息
# -aG docker：把用户追加加入 docker 组
#   -a 表示 append，追加，不覆盖用户原来的组
#   -G 表示指定附加用户组
# $USER：当前登录用户名，Shell 会自动替换成你的用户名
sudo usermod -aG docker $USER
```

```bash
# newgrp docker：让当前终端会话立即切换到 docker 组
# 正常情况下，也可以退出 SSH 重新登录，让用户组权限生效
newgrp docker
```

```bash
# docker run：这次不加 sudo 运行容器
# hello-world：测试镜像
# 如果能成功输出 Hello from Docker!，说明当前用户已经可以直接使用 Docker
docker run hello-world
```

---

## 十一、可选：配置 Docker 镜像加速

国内服务器拉取 Docker Hub 镜像经常较慢，可以配置 `registry-mirrors`。Docker 官方说明可以通过编辑 `/etc/docker/daemon.json` 来持久化配置 registry mirror。([Docker Documentation][3])

```bash
# sudo：使用管理员权限
# mkdir：创建目录
# -p：如果上级目录不存在就一起创建；如果目录已存在也不报错
# /etc/docker：Docker daemon 配置目录
sudo mkdir -p /etc/docker
```

```bash
# sudo：使用管理员权限
# tee：把下面的 JSON 内容写入 /etc/docker/daemon.json
# /etc/docker/daemon.json：Docker daemon 的配置文件
# > /dev/null：不把写入内容输出到终端
# registry-mirrors：Docker 镜像加速地址配置项
# 注意：这里的 https://你的可用镜像源地址 需要替换成真实可用的镜像源
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "registry-mirrors": [
    "https://你的可用镜像源地址"
  ]
}
EOF
```

```bash
# sudo：使用管理员权限
# systemctl daemon-reload：重新加载 systemd 配置
# 修改服务相关配置后通常执行一次
sudo systemctl daemon-reload
```

```bash
# sudo：使用管理员权限
# systemctl restart docker：重启 Docker 服务
# daemon.json 修改后需要重启 Docker 才会生效
sudo systemctl restart docker
```

```bash
# docker info：查看 Docker daemon 的详细信息
# grep -A 5：匹配到 Registry Mirrors 后，再显示后面 5 行
# 用来确认镜像加速地址是否已经生效
docker info | grep -A 5 "Registry Mirrors"
```

---

## 十二、常用 Docker 命令入门

```bash
# docker ps：查看正在运行的容器
docker ps
```

```bash
# docker ps -a：查看所有容器
# -a：all，包括已经停止的容器
docker ps -a
```

```bash
# docker images：查看本机已经下载的镜像
docker images
```

```bash
# docker pull nginx：拉取 nginx 镜像
# pull：只下载镜像，不启动容器
# nginx：镜像名称，默认从 Docker Hub 拉取 latest 版本
docker pull nginx
```

```bash
# docker run：创建并运行容器
# -d：detached，后台运行
# --name my-nginx：给容器起名为 my-nginx，方便后续 stop/rm/logs
# -p 8080:80：端口映射，把宿主机 8080 端口映射到容器内部 80 端口
# nginx：使用 nginx 镜像启动容器
docker run -d --name my-nginx -p 8080:80 nginx
```

```bash
# docker logs：查看容器日志
# my-nginx：容器名称
docker logs my-nginx
```

```bash
# docker stop：停止正在运行的容器
# my-nginx：要停止的容器名称
docker stop my-nginx
```

```bash
# docker rm：删除容器
# my-nginx：要删除的容器名称
# 注意：容器需要先 stop，才能 rm
docker rm my-nginx
```

```bash
# docker rmi：删除镜像
# nginx：要删除的镜像名称
# 注意：如果还有容器依赖这个镜像，需要先删除相关容器
docker rmi nginx
```

---

## 十三、最终检查清单

```bash
# 查看 Docker 服务是否正在运行
systemctl status docker
```

```bash
# 查看 Docker 版本
docker version
```

```bash
# 查看 Docker Compose 版本
docker compose version
```

```bash
# 运行测试容器
docker run hello-world
```

只要以上命令都能正常执行，Ubuntu 22.04 上的 Docker 基本就安装完成了。

[1]: https://docs.docker.com/engine/install/ubuntu/ "Install Docker Engine on Ubuntu"
[2]: https://docs.docker.com/engine/install/linux-postinstall/ "Linux post-installation steps for Docker Engine"
[3]: https://docs.docker.com/docker-hub/image-library/mirror/ "Mirror the Docker Hub library"
