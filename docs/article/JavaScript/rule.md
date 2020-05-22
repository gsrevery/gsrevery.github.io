# 前端代码规范

## 特别注意
* 1.创建对象时，尽量不要创建布尔对象。它会拖慢执行速度。

## 一.HTML

### 1.语义化标签
* HTML5 提供了很多语义化元素，更好地帮助描述内容。希望你能从这些丰富的标签库中受益。请确保正确使用语义化的标签，错误的用法甚至不如保守的用法。

### 2.简洁
* 确保代码的简洁，不要再采用XHTML的旧做法。

### 3.属性顺序
> Html属性应该按照特定的顺序出现以保证易读性。
* class
* id
* name
* data-*
* src, for, type, href, value , max-length, max, min, pattern
* placeholder, title, alt
* aria-*, role
* required, readonly, disabled
 
### 4.字符编码
* 通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

### 5.可用性
* 可用性不应该是事后才考虑的事情。你可以通过简单的修改做出不错的效果。
> 1. 正确使用alt属性
> 2. 确保链接和按钮正确使用（避免<div class = button>）这种粗暴的写法
> 3. 不依赖于颜色来传达信息
> 4. 给表单做好lable标记

## 二.CSS ,SCSS

### 1.分号
* 不能漏写分号。
        div {
            color:red;
        }

### 2.选择器
* 紧密耦合DOM选择器，三个层级以上建议加class：
        /* bad */
        div:first-of-type :last-child

        /* good */
        div:first-of-type .info
* 避免不必要的写法：
        /* bad */
        img[src$=svg], ul > li:first-child{
            opacity: 0;
        }
        
        /* good */
        [src$=svg] , ul > :first-child{
            opacity: 0;
        }

### 3.指明
* 不要让代码难于重写，让选择器更精确，减少ID、避免使用!important

### 4.覆盖
* 覆盖样式会使维护和调试更困难，所以要尽量避免。
        /* bad */
        li {
            visibility: hidden;
        }
        li:first-child {
            visibility: visible;
        }
        
        /* good */
        li + li {
            Visibility: hidden;
        }

### 5.继承
* 不要把可继承的样式重复声明:
        /* bad */
        div h1, div p {
            text-shadow: 0 1px 0 #fff;
        }
        
        /* good */
        div {
            text-shadow: 0 1px 0 #fff;
        }

### 6.代码的简洁性
* 保持代码的简洁。使用属性缩写。不必要的值不用写。
        /* bad */
        div {
            transition: all 1s;
            top: 50%;
            margin-top: -10px;
            padding-top: 5px;
            padding-right: 10px;
            padding-bottom: 20px;
            padding-left: 10px;
        }
        /* good */
        div {
            transition: 1s;
            top: calc(50% - 10px);
            padding: 5px 10px 20px;
        }

### 7.动画
* 除了变形和改变透明度用animation，其他尽量使用transition。
        /* bad */
        div:hover {
            animation: move 1s forwards;
        }
        @keyframes move {
            100% {
                margin-left: 100px;
            }
        }

        /* good */
        div:hover {
            transition: 1s;
            transform: translateX(100px);
        }

### 8.单位
* 可以不用单位就不用单位。建议用rem。时间单位用s比ms好。

### 9.颜色
* 需要做透明效果是用rgba,否则都用16进制表示。

### 10.id及class命名
* class应以功能过内容命名，不以表现形式命名，通用且有意义的词
* class与id单词字母小写，多个单词组成时，使用中划线“-”分隔

### 11.样式的声明顺序
> 1. 定位
> 2. 盒模型
> 3. 关于文字
> 4. 关于颜色背景
> 5. 其他：如：cursor:pointer

        .declaration-order {
            /*定位 */
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            /* 盒模型 */
            padding: 10px;
            border-radius: 3px;
            float: right;
            overflow: hidden;
            /* 关于文字 */
            font: normal 13px "Helvetica Neue", sans-serif;
            line-height: 1.5;
            text-align: center;
            /* 关于颜色，背景 */
            background-color: #f5f5f5;
            color: #fff;
            opacity: .8;
            /*其他 */
            cursor: pointer;
        }

## 三.ES6语法规范

### 1.let取代var
* ES6提出了两个新的声明变量的命令：let和const。其中。Let完全可以取代var，因为两者语义相同，而且let没有副作用。

### 2.全局常量const
* 在全局环境，不应该设置变量，只应设置常量。好处：
* const优于let有几个原因:
> 1. const可以提醒阅读程序的人，这个变量不应该改变；
> 2. const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；
> 3. javascript编译器会对const进行优化，所以多使用const，有利于提高程序运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。
> 4. Const声明常量还有两个好处，一是阅读代码的人会立刻意识到不应该修改这个值，而是为了防止无意间修改变量值所导致的错误。

### 3.新增（i++）
* 尽量不要使用i++,尽量使用i+1;(除了for循环)

## 四．vue规范

### 1.vue方法放置顺序
1. components
2. props
3. data
4. created
5. mounted
6. activited
7. update
8. beforeRouteUpdate
9. metods
10. filter
11. computed
12. watch

### 2.method自定义方法命名
1. 动宾短语
        /* good */
        jumpPage、openCarlnfoDialog
        
        /* bad */
        go、nextPage、show、open、login
2. ajax方法以get、post开头，以data结尾
        /* good */
        getListData、postFromData
        
        /* bad */
        takeData、confirmData、gitList、postFrom
3. 事件方法以on开头
        onTypeChange、onUsernameInput
4. init、refresh单词除外
5. 尽量使用常用单词开头
        onTypeChange、onUsernameInput
6. 驼峰命名
        /* good */
        getListData
        
        /* bad */
        get_list_data、getlistData

### 3.生命周期方法注意点
1. 不在mounted、created之类的方法里写逻辑、取ajax数据。
2. 在created里面监听Bus事件

### 4.基于模块开发
* 原则：每一个VUE组件首先必须专注于解决一个单一问题，独立的、可复用的、微小的和可测试的。如果你的组件做了太多的事或是变得臃肿，请将其拆成更小的组件并保持单一原则。

### 5.只在需要时创建组件
* Vue.js是一个基于组件的框架。如果你不知道何时创建组件可能会导致以下问题。
> 1. 如果组件太大, 可能很难重用和维护;
> 2. 如果组件太小，你的项目就会（因为深层次的嵌套而）被淹没，也更难使组件间通信。

#### **规则**
> 1. 尽可能早地尝试构建出诸如模态框、提示框、工具条、菜单、头部等这些明显的（通用型）组件。总之，你知道的这些组件以后一定会在当前页面或者是全局范围内需要。
> 2. 在每一个新的开发项目中，对于一整个页面或者其中的一部分，在进行开发前先尝试思考一下。如果你认为它有一部分应该是一个组件，那么就创建它吧。
> 3. 如果你不确定，那就不要。避免那些“以后可能会有用”的组件污染你的项目。它们可能会永远的只是（静静地）待在那里，这一点也不聪明。注意，一旦你意识到应该这么做，最好是就把它打破，以避免与项目的其他部分构成兼容性和复杂性。
