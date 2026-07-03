---
title: 四、创建菜单表对应的controller
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
包含基本的增删改查接口
`package com.mincheng.construction.controller;`

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.mincheng.construction.entity.Menus;
import com.mincheng.construction.service.MenusService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;

`@Api(tags = "`菜单表

")
@RestController
@RequestMapping("/menus")
public class MenusController{

    @Resource
    private MenusService menusService;

    @PostMapping("/list")
    @ApiOperation(value = "
列表`", notes = "`菜单表

")
    public IPage\<Menus\> list(@RequestBody Menus menus) {
        return menusService.list(menus);
    }

    @PostMapping("/getOne")
    @ApiOperation(value = "
单个查询`", notes = "`菜单表

")
    public Menus getOne(@RequestBody Menus menus) {
        return menusService.getOne(menus);
    }

    @PostMapping("/save")
    @ApiOperation(value = "
新增或编辑`", notes = "`菜单表

")
    public boolean save(@RequestBody Menus menus) {
        return menusService.saveOrUpdate(menus);
    }

    @PostMapping("/delete")
    @ApiOperation(value = "
删除`", notes = "`菜单表

")
    public boolean delete(@RequestBody Menus menus) {
        return menusService.delete(menus);
    }

`}`

组织机构controller
`package com.mincheng.construction.controller;`

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.mincheng.construction.entity.Organization;
import com.mincheng.construction.service.OrganizationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;

`@Api(tags ="`菜单表

")
@RestController
@RequestMapping("/organization")
public class OrganizationController {
    @Resource
    private OrganizationService organizationService;

    @PostMapping("/list")
    @ApiOperation(value = "
列表`",notes = "`组织机构表

")
    public IPage\<Organization\> list(@RequestBody Organization organization){
        return organizationService.list(organization);
    }

    @PostMapping("/getOne")
    @ApiOperation(value = "
单个查询`",notes = "`菜单表

")
    public Organization getOne(@RequestBody Organization organization){
        return organizationService.getOne(organization);
    }

    @PostMapping("/save")
    @ApiOperation(value = "
新增或编辑`",notes = "`菜单表

")
    public boolean save(@RequestBody Organization organization){
        return organizationService.saveOrUpdate(organization);
    }

    @PostMapping("/delete")
    @ApiOperation(value = "
删除`",notes = "`菜单表

")
    public boolean delete(@RequestBody Organization organization){
        return organizationService.delete(organization);
    }
}
```
