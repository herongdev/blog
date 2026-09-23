import{_ as e,o as l,c as t,j as s,a}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"文件和路径","description":"","frontmatter":{"title":"文件和路径","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/06-输入和输出/文件和路径.md","filePath":"posts/java快速入门/第三部分：核心 API/06-输入和输出/文件和路径.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/06-输入和输出/文件和路径.md"};function p(c,n,o,u,r,h){return l(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"通常使用字符串来指定流操作涉及的文件。但如果要复制文件、重命名文件或处理其他任务，可以使用java.nio.file包中的Path对象。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"Path表示文件或文件夹引用，改进了java.io包中的File类。下面的语句获取与指定字符串对应的路径：")]),a(`
`),s("span",{class:"line"},[s("span",null,'Path source = FileSystems.getDefault().getPath("essay.txt");')]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"这个过程包括两个步骤。首先，调用FileSystems类的一个类方法。方法getDefault()返回一个FileSystem对象，这个对象指出了当前计算机存储文件的方式。FileSystems和FileSystem类都位于java.nio.file包中。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"有了FileSystem对象后，便可调用其getPath(String)方法，这个方法返回一个与指定文件或文件夹对应的Path对象。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"要根据Path对象创建File对象，可调用Path类的方法toFile()，如下语句：")]),a(`
`),s("span",{class:"line"},[s("span",null,"File sourceFile = source.toFile();")]),a(`
`),s("span",{class:"line"},[s("span",null,"要根据File对象创建Path对象，可调用File类的toPath（）方法。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"处理文件时，可调用java.nio.file包中Files类的多个类方法。")]),a(`
`),s("span",{class:"line"},[s("span",null,"类方法move(Path,Path)将前一个路径参数指定的文件重命名为第二个路径参数指定的文件。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"类方法delete(path)删除路径参数指定的文件。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"与其他文件处理操作一样，使用这些方法时必须小心，以避免误删文件和文件夹或损坏数据。没有用于恢复被删除文件或文件夹的方法。")]),a(`
`),s("span",{class:"line"},[s("span")]),a(`
`),s("span",{class:"line"},[s("span",null,"如果程序没有执行指定文件操作的权限，上述方法将引发SecurityException异常；如果指定的路径不存在，将引发NoSuchFileException异常；如果出现其他I/O错误，将引发IOException异常；试图删除不为空的文件夹时，将引发NoSuchFileException。因此，必须使用try-catch块或在方法声明中使用throws子句来处理这些异常。")])])])])],-1)])])}const v=e(i,[["render",p]]);export{m as __pageData,v as default};
