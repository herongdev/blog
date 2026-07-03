---
title: CookieUtils.java
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
==package====com.leyou.common.utils====;==

==import====org.slf4j.Logger====;==
==import====org.slf4j.LoggerFactory====;==

==import====javax.servlet.http.Cookie====;==
==import====javax.servlet.http.HttpServletRequest====;==
==import====javax.servlet.http.HttpServletResponse====;==
==import====java.io.UnsupportedEncodingException====;==
==import====java.net.URLDecoder====;==
==import====java.net.URLEncoder====;==

_/**_
_*_
_*Cookie__工具类_
_*_
_*/_
==publicfinalclass====CookieUtils{==

==protectedstaticfinal====Logger==_logger_===LoggerFactory.getLogger(CookieUtils.====class====)====;==

_/**_
_*__得到__Cookie__的值__,__不编码_
_*_
_*_**@param**_request_
_*_**@param**_cookieName_
_*_**@return**
_*/_
==publicstatic====String====getCookieValue====(HttpServletRequestrequest====,====StringcookieName){==
==return==_getCookieValue_==(request====,====cookieName====,false====)====;==
==}==

_/**_
_*__得到__Cookie__的值__,_
_*_
_*_**@param**_request_
_*_**@param**_cookieName_
_*_**@return**
_*/_
==publicstatic====String====getCookieValue====(HttpServletRequestrequest====,====StringcookieName====,boolean====isDecoder){==
==Cookie[]cookieList=request.getCookies()====;==
==if====(cookieList======null====||cookieName======null====){==
==returnnull;==
==}==
==StringretValue=====null;==
==try===={==
==for====(====int====i=====0====;====i\<cookieList.====length====;====i++){==
==if====(cookieList[i].getName().equals(cookieName)){==
==if====(isDecoder){==
==retValue=URLDecoder.==_decode_==(cookieList[i].getValue()====,===="UTF-8"====)====;==
==}====else===={==
==retValue=cookieList[i].getValue()====;==
==}==
==break;==
==}==
==}==
==}====catch====(UnsupportedEncodingExceptione){==
_logger_==.error(===="CookieDecodeError."====,====e)====;==
==}==
==return====retValue====;==
==}==

_/**_
_*__得到__Cookie__的值__,_
_*_
_*_**@param**_request_
_*_**@param**_cookieName_
_*_**@return**
_*/_
==publicstatic====String====getCookieValue====(HttpServletRequestrequest====,====StringcookieName====,====StringencodeString){==
==Cookie[]cookieList=request.getCookies()====;==
==if====(cookieList======null====||cookieName======null====){==
==returnnull;==
==}==
==StringretValue=====null;==
==try===={==
==for====(====int====i=====0====;====i\<cookieList.====length====;====i++){==
==if====(cookieList[i].getName().equals(cookieName)){==
==retValue=URLDecoder.==_decode_==(cookieList[i].getValue()====,====encodeString)====;==
==break;==
==}==
==}==
==}====catch====(UnsupportedEncodingExceptione){==
_logger_==.error(===="CookieDecodeError."====,====e)====;==
==}==
==return====retValue====;==
==}==

_/**_
_*__设置__Cookie__的值不设置生效时间默认浏览器关闭即失效__,__也不编码_
_*/_
==publicstaticvoid====setCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue){==
_setCookie_==(request====,====response====,====cookieName====,====cookieValue====,====-====1====)====;==
==}==

_/**_
_*__设置__Cookie__的值在指定时间内生效__,__但不编码_
_*/_
==publicstaticvoid====setCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,int====cookieMaxage){==
_setCookie_==(request====,====response====,====cookieName====,====cookieValue====,====cookieMaxage====,false====)====;==
==}==

_/**_
_*__设置__Cookie__的值不设置生效时间__,__但编码_
_*/_
==publicstaticvoid====setCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,boolean====isEncode){==
_setCookie_==(request====,====response====,====cookieName====,====cookieValue====,====-====1====,====isEncode)====;==
==}==

_/**_
_*__设置__Cookie__的值在指定时间内生效__,__编码参数_
_*/_
==publicstaticvoid====setCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,int====cookieMaxage====,boolean====isEncode){==
_doSetCookie_==(request====,====response====,====cookieName====,====cookieValue====,====cookieMaxage====,====isEncode)====;==
==}==

