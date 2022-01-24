---
title: 快速开发vscode插件
tags: snippets
---

## 背景

- 在开发 cms 后端时,发现需要常常翻阅组件文档,效率大大降低

## 前置包的安装

- npm i vsce -g // 必须要 nodejs > 14.0.0
- npm i yo / generator-code -g

## 安装包解读
- yo(yeoman)、generator-code(vs code extension generator)


## 详细解读

- 字段解读(必填项)

```json
    // package.json
    "name": "yo-snippets", 项目名称
    "displayName": "love", marketplace展示的名称
    "description": "yo-snippets", 描述
    "publisher": "yo-snippets", 发布者
    "version": "0.0.1", 版本
```

- 编写 snippets

```json
// in file 'Code/User/snippets/javascript.json'
{
  "For Loop": {
    "scope": ["javascript"], // 作用范围 scope
    "prefix": ["for", "for-const"], // 触发前缀
    "body": ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"], // 插入的文本内容
    "description": "A for loop." // 代码片段描述
  }
}
// prefix 定义一个或多个触发代码片段的智能提示、子字符串首字母,如fc,将会匹配到for-const
// body 可以定义变量
// description 定义代码片段智能提示描述
```
## 常用语法解读(syntax)
- Tabstops $1 - $n 根据 tab 键来进行光标位置调整 
  - $1 - $n
  - $0
  - $1, $1 同一制表位的多次出现被链接并同步更新

- Placeholders ${1: foo} 占位符文本将会被插入并且选中. 并且占位符可以嵌套
  - like ${1:another ${2:placeholder}}.
  

## 调试
- Debugging the extension
https://code.visualstudio.com/api/get-started/your-first-extension

## 打包

## 安装方式

- vscode marketplace -> install from VSIX
- 发布官方应用市场,不需要审核

## 两种方式发布

- vsce publish 命令方式
- https://marketplace.visualstudio.com/manage/publishers/yo-snippets 通过 New extension

## 常用命令

- vsce login <publisher name>
- vsce package // generated xx.vsix
- vsce publish <version - 0.0.1>// published to Vs code market-place
- vsce --help

## 常用地址

- https://marketplace.visualstudio.com/manage/publishers/yo-snippets 版本管理
- https://marketplace.visualstudio.com/manage/publishers/yo-snippets/extensions/yo-snippets/hub?_a=acquisition 数据统计

## 踩坑指南

- Missing publisher name. Learn more: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions
  ```
      A publisher is an identity who can publish extensions to the Visual Studio Code Marketplace. Every extension needs to include a publisher name in its package.json file.
  ```
- The Personal Access Token verification has failed. Additional information: // 注意 package.json - publisher name
- TF400898: An Internal Error Occurred. Activity Id: 587a31af-2cd4-40ae-bed1-acd5c03723a4. // 注意 package.json - displayName

## 遗留问题

- package.json path 能否 \* 匹配

```json
     "contributes": {
        // 为语言添加代码片段。language属性必须是语言标识符而path则必须是使用VS Code代码片段格式的代码片段文件的相对路径。
        "snippets": [
            {
                // each language mode has a unique specific language identifier,
                // https://code.visualstudio.com/docs/languages/identifiers
                "language": "javascript", //可设置代码片段在哪些文件可以生效，不填全部生效
                "path": "./snippets/snippets.code-snippets"
            },
            {
                "language": "javascriptreact",
                "path": "./snippets/snippets.code-snippets"
            }
        ]
    }
```

## 参考资料

- https://www.bookstack.cn/read/VS-Code-Extension-Doc-ZH/docs-extensibility-reference-contribution-points.md#q6kra
- https://juejin.cn/post/6960181050794803236
- https://juejin.cn/post/7020243614387142664
- https://zhuanlan.zhihu.com/p/455809528?utm_source=com.tencent.wework&utm_medium=social&utm_oi=749748404543832064
- https://code.visualstudio.com/docs/editor/userdefinedsnippets

- https://juejin.cn/post/6993875945819996197
