---
title: Spu与Sku
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
Spu与Sku

我们没必要单独对SKU的特有属性进行设计，它可以看做是规格参数中的一部分。这样规格参数中的属性可以标记成两部分：

所有SKU共享的规格属性（称为通用属性），我们记录在SPU表中

每个SKU不同的规格属性（称为特有属性），我们记录在SKU表中。

spu表：

CREATE TABLE

CREATE TABLE `tb_spu` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'spu id',
  `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '标题',
  `sub_title` VARCHAR(255) DEFAULT '' COMMENT '子标题',
  `cid1` BIGINT(20) NOT NULL COMMENT '1级类目id',
  `cid2` BIGINT(20) NOT NULL COMMENT '2级类目id',
  `cid3` BIGINT(20) NOT NULL COMMENT '3级类目id',
  `brand_id` BIGINT(20) NOT NULL COMMENT '商品所属品牌id',
  `saleable` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '是否上架，0下架，1上架',
  `valid` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '是否有效，0已删除，1有效',
  `create_time` DATETIME DEFAULT NULL COMMENT '添加时间',
  `last_update_time` DATETIME DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8 COMMENT='spu表，该表描述的是一个抽象性的商品，比如 iphone8'

spu_detail表：

CREATE TABLE

CREATE TABLE `tb_spu_detail` (
  `spu_id` BIGINT(20) NOT NULL,
  `description` TEXT COMMENT '商品描述信息',
  `specifications` VARCHAR(3000) NOT NULL DEFAULT '' COMMENT '全部规格参数数据',
  `spec_template` VARCHAR(1000) NOT NULL COMMENT '特有规格参数及可选值信息，json格式',
  `packing_list` VARCHAR(1000) DEFAULT '' COMMENT '包装清单',
  `after_service` VARCHAR(1000) DEFAULT '' COMMENT '售后服务',
  PRIMARY KEY (`spu_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

分开的来描述spu的原因是因为描述类的字段存储的数据内容较大，如果放在一超，会影响性能。表的水平拆分是将表的数据分开，减小表的大小，表的垂直拆分是将表的字段拆开，提高性能。

其中的
![Exported image](Exported%20image%2020260702234850-0.png)

SKU表

CREATE TABLE

CREATE TABLE `tb_sku` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'sku id',
  `spu_id` BIGINT(20) NOT NULL COMMENT 'spu id',
  `title` VARCHAR(255) NOT NULL COMMENT '商品标题',
  `images` VARCHAR(1000) DEFAULT '' COMMENT '商品的图片，多个图片以‘,’分割',
  `price` BIGINT(15) NOT NULL DEFAULT '0' COMMENT '销售价格，单位为分',
  `indexes` VARCHAR(100) DEFAULT '' COMMENT '特有规格属性在spu属性模板中的对应下标组合',
  `own_spec` VARCHAR(1000) DEFAULT '' COMMENT 'sku的特有规格参数键值对，json格式，反序列化时请使用linkedHashMap，保证有序',
  `enable` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '是否有效，0无效，1有效',
  `create_time` DATETIME NOT NULL COMMENT '添加时间',
  `last_update_time` DATETIME NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`),
  KEY `key_spu_id` (`spu_id`) USING BTREE
) ENGINE=INNODB AUTO_INCREMENT=27359021555 DEFAULT CHARSET=utf8 COMMENT='sku表,该表表示具体的商品实体,如黑色的 64g的iphone 8'
其中indexes表明了页面现在所选的规格参数，以让页面准确显示

还有一张表，代表库存，库存变化最为频烦，所以拆分出来：
CREATE TABLE `tb_stock` (
  `sku_id` BIGINT(20) NOT NULL COMMENT '库存对应的商品sku id',
  `seckill_stock` INT(9) DEFAULT '0' COMMENT '可秒杀库存',
  `seckill_total` INT(9) DEFAULT '0' COMMENT '秒杀总数量',
  `stock` INT(9) NOT NULL COMMENT '库存数量',
  PRIMARY KEY (`sku_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='库存表，代表库存，秒杀库存等信息'
```
