import{_ as a,o as p,c as e,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const o=JSON.parse('{"title":"Map集合","description":"","frontmatter":{"title":"Map集合","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","核心API","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Map集合.md","filePath":"posts/java快速入门/第三部分：核心 API/02-数据结构/Map集合.md"}'),i={name:"posts/java快速入门/第三部分：核心 API/02-数据结构/Map集合.md"};function t(u,l,c,r,S,g){return p(),e("div",null,[...l[0]||(l[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"现实生活中，我们常会看到这样的一种集合：IP地址与主机名，身份证号与个人，系统用户名与系统用户对象等，这种一一对应的关系，就叫做映射。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"java.util.Map 接口为实现键映射数据结构定义了一个框架，这种结构可用于存储通过键值引用的对象。键和值可以为任意类型数据。键值的作用与数组中的索引相同，它是一个独一无二的值，可用来存取数据结构中指定位置的数据。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," **Map** **接口与** **Collection** **接口区别：**")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection 中的集合称为单列集合， Map中的集合称为双列集合。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection 中的集合，元素是孤立存在的（理解为单身），向集合中存储元素采用一个个元素的方式存储。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Map 中的集合，元素是成对存在的。每个元素由键与值两部分组成，通过键可以找对所对应的值。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意： Map 中的集合不能包含重复的键，值可以重复。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map****常用子类**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Map有多个子类，常用的有HashMap集合、LinkedHashMap集合。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**HashMap**：存储数据采用的哈希表结构，元素的存取顺序不能保证一致。由于要保证键的唯一、不重复，需要重写键的hashCode()方法、equals()方法。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**LinkedHashMap**：HashMap下有个子类LinkedHashMap，存储数据采用的哈希表结构+链表结构。通过链表结构可以保证元素的存取顺序一致；通过哈希表结构可以保证的键的唯一、不重复，需要重写键的hashCode()方法、equals()方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"tips：Map接口中的集合都有两个泛型变量,在使用时，要为两个泛型变量赋予数据类型。两个泛型变量的数据类型可以相同，也可以不同。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map****接口中的常用方法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Map接口中定义了很多方法，常用的如下：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public V put(K key, V value) :把指定的键与指定的值添加到Map集合中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"使用`put`方法时，若指定的键`(key)`在集合中没有，则返回`null`，并把指定的键值添加到集合中；若存在，则返回键对应的值（该值为替换前的值），并把原键值替换成指定的新值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public V get(Object key) 根据指定的键，在Map集合中获取对应的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public V remove(Object key) : 把指定的键所对应的键值对元素 在Map集合中删除，返回被删除元素的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Set\\<K\\> keySet() : 获取Map集合中所有的键，存储到Set集合中。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Set\\<Map.Entry\\<K,V\\>\\> entrySet() : 获取到Map集合中所有的键值对对象的集合(Set集合)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法size()来获悉结构包含多少个元素：int size = look.size();")]),s(`
`),n("span",{class:"line"},[n("span",null,"方法isEmpty()来检查结构是否为空：boolean isEmpty = look.isEmpty();")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Map接口的方法演示")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MapDemo \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建 map对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashMap\\<String, String\\> map = new HashMap\\<String, String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//添加元素到集合")]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("黄晓明", "杨颖");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("文章", "马伊琍");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("邓超", "孙俪");')]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(map);")]),s(`
`),n("span",{class:"line"},[n("span",null,"//String remove(String key)")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(map.remove("邓超"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"System.out.println(map);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 想要查看 黄晓明的媳妇 是谁")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(map.get("黄晓明"));')]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(map.get("邓超"));')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map****集合遍历键找值方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"键找值方式：即通过元素中的键，获取键所对应的值")]),s(`
`),n("span",{class:"line"},[n("span",null,"分析步骤：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取Map中所有的键，由于键是唯一的，所以返回一个Set集合存储所有的键。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 遍历键的Set集合，得到每一个键。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 根据键，获取键所对应的值。方法提示: get(K key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"代码演示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MapDemo01 \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"//创建Map集合对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashMap\\<String, String\\> map = new HashMap\\<String,String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//添加元素到集合")]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("胡歌", "霍建华");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("郭德纲", "于谦");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("薛之谦", "大张伟");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//获取所有的键 获取键集")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<String\\> keys = map.keySet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历键集 得到 每一个键")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (String key : keys) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"//key 就是键")]),s(`
`),n("span",{class:"line"},[n("span",null,"//获取对应值")]),s(`
`),n("span",{class:"line"},[n("span",null,"String value = map.get(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(key+"的CP是："+value);')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Entry****键值对对象**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经知道， Map 中存放的是两种对象，一种称为**key**(键)，一种称为**value**(值)，它们在在 Map 中是一一对应关系，这一对对象又称做 Map 中的一个 Entry(项) 。 Entry 将键值对的对应关系封装成了对象。即键值对对象，这样我们在遍历 Map 集合时，就可以从每一个键值对（ Entry ）对象中获取对应的键与对应的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"既然Entry表示了一对键和值，那么也同样提供了获取对应键和对应值得方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public K getKey() ：获取Entry对象中的键。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public V getValue() ：获取Entry对象中的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在Map集合中也提供了获取所有Entry对象的方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Set\\<Map.Entry\\<K,V\\>\\> entrySet() : 获取到Map集合中所有的键值对对象的集合(Set集合)。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map****集合遍历键值对方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"键值对方式：即通过集合中每个键值对(Entry)对象，获取键值对(Entry)对象中的键与值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"操作步骤与图解：")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取Map集合中，所有的键值对(Entry)对象，以Set集合形式返回。方法提示: entrySet() 。")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 遍历包含键值对(Entry)对象的Set集合，得到每一个键值对(Entry)对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 通过键值对(Entry)对象，获取Entry对象中的键与值。 方法提示: getkey() getValue()")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class MapDemo02 \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 创建Map集合对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"HashMap\\<String, String\\> map = new HashMap\\<String,String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 添加元素到集合")]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("胡歌", "霍建华");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("郭德纲", "于谦");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("薛之谦", "大张伟");')]),s(`
`),n("span",{class:"line"},[n("span",null,"// 获取 所有的 entry对象 entrySet")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<Entry\\<String,String\\>\\> entrySet = map.entrySet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 遍历得到每一个entry对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (Entry\\<String, String\\> entry : entrySet) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 解析")]),s(`
`),n("span",{class:"line"},[n("span",null,"String key = entry.getKey();")]),s(`
`),n("span",{class:"line"},[n("span",null,"String value = entry.getValue();")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(key+"的CP是:"+value);')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**HashMap****存储自定义类型键值**")]),s(`
`),n("span",{class:"line"},[n("span",null,"练习：每位学生（姓名，年龄）都有自己的家庭住址。那么，既然有对应关系，则将学生对象和家庭住址存储到 map集合中。学生作为键, 家庭住址作为值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"注意，学生姓名相同并且年龄相同视为同一名学生。")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写学生类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class Student \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"private String name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"private int age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Student() \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public Student(String name, int age) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public String getName() \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"return name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setName(String name) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.name = name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int getAge() \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"return age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"public void setAge(int age) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"this.age = age;")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public boolean equals(Object o) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (this == o)")]),s(`
`),n("span",{class:"line"},[n("span",null,"return true;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (o == null || getClass() != o.getClass())")]),s(`
`),n("span",{class:"line"},[n("span",null,"return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"Student student = (Student) o;")]),s(`
`),n("span",{class:"line"},[n("span",null,"return age == student.age && Objects.equals(name, student.name);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"public int hashCode() \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"return Objects.hash(name, age);")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"编写测试类：")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class HashMapTest \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"//1,创建Hashmap集合对象。")]),s(`
`),n("span",{class:"line"},[n("span",null,"Map\\<Student,String\\> map = new HashMap\\<Student,String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,"//2,添加元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put(newStudent("lisi",28), "上海");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put(newStudent("wangwu",22), "北京");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put(newStudent("zhaoliu",24), "成都");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put(newStudent("zhouqi",25), "广州");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put(newStudent("wangwu",22), "南京");')]),s(`
`),n("span",{class:"line"},[n("span",null,"//3,取出元素。键找值方式")]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<Student\\>keySet = map.keySet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"for(Student key: keySet)\\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"Stringvalue = map.get(key);")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(key.toString()+"....."+value);')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"当给HashMap中存放自定义对象时，如果自定义对象作为key存在，这时要保证对象唯一，必须复写对象的hashCode和equals方法。")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果要保证map中存放的key和取出的顺序一致，可以使用 java.util.LinkedHashMap 集合来存放。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**LinkedHashMap**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们知道HashMap保证成对元素唯一，并且查询速度很快，可是成对元素存放进去是没有顺序的，那么我们要保证有序，还要速度快怎么办呢？")]),s(`
`),n("span",{class:"line"},[n("span",null,"在HashMap下面有一个子类LinkedHashMap，它是链表和哈希表组合的一个数据存储结构。")]),s(`
`),n("span",{class:"line"},[n("span",null,"public class LinkedHashMapDemo \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"public static void main(String[] args) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,"LinkedHashMap\\<String, String\\> map = new LinkedHashMap\\<String, String\\>();")]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("邓超", "孙俪");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("李晨", "范冰冰");')]),s(`
`),n("span",{class:"line"},[n("span",null,'map.put("刘德华", "朱丽倩");')]),s(`
`),n("span",{class:"line"},[n("span",null,"Set\\<Entry\\<String, String\\>\\> entrySet = map.entrySet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (Entry\\<String, String\\> entry : entrySet) \\{")]),s(`
`),n("span",{class:"line"},[n("span",null,'System.out.println(entry.getKey() + " " + entry.getValue());')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"\\}")]),s(`
`),n("span",{class:"line"},[n("span",null,"结果:")]),s(`
`),n("span",{class:"line"},[n("span",null,"邓超 孙俪")]),s(`
`),n("span",{class:"line"},[n("span",null,"李晨 范冰冰")]),s(`
`),n("span",{class:"line"},[n("span",null,"刘德华 朱丽倩")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"**Map****集合练习**")]),s(`
`),n("span",{class:"line"},[n("span",null,"**需求：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"计算一个字符串中每个字符出现次数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**分析：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. 获取一个字符串对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 创建一个Map集合，键代表字符，值代表次数。")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 遍历字符串得到每个字符。")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 判断Map中是否有该键。")]),s(`
`),n("span",{class:"line"},[n("span",null,"5. 如果没有，第一次出现，存储次数为1；如果有，则说明已经出现过，获取到对应的值进行++，再次存储。")]),s(`
`),n("span",{class:"line"},[n("span",null,"6. 打印最终结果")])])])])],-1)])])}const y=a(i,[["render",t]]);export{o as __pageData,y as default};
