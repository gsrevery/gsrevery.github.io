# 深拷贝和浅拷贝
## 对象拷贝主要是针对：原对象不变，改变新对象内的元素。
## 浅拷贝：适用于只能改变对象内的一层。
##  深拷贝：适用于可以改变对象内的很多层。比如对象中包含数组，数组中包含对象，对象中还有数组，这时候如果我们要改变最里层数组中的元素，就需要使用到深拷贝。

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

### javascript中“=>”符号的意思
##### =>是ES6语法中的arrow function
##### 举例：(x) => x + 6
> 相当于：
```
    Function (x) {
        return x+6;
    }
```

