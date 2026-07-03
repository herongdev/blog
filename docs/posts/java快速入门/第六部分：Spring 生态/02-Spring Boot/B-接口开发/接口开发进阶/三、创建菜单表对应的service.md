---
title: 三、创建菜单表对应的service
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
```
package com.mincheng.construction.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mincheng.construction.entity.Menus;
public interface MenusService extends IService\<Menus\> {

    /**
     *
查询列表

     *
     * @param vo vo
     * @return IPage\<Menus\>
     */
    IPage\<Menus\> list(Menus vo);

    /**
     *
单个查询

     *
     * @param vo vo
     * @return Menus
     */
    Menus getOne(Menus vo);

    /**
     *
保存

     *
     * @param vo vo
     * @return
是否保存成功

     */
    @Override
    boolean saveOrUpdate(Menus vo);

    /**
     *
删除

     *
     * @param vo vo
     * @return
是否删除成功

     */
    boolean delete(Menus vo);
}
组织及部门

 service
package com.mincheng.construction.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mincheng.construction.entity.Organization;
public interface OrganizationService extends IService\<Organization\> {
    IPage\<Organization\> list(Organization vo);
    Organization getOne(Organization vo);
    @Override
    boolean saveOrUpdate(Organization vo);
    boolean delete(Organization vo);
}
```
