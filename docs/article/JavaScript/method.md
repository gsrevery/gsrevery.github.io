# javascript常用方法 :basketball:

## 数据在本地存取的方式.
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
## for in循环遍历对象
* 获取obj对象的key值
```js
    for ( let a in obj) {
        sonsole.log(a)
    }
```

* 获取obj对象的value值
```js
    for ( let a in obj) {
        console.log(obj[a])
    }
```

​
## for of循环遍历数组
* 获取数组中的数据
```js
    for (let data of arr) {
        console.log(data)
    }
```

* 获取字符串中的数据
```js
    for (let data of string) {
        console.log(data)
    }
```

## let 与 const的区别
* let声明的变量可以改变，值和类型都可以改变，没有限制。
```js
    let a = 10
    a = 20
    console.log(a) // 打印出来为20
```

* const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
```js
    const b = 30
    b = 40 // 这里就会提示报错
    console.log(b) // 打印出来为 30
```

## Symbol的使用

### Symbol的特性
Symbol是独一无二的

### 新的基础数据类型
```js
    let s1 = Symbol()
    let s2 = Symbol('gaopan')
    typeof s1 typeof s2 输出都为"symbol"
```

### 使用Symbol来作为对象属性名(key)
* let obj1 = { name: '小白', age: '24', [Symbol()]: 'Symbol作为属性名'}
* Symbol类型的key是不能通过Object.keys()或者for...in来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用Symbol来定义。也正因为这样一个特性，当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外

**设计一个对象，键名的类型包含一个Symbol类型，并实现遍历所有的key**
```js
let name = Symbol('name')
let product = {
    [name]: "名字",
    sex: "性别"
}
Reflect.ownKeys(product)
// [name]--表示变量name，即前面let定义的name。
```

### 使用Symbol来替代常量
```js
    let num1 = Symbol()
    let num2 = Symbol()
    num1 == num2 输出false
```

* 这样定义，直接就保证了三个常量的值是唯一的了！

### 使用Symbol定义类的私有属性/方法

### 注册和获取全局Symbol
```js
    let gs1 = Symbol.for('global_symbol_1') //注册一个全局Symbol
    let gs2 = Symbol.for('global_symbol_1') //获取全局Symbol
```

## 模板字符串

### 合并数组
```js
    var arr1 = [1, 2, 3]
    var arr2 = [4, 5, 6]
    var arr3 = [...arr1, ...arr2]
    arr3 = [1, 2, 3, 4, 5, 6]
```

### 字符串转数组
```js
    var str = "gaopan"
    var arr = [...str]
    arr = ["g", "a", "o", "p", "a", "n"]
```

### 合并对象
* 对象的key一样，会出现数据项替换情况
```js
    var obj1 = {name: '小明', age:24}
    var obj2 = {name: '小红', age:23}
    var obj3 = {...obj1, ...obj2}
    obj3 = {name: "小红", age: 23}
```
* 如果对象的key不一样，则可以正常合并
```js
    var obj4 = {test: 'key不同'}
    var obj5 = {...obj1, obj4}
    obj5 = {name: '小明', age:24, test: 'key不同'}
```

## 深拷贝和浅拷贝

* 对象拷贝主要是针对：原对象不变，改变新对象内的元素。
* 拷贝实现的原理: 在堆内存中另开一个内存空间，并改变其指针。

浅拷贝：适用于只能改变对象内的一层。

深拷贝：适用于可以改变对象内的很多层。比如对象中包含数组，数组中包含对象，对象中还有数组，这时候如果我们要改变最里层数组中的元素，就需要使用到深拷贝。

1. object.assign //对象浅拷贝，obj1复制给obj2
```js
const obj1 = {a: 1}
const obj2 = {}
Object.assign( obj2, obj1)
拷贝对象时，只能拷贝一层
```

2. 对象深拷贝
```js
const obj1 = {a: 1}
const obj2 = JSON.parse(JSON.stringify(obj1))
```
* 先通过`JSON.stringify()`将对象转成json串，再通过`JSON.parse()`将json串转回成对象（json串转换成对象时，就相当于重新创建了一个对象）

3. ES6扩展运算符（…）//对象浅拷贝，obj1复制给obj2
```js
const obj1 = {a: 1}
const obj2 = {...obj1}
```
```js
// 对象赋值
const obj1 = {name: '小白', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
const obj2 = obj1
obj2.name = 'zrm'
console.log(obj1)
console.log(obj2)
// 对象浅拷贝
const obj1 = {name: '小白', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
const obj2 = {}
Object.assign(obj2, obj1)
obj2.name = 'gp'
obj2.num[1].oneoneone = '000'

// 对象浅拷贝
const obj1 = {name: '小白', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
const obj2 = {...obj1}
obj2.name = 'gp'
console.log(obj1)
console.log(obj2)
// 对象深拷贝
const obj1 = {name: '小白', age: '23', num: [{one: '1', oneOne: {one: '11', two: '22', oneoneone: {one: '111', two: '222'}}}, {two: '2'}, {three: '3'}, {four: '4'}], money: {美元: '$', 人民币: '￥'}}
const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.num[0].oneOne.oneoneone.two = '000'
console.log(obj1)
console.log(obj2)
```
**手写浅拷贝**
```js
const obj1 = {name: '小白', age: '23'}
const object = {}
for(let key in obj1) {
    object[key] = obj1[key]
}

```
**手写深拷贝**
将对象/数组一层一层的分解，将其变成一个一个字符串，然后将其赋值给新的对象
```js
let obj = {
    name: '小白',
    age: '20',
    six: '男',
    test: {
        one: '美元',
        two: '人民币',
        three: '欧元'
    }
}
let data = depclone(obj)
console.log(data, 'data')
function depclone (val) {
    // 对象
    let object
    if (val.constructor.name !== 'Array') {
        object = {}
        for(let key in val) {
            if (typeof val[key] === 'object') {
                object[key] = depclone(val[key])
            } else {
                object[key] = val[key]
            }
        }
    }
    // 数组
    else {
        object = []
        for(let key in val) {
            if (typeof val[key] === 'object') {
                object[key] = depclone(val[key])
            } else {
                object.push(val[key])
            }
        }
    }
    return object
}
```