_/**_
_*__设置__Cookie__的值在指定时间内生效__,__编码参数__(__指定编码__)_
_*/_
==publicstaticvoid====setCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,int====cookieMaxage====,====StringencodeString){==
_doSetCookie_==(request====,====response====,====cookieName====,====cookieValue====,====cookieMaxage====,====encodeString)====;==
==}==

_/**_
_*__删除__Cookie__带__cookie__域名_
_*/_
==publicstaticvoid====deleteCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName){==
_doSetCookie_==(request====,====response====,====cookieName====,====""====,====-====1====,false====)====;==
==}==

_/**_
_*__设置__Cookie__的值，并使其在指定时间内生效_
_*_
_*_**@param**_cookieMaxage_
_*cookie__生效的最大秒数_
_*/_
==privatestaticfinalvoid====doSetCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,int====cookieMaxage====,boolean====isEncode){==
==try===={==
==if====(cookieValue======null====){==
==cookieValue=====""====;==
==}====elseif====(isEncode){==
==cookieValue=URLEncoder.==_encode_==(cookieValue====,===="utf-8"====)====;==
==}==
==Cookiecookie=====new====Cookie(cookieName====,====cookieValue)====;==
==if====(cookieMaxage\>====0====)==
==cookie.setMaxAge(cookieMaxage)====;==
==if====(====null====!=request)====//====设置域名的====cookie==
==cookie.setDomain(==_getDomainName_==(request))====;==
==cookie.setPath(===="/"====)====;==
==response.addCookie(cookie)====;==
==}====catch====(Exceptione){==
_logger_==.error(===="CookieEncodeError."====,====e)====;==
==}==
==}==

_/**_
_*__设置__Cookie__的值，并使其在指定时间内生效_
_*_
_*_**@param**_cookieMaxage_
_*cookie__生效的最大秒数_
_*/_
==privatestaticfinalvoid====doSetCookie====(HttpServletRequestrequest====,====HttpServletResponseresponse====,====StringcookieName====,====StringcookieValue====,int====cookieMaxage====,====StringencodeString){==
==try===={==
==if====(cookieValue======null====){==
==cookieValue=====""====;==
==}====else===={==
==cookieValue=URLEncoder.==_encode_==(cookieValue====,====encodeString)====;==
==}==
==Cookiecookie=====new====Cookie(cookieName====,====cookieValue)====;==
==if====(cookieMaxage\>====0====)==
==cookie.setMaxAge(cookieMaxage)====;==
==if====(====null====!=request)====//====设置域名的====cookie==
==cookie.setDomain(==_getDomainName_==(request))====;==
==cookie.setPath(===="/"====)====;==
==response.addCookie(cookie)====;==
==}====catch====(Exceptione){==
_logger_==.error(===="CookieEncodeError."====,====e)====;==
==}==
==}==

_/**_
_*__得到__cookie__的域名_
_*/_
==privatestaticfinal====String====getDomainName====(HttpServletRequestrequest){==
==StringdomainName=====null;==

==StringserverName=request.getRequestURL().toString()====;==
==if====(serverName======null====||serverName.equals(====""====)){==
==domainName=====""====;==
==}====else===={==
==serverName=serverName.toLowerCase()====;==
==serverName=serverName.substring(====7====)====;==
==finalint====end=serverName.indexOf(===="/"====)====;==
==serverName=serverName.substring(====0====,====end)====;==
==final====String[]domains=serverName.split(===="====\\====."====)====;==
==int====len=domains.====length====;==
==if====(len\>====3====){==
==//www.xxx.com.cn==
==domainName=domains[len-====3====]+===="."====+domains[len-====2====]+===="."====+domains[len-====1====]====;==
==}====elseif====(len\<=====3====&&len\>====1====){==
==//xxx.comorxxx.cn==
==domainName=domains[len-====2====]+===="."====+domains[len-====1====]====;==
==}====else===={==
==domainName=serverName====;==
==}==
==}==

==if====(domainName!=====null====&&domainName.indexOf(====":"====)\>====0====){==
==String[]ary=domainName.split(===="====\\====:"====)====;==
==domainName=ary[====0====]====;==
==}==
==return====domainName====;==
==}==

==}==
```
