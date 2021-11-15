# VUE-Router :jack_o_lantern:

## mode中history和hash的区别

1. `hash` —— 即地址栏 `URL` 中的 # 符号（此 `hash` 不是密码学里的散列运算）。
比如这个 `URL`：`http://www.abc.com/#/hello`，`hash` 的值为 `#/hello`。它的特点在于：`hash` 虽然出现在 `URL` 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 `hash` 不会重新加载页面。
2. `history` —— 利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）
这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 `URL`，但浏览器不会立即向后端发送请求。

### history的优势

1. `pushState()` 设置的新 `URL` 可以是与当前 `URL` 同源的任意 `URL`；而 `hash` 只可修改 # 后面的部分，因此只能设置与当前 `URL` 同文档的 `URL`；
2. `pushState()` 设置的新 `URL` 可以与当前 `URL` 一模一样，这样也会把记录添加到栈中；而 `hash` 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
3. `pushState()` 通过 `stateObject` 参数可以添加任意类型的数据到记录中；而 `hash` 只可添加短字符串；
4. `pushState()` 可额外设置 `title` 属性供后续使用。

### history的缺点

`history` —— `SPA` 虽然在浏览器里游刃有余，但真要通过 `URL` 向后端发起 `HTTP` 请求时，两者的差异就来了。尤其在用户手动输入 `URL` 后回车，或者刷新（重启）浏览器的时候。
1. `hash` 模式下，仅 `hash` 符号之前的内容会被包含在请求中，如 `http://www.abc.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
2. `history` 模式下，前端的`URL`必须和实际向后端发起请求的`URL`一致，如 `http://www.abc.com/book/id`。如果后端缺少对`/book/id`的路由处理，将返回 404 错误。


## 全局守卫

### 全局前置守卫

使用`router.beforeEach`注册一个全局前置守卫，要在做页面的权限控制就可以将判断写在这里。
```js
router.beforeEach((to, from, next) => {
  // ...
})
```
`router.beforeEach`中的参数:
1. to：进入到哪个路由去;
2. from：从哪个路由离开;
3. next：函数，决定展示页面的路由。
```js
const token = window.localStorage.getItem('accessToken')
router.beforeEach((to, from, next) => {
    if (token) {
        next({
            path: '/'
        });
    } else {
        alert('您还没有登录，请先登录');
        next({
            path: '/login'
        });
    }
})
```
* 登录成功后将token存在本地，这里先在本地取token，如果有token则说明登录成功，直接跳到首页，如果没有登录成功则页面跳转至登录页。


### 全局解析守卫

### 全局后置钩子

使用`router.afterEach`注册一个全局后置钩子
```js
router.afterEach((to, from) => {
  // ...
})
```
`router.afterEach`中的参数：
1. to：进入到哪个路由去；
2. from：从哪个路由离开。
```js
router.afterEach((to, from) => {
    alert("展示页面")
})
```
* 每次切换路由时，都会弹出alert，点击确定后，才会展示当前页面。
* 切换路由时，路由切换到需要跳转的路由，但是页面不会加载，确定弹出框后，页面才会开始加载。


### 路由独享守卫

在路由配置上直接定义`beforeEnter`守卫：
```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```
* 这些守卫与全局前置守卫的方法参数是一样的。

### 组件内的守卫

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用`beforeRouteLeave`守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter。`
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 `DOM` 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。
