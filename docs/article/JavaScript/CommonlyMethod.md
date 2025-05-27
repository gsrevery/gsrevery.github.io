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

## 页面懒加载
后端接口查询压力过大时，或者页面渲染太慢，就可以使用页面懒加载来缓解压力。

### 方案一：利用js监听滚动条
```js
<div class="ytxd-all" @scroll="rollFn()"></div>

// 滚动条事件
rollFn() {
    //滚动条距离底部的距离  scrollHeight是整个可滚动的高度，scrollTop是滚动条距离顶部的高度，clientHeight是div的可视高度
    //当滚动条距离底部加载新数据
    if(event.target.scrollHeight <= Math.ceil(event.target.scrollTop + event.target.clientHeight)){
        this.page++
        //在加载完最后一页的数据时停止加载
        if(this.totalPages >= this.page){
            //调数据的方法，在此省略
            this.clickSearch('gundong')
        }
    }
}
```

### 方案二：使用浏览器内置API`IntersectionObserver`
```js
    <li v-for="(item, id) in useAsync.list" :key="id" style="height: 50vh;">{{ item.name }}</li>
    <div id="loading" style="bottom: 0; text-align: center;">加载中...</div>

scrollFn () {
    // 加载更多
    let observer = new IntersectionObserver((entries) => {
        console.log(entries, 'entries')
        // entries是一个数组，每个元素都是一个IntersectionObserverEntry对象
        for (const entrie of entries) {
            // 元素可见
            if (entrie.isIntersecting) {
                this.page++
                this.getData()
            }
        }
    },
    {
        root: null, // 根元素，默认为视口
        threshold: 0 // 交叉比例，默认为0
    })
    let loadingRef = document.getElementById('loading')
    observer.observe(loadingRef)
}
```