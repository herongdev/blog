---
title: md5加密
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
package com.dhcc.common.utils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
public class MD5Util {
// 使用MD5算法生成字符串的哈希值
public static String md5(String str) throws NoSuchAlgorithmException {
// 创建MD5 MessageDigest对象
MessageDigest md = MessageDigest.getInstance("MD5");
// 更新要计算的字节
md.update(str.getBytes());
// 进行哈希计算并返回字节数组
byte b[] = md.digest();
int i;
// 创建StringBuffer存储哈希值
StringBuffer buf = new StringBuffer("");
// 遍历字节数组
for (int offset = 0; offset \< b.length; offset++) {
// 将字节转换为整型
i = b[offset];
if (i \< 0)
i += 256; // 处理负数情况
if (i \< 16)
buf.append("0"); // 添加前导零
buf.append(Integer.toHexString(i)); // 将整型转换为十六进制并添加到StringBuffer
}
str = buf.toString(); // 将StringBuffer转换为字符串
return str; // 返回MD5哈希值
}
// 使用MD5算法生成字符串的哈希值，带空字符串检查
public static String getStringMD5(String source) {
// 检查输入是否为空或仅包含空白字符
if (StringUtils.isBlank(source)) {
return null;
}
source = source.trim(); // 去除前导和尾随空白
try {
// 创建MD5 MessageDigest对象
MessageDigest md = MessageDigest.getInstance("MD5");   // 更新要计算的字节
md.update(source.getBytes());   // 进行哈希计算并返回字节数组
byte b[] = md.digest();
int i;   // 创建StringBuffer存储哈希值
StringBuffer buf = new StringBuffer("");
for (int offset = 0; offset \< b.length; offset++) {
i = b[offset];
if (i \< 0)
i += 256; // 处理负数情况
if (i \< 16)
buf.append("0"); // 添加前导零
buf.append(Integer.toHexString(i)); // 将整型转换为十六进制并添加到StringBuffer
}
source = buf.toString(); // 将StringBuffer转换为字符串
} catch (Exception e) {
return null; // 异常情况返回null
}
return source; // 返回MD5哈希值
}
}
