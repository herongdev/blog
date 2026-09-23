import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"ngnix配置","description":"","frontmatter":{"title":"ngnix配置","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/ngnix配置.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/ngnix配置.md"}'),i={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/ngnix配置.md"};function t(o,a,r,c,d,u){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"找到ngnix目录，找到")]),s(`
`),n("span",{class:"line"},[n("span",null,"F:\\nginx-1.16.1\\conf下的nginx.conf文件，修改配置")]),s(`
`),n("span",{class:"line"},[n("span",null,"修改如下server内容")]),s(`
`),n("span",{class:"line"},[n("span",null,"    server \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        listen       80;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        server_name  manage.leyou.com;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forwarded-Host $host;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forwarded-Server $host;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forwarded-For $proxy_add_X_forwarded_for;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        location / \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"            proxy_pass [http://192.168.1.10:9001](http://192.168.1.10:9001);")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_connect_timeout 600;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_read_timeout 600;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        \\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    \\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"server \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        listen       80;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        server_name  api.leyou.com;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forworded-Host $host;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forworded-Server $host;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_set_header X-Forworded-For $proxy_add_X_forwarded_for;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        location / \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"            proxy_pass [http://192.168.1.10:10010](http://192.168.1.10:10010);")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_connect_timeout 600;")]),s(`
`),n("span",{class:"line"},[n("span",null,"proxy_read_timeout 600;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        \\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    \\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"访问流程")]),s(`
`),n("span",{class:"line"},[n("span",null,"本机在使用浏览器访问域名时，通过修改本地hosts文件，定向到了虚拟机的ip地址，虚拟机nginx在得到请求后，监听默认的80端口号，根据来源域名，反向代理到了本机服务器不同端口的服务。")]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"不同域名都定向到了虚拟机的ip地址")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"对于所有域名的访问，先要经过微服务ly-gateway，在它的配置文件application.yml中，我们配置了不同域名对应的服务，比如监听本地服务器的10010端口，对所有/api前缀开头的域名，使其定向到/item/**微服务")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`也可以利用谷歌浏览器的XShost来实现这种域名到本地服务器不同商品服务的对应`")])])])])],-1)])])}const h=l(i,[["render",t]]);export{x as __pageData,h as default};
