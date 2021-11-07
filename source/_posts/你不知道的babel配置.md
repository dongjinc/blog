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
