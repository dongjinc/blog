---
title: escape、encodeURI和encodeURIComponent区别
tags:
---

## escape

- 对字符串(string)进行编码(而另外两种是对 url)
- 编码之后的效果 - %u680B%u54C8%u54C8%u54C8
- ASCII 字母、数字、@\*/+ 不会进行编码
- 此编码不适用于对 URL

## encodeURI 和 encodeURIComponent

- 两者都是编码 URL，唯一区别就是编码字符范围
- encodeURI 方法 不会对 **ASCII 字母、数字、~!@#$&\*()=:/,;?+'** 编码
- encodeURIComponent 方法 不会对 **ASCII 字母、数字、~!\*()'** 编码
- 所以 encodeURIComponent 比 encodeURI 编码范围更大

## 场景

- 如果只是编码字符串，与 URL 没任何关系，那么用 escape
- 如果你需要编码整个 URL，需要使用这个 URL，那么用 encodeURI
- 如果你需要编码整个 URL 当作参数时，使用 encodeURIComponent，这样可以对 “http://” 进行编码

```js
    https://www.baidu.com/?params=https%3A%2F%2Ftalent.baidu.com%2Fexternal%2Fbaidu%2Fcampus.html
```
