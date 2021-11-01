---
title: 你不知道的jsconfig.json知识点
tags:
---

## Using webpack aliases# 可配合 webpack 别名使用，为 idea 提示文件相关作用域

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
// import Something from 'ClientApp/foo';
```
