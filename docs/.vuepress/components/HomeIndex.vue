<template>
    <div>
        <div class="box">
            <!-- JavaScript -->
            <div class="coent-box">
                <div class="title">JavaScript</div>
                <div class="small-box">
                    <div class="title-box" @click="clickJump('优化')">优化</div>
                    <div class="title-box" @click="clickJump('代码规范')">代码规范</div>
                    <div class="title-box" @click="clickJump('练习题')">练习题</div>
                    <div class="title-box" @click="clickJump('对象')">对象</div>
                    <div class="title-box" @click="clickJump('数组')">数组</div>
                    <div class="title-box" @click="clickJump('函数')">函数</div>
                    <div class="title-box" @click="clickJump('内存')">内存</div>
                    <div class="title-box" @click="clickJump('常用方法')">常用方法</div>
                    <div class="title-box" @click="clickJump('this指向')">this指向</div>
                    <div class="title-box" @click="clickJump('代码健壮性')">代码健壮性</div>
                    <div class="title-box" @click="clickJump('树')">树</div>
                    <div class="title-box" @click="clickJump('不常见的但实用的css')">不常见的但实用的css</div>
                    <div class="title-box" @click="clickJump('事件循环机制')">事件循环机制</div>
                    <div class="title-box" @click="clickJump('冒泡')">冒泡</div>
                    <div class="title-box" @click="clickJump('数据特殊处理')">数据特殊处理</div>
                </div>
            </div>
            <div class="interval"></div>
            <!-- vue -->
            <div class="coent-box">
                <div class="title">Vue</div>
                <div class="small-box">
                    <div class="title-box" @click="clickJump('组件')">组件</div>
                    <div class="title-box" @click="clickJump('跨域')">跨域</div>
                    <div class="title-box" @click="clickJump('项目重构优化')">项目重构优化</div>
                    <div class="title-box" @click="clickJump('vue问题')">vue问题</div>
                    <div class="title-box" @click="clickJump('路由')">路由</div>
                </div>
            </div>
        </div>
        <div class="box">
            <!-- other -->
            <div class="coent-box">
                <div class="title">other</div>
                <div class="small-box">
                    <div class="title-box" @click="clickJump('git操作')">git操作</div>
                    <div class="title-box" @click="clickJump('lodop插件')">lodop插件</div>
                    <div class="title-box" @click="clickJump('面试')">面试</div>
                    <div class="title-box" @click="clickJump('js常用的各种插件')">js常用的各种插件</div>
                    <div class="title-box" @click="clickJump('vscode常用插件')">vscode常用插件</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        clickJump(val) {
            switch (val) {
                // JavaScript
                case '优化':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Optimization`
                break;
                case '代码规范':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Rule`
                break;
                case '练习题':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/QA-daily`
                break;
                case '对象':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Object`
                break;
                case '数组':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Array`
                break;
                case '函数':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Function`
                break;
                case '内存':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Ram`
                break;
                case '常用方法':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Method`
                break;
                case '代码健壮性':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Robustness`
                break;
                case '树':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Tree`
                break;
                case 'this指向':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/This`
                break;
                case '不常见的但实用的css':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Css`
                break;
                case '事件循环机制':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/EventLoop`
                break;
                case '冒泡':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/Bubble`
                break;
                case '数据特殊处理':
                    window.location.href = `${window.location.origin}/blog/article/JavaScript/CommonlyMethod`
                break;
                // Vue
                case '组件':
                    window.location.href = `${window.location.origin}/blog/article/Vue/Components`
                break;
                case '跨域':
                    window.location.href = `${window.location.origin}/blog/article/Vue/CrossDomain`
                break;
                case '项目重构优化':
                    window.location.href = `${window.location.origin}/blog/article/Vue/Reconstruction`
                break;
                case 'vue问题':
                    window.location.href = `${window.location.origin}/blog/article/Vue/Question`
                break;
                case '路由':
                    window.location.href = `${window.location.origin}/blog/article/Vue/Router`
                break;
                // other
                case 'git操作':
                    window.location.href = `${window.location.origin}/blog/article/Other/Git`
                break;
                case 'lodop插件':
                    window.location.href = `${window.location.origin}/blog/article/Other/LODOP`
                break;
                case '面试':
                    window.location.href = `${window.location.origin}/blog/article/Other/Interview`
                break;
                case 'js常用的各种插件':
                    window.location.href = `${window.location.origin}/blog/article/Other/PluginUnit`
                break;
                case 'vscode常用插件':
                    window.location.href = `${window.location.origin}/blog/article/Other/Vscode`
                break;
                default:
                break;
            }
        }
    },
}
</script>

<style scoped>
    /* 优化滚动条 */
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar{
        width: 7px;
        height: 7px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    /* ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    } */

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        background-color: #c8c8c8;
    }
    /* 修改框架自带的样式 */
    /* /deep/ .theme-container .theme-default-content {
        max-width: 1040px;
    }
    /deep/ .theme-container .page {
        padding-bottom: 0rem;
    } */
    .box {
        display: flex;
        width: 100%;
    }
    .title {
        font-size: 20px;
    }
    .interval {
        width: 4%;
    }
    .coent-box {
        width: 48%;
        height: 400px;
    }
    .small-box {
        margin-top: 10px;
        height: 350px;
        border: 1px solid #3333;
        border-radius: 15px;
        overflow-y: auto;
    }
    .small-box:hover {
        border: 1px solid #9999;
    }
    .title-box {
        margin: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>

