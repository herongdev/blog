---
title: MySQL 数据类型与字段长度属性
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
|   |   |   |   |
|---|---|---|---|
|MySQL 数据类型|数据库储存范围|是否有小数位数|前端输入属性|
|INT|-2,147,483,648 到 2,147,483,647|否|min = -2,147,483,648, max = 2,147,483,647|
|BIGINT|-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807|否|min 和 max 需要特别处理|
|TINYINT|-128 到 127|否|min = -128, max = 127|
|SMALLINT|-32,768 到 32,767|否|min = -32,768, max = 32,767|
|MEDIUMINT|-8,388,608 到 8,388,607|否|min = -8,388,608, max = 8,388,607|
|FLOAT|依赖定义|是|依赖定义|
|DOUBLE|依赖定义|是|依赖定义|
|DECIMAL|依赖定义|是|min 和 max 依赖定义|
|CHAR|最大长度 255|否|maxlength = 255|
|VARCHAR|最大长度 65,535|否|maxlength 依赖定义|
|TEXT|最大长度 65,535|否|maxlength = 65,535|
|MEDIUMTEXT|最大长度 16,777,215|否|maxlength = 16,777,215|
|LONGTEXT|最大长度 4,294,967,295|否|maxlength = 4,294,967,295|
|ENUM|由值列表定义|否|使用下拉列表|
|SET|由值列表定义|否|使用多选列表|
|DATE|1000-01-01 到 9999-12-31|否|使用日期选择器|
|DATETIME|1000-01-01 00:00:00 到 9999-12-31 23:59:59|否|使用日期时间选择器|
|TIMESTAMP|1970-01-01 00:00:01 UTC 到 2038-01-19 03:14:07 UTC|否|使用时间戳控件|
|YEAR|1901 到 2155|否|使用年份选择器|
|TIME|-838:59:59 到 838:59:59|否|使用时间选择器|
|BINARY|最大长度 255|否|maxlength = 255|
|VARBINARY|最大长度 65,535|否|maxlength 依赖定义|
|BLOB|最大长度 65,535|否|maxlength = 65,535|
|MEDIUMBLOB|最大长度 16,777,215|否|maxlength = 16,777,215|
|LONGBLOB|最大长度 4,294,967,295|否|maxlength = 4,294,967,295|

==这个表格涵盖了====MySQL====常见的数据类型，以及它们在前端可能需要的属性。注意，这个表格是基于====MySQL 8.0====的默认设置。不同版本的====MySQL====或特殊配置可能会有不同的限制。这只是一个指导性的信息，具体实现可能需要根据您的实际需求进行调整。==

这里是修改后的表格：

MySQL 数据类型 数据库储存范围 是否有小数位数 前端输入属性
INT -2,147,483,648 到 2,147,483,647 否 min = -2,147,483,648, max = 2,147,483,647
BIGINT -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 否 min 和 max 需要特别处理
TINYINT -128 到 127 否 min = -128, max = 127
SMALLINT -32,768 到 32,767 否 min = -32,768, max = 32,767
MEDIUMINT -8,388,608 到 8,388,607 否 min = -8,388,608, max = 8,388,607
FLOAT 依赖定义 是 依赖定义
DOUBLE 依赖定义 是 依赖定义
DECIMAL 依赖定义 是 min 和 max 依赖定义
... ... ... ...
对于代码，根据不同的数据类型，我们可以添加更多的属性，如 min 和 max。这里是一个更新后的代码示例：

java
Copy code
Map\<String, Object\> fieldAttributes = new HashMap\<\>();

String dataType = dataTypeWithLength;
int startPos = dataTypeWithLength.indexOf('(');
int endPos = dataTypeWithLength.indexOf(')');

if (startPos \> -1 && endPos \> -1) {
dataType = dataTypeWithLength.substring(0, startPos);
String attributePart = dataTypeWithLength.substring(startPos + 1, endPos);

if (dataType.equalsIgnoreCase("DECIMAL") || dataType.equalsIgnoreCase("NUMERIC")) {
String[] attributes = attributePart.split(",");
fieldAttributes.put("totalDigits", Integer.parseInt(attributes[0].trim()));
fieldAttributes.put("decimalPlaces", Integer.parseInt(attributes[1].trim()));
} else if (dataType.equalsIgnoreCase("ENUM") || dataType.equalsIgnoreCase("SET")) {
fieldAttributes.put("values", attributePart);
} else {
try {
fieldAttributes.put("length", Integer.parseInt(attributePart));
} catch (NumberFormatException e) {
fieldAttributes.put("length", attributePart);
}
}
} else {
switch (dataType.toUpperCase()) {
case "INT":
fieldAttributes.put("min", -2147483648);
fieldAttributes.put("max", 2147483647);
break;
case "BIGINT":
// 处理特别大的数字，可能需要字符串或其他方式
break;
case "TINYINT":
fieldAttributes.put("min", -128);
fieldAttributes.put("max", 127);
break;
case "SMALLINT":
fieldAttributes.put("min", -32768);
fieldAttributes.put("max", 32767);
break;
case "MEDIUMINT":
fieldAttributes.put("min", -8388608);
fieldAttributes.put("max", 8388607);
break;
// 以此类推...
}
}

fieldInfo.put("dataType", dataType);
if (!fieldAttributes.isEmpty()) {
fieldInfo.put("fieldAttributes", fieldAttributes);
}
这个代码示例尝试处理数值类型的 min 和 max，同时为其他数据类型添加适当的属性。注意，BIGINT 的范围很大，可能需要特殊处理。这只是一个示例，您可能需要根据具体需求进行调整。
