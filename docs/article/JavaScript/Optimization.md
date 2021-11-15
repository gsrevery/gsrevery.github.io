# 优化 :fountain:

## 锚点优化

`elementUI`和`iview`的锚点使用都会更改地址栏地址，这样会导致刷新页面，发现进入了一个空白页或者是报错。如果有使用query传参的话会导致参数丢失等等。所以这里我们需要对锚点链接进行优化。
```html
<a @click="anchor('#name1')">证书信息</a>
<a @click="anchor('#name2')">商品信息</a>
<a @click="anchor('#name3')">申请书信息</a>
<a @click="anchor('#name4')">证书风险信息</a>
```
```js
anchor(idName) {
    // 不改变地址栏并且让锚点滑动更平缓
    document.querySelector(idName).scrollIntoView({ behavior: 'smooth' })
}
```