# javascript常用方法

## ​判断复杂数据类型的方法
​
```
    eg: 
        var a = { 1, 2, 3 }
        a.constructor == ture
```

## ​数据在本地存取的方式.
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
## for in循环遍历对象得到key和value
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
## for of循环遍历数组得到其中的数据项或者遍历字符串得到单个数据项
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

## let 与 const的区别
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

## 深拷贝和浅拷贝
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

## javascript中“=>”符号的意思
* =>是ES6语法中的arrow function
* 举例：(x) => x + 6
> 相当于：
```
    Function (x) {
        return x+6;
    }
```

