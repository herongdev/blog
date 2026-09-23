import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实例方法","description":"实例方法 可以用then方法分别指定resolved状态和rejected状态的回调函数。 then方法可以接受两个回调函数作为参数。 第一个回调函数是Promise对象的状态变为resolved时调用； 第二个回调函数是Promise对象的状态变为rejected时调用。 其中。","frontmatter":{"title":"实例方法","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"实例方法 可以用then方法分别指定resolved状态和rejected状态的回调函数。 then方法可以接受两个回调函数作为参数。 第一个回调函数是Promise对象的状态变为resolved时调用； 第二个回调函数是Promise对象的状态变为rejected时调用。 其中。","sidebarWeight":42,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Promise使用/实例方法.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Promise使用/实例方法.md","filePath":"posts/JavaScript系统教程/05-异步编程/Promise使用/实例方法.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/Promise使用/实例方法.md"};function p(o,e,c,r,u,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"实例方法",tabindex:"-1"},[s("实例方法 "),n("a",{class:"header-anchor",href:"#实例方法","aria-label":'Permalink to "实例方法"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“实例方法”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"实例方法"),s(" 可以用then方法分别指定resolved状态和rejected状态的回调函数。 then方法可以接受两个回调函数作为参数。 第一个回调函数是Promise对象的状态变为resolved时调用； 第二个回调函数是Promise对象的状态变为rejected时调用。 其中，第二个函数是可选的。这两个函数都接受Promise对象传出的值作为参数。 promise.then( function (value) { // success }, function (error) { // failure } ); //")])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是一个`Promise`对象的简单例子。")])])])]),n("p",null,"function timeout(ms) { return new Promise((resolve, reject) => { setTimeout(resolve, ms, 'done'); }); } timeout(100).then((value) => { console.log(value); });"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**实例**")]),s(`
`),n("span",{class:"line"},[n("span",null,"异步加载图片")]),s(`
`),n("span",{class:"line"},[n("span",null,"function loadImageAsync(url) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return new Promise(function (resolve, reject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const image = new Image();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        image.onload = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            resolve(image);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        image.onerror = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            reject(new Error('Could not load image at ' + url));")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        image.src = url;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Ajax**")]),s(`
`),n("span",{class:"line"},[n("span",null,"const getJSON = function (url) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const promise = new Promise(function (resolve, reject) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const handler = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (this.readyState !== 4) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (this.status === 200) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                resolve(this.response);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                reject(new Error(this.statusText));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        };")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const client = new XMLHttpRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,'        client.open("GET", url);')]),s(`
`),n("span",{class:"line"},[n("span",null,"        client.onreadystatechange = handler;")]),s(`
`),n("span",{class:"line"},[n("span",null,'        client.responseType = "json";')]),s(`
`),n("span",{class:"line"},[n("span",null,'        client.setRequestHeader("Accept", "application/json");')]),s(`
`),n("span",{class:"line"},[n("span",null,"        client.send();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return promise;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,'getJSON("/posts.json").then(function (json) {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log('Contents: ' + json);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, function (error) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.error('出错了', error);")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"返回值：then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,'getJSON("/posts.json").then(function (json) {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return json.post;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}).then(function (post) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**链式写法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。")]),s(`
`),n("span",{class:"line"},[n("span",null,'getJSON("/post/1.json").then(function (post) {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return getJSON(post.commentURL);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}).then(function (comments) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("resolved: ", comments);')]),s(`
`),n("span",{class:"line"},[n("span",null,"}, function (err) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("rejected: ", err);')]),s(`
`),n("span",{class:"line"},[n("span",null,"});")])])])]),n("p",null,'上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。 如果采用箭头函数，上面的代码可以写得更简洁。 getJSON("/post/1.json").then( post => getJSON(post.commentURL) ).then( comments => console.log("resolved: ", comments), err => console.log("rejected: ", err) );')],-1)])])}const g=l(i,[["render",p]]);export{m as __pageData,g as default};
