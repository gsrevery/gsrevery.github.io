# 总体概览

## 基础渲染

### 创建一个canvas画布
### 创建场景-scene
定义：添加3D对象的地方，在实际开发中场景是透明的、看不见的，需要做相关的设置

作用
    
    Scene 对象是所有不同对象的容器，也就是说该对象保存所有物体、光源、摄像机以及渲染所需的其他对象。
    Scene 对象又是被称为场景图，它不仅仅是一个对象数组，还包含了整个场景图树形结构中的所有节点：
     * 每个添加到 Three.js 场景的对象，甚至包括 THREE.Scene 本身都是继承自一个名为 THREE.Object3D 的对象。
     * 每个 THREE.Object3D 对象也可以有自己的子对象，我们可以使用它的子对象来创建一个 Three.js 能解释和渲染的对象树。


常用方法及属性

    add(object)： 用于向场景中添加对象。使用该方法还可以创建对象组。
    children：用于返回一个场景中所有对象的列表，包括摄像机和光源。
    getObjectByName(name,recursive)：在创建对象时可以指定唯一的标识 name，使用该方法可以查找特定名字的对象。
     * 当参数 recursive 设置为 false 时，在调用者子元素上查找
     * 当参数 recursive 设置为 true 时，在调用者的所有后代对象上查找

    remove(object)： object 为场景中对象的引用，使用该方法可以将对象从场景中移除。  
    traverse(function)：该方法也可以遍历调用者和调用者的所有后代，function 参数是一个函数，被调用者和每一个后代对象调用 function 方法。
    fog ：使用该属性可以为场景添加雾化效果，可以产生隐藏远处物体的浓雾效果。  
    overrideMaterial：使用该属性可以强制场景中的所有物体使用相同的材质。
scene场景的结构
```js
group
    group
        mesh
        line
        point

    group
        mesh
        line
        point


group
    group
        mesh
        line
        point


group
    mesh
    line
    point

light
```


### 光源

光源的类型
        
    环境光（AmbientLight）
        该光源没有特定的方向，不会产生阴影。

    点光源（PointLight）
        一个向各个方向发光的光源从一个点发出。

    定向光（DirectionalLight）
        发出的所有光线彼此平行，太阳就是一个很好的例子。

    聚光灯（SpotLight）
        最常使用的灯之一（尤其是如果您想要使用阴影），THREE.SpotLight是一种具有锥形效果的光源，你可以将其与手电筒或灯笼进行比较，这种光有方向和角度它产生光。

    半球光（HemisphereLight ）
    区域光（AreaLight）
    镜头光晕（LensFlare）

创建光源

    1.创建光源
    2.设置光源的位置
    3.打开或者关闭阴影
    4.将光源添加进入场景


### 相机-camera

相机的类型：

    1.正交相机orthographic：在这种投影模式下，渲染图像中的对象大小保持不变，无论其与相机的距离如何。这对于渲染 2D 场景和 UI 元素等非常有用。
    2.透视相机perspective：这种投影模式旨在模仿人眼看到的方式。它是用于渲染 3D 场景的最常见的投影模式。

创建相机

    1.创建相机（PerspectiveCamera）
    2.设置相机的位置
    3.设置相机以那个方向为上方
    4.设置相机看向那个坐标
    5.将相机添加进入场景


### 创建渲染器-renderer（WebGLRenderer）

### 模型

