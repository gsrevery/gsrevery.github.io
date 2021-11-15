# 树 :ghost:

## DOM树

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