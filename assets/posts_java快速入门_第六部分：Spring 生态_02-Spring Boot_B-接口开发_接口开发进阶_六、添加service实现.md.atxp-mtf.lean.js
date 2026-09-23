import{_ as a,o as l,c as p,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"六、添加service实现","description":"","frontmatter":{"title":"六、添加service实现","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/六、添加service实现.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/六、添加service实现.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/六、添加service实现.md"};function r(t,s,c,o,u,m){return l(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"package com.mincheng.construction.service.impl;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.core.metadata.IPage;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.extension.plugins.pagination.Page;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.mincheng.construction.entity.Menus;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.mincheng.construction.mapper.MenusMapper;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import com.mincheng.construction.service.MenusService;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import org.apache.commons.lang3.ObjectUtils;")]),e(`
`),n("span",{class:"line"},[n("span",null,"import org.springframework.stereotype.Service;")]),e(`
`),n("span",{class:"line"},[n("span",null,"@Service")]),e(`
`),n("span",{class:"line"},[n("span",null,"public class MenusServiceImpl extends ServiceImpl\\<MenusMapper, Menus\\>")]),e(`
`),n("span",{class:"line"},[n("span",null,"        implements MenusService {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),e(`
`),n("span",{class:"line"},[n("span",null,"    public IPage\\<Menus\\> list(Menus vo) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        final QueryWrapper\\<Menus\\> wrapper = new QueryWrapper\\<\\>();")]),e(`
`),n("span",{class:"line"},[n("span",null,'        wrapper.eq(ObjectUtils.isNotEmpty(vo.getId()), "id", vo.getId());')]),e(`
`),n("span",{class:"line"},[n("span",null,"        return MenusService.super.page(new Page\\<\\>(vo.getCurrentPage(), vo.getPageSize()), wrapper);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),e(`
`),n("span",{class:"line"},[n("span",null,"    public Menus getOne(Menus vo) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        final QueryWrapper\\<Menus\\> wrapper = new QueryWrapper\\<\\>();")]),e(`
`),n("span",{class:"line"},[n("span",null,'        wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());')]),e(`
`),n("span",{class:"line"},[n("span",null,"        return super.getOne(wrapper);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),e(`
`),n("span",{class:"line"},[n("span",null,"    public boolean saveOrUpdate(Menus vo) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        return super.saveOrUpdate(vo);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),e(`
`),n("span",{class:"line"},[n("span",null,"    public boolean delete(Menus vo) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        final QueryWrapper\\<Menus\\> wrapper = new QueryWrapper\\<\\>();")]),e(`
`),n("span",{class:"line"},[n("span",null,'        wrapper.eq(ObjectUtils.allNotNull(vo.getId()), "id", vo.getId());')]),e(`
`),n("span",{class:"line"},[n("span",null,"        return super.remove(wrapper);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(i,[["render",r]]);export{d as __pageData,g as default};
