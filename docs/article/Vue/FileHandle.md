# 文件处理

## 文件上传
文件上传的方式有多种，我这里根据实现方式将其分为两类：直接上传、储存上传

### 直接上传
如果是直接将文件上传至文件服务器，可以直接使用各个UI组件库中的上传，这里我们用`iviewUI`为例：调用成功或者失败都有对应的api返回，使用的时候查看对应的api即可：
```html
    <!-- 多个上传 -->
     <Upload
        multiple
        action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <!-- 拖拽上传 -->
    <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
```

### 储存上传
如果是需要将需要上传的文件和其他的参数一起通过`FormData`保存时，这个时候我们就需要先将上传的文件储存起来等其他参数获取完成后，再一起调用接口，将数据进行保存，UI组件中的上传就不太实用了。

<details>
<summary><b>下面例子使用input框实现点击、拖拽文件上传的例子</b></summary>

```vue
<template>
    <div class="main">
        <Form class="form" ref="formData" :model="formData" :label-width="140">
            <FormItem label="选择文件:" :label-width="120">
                <div class="drop-area" @dragenter="highlight" @dragover="highlight" @dragleave="unhighlight" @drop="handleDrop"
                @click="handleHintMsgEvent($event)">
                    <span>将文件拖拽到此处或者点击上传</span>
                    <input type="file" accept=".pdf, .doc, .docx" ref="excelImport" @change="handleExport()" style="display: none;">
                </div>
            </FormItem>
            <FormItem label="文件名:" v-if="updateFileName">
                <span style="color: #266593;">{{ updateFileName }}</span>
                <Icon type="ios-trash" style="font-size: 18px; color: #266593; margin-left: 20px; cursor: pointer;" @click="deleteUpdate"/>
            </FormItem>
            <FormItem label="备注:" prop="remark">
                <Input type="textarea" :rows="3" v-model="formData.remark" placeholder="请输入" :disabled="type=='detail'" />
            </FormItem>
        </Form>
        <div class="footer">
            <div class="btns">
                <cvu-button class="btn blue" round @click.native="confirm">确认</cvu-button>
            </div>
        </div>
    </div>
</template>

<script>
import { addApi } from '@/api'
export default {
    name: 'goods',
    data() {
        return {
            formData: {},
            // 上传文件名
            updateFileName: '',
            fileFormData: null
        }
    },
    methods: {
        // 文件上传
        handleHintMsgEvent () {
            this.$refs.excelImport.dispatchEvent(new MouseEvent('click'))
        },
        // Excel文件导入->input监听
        async handleExport () {
            if (this.$refs.excelImport.value) {
                this.updateFileName = this.$refs.excelImport.files[0].name
                let formData = new FormData()
                formData.append("file", this.$refs.excelImport.files[0])
                this.fileFormData = formData
                this.$refs.excelImport.value = null
            }
        },
        // 删除文件
        deleteUpdate() {
            this.updateFileName = ''
            this.fileFormData = null
            this.formData.fileName = null
            this.formData.fileAddr = null
        },
        highlight(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('hover');
        },
        unhighlight(e) {
            e.target.classList.remove('hover');
        },
        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.unhighlight(e);
            const files = e.dataTransfer.files;
            // console.log('拖拽得到List', files);
            // let fileList = []
            // for (let i = 0; i < files.length; i++) {
            //     fileList.push({
            //         ...files[i],
            //         name: files[i].name,
            //         size: files[i].size,
            //         type: files[i].type,
            //     })
            // }
            if (files.length > 1) {
                this.$Message.error('只能上传一个文件！')
            } else {
                let formData = new FormData()
                formData.append("file", files[0])
                this.fileFormData = formData
                this.updateFileName = files[0].name
            }
        },
        // 提交
        confirm() {
            if(!this.fileFormData) {
                this.$Message.warning('请上传文件')
                return
            }
            this.fileFormData.append("remark", this.formData.remark || '')
            const data = this.fileFormData
            addApi({ data }).then(res => {
                this.$Message.success(res.message || '操作成功')
                this.clearModel()
            })
        },
        // 清空弹窗
        clearModel() {
            this.formData = {}
            this.updateFileName = ''
            this.fileFormData = null
        },
    }
}
</script>

<style lang="scss" scoped>
    .file_upload {
        width: 105px;
        position: relative;
        cursor: pointer !important;
        input {
            height: 30px;
            opacity: 0;
            // position: absolute;
            cursor: pointer;
            width: 105px;
        }

        button {
            width: 105px;
            height: 32px;
            line-height: 32px;
            // position: absolute;
        }
    }
    .file_upload:hover>button {
        background: #f5f5f5;
        border: #ddd 1px solid;
    }
    .drop-area {
        width: 100%;
        height: 200px;
        border: 2px dashed #ccc;
        border-radius: 10px;
        text-align: center;
        line-height: 200px;
        cursor: pointer;
    }

    .drop-area.hover {
    border-color: #11716f;
    }

    .drop-area:hover {
    border-color: #11716f;
    }
</style>

```

</details>

## 文件下载
问件下载的方式有多种，这里描述常用的两种：直接下载、流文件下载

### 直接下载
直接从文件服务器上下载文件
```js
download() {
    let path = '152.162.23:80/file-view/货物导入模板一.xls'
    const fileName = `**.xls`
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = path
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
}
```

