---
title: java实体entity转map对象
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
方法一：一句搞定，直接返回`map`对象（弊端新的对象无法扩展字段）：

import org.springframework.cglib.beans.BeanMap;
BeanMap.create(entityObj);
方法二：利用`fastjson`处理（如下方式`1`，快捷）

import com.alibaba.fastjson.JSONObject;
//
方式`1`、强转为

JSONObject
JSONObject xxx = (JSONObject) JSONObject.toJSON(xxxEntity);

//
方式`2`、转成`json`，在转为`map(`未验证，但是理论上没问题

)
String json = JSONObject.toJSONString(entityObj);
Map map = JSONObject.parseObject(json, Map.class);
​​​​​​​

方法三：利用反射（技术大佬可以尝试此方案）——详见原文
