# 前端问题分类总结 :fire:

## Html部分

### Canvas和SVG的区别

**svg**
* SVG 是一种使用 XML 描述 2D 图形的语言。
* SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
* 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

**特点**
* 不依赖分辨率
* 支持事件处理器
* 最适合带有大型渲染区域的应用程序（比如谷歌地图）
* 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
* 不适合游戏应用

**Canvas**
* Canvas 通过 JavaScript 来绘制 2D 图形。
* Canvas 是逐像素进行渲染的。
* 在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

**特点**
* 依赖分辨率
* 不支持事件处理器
* 弱的文本渲染能力
* 能够以 .png 或 .jpg 格式保存结果图像
* 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

### 用一个 div 模拟 textarea 的实现


### 块级元素和行内元素的区别

## Css部分

###	让div垂直居中的几种方式
```css
/* 方法一 盒子模型 */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}
.small{
    width: 200px;
    height: 100px;
    background-color: red;
}
/* 方法二 盒子模型 */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    display: flex;
}
.small{
    margin: auto;
    width: 200px;
    height: 100px;
    background-color: red;
}

/* 方法三 绝对定位 */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    position: relative;
}
.small{
    width: 200px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 250px;
    left: 400px;
}

/* 方法四 绝对定位+transfrom */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    position: relative;
}
.small{
    padding: 100px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 方法五 绝对定位 marginL: auto */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    position: relative;
}
.small{
    width: 200px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

/* 方法六 table-cell法 */
.big{
    width: 1000px;
    height: 600px;
    background-color: #00FFFF;
    display: table-cell;
    vertical-align: middle;
}
.small{
    width: 200px;
    height: 100px;
    background-color: red;
    margin: auto;
} 
```

### px,em,rem,vw,vh区别
`px`: px就是pixel的缩写，意为像素。px就是一张图片最小的一个点，一张位图就是千千万万的这样的点构成的。

`em`: 参考物是父元素的font-size，具有继承的特点。如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

`rem`: css3新单位，相对于根元素html（网页）的font-size，不会像em那样，依赖于父元素的字体大小，而造成混乱。

`vw`: css3新单位，viewpoint width的缩写，视窗宽度，1vw等于视窗宽度的1%。
* 举个例子：浏览器宽度1200px, 1 vw = 1200px/100 = 12 px。

`vh`: css3新单位，viewpoint height的缩写，视窗高度，1vh等于视窗高度的1%。
* 举个例子：浏览器高度900px, 1 vh = 900px/100 = 9 px。

### 盒子模型

### 块级元素、行内元素、块级行内元素。

### BFC

### Javascript部分

### 基本数据类型

### 遍历数组的方式

### 遍历对象的方式

### 深浅拷贝

### 事件循环机制

### 防抖、节流

### Cookie和Localstorage、Sessionstorage的优缺点
1. Cookie

    cookie限制大小，约4k左右，不适合存储业务数据，尤其是数据量较大的值；

    cookie会每次随http请求一起发送，浪费宽带。

2. Localstorage

    **特点：**

        可以长期储存数据；需要手动删除数据
        在同一域下且同一个浏览器不同窗口页面，操作的是同一个localStorage

    **优点：**

        可以大量保存浏览器中数据。
        不会随http请求一起发送

    **缺点：**

        不同窗口下数据；
        不能独立，相互干扰。例如：删除或添加一个数据，其它的窗口也会同步删除或者添加该 数据
        不能被爬虫读取
        在浏览器的隐私模式下不能读取
        写入数据量大的话会卡（FF是将localstorage写入内存中的）
        
3. Sessionstorage

    **优点：**

    可以大量保存浏览器中数据。
    不同窗口下的sessionStorage，存储相互独立；互不干扰

## ES6

### async awit

### Promise的使用
promise对象代表一个异步操作，有三种状态：[pending]（进行中）、[fulfilled]（已成功）和[rejected]（已失败）

```js
//使用promise 按照789, 456, 123的顺序打印出来
//方法: 先将setTimeout（异步）操作通过Promise封装起来,然后再调用他们
function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log(123)
            resolve();
        }, 100);
    })
}
function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log(456)
            resolve();
        }, 200);
    })
}
function fn3() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log(789)
            resolve();
        }, 300);
    })
}

fn3().then(res => {
    console.log('第一步完成')
    fn2().then(res => {
        console.log('第二步完成')
        fn1().then(res => {
            console.log('第三步完成')
        })
    })
})
```

