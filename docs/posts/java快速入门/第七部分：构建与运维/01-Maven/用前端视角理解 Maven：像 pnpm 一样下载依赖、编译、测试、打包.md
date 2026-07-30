# 用前端视角理解 Maven：像 pnpm 一样下载依赖、编译、测试、打包

你可以把 Maven 理解成：

> Java 世界里的 `pnpm + package.json scripts + tsc/vite + test runner` 的组合调度器。

它不是 Java，也不是 Spring Boot。它负责把一个 Java 项目“下载依赖、编译、测试、打包”。

对应到你熟悉的前端：

| 前端                        | Java/Maven                       |
| --------------------------- | -------------------------------- |
| `package.json`              | `pom.xml`                        |
| npm registry                | Maven Central/私有 Maven 仓库    |
| `pnpm install`              | Maven 自动下载依赖               |
| `node_modules` / pnpm store | 本机 Maven 仓库 `.m2/repository` |
| `pnpm test`                 | `mvn test`                       |
| `pnpm build`                | `mvn package`                    |
| `dist/`                     | `target/`                        |
| npm 包版本                  | `groupId + artifactId + version` |
| 构建出的前端资源            | 构建出的 `.jar` 服务包           |

它们四者的关系是：

```text
Java        = 编程语言
JDK         = 编译器 + Java 运行环境
Spring Boot = 后端开发框架
Maven       = 依赖、编译、测试、打包工具
```

例如这个命令：

```bash
brew install maven
```

意思只是：

> 用 macOS 的 Homebrew 安装 Maven 命令行工具。

安装后执行：

```bash
mvn -version
```

预期看到：

```text
Apache Maven 3.9.x
Java version: 21
```

在我们的项目里：

```text
backend/data/pom.xml
```

类似一个大型前端 monorepo 的根 `package.json`，下面管理多个模块：

```text
futures-data-common
futures-data-dal
futures-data-job
futures-data-gateway
futures-data-realtime
...
```

以后我们会经常执行：

```bash
cd backend/data

mvn -pl futures-data-job -am test
```

用人话拆开：

- `-pl futures-data-job`：只选择 `futures-data-job` 模块。
- `-am`：它依赖的内部模块也一起构建。
- `test`：编译并运行测试。

它类似前端 monorepo 中：

```bash
pnpm --filter futures-data-job... test
```

而：

```bash
mvn package
```

类似：

```bash
pnpm build
```

成功后通常得到：

```text
target/futures-data-job.jar
```

这个 JAR 就像前端的 `dist/`，但它是可以通过下面命令启动的后端服务包：

```bash
java -jar target/futures-data-job.jar
```

所以 Maven 的核心价值不是“帮你写 Java”，而是保证开发机、测试环境和 CI 使用同一套依赖与构建流程。

现在先执行：

```bash
brew install maven
mvn -version
```

把 `mvn -version` 的输出发给我，我们接着亲手验证：项目里的测试到底有没有真的运行。
