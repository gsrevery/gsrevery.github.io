# 不常见的但实用的css :grin:

## last-child选择器
*  在使用循环时，需要给循环出来的最后一个元素添加css样式时很有帮助
* Eg1: 指定父元素中最后一个p元素的背景色：
```
p:last-child
    {
        background:#ff0000;
    }
```
* Eg2: 去掉tab切换后面多余的“/”

<img src="../../../images/css/css1.jpg" height="60">

#### 代码

```css
<template>
    <div class="tabWrapper">
        <div class="tabTitle">
            <div
                class="tabBtn"
                :class="{'tabBtnActive':btnIndex == index+1} "
                v-for="(titleItem,index) in titleNames"
                :key="index"
                @click="handleBtnClick(index)"
            >{{ titleItem }}
            <span>/</span>
            </div>
        </div>
        <div class="tabMain">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btnIndex: 1,
            titleNames: ['选择基础任务', '选择附加任务', '选择单据'],
        }
    },
    methods: {
        //  点击头部
        handleBtnClick(index) {
            this.btnIndex = index + 1
        }
    }
}
</script>
<style lang='scss' scoped>
.tabTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    .tabBtn {
        position: relative;
        width: 205px;
        text-align: center;
        font-size: $font-size-large;
        padding: 5px 0px;
        color: $main-font-color;
        cursor: pointer;
        &:last-child{
            span{
                display: none;
            }
        }
        span{
            position: absolute;
            right: 0;
            color: black;
        }
    }
    .tabBtnActive {
        color: $light-color;
    }
}
</style>
```

## pre文档标签

* 使用之后，标签内的内容，怎样输入怎么展示，格式不会改变
* 注意`<p> `和 `<address>` 标签，绝不能包含在` <pre>` 所定义的块里
* `pre`标签内不能使用`js`

```javascript
    <div class="details">
    <!-- 标签缩进不能修改，使用了pre标签展示文档内容 -->
        <pre>

            版本号：2017年8月7日                                        生效日期：2017年11月1日
            中新冷链产品国际贸易平台一直致力于诚信原则，并积极维护平台有序的市场秩序，为制止盗用图片的违规行为，提升用户体验，特依据《中新冷链产品国际贸易平台规则》，制订本规则。
            一、图片盗用行为的定义
            指用户利用中新冷链产品国际贸易平台（简称“国际站”）发布未经图片所有人许可而擅自使用的行为
            投诉处理原则：投诉方为信息所有人，不接受来自第三方的投诉。
            二、图片盗用处罚规则：
            投诉成立：针对被投诉方账号，首次投诉成立5天内算一次，扣3分；第6天开始，被第二次投诉成立扣3分，被第三次及以上投诉成立扣6分，一天内若有多次投诉扣一次分（投诉成立结案将删除涉案产品）。所有时间以投诉处理完结时间为准。
            对应的账号处理标准《中新冷链产品国际贸易平台用户违规处罚标准》（除特别说明外，中新冷链产品国际贸易平台全站的罚分累加计算）
            三、图片盗用投诉及被投诉处理流程
            四、附则
            1、中新冷链产品国际贸易平台有权根据法律法规的调整、经营环境的变化等因素及时地修订本规则并予以公示，修订后的规则于公示中指定日期生效。
            2、本规则为《中新冷链产品国际贸易平台规则》的组成部分，本规则与《中新冷链产品国际贸易平台规则》不一致的，以本规则为准，本规则未尽事宜，以《中新冷链产品国际贸易平台规则》为准。
            3、本规则如中文和非中文版本存在不一致，歧义或冲突，应以中文版为准。
            如何提交图片盗用投诉？
            被投诉图片盗用如何处理？
        </pre>
    </div>
```

## 换行、空格

1. 强制换行,换行时会拆分单词：
```css
.box {
    word-wrap: break-word;
}
```

2. 可以展示连续空格，但是不能自动换行
```css
.box {
    white-space: pre;
}
```

3. 数据中有换行符能根据换行符换行并且可以自动换行
```css
.box {
    white-space: pre-line;
}
```

4. 既可以展示连续空格也可自动换号
```css
.box {
    white-space: pre-wrap;
}
```

## 盒子模型

### 盒子模型换行
盒子模型中——子元素按照给定宽度横向排列，如果累积宽度超出父元素宽度则自动换行展示。
```css
.f-box {
    display:flex;
    flex-wrap: wrap;
    width: 300px
}
.s-box {
    width: 100px;
}
```

## 文本
```css
/* 设置文字之间的间隔为2px */
letter-spacing: 2px;

/* 设置首行缩进2个字符 */
text-indent: 2ch;
``