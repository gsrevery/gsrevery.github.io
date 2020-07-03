# 跨域问题 :custard:

## 什么是跨域

跨域是指从一个域名的网页去请求另一个域名的资源。比如从`www.baidu.com`页面去请求 `www.google.com`的资源。但是一般情况下不能这么做，它是由浏览器的同源策略造成的，是浏览器对`JavaScript`施加的安全限制。跨域的严格一点的定义是：只要协议，域名，端口有任何一个的不同，就被当作是跨域。

## 为什么要有跨域

原因就是安全问题：如果一个网页可以随意地访问另外一个网站的资源，那么就有可能在客户完全不知情的情况下出现安全问题。比如下面的操作就有安全问题：

* 用户访问`www.mybank.com` ，登陆并进行网银操作，这时cookie啥的都生成并存放在浏览器
* 用户突然想起件事，并迷迷糊糊地访问了一个邪恶的网站`www.xiee.com`
* 这时该网站就可以在它的页面中，拿到银行的`cookie`，比如用户名，登陆`token`等，然后发起对`www.mybank.com`的操作。
* 如果这时浏览器不予限制，并且银行也没有做响应的安全处理的话，那么用户的信息有可能就这么泄露了。

## Vue项目中使用代理方式解决跨域

1. 在vue.config.js文件中写入
```javascript
module.exports = {
    publicPath: '/',
    lintOnSave: true,
    devServer: {
        port: 8000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/mouldApi': {
                target: 'http://192.168.1.20:17000/',
                // 本身的接口是沒有/mouldApi的，所以要用pathWrite去掉。
                pathRewrite: { '^/mouldApi': '' }
            },
            '/dictionaryApi': {
                target: 'http://192.168.1.20:18000/',
                pathRewrite: { '^/dictionaryApi': '' }
            }
        }
    }
}
```
2. 在.env.development/.env.production文件中写入
```
    VUE_APP_ENV=development
    VUE_APP_API=/

    // 模板
    VUE_APP_MOULD_API=/mouldApi
    // 字典
    VUE_APP_DICTIONARY_API=/dictionaryApi
    // 物流委托
```
3. 在接口中引入
* api.js文件
```javascript
    // 后端没有配置网关，生产环境也需要添加前缀
    export const mould = process.env.VUE_APP_MOULD_API
    export const dictionary = process.env.VUE_APP_DICTIONARY_API
```
* 接口文件dictionary.js引入
```javascript
    // 引入api.js中dictionary并重命名为baseUrl,将baseUrl加在调用接口前就能够使用了
    import { dictionary as baseUrl } from './api'
```

## 代理解决跨域原理

通过一些方法设置代理，在请求发送(接收)之前加入中间层，将不同的域名转换成相同的就解决了跨域的问题。

客户端发送请求时不直接到服务器而是先到代理的中间层在这里将`localhost:8088`的这个域名转换为`192.168.0.67:8061`，再将请求发送到服务器这样在服务器端收到的请求就是使用的`192.168.0.67:8061`域名同理，当服务器返回数据的时候，也是先到代理的中间层将`192.168.0.67:8061`转换成`localhos:8088`；这样在客户端也是在相同域名下访问的了。