# 冒泡事件 :pray:

## 事例
```js
<template>
    <div>
        <RadioGroup v-model="checkGroup" v-for="(listData, id) in list" :key="id">
            <div @click="selectCompany(listData, id)">
                <Radio style="display: flex">
                    <p>
                        <span>{{listData.enterpriseName}}</span>
                        <span>基础价格:{{listData.priceTotal}}{{listData.curr}}</span>
                        <span>时长: {{listData.totalTime}}{{listData.totalTimeUnit}}</span>
                    </p>
                </Radio>
            </div>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                checkGroup: '',
                list: [
                    {
                        enterpriseName: '重庆',
                        priceTotal: 100,
                        curr: '元',
                        totalTime: 10,
                        totalTimeUnit: '小时'
                    }
                ],
                num: 0
            }
        },
        methods: {
            selectCompany () {
                // 解决方式一：根据html元素控制方法只执行一次
                if (event.target.nodeName !== 'INPUT') return
                // 发生了冒泡事件
                console.log(`执行了${this.num + 1}次`)
                this.num = this.num + 1
            }
        },
    }
</script>
```