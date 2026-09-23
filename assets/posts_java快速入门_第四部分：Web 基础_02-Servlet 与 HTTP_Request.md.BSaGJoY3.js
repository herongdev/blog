import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Request","description":"","frontmatter":{"title":"Request","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Web基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Request.md","filePath":"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Request.md"}'),t={name:"posts/java快速入门/第四部分：Web 基础/02-Servlet 与 HTTP/Request.md"};function i(u,a,c,r,o,g){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"request对象和response对象的原理")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. request和response对象是由服务器创建的。我们来使用它们")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. request对象是来获取请求消息，response对象是来设置响应消息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"request对象继承体系结构：")]),s(`
`),n("span",{class:"line"},[n("span",null,"ServletRequest	-- 接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"|	继承")]),s(`
`),n("span",{class:"line"},[n("span",null,"HttpServletRequest	-- 接口")]),s(`
`),n("span",{class:"line"},[n("span",null,"|	实现")]),s(`
`),n("span",{class:"line"},[n("span",null,"org.apache.catalina.connector.RequestFacade 类(tomcat)")]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**request****功能：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、获取请求消息数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取请求行数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"* GET /day14/demo1?name=zhangsan HTTP/1.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取请求方式 ：GET")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getMethod()")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. (*)获取虚拟目录：/day14")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getContextPath()")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 获取Servlet路径: /demo1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getServletPath()")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 获取get方式请求参数：name=zhangsan")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getQueryString()")]),s(`
`),n("span",{class:"line"},[n("span",null,"5. (*)获取请求URI：/day14/demo1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getRequestURI():/day14/demo1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* StringBuffer getRequestURL():http://localhost/day14/demo1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* URL:统一资源定位符 ： [http://localhost/day14/demo1](http://localhost/day14/demo1)")]),s(`
`),n("span",{class:"line"},[n("span",null,"* URI：统一资源标识符 : /day14/demo1")]),s(`
`),n("span",{class:"line"},[n("span",null,"6. 获取协议及版本：HTTP/1.1")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getProtocol()")]),s(`
`),n("span",{class:"line"},[n("span",null,"7. 获取客户机的IP地址：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* String getRemoteAddr()")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 获取请求头数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* (*)String getHeader(String name):通过请求头的名称获取请求头的值")]),s(`
`),n("span",{class:"line"},[n("span",null,"* Enumeration\\<String\\> getHeaderNames():获取所有的请求头名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 获取请求体数据:")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 请求体：只有POST请求方式，才有请求体，在请求体中封装了POST请求的请求参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 步骤：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取流对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"*  BufferedReader getReader()：获取字符输入流，只能操作字符数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"*  ServletInputStream getInputStream()：获取字节输入流，可以操作所有类型数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 在文件上传知识点后讲解")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 再从流对象中拿数据")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"二、其他功能：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取请求参数通用方式：不论get还是post请求方式都可以使用下列方法来获取请求参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. String getParameter(String name):根据参数名称获取参数值    username=zs&password=123")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. String[] getParameterValues(String name):根据参数名称获取参数值的数组  hobby=xx&hobby=game")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. Enumeration\\<String\\> getParameterNames():获取所有请求的参数名称")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. Map\\<String,String[]\\> getParameterMap():获取所有参数的map集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 中文乱码问题：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* get方式：tomcat 8 已经将get方式乱码问题解决了")]),s(`
`),n("span",{class:"line"},[n("span",null,"* post方式：会乱码")]),s(`
`),n("span",{class:"line"},[n("span",null,'* 解决：在获取参数前，设置request的编码request.setCharacterEncoding("utf-8");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 请求转发：一种在服务器内部的资源跳转方式")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 步骤：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 通过request对象获取请求转发器对象：RequestDispatcher getRequestDispatcher(String path)")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 使用RequestDispatcher对象来进行转发：forward(ServletRequest request, ServletResponse response)")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 特点：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 浏览器地址栏路径不发生变化")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 只能转发到当前服务器内部资源中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 转发是一次请求")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 共享数据：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 域对象：一个有作用范围的对象，可以在范围内共享数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"* request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. void setAttribute(String name,Object obj):存储数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. Object getAttitude(String name):通过键获取值")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. void removeAttribute(String name):通过键移除键值对")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 获取ServletContext：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* ServletContext getServletContext()")])])])])],-1)])])}const S=l(t,[["render",i]]);export{m as __pageData,S as default};
