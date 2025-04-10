# vscode常用插件 :whale:

## Vetur

* vue.js开发必装

## GitLens — Git supercharged

* 每一行代码旁边都有日志，会标明该行代码的作者
* 如果本地代码关联了远程仓库，本地代码如果修改，在该行代码的左侧会出现光标。
* 在VsCode左侧菜单栏，点击GitLens图标即可查看History，也可以查看全部的日志

## Auto Close Tag

* 自动补全关闭标签

## Auto Rename Tag

* 在你更改标签名的时候，它会帮你把对应的关闭标签页进行同样的更改。

## Path Autocomplete

* 路径补全工具

## Project Manager

* 这两种方式对于需要经常切换项目时，比较耗时 为解决这个问题，vscode提供了Project Manager插件管理，开发时常用的项目
1. command+ shift + p打开配置文件， 输入 Project Manager: Edit Projects
```js
[
	{
		"name": "nuxtest",
		"rootPath": "e:\\nuxtest",
		"paths": [],
		"group": ""
	},
	{
		"name": "vuetest",
		"rootPath": "e:\\vuetest",
		"paths": [],
		"group": ""
	}
]

```
2. 在左侧图标栏下就会有个小文件夹的选项，点击进去就可以切换项目了。

## vscode-icons

* 为文件管理器增加文件类型图标

## markdown

* 点击右上角的预览按钮或者`ctrl+shift+v`，在写markdown的同时就能预览页面。

## MarsCode AI: Coding Assistant

* MarsCode 是豆包旗下的智能编程助手，提供以智能代码补全为代表的核心能力，支持主流编程语言及 IDE，能在编码过程中提供单行或整个函数的建议，同时支持在用户编码过程中提供代码解释、单测生成、问题修复、技术问答等辅助功能，提升编码效率与质量。

## MySQL

* 连接数据库，安装及连接过程请查看[地址](https://blog.csdn.net/rej177/article/details/123450443)

## 常用设置
### 打开文件另起一个tab页签
在`settings.json`文件下进行如下配置
```js
"workbench.editor.enablePreview": false
``` 
### vscode中配置git管理
```js
// 配置git
"terminal.integrated.shell.windows": "D:/gdp/git/Git/bin/bash.exe",
```