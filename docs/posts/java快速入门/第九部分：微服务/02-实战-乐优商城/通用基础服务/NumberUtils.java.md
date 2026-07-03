---
title: NumberUtils.java
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
packagecom.leyou.common.utils;

importjava.math.BigDecimal;
importjava.math.RoundingMode;
importjava.util.ArrayList;
importjava.util.List;
importjava.util.Random;
importjava.util.regex.MatchResult;
importjava.util.regex.Matcher;
importjava.util.regex.Pattern;

_/**_
_*_**@author:**_HuYi.Zhang_
_*_**@create:**_2018-04-2509:13_
_**/_
publicclassNumberUtils{

publicstaticbooleanisInt(Doublenum){
returnnum.intValue()==num;
}

_/**_
_*__判断字符串是否是数值格式_
_*_**@param**_str_
_*_**@return**
_*/_
publicstaticbooleanisDigit(Stringstr){
if(str==null||str.trim().equals("")){
returnfalse;
}
returnstr.matches("^\\d+$");
}

_/**_
_*__将一个小数精确到指定位数_
_*_**@param**_num_
_*_**@param**_scale_
_*_**@return**
_*/_
publicstaticdoublescale(doublenum,intscale){
BigDecimalbd=newBigDecimal(num);
returnbd.setScale(scale,RoundingMode._HALF_UP_).doubleValue();
}

//从字符串中根据正则表达式寻找，返回找到的数字数组
publicstaticDouble[]searchNumber(Stringvalue,Stringregex){
List\<Double\>doubles=newArrayList\<\>();
Patternpattern=Pattern._compile_(regex);
Matchermatcher=pattern.matcher(value);
if(matcher.find()){
MatchResultresult=matcher.toMatchResult();
for(inti=1;i\<=result.groupCount();i++){
doubles.add(Double._valueOf_(result.group(i)));
}
}
returndoubles.toArray(newDouble[doubles.size()]);
}

_/**_
_*__生成指定位数的随机数字_
_*_**@param**_len_
_*_**@return**
_*/_
publicstaticStringgenerateCode(intlen){
len=Math._min_(len,8);
intmin=Double._valueOf_(Math._pow_(10,len-1)).intValue();
intnum=newRandom().nextInt(Double._valueOf_(Math._pow_(10,len+1)).intValue()-1)+min;
returnString._valueOf_(num).substring(0,len);
}
}
```
