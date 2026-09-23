import{_ as e,o as a,c as n,a5 as o}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"java实体entity转map对象","description":"","frontmatter":{"title":"java实体entity转map对象","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","面向对象","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/java实体entity转map对象.md","filePath":"posts/java快速入门/第二部分：面向对象/01-类与对象/java实体entity转map对象.md"}'),s={name:"posts/java快速入门/第二部分：面向对象/01-类与对象/java实体entity转map对象.md"};function p(i,t,c,d,r,l){return a(),n("div",null,[...t[0]||(t[0]=[o(`<div><p>方法一：一句搞定，直接返回<code>map</code>对象（弊端新的对象无法扩展字段）：</p><p>import org.springframework.cglib.beans.BeanMap; BeanMap.create(entityObj); 方法二：利用<code>fastjson</code>处理（如下方式<code>1</code>，快捷）</p><p>import com.alibaba.fastjson.JSONObject; // 方式<code>1</code>、强转为</p><p>JSONObject JSONObject xxx = (JSONObject) JSONObject.toJSON(xxxEntity);</p><p>// 方式<code>2</code>、转成<code>json</code>，在转为<code>map(</code>未验证，但是理论上没问题</p><p>) String json = JSONObject.toJSONString(entityObj); Map map = JSONObject.parseObject(json, Map.class); ​​​​​​​</p><p>方法三：利用反射（技术大佬可以尝试此方案）——详见原文</p><p>import com.example.pojo.SystemEntity; import java.lang.reflect.Field; import java.lang.reflect.InvocationTargetException; import java.lang.reflect.Method; import java.util.HashMap;</p><p>public class test { public static void main(String[] arg){ SystemEntity systemEntity = new SystemEntity(); systemEntity.setName(&quot; 张三</p><p>&quot;); System.out.println(transitionEntitySe(systemEntity)); systemEntity.setName(&quot; 李四</p><p>&quot;); System.out.println(transitionEntitySe(systemEntity)); }</p><p><code>//</code>实体类转<code>HashMap-</code>第一种方法</p><pre><code>public static HashMap\\&lt;String,Object\\&gt; transitionEntity(Object onClass)\\{
    HashMap\\&lt;String,Object\\&gt; hashMap = new HashMap\\&lt;String,Object\\&gt;();
    Method[] methods = onClass.getClass().getMethods();
    for(Method method:methods)\\{
        try \\{
            //
</code></pre><p>获取方法时，默认会有<code>getClass,</code>需要排除</p><pre><code>            if(method.getName().indexOf(&quot;get&quot;)==0&amp;&amp;!method.getName().equals(&quot;getClass&quot;))\\{
                hashMap.put(method.getName().substring(3,4).toLowerCase()+method.getName().substring(4),method.invoke(onClass));
            \\}
        \\} catch (IllegalAccessException e) \\{
            e.printStackTrace();
        \\} catch (InvocationTargetException e) \\{
            e.printStackTrace();
        \\}
    \\}
    return hashMap;
\\}
</code></pre><p><code>//</code>实体类转<code>HashMap-</code>第二种方法<code>-</code>建议</p><pre><code>public static HashMap\\&lt;String,Object\\&gt; transitionEntitySe(Object onClass)\\{
    HashMap\\&lt;String,Object\\&gt; hashMap = new HashMap\\&lt;String,Object\\&gt;();
    Field[] fields = onClass.getClass().getDeclaredFields();
    for(Field field:fields)\\{
        //
</code></pre><p>反射时让私有变量变成可访问</p><pre><code>        field.setAccessible(true);
        try \\{
            hashMap.put(field.getName(),field.get(onClass));
        \\} catch (IllegalAccessException e) \\{
            e.printStackTrace();
        \\}
    \\}
    return hashMap;
\\}
</code></pre><p>} 实体类</p><p>public class SystemEntity { private int id; private String name;</p><pre><code>public int getId() \\{
    return id;
\\}
public void setId(int id) \\{
    this.id = id;
\\}

public String getName() \\{
    return name;
\\}

public void setName(String name) \\{
    this.name = name;
\\}
</code></pre><p>} 执行结果 <code>{name=</code>张三</p><p>, id=0} {name= 李四<code>, id=0}</code></p></div>`,1)])])}const h=e(s,[["render",p]]);export{g as __pageData,h as default};
