import{_ as l,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const j=JSON.parse('{"title":"JSON","description":"","frontmatter":{"title":"JSON","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Web基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/JSON.md","filePath":"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/JSON.md"}'),i={name:"posts/java快速入门/第四部分：Web 基础/05-JSON 与 AJAX/JSON.md"};function c(t,a,u,o,r,J){return p(),e("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"1. 概念： JavaScript Object Notation——JavaScript对象表示法")]),s(`
`),n("span",{class:"line"},[n("span",null,"Person p = new Person();")]),s(`
`),n("span",{class:"line"},[n("span",null,'p.setName("张三");')]),s(`
`),n("span",{class:"line"},[n("span",null,"p.setAge(23);")]),s(`
`),n("span",{class:"line"},[n("span",null,'p.setGender("男");')]),s(`
`),n("span",{class:"line"},[n("span",null,'var p = \\{"name":"张三","age":23,"gender":"男"\\};')]),s(`
`),n("span",{class:"line"},[n("span",null,"* json现在多用于存储和交换文本信息的语法")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 进行数据的传输")]),s(`
`),n("span",{class:"line"},[n("span",null,"* JSON 比 XML 更小、更快，更易解析。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**语法：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 基本规则")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 数据在名称/值对中：json数据是由键值对构成的")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 键用引号(单双都行)引起来，也可以不使用引号")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 值得取值类型：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 数字（整数或浮点数）")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 字符串（在双引号中）")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 逻辑值（true 或 false）")]),s(`
`),n("span",{class:"line"},[n("span",null,'4. 数组（在方括号中）	\\{"persons":[\\{\\},\\{\\}]\\}')]),s(`
`),n("span",{class:"line"},[n("span",null,'5. 对象（在花括号中） \\{"address":\\{"province"："陕西"....\\}\\}')]),s(`
`),n("span",{class:"line"},[n("span",null,"6. null")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 数据由逗号分隔：多个键值对由逗号分隔")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 花括号保存对象：使用\\{\\}定义json 格式")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 方括号保存数组：[]")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 获取数据:")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. json对象.键名")]),s(`
`),n("span",{class:"line"},[n("span",null,'2. json对象["键名"]')]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 数组对象[索引]")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 遍历")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. JSON数据和Java对象的相互转换")]),s(`
`),n("span",{class:"line"},[n("span",null,"* JSON解析器：")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 常见的解析器：Jsonlib，Gson，fastjson，jackson")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**JSON****转为****Java****对象**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 导入jackson的相关jar包")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 创建Jackson核心对象 ObjectMapper")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 调用ObjectMapper的相关方法进行转换")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. readValue(json字符串数据,Class)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Java****对象转换****JSON**")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用步骤：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 导入jackson的相关jar包")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 创建Jackson核心对象 ObjectMapper")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 调用ObjectMapper的相关方法进行转换，转换方法：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* writeValue(参数1，obj):")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"File：将obj对象转换为JSON字符串，并保存到指定的文件中")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Writer：将obj对象转换为JSON字符串，并将json数据填充到字符输出流中")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"OutputStream：将obj对象转换为JSON字符串，并将json数据填充到字节输出流中")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* writeValueAsString(obj):将对象转为json字符串")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"注解：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. @JsonIgnore：排除属性。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. @JsonFormat：属性值得格式化")]),s(`
`),n("span",{class:"line"},[n("span",null,'* @JsonFormat(pattern = "yyyy-MM-dd")')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- **复杂****java****对象转换**")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 1. List：数组")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`2. Map：对象格式一致`")])])])])],-1)])])}const O=l(i,[["render",c]]);export{j as __pageData,O as default};
