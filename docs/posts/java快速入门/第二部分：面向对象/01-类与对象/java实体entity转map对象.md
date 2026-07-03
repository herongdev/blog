---
title: java实体entity转map对象
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 面向对象, OneNote]
---
方法一：一句搞定，直接返回`map`对象（弊端新的对象无法扩展字段）：

import org.springframework.cglib.beans.BeanMap;
BeanMap.create(entityObj);
 方法二：利用`fastjson`处理（如下方式`1`，快捷）

import com.alibaba.fastjson.JSONObject;
//
方式`1`、强转为

JSONObject
JSONObject xxx = (JSONObject) JSONObject.toJSON(xxxEntity);

//
方式`2`、转成`json`，在转为`map(`未验证，但是理论上没问题

)
String json = JSONObject.toJSONString(entityObj);
Map map = JSONObject.parseObject(json, Map.class);
​​​​​​​

方法三：利用反射（技术大佬可以尝试此方案）——详见原文

import com.example.pojo.SystemEntity;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;

public class test {
    public static void main(String[] arg){
    	SystemEntity systemEntity = new SystemEntity();
    	systemEntity.setName("
张三

");
        System.out.println(transitionEntitySe(systemEntity));
    	systemEntity.setName("
李四

");
        System.out.println(transitionEntitySe(systemEntity));
    }

`//`实体类转`HashMap-`第一种方法

    public static HashMap\<String,Object\> transitionEntity(Object onClass){
        HashMap\<String,Object\> hashMap = new HashMap\<String,Object\>();
        Method[] methods = onClass.getClass().getMethods();
        for(Method method:methods){
            try {
                //
获取方法时，默认会有`getClass,`需要排除

                if(method.getName().indexOf("get")==0&&!method.getName().equals("getClass")){
                    hashMap.put(method.getName().substring(3,4).toLowerCase()+method.getName().substring(4),method.invoke(onClass));
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return hashMap;
    }

`//`实体类转`HashMap-`第二种方法`-`建议

    public static HashMap\<String,Object\> transitionEntitySe(Object onClass){
        HashMap\<String,Object\> hashMap = new HashMap\<String,Object\>();
        Field[] fields = onClass.getClass().getDeclaredFields();
        for(Field field:fields){
            //
反射时让私有变量变成可访问

            field.setAccessible(true);
            try {
                hashMap.put(field.getName(),field.get(onClass));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return hashMap;
    }
}
实体类

public class SystemEntity {
    private int id;
    private String name;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
 执行结果
`{name=`张三

, id=0}
{name=
李四`, id=0}`
