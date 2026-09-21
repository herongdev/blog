---
title: "Component & PureComponent"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "纯组件是通过控制 shouldComponentUpdate 生命周期函数，减少 render 调用次数来优化性能的。 优点： 减少了手动判断 state 变化的繁琐操作 缺点： 浅比较：它只能进行一层浅比较，只比较 props 和 state 的内存地址，如果内存地址相同，则。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Component & PureComponent.md"
---
::: v-pre

# Component & PureComponent

> 本节目标：理解“Component & PureComponent”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
纯组件是通过控制`shouldComponentUpdate`生命周期函数，减少`render`调用次数来优化性能的。

**优点：**

- 减少了手动判断`state`变化的繁琐操作

**缺点：**

- 浅比较：它只能进行一层浅比较，只比较`props`和`state`的内存地址，如果内存地址相同，则`shouldComponentUpdate`生命周期就返回`false`。

**应用：**
`PureComponent`的使用场景应该是局部数据发生改变的场景，比如带有输入框、`switch`开关等的`UI`组件就可以使用`PureComponent`组件封装。`PureComponent`如果有数据操作最好配合`Immutable`一起使用，因为`Immutable`可以保证数据的不变性。`Immutable`需要使用`npm`安装方可以使用。

```
**Component & PureComponent**
==这两个类基本相同，唯一的区别是====PureComponent====的原型上多了一个标识==
==if== ==(ctor.prototype && ctor.prototype.isPureReactComponent) {======  ==return== ==(======    ==!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)======  ==);========}==
==这是检查组件是否需要更新的一个判断，====ctor====就是你声明的继承自====Component or PureComponent====的类，他会判断你是否继承自====PureComponent====，如果是的话就====shallowEqual====比较====state====和====props====。==
```

==顺便说一下：==**React****中对比一个****ClassComponent****是否需要更新，只有两个地方。一是看有没有****shouldComponentUpdate****方法，二就是这里的****PureComponent****判断**

**示例：**将输入框组件使用`PureComponent`进行了封装。

```
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountNum: '',
            initPassword: '',
            userName: '',
        };
    }
    componentDidMount() {
    }
    onChangeText = (text, label) => {
        this.setState({ [label]: text });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#faf7f7" }}>
                <InputItem label={'
```

账号

```
:'} holder={'
```

请输入账号

```
'} itemValue={this.state.accountNum} handleChangeText={this.onChangeText} keyboardType={'default'} />
                <InputItem label={'
```

初始密码

```
:'} holder={'
```

请输入初始密码

```
'} itemValue={this.state.initPassword} handleChangeText={this.onChangeText} keyboardType={'numeric'} />
                <InputItem label={'
```

姓名

```
:'} holder={'
```

请输入姓名

```
'} itemValue={this.state.userName} handleChangeText={this.onChangeText} keyboardType={'default'} />
            </View>
        )
    }
}
```

```
class InputItem extends React.PureComponent {
    render() {
        let { label, holder, itemValue, handleChangeText, keyboardType } = this.props;
        console.log('renderInputItem', itemValue);
        return (
            <View style={styles.inputItemContainer}>
                <Text style={{ fontSize: 14, color: '#000' }}>{label}</Text>
                <TextInput
                    style={styles.customerInput}
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={"#cdcdcd"}
                    placeholder={holder}
                    defaultValue={itemValue}
                    keyboardType={keyboardType}
                    onChangeText={(text) => handleChangeText(text, itemValue)}
                    numberOfLines={1} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputItemContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    customerInput: {
        flex: 1,
        minHeight: 25,
        paddingHorizontal: 10,
        paddingVertical: 0,
        textAlign: 'right',
        fontSize: 14,
        color: '#333',
    },
});
```
 我们都对在输入框中输入内容，==InputItem==也没有进行重绘。**运行效果图如下：**

```
**控制台打印如下：**
```

这里如果我们不使用==PureComponent==，则会多次调用render函数，造成无意义的资源浪费。如果我们封装的是其它的组件，比如==Switch==，则也只有state被修改的那一项被修改，感兴趣的童鞋可以动手自己试一下。

:::
