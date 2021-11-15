# 数据特殊处理

## Blob流数据的接收
当后台返回流数据的时候，前端已普通的方式去接收数据会出现乱码的情况，这时我们需要采取特殊的方式进行数据的接收或者导出。

**注意：在写接口时，需要写入类型`responseType: 'blob'`，不然会出现乱码的情况**
```js
const dwnloadUrl = (res, name, text) => {
    let blob = new Blob([res.data])
    let fileName = name + (txt || '.xlsx')
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
        let elink = doucument.createElement('a')
        elink.downlod = flieName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        doucument.boby.appendChild(elink)
        elink.click()
        doucument.body.removeChild(elink)
    }
}
```