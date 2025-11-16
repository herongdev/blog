# Win11 升级 Python 3.9 到 3.10+ 完整指南（winget + py 启动器方案）

在 Win11 上把 Python 从 3.9.20 升到 3.10+，最省事的是用 **winget** 安装"并存版本"，再把默认版本指到 3.10（或更高）。按下面做就行：

## 方案 A（推荐）：winget 安装并设置默认版本

### 1. 查看当前已装的 Python 版本（含路径）

```powershell
py -0p
```

### 2. 安装 Python 3.10（如需更高可把 3.10 换成 3.11/3.12）

```powershell
winget install --id Python.Python.3.10 -e
```

（若提示需要同意协议，按提示确认即可。）

### 3. 验证安装成功

```powershell
py -3.10 -V
```

### 4. 设为 `py` 启动器的默认版本（不改 PATH，最稳）

- 新建/编辑文件：`%LOCALAPPDATA%\py.ini`

  - **实际路径**：`C:\Users\<你的用户名>\AppData\Local\py.ini`
  - **快速打开**：在文件资源管理器地址栏输入 `%LOCALAPPDATA%` 回车，就会跳到该目录，然后新建 `py.ini` 文件
  - 或者用记事本直接创建：在 PowerShell 中运行 `notepad $env:LOCALAPPDATA\py.ini`

- 写入内容：

```ini
[defaults]
python=3.10
```

保存后再验证：

```powershell
py -V        # 应显示 3.10.x
python -V    # 若你把 python 绑定到启动器，也可能显示 3.10.x；否则保持原 PATH
```

### 5. 升级对应 pip，并把常用包迁到 3.10

```powershell
py -3.10 -m pip install --upgrade pip
# 需要哪些包就装哪些，例如：
py -3.10 -m pip install requests fastapi uvicorn
```

### 6. 虚拟环境（如用 venv）

```powershell
# 在项目根目录重建 3.10 的 venv
py -3.10 -m venv .venv
.\.venv\Scripts\activate
python -V         # 应该是 3.10.x
pip install -r requirements.txt
```

> **提示**：winget 安装的多版本会互不影响；用 `py -3.x` 精确选择版本最省心。

---

## 方案 B：官方安装包（离线/网络不稳时）

### 1. 下载安装包

到 [python.org](https://www.python.org/downloads/) 下载 **Windows x86-64 installer** 的 _3.10.x_（或更高版本）的 **可执行安装包（.exe）**。

### 2. 运行安装器

运行安装器，勾选：

- "Add python.exe to PATH"（可选；若只用 `py` 启动器可以不勾）
- "Install launcher for all users (recommended)"
- "Customize installation" 中保持默认即可

### 3. 验证与配置

安装后按上面 **方案 A 的步骤 3~6** 验证与设置默认版本（`py.ini`）。

---

## 常见问题

### `winget` 命令找不到

用 Microsoft Store 更新"应用安装程序（App Installer）"，或走方案 B。

### 默认 `python` 还是 3.9，需要绑定吗？

**不绑定（推荐）**：

- `py` 命令 → 3.10（由 `py.ini` 控制）
- `python` 命令 → 3.9（由 PATH 控制）
- **优点**：
  - ✅ 多版本共存，互不干扰
  - ✅ 旧项目/脚本还能用 `python` 调用 3.9
  - ✅ 新项目用 `py` 或虚拟环境，自动用 3.10
  - ✅ 避免 PATH 冲突和环境污染
- **适用场景**：有旧项目依赖 3.9，或者需要频繁切换版本

**如果要绑定**（让 `python` 也指向 3.10）：

把 3.10 的安装目录（一般在 `%LocalAppData%\Programs\Python\Python310\`）放到系统 PATH **最前面**：

1. 右键"此电脑" → "属性" → "高级系统设置" → "环境变量"
2. 在"用户变量"或"系统变量"的 `Path` 中，把 `C:\Users\<用户名>\AppData\Local\Programs\Python\Python310` 和 `...\Python310\Scripts` 移到最上面
3. 重新打开 PowerShell，验证：`python -V` 应显示 3.10.x

**推荐做法**：

- 日常开发：用 `py` 命令或虚拟环境（最稳定）
- 懒得改习惯：绑定 `python` 到 3.10
- 需要多版本：不绑定，用 `py -3.9` / `py -3.10` 精确指定

### 旧虚拟环境还是 3.9

必须用 3.10 重新创建 venv（见上面步骤 6）。

---

## 总结

使用 `winget` + `py` 启动器 + `py.ini` 配置文件的方案，可以：

- ✅ 保留旧版本 Python（避免破坏现有项目）
- ✅ 精确控制默认版本（不污染系统 PATH）
- ✅ 随时切换版本（`py -3.9` / `py -3.10` / `py -3.11`）
- ✅ 虚拟环境隔离（各项目用各自的 Python 版本）

这是 Windows 平台上管理多版本 Python 的最佳实践。
