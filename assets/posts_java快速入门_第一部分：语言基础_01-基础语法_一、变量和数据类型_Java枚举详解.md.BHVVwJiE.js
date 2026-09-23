import{_ as o,o as t,c as n,a5 as c}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Java枚举详解","description":"","frontmatter":{"title":"Java枚举详解","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Java基础","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/Java枚举详解.md","filePath":"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/Java枚举详解.md"}'),d={name:"posts/java快速入门/第一部分：语言基础/01-基础语法/一、变量和数据类型/Java枚举详解.md"};function i(a,e,u,s,p,r){return t(),n("div",null,[...e[0]||(e[0]=[c(`<div><p>枚举对应英文<code>(enumeration,</code>简写 <code>enum)</code>；</p><ul><li>枚举是一组常量的集合；</li><li>枚举属于一种特殊的类，里面只包含一组有限的特定的对象；</li><li>不需要提供 <code>setXxxx()</code> 方法，因为枚举对象值通常为只读；</li><li>对枚举对象<code>/</code>属性使用 <code>static+final</code> 共同修饰；</li></ul><p><code>static+final</code> <em>只有修饰基本数据类型、</em><code>String</code><em>类型才不会加载类，修饰对象或者方法还是会加载类</em><code>final</code> <em>修饰对象</em><code>(</code><em>引用</em><code>)</code><em>只是保证引用的指向不变，但不能保证对象本身不变</em></p><ul><li>枚举对象名通常使用全部大写，与常量的命名规范一样；</li><li>枚举对象根据需要，也可以有多个属性；</li></ul><p>自定义类实现枚举</p><ul><li>将构造器私有化，目的是防止被<code>new</code>出对象</li><li>去掉 <code>setXxxx()</code> 方法，防止属性被修改</li><li>在<code>Season</code>内部，直接创建固定对象</li><li>对外暴露对象<code>(</code>通过为对象添加 <code>public static final</code> 修饰符<code>)</code></li></ul><p>public class Demo03 { public static void main(String[] args) { System.out.println(Season.AUTUMN); System.out.println(Season.SUMMER); } }</p><p>class Season { private String name; private String desc; // 定义了四个对象 <code>//</code>加<code>final</code>是为了使引用不能被修改 <code>public static final Season SPRING = new Season(&quot;</code>春天<code>&quot;, &quot;</code>温暖</p><p>&quot;); public static final Season WINTER = new Season(&quot; 冬天<code>&quot;, &quot;</code>寒冷</p><p>&quot;); public static final Season SUMMER = new Season(&quot; 夏天<code>&quot;, &quot;</code>炎热</p><p>&quot;); public static final Season AUTUMN = new Season(&quot; 秋天<code>&quot;, &quot;</code>凉爽</p><p>&quot;);</p><pre><code>private Season(String name, String desc) \\{
    this.name = name;
    this.desc = desc;
