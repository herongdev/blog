---
title: "自定义react组件：Img，图片获取失败时能显示指定的默认图片"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "自定义 react 组件， Img ，图片获取失败时能显示指定的默认图片。 图片加载失败就显示默认图片。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/自定义react组件：Img，图片获取失败时能显示指定的默认图片.md"
---
::: v-pre

# 自定义react组件：Img，图片获取失败时能显示指定的默认图片

> 本节目标：理解“自定义react组件：Img，图片获取失败时能显示指定的默认图片”的核心思路，并能把它用于实际开发或面试表达。
自定义`react`组件，`Img`，图片获取失败时能显示指定的默认图片。

```
import React from 'react';
import ReactDOM from 'react-dom';
/**
 *
```

图片加载失败就显示默认图片

```
 */
class Img extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.imageUrl
        };
    }
    handleImageLoaded() {
    }
    handleImageErrored() {
        this.setState({
            imageUrl: this.props.defaultImg
        });
    }
    render() {
        return (
            <img style={this.props.style}
                src={this.state.imageUrl}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}
export default Img;
```

:::
