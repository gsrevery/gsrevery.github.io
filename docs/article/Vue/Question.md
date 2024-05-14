<!--
 * @CreateAuthor: 作者
 * @CreateDate: 创建时间
 * @LastEditors: 修改人
 * @LastEditTime: 2022-04-07 17:48:56
 * @Descripttion: 描述
-->
# vue中的问题 :tram:

## vue中key的理解

## vue2.0中给对象添加一个新属性

在vue2.0中给对象添加一个新属性并且渲染在页面上，用普通的对象添加属性操作方法，属性虽然可以添加成功，但是没办法渲染到页面上，如果用$set()去操作的话就不会出现这种情况。
```js
<template>
    <div>
        <div>男孩的名字叫{{ itemData.name }},今年{{ itemData.age }}岁,他有一个朋友叫{{ itemData.addName }}</div>
        <Button @click="ckickBtn">点一下</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemData: {
                name: '李白',
                age: 23
            }
        }
    },
    methods: {
        ckickBtn () {
            // 这样添加一个新属性,对象中虽然能够添加上，但是没办法在渲染在页面上。
            // this.itemData.addName = '杜甫'
            // 用$set()方法可以向对象中添加一个新属性并且页面上能够更新
            this.$set(this.itemData, 'addName', '杜甫')
            console.log(this.itemData)
        }
    },
}
</script>
```

## vue2.0中通过下标修改数组中的对象
在vue2.0中通过下标修改数组中的对象，并且渲染在页面上，用普通的操作方法，对象虽然可以添加成功，但是没办法渲染到页面上，如果用$set()去操作的话就不会出现这种情况。
```js
<template>
    <div>
        <div>你的名字{{ arr[0].name }}</div>
        <Button @click="ckickBtn">点一下</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                { name: '李白', age: 20 },
                { name: '杜甫', age: 25 }
            ]
        }
    },
    methods: {
        ckickBtn () {
            // 这样修改数组中的对象虽然数据能够修改，但是没办法在渲染在页面上。
            // this.arr[0] = { name: '小白', age: 20 }
            // 用$set()方法可以修改数组中的对象，并且页面上能够更新
            this.$set(this.arr, 0, { name: '小白', age: 20 })
            console.log(this.arr)
        }
    },
}
</script>
```

## vue过滤器filter和filters的使用
使用Vue,可以有两种不同的方式注册过滤器（全局过滤器和本地过滤器），你可以跨所有组件访问全局过滤器，而本地过滤器只允许你在其定义的组件内部使用。

**注意:当全局过滤器和局部过滤器重名时，会采用局部过滤器。**

时间格式处理为了方便也可以使用全局过滤器

```html
<!-- 换括号中使用过滤器 -->
{{ place | filterPlace }}

<!-- v-bind中使用过滤器 -->
<div v-bind:id="place | filterPlace"></div>

<!-- v-model中使用过滤器 -->
<div v-model="place | filterPlace"></div>

```

### 全局过滤器filter
```js
// eg: '重庆;九龙坡'
// 展示字符串中最后一个分号分割的数据
vue.filter('', function (value) {
    if(!value) return ''
    const array = value.split(';')
    return array[array.length-1]
})

```

### 本地过滤器filters
本地过滤器存储在Vue组件中，作为filters属性中的函数。这个时候你想注册多少个就能注册多少个。
```js
filters: {
    // eg: '重庆;九龙坡'
    // 展示字符串中最后一个分号分割的数据
    filterPlace(value) {
        if(!value) return ''
        const array = value.split(';')
        return array[array.length-1]
    }
}
```