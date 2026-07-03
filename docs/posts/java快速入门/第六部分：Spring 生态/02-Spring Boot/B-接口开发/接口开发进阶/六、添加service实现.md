---
title: 六、添加service实现
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
```
package com.mincheng.construction.service.impl;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mincheng.construction.entity.Menus;
import com.mincheng.construction.mapper.MenusMapper;
import com.mincheng.construction.service.MenusService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
@Service
public class MenusServiceImpl extends ServiceImpl\<MenusMapper, Menus\>
        implements MenusService {
    @Override
    public IPage\<Menus\> list(Menus vo) {
        final QueryWrapper\<Menus\> wrapper = new QueryWrapper\<\>();
        wrapper.eq(ObjectUtils.isNotEmpty(vo.getId()), "id", vo.getId());
        return MenusService.super.page(new Page\<\>(vo.getCurrentPage(), vo.getPageSize()), wrapper);
    }
    @Override
    public Menus getOne(Menus vo) {
        final QueryWrapper\<Menus\> wrapper = new QueryWrapper\<\>();
        wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());
        return super.getOne(wrapper);
    }
    @Override
    public boolean saveOrUpdate(Menus vo) {
        return super.saveOrUpdate(vo);
    }
    @Override
    public boolean delete(Menus vo) {
        final QueryWrapper\<Menus\> wrapper = new QueryWrapper\<\>();
        wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());
        return super.remove(wrapper);
    }
}
```
