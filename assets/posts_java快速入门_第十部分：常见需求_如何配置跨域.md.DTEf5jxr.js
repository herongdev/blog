import{_ as e,o as d,c as t,a5 as c}from"./chunks/framework.DJo0M80U.js";const q=JSON.parse('{"title":"如何配置跨域","description":"","frontmatter":{"title":"如何配置跨域","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","常见需求","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第十部分：常见需求/如何配置跨域.md","filePath":"posts/java快速入门/第十部分：常见需求/如何配置跨域.md"}'),r={name:"posts/java快速入门/第十部分：常见需求/如何配置跨域.md"};function a(n,o,i,s,u,p){return d(),t("div",null,[...o[0]||(o[0]=[c(`<div><p>对于这个<code>Spring Boot</code>项目，你可以在应用代码级别配置<code>CORS</code>。这意味着你不必在<code>Nginx</code>中配置<code>CORS</code>。</p><p><code>Spring</code>框架提供了一种非常方便的方式来处理<code>CORS</code>。以下是如何在<code>Spring</code>项目中进行配置：</p><p>全局<code>CORS</code>配置 你可以在一个<code>Spring MVC</code>的<code>Java</code>配置中添加一个全局<code>CORS</code>配置。在你的<code>Spring Boot</code>应用中，可以创建一个新的<code>@Configuration</code>类，然后添加<code>@Bean</code>方法来实现<code>WebMvcConfigurer</code>。示例如下：</p><p>java Copy code @Configuration public class MyConfiguration {</p><pre><code>@Bean
public WebMvcConfigurer corsConfigurer() \\{
    return new WebMvcConfigurer() \\{
        @Override
        public void addCorsMappings(CorsRegistry registry) \\{
            registry.addMapping(&quot;/**&quot;)
                    .allowedOrigins(&quot;*&quot;)
                    .allowedMethods(&quot;GET&quot;, &quot;POST&quot;, &quot;PUT&quot;, &quot;DELETE&quot;)
                    .allowedHeaders(&quot;*&quot;)
                    .allowCredentials(true).maxAge(3600);
        \\}
    \\};
\\}
</code></pre><p>} 在上面的配置中，<code>addMapping(&quot;/**&quot;)</code>指定了对于所有的请求都允许跨域请求。<code>allowedOrigins(&quot;*&quot;)</code>指定了所有的源都允许访问。<code>allowedMethods(&quot;GET&quot;, &quot;POST&quot;, &quot;PUT&quot;, &quot;DELETE&quot;)</code>指定了允许的方法。<code>allowedHeaders(&quot;*&quot;)</code>指定了允许的请求头。</p><p>控制器级<code>CORS</code>配置 如果你只想为特定的<code>Spring MVC</code>控制器（或控制器方法）启用<code>CORS</code>，你可以使用<code>@CrossOrigin</code>注解。下面是一个简单的例子：</p><p>java Copy code @CrossOrigin(origins = &quot;<em>&quot;, allowedHeaders = &quot;</em>&quot;, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}) @RestController public class MyController { // ... } 在上面的例子中，<code>@CrossOrigin</code>注解应用到了<code>MyController</code>类。这表示所有这个控制器的方法都允许<code>CORS</code>。</p><p>注意：虽然在代码级别配置<code>CORS</code>更灵活，更易于管理，但是它也有一些缺点。例如，如果你的<code>Spring</code>应用程序在多个服务器上运行，你需要在每个服务器上都进行相同的配置。同时，如果你的应用程序使用了一些不能修改源码的第三方库，那么你可能无法在代码级别配置<code>CORS</code>。在这些情况下，你可能需要在<code>Nginx</code>级别配置<code>CORS</code>。</p></div>`,1)])])}const C=e(r,[["render",a]]);export{q as __pageData,C as default};
