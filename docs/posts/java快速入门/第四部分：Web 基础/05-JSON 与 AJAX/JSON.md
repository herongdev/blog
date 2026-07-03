---
title: JSON
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
```
1. 概念： JavaScript Object Notation——JavaScript对象表示法
Person p = new Person();
p.setName("张三");
p.setAge(23);
p.setGender("男");
var p = {"name":"张三","age":23,"gender":"男"};
* json现在多用于存储和交换文本信息的语法
* 进行数据的传输
* JSON 比 XML 更小、更快，更易解析。

**语法：**
1. 基本规则
* 数据在名称/值对中：json数据是由键值对构成的
* 键用引号(单双都行)引起来，也可以不使用引号
* 值得取值类型：
1. 数字（整数或浮点数）
2. 字符串（在双引号中）
3. 逻辑值（true 或 false）
4. 数组（在方括号中）	{"persons":[{},{}]}
5. 对象（在花括号中） {"address":{"province"："陕西"....}}
6. null
* 数据由逗号分隔：多个键值对由逗号分隔
* 花括号保存对象：使用{}定义json 格式
* 方括号保存数组：[]
2. 获取数据:
1. json对象.键名
2. json对象["键名"]
3. 数组对象[索引]
4. 遍历

3. JSON数据和Java对象的相互转换
* JSON解析器：
* 常见的解析器：Jsonlib，Gson，fastjson，jackson

**JSON****转为****Java****对象**
1. 导入jackson的相关jar包
2. 创建Jackson核心对象 ObjectMapper
3. 调用ObjectMapper的相关方法进行转换
1. readValue(json字符串数据,Class)
![Test public void test S throws Exception name Stri...](Exported%20image%2020260702224152-0.png)

**Java****对象转换****JSON**
使用步骤：
1. 导入jackson的相关jar包
2. 创建Jackson核心对象 ObjectMapper
3. 调用ObjectMapper的相关方法进行转换，转换方法：

* writeValue(参数1，obj):

File：将obj对象转换为JSON字符串，并保存到指定的文件中

Writer：将obj对象转换为JSON字符串，并将json数据填充到字符输出流中

OutputStream：将obj对象转换为JSON字符串，并将json数据填充到字节输出流中

* writeValueAsString(obj):将对象转为json字符串
![Tesc public void throws Exception Person p new Per...](Exported%20image%2020260702224154-1.png)

注解：
1. @JsonIgnore：排除属性。
![public class Person private SC ling name private i...](Exported%20image%2020260702224155-2.png)

2. @JsonFormat：属性值得格式化
* @JsonFormat(pattern = "yyyy-MM-dd")

![Tesc public void Cest2 throws Exception Person p n...](Exported%20image%2020260702224158-3.png)

- **复杂****java****对象转换**
- 1. List：数组

![Tesc public void Cest3 throws Exception Person p n...](Exported%20image%2020260702224207-4.png)

`2. Map：对象格式一致`

![Test public void CesC4 throws Exception MapSCIing ...](Exported%20image%2020260702224211-5.png)
