# 浅谈this指向问题 :seedling:
`this`永远指向一个对象

## 普通函数调用
普通函数调用，this指向window
**这里的this指向window是因为方法外层的this指向的是window**
```js
var name = '小白'
let age = 20
function fn () {
    console.log(this.name)  // 小白
    console.log(this.age)  // undefined
}
```
这里的`this`指向的就是`window`，`var`声明一个变量就会在`window`下添加一个`name`属性，`let`声明不会在`window`创建。

## 箭头函数调用
箭头函数调用，箭头函数本身没有`this`，它的箭头函数继承外面环境的`this`。
```js
var name = '小白'
var obj = {
    age: 20,
    // 箭头函数的this指向
    arrow: () => {
        console.log(this.name)  // 小白
        console.log(this.age)  // undefined
    },
    // 普通函数的this指向
    general: function () {
        console.log(this.name)  // undefined
        console.log(this.age)  // 20
    }
}
obj.arrow()
obj.general()
```

## 构造函数调用
构造函数调用，`this`指向实例对象
```js
function person (name, age) {
    this.name = name
    this.age = age
    console.log(this)  // person{name: '小白', age: 30}
}
var p = new person('小白', 30)
```

## 对象方法调用
对象方法调用，this指向该方法所在的对象
```js
var obj = {
    name: '小白',
    sex: '男',
    age: 20,
    general: function () {
        console.log(this)  // {name: "小白", sex: "男", age: 20, general: ƒ}
    }
}
obj.general()
```

## 事件绑定方法
事件绑定的方法，`this`指向该绑定事件的对象
```js
<body>
    <button id="btn">点击一下</button>
</body>
<script>
    var btn = document.getElementById("btn")
    btn.onclick = function() {
        console.log(this)  // <button id="btn">点击一下</button>
    }
</script>
```

## 定时器函数
定时器函数，`this`指向`window`
**这里的`this`指向`window`是因为方法外层的`this`指向的是`window`**
```js
var name = '小白'
setTimeout(function () {
    console.log(this)  // window
    console.log(this.name)  // 小白
}, 1000)
```

## 改变this指向

### call()方法
`call(obj, firstName, ... , string)`,第一个参数`obj`是`this`的指向对象，后面的参数就是传入方法的参数，参数数量不限，只需逗号隔开。
```js
var obj = {
    name: '小白',
    age: 20,
    fn: function (x, y) {
        console.log(`${this.name}今年${this.age}岁，身高${x}，体重${y}`)
        // 小红今年30岁,身高173cm,体重50kg
    }
}
var infor = {
    name: '小红',
    age: 30
}
obj.fn.call(infor, '173cm', '50kg')
```
### apply()方法
`apply(obj, [firstName, ..., string])`,第一个参数`obj`是`this`的指向对象，后面将需要传入的参数整合成一个数组。
```js
var obj = {
    name: '小白',
    age: 30,
    fn: function (x, y) {
        console.log(`${this.name}今年${this.age}岁，身高${x}，体重${y}`)
        // 小红今年20岁,身高175cm,体重50kg
    }
}
var infor = {
    name: '小红',
    age: 20
}
obj.fn.apply(infor, ['175cm', '50kg'])
```

### bind()方法
`bind(obj, firstName, ... , string)`,第一个参数`obj`是`this`的指向对象，后面的参数就是传入方法的参数，参数数量不限，只需逗号隔开。
```js
var obj = {
    name: '小白',
    age: 20,
    fn: function (x, y) {
        console.log(`${this.name}今年${this.age}岁，身高${x}，体重${y}`)
    }
}
var infor = {
    name: '小青',
    age: 19
}
obj.fn.bind(infor, '175cm', '50kg')()  // 小青今年19岁,身高175cm,体重50kg
obj.fn.bind(infor, ['175cm', '50kg'])()  // 小青今年19岁,身高175cm,50kg，体重undefined
```