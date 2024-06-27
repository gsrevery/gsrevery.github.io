# Three常见问题及解决方案
## 在three.js中创建中文
three.js中内置的字体不能显示中文（显示出来是`?`号），所以如果需要显示中文有三种方案：

1.在网上找到中文字体（网上的中文字体基本上是.tt格式），可以通过在线工具`https://gero3.github.io/facetype.js/`将tt格式的字体转换为json格式
> 缺点：json格式的字体很大，基本上都是20M左右（有个别的在10M左右）

2.在网上找到中文字体（网上的中文字体基本上是.tt格式），不用转换格式可以直接使用TTFLoader方法进行编码。
> 缺点：需要改动之前的代码.tt格式的文件一般也有2m左右

3.直接在英文字体的json文件内添加中文的json（在json文件中的`glyphs":{}`内添加）
> 缺点：只有添加过的文字才能展示为中文，其他的都是?号

> 优点：速度快，json文件大小只有60kb左右

## 在three.js中创建圆弧三角形体
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


## 在three.js中创建椭圆柱
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

## 在three.js中创建空心圆柱
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