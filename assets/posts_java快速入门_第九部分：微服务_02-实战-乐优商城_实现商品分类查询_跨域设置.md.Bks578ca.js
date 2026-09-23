import{_ as l,o as e,c as o,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"跨域设置","description":"","frontmatter":{"title":"跨域设置","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/实现商品分类查询/跨域设置.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/实现商品分类查询/跨域设置.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/实现商品分类查询/跨域设置.md"};function p(c,a,r,t,u,d){return e(),o("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"了解跨域相关问题：")]),s(`
`),n("span",{class:"line"},[n("span",null,"[跨域](section-id={D9A41BF5-4D5A-4262-A0C7-C61D3661B1C9})")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在ly-gateway中新建包com.leyou.gateway.config.GlobalCorsConfig.java")]),s(`
`),n("span",{class:"line"},[n("span",null,"packagecom.leyou.gateway.config;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"importorg.springframework.context.annotation.Bean;")]),s(`
`),n("span",{class:"line"},[n("span",null,"importorg.springframework.context.annotation.Configuration;")]),s(`
`),n("span",{class:"line"},[n("span",null,"importorg.springframework.web.cors.CorsConfiguration;")]),s(`
`),n("span",{class:"line"},[n("span",null,"importorg.springframework.web.cors.UrlBasedCorsConfigurationSource;")]),s(`
`),n("span",{class:"line"},[n("span",null,"importorg.springframework.web.filter.CorsFilter;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Configuration")]),s(`
`),n("span",{class:"line"},[n("span",null,"publicclassGlobalCorsConfig{")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Bean")]),s(`
`),n("span",{class:"line"},[n("span",null,"public  CorsFilter  corsFilter(){")]),s(`
`),n("span",{class:"line"},[n("span",null,"//添加CORS配置信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"UrlBasedCorsConfigurationSource  configSource=new  UrlBasedCorsConfigurationSource();")]),s(`
`),n("span",{class:"line"},[n("span",null,"CorsConfiguration  config=new CorsConfiguration();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//是否发送Cookie信息")]),s(`
`),n("span",{class:"line"},[n("span",null,"config.setAllowCredentials(true);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//允许的域，不要写*，否则cookie就无法使用了")]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedOrigin("*");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//允许的头信息")]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedHeader("*");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//允许的请求方式")]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("OPTIONS");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("HEAD");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("GET");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("PUT");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("POST");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("DELETE");')]),s(`
`),n("span",{class:"line"},[n("span",null,'config.addAllowedMethod("PATCH");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//5)有效时长")]),s(`
`),n("span",{class:"line"},[n("span",null,"config.setMaxAge(3600L);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//2.添加映射路径，我们拦截一切请求")]),s(`
`),n("span",{class:"line"},[n("span",null,'configSource.registerCorsConfiguration("/**",config);')]),s(`
`),n("span",{class:"line"},[n("span",null,"//3.返回新的CorsFilter")]),s(`
`),n("span",{class:"line"},[n("span",null,"return  new  CorsFilter(configSource);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const C=l(i,[["render",p]]);export{f as __pageData,C as default};
