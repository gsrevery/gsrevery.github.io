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

## 复制内容到剪贴板
```js

const copyToClipboard = (content) => navigator.clipboard.writeText(content)

copyToClipboard("Hello fatfish")
```

## 获取鼠标选择
```js

const getSelectedText = () => window.getSelection().toString()

getSelectedText()
```

## 打乱数组
```js
const shuffleArray = array => array.sort(() => Math.random() - 0.5)

shuffleArray([ 1, 2,3,4, -1, 0 ])
```

## 将rgba转换为十六进制
```js

const rgbaToHex = (r, g, b) => "#" + [r, g, b].map(num => parseInt(num).toString(16).padStart(2, '0')).join('')

rgbaToHex(0, 0 ,0)
rgbaToHex(255, 0, 127)
```

## 十六进制转换为rgba
```js

const hexToRgba = hex => {
  const [r, g, b] = hex.match(/\w\w/g).map(val => parseInt(val, 16))
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

hexToRgba('#000000')
hexToRgba('#ff007f')
```

## 获取多个数的平均值
```js

const average = (...args) => args.reduce((a, b) => a + b, 0)

average(0, 1, 2, -1, 9, 10)
```

## 检查一个对象是否为空对象
```js
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object

isEmpty({}) // true
isEmpty({ name: 'fatfish' }) // false
```

## 反转字符串
```js
const reverseStr = str => str.split('').reverse().join('')

reverseStr('fatfish') // hsiftaf
```

## 计算两个日期之间的间隔
```js

const dayDiff = (d1, d2) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000)

dayDiff(new Date("2023-06-23"), new Date("1997-05-31")) // 9519
```

## 查找该日期是一年中的第几天
```js

const dayInYear = (d) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

dayInYear(new Date('2023/06/23'))// 174
```

## 将字符串的第一个字母大写
```js

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

capitalize("hello fatfish")  // Hello fatfish
```

## 生成指定长度的随机字符串
```js

const generateRandomString = length => [...Array(length)].map(() => Math.random().toString(36)[2]).join('')

generateRandomString(12) // cysw0gfljoyx
generateRandomString(12) // uoqaugnm8r4s
```

## 获取两个整数之间的随机整数
```js

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

random(1, 100) // 45
random(1, 100) // 52
random(1, 100) // 63
```

## 指定数字四舍五入
```js
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d)

round(3.1415926, 3) //3.142
round(3.1415926, 1) //3.1
```

## 清除所有cookie
```js

const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
```

## 判断是否为苹果设备
```js
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform)

isAppleDevice()
```

## 获取变量的类型
```js

const typeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

typeOf('')     // string
typeOf(0)      // number
typeOf()       // undefined
typeOf(null)   // null
typeOf({})     // object
typeOf([])     // array
typeOf(0)      // number
typeOf(() => {})  // function
```

## 随机IP
```js
const generateRandomIP = () => {
  return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
}

generateRandomIP() // 220.187.184.113
generateRandomIP() // 254.24.179.151
```

## 检查有效的电子邮件
```js

const isValidEmail = email => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
isValidEmail("example@email.com") // true
isValidEmail("example") // false
```