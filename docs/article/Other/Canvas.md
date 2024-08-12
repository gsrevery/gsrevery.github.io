# canvas

## 电子签名
在某些特定的场景中，我们需要在线签字并且上传给后端，这时我们可以通过canvas绘制线来实现

**实现思路：**
* 1.绘制一个canvas作为签名区域。
* 2.捕获鼠标按下事件
* 3.捕获鼠标移动事件
* 4.捕获鼠标松开事件
* 5.按下鼠标时记录坐标点作为画线开始点
* 6.移动鼠标时实时记录坐标点。
* 7.将点连接起来形成线。
* 8.鼠标松开时停止画线。

**实现代码：**
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style>
		body {
			width: 500px;
		}
		#canvas {
			border: 1px solid;
		}
	</style>
	<body>
		<canvas id="canvas" width="500px" height="300px"></canvas>
		<input type="color" id="color" />
		<select id="size">
			<option value="5">粗</option>
			<option value="2">细</option>
		</select>
		<button id="remove">清空</button>
		<button id="export">导出</button>
	</body>
	<script>
		// 获取dom元素
		let canvas = document.getElementById('canvas')
		let ctx = canvas.getContext('2d')
		let removeBtn = document.getElementById('remove')
		let sizeBtn = document.getElementById('size')
		let exportBtn = document.getElementById('export')
		let colorBtn = document.getElementById('color')
		console.log(canvas, removeBtn, exportBtn, colorBtn)
		// 绘画
		let drawing = false
		ctx.strokeStyle = 'red' // 默认颜色
		ctx.lineWidth = 5 // 默认线大小
		// 鼠标按下
		canvas.addEventListener('mousedown', (e) => {
			drawing = true
			ctx.beginPath() // 开始绘制
			ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop) // 绘制起点:当前鼠标坐标 - 画布的默认边距
		})
		// 鼠标移动
		canvas.addEventListener('mousemove', (e) => {
			if (drawing) {
				ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop) // 绘制轨迹：当前鼠标坐标 - 画布的默认边距
				ctx.stroke() // 绘制颜色
			}
		})
		// 鼠标松开
		canvas.addEventListener('mouseup', (e) => {
			drawing = false
			ctx.closePath() // 绘制终点
		})
		// 颜色
		colorBtn.addEventListener('change', (e) => {
			ctx.strokeStyle = e.target.value
		})
		// 粗细
		sizeBtn.addEventListener('change', (e) => {
			ctx.lineWidth = e.target.value
		})
		// 清空
		removeBtn.addEventListener('click', (e) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
		})
		// 导出
		exportBtn.addEventListener('click', (e) => {
			const url = canvas.toDataURL('image/png')
			const a = document.createElement('a')
			a.href = url
			a.download = 'myImage.png'
			a.click()
		})
	</script>
</html>
```

## canvas绘制矩形并拖动

**实现思路：**
* 1.绘制一个canvas作为绘制矩形并拖动区域。
* 2.捕获鼠标点击事件(绘制和拖动都需要点击事件，这里我们需要判断当前操作类型，点击区域有绘制的矩形为拖动反之则绘制矩形)
* 3.捕获鼠标移动事件(实时获取坐标，操作类型为拖动，则改变矩形的坐标位置；操作类型为绘制矩形，则实时绘制矩形)
* 4.捕获鼠标松开事件(同移动事件)

实现代码如下：
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<link rel="stylesheet" href="./style.css">
	</head>
	
	<style>
		body{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		canvas {
			margin: 50px;
			background-color: #b1b3b8;
		}
	</style>

	<body>
		<input type="color">
		<canvas></canvas>
	</body>
	
	<script>
		console.log(devicePixelRatio)
		// 原始尺寸 = 样式尺寸 * 缩放倍率
		const canvas = document.querySelector('canvas') // 画布
		const colorPicker = document.querySelector('input') // 颜色选择器
		const ctx = canvas.getContext('2d')// 2d绘图环境
		function init() {
			const w = 500 // 画布宽度
			const h = 300 // 画布高度
			canvas.width = w * devicePixelRatio
			canvas.height = h * devicePixelRatio
			canvas.style.width = w + 'px'
			canvas.style.height = h + 'px'
		}
		init()
		const shapes = []
		class Rectangle {
			constructor(color, startX, startY) {
				this.color = color
				this.startX = startX
				this.startY = startY
				this.endX = startX
				this.endY = startY
			}
		
			get minX() {
				return Math.min(this.startX, this.endX)
			}
		
			get minY() {
				return Math.min(this.startY, this.endY)
			}
		
			get maxX() {
				return Math.max(this.startX, this.endX)
			}
		
			get maxY() {
				return Math.max(this.startY, this.endY)
			}
		
			draw(ctx) {
				ctx.beginPath()
				ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio)
				ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio)
				ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio)
				ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio)
				ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio)
				ctx.fill()
				ctx.fillStyle = this.color
				ctx.strokeStyle = '#fff'
				ctx.lineCap = 'square'
				ctx.lineWidth =  2* devicePixelRatio
				ctx.stroke()
			}
		
		}
		
		canvas.onmousedown= e => {
			console.log(e.offsetX, e.offsetY)
			const bounding = canvas.getBoundingClientRect()
			const rect = new Rectangle(colorPicker.value, e.offsetX, e.offsetY)
			const shape = getShape(e.offsetX, e.offsetY)
			if(shape){
				const { startX, startY,endX,endY} = shape
				const mouseX = e.offsetX
				const mouseY = e.offsetY
				window.onmousemove = e => {
					const distX = e.clientX - bounding.left - mouseX
					const distY = e.clientY - bounding.top - mouseY
					shape.startX = startX + distX
					shape.startY = startY + distY
					shape.endX = endX + distX
					shape.endY = endY + distY
				}
				console.log('拖动')
			} else {
				shapes.push(rect)
				window.onmousemove = e => {
					rect.endX = e.clientX - bounding.left
					rect.endY = e.clientY - bounding.top
		
				}
			}
		
			window.onmouseup = () => {
				window.onmousemove = null
				window.onmouseup = null
			}
		}
		function draw() {
			requestAnimationFrame(draw)
			ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空画布
			shapes.forEach(item => {
				item.draw(ctx)
			})
		}
		draw()
		function getShape(x,y) {
			return shapes.find(item => {
				return item.minX <= x && item.maxX >= x && item.minY <= y && item.maxY >= y
			})
		}
	</script>
</html>
```