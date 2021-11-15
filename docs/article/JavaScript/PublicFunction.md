# 常用的一些公共方法

## 数组中数字排序
```js
/**
 * @author: gaopan
 * @param {arr纯数字数组}
 * @Descripttion: 将数组中的数字元素亮亮对比按照从小到大的顺序排列
 * @return {arr}
 */
function sortArr (arr) {
    if(arr && arr.length) {
        arr.sort(
            function (a, b) {
                return a - b
            }
        )
    }
    return arr
}
```

## 时间戳转时间
```js
/**
 * @author: gaopan
 * @param {date, isDay}
 * @Descripttion: 将毫秒数的时间转换为如：2018-09-03 12:00这种格式, isDay为true，将毫秒数的时间转换为如：2018-09-03这种格式
 * @return {date}
 */
export const timestampFormat = (date, isDay) => {
    if (date) {
        let time = new Date(date)
        const year = time.getFullYear()
        const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
        const day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
        const hour = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`
        const min = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`
        if (isDay) {
            time = `${year}-${month}-${day}`
        } else {
            time = `${year}-${month}-${day} ${hour}:${min}`
        }
        return time
    }
}
```

## null,undefined数据处理
```js
/**
 * @author: gaopan
 * @param {obj or arr}
 * @Descripttion: 将数组、对象中的null和undefined处理成'', 不能只判断element[key]和obj[key]是否有值，如果这样做当值为0的时候也会将其改写为''
 * @return {obj or arr}
 */
export const nullDataHandle = (data) => {
    // 数组
    if (Array.prototype.isPrototypeOf(data) && data.length) {
        data.forEach(element => {
            for (var key in element) {
                if (element[key] === null || element[key] === undefined) {
                    element[key] = ''
                }
            }
        })
    }
    // 对象
    if (Object.prototype.isPrototypeOf(data)) {
        for (var key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                obj[key] = ''
            }
        }
    }
    return data
}
```

## 向字符串中的符号后面加一个空格
```js
/**
 * @author: gaopan
 * @param {str}
 * @Descripttion: 向字符串中的符号后面加一个空格,如果后面有空格则不加
 * @return {str}
 */
export const addStrSpace = (str) => {
    let stashStr = str
    if (str) {
        for (let index = 0; index < str.length; index++) {
            const element = str[index]
            if ((element === ',' || element === '.' && str[index + 1] !== ' ')) {
                passStr = str.slice(0, index + 1) + ' ' + str.slice(index + 1)
                return addStrSpace
            }
        }
    }
    return stashStr
}
```

## 计算当前字符串的字节长度
```js
/**
 * @author: gaopan
 * @param {str}
 * @Descripttion: 计算当前字符串的字节长度,一个中文字符占用两个字节长度，一个英文字符占用一个字节长度
 * @return {str}
 */
 export const strLen = (str) => {
    let len = 0
    if (str) {
        for (var i = 0; i < str.length; i ++) {
            // 字符编码大于255，说明是双字节字符
            // 也可以换成正则 \x00-\xff双字节
            if (str.charCodeAt(i) > 255) {
                // 累加2
                b += 2
            } else {
                // 累加1
                b += 1
            }
        }
    }
    return len
}
```