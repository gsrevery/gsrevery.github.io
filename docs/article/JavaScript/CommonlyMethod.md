# 数据特殊处理

## Blob流数据的接收
当后台返回流数据的时候，前端已普通的方式去接收数据会出现乱码的情况，这时我们需要采取特殊的方式进行数据的接收或者导出。

**注意：在写接口时，需要写入类型`responseType: 'blob'`，不然会出现乱码的情况**
```js
/*
 * @param url下载地址, data请求参数, name文件名急后缀
 * @description 文件下载 a标签
 * @return file 对象下载
 */

export function aDownLoadBlob (url, data, fileName) {
    axios({
        method: 'post',
        url: url,
        data: data,
        responseType: 'blob',
        // token
        headers: { Authorization: window.sessionStorage.getItem('accessToken') }
    }).then(res => {
        const blob = new Blob([res.data])
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
            const elink = document.createElement('a')
            elink.setAttribute('download', fileName)
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
        }
    })
}

```