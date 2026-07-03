---
title: logback-spring.xml
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
这个`logback-spring.xml`文件配置了Logback日志记录系统的行为。以下是该配置文件的详细作用和解释：

完整示例：
\<?xml version="1.0" encoding="UTF-8"?\>
\<configuration\>
\<!-- 控制台输出 --\>
\<appender name="console" class="ch.qos.logback.core.ConsoleAppender"\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>
\<!-- 文件输出 --\>
\<appender name="file" class="ch.qos.logback.core.FileAppender"\>
\<file\>app.log\</file\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>
\<!-- 为特定包设置日志级别 --\>
\<logger name="com.hunanminsheng.zhslappbackend" level="debug" /\>
\<!-- 根日志记录器，配置日志级别和附加器 --\>
\<root level="info"\>
\<appender-ref ref="console" /\>
\<appender-ref ref="file" /\>
\</root\>
\</configuration\>

顶部声明
\<?xml version="1.0" encoding="UTF-8"?\>
\<configuration\>
- 这是XML文件的声明，定义了XML的版本和编码方式。

\<configuration\>`标签是Logback配置文件的根元素。

控制台输出（ConsoleAppender）
\<appender name="console" class="ch.qos.logback.core.ConsoleAppender"\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>

\<appender\>`定义了一个日志输出器（appender），名为`console`，类型为`ch.qos.logback.core.ConsoleAppender`。

- `ConsoleAppender`将日志消息输出到控制台（标准输出）。
- \<encoder\>`定义了日志消息的编码方式。
- \<pattern\>`定义了日志消息的格式：
    - `%d{yyyy-MM-dd HH:mm:ss}`：日志的时间戳，格式为`年-月-日 时:分:秒`。
    - `%-5level`：日志级别，占5个字符宽度，左对齐。
    - `%logger{36}`：日志记录器的名称，最多36个字符。
    - `- %msg%n`：日志消息，`%n`表示换行。

文件输出（FileAppender）
\<appender name="file" class="ch.qos.logback.core.FileAppender"\>
\<file\>app.log\</file\>
\<encoder\>
\<pattern\>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n\</pattern\>
\</encoder\>
\</appender\>

- \<appender\>`定义了一个日志输出器（appender），名为`file`，类型为`ch.qos.logback.core.FileAppender`。
- `FileAppender`将日志消息输出到指定的文件。
- \<file\>`指定了日志文件的路径，这里为`app.log`。
- \<encoder\>`定义了日志消息的编码方式，与控制台输出相同。

根日志记录器（Root Logger）
\<root level="info"\>
\<appender-ref ref="console" /\>
\<appender-ref ref="file" /\>
\</root\>

- \<root\>`定义了根日志记录器，`level="info"`表示日志级别为`info`。
- 日志级别从低到高依次为：`TRACE`、`DEBUG`、`INFO`、`WARN`、`ERROR`。`info`级别会记录`INFO`及以上级别的日志消息。
- \<appender-ref ref="console" /\>`引用了前面定义的控制台输出器`console`。
- \<appender-ref ref="file" /\>`引用了前面定义的文件输出器`file`。

整体作用
- 这个配置文件定义了两个日志输出器，一个将日志输出到控制台，另一个将日志输出到文件`app.log`。
- 所有`info`级别及以上的日志消息都会被这两个输出器记录。
- 你可以根据需要调整日志级别、日志格式和输出位置（如文件路径）来满足具体需求。

自定义日志级别
你可以根据需要为特定的包或类自定义日志级别。例如，如果你希望为`com.hunanminsheng.zhslappbackend`包设置`DEBUG`级别的日志记录，可以在`
这个配置文件将`com.hunanminsheng.zhslappbackend`包的日志级别设置为`DEBUG`，并将日志消息输出到控制台和文件`app.log`。