### Clas的使用
### var、let、const的区别
1. var

    var声明变量可以重复声明，而let不可以重复声明

    var是不受限于块级的，而let是受限于块级

    var会与window相映射（会挂一个属性），而let不与window相映射

    var可以在声明的上面访问变量，而let有暂存死区，在声明的上面访问变量会报错

2. let

    let声明的变量可以改变，值和类型都可以改变，没有限制。

3. const

    const声明之后必须赋值，否则会报错

    const定义不可变的量，改变了就会报错

    const和let一样不会与window相映射、支持块级作用域、在声明的上面访问变量会报错

### Set、map


## Vue部分

### 路由守卫

### 封装axios

### vue双向绑定的原理
1.	实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
2.	实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
3.	实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

### Vue中key的作用和工作原理
1. 作用
* 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes，相当于唯一标识ID。
* Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染， 因此使用key值可以提高渲染效率，同理，改变某一元素的key值会使该元素重新被渲染。
2. 工作原理
* 
 
### Vue组件之间通信方式
1. 子传父
		This.$emit
2. 父传子
		props
3. 兄弟组件之间通信+
		EventBus
		Vuex
### 组件中的data为什么是一个函数?
一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### style标签中scoped 是怎样实现样式隔离
当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件，也就是说，该样式只能适用于当前组件元素。通过该属性，可以使得组件之间的样式不互相污染。如果一个项目中的所有style标签全部加上了scoped，相当于实现了样式的模块化。

**scoped的实现原理**

vue中的scoped属性的效果主要通过PostCSS转译实现
```html
/* 转译前 */
<style scoped>
    .font-color {
        color: red;
    }
</style>
<template>
    <p class = "font-color">试一试</p>
</template>

/* 转译后 */
<style scoped>
    .font-color[data-v-5558831a] {
        color: red;
    }
</style>
<template>
    <p class = "font-color" data-v-5558831a>试一试</p>
</template>
```



## 性能优化
### 一. HTML方面
1. 语义化标签的使用
2. 页面嵌套不要太深
3. 页面太大可以根据窗口实现懒加载

### 二.CSS方面
1. 尽量和并和压缩css和js文件。（将css文件和并为一个。将js合并为一个）
2. 尽量所使用的字体图标或者SVG图标来代替传统png图
　　因为字体图标或者SVG是矢量图，代码编写出来的，方大不会变形，而且渲染速度快
3. 使用雪碧图或者是说图片精灵
　　把所有相对较小的资源图片，绘制在一张大图上，只需要将大图下载下来，然后利用
　　图片定位来讲小图展现在页面中（background-position:百分比，数值）
4. 能用css做的效果，不要用js做，能用原生js做的，不要轻易去使用第三方插件。
　　避免引入第三方大量的库。而自己却只是用里面的一个小功能

### 三.JS方面
1.	在js中尽量减少闭包的使用
　　原因：使用闭包后，闭包所在的上下文不会被释放
2.	减少对DOM操作，主要是减少DOM的重绘与回流（重排）
　　关于重排（回流）的分离读写：如果需要设置多个样式，把设置样式全放在一起设置，不要一条一条的设置。使用文档碎片或者字符串拼接做数据绑定（DOM的动态创建）
3.	在js中避免嵌套循环和"死循环"(一旦遇到死循环，浏览器就会直接卡掉)
4.	在js封装过程中，尽量做到低耦合高内聚。减少页面的冗余代码
5.	减少对cookie的使用（最主要的就是减少本地cookie存储内容的大小），因为客户端操作cookie的时候，这些信息总是在客户端和服务端传递。如果上设置不当，每次发送一个请求将会携带cookie
6.	前端与后端协商，合理使用keep-alive

### 四．其他优化
1. 页面中出现音视频标签，我们不让页面加载的时候去加载这些资源（否则第一次加载会很慢）
　　解决方法：只需要将音视频的preload=none即可。
　　目的：为了等待页面加载完成时，并且音视频要播放的时候去加兹安音视频资源
