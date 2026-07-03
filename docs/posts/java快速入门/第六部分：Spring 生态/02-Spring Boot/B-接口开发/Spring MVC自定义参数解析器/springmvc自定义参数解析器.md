---
title: springmvc自定义参数解析器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
shan&cen

于 2020-08-18 14:36:49 发布

727
收藏 1
文章标签： java spring spring boot
版权
springmvc自定义参数解析器
操作原理
1.当请求进入映射方法之后,发现映射方法声明的形式参数
2.springmvc马上遍历所有参数解析器(包括自定义解析器),一个一个执行supportParameter方法,
一旦返回true,停止循环,表示当前解析器马上调用该解析器resolverArgument方法,
将方法方法返回值注入到形式参数变量中
3.例子,假设映射方法声明一个UserInfo这个参数类型,springmvc执行时候,
发现UserInfoArgumentResolver 解析的supportParameter方法返回true,
那么再调用resolverArgument将当前登录用户信息返回直接注入到userinfo变量中
1
2
3
4
5
6
7
没用自定义解析器存在问题(代码重复)
存在问题:
后端获取当前登录用户信息使用方法,其他接口要获取当前登录用户对象都需要执行几个步骤
(先获取token,再通过token获取当前登录对象),出现代码重复
//需求:使用简化的方式获取当前登录用户信息
直接在请求映射方法中声明UserInfo,这个类型形式参数,springmvc就自动将当前登录用户对象注入
//说明:
springmvc所有的映射方法中形式参数的值注入都是靠springmvc自带参数解析器实现
//具体操作:
现在想要springmvc将当前登录用户对象注入,需要自定义参数解析器
1
2
3
4
5
6
7
8
9
代码(UserArgumentResolver类,核心实现HandlerMethodArgumentResolver接口)
//实现HandlerMethodArgumentResolver接口中的2个方法
@Component
public class UserArgumentResolver implements HandlerMethodArgumentResolver {
@Autowired
private IUserInfoRedisService userInfoRedisService;
//先判断参数类型和是否贴了自定义注解的,都满足就返回true,然后进行下一步获取数据
@Override
public boolean supportsParameter(MethodParameter methodParameter) {
//判断类型,并且使用自定义注解限制
return methodParameter.getParameterType() == UserInfo.class
&& methodParameter.hasParameterAnnotation(UserParameter.class);
}
//如果成功则再获取数据
@Override
public Object resolveArgument(MethodParameter methodParameter
, ModelAndViewContainer modelAndViewContainer
, NativeWebRequest nativeWebRequest
, WebDataBinderFactory webDataBinderFactory)
throws Exception {
//获取token
String token = nativeWebRequest.getHeader("token");
//获取用户对象
UserInfo user = userInfoRedisService.getUserByToken(token);
return user;
}
}
1.将请求映射方法声明形式参数的UserInfo类型的参数,解析成当前登录用户对象并注入
//方法1:用来匹配
指定该解析器能解析参数类型,返回值为boolean类型,
//方法2:执行解析逻辑,当上面判断是同一个类型时,就开始解析
获取当前登录用户信息对象,并注入UserInfo类型的参数中,当前supportParameter() 返回true时,才执行

2. 在主配置类中,将自定义参数解析器类交给spring容器管理,然后add,将我们自定义的解析器交给springmvc视图解析器
//注意:UserInfo.class类型要与需要封装的对象类型相同
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
主配置类(哪个服务需要用到自定义参数解析器,哪个服务就要配置这个,不一定是主配置了,只要实现WebMvcConfigurer接口即可)
//我们需要在主配置中将我们自定义的解析器交给springmvc管理
@SpringBootApplication
public class APP implements WebMvcConfigurer {
@Autowired
private UserArgumentResolver userArgumentResolver;

public static void main(String[] args) {
SpringApplication.run(APP.class, args);
}
//简写add,idea会提示该方法,将自定义参数解析器交给springmvc管理
@Override
public void addArgumentResolvers(List\<HandlerMethodArgumentResolver\> resolvers) {
resolvers.add(userArgumentResolver);
}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
自定义注解(防止都使用自定义注解,所以使用自定义注解来限制)
//如果要进行用户编辑,映射方法接受参数也是UserInfo,此时怎么区分,使用自定义注解区分
//表示贴在参数上
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
/*登录校验注解
约定:如果该注解贴在某个参数上表示使用自定义解析器
如果没有贴就使用springmvc的解析器*/
public @interface UserParameter {
}
1
2
3
4
5
6
7
8
9
验证

//当我们需要获取登录用户信息时就贴上注解,这样获取的就是当前登录的,已经存到redis中的用户信息了
@GetMapping("/info")
public Object info(@UserParameter UserInfo userInfo) {
return JsonResult.success(userInfo);
}
//当我们不要当前登录用户信息,而是页面其他需要封装的信息时,我们就不贴注解,它会默认使用springmvc解析器帮我们进行封装
//验证
@GetMapping("/info2")
public Object info2(UserInfo userInfo) {
return JsonResult.success(userInfo);
}
1
2
3
4
5
6
7
8
9
10
11
另一种 (获取cookie中的user对象)
public class UserArgumentresolver implements HandlerMethodArgumentResolver {
@Autowired
private RedisService redisService;

@Override
public boolean supportsParameter(MethodParameter methodParameter) {
return methodParameter.getParameterType() == User.class
&& methodParameter.hasParameterAnnotation(ValidationAnno.class);
}

@Override
public Object resolveArgument(MethodParameter methodParameter
, ModelAndViewContainer modelAndViewContainer
, NativeWebRequest nativeWebRequest
, WebDataBinderFactory webDataBinderFactory) throws Exception {
HttpServletRequest request = nativeWebRequest.getNativeRequest(HttpServletRequest.class);
String token = CookieUtil.getToken(request, "userToken");
User user = redisService.get(MemberKeyPrefix.USER_TOKEN, token, User.class);
if (user != null) {
return user;
}
return null;
}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
小结
springmvc自定义参数解析器可以让我们自定义的注入一些信息,例如:用户信息,开发中经常要获取用户信息,此时我们可以使用自定义参数解析器,然后配合自定义注解,让我们更加方便的获取到用户信息
步骤:
1.实现HandlerMethodArgumentResolver接口,一个方法判断类型,一个方法获取数据并返回
2.将自定义参数解析器交给springmvc管理即可
————————————————
版权声明：本文为CSDN博主「shan&amp;cen」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_47555380/article/details/108076468
