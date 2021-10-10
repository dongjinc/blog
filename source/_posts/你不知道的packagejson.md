---
title: 你不知道的package.json知识点
tags:
---

### files @TODO:在开发 npm 包时，注意一下。

- 它描述了当您的包作为依赖项安装时所要包含的条目
- 可以在模块下创建一个‘.npmignore’文件，类似于‘.gitignore’，其中.npmignore 优先于 files 内的条目
- files 是指包含的文件夹或文件， .npmignore 是指排除项

### main

- main 字段是一个模块 id，它是程序的主要入口点。如果 name 包名为 foo，并且安装了它。通过 require('foo')/import 'foo'，那么主模块的导出对象将被返回。其中主模块文件就是 main 指定的文件
- 如果 main 未设置，默认为包根文件夹中的 index.js
- 如果要开发 npm 包时，main 指定的文件都是 dist/index.js，否则在通过 yarn link/npm link 会出现无法解析模块的错误

### browser

- 如果当前模块打算在客户端使用，则应该使用浏览器字段，而不是主字段(main)

### bin

- 用来指定各个内部命令对应的可执行文件的位置

```json
"bin": {
  "someTool": "./bin/someTool.js"
}
// someTool命令对应的可执行文件为bin子目录下的someTool.js
// npm会寻找这个文件，在node_modules/.bin/ 目录下建立符号链接
// node_modules/.bin/ 目录会在运行时加入系统的PATH变量。因此可直接通过命令来调用这些脚本
/** 步骤 **/
// 通过npm link将npm包注册到全局，使用 someTool 即可执行出对应内容、也可以通过npm link package方式引入其他项目内。会在当前项目node_modules/.bin/目录下注册 someTool脚本。

scripts: {
  start: './node_modules/bin/someTool.js build'
}
// 简写为
scripts: {
  start: 'someTool build'
}
```

- npm (-g) bin / yarn (global) bin 查看 bin 执行脚本的文件位置

### man

- man 命令是 Linux 下帮助的指令，通过 man 指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息
- 如果 npm 包是全局命令行工具，在 package.json 通过 man 属性可以指定 man 命令查找文档地址
- 如果 man 文件名称不是以模块名称开头的，安装时会给加上模块名称前缀 @TODO:
- 如果只提供了一个文件，那么它被安装为 man <pkgname>的结果

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": "./man/doc.1"
}
// 将会link./man/doc.1文件，通过 man foo(foo就是pkgname)
```

- 如果文件名不包含包名，将会为文件生成 man foo 和 man foo-bar

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/bar.1"]
}
```

- man 文件必须以数字结尾，如果它们被压缩，可选择一个.gz 结尾。数字指示了安装到安装到哪个 man 部分。换句话说，数字可以区分执行不同的 man 命令
- 下面例子：将会为 man foo 和 man 2 foo 创建条目/命令

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/foo.2"]
}
```

- 需要挂在全局，才可使用 man 命令。可通过 npm link 方式

### directories 规范项目目录

- commonjs 规范详细说明了使用 npm 包时的目录结构。
-  模块目录下除了必须包含的描述文件 package.json 以外，还需要包含以下目录
- bin: 存放可执行二进制文件目录。如果同时指定 bin 路径和设置 directory.bin 是错误的。如果要指定单个文件，请使用 bin，对于现有 bin 目录的所有文件，请使用目录.bin
- lib: 存放 js 代码的目录
- doc: 存放文档的目录
- test: 存放单元测试用例代码的目录
- 在模块目录中可能没有严格按照以上结构组织或命名，可通过 package.json 指定 directories 属性指定你的目录结构。

```json
"directories":{
    "bin":"./bin",
    "doc":"./doc",
    "lib":"./lib",
    "man":"./man"
}
```

### repository 存储库

- 指定线上代码存储的地方，对于想参与该项目、npm 包贡献者提供了信息

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react-dom"
  }
}
```

### scripts npm 脚本

- npm 允许在 package.json 文件里面，使用 scripts 字段定义脚本命令

