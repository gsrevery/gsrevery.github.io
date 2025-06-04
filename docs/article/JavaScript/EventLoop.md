# 事件循环机制 :heart:

## 执行栈和事件队列
javascript代码在执行时会将不同的变量存储在内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 但是我们这里说的执行栈和上面这个栈的意义却有些不同。

## js异步加载
js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。

<img src="../../../images/javascript/event-loop.png"  style="height:500px; min-width: 100%">

## macro task与micro task
异步任务被分成两类：宏任务（macro task） 微任务（micro task）
宏任务：
    setInterval()
    setTimeout()
微任务：
    new Promise()
    new MutaionObserver()

在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。

我们只需记住当**当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。**

这样就能解释下面这段代码的结果：
```javascript
    setTimeout(function () {
        console.log(1);
    });

    new Promise(function(resolve,reject){
        console.log(2)
        resolve(3)
    }).then(function(val){
        console.log(val);
    })
```

输出结果为
```javascript
    2
    3
    1
```

顺序执行
```javascript
async _cycleFn() {
    for (let i = 0; i < 10; i++) {
        console.log(i, '第一层循环')
        let waitData = await this._waitFn()
        console.log(waitData, '第一层等待')
        for (let j = 0; j < 10; j++) {
            console.log(j, '第二层循环')
            let waitData2 = await this._waitFn()
            console.log(waitData2, '第二层等待')
            let _cycleFn2Data =  await this._cycleFn2()
            console.log(_cycleFn2Data, '_cycleFn2Data')
        }
    }
},
async _cycleFn2() {
    load: for (let i = 0; i < 10; i++) {
        console.log(i, '第三层循环')
        if (i === 5) {
            break load
        }
    }
    return '第三层循环结束'
},
async _waitFn() {
    // 这里模拟接口请求，返回数据后再执行
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('1111')
        }, 1000)
    })
},

// 顺序执行
this._cycleFn()
```