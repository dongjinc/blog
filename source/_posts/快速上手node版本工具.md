---
title: 快速上手node版本工具
tags: nodejs、n
---

## n node 版本管理工具

- 安装

  - npm install n -g

- 选择版本(mac 写入全局 usr/local,需要加上 sudo,给予超级权限)

  - n <version> -> n 0.8.14
  - n 回车键

- 安装版本

  - n <version> -> n 12.22.1 如果本地未安装的话,会进行安装操作.否则选择版本操作
  - n latest 使用或安装最新的官方发布
  - n stable 使用或安装稳定的官方发布
  - n lts 使用或安装最新的 LTS 官方版本(长期支持版本)

- 删除版本

  - n rm 12.13.0 或者 n - 12.13.0
