# 组件之间传值 :egg:

## 一.父传子
在Vue中父组件向子组件传值可以用props, 在父组件中定义，在子组件中通过props来接受。
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
        <div>{{passData}}</div>
    </template>
    <script>
        export default {
            props: {
                passData: ''
            }
        }
    </script>
```

## 二.子传父
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

## 三.兄弟组件传值
在Vue中兄弟组件有两种，一种是使用EvenBus、一种是Vuex

### 使用EvenBus

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
### 使用vuex
*[详细见官方文档](https://vuex.vuejs.org/zh/guide/)