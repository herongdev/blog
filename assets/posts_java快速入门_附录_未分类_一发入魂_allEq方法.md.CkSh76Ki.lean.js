import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const w=JSON.parse('{"title":"allEq方法","description":"","frontmatter":{"title":"allEq方法","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","附录","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/附录/未分类/一发入魂/allEq方法.md","filePath":"posts/java快速入门/附录/未分类/一发入魂/allEq方法.md"}'),i={name:"posts/java快速入门/附录/未分类/一发入魂/allEq方法.md"};function r(c,a,u,t,o,m){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test3() {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," QueryWrapper\\<User\\> wrapper = new QueryWrapper\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," Map\\<String, Object\\> param = new HashMap\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("age", 40);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("name", "')]),s(`
`),n("span",{class:"line"},[n("span",null,"黄飞飞")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'");')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," wrapper.allEq(param);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," List\\<User\\> users = userMapper.selectList(wrapper);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," users.forEach(System.out::println);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"当`allEq`方法传入的`Map`中有`value`为`null`的元素时，默认会设置为")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"is null")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test3() {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," QueryWrapper\\<User\\> wrapper = new QueryWrapper\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," Map\\<String, Object\\> param = new HashMap\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("age", 40);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'param.put("name", null);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," wrapper.allEq(param);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," List\\<User\\> users = userMapper.selectList(wrapper);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," users.forEach(System.out::println);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"若想忽略`map`中`value`为`null`的元素，可以在调用`allEq`时，设置参数`boolean null2IsNull`为")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"false")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test3() {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," QueryWrapper\\<User\\> wrapper = new QueryWrapper\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," Map\\<String, Object\\> param = new HashMap\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("age", 40);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("name", null);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"wrapper.allEq(param, false);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," List\\<User\\> users = userMapper.selectList(wrapper);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," users.forEach(System.out::println);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"若想要在执行`allEq`时，过滤掉`Map`中的某些元素，可以调用`allEq`的重载方法")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"allEq(BiPredicate\\<R, V\\> filter, Map\\<R, V\\> params)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Test")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void test3() {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," QueryWrapper\\<User\\> wrapper = new QueryWrapper\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," Map\\<String, Object\\> param = new HashMap\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("age", 40);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,' param.put("name", null);')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," wrapper.allEq(param, false);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," List\\<User\\> users = userMapper.selectList(wrapper);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," users.forEach(System.out::println);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const E=l(i,[["render",r]]);export{w as __pageData,E as default};
