---
title: CASE语句
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
在 SQL 中，CASE 表达式是一种条件表达式，可以基于条件来返回不同的值。它的基本格式如下：
CASE
WHEN condition1 THEN result1
WHEN condition2 THEN result2
...
ELSE resultN
END

其中：
WHEN condition1：第一个条件。
THEN result1：当 condition1 为真时返回的结果。
这样的 WHEN ... THEN ... 可以有多个。
ELSE resultN：所有给定的条件都不为真时返回的结果。
END：结束 CASE 表达式。

你提供的示例：
CASE
WHEN eval.ID IS NOT NULL THEN '达标'
ELSE '未达标'
END AS type

在这个示例中：
如果 eval.ID 不为 NULL，则返回 '达标'。
否则，返回 '未达标'。
这意味着，基于 eval.ID 是否为 NULL，该表达式会为每一行返回 '达标' 或 '未达标'。

更多的示例：
基于数值范围返回字符串：
SELECT
CASE
WHEN score \>= 90 THEN '优秀'
WHEN score \>= 70 THEN '良好'
WHEN score \>= 50 THEN '合格'
ELSE '不合格'
END AS performance
FROM students_scores;

在上面的示例中，我们基于 score 列的值为每位学生返回一个表示表现的字符串。

使用CASE在计算中：
SELECT
CASE
WHEN age \< 18 THEN price * 0.5
ELSE price
END AS discounted_price
FROM products;

在这个示例中，如果 age 小于 18，我们返回商品的半价，否则返回原价。

CASE 表达式非常强大，并可以用在几乎任何地方：在 SELECT、WHERE、ORDER BY 和其他子句中。
