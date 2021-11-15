# js常用的各种插件 :goat:

## html2canvas HTML转Canvas工具

html2canvas.js是一款优秀的插件，它可以轻松地帮你将HTML代码转换成Canvas，进而生成可保存分享的图片。
```html
<div id="qianduanwz">
  <img src="./images/qrcode.jpg" alt="">
  <p>内容</p>
</div>
```
```js
<script src="./scripts/html2canvas.js"></script>
<script>
  new html2canvas(document.getElementById('qianduanwz')).then(canvas => {
    // canvas为转换后的Canvas对象
    let oImg = new Image();
    oImg.src = canvas.toDataURL();  // 导出图片
    document.body.appendChild(oImg);  // 将生成的图片添加到body
  });
</script>
```

## ssh2 + archiver 实现代码自动打包上传

`ssh2`是连接远程服务器的，配置一些基本的服务器配置

`archiver`是压缩工具压缩为zip文件，减少上传数量