```json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

- 通过使用 npm run xxx 命令可执行这段脚本

```js
$ npm run build
# 等同于执行
$ node build.js
```

- npm 脚本原理
  - 每当执行 npm run，就会自动新建一个 Shell，并在这个 Shell 里面执行指定的脚本命令
  - npm run 新建的这个 Shell，会讲当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样
  - 意味着，当前目录的 node_modules/.bin 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径
  ```json
    "test": "mocha test"
  ```
  - 而不必写成
  ```json
    "test": "./node_modules/.bin/mocha test"
  ```
- 通配符
  - 由于 npm 脚本就是 Shell 脚本，可以使用 Shell 通配符
  ```json
      "lint": "jshint *.js"
      "lint": "jshint **/*.js"
      <!-- *表示任意文件名 **表示任意一层子目录 -->
  ```
  - 如果将通配符传入原始命令，防止被 Shell 转义
  ```json
      "test": "tap test/\*.js"
  ```
- 传参

  - npm 脚本传入参数需要使用 -- 标明

  ```json
      "lint": "jshint **.js"
  ```

  - 向上面的 npm run lint 命令传入参数，必须写成

  ```js
    npm run lint --port=8080
  ```

- 常用的几种 npm 参数方式

  - 1.npm 命令行参数发送到 npm 脚本

  ```json
      格式：npm run [command] [--<args>]
     "scripts": {
        "start": "webpack-dev-server"
      },
      使用方式：npm start --port=8080
      通过process.argv获取
  ```

  - 2. 通过 package.json 中 config 配置

  ```json
     "config": {
         "myPort": "5000"
      }
    通过process.env.npm_package_config_myPort进行读取
  ```

  - 3.在 npm 脚本中设置 Param

  ```json
    "scripts": {
        "start:prod": "NODE_ENV=prod node server.js",
        "start:dev": "NODE_ENV=dev node server.js"
     }
     通过process.env.NODE_ENV读取
  ```

  - 4.通过 npm [--<args>] run-script [command]

  ```json
    "scripts": {
       "start": "webpack-dev-server"
    }
    使用方式：npm --port=8080 run-script start
    通过process.env.npm_config_port读取
  ```

  - 5.使用 $xxx

  ```json
    "scripts": {
        "start": "node ./script.js server $PORT"
    }
    使用方式：PORT=8080 npm start
    通过process.env.PORT
  ```

- 执行顺序

  - npm 脚本里面需要执行多个任务，需要明确它们的执行顺序
  - 如果并行执行（即同时的平行执行），可以使用&符号

  ```cmd
  $ npm run script1.js & npm run script2.js
  ```

  - 如果是继发执行（即只有前一个任务成功，才执行下一个任务），使用&&符号

  ```cmd
  $ npm run script1.js && npm run script2.js
  ```

  - 以上两个符号是 Bash 的功能，还可以使用 node 的任务管理模块 script-runner/npm-run-all/redrun

- 默认脚本

  - npm run start 默认值是 node server.js。前提是根目录下要有 server.js 文件
  - npm run install 默认是 node-gyp rebuild

- 钩子

  - npm 脚本有 pre 和 post 两个钩子。
  - 例如 build 脚本命令的钩子就是 prebuild 和 postbuild

    ```json
    "scripts": {
        "prebuild": "echo I run before the build script",
        "build": "cross-env NODE_ENV=production webpack",
        "postbuild": "echo I run after the build script"
    }

    ```

  - 用户执行 npm run build 的时候，会自动按照下面的顺序执行

    ```
    npm run prebuild && npm run build && npm run postbuild
    ```

  - 因此可以在两个钩子里面完成一些准备工作和清理工作

    ```json
        "scripts": {
        "clean": "rimraf ./dist && mkdir dist",
        "prebuild": "npm run clean",
        "build": "cross-env NODE_ENV=production webpack"
        }
    ```

  - npm 默认提供下面这些钩子

        ```js
            prepublish，postpublish
            preinstall，postinstall
            preuninstall，postuninstall
            preversion，postversion
            pretest，posttest
            prestop，poststop
            prestart，poststart
            prerestart，postrestart
        ```

    - 自定义脚本命令也可以加上 pre 和 post 钩子。比如 myscript 脚本命令。也有 premyscript 和 postmyscript

    - npm 提供了一个 npm_lifecycle_event 变量，返回当前正在运行的脚本名称。可以利用这个变量在同一个脚本文件里面，为不同的 npm scripts 命令编写代码

      ```js
      const TARGET = process.env.npm_lifecycle_event;

      if (TARGET === "test") {
        console.log(`Running the test task!`);
      }

      if (TARGET === "pretest") {
        console.log(`Running the pretest task!`);
      }

      if (TARGET === "posttest") {
        console.log(`Running the posttest task!`);
      }
      ```

    - 注意，prepublish 这个钩子不仅会在 npm publish 命令之前运行，还会在 npm install（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子 prepare，行为等同于 prepublish，而从 npm 5 开始，prepublish 将只在 npm publish 命令之前运行。

- 简写形式

  - npm start - npm run start
  - npm stop - npm run stop
  - npm test - npm run test
  - npm restart - npm run stop && npm run restart && npm run start

- 变量

  - npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量
  - 通过 npm_package\_前缀，npm 脚本可以拿到 package.json 里面的字段
    ```json
    {
      "name": "foo",
      "version": "1.2.5",
      "scripts": {
        "view": "node view.js"
      }
    }
    ```
  - 变量 npm_package_name 返回 foo，npm_package_version 返回 1.2.5
    ```js
    console.log(process.env.npm_package_name); // foo
    console.log(process.env.npm_package_version); // 1.2.5
    ```
  - 以上是通过环境变量 process.env 对象，拿到 package.json 字段值
  - 如果是 bash 脚本，可以用$npm_package_name。npm_package\_前缀也支持嵌套的 package.json 字段

  ```json
    "repository": {
        "type": "git",
        "url": "xxx"
    },
    "scripts": {
        "view": "echo $npm_package_repository_type"
    }
  ```

  - 上面代码中，repository 字段 type 属性，可以通过 npm_package_repository_type 取到

  - npm 脚本还可以通过 npm*config*前缀拿到 npm 的配置变量，即 npm config get xxx 命令返回的值
    ```json
        "scripts": {
            "view": "echo $npm_config_tag",
        }
    ```
    <!-- https://www.jianshu.com/p/7192b336c6cd -->
    - 注意，package.json 里面的 config 对象，可以环境变量覆盖
      ```json
      {
        "name": "foo",
        "config": { "port": "8080" },
        "scripts": { "start": "node server.js" }
      }
      ```
    - 上面代码中，npm_package_config_port 变量返回 8080。这个值可以用下面的方法覆盖
      ```cmd
      npm config set [packageName]:port 80
      npm config set foo:port 80
      ```
    - [参考资料-常用脚本](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

### peerDependencies

- [参考资料](https://blog.csdn.net/weixin_43459866/article/details/112392975)

### yarn resolutions 统一版本大幅度减少产物

- [参考资料](https://blog.csdn.net/qq_21567385/article/details/112644629)
- https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-selective-versions-resolutions.md

### yarn link 和 npm link 本地调试 npm 包方式

- 开发过程中，一个包可以链接到另一个项目，本地调试大有用处。

- 本质原理通过软链接方式。

- yarn link 存在一个问题，当 yarn link package 时，如果包是注册 bin 执行脚本的话，会存在注册不上的情况，git issue 一直在讨论这个问题，是因为 yarn global bin 并非在 /usr/local/bin 目录下， 导致 bin 脚本变量未注册到全局，npm link 是可以的。
- 目前阶段，对于 bin 包开发暂时用 npm link 去做链接。

### yarn workspaces 和 lerna 管理多项目工作流

<!-- https://cloud.tencent.com/developer/section/1489501 -->

<!-- https://zhuanlan.zhihu.com/p/381794854 -->

<!-- http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F-%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%8E%9F%E7%90%86%E5%92%8C%E5%AE%9E%E8%B7%B5.html#_4-3-%E4%BD%BF%E7%94%A8-break-%E5%92%8C-return-%E4%BB%A3%E6%9B%BF%E6%8E%A7%E5%88%B6%E6%A0%87%E8%AE%B0 -->
