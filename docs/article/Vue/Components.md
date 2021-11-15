# 组件 :egg:

## 组件中的data为什么是一个函数?
一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。(本质就是所有赋值对象堆内存中都是指向的同一个地方)

## 组件通信
### 一.父传子
在Vue中父组件向子组件传值可以用`props`, 在父组件中定义，在子组件中通过`props`来接受。
```javascript
    // 父组件
    <template>
        <div>
            <comOne :passData="passDataOne" />
        </div>
    </template>
    <script>
        import comOne from "./components/comOne"
        export default {
            components: {
                comOne
            },
            data () {
                return {
                    passDataOne: '父传子'
                }
            },
        }
    </script>
```
```javascript
    // 子组件
    <template>
        <div>{{ passData }}</div>
    </template>
    <script>
        export default {
            props: {
                passData: ''
            }
        }
    </script>
```

### 二.子传父
在Vue中子组件向父组件中传值，主要是通过事件传递数组给父组件（ $emit ）
```javascript
    // 子组件
    <template>
        <div>
            <Button @click="passClick()"></Button>
        </div>
    </template>
    <script>
        export default {
            props: {
                passData: ''
            }
            data () {
                return {
                    passDataTwo: '子传父'
                }
            },
            methods: {
                passClick () {
                    this.$emit('testSubmit', this.passDataTwo)
                }
            }
        }
    </script>
```
```javascript
    // 父组件
    <template>
        <comTwo @testSubmit="testSubmit" />
    </template>
    <script>
        import comTwo from "./components/comTwo"
        export default {
            components: {
                comTwo,
            },
            data() {
                return {}
            },
            methods: {
                testSubmit (val) {
                    // val就是子组件传过来的值
                    console.log(val)
                },
            }
        }
    </script>
```

### 三.兄弟组件传值
在Vue中兄弟组件有四种，一种是使用EvenBus、一种是Vuex、一种是利用对象的赋值，内存地址不变原理实现，另一种是使用this.$parent.$children[i]来获取到兄弟组件的值。

#### 使用EvenBus

1. 在src文件夹下创建一个eventBus.js文件，内容为：

```javascript
    import Vue from 'vue'
    export default new Vue()
```

2. 在组件一中使用$emit定义一个事件用于传值

```javascript
    // 组件一
    <template>
        <div>
            <input type="text" value="组件一" >
            <button @click="clickData()">组件一</button>
        </div>
    </template>
    <script>
    import eventBus from '@/eventBus'
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            clickData () {
                // 使用eventBus向组件二传递数据
                let passData = '兄弟组件传值'
                eventBus.$emit('my-event', passData)
            }
        }
    }
    </script>

```
3. 在组件二种使用$on接收事件和数据

```javascript
    // 组件二
    <template>
        <div>
            <input type="text" value="组件二">
        </div>
    </template>
    <script>
    import eventBus from '@/eventBus'
    export default {
        data() {
            return {   
            }
        },
        created () {
            // 使用eventBus接收组件一传过来的参数
            eventBus.$on('my-event', args => {
                console.log(args)
            })
        }
    }
    </script>

```
#### 使用vuex
*[详细见官方文档](https://vuex.vuejs.org/zh/guide/)

#### 使用对象的特性实现兄弟组件传参
父组件将一个对象分别传到两个子组件中，然后在其中一个子组件中修改对象，另一个子组件中监控该对象，根据对象的赋值后，其内存地址不变的特性实现兄弟组件传参

* 将需要监控的数据用一个对象包裹起来
```js
    // 父组件
    <template>
        <div>
            <com-one :passData="passData" />
            <com-two :passData="passData" />
        </div>
    </template>
    <script>
        import comOne from "./components/comOne"
        import comTwo from "./components/comTwo"
        export default {
            components: {
                comOne,
                comTwo
            },
            data () {
                return {
                    passData: {
                        name: '小白',
                        age: 20
                    }
                }
            },
        }
    </script>
```

* 子组件一修改该数据的值
```js
    // 子组件一
    <template>
        <div>
            <Button @click="changeData">改变数据</Button>
        </div>
    </template>
    <script>
        export default {
            props: {
                passData: {
                    type: Object,
                    default: () => ({})
                }
            }
            data () {
                return {
                }
            },
            methods: {
                changeData () {
                    this.passData.name = '杜甫'
                }
            }
        }
    </script>
```

* 子组件二修改该数据的值
```js
    // 子组件二
    <template>
        <div>
            <span>{{ changeName }}</span>
        </div>
    </template>
    <script>
        export default {
            props: {
                passData: {
                    type: Object,
                    default: () => ({})
                }
            }
            data () {
                return {
                    changeName: ''
                }
            },
            // 监控对象中的某一个属性
            'passData.name': {
                handler (newData) {
                    this.changeName = newData
                },
                // 调用该组件时就会执行一次这个监控
                immediate: true
            }
        }
    </script>
```


### 四.父组件主动调用子组件
父组件主动请求子组件可以使用`this.$refs`

```javascript
    // 父组件
    <template>
        <div>
            <comOne ref="childRef" />
            <Button @click="getData">获取子组件数据</Button>
        </div>
    </template>
    <script>
        import comOne from "./components/comOne"
        export default {
            components: {
                comOne
            },
            data () {
                return {
                }
            },
            methods: {
                getData () {
                    this.$refs.childRef.formItem
                }
            }
        }
    </script>
```
```javascript
    // 子组件
    <template>
        <Form ref="formItem" :model="formItem" inline>
            <FormItem prop="contaQty">
                <Input type="text" v-model="formItem.contaQty" />
            </FormItem>
        </Form>
    </template>
    <script>
        export default {
            props: {
                formItem: {
                    contaQty: '子组件的值'
                }
            }
        }
    </script>
```

## 动态组件

当页面组件化的时候，如果一个页面引用组件过多时，就会出现页面加载速度慢，页面卡顿，这个时候就动态组件就是一个很好的选择。动态组件的关键就在于`component`的`is`属性。

`keep-alive`是动态组件中的避免反复重渲染导致的性能问题的一种解决方式，和`v-show`的作用性质差不多，隐藏后再次显示不会重新渲染DOM。
```js
<template>
    <div>
        <!-- <keep-alive> -->
            <component :is="showComp" />
        <!-- </keep-alive> -->
        <Button type="primary" @click="changeComp">changeComp</Button>
    </div>
</template>
<script>
    import comOne from "./comOne"
    import comTwo from "./comTwo"
    import comThree from "./comThree"
    export default {
        components: {
            comOne,
            comTwo,
            comThree
        },
        data () {
            return {
                showComp: 'comOne'
            }
        },
        methods: {
            // 动态组件切换
            changeComp() {
                if (this.showComp === 'comOne') {
                    this.showComp = 'comTwo'
                } else if (this.showComp === 'comTwo') {
                    this.showComp = 'comThree'
                } else {
                    this.showComp = 'comOne'
                }
            },
        }
    }
</script>
```

## 异步组件
