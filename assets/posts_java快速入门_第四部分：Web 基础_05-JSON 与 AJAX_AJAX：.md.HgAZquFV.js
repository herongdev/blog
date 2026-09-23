import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"AJAX：","description":"","frontmatter":{"title":"AJAX：","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Web基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/AJAX：.md","filePath":"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/AJAX：.md"}'),t={name:"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/AJAX：.md"};function c(i,a,u,r,o,d){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1. 概念： ASynchronous JavaScript And XML	异步的JavaScript 和 XML")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 异步和同步：客户端和服务器端相互通信的基础上")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 客户端必须等待服务器端的响应。在等待的期间客户端不能做其他操作。")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 客户端不需要等待服务器端的响应。在服务器处理请求的过程中，客户端可以进行其他的操作。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。 [1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。")]),s(`
`),n("span",{class:"line"},[n("span",null,"传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"提升用户的体验")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 实现方式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 原生的JS实现方式（了解）")]),s(`
`),n("span",{class:"line"},[n("span",null," //1.创建核心对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var xmlhttp;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (window.XMLHttpRequest)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {// code for IE7+, Firefox, Chrome, Opera, Safari")]),s(`
`),n("span",{class:"line"},[n("span",null,"                xmlhttp=new XMLHttpRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            else")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {// code for IE6, IE5")]),s(`
`),n("span",{class:"line"},[n("span",null,'                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");')]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //2. 建立连接")]),s(`
`),n("span",{class:"line"},[n("span",null,"            /*")]),s(`
`),n("span",{class:"line"},[n("span",null,"                参数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    1. 请求方式：GET、POST")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        * get方式，请求参数在URL后边拼接。send方法为空参")]),s(`
`),n("span",{class:"line"},[n("span",null,"                        * post方式，请求参数在send方法中定义")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    2. 请求的URL：")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    3. 同步或异步请求：true（异步）或 false（同步）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"             */")]),s(`
`),n("span",{class:"line"},[n("span",null,'            xmlhttp.open("GET","ajaxServlet?username=tom",true);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //3.发送请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"            xmlhttp.send();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //4.接受并处理来自服务器的响应结果")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //获取方式 ：xmlhttp.responseText")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //什么时候获取？当服务器响应成功后再获取")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //当xmlhttp对象的就绪状态改变时，触发事件onreadystatechange。")]),s(`
`),n("span",{class:"line"},[n("span",null,"            xmlhttp.onreadystatechange=function()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                //判断readyState就绪状态是否为4，判断status响应状态码是否为200")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (xmlhttp.readyState==4 && xmlhttp.status==200)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                   //获取服务器的响应结果")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    var responseText = xmlhttp.responseText;")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    alert(responseText);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. JQeury实现方式")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. $.ajax()")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 语法：$.ajax({键值对});")]),s(`
`),n("span",{class:"line"},[n("span",null," //使用$.ajax()发送异步请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"            $.ajax({")]),s(`
`),n("span",{class:"line"},[n("span",null,'                url:"ajaxServlet1111" , // 请求路径')]),s(`
`),n("span",{class:"line"},[n("span",null,'                type:"POST" , //请求方式')]),s(`
`),n("span",{class:"line"},[n("span",null,'                //data: "username=jack&age=23",//请求参数')]),s(`
`),n("span",{class:"line"},[n("span",null,'                data:{"username":"jack","age":23},')]),s(`
`),n("span",{class:"line"},[n("span",null,"                success:function (data) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    alert(data);")]),s(`
`),n("span",{class:"line"},[n("span",null,"                },//响应成功后的回调函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"                error:function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'                    alert("出错啦...")')]),s(`
`),n("span",{class:"line"},[n("span",null,"                },//表示如果请求响应出现错误，会执行的回调函数")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'                dataType:"text"//设置接受到的响应数据的格式')]),s(`
`),n("span",{class:"line"},[n("span",null,"            });")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. $.get()：发送get请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 语法：$.get(url, [data], [callback], [type])")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 参数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* url：请求路径")]),s(`
`),n("span",{class:"line"},[n("span",null,"* data：请求参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* callback：回调函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* type：响应结果的类型")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. $.post()：发送post请求")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 语法：$.post(url, [data], [callback], [type])")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 参数：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* url：请求路径")]),s(`
`),n("span",{class:"line"},[n("span",null,"* data：请求参数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* callback：回调函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* type：响应结果的类型")])])])])],-1)])])}const h=l(t,[["render",c]]);export{m as __pageData,h as default};
