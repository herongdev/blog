import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"JAVA后端——调用第三方URL接口","description":"","frontmatter":{"title":"JAVA后端——调用第三方URL接口","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/01-微服务入门/JAVA后端——调用第三方URL接口.md","filePath":"posts/java快速入门/第九部分：微服务/01-微服务入门/JAVA后端——调用第三方URL接口.md"}'),t={name:"posts/java快速入门/第九部分：微服务/01-微服务入门/JAVA后端——调用第三方URL接口.md"};function i(c,l,u,r,o,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在项目里有时候需要在后端引用别人的url，java用来调用的方法也有好几种，比如HttpURLConnection，还有apache的HttpClient，简单封装了一下HttpClient的get和post的方法。一般情况下应该是够用了")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"添加依赖")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  \\<groupId\\>org.apache.httpcomponents\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  \\<artifactId\\>httpclient\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  \\<version\\>4.5.10\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"   \\<groupId\\>com.alibaba\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"   \\<artifactId\\>fastjson\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"   \\<version\\>1.2.62\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"get请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"get方式：请求报文没有请求体，提交参数时，参数在url地址后拼接url?k=v&k2=v2")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @Description: get方式")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @author wch001")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @date 2022/5/6 9:50")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param url 地址")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param param 参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param token url携带的headers（非必须）")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return java.lang.Object")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static Object requestGetUrl(String url, Map\\<String, String\\> param,String token) throws Exception{")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        InputStream is = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        String body = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        StringBuilder  res=new StringBuilder();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 设置完整的url")]),s(`
`),n("span",{class:"line"},[n("span",null,"        URIBuilder uriBuilder = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        uriBuilder = new URIBuilder(url);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //添加参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for (Map.Entry\\<String, String\\> entry : param.entrySet()) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            uriBuilder.setParameter(entry.getKey(),entry.getValue());")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        HttpGet httpGet = new HttpGet(uriBuilder.build());")]),s(`
`),n("span",{class:"line"},[n("span",null,'        httpGet.addHeader("Content-Type", "application/json");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(token!=null){")]),s(`
`),n("span",{class:"line"},[n("span",null,'            httpGet.addHeader("token",token);')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        RequestConfig config = RequestConfig.custom().setConnectTimeout(5000).build();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        httpGet.setConfig(config);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        CloseableHttpClient httpClient = HttpClients.createDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        CloseableHttpResponse response = httpClient.execute(httpGet);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        HttpEntity entity = response.getEntity();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(entity != null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"            is = entity.getContent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //转换为字节输入流")]),s(`
`),n("span",{class:"line"},[n("span",null,"            BufferedReader br = new BufferedReader(new InputStreamReader(is, Consts.UTF_8));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            while((body=br.readLine()) != null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"                res.append(body);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object jsonMap = JSON.parse(res.toString());")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return jsonMap;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"post请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"post方式：请求报文有请求体， post的请求参数通过请求体提交，如果参数在请求体中是json字符串，后端controller方法需要使用 @RequestBody接受入参")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @Description: post方式获取访问url接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @author wch001")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @date 2022/4/29 9:40")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param url : 地址")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param param : 参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param token : url携带的headers（非必须）")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return java.lang.Object")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    public static Object requestPostUrl(String url, Map\\<String, Object\\> param,String token) throws Exception{")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        InputStream is = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        String body = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        StringBuilder   res=new StringBuilder();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        HttpPost httpPost = new HttpPost(url);")]),s(`
`),n("span",{class:"line"},[n("span",null,'        httpPost.addHeader("Content-Type", "application/json");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(token!=null){")]),s(`
`),n("span",{class:"line"},[n("span",null,'            httpPost.addHeader("token",token);')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 设置请求的参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        JSONObject jsonParam = new JSONObject();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        param.forEach((k,v)-\\> jsonParam.put(k,v));")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'        StringEntity stringEntity = new StringEntity(jsonParam.toString(), "utf-8");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'        stringEntity.setContentEncoding("UTF-8");')]),s(`
`),n("span",{class:"line"},[n("span",null,'        stringEntity.setContentType("application/json");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        httpPost.setEntity(stringEntity);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        RequestConfig config = RequestConfig.custom().setConnectTimeout(5000).build();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        httpPost.setConfig(config);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        CloseableHttpClient httpClient = HttpClients.createDefault();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        CloseableHttpResponse response = httpClient.execute(httpPost);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        HttpEntity entity = response.getEntity();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(entity != null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"            is = entity.getContent();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //转换为字节输入流")]),s(`
`),n("span",{class:"line"},[n("span",null,"            BufferedReader br = new BufferedReader(new InputStreamReader(is, Consts.UTF_8));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            while((body=br.readLine()) != null){")]),s(`
`),n("span",{class:"line"},[n("span",null,"                res.append(body);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object jsonMap = JSON.parse(res.toString());")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return jsonMap;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼http协议问题")]),s(`
`),n("span",{class:"line"},[n("span",null,"404： 路径找不到")]),s(`
`),n("span",{class:"line"},[n("span",null,"405： 请求方式不支持")]),s(`
`),n("span",{class:"line"},[n("span",null,"403： 权限")]),s(`
`),n("span",{class:"line"},[n("span",null,"200： 成功")]),s(`
`),n("span",{class:"line"},[n("span",null,"500： 服务器错误")]),s(`
`),n("span",{class:"line"},[n("span",null,"503： 网关找不到对应的微服务处理请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"400： 请求参数错误")]),s(`
`),n("span",{class:"line"},[n("span",null,"302:  重定向")]),s(`
`),n("span",{class:"line"},[n("span",null,"￼总结")]),s(`
`),n("span",{class:"line"},[n("span",null,"调用完，直接 JSON.parseObject(res.toString())，转成json，就比较好处理了。简单记录一下，以后可能还用的到。")])])])])],-1)])])}const h=a(t,[["render",i]]);export{f as __pageData,h as default};
