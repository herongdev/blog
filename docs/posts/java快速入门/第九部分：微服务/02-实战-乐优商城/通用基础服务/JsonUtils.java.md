---
title: JsonUtils.java
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
lastUpdated: false
---
::: v-pre

```
packagecom.leyou.common.utils;

importcom.fasterxml.jackson.core.JsonProcessingException;
importcom.fasterxml.jackson.core.type.TypeReference;
importcom.fasterxml.jackson.databind.ObjectMapper;
importorg.slf4j.Logger;
importorg.slf4j.LoggerFactory;
importorg.springframework.lang.Nullable;

importjava.io.IOException;
importjava.util.List;
importjava.util.Map;

/**
*@author:HuYi.Zhang
*@create:2018-04-2417:20
**/
publicclassJsonUtils\{

publicstaticfinalObjectMappermapper=newObjectMapper();

privatestaticfinalLoggerlogger=LoggerFactory.getLogger(JsonUtils.class);

@Nullable
publicstaticStringserialize(Objectobj)\{
if(obj==null)\{
returnnull;
\}
if(obj.getClass()==String.class)\{
return(String)obj;
\}
try\{
returnmapper.writeValueAsString(obj);
\}catch(JsonProcessingExceptione)\{
logger.error("json序列化出错："+obj,e);
returnnull;
\}
\}

@Nullable
publicstatic\<T\>Tparse(Stringjson,Class\<T\>tClass)\{
try\{
returnmapper.readValue(json,tClass);
\}catch(IOExceptione)\{
logger.error("json解析出错："+json,e);
returnnull;
\}
\}

@Nullable
publicstatic\<E\>List\<E\>parseList(Stringjson,Class\<E\>eClass)\{
try\{
returnmapper.readValue(json,mapper.getTypeFactory().constructCollectionType(List.class,eClass));
\}catch(IOExceptione)\{
logger.error("json解析出错："+json,e);
returnnull;
\}
\}

@Nullable
publicstatic\<K,V\>Map\<K,V\>parseMap(Stringjson,Class\<K\>kClass,Class\<V\>vClass)\{
try\{
returnmapper.readValue(json,mapper.getTypeFactory().constructMapType(Map.class,kClass,vClass));
\}catch(IOExceptione)\{
logger.error("json解析出错："+json,e);
returnnull;
\}
\}

@Nullable
publicstatic\<T\>TnativeRead(Stringjson,TypeReference\<T\>type)\{
try\{
returnmapper.readValue(json,type);
\}catch(IOExceptione)\{
logger.error("json解析出错："+json,e);
returnnull;
\}
\}
\}

进行对象的序列化和反序列化
序列化，直接在工具类中进行


`反序列化`



`toList第二个参数是list中元素的类型`



`toMap`



- 写字节码时不能写泛型，新建对象时可以写泛型
- list中为复杂类型



:::