\\}
</code></pre><p>​</p><pre><code>public String getName() \\{
    return name;
\\}
public String getDesc() \\{
    return desc;
\\}
@Override
public String toString() \\{
    return &quot;Season\\{&quot; +
            &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
            &quot;, desc=&#39;&quot; + desc + &#39;\\&#39;&#39; +
            &#39;\\}&#39;;
\\}
</code></pre><p>} 使用<code>enum</code>关键字实现枚举</p><ul><li>使用 <code>enum</code> 关键字代替 <code>class</code>；</li><li>常量对象名<code>(</code>实参列表<code>)</code>；</li><li><code>public static final Season2 SPRING = new Season2(&quot;</code>春天<code>&quot;, &quot;</code>温暖<code>&quot;);</code> 等价于 <code>SPRING(&quot;</code>春天<code>&quot;, &quot;</code>温暖<code>&quot;);</code></li><li>如果有多个对象，需要使用 ，间隔；</li><li>如果使用 <code>enum</code> 关键字来实现枚举，要求将定义的常量对象写在最前面；</li></ul><p>public class Demo04 { public static void main(String[] args) { System.out.println(Season2.SPRING); System.out.println(Season2.SUMMER); } }</p><p>enum Season2 { SPRING(&quot; 春天<code>&quot;, &quot;</code>温暖<code>&quot;),WINTER(&quot;</code>夏天<code>&quot;, &quot;</code>炎热<code>&quot;),SUMMER(&quot;</code>夏天<code>&quot;, &quot;</code>炎热<code>&quot;),AUTUMN(&quot;</code>秋天<code>&quot;, &quot;</code>凉爽<code>&quot;);</code> ​</p><pre><code>private String name;
private String desc;
</code></pre><p>​</p><pre><code>private Season2(String name, String desc) \\{
    this.name = name;
    this.desc = desc;
\\}

public String getName() \\{
    return name;
\\}
public String getDesc() \\{
    return desc;
\\}

@Override
public String toString() \\{
    return &quot;Season\\{&quot; +
            &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
            &quot;, desc=&#39;&quot; + desc + &#39;\\&#39;&#39; +
            &#39;\\}&#39;;
\\}
</code></pre><p>} 注意事项</p><ul><li><em>当我们使用</em><code>enum</code><em>关键字开发一个枚举类时，默认会继承</em><code>Enum</code><em>类；而且该枚举类是一个</em><code>final</code><em>类</em></li><li><em>如果使用无参构造器创建枚举对象，则可以省略小括号；</em></li><li><em>当有多个枚举对象时，使用</em> <em>，隔开，最后以一个分号结尾；</em></li><li><em>枚举对象必须放在枚举类的行首；</em></li></ul><p><code>enum</code>的常用方法 <em>使用关键字</em><code>enum</code><em>时，会隐式继承</em><code>Enum</code><em>类，这样就可以使用</em><code>Enum</code><em>类的相关方法</em></p><ul><li><code>toString()</code>：<code>Enum</code>类已经重写过了，返回的是当前对象名；子类可以重写该方法，用于返回对象的属性信息；</li><li><code>name()</code>：返回当前对象名<code>(</code>常量名<code>)</code>，子类中不能重写；</li><li><code>ordinal()</code>：返回当前对象的位置号，默认从<code>0</code>开始；</li><li><code>values()</code>：返回当前枚举类中所有的常量对象；</li><li><code>valueOf()</code>：将字符串转换成已有的枚举对象，要求字符串必须为已有的常量名，否则报异常！</li><li><code>compareTo()</code>：比较两个枚举常量的大小<code>(</code>编号<code>),</code>返回的结果是两个枚举常量的编号相减得到的数；</li></ul><p>public class Demo05 { public static void main(String[] args) { Season2 autumn = Season2.AUTUMN;</p><pre><code>    System.out.println(autumn.name());

    System.out.println(autumn.ordinal());

    Season2[] values = Season2.values();
    for (Season2 season : values) \\{
        System.out.println(season);
    \\}

    Season2 autumn1 = Season2.valueOf(&quot;AUTUMN&quot;);
    System.out.println(&quot;season1=&quot;+autumn1);
    System.out.println(autumn == autumn1);

    System.out.println(Season2.AUTUMN.compareTo(Season2.SUMMER));
\\}
</code></pre><p>} enum Season2{ SPRING(&quot; 春天<code>&quot;, &quot;</code>温暖<code>&quot;),WINTER(&quot;</code>冬天<code>&quot;, &quot;</code>寒冷<code>&quot;),SUMMER(&quot;</code>夏天<code>&quot;, &quot;</code>炎热<code>&quot;),AUTUMN(&quot;</code>秋天<code>&quot;, &quot;</code>凉爽</p><p>&quot;);</p><pre><code>private String name;
private String desc;

private Season2(String name, String desc) \\{
    this.name = name;
    this.desc = desc;
\\}
public String getName() \\{
    return name;
\\}
public String getDesc() \\{
    return desc;
\\}
@Override
public String toString() \\{
    return &quot;Season\\{&quot; +
            &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
            &quot;, desc=&#39;&quot; + desc + &#39;\\&#39;&#39; +
            &#39;\\}&#39;;
\\}
</code></pre><p>}</p><p><code>enum</code>的使用细节</p><ul><li><em>使用</em><code>enum</code><em>关键字创建的枚举类，就不能再继承其它类了，因为使用</em><code>enum</code><em>创建的枚举类会隐式的继承</em><code>Enum</code><em>类，而</em><code>Java</code><em>是单继承机制</em>_；_</li><li><em>枚举类和普通类一样，可以实现接口；</em></li></ul><p>项目实践</p><p>package com.mincheng.organization.common; import lombok.AllArgsConstructor; import lombok.Getter; @Getter public enum ResultCode {</p><p>SUCCESS(true),</p><p>FAIL(false, 500, &quot; 服务器出错</p><p>&quot;),</p><p>/* 参数错误：<code>1000 - 1999 */</code></p><p>/* 用户错误：<code>2000 - 2999 */</code></p><p>/* 接口异常：</p><p>3000 - 3999 */;</p><p>private ResultCode(Boolean success) {</p><p>this.success = success;   <code>}</code></p><p>private ResultCode(Boolean success, Integer errorCode, String errorMessage) {</p><p>this.success = success;</p><p>this.errorCode = errorCode;</p><p>this.errorMessage = errorMessage;   <code>}</code></p><p>private Boolean success;</p><p>private Integer errorCode;</p><p>private String errorMessage; }</p><ul><li>先定义枚举对象</li><li>再定义构造函数或属性；</li><li>构造函数默认就是<code>private</code>，不必要加；</li></ul></div>`,1)])])}const S=o(d,[["render",i]]);export{m as __pageData,S as default};
