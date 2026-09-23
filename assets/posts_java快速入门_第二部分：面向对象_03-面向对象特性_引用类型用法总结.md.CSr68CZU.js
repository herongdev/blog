import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"引用类型用法总结","description":"","frontmatter":{"title":"引用类型用法总结","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/引用类型用法总结.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/引用类型用法总结.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/引用类型用法总结.md"};function c(t,l,u,r,o,d){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," 实际的开发中，引用类型的使用非常重要，也是非常普遍的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们可以在理解基本类型的使用方式基础上，进一步去掌握引用类型的使用方式。基本类型可以作为成员变量、作为方法的参数、作为方法的返回值，那么当然引用类型也是可以的。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**class****作为成员变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"在定义一个类Role（游戏角色）时，代码如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Role \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"int id; // 角色id")]),s(`
`),n("span",{class:"line"},[n("span",null,"int blood; // 生命值")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name; // 角色名称")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用 int 类型表示 角色id和生命值，使用 String 类型表示姓名。此时， String 本身就是引用类型，由于使用的方式类似常量，所以往往忽略了它是引用类型的存在。如果我们继续丰富这个类的定义，给 Role 增加武器，穿戴装备等属性，我们将如何编写呢？")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义武器类，将增加攻击能力：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Weapon \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name； // 武器名称")]),s(`
`),n("span",{class:"line"},[n("span",null,"int hurt； // 伤害值")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义穿戴盔甲类，将增加防御能力，也就是提升生命值：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Armour \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"String name；// 装备名称")]),s(`
`),n("span",{class:"line"},[n("span",null,"int protect；// 防御值")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义角色类：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"`测试类`")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"类作为成员变量时，对它进行赋值的操作，实际上，是赋给它该类的一个对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**interface****作为成员变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口是对方法的封装，对应游戏当中，可以看作是扩展游戏角色的技能。所以，如果想扩展更强大技能，我们在Role 中，可以增加接口作为成员变量，来设置不同的技能。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 法术攻击")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface FaShuSkill \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract void faShuAttack();")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义角色类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Role \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"FaShuSkill fs;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setFaShuSkill(FaShuSkill fs) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.fs = fs;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 法术攻击")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void faShuSkillAttack()\\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.print("发动法术攻击:");')]),s(`
`),n("span",{class:"line"},[n("span",null,"fs.faShuAttack();")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("攻击完毕");')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义测试类：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们使用一个接口，作为成员变量，以便随时更换技能，这样的设计更为灵活，增强了程序的扩展性。")]),s(`
`),n("span",{class:"line"},[n("span",null,"接口作为成员变量时，对它进行赋值的操作，实际上，是赋给它该接口的一个子类对象。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**interface****作为方法参数和返回值类型**")]),s(`
`),n("span",{class:"line"},[n("span",null,"当接口作为方法的参数时,需要传递什么呢？当接口作为方法的返回值类型时，需要返回什么呢？对，其实都是它的子类对象。 ArrayList类我们并不陌生，查看API我们发现，实际上，它是 java.util.List 接口的实现类。所以，当我们看见 List 接口作为参数或者返回值类型时，当然可以将 ArrayList 的对象进行传递或返回。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"请观察如下方法：**获取某集合中所有的偶数**。")]),s(`
`),n("span",{class:"line"},[n("span",null,"定义方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static List\\<Integer\\> getEvenNum(List\\<Integer\\> list) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建保存偶数的集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<Integer\\> evenList = new ArrayList\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历集合list,判断元素为偶数,就添加到evenList中")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< list.size(); i++) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"Integer integer = list.get(i);")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (integer % 2 == 0) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"evenList.add(integer);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"返回偶数集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"因为getEvenNum方法的返回值类型是List,而ArrayList是List的子类,因为getEvenNum方法的返回值类型是List,而ArrayList是List的子类,")]),s(`
`),n("span",{class:"line"},[n("span",null,"所以evenList可以返回")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"return evenList;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"调用方法：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 接口作为参数时，传递它的子类对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"- 接口作为返回值类型时，返回它的子类对象。")])])])])],-1)])])}const f=a(i,[["render",c]]);export{v as __pageData,f as default};
