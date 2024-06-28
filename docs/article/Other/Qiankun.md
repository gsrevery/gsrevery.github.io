# qiankun框架使用

## qiankun框架应用配置
详细配置参考官网：[https://qiankun.umijs.org/zh/guide]
常见问题参考官网：[https://qiankun.umijs.org/zh/faq]
例子仓库地址：[https://gitee.com/gpzrm/qiankun.git]

## qiankun框架运行配置
```js
{
  "name": "main",
  "version": "1.0.0",
  "description": "主配置",
  "author": "hh",
  "private": true,
  "scripts": {
    "install-all": "npm-run-all install:*",
    "serve-all": "npm-run-all --parallel serve:*",
    "build-all": "npm-run-all --parallel build:*",
    "push-all": "npm-run-all --parallel push:*",

    "install:main": "cd main && yarn install",
    "install:demoChildOne": "cd demoChildOne && yarn install",
    "install:demoChildTwo": "cd demoChildTwo && yarn install",

    "serve:main": "cd main && yarn serve",
    "serve:demoChildOne": "cd demoChildOne && yarn serve",
    "serve:demoChildTwo": "cd demoChildTwo && yarn serve",

    "build:main": "cd main && yarn build",
    "build:demoChildOne": "cd demoChildOne && yarn build",
    "build:demoChildTwo": "cd demoChildTwo && yarn build",

    "push:main": "cd main && yarn push",
    "push:demoChildOne": "cd demoChildOne && yarn push",
    "push:demoChildTwo": "cd demoChildTwo && yarn push"

  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  },
  "dependencies": {
    "v-viewer": "^1.6.4"
  }
}
```

## 配置测试环境
使用乾坤框架后的系统和普通系统配置一致：将主应用和各个子应用当作独立的系统进行独立的配置（主应用和各个子应用都需要分发ip+端口），配置好的端口号配置在主应用的环境变量中

## 获取资源出错
在本地主应用和子应用同时运行着，通过主应用访问子应用时提示资源找不到，这个时候可以看一下子应用是否使用的是路由懒加载，如果是请先改为普通路由后再试
```js
// 路由懒加载
export default [
    {
        path: '/home',
        name: 'home',
        props: route => ({
            redirect: route.query.redirect
        }),
        meta: {
            title: '首页',
            authCode: null
        },
        component: () => import('@/pages/home/Index.vue')
    }
]

// 改为普通路由
import Home from '@/pages/home/Index.vue'
export default [
    {
        path: '/home',
        name: 'home',
        props: route => ({
            redirect: route.query.redirect
        }),
        meta: {
            title: '首页',
            authCode: null
        },
        component: Home
    }
]
```

## 跨域问题
**场景1：**在本地和测试环境中主应用都能够正常访问子应用，发布到线上环境之后，发现主应用访问不了子应用。

**原因：**主应用使用的`ssl`证书，子应用没有使用，导致主应用是`https`访问，子应用是`http`访问。

**解决方案：** 

1. 前端更改微应用的`entry`地址

2. 配置`nginx`，将每个子应用的`activeRule`名称作为识别标识，`nginx`识别到了之后，将地址更改为`https`的就可以了。

**实现代码如下：**
```js
// 主应用的配置文件mainAppConfig.js
import { registerMicroApps, start } from 'qiankun'
// 生产环境
const isProduction = process.env.VUE_APP_ENV === 'production'

const hostname = `${isProduction ? 'https://' : 'http://'}${location.hostname}` // 动态获取当前hostname，如果各个应用不在同一个服务器下，不能这么使用

/**
 * @name 启用qiankun微前端应用
 */
const qianKunStart = () => {
    registerMicroApps([
        // 测试子应用1
        {
            name: 'demoChildOne', // 微应用的名称
            entry: `${hostname}${process.env.VUE_APP_DEMOCHILDONE}`, // 微应用的 entry 地址
            container: '#child-app-wrapper', // 子应用挂载的div
            activeRule: '/demoChildOne' // 微应用的激活规则
        },
        // 测试子应用2
        {
            name: 'demoChildTwo', // 微应用的名称
            entry: `${hostname}${process.env.VUE_APP_DEMOCHILDTWO}`, // 微应用的 entry 地址
            container: '#child-app-wrapper', // 子应用挂载的div
            activeRule: '/demoChildTwo' // 微应用的激活规则
        },
    ])

    /**
     * @name 启动微前端
     */
    start(
        // 子应用引用了第三方js库，在乾坤环境中会有跨域的问题，因为乾坤会把子应用的静态资源放到沙箱中，这样第三方js经过编译就会出现问题。解决方式是在基座中start方法中设置excludeAssetFilter,使qiankun不处理这部分js
        // {
        //     excludeAssetFilter: (urls) => {
        //         const whiteList = []
        //         const whiteWords = ['baidu'] // 异步加载百度地图白名单
        //         if (whiteList.includes(urls)) return true
        //         return whiteWords.some(w => urls.includes(w))
        //     }
        // }
    )
}

export default qianKunStart
```
场景2：正常来说主应用+子应用都是同一个ip，只是分发了不同的端口；如果说遇到主应用和子应用的ip不相同，这种情况暂时没有遇到：后续补充