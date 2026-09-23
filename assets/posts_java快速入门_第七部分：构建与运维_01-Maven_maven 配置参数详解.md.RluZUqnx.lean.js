import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"maven 配置参数详解","description":"","frontmatter":{"title":"maven 配置参数详解","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","构建运维","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第七部分：构建与运维/01-Maven/maven 配置参数详解.md","filePath":"posts/java快速入门/第七部分：构建与运维/01-Maven/maven 配置参数详解.md"}'),i={name:"posts/java快速入门/第七部分：构建与运维/01-Maven/maven 配置参数详解.md"};function c(u,l,o,t,r,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'\\<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0￼          http://maven.apache.org/maven-v4_0_0.xsd "\\>')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"父项目的坐标。如果项目中没有规定某个元素的值，那么父项目中的对应值即为项目的默认值。坐标包括`group ID`，`artifact ID`和 `version`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被继承的父项目的构件标识符")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<artifactId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被继承的父项目的全球唯一标识符")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<groupId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被继承的父项目的版本")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<version /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"父项目的`pom.xml`文件的相对路径。相对路径允许你选择一个不同的路径。 默认值是`../pom.xml`。`Maven`首先在构建当前项目的地方寻找父项目的`pom`，其次在文件系统的这个位置（`relativePath`位置），然后在本地仓库，最后在远程仓库寻找父项目的`pom`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<relativePath /\\>￼    \\</parent\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"声明项目描述符遵循哪一个`POM`模型版本。模型本身的版本很少改变，虽然如此，但它仍然是必不可少的，这是为了当`Maven`引入了新的特性 或者其他模型变更的时候，确保稳定性。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<modelVersion\\>4.0.0\\</modelVersion\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的全球唯一标识符，通常使用全限定的包名区分该项目和其他项目。并且构建时生成的路径也是由此生成， 如`com.mycompany.app`生成的相对路径为：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"/com/mycompany/app --\\>￼    \\<groupId\\>asia.banseon\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"构件的标识符，它和`group ID`一起唯一标识一个构件。换句话说，你不能有两个不同的项目拥有同样的`artifact ID`和`groupID`；在某个特定的`group ID`下，`artifact ID`也必须是唯一的。构件是项目产生的或使用的一个东西，`Maven`为项目产生的构件包括：`JARs,`源码，二进制发布和`WARs`等。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"--\\>￼    \\<artifactId\\>banseon-maven2\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目产生的构件类型，例如`jar`、`war`、`ear`、`pom`。插件可以创建他们自己的构件类型`,`所以前面列的不是全部构件类型")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<packaging\\>jar\\</packaging\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目当前版本，格式为`:`主版本`.`次版本`.`增量版本`-`限定版本号")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<version\\>1.0-SNAPSHOT\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的名称`, Maven`产生的文档用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<name\\>banseon-maven\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目主页的`URL, Maven`产生的文档用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼    \\<url\\>http://www.baidu.com/banseon\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的详细描述`, Maven` 产生的文档用。 当这个元素能够用`HTML`格式描述时（例如，`CDATA`中的文本会被解析器忽略，就可以包含`HTML`标签），不鼓励使用纯文本描述。如果你需要修改产生的`web`站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼    \\<description\\>A maven project to study maven.\\</description\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述了这个项目构建环境中的前提条件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<prerequisites\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建该项目或使用该插件所需要的`Maven`的最低版本")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<maven /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</prerequisites\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的问题管理系统`(Bugzilla, Jira, Scarab,`或任何你喜欢的问题管理系统`)`的名称和`URL`，本例为")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- jira --\\>￼    \\<issueManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"问题管理系统（例如`jira`）的名字，")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<system\\>jira\\</system\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该项目使用的问题管理系统的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL --\\>￼        \\<url\\>http://jira.baidu.com/banseon\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</issueManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目持续集成信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<ciManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"持续集成系统的名字，例如")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- continuum --\\>￼        \\<system /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该项目使用的持续集成系统的`URL`（如果持续集成系统有`web`接口的话）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<url /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建完成时，需要通知的开发者`/`用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<notifiers\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置一种方式，当构建中断时，以该方式通知用户`/`开发者")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<notifier\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"传送通知的途径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<type /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发生错误时是否通知")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<sendOnError /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建失败时是否通知")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<sendOnFailure /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建成功时是否通知")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<sendOnSuccess /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发生警告时是否通知")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<sendOnWarning /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"不赞成使用。通知发送到哪里")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<address /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"扩展配置项")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</notifier\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</notifiers\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</ciManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目创建年份，`4`位数字。当产生版权信息时需要使用这个值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<inceptionYear /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目相关邮件列表信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<mailingLists\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<mailingList\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"邮件的名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<name\\>Demo\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发送邮件的地址或链接，如果是邮件地址， 创建文档时，`mailto:` 链接会被自动创建")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<post\\>banseon@126.com\\</post\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"订阅邮件的地址或链接，如果是邮件地址，创建文档时，`mailto:` 链接会被自动创建")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<subscribe\\>banseon@126.com\\</subscribe\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"取消订阅邮件的地址或链接，如果是邮件地址`,` 创建文档时，`mailto:` 链接会被自动创建")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<unsubscribe\\>banseon@126.com\\</unsubscribe\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以浏览邮件信息的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL --\\>￼            \\<archive\\>http:/hi.baidu.com/banseon/demo/dev/\\</archive\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</mailingList\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</mailingLists\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<developers\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"某个项目开发者的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<developer\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- SCM")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"里项目开发者的唯一标识符")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<id\\>HELLO WORLD\\</id\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者的全名")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<name\\>banseon\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"email --\\>￼            \\<email\\>banseon@126.com\\</email\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者的主页的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- URL --\\>￼            \\<url /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者在项目中扮演的角色，角色元素描述了各种角色")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<roles\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<role\\>Project Manager\\</role\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<role\\>Architect\\</role\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</roles\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者所属组织")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<organization\\>demo\\</organization\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者所属组织的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL --\\>￼            \\<organizationUrl\\>￼                http://hi.baidu.com/banseon￼            \\</organizationUrl\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者属性，如即时消息如何处理等")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<properties\\>￼                \\<dept\\>No\\</dept\\>￼            \\</properties\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目开发者所在时区， `-11`到`12`范围内的整数。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<timezone\\>-5\\</timezone\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</developer\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</developers\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的其他贡献者列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<contributors\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目的其他贡献者。参见`developers/developer`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<contributor\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<name /\\>￼            \\<email /\\>￼            \\<url /\\>￼            \\<organization /\\>￼            \\<organizationUrl /\\>￼            \\<roles /\\>￼            \\<timezone /\\>￼            \\<properties /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</contributor\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</contributors\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素描述了项目所有`License`列表。 应该只列出该项目的`license`列表，不要列出依赖项目的 `license`列表。如果列出多个`license`，用户可以选择它们中的一个而不是接受所有`license`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<licenses\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述了项目的`license`，用于生成项目的`web`站点的`license`页面，其他一些报表和`validation`也会用到该元素。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<license\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- license")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于法律上的名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<name\\>Apache 2\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"官方的`license`正文页面的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL --\\>￼            \\<url\\>http://www.baidu.com/banseon/LICENSE-2.0.txt\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目分发的主要方式：`repo`，可以从`Maven`库下载`manual`， 用户必须手动下载和安装依赖")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<distribution\\>repo\\</distribution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"关于`license`的补充信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<comments\\>A business-friendly OSS license\\</comments\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</license\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</licenses\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!-- SCM(Source Control Management)")]),s(`
`),n("span",{class:"line"},[n("span",null,"标签允许你配置你的代码库，供`Maven web`站点和其它插件使用。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<scm\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- SCM")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"的`URL,`该`URL`描述了版本库和如何连接到版本库。欲知详情，请看`SCMs`提供的`URL`格式和列表。该连接只读。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<connection\\>￼            scm:svn:http://svn.baidu.com/banseon/maven/banseon/banseon-maven2-trunk(dao-trunk)￼        \\</connection\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"给开发者使用的，类似`connection`元素。即该连接不仅仅只读")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<developerConnection\\>￼            scm:svn:http://svn.baidu.com/banseon/maven/banseon/dao-trunk￼        \\</developerConnection\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"当前代码的标签，在开发阶段默认为")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- HEAD --\\>￼        \\<tag /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"指向项目的可浏览`SCM`库（例如`ViewVC`或者`Fisheye`）的`URL`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<url\\>http://svn.baidu.com/banseon\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</scm\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述项目所属组织的各种属性。`Maven`产生的文档用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<organization\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"组织的全名")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<name\\>demo\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"组织主页的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"URL --\\>￼        \\<url\\>http://www.baidu.com/banseon\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</organization\\>￼    \\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建项目需要的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素设置了项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于`pom.xml`的相对路径。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<sourceDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素设置了项目脚本源码目录，该目录和源码目录不同：绝大多数情况下，该目录下的内容 会被拷贝到输出目录`(`因为脚本是被解释的，而不是被编译的`)`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<scriptSourceDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素设置了项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于`pom.xml`的相对路径。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- ￼        --\\>￼        \\<testSourceDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被编译过的应用程序`class`文件存放的目录。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<outputDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被编译过的测试`class`文件存放的目录。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<testOutputDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用来自该项目的一系列构建扩展")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<extensions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述使用到的构建扩展。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<extension\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建扩展的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- groupId --\\>￼                \\<groupId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建扩展的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- artifactId --\\>￼                \\<artifactId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建扩展的版本")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<version /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</extension\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</extensions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当项目没有规定目标（`Maven2` 叫做阶段）时的默认值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<defaultGoal /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个元素描述了项目相关的所有资源路径列表，例如和项目相关的属性文件，这些资源被包含在最终的打包文件里。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<resources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个元素描述了项目相关或测试相关的所有资源路径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<resource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述了资源的目标路径。该路径相对`target/classes`目录（例如`${project.build.outputDirectory}`）。举个例子，如果你想资源在特定的包里`(org.apache.maven.messages)`，你就必须该元素设置为`org/apache/maven/messages`。然而， 如果你只是想把资源放到源码目录结构里，就不需要该配置。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<targetPath /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"是否使用参数值代替参数名。参数值取自`properties`元素或者文件里配置的属性，文件在`filters`元素里列出。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<filtering /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"描述存放资源的目录，该路径相对`POM`路径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<directory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"包含的模式列表，例如")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**/*.xml. --\\>￼                \\<includes /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"排除的模式列表，例如")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**/*.xml --\\>￼                \\<excludes /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</resource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</resources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个元素描述了单元测试相关的所有资源路径， 例如和单元测试相关的属性文件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<testResources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个元素描述了测试相关的所有资源路径，参见`build/resources/resource`元素的说明")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<testResource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<targetPath /\\>￼                \\<filtering /\\>￼                \\<directory /\\>￼                \\<includes /\\>￼                \\<excludes /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</testResource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</testResources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建产生的所有文件存放的目录")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<directory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"产生的构件的文件名，默认值是`${artifactId}-${version}`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<finalName /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当`filtering`开关打开时，使用到的过滤器属性文件列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<filters /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"子项目可以引用的默认插件信息。该插件配置项直到被引用时才会被解析或绑定到生命周期。给定插件的任何本地配置都会覆盖这里的配置。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用的插件列表 。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- plugin")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"元素包含描述插件所需要的信息。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"插件在仓库里的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- group ID --\\>￼                    \\<groupId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"插件在仓库里的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"artifact ID --\\>￼                    \\<artifactId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"被使用的插件的版本（或版本范围）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<version /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"是否从该插件下载`Maven`扩展（例如打包和类型处理器），由于性能原因，只有在真需要下载时，该元素才被设置成`enabled`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<extensions /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- execution")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"元素包含了插件执行需要的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                        \\<execution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                            \\<id /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                            \\<phase /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置的执行目标")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                            \\<goals /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置是否被传播到子")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"POM --\\>￼                            \\<inherited /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"作为`DOM`对象的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                            \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</execution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目引入插件所需要的额外依赖")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                        \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"任何配置是否被传播到子项目")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<inherited /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"作为`DOM`对象的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用的插件列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`build/pluginManagement/plugins/plugin`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId /\\>￼                \\<artifactId /\\>￼                \\<version /\\>￼                \\<extensions /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<executions\\>￼                    \\<execution\\>￼                        \\<id /\\>￼                        \\<phase /\\>￼                        \\<goals /\\>￼                        \\<inherited /\\>￼                        \\<configuration /\\>￼                    \\</execution\\>￼                \\</executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<goals /\\>￼                \\<inherited /\\>￼                \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"在列的项目构建`profile`，如果被激活，会修改构建处理")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<profiles\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"根据环境参数或命令行参数激活某个构建处理")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<profile\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建配置的唯一标识符。即用于命令行激活，也用于在继承时合并具有相同标识符的`profile`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<id /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"自动触发`profile`的条件逻辑。`Activation`是`profile`的开启钥匙。`profile`的力量来自于它能够在某些特定的环境中自动使用某些特定的值；这些环境通过`activation`元素指定。`activation`元素并不是激活`profile`的唯一方式。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<activation\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- profile")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"默认是否激活的标志")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<activeByDefault /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当匹配的`jdk`被检测到，`profile`被激活。例如，`1.4`激活`JDK1.4`，`1.4.0_2`，而`!1.4`激活所有版本不是以`1.4`开头的`JDK`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<jdk /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当匹配的操作系统属性被检测到，`profile`被激活。`os`元素可以定义一些操作系统相关的属性。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<os\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的操作系统的名字")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<name\\>Windows XP\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的操作系统所属家族`(`如")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," 'windows') --\\>￼                    \\<family\\>Windows\\</family\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的操作系统体系结构")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<arch\\>x86\\</arch\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的操作系统版本")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<version\\>5.1.2600\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</os\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果`Maven`检测到某一个属性（其值可以在`POM`中通过`${`名称`}`引用），其拥有对应的名称和值，`Profile`就会被激活。如果值字段是空的，那么存在属性名称字段就会激活`profile`，否则按区分大小写方式匹配属性值字段")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<property\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的属性的名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<name\\>mavenVersion\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"激活`profile`的属性的值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<value\\>2.0.3\\</value\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</property\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"提供一个文件名，通过检测该文件的存在或不存在来激活`profile`。 `missing`检查文件是否存在，如果不存在则激活 `profile`。另一方面，`exists`则会检查文件是否存在，如果存在则激活`profile`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<file\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果指定的文件存在，则激活`profile`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<exists\\>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/\\</exists\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果指定的文件不存在，则激活`profile`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<missing\\>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/\\</missing\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</file\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</activation\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"构建项目所需要的信息。参见`build`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<defaultGoal /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<resources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<resource\\>￼                        \\<targetPath /\\>￼                        \\<filtering /\\>￼                        \\<directory /\\>￼                        \\<includes /\\>￼                        \\<excludes /\\>￼                    \\</resource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</resources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<testResources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<testResource\\>￼                        \\<targetPath /\\>￼                        \\<filtering /\\>￼                        \\<directory /\\>￼                        \\<includes /\\>￼                        \\<excludes /\\>￼                    \\</testResource\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</testResources\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<directory /\\>￼                \\<finalName /\\>￼                \\<filters /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`build/pluginManagement/plugins/plugin`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                        \\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId /\\>￼                            \\<artifactId /\\>￼                            \\<version /\\>￼                            \\<extensions /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<execution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<id /\\>￼                                    \\<phase /\\>￼                                    \\<goals /\\>￼                                    \\<inherited /\\>￼                                    \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</execution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                                \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<goals /\\>￼                            \\<inherited /\\>￼                            \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</pluginManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`build/pluginManagement/plugins/plugin`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<groupId /\\>￼                        \\<artifactId /\\>￼                        \\<version /\\>￼                        \\<extensions /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<execution\\>￼                                \\<id /\\>￼                                \\<phase /\\>￼                                \\<goals /\\>￼                                \\<inherited /\\>￼                                \\<configuration /\\>￼                            \\</execution\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</executions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                            \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<goals /\\>￼                        \\<inherited /\\>￼                        \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</build\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<modules /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发现依赖和扩展的远程仓库列表。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<repositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`repositories/repository`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                \\<repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<releases\\>￼                        \\<enabled /\\>￼                        \\<updatePolicy /\\>￼                        \\<checksumPolicy /\\>￼                    \\</releases\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<snapshots\\>￼                        \\<enabled /\\>￼                        \\<updatePolicy /\\>￼                        \\<checksumPolicy /\\>￼                    \\</snapshots\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<id /\\>￼                    \\<name /\\>￼                    \\<url /\\>￼                    \\<layout /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</repositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"发现插件的远程仓库列表，这些插件用于构建和报表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<pluginRepositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"包含需要连接到远程插件仓库的信息`.`参见`repositories/repository`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                \\<pluginRepository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<releases\\>￼                        \\<enabled /\\>￼                        \\<updatePolicy /\\>￼                        \\<checksumPolicy /\\>￼                    \\</releases\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<snapshots\\>￼                        \\<enabled /\\>￼                        \\<updatePolicy /\\>￼                        \\<checksumPolicy /\\>￼                    \\</snapshots\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<id /\\>￼                    \\<name /\\>￼                    \\<url /\\>￼                    \\<layout /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</pluginRepository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</pluginRepositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素描述了项目相关的所有依赖。这些依赖组成了项目构建过程中的一个个环节。它们自动从项目定义的仓库中下载。要获取更多信息，请看项目依赖机制。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"不赞成使用`.` 现在`Maven`忽略该元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- . --\\>￼            \\<reports /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素包括使用报表插件产生报表的规范。 当用户执行“`mvn site`”，这些报表就会运行。在页面导航栏能看到所有报表的链接。参见`reporting`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<reporting\\>\\</reporting\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencyManagement`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼                    \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`distributionManagement`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<distributionManagement\\>\\</distributionManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`properties`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<properties /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</profile\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</profiles\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<modules /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发现依赖和扩展的远程仓库列表。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<repositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"包含需要连接到远程仓库的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如何处理远程仓库里发布版本的下载")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<releases\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"或者`false`表示该仓库是否为下载某种类型构件（发布版，快照版）开启。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<enabled /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素指定更新发生的频率。`Maven`会比较本地`POM`和远程`POM`的时间戳。这里的选项是：`always`（一直），`daily`（默认，每日），`interval`：`X`（这里`X`是以分钟为单位的时间间隔），或者`never`（从不）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<updatePolicy /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当`Maven`验证构件校验文件失败时该怎么做：`ignore`（忽略），`fail`（失败），或者`warn`（警告）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<checksumPolicy /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</releases\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如何处理远程仓库里快照版本的下载。有了`releases`和`snapshots`这两组配置，`POM`就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。 例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见`repositories/repository/releases`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<snapshots\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<enabled /\\>￼                \\<updatePolicy /\\>￼                \\<checksumPolicy /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</snapshots\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"远程仓库唯一标识符。可以用来匹配在`settings.xml`文件里配置的远程仓库")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<id\\>banseon-repository-proxy\\</id\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"远程仓库名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<name\\>banseon-repository-proxy\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"远程仓库`URL`，按`protocol://hostname/path`形式")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<url\\>http://192.168.1.169:9999/repository/\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于定位和排序构件的仓库布局类型`-`可以是`default`（默认）或者`legacy`（遗留）。`Maven 2`为其仓库提供了一个默认的布局；然而，`Maven 1.x`有一种不同的布局。我们可以使用该元素指定布局是`default`（默认）还是`legacy`（遗留）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<layout\\>default\\</layout\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</repositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"发现插件的远程仓库列表，这些插件用于构建和报表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<pluginRepositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"包含需要连接到远程插件仓库的信息`.`参见`repositories/repository`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<pluginRepository\\>\\</pluginRepository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</pluginRepositories\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素描述了项目相关的所有依赖。这些依赖组成了项目构建过程中的一个个环节。它们自动从项目定义的仓库中下载。要获取更多信息，请看项目依赖机制。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼    \\<dependencies\\>￼        \\<dependency\\>￼            \\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"group ID --\\>￼            \\<groupId\\>org.apache.maven\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"artifact ID --\\>￼            \\<artifactId\\>maven-artifact\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖的版本号。 在`Maven 2`里`,` 也可以配置成版本号的范围。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<version\\>3.8.1\\</version\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖类型，默认类型是`jar`。它通常表示依赖的文件的扩展名，但也有例外。一个类型可以被映射成另外一个扩展名或分类器。类型经常和使用的打包方式对应，尽管这也有例外。一些类型的例子：`jar`，`war`，`ejb-client`和`test-jar`。如果设置`extensions`为`true`，就可以在`plugin`里定义新的类型。所以前面的类型的例子不完整。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<type\\>jar\\</type\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖的分类器。分类器可以区分属于同一个`POM`，但不同构建方式的构件。分类器名被附加到文件名的版本号后面。例如，如果你想要构建两个单独的构件成`JAR`，一个使用`Java 1.4`编译器，另一个使用`Java 6`编译器，你就可以使用分类器来生成两个单独的`JAR`构件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<classifier\\>\\</classifier\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"依赖范围。在项目发布过程中，帮助决定哪些构件被包括进来。欲知详情请参考依赖机制。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - compile`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"：默认范围，用于编译")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - provided`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"：类似于编译，但支持你期待`jdk`或者容器提供，类似于")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`classpath￼            - runtime:`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"在执行时需要使用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - test:`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"用于`test`任务时使用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - system:`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"需要外在提供相应的元素。通过`systemPath`来取得")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - systemPath:`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"仅用于范围为`system`。提供相应的路径")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`￼            - optional:`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当项目自身被依赖时，标注依赖是否传递。用于连续依赖时使用")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<scope\\>test\\</scope\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"仅供`system`范围使用。注意，不鼓励使用这个元素，并且在新的版本中该元素可能被覆盖掉。该元素为依赖规定了文件系统上的路径。需要绝对路径而不是相对路径。推荐使用属性匹配绝对路径，例如`${java.home}`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<systemPath\\>\\</systemPath\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当计算传递依赖时， 从依赖构件列表里，列出被排除的依赖构件集。即告诉`maven`你只依赖指定的项目，不依赖项目的依赖。此元素主要用于解决版本冲突问题")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<exclusions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<exclusion\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<artifactId\\>spring-core\\</artifactId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<groupId\\>org.springframework\\</groupId\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</exclusion\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</exclusions\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"可选依赖，如果你在项目`B`中把`C`依赖声明为可选，你就需要在依赖于`B`的项目（例如项目`A`）中显式的引用对`C`的依赖。可选依赖阻断依赖的传递性。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<optional\\>true\\</optional\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"不赞成使用`.` 现在`Maven`忽略该元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- . --\\>￼    \\<reports\\>\\</reports\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"该元素描述使用报表插件产生报表的规范。当用户执行“`mvn site`”，这些报表就会运行。在页面导航栏能看到所有报表的链接。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<reporting\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"，则，网站不包括默认的报表。这包括“项目信息”菜单中的报表。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<excludeDefaults /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有产生的报表存放到哪里。默认值是`${project.build.directory}/site`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<outputDirectory /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用的报表插件和他们的配置。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!-- plugin")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"元素包含描述报表插件需要的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"报表插件在仓库里的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- group ID --\\>￼                \\<groupId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"报表插件在仓库里的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- artifact ID --\\>￼                \\<artifactId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"被使用的报表插件的版本（或版本范围）")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<version /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"任何配置是否被传播到子项目")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<inherited /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"报表插件的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"一组报表的多重规范，每个规范可能有不同的配置。一个规范（报表集）对应一个执行目标 。例如，有`1`，`2`，`3`，`4`，`5`，`6`，`7`，`8`，`9`个报表。`1`，`2`，`5`构成`A`报表集，对应一个执行目标。`2`，`5`，`8`构成`B`报表集，对应另一个执行目标")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                \\<reportSets\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"表示报表的一个集合，以及产生该集合的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                    \\<reportSet\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"报表集合的唯一标识符，`POM`继承时用到")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                        \\<id /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"产生报表集合时，被使用的报表的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                        \\<configuration /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"配置是否被继承到子")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- POMs --\\>￼                        \\<inherited /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个集合里使用到哪些报表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼                        \\<reports /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</reportSet\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</reportSets\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</plugin\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</plugins\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</reporting\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"继承自该项目的所有子项目的默认依赖信息。这部分的依赖信息不会被立即解析`,`而是当子项目声明一个依赖（必须描述`group ID`和`artifact ID`信息），如果`group ID`和`artifact ID`以外的一些信息没有描述，则通过`group ID`和`artifact ID`匹配到这里的依赖，并使用这里的依赖信息。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"参见`dependencies/dependency`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<dependency\\>\\</dependency\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</dependencies\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</dependencyManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目分发信息，在执行`mvn deploy`后表示要发布的位置。有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<distributionManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"部署项目产生的构件到远程仓库需要的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"是分配给快照一个唯一的版本号（由时间戳和构建流水号）？还是每次都使用相同的版本号？ 参见`repositories/repository`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<uniqueVersion /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<id\\>banseon-maven2\\</id\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<name\\>banseon maven2\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<url\\>file://${basedir}/target/deploy\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<layout /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</repository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"构件的快照部署到哪里？如果没有配置该元素，默认部署到`repository`元素配置的仓库，参见`distributionManagement/repository`元素")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼        \\<snapshotRepository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<uniqueVersion /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<id\\>banseon-maven2\\</id\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<name\\>Banseon-maven2 Snapshot Repository\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<url\\>scp://svn.baidu.com/banseon:/usr/local/maven-snapshot\\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<layout /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</snapshotRepository\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"部署项目的网站需要的信息")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<site\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"部署位置的唯一标识符，用来匹配站点和`settings.xml`文件里的配置")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<id\\>banseon-site\\</id\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"部署位置的名称")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<name\\>business api website\\</name\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"部署位置的`URL`，按`protocol://hostname/path`形式")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," --\\>￼            \\<url\\>￼                scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web￼            \\</url\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\</site\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\<!--")]),s(`
`),n("span",{class:"line"},[n("span",null,"项目下载页面的`URL`。如果没有该元素，用户应该参考主页。使用该元素的原因是：帮助定位那些不在仓库里的构件（由于`license`限制）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<downloadUrl /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果构件有了新的`group ID`和`artifact ID`（构件移到了新的位置），这里列出构件的重定位信息。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<relocation\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构件新的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- group ID --\\>￼            \\<groupId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构件新的")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- artifact ID --\\>￼            \\<artifactId /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"构件新的版本号")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<version /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"显示给用户的，关于移动的额外信息，例如原因。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼            \\<message /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</relocation\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"给出该构件在远程仓库的状态。不得在本地项目中设置该元素，因为这是工具自动更新的。有效的值有：`none`（默认），`converted`（仓库管理员从`Maven 1 POM`转换过来），`partner`（直接从伙伴`Maven 2`仓库同步过来），`deployed`（从`Maven 2`实例部署），`verified`（被核实时正确的和最终的）。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼        \\<status /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</distributionManagement\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\<!--")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"以值替代名称，`Properties`可以在整个`POM`中使用，也可以作为触发条件（见`settings.xml`配置文件里`activation`元素的说明）。格式是`\\<name\\>value\\</name\\>`。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- --\\>￼    \\<properties /\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"- \\</project\\>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.cnblogs.com/aric2016/p/11508201.html\\>")])])])])],-1)])])}const v=a(i,[["render",c]]);export{g as __pageData,v as default};
