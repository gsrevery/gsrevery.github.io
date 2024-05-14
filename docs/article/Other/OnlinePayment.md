# 在线支付

## 前期准备材料

## 开通在线支付需要icp备案和网安备案
* 准备营业执照
* 网站负责人的身份证正反和手持照片


**注意查询需要使用根域名，不带www.**
1. 网站需要icp备案(这个在网址申请时就会备案)
    * 网站备案查询地址[https://beian.miit.gov.cn/#/Integrated/index]
2. 公安备案（网安备案）
    * 公安备案填写流程[https://www.anhuidiwen.com/h-nd-75.html]
    * 公安备案接入服务商如何填写？[https://www.bellygroups.com/website/1899.html]

## 确定支付方式`微信、支付宝`
根据项目的需求选择在线支付合作方，微信、支付宝、第三方...

## 在线支付-生成二维码
安装插件：`yarn add qrcodejs2`
```vue
<template>
    <Modal v-model="isShow" fullscreen footer-hide title="扫码支付" @on-visible-change="modalStatus">
        <div class="qrcode" :id="id" :ref="id" />
    </Modal>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
    data() {
        return {
            qrcode: '',
            isShow: false
        }
    },
    props: {
        isShowModel: {
            type: Boolean,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        // 后端返回的二维码地址
        text: {
            type: String,
            default: 'https://www.baidu.com/'
        },
        width: {
            type: String,
            default: '128'
        },
        height: {
            type: String,
            default: '128'
        },
        colorDark: {
            type: String,
            default: '#000000'
        },
        colorLight: {
            type: String,
            default: '#ffffff'
        }
    },
    watch: {
        text(newText) {
            this.createQrcode()
        },
        isShowModel(newValue) {
            this.isShow = newValue
        }
    },
    mounted() {
        this.createQrcode()
    },
    methods: {
        modalStatus() {
            console.log(this.isShow, 'this.isShow')
            this.$emit('on-visible-change', this.isShow)
        },
        createQrcode() {
            if(this.qrcode) {  // 有新的二维码地址了，先把之前的清除掉
                this.$refs[this.id].innerHTML = ''
            }
            this.qrcode = new QRCode(this.$refs[this.id], {
                text: this.text, //页面地址 ,如果页面需要参数传递请注意哈希模式#
                width: this.width, // 二维码宽度 （不支持100%）
                height: this.height, // 二维码高度 （不支持100%）
                colorDark: this.colorDark,
                colorLight: this.colorLight,
                correctLevel: QRCode.CorrectLevel.H,
            })
        },
        // 制作另一个二维码
        updateCode() {
            this.qrcode.makeCode("")
        }
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .ivu-modal-header {
        text-align: center;
    }
    .qrcode {
        width: 100%;
        height: 100%;
        text-align: -webkit-center;
        // 兼容火狐浏览器
        text-align: -moz-center;
    }
</style>
```

## 在线支付-扫码阶段
```js
// 链接webSocket
initWebSocket() {          
    //判断当前浏览器是否支持WebSocket, 主要此处要更换为自己的地址
    if ('WebSocket' in window) {
        let headWebSocketUrl = ''
        if (process.env.NODE_ENV === 'production') {
            // 线上环境
            headWebSocketUrl = 'ws://110.10.10.110:10086' || ''
        } else {
            // 测试/开发环境
            headWebSocketUrl = 'ws://110.10.10.110:10086' || ''
        }
        this.websocket = new WebSocket(`${headWebSocketUrl}/socket/${this.reqsn}`);
    } else {
        alert('Not support websocket')
    }
    //连接发生错误的回调方法
    this.websocket.onerror = () => {
        console.log('error')
        //重连
        this.reconnect()
    }
    //连接成功建立的回调方法
    this.websocket.onopen = () => {
        console.log('open')
    }
    //接收到消息的回调方法
    this.websocket.onmessage = (event) => {
        if (event.data === '1') {
            console.log(this, 'websocket')
            // 关闭二维码弹窗，清空定时任务
            this.websocket.close()
        } else if (event.data === '2') {
            // 支付失败
            this.websocket.close()
        }
        // else if (event.data === '3') {
        //     // 待支付（等待过程）
        // }
    }
    //连接关闭的回调方法
    this.websocket.onclose = () => {
        console.log('close')
        //重连
        this.reconnect()
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    this.websocket.onbeforeunload = () => {
        this.websocket.close()
    }
},
// 重连
reconnect () {
    // 二维码弹窗关闭后不需要重连,直接断开连接
    if (this.isShowModel) {
        var that = this;
        if (that.lockReconnect) {
            return;
        }
        that.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        that.timeoutnum && clearTimeout(that.timeoutnum);
        that.timeoutnum = setTimeout(function () {
            console.log('重连')
            //新连接
            that.initWebSocket();
            that.lockReconnect = false;
        }, 1000);
    } else {
        this.websocket.close()
    }
},
//关闭连接
closeWebSocket() {
    this.websocket.close()
},
```