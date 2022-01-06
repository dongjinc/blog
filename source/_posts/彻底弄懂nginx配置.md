---
title: 彻底弄懂nginx配置
tags:
---

## nginx location proxy_pass 后面的 url 加与不加/的区别

- 在 nginx 中配置 proxy_pass 时，当在后面的 url 加上了/，相当于是绝对根路径，则 nginx 不会把 location 中匹配的路径部分代理走;如果没有/，则会把匹配的路径部分也给代理走。

```js
    // 下面2种情况分别用http://192.168.1.1/proxy/test.html 进行访问
    // 第一种情况 proxy_pass后有 / 绝对路径 不带走 location 路径
    location  /proxy/ {
       proxy_pass http://127.0.0.1:81/;
    }
    // 结论：会被代理到http://127.0.0.1:81/test.html

    // 扩展1
    location  /proxy/ {
        proxy_pass http://127.0.0.1:81/ftlynx/;
    }
    // 结论：会被代理到http://127.0.0.1:81/ftlynx/test.html

    // 扩展2
    location  /proxy/ {
        proxy_pass http://127.0.0.1:81/ftlynx;
    }
    // 结论：会被代理到http://127.0.0.1:81/ftlynxtest.html


    // 第二种情况 proxy_pass 后没有 / ，带走location路径
    location  /proxy/ {
        proxy_pass http://127.0.0.1:81;
    }
    // 结论：会被代理到http://127.0.0.1:81/proxy/test.html 这个url
```

## 地址重写 与 地址转发

- 地址重写 是为了实现地址的标准化，比如我们可以在地址栏中中输入 www.baidu.com. 我们也可以输入 www.baidu.cn. 最后都会被重写到 www.baidu.com 上。浏览器的地址栏也会显示www.baidu.com
- 地址转发：它是指在网络数据传输过程中数据分组到达路由器或桥接器后，该设备通过检查分组地址并将数据转发到最近的局域网的过程。

- 因此地址重写和地址转发有以下不同点：

  1. 地址重写会改变浏览器中的地址，使之变成重写成浏览器最新的地址。而地址转发他是不会改变浏览器的地址的。
  2. 地址重写会产生两次请求，而地址转发只会有一次请求。
  3. 地址转发一般发生在同一站点项目内部，而地址重写且不受限制。
  4. 地址转发的速度比地址重定向快。

- 配置语法

  ```
      Context：server、location、if
      rewrite语法
      server {
          rewrite {规则} {定向路径} {重写类型} ;
      }

      1、规则：可以是字符串或者正则来表示想匹配的目标url

      2、定向路径：表示匹配到规则后要定向的路径，如果规则里有正则，则可以使用$index来表示正则里的捕获分组

      3、重写类型：
      last ：相当于Apache里德(L)标记，表示完成rewrite，浏览器地址栏URL地址不变。停止rewrite检测【如果没有匹配到，会继续向下匹配】
      break；本条规则匹配完成后，终止匹配，不再匹配后面的规则，浏览器地址栏URL地址不变。停止rewrite检测【如果没有匹配到，则不再向下匹配，直接返回结果404】
      两者区别：
        1).因为301和302不能简单的只返回状态码，还必须有重定向的URL，这就是return指令无法返回301,302的原因了（return 只能返回除301、302之外的code）。
        2).last一般写在server和if中，而break一般使用在location中
        3).last不终止重写后的url匹配，即新的url会再从server走一遍匹配流程，而break终止重写后的匹配
        4).break和last都能组织继续执行后面的rewrite指令在location里一旦返回break则直接生效并停止后续的匹配location

       server {
            location / {
                rewrite /last/ /q.html last;
                rewrite /break/ /q.html break;
            }
            location = /q.html {
                return 400;
            }
        }
        访问/last/时重写到/q.html，然后使用新的uri再匹配，正好匹配到location = /q.html然后返回了400；
        访问/break时重写到/q.html，由于返回了break，则直接停止了；

        last、break案例：https://cloud.tencent.com/developer/article/1610274
        server {
            listen 80 default_server;
            server_name www.zhangbiao.com;
            access_log  /var/log/nginx/log/host.access.log  main;
            root /opt/app/code;
            location ~ ^/break {
                rewrite ^/break /test/ break;
            }
            location ~ ^/last {
                rewrite ^/last /test/ last;
            }
            location /test/ {
                default_type application/json;
                return 200 '{"status":"success"}';
            }
        }



      4、重定向方式：
      redirect：返回302临时重定向，浏览器地址会显示跳转后的URL地址。
      permanent：返回301永久重定向，浏览器地址栏会显示跳转后的URL地址permanent：返回301永久重定向，浏览器地址栏会显示跳转后的URL地址

      5、简单实例
      rewrite ^(.*)$ /pages/maintain.html break;
      解释说明：
      会把所有的请求都重定向到 /pages/maintain.html 页面。

      server {
            rewrite /last.html /index.html last;
            # 访问 /last.html 的时候，页面内容重写到 /index.html 中

            rewrite /break.html /index.html break;
            # 访问 /break.html 的时候，页面内容重写到 /index.html 中，并停止后续的匹配

            rewrite /redirect.html /index.html redirect;
            # 访问 /redirect.html 的时候，页面直接302定向到 /index.html中

            rewrite /permanent.html /index.html permanent;
            # 访问 /permanent.html 的时候，页面直接301定向到 /index.html中

            rewrite ^/html/(.+?).html$ /post/$1.html permanent;
            # 把 /html/*.html => /post/*.html ，301定向

            rewrite ^/search\/([^\/]+?)(\/|$) /search.html?keyword=$1 permanent;
            # 把 /search/key => /search.html?keyword=key
        }
  ```
