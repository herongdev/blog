import{_ as n,o,c as r,j as e,a as t}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"报错：Failed to start bean ‘documentationPluginsBootstrapper’","description":"","frontmatter":{"title":"报错：Failed to start bean ‘documentationPluginsBootstrapper’","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/03-实战-新蜂商城/集成Swagger2/报错：Failed to start bean ‘documentationPluginsBootstrapper’.md","filePath":"posts/java快速入门/第九部分：微服务/03-实战-新蜂商城/集成Swagger2/报错：Failed to start bean ‘documentationPluginsBootstrapper’.md"}'),s={name:"posts/java快速入门/第九部分：微服务/03-实战-新蜂商城/集成Swagger2/报错：Failed to start bean ‘documentationPluginsBootstrapper’.md"};function l(i,a,c,p,u,d){return o(),r("div",null,[...a[0]||(a[0]=[e("div",null,[e("p",null,"两种解决办法"),e("ol",null,[e("li",null,[t("配置"),e("code",null,"WebMvcConfigurer.java")]),e("li",null,[t("配置文件添加"),e("code",null,"spring.mvc.pathmatch.matching-strategy=ant_path_matcher")]),e("li",null,"项目启动"),e("li",null,[e("code",null,"swagger"),t("访问，"),e("code",null,"http://localhost:8080/doc.html")])]),e("p",null,"具体操作如下： 一、配置"),e("p",null,"WebMvcConfigurer.java import org.springframework.context.annotation.Configuration; import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;"),e("p",null,"@Configuration public class WebMvcConfigurer extends WebMvcConfigurationSupport {"),e("pre",null,[e("code",null,`/**
 *
`)]),e("p",null,[t("发现如果继承了"),e("code",null,"WebMvcConfigurationSupport"),t("，则在"),e("code",null,"yml"),t("中配置的相关内容会失效。 需要重新指定静态资源")]),e("pre",null,[e("code",null,` */
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) \\{
    registry.addResourceHandler("/**").addResourceLocations(
            "classpath:/static/");
    registry.addResourceHandler("swagger-ui.html", "doc.html").addResourceLocations(
            "classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**").addResourceLocations(
            "classpath:/META-INF/resources/webjars/");
    super.addResourceHandlers(registry);
\\}
`)]),e("p",null,[e("code",null,"}")]),e("p",null,"二、配置文件添加"),e("p",null,"spring.mvc.pathmatch.matching-strategy=ant_path_matcher spring: mvc: pathmatch: matching-strategy: ant_path_matcher"),e("div",{class:"language- vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"}),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[e("code",null,[e("span",{class:"line"},[e("span")])])])])],-1)])])}const h=n(s,[["render",l]]);export{m as __pageData,h as default};
