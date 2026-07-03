---
title: JAVA后端——调用第三方URL接口
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
在项目里有时候需要在后端引用别人的url，java用来调用的方法也有好几种，比如HttpURLConnection，还有apache的HttpClient，简单封装了一下HttpClient的get和post的方法。一般情况下应该是够用了

内容
添加依赖
\<dependency\>
  \<groupId\>org.apache.httpcomponents\</groupId\>
  \<artifactId\>httpclient\</artifactId\>
  \<version\>4.5.10\</version\>
\</dependency\>
\<dependency\>
   \<groupId\>com.alibaba\</groupId\>
   \<artifactId\>fastjson\</artifactId\>
   \<version\>1.2.62\</version\>
\</dependency\>

get请求
get方式：请求报文没有请求体，提交参数时，参数在url地址后拼接url?k=v&k2=v2

/**
     * @Description: get方式
     * @author wch001
     * @date 2022/5/6 9:50
     * @param url 地址
     * @param param 参数
     * @param token url携带的headers（非必须）
     * @return java.lang.Object
     */
public static Object requestGetUrl(String url, Map\<String, String\> param,String token) throws Exception{

        InputStream is = null;
        String body = null;
        StringBuilder  res=new StringBuilder();
        // 设置完整的url
        URIBuilder uriBuilder = null;
        uriBuilder = new URIBuilder(url);
        //添加参数
        for (Map.Entry\<String, String\> entry : param.entrySet()) {
            uriBuilder.setParameter(entry.getKey(),entry.getValue());
        }
        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.addHeader("Content-Type", "application/json");
        if(token!=null){
            httpGet.addHeader("token",token);
        }

        RequestConfig config = RequestConfig.custom().setConnectTimeout(5000).build();

        httpGet.setConfig(config);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if(entity != null){
            is = entity.getContent();
            //转换为字节输入流
            BufferedReader br = new BufferedReader(new InputStreamReader(is, Consts.UTF_8));
            while((body=br.readLine()) != null){
                res.append(body);
            }
        }

        Object jsonMap = JSON.parse(res.toString());

        return jsonMap;
    }

post请求
post方式：请求报文有请求体， post的请求参数通过请求体提交，如果参数在请求体中是json字符串，后端controller方法需要使用 @RequestBody接受入参

/**
     * @Description: post方式获取访问url接口
     * @author wch001
     * @date 2022/4/29 9:40
     * @param url : 地址
     * @param param : 参数
     * @param token : url携带的headers（非必须）
     * @return java.lang.Object
     */
    public static Object requestPostUrl(String url, Map\<String, Object\> param,String token) throws Exception{

        InputStream is = null;
        String body = null;
        StringBuilder   res=new StringBuilder();
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader("Content-Type", "application/json");
        if(token!=null){
            httpPost.addHeader("token",token);
        }

        // 设置请求的参数
        JSONObject jsonParam = new JSONObject();

        param.forEach((k,v)-\> jsonParam.put(k,v));

        StringEntity stringEntity = new StringEntity(jsonParam.toString(), "utf-8");

        stringEntity.setContentEncoding("UTF-8");
        stringEntity.setContentType("application/json");
        httpPost.setEntity(stringEntity);

        RequestConfig config = RequestConfig.custom().setConnectTimeout(5000).build();

        httpPost.setConfig(config);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = httpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();
        if(entity != null){
            is = entity.getContent();
            //转换为字节输入流
            BufferedReader br = new BufferedReader(new InputStreamReader(is, Consts.UTF_8));
            while((body=br.readLine()) != null){
                res.append(body);
            }
        }

        Object jsonMap = JSON.parse(res.toString());

        return jsonMap;
    }
￼http协议问题
404： 路径找不到
405： 请求方式不支持
403： 权限
200： 成功
500： 服务器错误
503： 网关找不到对应的微服务处理请求
400： 请求参数错误
302:  重定向
￼总结
调用完，直接 JSON.parseObject(res.toString())，转成json，就比较好处理了。简单记录一下，以后可能还用的到。
```
