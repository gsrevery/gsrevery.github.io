# 跨域
## 什么是跨域
跨域是指去向一个为非本origin(协议、域名、端口任意一个不同)的目标地址发送请求的过程，这样之所以会产生问题是因为浏览器的同源策略限制

## 怎么判断跨域
```
同源 :  协议名、ip地址、端口号 三者一致就叫同源 
当前页面地址 : http://127.0.0.1:3000/home/index.html
请求地址1 : https://127.0.0.1:3000/abc   [跨域(不同源),协议不同]
请求地址2 : http://127.0.0.1:3000/abc   [同源, 三码合一]
请求地址3 : http://192.168.48.81:3000/abc  [跨域(不同源), ip不同]
请求地址4 : http://127.0.0.1:4399/abc [跨域(不同源),端口号不同]

```
## 怎么解决跨域
解决跨域的方式有多种1.jsonp，2.CORS，3.nginx代理(这是今天咋们的重点)

### nginx代理
前后端分离后，后端形成了多服务，多模块架构，由于浏览器同源策略，就导致了不同服务间跨域的情况出现。

nginx代理就是通过特定标识，在nginx配置中心统一识别转发到不同资源地址

#### nginx代理前端配置
vue.config.js配置
```js
// 服务器地址
const target = 'http://192.178.2.250:8181/'
// 文件服务地址
const fileViewTarget = 'http://192.178.2.250:8181/file-view/'
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: target,
                pathRewrite: { '^/api': '' }
            },
            '/file-view': {
                target: fileViewTarget,
                pathRewrite: { '^/file-view': '' }
            },
        }
    }
}
```
环境变量中配置
```
// 基础平台
VUE_APP_SYSTEM_API=/api
```
然后将变量加入接口中
#### nginx配置中心配置
```
server {

    listen          80;
    server_name     localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    # 监听域名中带有group的，交给FastDFS模块处理
    location /api {
        proxy_pass http://192.178.2.250:13100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        rewrite ^/api/(.*) /$1 break;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /file-view {
        proxy_pass http://192.178.2.250:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        rewrite ^/file-view/(.*) /$1 break;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

}

```