几何体

    缓冲类几何体（BufferGeometry）
    长方体（BoxGeometry）
    圆柱体、圆锥、三面体、四面体（梯形）（CircleGeometry）
    圆锥体（ConeGeometry）
    球体（SphereGeometry）
    立方体边框（BoxHelper）
        入参：模型和颜色
            边框不需要进行设定位置，会自动在模型边上进行吸附


    圆柱体、梯形边框（EdgesGeometry）
        let cubeGeometry = new THREE.CylinderGeometry((80, 80, 50, 40, 40)   // 创建一个圆柱材质
        let cylinderEdges = new THREE.EdgesGeometry(cubeGeometry, 1);   // 创建一个圆柱边框
        let edgesMtl = new THREE.LineBasicMaterial({ color: ‘red’})  // 创建基础线条材质
        let border = new THREE.LineSegments(cylinderEdges, edgesMtl);  //  创建线框
        cube.add(border );   // 将线框加入几何体中
    
    不规则模型（Shape）
        先使用Shape创建一个不规则平面（使用点到点连线）
        再将平面加厚则可以得到一个不规则模型

创建模型mesh

    1.创建几何体
    2.创建材质
    3.设置几何体位置
    4.添加进入场景scene

### 边框
给模型添加边框的两种方式
```js
// 方法一：
let cubeGeometry = new THREE.BoxGeometry(100, 80, 90)
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
let cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red' })
// 将需要的参数加入group中
group.add(cube)
let border = new THREE.BoxHelper(cube, 'red')
group.add(border)

```
**注意1：用这种方法，只适合与立方体**

**注意2：用这种方法，比如我要旋转立方体，边框不会跟着改变。**
```js
// 方法二：
let cubeGeometry = new THREE.CylinderGeometry((80, 80, 50, 40, 40)   // 创建一个圆柱材质
let cylinderEdges = new THREE.EdgesGeometry(cubeGeometry, 1);   // 创建一个圆柱边框
let edgesMtl = new THREE.LineBasicMaterial({ color: 'red'})  // 创建基础线条材质
let border = new THREE.LineSegments(cylinderEdges, edgesMtl);  //  创建线框
cube.add(border );   // 将线框加入几何体中
```
**注意：用这种方法，比如我要旋转立方体，边框会跟着改变。**

## 功能

### 模型拖动

鼠标拖动DragControls属性

    dragstart：开始移动
    drag：移动中
    dragend：结束移动
    hoveron：移动鼠标在模型上
    hoveroff：移动鼠标离开模型

键盘按键移动

    addEventListener()

创建模型拖动

    1.创建模型拖动对象（DragControls）
        传入mesh集合、相机对象、渲染器对象

    2.创建拖动事件
        可以改变拖动颜色，获取拖动后的坐标等等



### 碰撞检测（Raycaste、Box3）
Raycaste()：在物体的各个顶点发出射线，计算是否和其他物体相交。

Box3()：在物体上创建包围盒，计算两个物体包围盒是否相交。

    1.创建当前拖动的mesh为meshA
        let meshA = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    2.循环其他需要参与碰撞检测的mesh
    3.创建循环体内将每一个mesh为meshB
        let meshB= new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    4.判断meshA是否与meshB重合（meshA.intersectsBox(meshB)）

**注意：碰撞检测，检测的是最外层mesh**

### 视角切换

补间动画（TWEEN.Tween）

    让视角切换更平滑

设置相机位置（position.set）

### 模型贴图（CanvasTexture）
1. 创建一个canvas元素
2. 作为一个参数传入THREE.CanvasTexture
3. 贴图纹理更新texture.needsUpdate = true


## 智能装箱功能
### 创建字体（TextGeometry）
1. 创建字体对象（FontLoader）
2. 引入字体json文件
3. 创建文字几何图形（TextGeometry）
4. 创建文字的正面和侧面集合（MeshPhongMaterial）
5. 创建一个mesh模型将文字几何图形和文字集合放入其中
6. 将mesh模型加入场景中

### 创建三维坐标轴（AxesHelper）
1. 创建三维坐标系
2. 创建好坐标系将其加入场景中

### 创建线条（Line）
1. 创建材质（LineBasicMaterial）
2. 创建空间几何体（BufferGeometry）
3. 创建顶点集合（Vector3）
4. 绑定顶点到创建好的空间几何体（setFromPoints）
5. 创建线条（Line）
6. 将线条添加进场景中

### 创建控件对象（OrbitControls）
1. 创建控件对象（OrbitControls）
2. 修改鼠标控制事件
    * 上下滚动鼠标中键：缩放三维场景
    * 鼠标左键：720旋转展示三维场景
    * 鼠标右键：可以平移三维场景（关闭）



## 优化
**注意：避免重复创建模型对象，可以使用clone()方法**
* clone()返回一个新的几何体对象，返回新的几何体对象包含原来的几何体顶点数据、顶点索引数据、UV坐标数据。
* threejs中的clone方法是一个浅度的clone，clone复制了新的对象，但是原对象内部的对象（属性为对象）不会被clone，我们需要对内部对象也进行clone就可以


常见问题
* 在用copy()和clone()进行对象复制后，使用Raycaster射线做obj模型选择时，使用clone方式选择指定对象对其颜色进行增强，但是修改新对象的material原皮肤也变更。

