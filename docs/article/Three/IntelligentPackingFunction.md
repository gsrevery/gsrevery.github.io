# Three常见问题及解决方案

three中文教程: [https://techbrood.com/threejs/docs/](https://techbrood.com/threejs/docs/)
复杂3D模型库: [https://sketchfab.com/search?q=truck&type=models](https://sketchfab.com/search?q=truck&type=models)

## 在three.js中创建中文
three.js中内置的字体不能显示中文（显示出来是`?`号），所以如果需要显示中文有三种方案：

1.在网上找到中文字体（网上的中文字体基本上是.tt格式），可以通过在线工具`https://gero3.github.io/facetype.js/`将tt格式的字体转换为json格式
> 缺点：json格式的字体很大，基本上都是20M左右（有个别的在10M左右）

2.在网上找到中文字体（网上的中文字体基本上是.tt格式），不用转换格式可以直接使用TTFLoader方法进行编码。
> 缺点：需要改动之前的代码.tt格式的文件一般也有2m左右

3.直接在英文字体的json文件内添加中文的json（在json文件中的`glyphs":{}`内添加）
> 缺点：只有添加过的文字才能展示为中文，其他的都是?号

> 优点：速度快，json文件大小只有60kb左右

## 在three中创建简单不规则模型
因为在three中提供的模型api有限(提供的api及模型样例`https://techbrood.com/threejs/docs/`，可以通过该网址查看)，如果在api中没有找到对应的模型，我们可以使用`new THREE.Shape()`该方法先创建一个平面模型，然后加深该平面得到一个立方体模型，以下为该方法的使用示例：
### 在three.js中创建圆弧三角形体
```js
// 思路：
// 1.定义三个点A、B、C
// 2.A、B，B、C点用直线连接，C、A点用曲线连接
// 3.加厚改平面形成一个立体图形

// 1.定义三个点A、B、C
let points[
    [0, 0],
    [0, 20],
    [30, 0]
]
const shape = new THREE.Shape()
// 2.A、B，B、C点用直线连接，C、A点用曲线连接
shape.moveTo(points[0][0], points[0][1])
shape.lineTo(points[1][0], points[1][1])
shape.quadraticCurveTo(points[2][0] / 5, points[2][0] / 5, points[2][0], points[2][1])
shape.closePath()
// 3.加厚改平面形成一个立体图形
const geometry = new THREE.ExtrudeGeometry(shape, { depth: 20, bevelEnabled: false })
const material = new THREE.MeshBasicMaterial({
    color: 'red'
})
const polygon = new THREE.Mesh(geometry, material)
polygon.castShadow = true // 对象是否渲染到阴影贴图中(对象是否可以产生阴影)
this.group = new THREE.Group()
this.group.name = name
this.group.add(polygon)
this.scene.add(this.group)
```


### 在three.js中创建椭圆柱
```js
// 思路：
// 1.定义一个椭圆的轮廓路径
// 2.获取轮廓路径上的点（这里我获取的是50个点，点越多弧形越流畅）
// 3.将这些点收尾相连，形成一个平面
// 4.加厚改平面形成一个立体图形
const pointsArray = []
// 定义一个椭圆的轮廓路径
const ellipse = new THREE.EllipseCurve(
    0, 0, // ax, aY
    length / 2, width / 2, // xRadius, yRadius
    0, 2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
)
// 获取椭圆曲线上的点
const points = ellipse.getPoints(50)
// 将这些点收尾相连，形成一个平面
points.map(point => pointsArray.push(new THREE.Vector2(point.x, point.y)))
const shape = new THREE.Shape(pointsArray)
// 加厚改平面形成一个立体图形
const geometry = new THREE.ExtrudeGeometry(shape, { depth: 20, bevelEnabled: false })
const material = new THREE.MeshBasicMaterial({
    color: red
})
const polygon = new THREE.Mesh(geometry, material)
polygon.castShadow = true // 对象是否渲染到阴影贴图中(对象是否可以产生阴影)
this.group = new THREE.Group()
this.group.name = name
this.group.add(polygon)
this.scene.add(this.group)
```

### 在three.js中创建空心圆柱
```js
// 绘制空心圆柱
// 定义外圆和内圆的中心点，这里假设都在原点(0,0)
const shape = new THREE.Shape()
// shape.moveTo(0, 0); // 移动到外圆的开始点
shape.absarc(0, 0, radiusTop - radiusTop / 2, 0, Math.PI * 2, false); // 画外圆
shape.absarc(0, 0, radiusTop, 0, Math.PI * 2, true); // 画内圆，注意这里使用true是因为要减去内圆部分
const geometry = new THREE.ExtrudeGeometry(shape, { depth: radiusHeight, bevelEnabled: false })
var material = new THREE.MeshBasicMaterial({ color: radiusColor });
cylinders = new THREE.Mesh(geometry, material);
this.group = new THREE.Group()
this.group.name = name
this.group.add(cylinders)
this.scene.add(this.group)
```

## 避免depthTest属性的使用
**depthTest：材质深度测试，渲染的时候材质对象对应的模型都会进行深度测试。depthTest属性值默认true,设置为false可以关闭深度测试.**

`depthTest = false`属性的使用会造成模型的透视，如果需要使用该属性则先了解清除该规则，尽量避免模型透视（**模型先创建的可以透视模型后创建的**）

## 碰撞检测
碰撞检测我了解到的有三种：

1. Raycaste()：在物体的各个顶点发出射线，计算是否和其他物体相交。

2. Box3()：在物体上创建包围盒，计算两个物体包围盒是否相交。

3. cannon.js：创建物理模型，运动过程中判断（该方案在cannon物理引擎中有示例）

第一二种适用于立方体模型，第三种适用于球体。这里我详细说一下第二种方案：

示例代码
```js
const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshPhongMaterial({ color: 0x6688aa })
// 模型A
const cubeA = new THREE.Mesh(geometry, material)
cubeA.position.set(0, 0, 0)
// 模型B
const cubeB = new THREE.Mesh(geometry, material)
cubeB.position.set(60, 0, 0)
// 假设两个模型在运动
const objBox3A = new THREE.Box3().setFromObject(cubeA)
const objBox3B = new THREE.Box3().setFromObject(cubeB)
// 判断模型碰撞
if(objBox3A.intersectsBox(objBox3B)) {
    console.log('两个模型相交了')
}
// 判断模型B是否在模型A内部
if(objBox3A.containsBox(objBox3B)) {
    console.log('模型B在模型A内部')
}
```

## 世界坐标
在3D场景中进行模型拖拽或者位置改变，经常出现模型在同一个位置而坐标不相同的情况，出现这种情况的原因是模型的坐标是相对于他的父元素的属于局部坐标，我们应该将其修改为世界坐标，得到的世界坐标，才是当前场景下的固定坐标。

使用方法：`getWorldPosition()`

在模型运动中使用时应该注意使用clone`cubeA.worldPosition = cubeA.getWorldPosition(cubeA.position.clone())`

## 画线
场景：在three场景中，鼠标点击在集装箱上，然后根据点，两两进行画线，模拟集装箱内的加固带

实现方案：
* 1.获取dom元素
* 2.在dom元素上创建鼠标点击事件
* 3.获取点击的屏幕坐标
* 4.创建three中的射线，并且计算射线与场景的交点
* 5.得到交点，将其转换为场景中的世界坐标
* 6.矫正鼠标点击的位置，使其在一定范围内点击的点固定在集装箱边上
* 7.保存每个点的坐标，当坐标为偶数位时,抽取最后两位进行连线。

下面为示例代码：不能直接用，其中有些参数，方法未定义或者引用
```js
/**
     * 获取鼠标点击的世界坐标
     * @param { number } num 线条像素
     *  - @param { String } canvasName 点击区域
     *  - @param { String } visualAngle 视角 before正视、left左视、top俯视
     *  - @param { function } _getPoint 内容返回
     *  - @param { String } status 当前状态：open打开，close关闭
     * @returns
     */
    // 获取鼠标点击的世界坐标
    getMousePointPosition(num, canvasName, visualAngle, _getPoint, status) {
        let can = document.querySelector(`#${canvasName}`)
        if (status === 'open') {
            this.lineSizeNum = num
            this.visualAngle = visualAngle
            can.onclick = onMouseDblclick
            // 开始画线时禁止旋转
            this.controls.enableRotate = false;
        } else if (status === 'close') {
            can.onclick = null
            // 开始画线时禁止旋转
            this.controls.enableRotate = true;
        }
        var This = this
        // 集装箱长宽高
        var conLenght = this.length, conWidth = this.width, conHeight = this.height
        // 获取鼠标点击位置
        function onMouseDblclick(event) {
            var mouse = new THREE.Vector2()
            mouse.x = (event.offsetX / can.clientWidth) * 2 - 1
            mouse.y = -(event.offsetY / can.clientHeight) * 2 + 1
            // 创建射线
            var raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(mouse, This.camera)
            // 计算射线与场景的交点
            var intersects = raycaster.intersectObject(This.scene)
            // console.log(intersects, 'intersects')
            if (intersects.length > 0) {
                // 获取交点的世界坐标
                var point = intersects[0].point
                // console.log('点击:', point)
                let returnPoint = _correctPoint(point)
                // console.log(returnPoint, 'returnPoint')
                if (!returnPoint) return null
                // 将坐标放进坐标集合
                This.pointList.push({ x: returnPoint.x, y: returnPoint.y, z: returnPoint.z })
                // console.log(This.pointList)
                // 当坐标为偶数位时,抽取最后两位进行连线
                let length = This.pointList.length
                if (length % 2 === 0) {
                    let obj1 = This.pointList[length - 2]
                    let obj2 = This.pointList[length - 1]
                    // _getPoint将three中的点坐标返回，在两点之前创建直线就可以了
                    _getPoint && _getPoint({ pointStart: obj1, pointEnd: obj2 }, This.lineSizeNum)
                }
            }
        }
        // 矫正鼠标点击的位置
        function _correctPoint(val) {
            let point = val
            let object = {}
            // 各个顶点的最大值及最小值
            let xMax = conLenght / 2, xMin = -conLenght / 2
            let yMax = conWidth / 2, yMin = -conWidth / 2
            let zMax = conHeight / 2, zMin = -conHeight / 2
            // 正视图x轴坐标为xMax，左视图y轴坐标为yMin，俯视图z轴坐标为zMax
            // console.log(This.visualAngle, 'this.visualAngle')
            switch (This.visualAngle) {
            case 'before':
                point.x = xMax
                break;
            case 'left':
                point.y = yMin
                break;
            case 'top':
                point.z = zMax
                break;
            default:
                break;
            }
            // 1.点的x,y,z坐标都判断一遍_closerTo
            // 2.计算closerTo返回值和当前值之间的差值
            // 3.然后对比三组的差值是否在矫正规定值内，没有值或者一个值在内则说明当前点在面上，两个值在内则说明当前点在边线上，三个值在内则说明当前点在顶点上
            let closerNum = 20
            let xContrastVal = _closerTo(point.x, xMax, xMin)
            let xBoolean = Math.abs(xMax - Math.abs(point.x)) < closerNum
            let yContrastVal = _closerTo(point.y, yMax, yMin)
            let yBoolean = Math.abs(yMax - Math.abs(point.y)) < closerNum
            let zContrastVal = _closerTo(point.z, zMax, zMin)
            let zBoolean = Math.abs(zMax - Math.abs(point.z)) < closerNum
            // 判断是否有变量为true
            if (xBoolean && !yBoolean && !zBoolean) {
                // "仅xBoolean为true";
                // Message.warning('请在容器边框上操作')
                // return null
                object = {
                    x: point.x,
                    y: point.y,
                    z: point.z
                }
            } else if (!xBoolean && yBoolean && !zBoolean) {
                // "仅yBoolean为true";
                // Message.warning('请在容器边框上操作')
                // return null
                object = {
                    x: point.x,
                    y: point.y,
                    z: point.z
                }
            } else if (!xBoolean && !yBoolean && zBoolean) {
                // "仅zBoolean为true";
                // Message.warning('请在容器边框上操作')
                // return null
                object = {
                    x: point.x,
                    y: point.y,
                    z: point.z
                }
            } else if (xBoolean && yBoolean && !zBoolean) {
                // "xBoolean和yBoolean为true";
                object = {
                    x: xContrastVal,
                    y: yContrastVal,
                    z: point.z
                }
            } else if (xBoolean && !yBoolean && zBoolean) {
                // "xBoolean和zBoolean为true";
                object = {
                    x: xContrastVal,
                    y: point.y,
                    z: zContrastVal
                }
            } else if (!xBoolean && yBoolean && zBoolean) {
                // "yBoolean和zBoolean为true";
                object = {
                    x: point.x,
                    y: yContrastVal,
                    z: zContrastVal
                }
            } else if (xBoolean && yBoolean && zBoolean) {
                // "xBoolean、yBoolean和zBoolean均为true";
                object = {
                    x: xContrastVal,
                    y: yContrastVal,
                    z: zContrastVal
                }
            } else {
                // "没有true";
                // Message.warning('请在容器边框上操作')
                // return null
                object = {
                    x: point.x,
                    y: point.y,
                    z: point.z
                }
            }
            return object
            // 判读当前点更靠近顶点最大值还是最小值,返回的是更靠近的顶点
            // a:当前坐标点，b顶点最大值，c顶点最小值
            function _closerTo(a, b, c) {
                // 计算a与b的差的绝对值
                var diffToB = Math.abs(a - b);
                // 计算a与c的差的绝对值
                var diffToC = Math.abs(a - c);

                // 比较两个差值，返回更接近的那个数字
                if (diffToB < diffToC) {
                    return b
                } else if (diffToB > diffToC) {
                    return c
                } else {
                    // 如果两个差值相等，说明a与b、c等距离，随便返回谁都行
                    return a
                }
            }
        }
    }
```