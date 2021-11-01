---
title: 浏览器 存储：Cookie、localStorage、sessionStorage 和 indexedDB
tags:
---

### Cookie

- 概述：是服务器委托浏览器存储的一些数据，它让服务器拥有了“记忆能力”，它会在浏览器下次 向服务器再 **发起请求时被携带** 并发送到服务器上
- Cookie 的工作过程：
  >  会用到两个字段：响应头字段 Set-Cookie 和请求头字段 Cookie.
  - 响应报文使用 Set-cookie 字段发送“key=value”形式的 Cookie
  - 请求报文里用 Cookie 字段发送多个 Cookie 值
- Cookie 的属性：
  > Cookie 的生存周期：可以使用 Expires 和 Max-Age 两个属性来设置
  - Expires 即过期时间，用的绝对时间点，可以理解为“截止时间”(deadline)
  - Max-Age 用的相对时间，单位是秒，浏览器收到报文时间点再加上 Max-Age，即可得到失效时间
  - 两者可同时存在，浏览器优先采用 Max-Age
- Cookie 的作用域：
  > 让浏览器仅发送特定的服务器和 URI，避免被其他网站盗用
  - Domain 和 Path 指定了 Cookie 所属的域名和路径，浏览器发送 Cookie 前会从 URI 提取 host 和 path 部分，对比 Cookie 属性。
  - 如果不满足条件，就不会在请求头里发送 Cookie
- Cookie 的安全性：
  > 尽量不要让服务器以外的人看到
  - HttpOnly：Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问。比如不能通过 JS 访问 Cookie，减少 XSS 攻击；
  - SameSite：SameSite 可以防范 XSRF（跨站请求伪造）攻击，设置成 SameSite=Strict 可以严格限定 Cookie 不能随着跳转链接跨站发送，而 SameSite=Lax 则略宽松一些，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送
  - Secure：表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送
- Cookie 的应用
  - 身份识别 保存用户登录信息，实现会话事务
  - 广告追踪
- Cookie 的特点
  - 数据生命周期：一般由服务器生成，可以设置过期时间
  - 数据存储大小：Cookie 的大小受限，一般为 4kb
  - 与服务端通信：每次发起同域名下的 HTTP 请求时，在 header 中都会携带当前域名下的 Cookie,会影响请求的性能
- Cookie 使用实例

```js
// 1.days设置成0表示删除cookie,让其过期
// 2.如果加入domain=.test.com会存在设置不上的情况，因不在当前域名下设置

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "="+ escape(value) + ";expires=" + d.toGMTString();
}

// 注意 如果cookies设置了httpOnly,不可通过代码进行读取/修改/删除
document.cookie = "qunhe-jwt=1123; max-age=21010; domain=.kujiale.com;path=/";
/**
 * 1.httpOnly与安全 - 浏览器为什么要限制客户端去访问cookie?
 * 如果任何cookie都能被客户端通过document.cookie获取将会发生多么可怕的事情.
 * 如果页面遭受了XSS攻击,一段恶意的script脚本插到页面中.脚本可通过document.cookie读取用户身份验证相关的cookie,并将cookie发送到攻击者的服务器上.
 * /
```

```js
//使用koa2例子
/** 设置cookies 如果设置expires的时间低于当前时间，会设置不上 */
/**  */
ctx.cookies.set("cid", "hello world", {
  expires: new Date("2021-11-15"),
  httpOnly: true,
});
/** 获取cookies */
console.log(ctx.cookies.get("cid"));
```

```js
// 场景一 跨域身份验证
// 1.浏览器无法保存cookie、axios也无法携带cookie
// 服务端 koa 需要配置中间件/或者使用 @koa/cors
ctx.set("Access-Control-Allow-Credentials", true);
ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
// 客户端 axios
axios({
  url: "http://127.0.0.1:3004/api/test/hello",
  methods: "get",
  credentials: true, // 需要携带凭证
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

```js
// koa服务端 跨域中间件处理
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
```

### 对于上面跨域身份验证，要求 Access-Control-Allow-Origin 不可为\*，若多个 origin 该怎么办

```js
// 以koa中间件为例
app.use(async (ctx, next) => {
  // 通过ctx.request.header.origin获取请求头源，可在服务端维护一个白名单源列表，若在白名单内，将请求头origin设置上。
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
  // ...
});
// nginx 后期学习一下@TODO:  https://netsecurity.51cto.com/art/202106/666906.htm
```

### secure 用来设置 cookie 只有确保安全的请求(https/其他安全协议时)中才会发送.

- 当请求 https 或者其他安全协议时,包含 secure 选项的 cookie 才能被发送至服务器
- ⚠️：如果要在客户端即网页通过 js 去设置 secure 类型的 cookie，必须保证网页时 https 协议的。在 http 协议的网页是无法设置 secure 类型 cookie 的

### domain 和 path

<!-- 有关于浏览器缓存和Vary的问题。 -->

https://lifeni.life/article/cookies-issue

https://segmentfault.com/a/1190000004556040