## =>符号的意思
* =>是ES6语法中的arrow function
* 举例：(x) => x + 6
> 相当于：
```
    Function (x) {
        return x+6;
    }
```

## 字符串的常用操作
### join()
[join()]方法用于把数组中的所有元素放入一个字符串，并且可以用指定字符分割。
```js
let str1 = "abc"
let str2 = "def"
let arr = [str1, str2]
let str3 = arr.join(";")
console.log(str3) // "abc; def"
```

### replace()
[replace()]方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
```js
let str1 = "abc;def"
// g代表整个字符串，将str1中的";"全都换成"~"
// 这种某些符号不行
let str2 = str1.replace(/;/g,"~")
// 这种都可以
let str2 = str1.replace(new RegExp(';', 'g'), '~')
console.log(str2) // "abc~def"
```

### split()
[split()]方法用于把一个字符串分割成字符串数组。
```js
// Eg1:
let str = "abc~def"
let arr = str.split("~")
console.log(arr) // ["abc", "def"]
// Eg2:
let arr2 = str.split("")
console.log(arr2) // ["a", "b", "c", "~", "d", "e", "f"]
```

### charAt()
[charAt()]方法可返回指定位置的字符，返回的字符是长度为 1 的字符串。
```js
// Eg1
let str1 = "abc~def"
let str2 = str1.charAt(5)
console.log(str2) // "d"
// Eg2 更简单
let str3 = str1[4]
console.log(str3) // "d"
```

### indexOf()
`indexOf`方法，判断字符串中是否包含某些字符，不会更改字符串；判断数组中是否存在某一项，不会更改数组。
* 包含某字符时，返回该字符的下标（从0开始）
* 不包含某些字段时，返回-1
```js
// 字符串
let str = 'try@qq.com'
let tryStr1 = str.indexOf('@')
console.log(tryStr1) // 3
let tryStr2 = str.indexOf('-')
console.log(tryStr2) // -1

// 数组
let arr = ['小明', '今年', '20', '岁']
let tryArr1 = arr.indexOf('20')
console.log(tryArr1) // 2
let tryArr2 = arr.indexOf('-')
console.log(tryArr2) // -1

// 一般配合着~使用
if(~tryArr1) {}
```

## 三元运算符
1. 三元运算符
```js
console.log(isTrue ? 'yes' : 'no' )
```
如果isTrue为true的话，则打印yes, 反之no

2. 类似三元运算
 ```js
 console.log(isTrue && 'yes' || 'no')
 ```

## 按位非运算符
> 按位非运算 NOT 由否定号（~）表示，它是 ECMAScript 中为数不多的与二进制算术有关的运算符之一。
> 位运算 NOT 是三步的处理过程：
把运算数转换成 32 位数字
把二进制数转换成它的二进制反码（0->1, 1->0）
把二进制数转换成浮点数

举例子🌰：
 - 判断数组中是否有某元素
 ```js
 var arr = ['ele', 'try']
 // 易读
 // arr.indexOf('ele')为0
if(arr.indexOf('ele') > -1) {
    // 能进入
}
 //简洁
 // ~arr.indexOf('ele')为-1
if(~arr.indexOf('ele')) {
    // 不能进入
}
 ```
 - 更高效的parseInt
 ```js
 parseInt(value)
 ~~value //更搞笑
 ```

 ## 解构赋值

 ### 数组的解构赋值

从数组和对象中提取值，对变量进行赋值
```js
let [a, b, c] = [1, 2, 3]
// 相当于直接赋值
// a = 1
// b = 2
// b = 3
```

### 对象的解构赋值
```js
let {name, age} = { name: '小白', age: 10 }
let {age, name} = { name: '小白', age: 10 }
// 上面两种结构赋值都能成功，并且结果相同
// 相当于直接赋值
// let name = '小白'
// let age = 10
```

## Set数据结构
Set类似于数组，但是成员的值都是唯一的，没有重复的值。
```js
var arr1 = [1, 3, 5, 1, 8, 5]
var obj1 = Set(arr1)
// obj1 打印出来 Set(5) {1, 3, 5, 8}
// 这时的obj1是一个类数组对象
var arr2 = Array from(obj)
// arr2 打印出来 [1, 3, 5, 8]
// 这时的arr2就是一个数组

// 使用扩展运算符和Set，可以直接去除数组中重复数据
var arr3 = [...new Set(arr1)]
// arr3 打印出来 [1, 3, 5, 8]
```

## 光标显示在某个输入框内
**注意**有可能UI框架的输入框加不上，使用普通输入框可行。
```js
var onFocus = document.querySelector('#form-username');
onFocus.focus()
```