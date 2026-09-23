import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"正则应用","description":"围绕“正则应用”整理的概念、示例与实践笔记。","frontmatter":{"title":"正则应用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“正则应用”整理的概念、示例与实践笔记。","sidebarWeight":112,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-正则/RegExp类型/正则应用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/RegExp类型/正则应用.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/RegExp类型/正则应用.md"}'),t={name:"posts/JavaScript系统教程/03-对象、数组与函数/RegExp类型/正则应用.md"};function c(i,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"正则应用",tabindex:"-1"},[s("正则应用 "),n("a",{class:"header-anchor",href:"#正则应用","aria-label":'Permalink to "正则应用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“正则应用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』?")]),s(`
`),n("span",{class:"line"},[n("span",null,"function format(number) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    return number && number.replace(/(?!^)(?=(\\d{3})+\\.)/g, ",")')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"（1）匹配 16 进制颜色值")]),s(`
`),n("span",{class:"line"},[n("span",null,"var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;")]),s(`
`),n("span",{class:"line"},[n("span",null,"（2）匹配日期，如 yyyy - mm - dd 格式")]),s(`
`),n("span",{class:"line"},[n("span",null,"var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"（3）匹配 qq 号")]),s(`
`),n("span",{class:"line"},[n("span",null,"var regex = /^[1-9][0-9]{4,10}$/g;")]),s(`
`),n("span",{class:"line"},[n("span",null,"（4）手机号码正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var regex = /^1[34578]\\d{9}$/g;")]),s(`
`),n("span",{class:"line"},[n("span",null,"（5）用户名正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var regex = /^[a-zA-Z\\$][a-zA-Z0-9_\\$]{4,16}$/;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1 用户名正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//用户名正则，4到16位（字母，数字，下划线，减号）")]),s(`
`),n("span",{class:"line"},[n("span",null,"var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(uPattern.test("caibaojian"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"2 密码强度正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符")]),s(`
`),n("span",{class:"line"},[n("span",null,"var pPattern = /^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log("==" + pPattern.test("caibaojian#"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"3 整数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//正整数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var posPattern = /^\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//负整数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var negPattern = /^-\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//整数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var intPattern = /^-?\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(posPattern.test("42"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(negPattern.test("-42"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(intPattern.test("-42"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"4 数字正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以是整数也可以是浮点数")]),s(`
`),n("span",{class:"line"},[n("span",null,"//正数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var posPattern = /^\\d*\\.?\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//负数正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var negPattern = /^-\\d*\\.?\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//数字正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var numPattern = /^-?\\d*\\.?\\d+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(posPattern.test("42.2"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(negPattern.test("-42.2"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(numPattern.test("-42.2"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"5 Email正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//Email正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ePattern = /^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(ePattern.test("99154507@qq.com"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"6 手机号码正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//手机号正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var mPattern = /^1[34578]\\d{9}$/; //http://caibaojian.com/regexp-example.html")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(mPattern.test("15507621888"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"7 身份证号正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//身份证号（18位）正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var cP = /^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(cP.test("11010519880605371X"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"8 URL正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//URL正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var urlP = /^((https?|ftp|file):\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(urlP.test("http://caibaojian.com"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"9 IPv4地址正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//ipv4地址正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(ipP.test("115.28.47.26"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"10 十六进制颜色正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//RGB Hex颜色正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var cPattern = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(cPattern.test("#b8b8b8"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"11 日期正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//日期正则，简单判定,未做月份及日期的判定")]),s(`
`),n("span",{class:"line"},[n("span",null,"var dP1 = /^\\d{4}(\\-)\\d{1,2}\\1\\d{1,2}$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(dP1.test("2017-05-11"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(dP1.test("2017-15-11"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//日期正则，复杂判定")]),s(`
`),n("span",{class:"line"},[n("span",null,"var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(dP2.test("2017-02-11"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 false")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(dP2.test("2017-15-11"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 false")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(dP2.test("2017-02-29"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"12 QQ号码正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//QQ号正则，5至11位")]),s(`
`),n("span",{class:"line"},[n("span",null,"var qqPattern = /^[1-9][0-9]{4,10}$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(qqPattern.test("65974040"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"13 微信号正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线")]),s(`
`),n("span",{class:"line"},[n("span",null,"var wxPattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(wxPattern.test("caibaojian_com"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"14 车牌号正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//车牌号正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var cPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(cPattern.test("粤B39006"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"15 包含中文正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"//包含中文正则")]),s(`
`),n("span",{class:"line"},[n("span",null,"var cnPattern = /[\\u4E00-\\u9FA5]/;")]),s(`
`),n("span",{class:"line"},[n("span",null,"//输出 true")]),s(`
`),n("span",{class:"line"},[n("span",null,'console.log(cnPattern.test("蔡宝坚"));')])])])])],-1)])])}const P=a(t,[["render",c]]);export{v as __pageData,P as default};
