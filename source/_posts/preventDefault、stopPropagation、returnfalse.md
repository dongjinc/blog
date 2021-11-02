---
title: preventDefault、stopPropagation、return false区别
tags:
demo: demo1.html
---

## 事件传播

- javascript 中两种事件传播模式
  - 捕获模式
  - 冒泡模式
- 简言之：两种模式就是为了决定：html 元素接收到事件的顺序

## 捕获模式

- 该事件最先被最外层元素接收到，然后依次向内层元素传播(自上而下)

## 冒泡模式

- 该事件最先被最内层元素接收到，然后一次向外层元素传播(自下向上)

- IE9 以下仅仅支持冒泡模式，但 IE9+主流浏览器都支持两种模式

## 声明方式 addEventListener(type, listener, useCapture) 第三个参数默认为 false 冒泡模式

## preventDefault 和 stopPropagation 函数区别

- a 标签 href 为空时，会立即跳转到当前页面，这是链接元素的默认特性。如果不想要这个默认特性被执行时，可以通过 preventDefault 阻止元素的默认特性。

- stopPropagation 在使用冒泡模式时，阻止事件继续往上传播，可以使用 stopPropagation

- return false jQuery 中提供的快捷方式(原生方法不支持~)
  ```js
  return false;
  // 等同于
  event.preventDefault();
  event.stopPropagation();
  ```
