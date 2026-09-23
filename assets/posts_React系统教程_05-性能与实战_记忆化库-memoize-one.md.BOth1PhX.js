import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"记忆化库-memoize-one","description":"根据 memoize one 名字中的 one 可以知道，这个库的每个实例都缓存了一个结果，下一次不同的结果将覆盖上一次的。虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。 使用 npm 安装： $ npm install memoize one ，先看一下官方例子：。","frontmatter":{"title":"记忆化库-memoize-one","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","性能与实战"],"description":"根据 memoize one 名字中的 one 可以知道，这个库的每个实例都缓存了一个结果，下一次不同的结果将覆盖上一次的。虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。 使用 npm 安装： $ npm install memoize one ，先看一下官方例子：。","sidebarWeight":26,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/应用/记忆化库-memoize-one.md"},"headers":[],"relativePath":"posts/React系统教程/05-性能与实战/记忆化库-memoize-one.md","filePath":"posts/React系统教程/05-性能与实战/记忆化库-memoize-one.md"}'),i={name:"posts/React系统教程/05-性能与实战/记忆化库-memoize-one.md"};function t(u,s,c,o,d,r){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"记忆化库-memoize-one",tabindex:"-1"},[l("记忆化库-memoize-one "),n("a",{class:"header-anchor",href:"#记忆化库-memoize-one","aria-label":'Permalink to "记忆化库-memoize-one"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“记忆化库-memoize-one”的核心思路，并能把它用于实际开发或面试表达。 ==根据====memoize-one====名字中的====one====可以知道，这个库的每个实例都缓存了一个结果，下一次不同的结果将覆盖上一次的。虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。== ==使用====npm====安装：====$ npm install memoize-one====，先看一下官方例子：==")]),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,"```"),n("td")]),n("tr",null,[n("td",null,"==1=="),n("td")]),n("tr",null,[n("td",null,"==2=="),n("td")]),n("tr",null,[n("td",null,"==3=="),n("td")]),n("tr",null,[n("td",null,"==4=="),n("td")]),n("tr",null,[n("td",null,"==5=="),n("td")]),n("tr",null,[n("td",null,"==6=="),n("td")]),n("tr",null,[n("td",null,"==7=="),n("td")]),n("tr",null,[n("td",null,"==8=="),n("td")]),n("tr",null,[n("td",null,"==9=="),n("td")]),n("tr",null,[n("td",null,"==10=="),n("td")]),n("tr",null,[n("td",null,"==11=="),n("td")]),n("tr",null,[n("td",null,"==12=="),n("td")]),n("tr",null,[n("td",null,"==13=="),n("td")]),n("tr",null,[n("td",null,"==14=="),n("td")]),n("tr",null,[n("td",null,"==15=="),n("td")]),n("tr",null,[n("td",null,"==16=="),n("td")]),n("tr",null,[n("td",null,"==17=="),n("td")]),n("tr",null,[n("td",null,"==18=="),n("td")]),n("tr",null,[n("td",null,"==19=="),n("td")]),n("tr",null,[n("td",null,"==20=="),n("td")])])]),n("div",{class:"language-text vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"text"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==import== ==memoizeOne== ==from== =='memoize-one'====;==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==const== ==add === ==(====a, b====) =>== ==a + b;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==memoizedAdd = memoizeOne(add);==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==memoizedAdd(====1====,== ==2====);== ==// 3==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==memoizedAdd(====1====,== ==2====);== ==// 3==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// Add== ==函数并没有执行====:== ==前一次执行的结果被返回==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==memoizedAdd(====2====,== ==3====);== ==// 5==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// Add== ==函数再次被调用以获得新的结果==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==memoizedAdd(====2====,== ==3====);== ==// 5==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// Add== ==函数并没有执行====:== ==前一次执行的结果被返回==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==memoizedAdd(====1====,== ==2====);== ==// 3==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==// Add== ==函数再次被调用以获得新的结果==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//== ==虽然之前调用过==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//== ==但是不是上一次调用的，所以结果丢失了==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==memoizeOne(resultFn, isEqual)====接收一个结果函数和一个对比函数，对比函数为空则默认使用===========来进行入参的比较。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==简单来讲就是，====memoizeOne()====在原来====resultFn()====函数外面包了一层，返回一个函数，然后每次调用的时候看新入参====newArgs====是否和上一次的入参====lastArgs====一致，参数不变，则直接返回缓存的结果，否则重新执行====resultFn(newArgs)====，缓存新结果。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==简单改造一下上面的例子：==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==1==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==2==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==3==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==4==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==5==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==6==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==7==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==8==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==9==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==10==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==11==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==12==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==13==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==14==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==15==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==16==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==17==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==18==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==19==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==20==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==21==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==22==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==import== ==React, { Component }== ==from== =='react'====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==import== ==memoizeOne== ==from== =='memoize-one'====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==class== ==TableList== ==extends== ==Component== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,'==state = { filterText:== ==""== ==};==')]),l(`
`),n("span",{class:"line"},[n("span",null,"==handleChange === ==event== ===>== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==this====.setState({ filterText: event.target.value });==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==};==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==filter = memoize(==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==(list, filterText) => list.filter(====item== ===>== ==item.text.includes(filterText))==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==);==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==render() {==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== =={ list, title } === ==this====.props;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//====当====list====和====filterName====不变时，====filteredList====返回值不变==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==filteredList === ==this====.filter(list,== ==this====.state.filterText);==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==return== ==(==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<Fragment>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<input onChange={====this====.handleChange} value={====this====.state.filterText} />==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<ul>{filteredList.map(====item== ===>== ==<li key={item.id}>{item.text}<====/li>)}</u====l>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==<====/Fragment>==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==)==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==这样就简单的实现了一个记忆优化。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**源码解读**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==memoize-one====记忆库巧妙的使用了====闭包====来实现，一般我是不看源码的，但是这个库的源码只有不到====40====行的代码，简单易懂，这里就简单看一下：==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==1==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==2==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==3==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==4==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==5==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==6==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==7==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==8==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==9==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==10==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==11==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==12==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==13==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==14==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==15==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==16==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==17==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==18==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==19==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==20==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==21==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==22==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==23==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==24==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==25==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==26==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==27==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==28==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==29==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==30==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==31==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==32==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==33==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==34==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==35==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==36==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==37==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==38==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==39==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==40==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==41==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==42==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==43==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//isEqual====比较函数，用来判断参数是否一致，默认使用全等来判断==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==var== ==simpleIsEqual === ==function== ==simpleIsEqual====(====a, b====)== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==return== ==a === b;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==};==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==function== ==index== ==(====resultFn, isEqual====)== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//====不传====isEqual====，使用默认的内置函数==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(isEqual ===== ==void== ==0====) {==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==isEqual = simpleIsEqual;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==var== ==lastThis;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==var== ==lastArgs = [];==  ==//====上一次的入参==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==var== ==lastResult;==     ==//====缓存的结果==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==var== ==calledOnce === ==false====;==  ==//====是否调用过，区分第一次==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==//====判断两次入参是否相等，使用了====every====方法，这个是====every====方法的函数==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==var== ==isNewArgEqualToLast === ==function== ==isNewArgEqualToLast====(====newArg, index====)== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==return== ==isEqual(newArg, lastArgs[index]);==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==};==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==var== ==result === ==function== ==result====()== =={==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==//====将入参====arguments====按顺序一个个存入====newArgs====内==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==for== ==(====var== ==_len === ==arguments====.length, newArgs === ==new== ==Array====(_len), _key === ==0====; _key < _len; _key++) {==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==newArgs[_key] === ==arguments====[_key];==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==//====入参不变，直接返回缓存的结果====lastResult==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==if== ==(calledOnce && lastThis ===== ==this== ==&& newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==return== ==lastResult;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==lastResult = resultFn.apply(====this====, newArgs);==  ==//apply====到====resultFn,====传入参数====newArgs====，缓存结果==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==calledOnce === ==true====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==lastThis === ==this====;==  ==//this====？==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==lastArgs = newArgs;==  ==//====新入参替换缓存的参数==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==return== ==lastResult;==   ==//====返回新计算的结果==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==};==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==return== ==result;==   ==//====返回一个函数，闭包，不被====GC==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==}==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==export default== ==index;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"==源码还是比较容易看懂的。==")]),l(`
`),n("span",{class:"line"},[n("span",null,"**isEqual****函数**")]),l(`
`),n("span",{class:"line"},[n("span",null,"==因为对相等的理解，不同场景不一样，而且参数有时候是复杂的对象，所以我们不能仅仅通过比较操作符== ====== ==或者== ======= ==来判断。====memoize-one== ==允许用户自定义传入判断是否相等的函数，比如我们可以使用== ==lodash== ==的== ==isEqual== ==来判断两次参数是否相等。==")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"|   |   |")]),l(`
`),n("span",{class:"line"},[n("span",null,"|---|---|")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==1==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==2==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==3==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==4==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==5==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==6==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==7==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==8==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==9==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==10==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==11==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==12==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==13==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==14==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==15==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==16==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==17==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|```")]),l(`
`),n("span",{class:"line"},[n("span",null,"==import== ==memoizeOne== ==from== =='memoize-one'====;==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==import== ==deepEqual== ==from== =='lodash/isEqual'====;==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==const== ==identity === ==x== ===>== ==x;==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==const== ==defaultMemoization = memoizeOne(identity);==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==customMemoization = memoizeOne(identity, deepEqual);==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==const== ==result1 = defaultMemoization({foo:== =='bar'====});==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==result2 = defaultMemoization({foo:== =='bar'====});==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==result1 === result2== ==// false -== ==索引不同==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==const== ==result3 = customMemoization({foo:== =='bar'====});==")]),l(`
`),n("span",{class:"line"},[n("span",null,"==const== ==result4 = customMemoization({foo:== =='bar'====});==")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"==result3 === result4== ==// true -== ==参数通过== ==lodash== ==的== ==isEqual== ==判断是相等的==")]),l(`
`),n("span",{class:"line"},[n("span",null,"```text")]),l(`
`),n("span",{class:"line"},[n("span",null,"|")]),l(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")])])])]),n("p",null,[n("a",{href:"https://liyang0207.github.io/2018/10/11/%E3%80%8A%E8%AE%B0%E5%BF%86%E5%8C%96%E6%8A%80%E6%9C%AFmemoize-one%E3%80%8B/",target:"_blank",rel:"noreferrer"},"https://liyang0207.github.io/2018/10/11/《记忆化技术memoize-one》/")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")])])])])],-1)])])}const g=a(i,[["render",t]]);export{m as __pageData,g as default};
