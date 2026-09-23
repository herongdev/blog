import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"三、创建菜单表对应的service","description":"","frontmatter":{"title":"三、创建菜单表对应的service","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","Spring","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/三、创建菜单表对应的service.md","filePath":"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/三、创建菜单表对应的service.md"}'),i={name:"posts/java快速入门/第六部分：Spring 生态/02-Spring Boot/B-接口开发/接口开发进阶/三、创建菜单表对应的service.md"};function c(t,a,o,u,r,v){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"package com.mincheng.construction.service;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.core.metadata.IPage;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.extension.service.IService;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.mincheng.construction.entity.Menus;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface MenusService extends IService\\<Menus\\> {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"查询列表")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param vo vo")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return IPage\\<Menus\\>")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    IPage\\<Menus\\> list(Menus vo);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"单个查询")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param vo vo")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return Menus")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Menus getOne(Menus vo);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"保存")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param vo vo")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return")]),s(`
`),n("span",{class:"line"},[n("span",null,"是否保存成功")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boolean saveOrUpdate(Menus vo);")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /**")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"删除")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     *")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @param vo vo")]),s(`
`),n("span",{class:"line"},[n("span",null,"     * @return")]),s(`
`),n("span",{class:"line"},[n("span",null,"是否删除成功")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"     */")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boolean delete(Menus vo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"组织及部门")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," service")]),s(`
`),n("span",{class:"line"},[n("span",null,"package com.mincheng.construction.service;")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.core.metadata.IPage;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.baomidou.mybatisplus.extension.service.IService;")]),s(`
`),n("span",{class:"line"},[n("span",null,"import com.mincheng.construction.entity.Organization;")]),s(`
`),n("span",{class:"line"},[n("span",null,"public interface OrganizationService extends IService\\<Organization\\> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    IPage\\<Organization\\> list(Organization vo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Organization getOne(Organization vo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    @Override")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boolean saveOrUpdate(Organization vo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    boolean delete(Organization vo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const d=l(i,[["render",c]]);export{g as __pageData,d as default};
