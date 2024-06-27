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