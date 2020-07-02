# javascript常用方法 :basketball:

## ​一.判断复杂数据类型的方法
​
```
    eg: 
        var a = { 1, 2, 3 }
        a.constructor == ture
```

## ​二.数据在本地存取的方式.
​
* 数据在本地sessionStorage中存取
1. 存：
    window.sessionStorage.setItem('goodsData', JSON.stringify(agencyInformationData))
    goodsData 存在sessionStorage中的名字 
    agencyInformationData 需要进行存储的数据 
    JSON.stringify() 将数据转换成json格式
2. 取：
    JSON.parse(window.sessionStorage.getItem('goodsData'))
    goodsData 在sessionStorage中取出名字为goodsData 的数据
    JSON.parse() 将存储的 JSON 字符串转换为对象
* 数据在本地localStorage中存取与sessionStorage一致
1. 存：
    window.localStorage.setItem('goodsData', JSON.stringify(agencyInformationData))
2. 取：
    JSON.parse(window.localStorage.getItem('goodsData'))

​
## 三.for in循环遍历对象
* 获取obj对象的key值
```
    for ( let a in obj) {
        sonsole.log(a)
    }
```
* 获取obj对象的value值
```
    for ( let a in obj) {
        console.log(obj[a])
    }
```

​
## 四.for of循环遍历数组
* 获取数组中的数据
```
    for (let data of arr) {
        console.log(data)
    }
```
* 获取字符串中的数据
```
    for (let data of string) {
        console.log(data)
    }
```

## 五.let 与 const的区别
* let声明的变量可以改变，值和类型都可以改变，没有限制。
```
    let a = 10
    a = 20
    console.log(a) // 打印出来为20
```
* const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
```
    const b = 30
    b = 40 // 这里就会提示报错
    console.log(b) // 打印出来为 30
```

## 六.Symbol的使用

### 新的基础数据类型
```
    let s1 = Symbol()
    let s2 = Symbol('gaopan')
    typeof s1 typeof s2 输出都为"symbol"
```

### 使用Symbol来作为对象属性名(key)
* let obj1 = { name: '高攀', age: '24', [Symbol()]: 'Symbol作为属性名'}
* Symbol类型的key是不能通过Object.keys()或者for...in来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用Symbol来定义。也正因为这样一个特性，当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外

### 使用Symbol来替代常量
```
    let num1 = Symbol()
    let num2 = Symbol()
    num1 == num2 输出false
```
* 这样定义，直接就保证了三个常量的值是唯一的了！

### 使用Symbol定义类的私有属性/方法

### 注册和获取全局Symbol
```
    let gs1 = Symbol.for('global_symbol_1') //注册一个全局Symbol
    let gs2 = Symbol.for('global_symbol_1') //获取全局Symbol
```

## 七.模板字符串

### 合并数组
```
    var arr1 = [1, 2, 3]
    var arr2 = [4, 5, 6]
    var arr3 = [...arr1, ...arr2]
    arr3 = [1, 2, 3, 4, 5, 6]
```
### 字符串转数组
```
    var str = "gaopan"
    var arr = [...str]
    arr = ["g", "a", "o", "p", "a", "n"]
```

### 合并对象
* 对象的key一样，会出现数据项替换情况
```
    var obj1 = {name: '小明', age:24}
    var obj2 = {name: '小红', age:23}
    var obj3 = {...obj1, ...obj2}
    obj3 = {name: "小红", age: 23}
```
* 如果对象的key不一样，则可以正常合并
```
    var obj4 = {test: 'key不同'}
    var obj5 = {...obj1, obj4}
    obj5 = {name: '小明', age:24, test: 'key不同'}
```

## 八.深拷贝和浅拷贝
* 对象拷贝主要是针对：原对象不变，改变新对象内的元素。
* 浅拷贝：适用于只能改变对象内的一层。
* 深拷贝：适用于可以改变对象内的很多层。比如对象中包含数组，数组中包含对象，对象中还有数组，这时候如果我们要改变最里层数组中的元素，就需要使用到深拷贝。

1. object.assign //对象浅拷贝，obj1复制给obj2
	const obj1 = {a: 1};
	const obj2 = {};
	Object.assign( obj2, obj1)
	拷贝对象时，只能拷贝一层
2. 对象深拷贝
    const obj1 = {a: 1};
    const obj2 = JSON.parse(JSON.stringify(obj1));
3. ES6扩展运算符（…）//对象浅拷贝，obj1复制给obj2
    const obj1 = {a: 1};
    const obj2 = {...obj1};

```
    // const obj1 = {name: '高攀', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
    // const obj2 = obj1
    // obj2.name = 'zrm'
    // console.log(obj1)
    // console.log(obj2)
    //浅拷贝
    // const obj1 = {name: '高攀', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
    // const obj2 = {}
    // Object.assign(obj2, obj1)
    // obj2.name = 'gp'
    // obj2.num[1].oneoneone = '000'
    
    //浅拷贝
    const obj1 = {name: '高攀', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
    const obj2 = {...obj1}
    obj2.name = 'gp'
    console.log(obj1)
    console.log(obj2)
    //深拷贝
    // const obj1 = {name: '高攀', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
    // const obj2 = JSON.parse(JSON.stringify(obj1));
    // obj2.num[0].oneOne.oneoneone.two = '000'
    // console.log(obj1)
    // console.log(obj2)
```

## 九.=>符号的意思
* =>是ES6语法中的arrow function
* 举例：(x) => x + 6
> 相当于：
```
    Function (x) {
        return x+6;
    }
```

