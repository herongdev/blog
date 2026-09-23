import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const y=JSON.parse('{"title":"综合案例——发红包【界面版】","description":"","frontmatter":{"title":"综合案例——发红包【界面版】","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/综合案例——发红包【界面版】.md","filePath":"posts/java快速入门/第二部分：面向对象/03-面向对象特性/综合案例——发红包【界面版】.md"}'),i={name:"posts/java快速入门/第二部分：面向对象/03-面向对象特性/综合案例——发红包【界面版】.md"};function c(u,l,t,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"红包文化源远流长。从古时的红色纸包，到手机App中的手气红包，红包作为一种独特的中华文化传承至今。之前")]),s(`
`),n("span",{class:"line"},[n("span",null,"的课程中，我们也编写过程序，模拟发普通红包。那么今天，我们将整合基础班课程中所有的技术和知识，编写一")]),s(`
`),n("span",{class:"line"},[n("span",null,"个带界面版的 发红包 案例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"目前，我们尚未学习过任何与界面相关的类。所以，界面相关代码，已经给出。请运用所学技术分析并使")]),s(`
`),n("span",{class:"line"},[n("span",null,"用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例需求**")]),s(`
`),n("span",{class:"line"},[n("span",null,"分析并使用已给出的类，编写程序，设置红包类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"小贴士")]),s(`
`),n("span",{class:"line"},[n("span",null,"红包类型：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 普通红包：金额均分。不能整除的，余额添加到最后一份红包中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 手气红包：金额随机。各个红包金额累和与总金额相等。")]),s(`
`),n("span",{class:"line"},[n("span",null,"红包场景：此案例是模拟群主给群成员发红包，群主自己打开最后一个红包的场景。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例分析**")]),s(`
`),n("span",{class:"line"},[n("span",null,"已知的类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. RedPacketFrame ：一个抽象类，包含了一些属性，是红包案例的页面。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract class RedPacketFrame extends JFrame {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* ownerName : 群主名称 */")]),s(`
`),n("span",{class:"line"},[n("span",null,'public String ownerName = "谁谁谁谁";')]),s(`
`),n("span",{class:"line"},[n("span",null,"/* openMode : 红包的类型 [普通红包/手气红包] */")]),s(`
`),n("span",{class:"line"},[n("span",null,"public OpenMode openMode = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 构造方法:生成红包界面.")]),s(`
`),n("span",{class:"line"},[n("span",null,"* @param title 页面的标题.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"public RedPacketFrame(String title) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super(title);")]),s(`
`),n("span",{class:"line"},[n("span",null,"init();// 页面相关的初始化操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"/* set方法 */")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setOwnerName(String ownerName) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.ownerName = ownerName;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setOpenMode(OpenMode openMode) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.openMode = openMode;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. OpenMode ：一个接口，包含一个分配方法，用来指定红包类型。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface OpenMode {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,'* @param totalMoney 总金额,单位是"分"。总金额为方便计算,已经转换为整数,单位为分。')]),s(`
`),n("span",{class:"line"},[n("span",null,"* @param count 红包个数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* @return ArrayList\\<Integer\\> 元素为各个红包的金额值,所有元素的值累和等于总金额.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 请将totalMoney,分成count分,保存到ArrayList\\<Integer\\>中,返回即可.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract ArrayList\\<Integer\\> divide(int totalMoney, int count);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例实现**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**环境搭建：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 创建项目：名称自定义，建议为 RedPacketDemo 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 导入图片：将 pic 目录，导入项目中，与 src 目录平级。3. 导入已知类：在 src 下创建一个包，名字自定义，建议为 known ，将类 RedPacketFrame 、接口 OpenMode")]),s(`
`),n("span",{class:"line"},[n("span",null,"拷入。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**代码实现：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. **定义** **RedPacket** **类，继承** **RedPacketFrame** **，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedPacket extends RedPacketFrame {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public RedPacket(String title) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"super(title);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. **定义测试类，创建** **RedPacket** **对象，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedPacketTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'RedPacket rp = new RedPacket("大红包");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"运行代码，打开一个发红包的页面。可以输入总金额，红包个数，留言信息。点击 塞钱进红包 按钮，跳转到下一页面。点击 谁谁谁谁 和 開 ，两个区域，发现可以设置两项内容：")]),s(`
`),n("span",{class:"line"},[n("span",null,"谁谁谁谁 ：表示群主在发红包，可设置群主名称。通过此方法，熟悉类结构，直接调用父类的方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"開 ：表示打开红包，跳转到下一页面。但是开启之前，必须先设置红包的类型，否则无法开启。3. **RedPacket** **对象，设置群主名称。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"setOwnerName（String ownerName） ，是字符串作为参数。我们只需要传递一个字符串即可。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedPacketTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建红包对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'RedPacket rp = new RedPacket("大红包");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置群主名称")]),s(`
`),n("span",{class:"line"},[n("span",null,'rp.setOwnerName("我是群大大");')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. **RedPacket** **对象，设置红包类型。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"setOpenMode(OpenMode openMode) ，是接口作为参数。我们必须定义接口的实现类，重写接口中方法，并传")]),s(`
`),n("span",{class:"line"},[n("span",null,"递实现类对象到 setOpenMode 方法中，方可设置完成。再观察接口：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface OpenMode {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/**")]),s(`
`),n("span",{class:"line"},[n("span",null,'* @param totalMoney 总金额,单位是"分"。总金额为方便计算,已经转换为整数,单位为分。')]),s(`
`),n("span",{class:"line"},[n("span",null,"* @param count 红包个数")]),s(`
`),n("span",{class:"line"},[n("span",null,"* @return ArrayList\\<Integer\\> 元素为各个红包的金额值,所有元素的值累和等于总金额.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 请将totalMoney,分成count分,保存到ArrayList\\<Integer\\>中,返回即可.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"public abstract ArrayList\\<Integer\\> divide(int totalMoney, int count);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"5. **普通红包，打开方式** **Common** **，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Common implements OpenMode {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public ArrayList\\<Integer\\> divide(int totalMoney, int count) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建保存各个红包金额的集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<Integer\\> list = new ArrayList\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义循环次数,总个数‐1次")]),s(`
`),n("span",{class:"line"},[n("span",null,"int time = count ‐ 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 一次计算,生成平均金额")]),s(`
`),n("span",{class:"line"},[n("span",null,"int money = totalMoney / count;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 循环分配")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< time; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 添加到集合中")]),s(`
`),n("span",{class:"line"},[n("span",null,"list.add(money);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 总金额扣除已分配金额**当前剩余平均金额（取整数）** **红包范围** **随机金额（假设）**")]),s(`
`),n("span",{class:"line"},[n("span",null,"第一个红包 50 / 5 = 10 0.01~20 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"第二个红包 45 / 4 = 11 0.01~22 20")]),s(`
`),n("span",{class:"line"},[n("span",null,"第三个红包 25 / 3. = 8 0.01~16 10")]),s(`
`),n("span",{class:"line"},[n("span",null,"第四个红包 15 / 2 = 7 0.01~14 12")]),s(`
`),n("span",{class:"line"},[n("span",null,"第五个红包（最后一个） 无需计算 剩余金额 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"6. **发普通红包，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"7. **手气红包【重点】**")]),s(`
`),n("span",{class:"line"},[n("span",null,"本质上，手气红包就是把总金额 totalMoney 随机分成指定的 count 份，所以必须规定每一份金额的取值范围。如")]),s(`
`),n("span",{class:"line"},[n("span",null,"果范围太小，可能导致后分配红包金额特别大。反之范围太大，可能导致后分配红包金额为0，不够分。可见，取")]),s(`
`),n("span",{class:"line"},[n("span",null,"值范围的定义规则，是手气红包的关键所在。")]),s(`
`),n("span",{class:"line"},[n("span",null,'我们规定：每一份随机金额范围（除最后一份），最小值为1，最大值为**当前剩余平均金额的****2****倍** ，单位为"分"。')]),s(`
`),n("span",{class:"line"},[n("span",null,"计算公式：")]),s(`
`),n("span",{class:"line"},[n("span",null,"举例：总额为50元，发5个红包。")]),s(`
`),n("span",{class:"line"},[n("span",null,'小贴士：为方便表格中进行运算，此处，单位为"元"。程序中，建议换算为"分"进行运算。')]),s(`
`),n("span",{class:"line"},[n("span",null,"**手气红包，打开方式** **Lucky** **，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"totalMoney ‐= money;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 剩余的金额,为最后一个红包")]),s(`
`),n("span",{class:"line"},[n("span",null,"list.add(totalMoney);")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println("普通红包金额:" + list);')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 返回集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"return list;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedPacketTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建红包对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'RedPacket rp = new RedPacket("大红包");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置群主名称")]),s(`
`),n("span",{class:"line"},[n("span",null,'rp.setOwnerName("我是群大大");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置红包类型")]),s(`
`),n("span",{class:"line"},[n("span",null,"rp.setOpenMode(new Common()); // 普通红包")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"当前剩余平均金额 = 剩余总金额 / 剩余红包个数public class Lucky implements OpenMode {")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public ArrayList\\<Integer\\> divide(int totalMoney, int count) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建保存各个红包金额的集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"ArrayList\\<Integer\\> list = new ArrayList\\<\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义循环次数,总个数‐1次")]),s(`
`),n("span",{class:"line"},[n("span",null,"int time = count ‐ 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建随机数对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"Random random = new Random();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 循环分配")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (int i = 0; i \\< time; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"/*")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 每次重新计算,生成随机金额")]),s(`
`),n("span",{class:"line"},[n("span",null,"* 随机范围: totalMoney / count * 2,totalMoney不断的减少,")]),s(`
`),n("span",{class:"line"},[n("span",null,"* count也不断的减少,所以这是一个可变化的范围.")]),s(`
`),n("span",{class:"line"},[n("span",null,"*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"int money = random.nextInt(totalMoney / count * 2) + 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 金额添加到集合")]),s(`
`),n("span",{class:"line"},[n("span",null,"list.add(money);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 总金额扣除已分配金额")]),s(`
`),n("span",{class:"line"},[n("span",null,"totalMoney ‐= money;")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 红包个数‐1")]),s(`
`),n("span",{class:"line"},[n("span",null,"count‐‐;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 剩余的金额,为最后一个红包")]),s(`
`),n("span",{class:"line"},[n("span",null,"list.add(totalMoney);")]),s(`
`),n("span",{class:"line"},[n("span",null,"return list;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"8. **发手气红包，代码如下：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class RedPacketTest {")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建红包对象")]),s(`
`),n("span",{class:"line"},[n("span",null,'RedPacket rp = new RedPacket("大红包");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置群主名称")]),s(`
`),n("span",{class:"line"},[n("span",null,'rp.setOwnerName("我是群大大");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 设置红包类型,二选一")]),s(`
`),n("span",{class:"line"},[n("span",null,"// rp.setOpenMode(new Common());"),n("span",null," // 普通红包")]),s(`
`),n("span",{class:"line"},[n("span",null,"rp.setOpenMode(new Lucky()); // 手气红包")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"**案例总结**")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过 发红包 案例，你都学到了什么呢？请你思考如下问题：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 基础语法，你是否清晰？")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 一些基本的类的方法，你是否能够调用？")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 案例中哪里体现了继承，继承的作用是什么？")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 接口作为参数，如何使用？5. 接口作为成员变量，如何使用？")]),s(`
`),n("span",{class:"line"},[n("span",null,"6. 如何简化接口的使用方式？")]),s(`
`),n("span",{class:"line"},[n("span",null,"相信每位学员，都会有自己的思考和答案。也相信大家，随着开发经验的丰富，对于技术的理解会更加深入，对技")]),s(`
`),n("span",{class:"line"},[n("span",null,"术的运用会更加纯熟。通过对大量案例的不断积累，最终写出属于你自己的程序，成为一名真正的coder。感谢大")]),s(`
`),n("span",{class:"line"},[n("span",null,"家参与学习 JavaSE 基础班课程，技术的道路上，这只是一个开始！谢谢大家！")])])])])],-1)])])}const M=a(i,[["render",c]]);export{y as __pageData,M as default};