### 返回流文件下载
后端用接口将文件通过流的方式给前端，文件太大，下面这种方式可能不合适（下载的文件会先存在浏览器中，然后再下载到本地）——待验证
```js
// 下载文件get
export const downloadRequest = (url, { path = {}, data = {} } = {}) => {
    let api = url
    if (path && Object.keys(path)) {
        Object.keys(path).forEach(item => {
            api = api + `/${path[item]}`
        })
    }
    return axios({
        url: api,
        method: 'get',
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken') || ''
        }
    }).then(res => {
        if (res) {
            // console.log(res, '返回数据列');
            const blob = new Blob([res.data], {
                type: 'application/vnd.ms-excel'
            })
            const fileName = res.headers['content-disposition'].split('=')[1]
            const linkNode = document.createElement('a')
            linkNode.download = decodeURI(fileName) // a标签的download属性规定下载文件的名称
            linkNode.style.display = 'none'
            linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
            document.body.appendChild(linkNode)
            linkNode.click() // 模拟在按钮上的一次鼠标单击
            URL.revokeObjectURL(linkNode.href) // 释放URL 对象
            document.body.removeChild(linkNode)
            return res
        } else {
            Message.info({ content: res.message })
            throw res
        }
    }).catch((err) => {
        console.log(err);
    })
}
// 下载文件post
export const downloadPostRequest = (url, { path = {}, data = {} } = {}) => {
    let api = url
    if (path && Object.keys(path)) {
        Object.keys(path).forEach(item => {
            api = api + `/${path[item]}`
        })
    }
    return axios({
        url: api,
        method: 'post',
        responseType: 'blob',
        data: data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken') || ''
        }
    }).then(res => {
        if (res) {
            // console.log(res, '返回数据列');
            const blob = new Blob([res.data], {
                type: 'application/vnd.ms-excel'
            })
            const fileName = res.headers['content-disposition'].split('=')[1]
            const linkNode = document.createElement('a')
            linkNode.download = decodeURI(fileName) // a标签的download属性规定下载文件的名称
            linkNode.style.display = 'none'
            linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
            document.body.appendChild(linkNode)
            linkNode.click() // 模拟在按钮上的一次鼠标单击
            URL.revokeObjectURL(linkNode.href) // 释放URL 对象
            document.body.removeChild(linkNode)
            return res
        } else {
            Message.info({ content: res.message })
            throw res
        }
    }).catch((err) => {
        console.log(err);
    })
}
```

## 大文件上传
文件太大，比如视频（几百兆，几个G之类）上传时，需要切片上传

需要考虑的点有：
* 1. 网络问题导致上传中断的继续上传，可以考虑记录所有切片的`hash`值/排序和每个上传成功切片的`hash`值/序号，网络重连之后，对比继续上传，后端接收完成后，按照`hash`值/排序值，将文件组合起来储存。
* 2. 切片过多时，单个切片上传同样耗费时间，可以考虑使用`webworker`进行并行上传。

下面是大文件上传实例，未实现上述问题，后续项目中遇到继续补充。
```js
import md5 from 'js-md5' //引入MD5加密
import axios from 'axios'
export const uploadByPieces = ({ randoms, file, pieceSize = 2, progress, success, error }) => {
    // 如果文件传入为空直接 return 返回
    if (!file) return
    let fileMD5 = ''// 总文件列表
    const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
    const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
    // 获取md5
    const readFileMD5 = () => {
        // 读取视频文件的md5
        console.log("获取文件的MD5值")
        let fileRederInstance = new FileReader()
        fileRederInstance.readAsBinaryString(file)
        fileRederInstance.addEventListener('load', e => {
            let fileBolb = e.target.result
            fileMD5 = md5(fileBolb)
            //   console.log('fileMD5', fileMD5)
            //   console.log("文件未被上传，将分片上传")
            readChunkMD5()
        })
    }
    const getChunkInfo = (file, currentChunk, chunkSize) => {
        let start = currentChunk * chunkSize
        let end = Math.min(file.size, start + chunkSize)
        let data = file.slice(start, end)
        let chunk = new File([data], file.name, { type: file.type, lastModified: Date.now() });
        return { start, end, chunk }
    }
    // 针对每个文件进行chunk处理
    const readChunkMD5 = async () => {
        // 针对单个文件进行chunk上传
        for (let i = 0; i < chunkCount; i++) {
            const { chunk } = getChunkInfo(file, i, chunkSize)
            // console.log("总片数" + chunkCount)
            // console.log("分片后的数据---测试：" + i)
            await uploadChunk({ chunk, currentChunk: i, chunkCount }).then(data => {
                if (i+1 === chunkCount) {
                    success(data)
                }
            })
        }
    }
    const uploadChunk = (chunkInfo) => {
        return new Promise((resolve, reject) => {
            let formData = new FormData()
            formData.append('identifier', fileMD5)
            formData.append('chunkNumber', chunkInfo.currentChunk + 1)
            formData.append('chunkSize', chunkSize)
            formData.append('file', chunkInfo.chunk)
            formData.append('totalChunks', chunkInfo.chunkCount)
            axios({
                url: `/api/system/file/fastDfsChunkUpload`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: sessionStorage.getItem('accessToken') || ''
                },
                data: formData
            }).then(({ data }) => {
                resolve(data)
            }).catch(err => {
                reject(err);
            })
        })
    }
    readFileMD5() // 开始执行代码
}
```