# LODOP打印插件使用总结

## 使用注意事项
1. **lodop插件安装成功之后，还需要启用服务里面的`print spooler`服务。**
2. **lodop实现套打时，必须先确定实现套打的背景图片和打印纸张的大小，固定内容的位置保持一致，避免后期打印时抓狂的打印位置调试。**
3. **Lodop背景图片在保证不失真的情况下，尽量小一些，因为lodop分页的时候背景图片也会在下一页形成一个新的元素。**

## 使用方式
引用lodop.js

方式一: 在`lodop.js`末尾加上`export default getLodop`抛出`getLodop()`方法,然后，在需要用到的地方导入一下就行了`import getLodop from '@/libs/LodopFuncs'`

方式二: 在静态资源文件夹中放入`lodop.js`,然后全局引入一下。

## 打印流程

1. 一个简单的打印页面
**打印维护、打印设计、打印预览三者不能同时存在**
```js
// 初始化语句
LODOP.PRINT_INIT("打印任务名称")

// 设计打印区域 第一个参数上边距，第二个参数左边距，第三个参数设计区域的宽，第四个参数设计区域的高
LODOP.PRINT_INITA(0,0,'210mm','297mm')

// 打印全局字体大小
LODOP.SET_PRINT_STYLE('FontSize', 8)

// 打印全局字体
LODOP.SET_PRINT_STYLE('FontName', 'Curier New')

// 设置背景图片 第一个参数上边距，第二个参数左边距，第三个参数背景图的宽，第四个参数背景图的高 第五个参数背景图的地址
LODOP.ADD_PRINT_IMAGE(0, 0, '210mm', '297mm', `<img border='0' src=${this.showImgOne} />`)
//按原图比例(不变形)缩放模式
LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)

// 打印文本内容 第一个参数上边距，第二个参数左边距，第三个参数文本域的宽，第四个参数文本域的高，第五个参数文本内容
LODOP.ADD_PRINT_TEXT(141,185,141,20, '文本内容')

// 打印维护
LODOP.PRINT_SETUP()

// 打印设计
LODOP.PRINT_DESIGN()

// 打印预览
LODOP.PREVIEW()
```

## 常用的功能
1. 设置背景图
```js
// 方法一
// 这种方法设置出来的背景图是打印的元素，可以在打印设计中编辑
LODOP.ADD_PRINT_IMAGE(0, 0, '210mm', '297mm', `<img border='0' src=${this.showImgOne} />`)
// 设置背景图可以预览但是不能打印
LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
//按原图比例(不变形)缩放模式
LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)

// 方法二
// 设置背景图
LODOP.ADD_PRINT_SETUP_BKIMG(`<img border='0' src=${this.showImgOne} />`)
// 设置背景图的宽高，修改一个值另一个也会随之改变，所以一般写一个就行了
// 设置背景图的宽
LODOP.SET_SHOW_MODE("BKIMG_WIDTH", '210mm')
// 设置背景图的高
LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", '297mm')
// 设置背景图可以预览但是不能打印
LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW",1);
```

2. 设置页码
```js
// 方法一
// 打印页码 第一个参数上边距，第二个参数左边距，第三个参数文本域的宽，第四个参数文本域的高，第五个参数页码内容，#是第几页，&是总共的页码
LODOP.ADD_PRINT_TEXT(141,185,141,20, '第#页，总共&页')
LODOP.SET_PRINT_STYLEA(0,"ItemType",3);


// 方法二

```

3. 强制分页

* 强制分页，此行开始分页，但代码还是会继续往下走，如何时动态分页一般配合return一起使用。
```js
// 翻页打印如果前页没有pdf，则使用LODOP.NewPage()
LODOP.NewPage()

// 翻页打印如果前页有pdf则需要使用LODOP.NEWPAGEA()
LODOP.NEWPAGEA()
```

4. 控制打印的状态
* 点击打印按钮，会累积当前页面下点击打印按钮的次数。
```js
// 设置是否进行对后台服务的打印状态进行捕获。
LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true)
LODOP.On_Return = function(TaskID,Value){
    LODOP.GET_VALUE('PRINT_STATUs_OK' , Value)
    if (Value) {
        console.log('Value') // 打印的次数
    }
}
```

## 常见问题

### 电脑打不开预览界面
有的电脑打不开预览界面，有的电脑打开预览界面内没有内容。

* 解决方法：
* 打开电脑`服务`—— `print Spooler`启动该服务就行了。


### 不同电脑预览不一样
不同的电脑预览同份代码生成的预览页面，看到的效果不太一样。

* 解决方法：

1. 浏览器的缩放100%。

2. 电脑的设置的缩放比100%。

3. 缓存文件问题，删除缓存配置文件，路径一般是lodop主文件夹下：C:\Program Files (x86)\MountTaiSoftware\Lodop。

### 无法获取打印的状态
有的电脑无法获取打印状态/打印次数

* 解决方法：

1. 缓存文件问题，删除缓存配置文件，路径一般是lodop主文件夹下：C:\Program Files (x86)\MountTaiSoftware\Lodop。

2. 重新安装lodop插件，将安装时的选项全部勾上。

### 预览时没有背景图片
当预览的次数过多，当前的文件内容过大时，会出现预览界面没有背景图片。（文件过大，一般40M-50M应该不是问题，临界值没有测试过）

* 临时解决方法：
* 次数过多时没有预览没有背景图片，可以重启Lodop插件。
