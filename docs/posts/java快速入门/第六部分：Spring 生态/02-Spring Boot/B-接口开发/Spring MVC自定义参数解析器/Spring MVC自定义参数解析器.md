---
title: Spring MVC自定义参数解析器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
一、先注册一个注解；
二、再实现一个HandlerMethodArgumentResolver；
三、再实现的WebMvcConfigurer类中，将resolver添加到resolvers中；即重写addArgumentResolvers方法；
参数解析器
参数解析器是spring mvc中将请求上下文中的请求参数转化要被调用的请求方法的参数的参数值。
参数解析器的初始化是在Handler适配器中。
spring mvc默认的参数解析器有20多个，大概分为以下4类，这个是RequestMappingHandlerAdapter类里初始化设置HandlerMethodArgumentResolverComposite的加载顺序，所以自定义参数解析器的优先级并不高，但是有很多种方法调整他的优先级（搞明白他的原理，根据实际需求想怎么弄怎么弄）。

![image.png](Exported%20image%2020260702233018-0.png)

自定义参数解析器
自定义参数解析器可以实现接口：HandlerMethodArgumentResolver，接口声明如下：
publicinterfaceHandlerMethodArgumentResolver{￼ ￼ /**￼ * 每个参数会被包装为MethodParameter，当这个参数每一次匹配参数解析器的时候，这个方法，会返回true或false￼ * ，true则匹配并缓存这个参数解析器，后续针对该参数不再匹配，fasle继续用下一个匹配￼ * ￼ */booleansupportsParameter(MethodParameter parameter);￼ ￼ /**￼ * 参数解析的实现￼ */Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,￼ NativeWebRequest webRequest, WebDataBinderFactory binderFactory)throwsException;￼ ￼}
实际上，根据情况并不需要每次都实现这个接口，可以根据自己的实际需要继承其中的某个实现重写方法定制。
如果我们解析的时候，需要使用参数名，可以直接继承AbstractNamedValueMethodArgumentResovler抽象类，并重写它的几个关键方法即可，下面会用一个示例说明。
代码示例
这个代码只是简单说明了实现过程作为一个示例，并不是全部实现：
首先自定义一个注解：
@Target(ElementType.PARAMETER)@Retention(RetentionPolicy.RUNTIME)@Documentedpublic@interfaceCustomRequestParam {￼ ￼ @AliasFor("name")String value()default"";￼ ￼ // 参数绑定的变量名@AliasFor("value")String name()default"";￼ ￼ //参数是否必须booleanrequired()defaulttrue;￼ ￼ // 没有获取到请求参数的时候的默认值String defaultValue()defaultValueConstants.DEFAULT_NONE;￼}
参数解析器的代码 ：
publicclassCustomRequestParamArgumentResolverextendsAbstractNamedValueMethodArgumentResolver{￼ ￼ // 如果没有重写这个方法，或者参数名信息为空，默认使用变量名@OverrideprotectedNamedValueInfo createNamedValueInfo(MethodParameter parameter){￼ CustomRequestParamcustomRequestParam=parameter.getParameterAnnotation(CustomRequestParam.class);￼ returnnewCustomRequestParamNamedValueInfo(CustomRequestParam);￼ }￼ ￼ // 参数解析@OverrideprotectedObject resolveName(String name, MethodParameter parameter, NativeWebRequest request)throwsException {￼ // TODO:解析参数值，并返回指定参数对象returnnull;￼ }￼ ￼ @OverridepublicbooleansupportsParameter(MethodParameter parameter){￼ // 只解析绑定有注解CustomRequestParam的参数，其它参数不处理returnparameter.hasParameterAnnotation(CustomRequestParam.class);￼ }￼ ￼ staticclassCustomRequestParamNamedValueInfoextendsNamedValueInfo{￼ ￼ // 根据注解获得变量名等信息publicCustomRequestParamNamedValueInfo(CustomRequestParam customRequestParam){￼ super(customRequestParam.name(), customRequestParam.required(), customRequestParam.defaultValue());￼ }￼ ￼ }￼}
注册自定义参数解析器
如果要让自定义参数解析器注册到spring mvc，可以使用@EnableWebMvc自定义mvc配置的方式:
@EnableWebMvc@ConfigurationpublicclassCustomWebMvcConfigurationextendsWebMvcConfigurerAdapter{￼ ￼ @OverridepublicvoidaddArgumentResolvers(List\<HandlerMethodArgumentResolver\> argumentResolvers){￼ argumentResolvers.add(newCustomRequestParamArgumentResolver());￼ super.addArgumentResolvers(argumentResolvers);￼ }￼}
