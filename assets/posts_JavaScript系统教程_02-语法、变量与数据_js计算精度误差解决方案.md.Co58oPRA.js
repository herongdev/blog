import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"js计算精度误差解决方案","description":"简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。 显然这种规则不符合我们平常在数据中处理的方式。为了解决这样的问题，可以自定义去使用Math.round方法进行自定义式 的实现指定保留多少位数据进行处理。","frontmatter":{"title":"js计算精度误差解决方案","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。 显然这种规则不符合我们平常在数据中处理的方式。为了解决这样的问题，可以自定义去使用Math.round方法进行自定义式 的实现指定保留多少位数据进行处理。","sidebarWeight":47,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/基本数据类型-数字/js计算精度误差解决方案.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/js计算精度误差解决方案.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/js计算精度误差解决方案.md"}'),i={name:"posts/JavaScript系统教程/02-语法、变量与数据/js计算精度误差解决方案.md"};function p(r,a,c,u,o,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"js计算精度误差解决方案",tabindex:"-1"},[s("js计算精度误差解决方案 "),n("a",{class:"header-anchor",href:"#js计算精度误差解决方案","aria-label":'Permalink to "js计算精度误差解决方案"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“js计算精度误差解决方案”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"先乘以小数点位数，计算后再除以位数")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"转字符串")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'//加法function accAdd(arg1,arg2){    var r1,r2,m;    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    m=Math.pow(10,Math.max(r1,r2))    return (Math.round(arg1*m)+Math.round(arg2*m))/m}//减法function accSub(arg1,arg2){    var r1,r2,m,n;    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    m=Math.pow(10,Math.max(r1,r2));    n=(r1>=r2)?r1:r2;    return ((arg1*m-arg2*m)/m).toFixed(n);}//乘法function accMul(arg1,arg2){    var m=0,s1=arg1.toString(),s2=arg2.toString();    try{m+=s1.split(".")[1].length}catch(e){}    try{m+=s2.split(".")[1].length}catch(e){}    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)}//除法function accDiv(arg1,arg2){    var t1=0,t2=0,r1,r2;    try{t1=arg1.toString().split(".")[1].length}catch(e){}    try{t2=arg2.toString().split(".")[1].length}catch(e){}    with(Math){        r1=Number(arg1.toString().replace(".",""))        r2=Number(arg2.toString().replace(".",""))        return accMul((r1/r2),pow(10,t2-t1));    }}')]),s(`
`),n("span",{class:"line"},[n("span",null,"**toFixed() xx.5****误差**")]),s(`
`),n("span",{class:"line"},[n("span",null,'//toFixed精度解决Number.prototype.toFixed = function(s) {    var changenum=(parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();    var index=changenum.indexOf(".");    if(index<0&&s>0){        changenum=changenum+".";        for(i=0;i<s;i++){            changenum=changenum+"0";        }')]),s(`
`),n("span",{class:"line"},[n("span",null,'}else {        index=changenum.length-index;        for(i=0;i<(s-index)+1;i++){            changenum=changenum+"0";        }}    return changenum;}')]),s(`
`),n("span",{class:"line"},[n("span",null,"toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。例如将数据Num保留2位小数，则表示为：toFixed(Num)；但是其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则，银行家舍入：所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法。具体规则如下：")])])])]),n("p",null,"简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。"),n("p",null,"显然这种规则不符合我们平常在数据中处理的方式。为了解决这样的问题，可以自定义去使用Math.round方法进行自定义式 的实现指定保留多少位数据进行处理。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"定义和用法")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"2 、tofixed方法重写解决精度丢失")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Number.prototype.toFixed = function (n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // n为期望保留的位数，超过限定，报错！")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (n > 20 || n < 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw new RangeError('toFixed() digits argument must be between 0 and 20');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 获取数字")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const number = this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果是NaN,或者数字过大，直接返回'NaN'或者类似'1e+21'的科学计数法字符串")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isNaN(number) || number >= Math.pow(10, 21)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return number.toString();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 默认保留整数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof (n) == 'undefined' || n == 0) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (Math.round(number)).toString();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 先获取字符串")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let result = number.toString();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 获取小数部分")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const arr = result.split('.');")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 整数的情况，直接在后面加上对应个数的0即可")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (arr.length < 2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        result += '.';")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for (let i = 0; i < n; i += 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            result += '0';")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 整数和小数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const integer = arr[0];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const decimal = arr[1];")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果已经符合要求位数，直接返回")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (decimal.length == n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果小于指定的位数，补上")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (decimal.length < n) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for (let i = 0; i < n - decimal.length; i += 1) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            result += '0';")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果到这里还没结束，说明原有小数位多于指定的n位")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 先直接截取对应的位数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    result = integer + '.' + decimal.substr(0, n);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 获取后面的一位")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let last = decimal.substr(n, 1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (/^\\d(9){5,}[89]$/.test(decimal.substr(n))) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        last += last + 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 大于等于5统一进一位")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (parseInt(last, 10) >= 5) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 转换倍数，转换为整数后，再进行四舍五入")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const x = Math.pow(10, n);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 进一位后，转化还原为小数")]),s(`
`),n("span",{class:"line"},[n("span",null,"        result = (Math.round((parseFloat(result) * x)) + 1) / x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 再确认一遍")]),s(`
`),n("span",{class:"line"},[n("span",null,"        result = result.toFixed(n);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return result;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])])],-1)])])}const m=l(i,[["render",p]]);export{h as __pageData,m as default};
