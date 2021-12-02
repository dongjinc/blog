---
title: 如果编写一个loader
---

yarn 离线安装 缓存
cnpm 国内包 阿里源
npm -> 依赖锁

octotree

webpack 为什么慢
1.loader1 string(源代码) -> ast（遍历这棵树替换 const/var） -> string
2.loader2 string/buffer -> ast -> string

编写 loader

this 当前 loader 的这个类

module.exports = function(content){
console.log('前置钩子->', this.data.value)
const options = loaderUtils.getOptions(this)
console.log('xxx', options)
// 为了避免使用正则过于复杂 ast 树
return content;
}
module.exports.pitch = function(\_1, \_2, data){
data.value = '前置钩子 🐶'
}
// ast 库
//1.acorn // ast 树 抽象语法树
//2.acorn-walk
//3.esprima

// 1.postcss cssnext->css
// 2.webpack loader es -> ast -> es5 string
// 3.vue template -> html ast -> vdom
// 4.v8 词法分析与语法分析
// 5.ast + 设计模式、发布订阅

// - 48.50
