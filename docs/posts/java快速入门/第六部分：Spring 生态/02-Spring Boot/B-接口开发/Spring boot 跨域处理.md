---
title: Spring boot 跨域处理
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
**方法1：全局配置**
==定义配置类，添加==**@Configuration**==注解，实现WebMvcConfigurer接口，再重写addCorsMappings方法：==
`//` ==请求跨域==

@Configuration￼publicclassCorsConfigimplementsWebMvcConfigurer{@Override￼    publicvoidaddCorsMappings(CorsRegistry registry){//
==添加映射路径==

registry.addMapping("/**")//
==是否发送==

Cookie.allowCredentials(true)//
==设置放行哪些原始域== `SpringBoot2.4.4`==下低版本使用==

.allowedOrigins("*")    .allowedOriginPatterns("*")//
==放行哪些请求方式==

.allowedMethods(newString[]{"GET","POST","PUT","DELETE"})//.allowedMethods("*") //
==或者放行全部==`//`==放行哪些原始请求头部信息==

.allowedHeaders("*")//
==暴露哪些原始请求头部信息==

.exposedHeaders("*");}}
 ==复制==
**方法2：局部跨域**
==Controller层在需要跨域的类或者方法上加上==**@CrossOrigin**==该注解即可。==

@CrossOrigin(origins ="*",maxAge =3600)publicclassUserController{final UserService userService;@GetMapping("/getOne/{id}")publicUser getOne(@PathVariable("id")Integer id){returnuserService.getById(id);}
 ==复制==
==我们也可以设置更小的粒度，在方法上设置跨域：==

@Controller￼@RequestMapping("/shop")publicclassShopController{@GetMapping("/")@ResponseBody￼    //
==更小的解决跨域== ==设置只能某些地址访问==

@CrossOrigin(originPatterns ="http://localhost:8080")publicMap\<String,Object\>findAll(){//
==返回数据==

returnDataSchool.getStudents();}}
 ==复制==
**方法3：定义跨域过滤器**
==1）编写过滤器==
`//` ==跨域过滤器==

@Component￼publicclassCORSFilterimplementsFilter{@Override￼    publicvoiddoFilter(ServletRequest request,ServletResponse response,FilterChain chain)throws IOException,ServletException {//*
==号表示对所有请求都允许跨域访问==

HttpServletResponse res =(HttpServletResponse)response;res.addHeader("Access-Control-Allow-Credentials","true");res.addHeader("Access-Control-Allow-Origin","*");res.addHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT");res.addHeader("Access-Control-Allow-Headers","Content-Type,X-CAF-Authorization-Token,sessionToken,X-TOKEN");if(((HttpServletRequest)request).getMethod().equals("OPTIONS")){response.getWriter().println("Success");return;}chain.doFilter(request,response);}@Override￼    publicvoiddestroy(){}@Override￼    publicvoidinit(FilterConfig filterConfig)throws ServletException {}}
 ==复制==
==2）注册过滤器==

@Configuration￼publicclassCorsConfig{@Bean￼    publicCorsFilter corsFilter(){CorsConfiguration corsConfiguration =newCorsConfiguration();corsConfiguration.addAllowedOrigin("*");corsConfiguration.addAllowedHeader("*");corsConfiguration.addAllowedMethod("*");corsConfiguration.setAllowCredentials(true);UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource =newUrlBasedCorsConfigurationSource();urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);returnnewCorsFilter(urlBasedCorsConfigurationSource);}}
 \> 来自 \<[https://cloud.tencent.com/developer/article/1924258](https://cloud.tencent.com/developer/article/1924258)\>
