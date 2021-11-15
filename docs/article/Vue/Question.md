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