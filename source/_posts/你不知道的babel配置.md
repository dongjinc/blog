---
title: 你不知道的babel配置;
tags: .babelrc.json 、 babel.config.js
---

# 个人疑问 🤔️

## .babelrc.json 、 babel.config.js 与 webpack 中的 babel-loader 有什么关系吗

- 通过 webpack 配置 babel-loader 时，babel-loader 源码会读取根项目中 .babelrc.json 和 babel.config.js 配置文件

  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader", // webpack可只单独定义 babel-loader，对于 presets、plugins 可在 .babelrc.json和babel.config.js文件内配置
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "49",
                  },
                },
              ],
            ],
          },
        },
      },
    ];
  }
  ```

  ```json
  // .babelrc.json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "chrome": "49"
          }
        }
      ]
    ]
  }
  ```

- 配置优先级

  - babel.config.json < .babelrc < programmatic options from @babel/cli (babel-cli 配置)
  - 换句话说 babel.config.json 文件会覆盖 .babelrc.json 会覆盖 programmatic options from @babel/cli (babel-cli 配置)

- 如何合并配置项呢？(How Babel merges config items)

  - 当配置选项存在时(their value is not undefined)，将会被优先级的配置文件所覆盖，一些场景比较特殊(a few special cases)

    - 1.对于 assumptions、parserOpts and generatorOpts 对象将会合并，而不是替换
    - 2.对于 plugins and presets，他们将会根据 plugins/preset 对象或函数本身的名称进行替换

  - As an example, consider a config with(assumptions、parserOpts merging)

    ```json
        {
            "sourceType": "script",
            "assumptions": {
                "setClassFields": true,
                "iterableIsArray": false
            },
            "env": {
                "test": {
                    "sourceType": "module",
                    "assumptions": {
                        "iterableIsArray": true,
                    },
            }
            }
        };
    ```

  - When NODE_ENV is test, the sourceType option will be replaced and the assumptions option will be merged. The effective config is:

    ```json
    {
      "sourceType": "module", // sourceType: "script" is overwritten
      "assumptions": {
        "setClassFields": true,
        "iterableIsArray": true // assumptions are merged by Object.assign
      }
    }
    ```

  - Plugin/Preset merging

  ```json
  {
    "plugins": ["./other", ["./plug", { "thing": true, "field1": true }]],
    // will merge config file 👇
    "overrides": [
      {
        "plugins": [["./plug", { "thing": false, "field2": true }]]
      }
    ]
  }
  // 下面 overrides 项将会合并到顶层的 plugins 选项中，其中 plugins 作为数组并不会讲整个内容覆盖 顶层 plugins 中，合并逻辑是看 ".plug" 在两者之间是否是一样的插件，如果一样 {thing: false, field2: true}, 将会覆盖源选项配置，结果如下：
  ```

  ```json
  {
    "plugins": ["./other", ["./plug", { "thing": false, "field2": true }]]
  }
  ```

  - 合并是基于 identity("plugins") + name ("./other")，如果使用相同的 plugins/presets 数组两次，将被认为是错误的

    ```json
    {
        "plugins": ["./plug", "./plug"];
    }
    ```

  - 甚至以下操作也会存在错误：

    ```json
    {
      "plugins": [
        ["./plug", { "one": true }],
        ["./plug", { "two": true }]
        // 因为 第二个总会覆盖第一个
      ]
    }
    ```

    - 如果实例化插件的两个实例时，必须给每个实例分配一个名称，以消除它们的歧义

    ```json
    {
      "plugins": [
        ["./plug", { "one": true }, "first-instance-name"],
        ["./plug", { "two": true }, "second-instance-name"]
      ]
    }
    // 因此每个实例赋予了唯一的名称，因此具有唯一的身份性
    // because each instance has been given a unique name and thus a unique identity.
    ```

## 在 单一仓库 (monorepo) 模式下，使用.babelrc 时，引用其他 package 内容，不会被 babel，导致浏览器无法识别引用的内容而报错，例如 引用某个 react 组件，未经过 react-loader，从而导致报错。

- 在 babel 官方配置中提到，不同场景 使用不同的 babel 文件配置 https://www.babeljs.cn/docs/configuration#%E4%BD%BF%E7%94%A8-cli-babelcli

- .babelrc 与 babel.config.json 的不同
  - 覆盖维度不同
    - 项目范围配置 babel.config.js 具有不同的扩展名 (.js, .cjs, .mjs)
    - 文件相关配置 .babelrc.json、package.json 其中 .babelrc.json 具有不同的扩展名 (.babelrc, .js, .cjs, .mjs)
- 项目范围配置(Project-wide configuration)

  - 在新版本 babel7.x 中，babel 含有“root”目录概念，其默认是当前工作站的目录文件。对于项目范围配置，在“root”目录下 babel 将会自动搜索 babel.config.json 文件，或所支持的扩展名(例如: 在 👆 所提到的，babel.config.js、babel.config.cjs、babel.config.mjs)。或者用户可以通过 "configFile"值显示声明配置文件搜索的行为。
  - 由于项目范围配置文件与配置文件物理位置分开，因此其非常适合广泛应用配置。甚至允许通过 plugins 和 presets 轻松的应用于 node_modules 或符号链接包中的文件。
  - 这个项目范围配置主要缺点，依赖于工作目录，如果当前是非 monorepo 的根据目录，则在 monorepo 中使用会非常痛苦。如何利用好此配置，需要参考 monorepo 文档

- 文件相关配置(File-relative configuration) - https://www.babeljs.cn/docs/config-files
  Searching will stop once a directory containing a package.json is found, so a relative config only applies within a single package.
