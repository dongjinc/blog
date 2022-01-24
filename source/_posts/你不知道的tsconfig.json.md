---
title: 你不知道的tsconfig.json
tags: 
---

## include
- include属性作用是指定编译需要编译的文件或目录
- 编译指定文件后, vscode将会快速提示指定文件内容
    ```json
        {
            // ...
        "include": [
                // "scr" // 会编译src目录下的所有文件，包括子目录
                // "scr/*" // 只会编译scr一级目录下的文件
                "scr/*/*" // 只会编译scr二级目录下的文件
             ]
        }
    ```

## paths(**compilerOptions**)
- 指定一组将导入重新映射到其他查找位置的条目。
- 通过简写方式, 找到指定目录下相关文件
    ```json
        "compilerOptions" : {
            "paths": {
                "*": ["node_modules/*"],
                "@*": ["./app*"],
                "@src*": ["./src*"],
                "@interface*": ["./src/interface"],
                "@workspace*": ["./src/pages/workspace*"],
                "@home*": ["./src/pages/meijian-meijian-site-main-home*"],
                "@searchMaterial*": ["./src/pages/meijian-meijian-site-search-material*"],
                "@yong*": ["./mj-common-base*"]
            }
        }
        // 例如:  "@yong*": ["./mj-common-base*"]
        // ./mj-common-base/Love.tsx
        // 引用时 
        // import { Love } from "@yong/Love"

        // 例如:  "@yong*": ["./mj-common-base/*"]
        // ./mj-common-base/Love.tsx
        // 引用时 
        // import { Love } from "@yongLove" // 要理解这个 * 匹配方式

    ```


## removeComments(**compilerOptions**)
- 移除代码中注释
    ```json
        {
            "compilerOptions": {
                "removeComments": true,
            }
        }
    ```

## strictNullChecks(**compilerOptions**)
- 开启null、undefined检测
```json
    {
        "compilerOptions": {
            "strictNullChecks": true
        }
    }
```


## 参考 
- https://segmentfault.com/a/1190000022809326