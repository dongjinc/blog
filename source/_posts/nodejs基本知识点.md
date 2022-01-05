---
title: nodejs基本知识点
---

## egg this.ctx.curl 使用了（urllib）库，底层在 egg httpclient.js 文件中进行封装

继承自 urllib 库，super.request(url, args)
promise 写法和非 promise 写法存在有无回调函数作为参数。

## fs.mkdirSync

创建文件夹 fs.mkdirSync(path, options:{recursive: true - 递归创建})
是否存在某个文件 fs.accessSync(path)

## nodejs 写入文件

var rs = fs.createReadStream 输出流
var ws = fs.createWriteStream 输入流  
rs.pipe(ws)

## path.resolve 相对于当前执行目录，输出绝对路径

比如：
/Users/dongyong/Desktop/project/react/crawler 执行 node app/node.js
输出路径
/Users/dongyong/Desktop/project/react/crawler
如果在
/Users/dongyong/Desktop/project/react/crawler/app 执行 node node.js
输出路径
/Users/dongyong/Desktop/project/react/crawler/app
即便执行 node ../app/node.js 亦是如此

path.resolve('/foo/bar', './tmp/file/') // -> /foo/bar/tmp/file/

path.resolve('/foo/bar', '/tmp/file/') // -> /tmp/file
默认解析规则是从右到左，其中认为带有 './'或'tmp' 表示非绝对路径，所以前后两者可以拼接在一起，否则只会匹配右边第一个

## path.relative(from, to) - 基于工作目录

base-content -> /Users/dongyong/Desktop/project/react/crawler
path.relative('.', 'app/web/rules/index.js')
输出 -> app/web/rules/index.js

path.relative('.', '/app/web/rules/index.js')
输出 -> ../../../../../../app/web/rules/index.js
原理：
'.' 相对路径可以理解为 /Users/dongyong/Desktop/project/react/crawler/app
'/app/web/rules/index.js' 绝对路径可以理解为在根用户目录上 /app/web/rules/index.js
因此会输出这种结果。
