# 树 :ghost:

## DOM树
* DOM 全称为“文档对象模型”`Document Object Model`。
* 有这几个概念：文档、元素、节点
    > 整个文档是一个文档节点
    > 每个标签是一个元素节点
    >包含在元素中的文本是文本节点,每一个属性是一个属性节点
* DOM树是结构,所谓层级结构是指元素和元素之间的关系,父子,兄弟。
* 树中包含DOM节点时，意思就是这个树是由实现了DOM接口的元素组成。这些实现包含了其它一些浏览器内部所需的属性。

**DOM 是 Document Object Model（文档对象模型）的缩写**
* 5个常用的DOM方法：getElemenById、getElementsByTagName、getElementsByClassName、getAttribute和setAttribute

1. 文档：DOM中的"D"

* 如果没有document（文档），DOM也就无从谈起。当创建了一个网页并把它加载到Web浏览器中时，DOM就在幕后悄然而生了。它把你编写的网页文档转换成为一个文档对象。

2. 对象：DOM中的"O"

* 对象（object）是一种非常重要的数据类型。对象是自包含的数据集合，包含在对象里的数据可以通过两种形式访问———属性和方法。
    > 属性是隶属于某个特定对象的变量；
    > 方法是只有某个特定对象才能调用的函数

3. 模型：DOM中的"M"

* DOM中的“M”代表着“Model”（模型），它的含义是某种事物的表现形式，DOM代表着加载到浏览器窗口的当前网页。浏览器提供了网页的模型，而我们可以通过JavaScript去读取这张地图。

<img src="../../../images/javascript/dom-tree.png" style="height:200px; width:100%">

## CSSOM树

## render tree 渲染树
<img src="../../../images/javascript/render-tree.png" style="height:200px">

Html渲染步骤
1. 渲染HTML标签建立DOM树
2. 渲染CSS标签建立CSSOM树
3. 结合CSSOM树和DOM树形成一个render tree
4. 在render树上运行布局来计算每个节点的形状
5. 在屏幕上画每一个节点
* 渲染树（render tree）里面包括单纯只是css样式为隐藏或透明状态的元素节点。
* **注意：** display：none；的元素节点都已经被隐藏掉了，即为dom节点没有在render tree中，但是在渲染dom树的时候，它还是存在的。