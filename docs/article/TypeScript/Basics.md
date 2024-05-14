<!--
 * @CreateAuthor: 作者
 * @CreateDate: 创建时间
 * @LastEditors: 修改人
 * @LastEditTime: 2022-04-20 15:13:24
 * @Descripttion: 描述
-->
# TypeScript基本用法

## TS类型

TypeScript支持与JavaScript几乎相同的数据类型，数字，字符串，结构体，布尔值等，此外还提供了实用的枚举类型方便我们使用。

```js
let num: number = 20
let str: string = '小白'
let bol: boolean = false
let arr: number[] = [1, 2, 3]
```

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。

```js
// any表示任意类型，变量设置了any相当于关闭Ts的类型检查
// 使用ts一般不推荐使用any
let notSureAny: any
notSureAny = true
notSureAny = 'true'

// unknown表示未知类型的值,unknown的出现就是为了弥补any。
let notSureUnknown: unknown
notSureUnknown = true
notSureUnknown = 'true'

// notSureAny的类型是any，它可以赋值给任何变量，不会报错
let a: number
a = notSureAny

// 1.notSureUnknown虽然定义的是unknown，但是他最近一次赋值是字符串"true",这个时候就会报错。
// 2.unknown实际上就是一个类型安全的any。
// 3.unknown类型的变量不能直接赋值给其他变量。
let b: number
b = notSureUnknown // 这样会报错

if(type of notSureUnknown === 'number') {
    b = notSureUnknown
} // 先判断类型再进行赋值，这样可以

b = notSureUnknown as number // 这种属于类型断言，可以告诉解析器实际类型

b = <number>notSureUnknown // 这种方式也可以
```

定义函数
```js
// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void {
    return true // 这行代码会报错
}

// never 表示永远不会返回结果
function fn2(): never {
    throw new Error("报错了...")
}
```
