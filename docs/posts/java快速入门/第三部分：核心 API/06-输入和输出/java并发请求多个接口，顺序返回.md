---
title: java并发请求多个接口，顺序返回
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
最近有个需求，从一个`api`拿数据，但是`api`时间参数又有范围限制，因此需要自己将时间分成多段，多次请求`api`，并且最终返回的数据需要保持原有的顺序

package com.test001.www.threadpool;

import java.util.LinkedList;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ThreadPoolTest {

    public static void main(String[] args){
        ArrayThreadPool\<User\> pool = new ArrayThreadPool\<\>();
        for (int i = 5; i \> 0; i--){
            Integer data = i;
            pool.submit(()-\>{￼//
==这个地方可以写一个函数，参数可以从外层传入==

               System.out.println("
==网络操作开始==

"+data);
               Thread.sleep(data*1000);
               System.out.println("
==网络操作结束==

"+data);
               return new User(data);
            });
        }
        List\<User\> users = pool.get();
        for (User u :users){
            System.out.println(u);
        }
        pool.stop();
    }
}

class User{
    private int i;
    public User(int a){
        i=a;
    }

    @Override
    public String toString() {
        return "user="+i;
    }
}

class ArrayThreadPool\<T\>{
    private Vector\<Future\<T\>\> futureList = new Vector\<\>();
    ExecutorService executor = Executors.newCachedThreadPool();
    public ArrayThreadPool submit(Callable\<T\> task){
        Future\<T\> result = executor.submit(task);
        futureList.add(result);
        return this;
    }

    public List\<T\> get(){
        List\<T\> result = new LinkedList\<\>();
        for (Future\<T\> future :
                futureList) {
            try {
                result.add(future.get());
            }catch (Exception e){
                result.add(null);
            }

        }
        return result;
    }

    public void stop(){
        executor.shutdown();
    }
}
 使用`java`自带线程池实现

\> 来自

 \<https://www.shuzhiduo.com/A/8Bz88PK6zx/\>
```
