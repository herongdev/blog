---
title: 最全Gson使用介绍，通俗易懂
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
`2` 人赞同了该文章
`Gson`介绍
`GSON`是`Google`提供的用来在`Java`对象和`JSON`数据之间进行映射的`Java`类库。可以将一个`Json`字符转成一个`Java`对象，或者将一个`Java`转化为`Json`字符串
在使用`Gson`时需要先引入`Gson`依赖

\<!-- https://mvnrepository.com/artifact/com.google.code.gson/gson --\>\<dependency\>\<groupId\>com.google.code.gson\</groupId\>\<artifactId\>gson\</artifactId\>\<version\>2.8.5\</version\>\</dependency\>
Gson
使用
`1.` 简单对象 序列化`/`反序列化
序列化：

/**￼     *
_简单对象转_

Json￼     *￼     * @param obj￼     * @return￼     */publicstaticStringsimpleObjToJson(Objectobj){if(Objects.isNull(obj))return"";try{Gsongson=newGson();returngson.toJson(obj);}catch(Exceptione){e.printStackTrace();}return"";}
 测试：

@TestvoidGsonUtilTest(){//
_简单对象转_

`json￼Useruser=newUser(1,"`

==张三==

",18);Stringjson=GsonUtil.simpleObjToJson(user);System.out.println(json);}
 结果：

{"id":1,"name":"
==张三==

","age":18}
 如果对象中存在空值：
先看一下`user`对象中的数据类型

@Data@AllArgsConstructor@NoArgsConstructorpublicclassUser{privateintid;privateStringname;privateIntegerage;publicUser(Stringname,Integerage){this.name=name;this.age=age;}publicUser(Stringname){this.name=name;}}
 测试：

@TestvoidGsonUtilTest(){//
_简单对象转_

`json￼Useruser=newUser("`

==张三==

");Stringjson=GsonUtil.simpleObjToJson(user);System.out.println(json);}
 结果：

{"id":0,"name":"
==张三==

"}
 可以看出基本类型有默认值，包装类不解析
反序列化：

/**￼     *
_简单_`Json`_转对象_

￼     *￼     * @param json￼     * @param cls￼     * @param \<T\>￼     * @return￼     */publicstatic\<T\>TsimpleJsonToObj(Stringjson,Class\<T\>cls){Gsongson=newGson();if(Objects.isNull(json))returnnull;Tobj=gson.fromJson(json,cls);if(Objects.isNull(obj)){returnnull;}else{returnobj;}}
 测试：

@Testvoidtest2(){Stringjson="{\"id\":1,\"name\":\"
==张三==

\",\"age\":18}";Useruser=GsonUtil.simpleJsonToObj(json,User.class);System.out.println(user);}
 结果：

`User(id=1,name=`

==张三==

- ,age=18)
- 2.

复杂对象 序列化`/`反序列化（对象中嵌套对象）
同简单对象一样
序列化：
复杂对象：

@Data@AllArgsConstructor@NoArgsConstructorpublicclassUser{privateintid;privateStringname;privateIntegerage;privateJobjob;privateList\<String\>nickName;publicUser(intid,Stringname,Integerage){this.id=id;this.name=name;this.age=age;}}@DatapublicclassJob{privateStringjobName;privateStringcompany;}/**￼     *
_复杂对象转_

Json￼     * ￼     * @param obj￼     * @return￼     */publicstaticStringcomplexObjToJson(Objectobj){if(Objects.isNull(obj))return"";try{Gsongson=newGson();returngson.toJson(obj);}catch(Exceptione){e.printStackTrace();}return"";}
 测试：

@Testvoidtest3(){Useruser=newUser();user.setId(1);user.setName("
==张三==

");user.setAge(18);Jobjob=newJob();job.setJobName("Java
==开发==

");job.setCompany("
==某知名大厂==

");user.setJob(job);List\<String\>list=Arrays.asList("
==张三==

`","`

==法外狂徒==

`","`

==传奇人物==

");user.setNickName(list);Stringjson=GsonUtil.complexObjToJson(user);System.out.println(json);}
 结果：

{"id":1,"name":"
==张三==

","age":18,"job":{"jobName":"Java
==开发==

`","company":"`

==某知名大厂==

"},"nickName":["
==张三==

`","`

==法外狂徒==

`","`

==传奇人物==

"]}
 反序列化：

/**￼     *
_复杂_`Json`_转对象_

￼     *￼     * @param json￼     * @param cls￼     * @param \<T\>￼     * @return￼     */publicstatic\<T\>TcomplexJsonToObj(Stringjson,Class\<T\>cls){Gsongson=newGson();if(Objects.isNull(json))returnnull;Tobj=gson.fromJson(json,cls);if(Objects.isNull(obj)){returnnull;}else{returnobj;}}
 测试：

@Testvoidtest4(){Stringjson="{\"id\":1,\"name\":\"
==张三==`\",\"age\":18,\"job\":{\"jobName\":\"Java`==开发==`\",\"company\":\"`==某知名大厂==`\"},\"nickName\":[\"`==张三==`\",\"`==法外狂徒==`\",\"`==传奇人物==

\"]}";Useruser=GsonUtil.complexJsonToObj(json,User.class);System.out.println(user);}
 结果：

`User(id=1,name=`

==张三==

`,age=18,job=Job(jobName=Java`

==开发==`,company=`==某知名大厂==

`),nickName=[`

==张三==`,`==法外狂徒==`,`==传奇人物==

- ])
- 3.

数组 序列化`/`反序列化
这里数据序列化和上面一样，
反序列化又`=`有一点区别`String[] nameArray = gson.fromJson(namesJson,` `String[].class);`
工作中不常用，就不再详细介绍
`4. Map`和`List` 序列化反序列化
`Map`和`List`是工作中比较常用的，而且这两个操作比较相似：

- `List`序列化和反序列化 序列化：

    /**￼     * list To Json￼     *￼     * @param list￼     * @return￼     */￼    public static String listToJson(List list) {￼        if (Objects.isNull(list)) return "";￼        try {￼            Gson gson = new Gson();￼            return gson.toJson(list);￼        } catch (Exception e) {￼            e.printStackTrace();￼        }￼        return "";￼    }
 测试：

    @Test￼    void test6() {￼        List\<String\> list = new ArrayList\<\>();￼        list.add("zhangsan");￼        list.add("lisi");￼        list.add("wangwu");￼        String json = GsonUtil.listToJson(list);￼        System.out.println(json);￼    }
 结果：
`java ["zhangsan","lisi","wangwu"]`
反序列化： 这里反序列化时需要提供`Type`，通过`Gson`提供的`TypeToken\<T\>.getType()`方法可以定义当前`List`的

Type
    /**￼     * json to list￼     * ￼     * @param json￼     * @param cls￼     * @param \<T\>￼     * @return￼     */￼    public static \<T\> T jsonToList(String json,Class\<T\> cls) {￼        if (Objects.isNull(json)) return null;￼        try {￼            Gson gson = new Gson();￼          	//
==需要注意这里的==

type￼            Type type = new TypeToken\<ArrayList\<T\>\>(){}.getType();￼            return gson.fromJson(json, type);￼        } catch (Exception e) {￼            e.printStackTrace();￼        }￼        return null;￼    }
 测试：

    @Test￼    void test7() {￼        String json = "[{\"id\":1,\"name\":\"zhangsan\",\"age\":18},{\"id\":2,\"name\":\"sili\",\"age\":28}]";￼        System.out.println(GsonUtil.jsonToList(json, User.class));￼    }
 结果：
`json [{id=1.0, name=zhangsan, age=18.0}, {id=2.0, name=sili, age=28.0}]`

- `Map` 序列化和反序列化

和`List`一样
`Gson`进阶用法
`1.` 指定序列化和反序列化 字段名称
这个用法是常用的，尤其在解析第三方接口返回数据时，可以指定字段名称解析
实体类加`@SerializedName`注解

@Data@AllArgsConstructor@NoArgsConstructorpublicclassUser{privateintid;@SerializedName("login_name")privateStringname;privateIntegerage;privateJobjob;privateList\<String\>nickName;publicUser(intid,Stringname,Integerage){this.id=id;this.name=name;this.age=age;}}
 反序列化测试：

@Testvoidtest8(){Stringjson="{\"id\":1,\"login_name\":\"
==张三==

\",\"age\":18}";Useruser=GsonUtil.complexJsonToObj(json,User.class);System.out.println(user);}
 结果：

`User(id=1,name=`

==张三==

- ,age=18,job=null,nickName=null)
- Gson

解析时会将 `login_name` 解析出的数据封装到 `name` 属性中
序列化测试：

@Testvoidtest9(){Useruser=newUser(1,"
==张三==

",18);System.out.println(GsonUtil.complexObjToJson(user));}
 结果：

{"id":1,"login_name":"
==张三==

","age":18}
 实际工作中用到场景：
我们工作中经常会需要调用第三方提供的接口，第三方接口数据有些字段命名不符合我们习惯，不如字段用下滑线而我们习惯驼峰命名，这是便可以用`@SerializedName`注解，这个注解还有一个属性`alternate`，`@SerializedName(value = "login_name", alternate = "name")`，此时这个注解意思是如果`Json`中是`login_name`就用`login_name`的值，如果是`name`就用`name`值。
`2.` 忽略解析某个值
有两种方式可以在解析是忽略某个值

- `@Expose`注解

@Data￼@AllArgsConstructor￼@NoArgsConstructor￼public class User {￼    @Expose()￼    private int id; //
==参与序列化==`/`==反序列化==

￼    @SerializedName("login_name")￼    @Expose(serialize = false,deserialize = false)￼    private String name; //
==不参与序列化，也不参与反序列化==

￼    @Expose(serialize = false, deserialize = true)￼    private Integer age; //
==只参与反序列化==

￼    @Expose(serialize = true, deserialize = false)￼    private Job job; //
==只参与序列化==

￼    ￼    private List\<String\> nickName;
public User(int id, String name, Integer age) {￼        this.id = id;￼        this.name = name;￼        this.age = age;￼    }￼}
 在使用这个注解时，就不能使用之前`gson`对象了，必须使用下面方式构建`gson`对象，该对象会排除没有注解的字段。

    public static String exposeObjToJson(Object obj) {￼        if (Objects.isNull(obj)) return "";￼        try {￼            GsonBuilder gsonBuilder = new GsonBuilder();￼            gsonBuilder.excludeFieldsWithoutExposeAnnotation();￼            Gson gson = gsonBuilder.create();￼            return gson.toJson(obj);￼        } catch (Exception e) {￼            e.printStackTrace();￼        }￼        return "";￼    }￼    public static \<T\> T exposeJsonToObj(String json, Class\<T\> cls) {￼        if (Objects.isNull(json)) return null;￼        try {￼            GsonBuilder gsonBuilder = new GsonBuilder();￼            gsonBuilder.excludeFieldsWithoutExposeAnnotation();￼            Gson gson = gsonBuilder.create();￼            return gson.fromJson(json, cls);￼        } catch (Exception e) {￼            e.printStackTrace();￼        }￼        return null;￼    }
- `transient`关键字

使用这个关键字，可以直接让变量不参与序列化`/`反序列化

@Data￼@AllArgsConstructor￼@NoArgsConstructor￼public class User {￼    @Expose()￼    private int id; //
==参与序列化==`/`==反序列化==

￼    @SerializedName(value = "login_name",alternate = "name")￼    @Expose(serialize = false,deserialize = false)￼    private String name; //
==不参与序列化，也不参与反序列化==

￼    @Expose(serialize = false)￼    private Integer age; //
==只参与反序列化==

￼    @Expose(deserialize = false)￼    private Job job; //
==只参与序列化==
`private transient List\<String\> nickName; // transient` ==关键字==

public User(int id, String name, Integer age) {￼        this.id = id;￼        this.name = name;￼        this.age = age;￼    }￼}
 使用该关键字时，直接用普通`new`的`gson`对象即可。
 \> 来自

 \<https://zhuanlan.zhihu.com/p/451745696\>
  \> 来自

 \<https://zhuanlan.zhihu.com/p/451745696\>
```
