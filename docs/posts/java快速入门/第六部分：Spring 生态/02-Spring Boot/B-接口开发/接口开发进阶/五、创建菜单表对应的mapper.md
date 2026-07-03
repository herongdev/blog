---
title: 五、创建菜单表对应的mapper
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
```
packagecom.mincheng.construction.mapper;
importcom.baomidou.mybatisplus.core.mapper.BaseMapper;
importcom.mincheng.construction.entity.Menus;
importorg.apache.ibatis.annotations.Mapper;

@Mapper
Public

interface MenusMapper extends BaseMapper\<Menus\>{
}
```
