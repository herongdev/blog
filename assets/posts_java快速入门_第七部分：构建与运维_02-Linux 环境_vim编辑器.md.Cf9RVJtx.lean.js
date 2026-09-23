import{_ as l,o as p,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"vim编辑器","description":"","frontmatter":{"title":"vim编辑器","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/vim编辑器.md","filePath":"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/vim编辑器.md"}'),e={name:"posts/java快速入门/第七部分：构建与运维/02-Linux 环境/vim编辑器.md"};function c(u,a,t,m,v,o){return p(),i("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"编辑器之神——vim编辑器")]),s(`
`),n("span",{class:"line"},[n("span",null,"**一、****vi****介绍**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vi编辑器是所有Unix及Linux系统下标准的编辑器，类似于windows系统下的notepad（记事本）编辑器，由于在Unix及Linux系统的任何版本，Vi编辑器是完全相同的，因此可以在其他任何介绍vi的地方都能进一步了解它，Vi也是Linux中最基本的文本编辑器，学会它后，我们将在Linux的世界里畅行无阻，尤其是在终端中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"关于vim：")]),s(`
`),n("span",{class:"line"},[n("span",null,"vi和vim都是Linux中的编辑器，不同的是，vim比较高级，可以视为vi的升级版本。vi使用于文本编辑，但是vim更适用于coding（写代码的）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vim重点是光标的移动，模式切换，删除，查找，替换，复制，粘贴，撤销命令的使用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**二、****vim****三种模式（重点）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vim中存在三种模式（大众的认知）：命令模式、编辑模式（输入模式）、末行模式（尾行模式）。如图：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"命令模式：在该模式下是不能对文件直接编辑，可以输入快捷键进行一些操作（删除行，复制行，移动光标，粘贴等等）【打开文件之后默认进入的模式】；")]),s(`
`),n("span",{class:"line"},[n("span",null,"编辑模式：在该模式下可以对文件的内容进行编辑；")]),s(`
`),n("span",{class:"line"},[n("span",null,"末行模式：可以在末行输入命令来对文件进行操作（搜索、替换、保存、退出、撤销、高亮等等）；")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vim的打开文件的方式（4种，要求掌握的就前三种）：")]),s(`
`),n("span",{class:"line"},[n("span",null,"#vim 文件路径 作用：打开指定的文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"#vim +数字 文件的路径 作用：打开指定的文件，并且将光标移动到指定行")]),s(`
`),n("span",{class:"line"},[n("span",null,"#vim +/关键词 文件的路径 作用：打开指定的文件，并且高亮显示关键词")]),s(`
`),n("span",{class:"line"},[n("span",null,"#vim 文件路径1 文件路径2 文件路径3 作用：同时打开多个文件")]),s(`
`),n("span",{class:"line"},[n("span",null,"**vim****的常用操作：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**光标移动操作**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**复制、删除、粘贴等操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**区块复制操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**搜索与更改操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**进入编辑模式的操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**多文件编辑操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**多窗口同时编辑多个文件操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**离开****vim****编辑器的操作**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**vim****的环境设置参数**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**三、模式间的切换（重点）**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`**五、编辑模式**`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**六、实用功能**")]),s(`
`),n("span",{class:"line"},[n("span",null,"vim中计算器的使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"当在编辑文件的时候突然需要使用计算器去计算一些公式，则此时需要用计算器，但是需要退出，vim自身集成了一个简易的计算器。")]),s(`
`),n("span",{class:"line"},[n("span",null,"a. 进入编辑模式")]),s(`
`),n("span",{class:"line"},[n("span",null,"b. 按下按键“ctrl + R”，然后输入“=”，此时光标会变到最后一行")]),s(`
`),n("span",{class:"line"},[n("span",null,"c. 输入需要计算的内容，按下回车")]),s(`
`),n("span",{class:"line"},[n("span",null,"**七、扩展（****3****）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**1****、****vim****的配置（重点）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vim是一款编辑器，编辑器也是有配置文件的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Vim配置有三种情况：")]),s(`
`),n("span",{class:"line"},[n("span",null,"a. 在文件打开的时候在末行模式下输入的配置（临时的）")]),s(`
`),n("span",{class:"line"},[n("span",null,"b. 个人配置文件（~/.vimrc，如果没有可以自行新建）")]),s(`
`),n("span",{class:"line"},[n("span",null,"c. 全局配置文件（vim自带，/etc/vimrc）")]),s(`
`),n("span",{class:"line"},[n("span",null,"①新建好个人配置文件之后进入编辑")]),s(`
`),n("span",{class:"line"},[n("span",null,"②在配置文件中进行配置")]),s(`
`),n("span",{class:"line"},[n("span",null,"比如显示行号：set nu")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置好之后vim打开文件就会永远显示行号")]),s(`
`),n("span",{class:"line"},[n("span",null,"问题：如果某个配置项，在个人配置文件与全局配置文件产生冲突的时候应该以谁为准？")]),s(`
`),n("span",{class:"line"},[n("span",null,"测试步骤：在两个配置文件中针对同一个配置项设置不同的值")]),s(`
`),n("span",{class:"line"},[n("span",null,"①先在全局的配置中设置不显示行号，在个人的配置文件中设置显示行号，观察结果")]),s(`
`),n("span",{class:"line"},[n("span",null,"最后显示行号：说明以个人为准")]),s(`
`),n("span",{class:"line"},[n("span",null,"②先在全局中配置显示行号，在个人中设置不显示行号，观察结果")]),s(`
`),n("span",{class:"line"},[n("span",null,"最后的显示是不显示行号，说明以个人为准")]),s(`
`),n("span",{class:"line"},[n("span",null,"结论：如果针对同一个配置项，个人配置文件中存在，则以个人配置文件为准，如果个人配置文件中不存在这一项，则以全局配置文件为准。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**2****、异常退出**")]),s(`
`),n("span",{class:"line"},[n("span",null,"什么是异常退出：在编辑文件之后并没有正常的去wq（保存退出），而是遇到突然关闭终端或者断电的情况，则会显示下面的效果，这个情况称之为异常退出：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 解决办法：将交换文件（在编程过程中产生的临时文件）删除掉即可")]),s(`
`),n("span",{class:"line"},[n("span",null,"- #rm -f .passwd.swp")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://blog.51cto.com/14157628/2364885\\>")])])])])],-1)])])}const x=l(e,[["render",c]]);export{d as __pageData,x as default};
