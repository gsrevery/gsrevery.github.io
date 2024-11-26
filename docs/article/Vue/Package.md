# package.json配置

## 描述配置
### name
项目名称:第三方包可以通过`npm install`包名安装
```json
"name":"yxzx"
```
### version
项目版本:项目版本号
```json
"version" : "18.2.0"
```
### repository
仓库地址及版本控制信息
```json
"repository": {
  "type": "git",
  "url": "https://github.com/xxx.git",
  "directory": "package"
}
```
### decription
项目描述：展示在`npm`官网，让别人能快速了解该项目
```json
"description": "JavaScript"
```
### keyword
技术关键词,好的关键词可以帮助别人在 npm 官网上更好地检索到此项目，增加曝光率
```json
"keywords": [
  "ant",
  "component",
  "components",
  "design",
  "framework",
  "frontend",
  "react",
  "react-component",
  "ui"
],
```
### homepage
项目主页的链接：通常是项目 github 链接，项目官网或文档首页
```json
"homepage": "https://reactjs.org/"
```
### bugs
项目`bug`反馈地址：通常是`github issue`页面的链接
```json
"bugs": "https://github.com/vuejs/core/issues"
```
### license
项目的开源许可证
```json
"license": "MIT"
```
### author
项目作者
```json
"author": "leijun"
```
### contributors
该项目包的贡献者
```json
"contributors": [
  "xxxx <xxxxx@xx.com>",
  "xxxx <xxxxx@xx.com> "
]

"contributors": [
  {
    "name" : "xxxxx",
    "email" : "xxxxx@xx.com",
    "url" : "https://xxxxx"
  },
  {
    "name" : "xxxxx",
    "email" : "xxxxx@xx.com",
    "url" : "https://xxxxx"
  }
]
```

## 文件配置
### files
项目在进行`npm`发布时，可以通过`files`指定需要跟随一起发布的内容来控制`npm`包的大小，避免安装时间太长，发布时默认会包括`package.json`，`license`，`README`和`main`字段里指定的文件。忽略`node_modules`，`lockfile`等文件，在此基础上，我们可以指定更多需要一起发布的内容。可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件
```json
"files": [
  "filename.js",
  "directory/",
  "glob/*.{js,json}"
]
```
### type
在`node`支持`ES`模块后，要求`ES`模块采用`.mjs`后缀文件名。只要遇到`.mjs`文件，就认为它是`ES`模块。如果不想修改文件后缀，就可以在`package.json`文件中，指定`type`字段为`module`
```json
"type": "module"
```
## main
项目发布时，默认会包括`package.json`，`license`，`README`和`main`字段里指定的文件，因为`main`字段里指定的是项目的入口文件，在`browser`和`Node`环境中都可以使用，如果不设置`main`字段，那么入口文件就是根目录下的`index.js`
```json
"main": "./index.js"
```
### browser
`main`字段里指定的入口文件在`browser`和`Node`环境中都可以使用。如果只想在`web`端使用，不允许在`server`端使用，可以通过`browser`字段指定入口
```json
"browser": "./browser/index.js"
```
### module
项目也可以指定`ES`模块的入口文件，这就是`module`字段的作用
```json
"module": "./index.mjs"
```
当一个项目同时定义了`main`，`browser`和`module`，像`webpack`，`rollup`等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找
### exports
`node`在`14.13`支持在`package.json`里定义`exports`字段，拥有了条件导出的功能，`exports`字段可以配置不同环境对应的模块入口文件，并且当它存在时，它的优先级最高
```json
"exports": {
  "require": "./index.js",
  "import": "./index.mjs"
}
```
这样的配置在使用`import ‘xxx’`和`require(‘xxx’)`时会从不同的入口引入文件

上面的写法等同于
```json
"exports": {
  ".": {
    "require": "./index.js",
    "import": "./index.mjs"
  }
}
```
`exports`除了支持配置包的默认导出，还支持配置包的子路径
```json
"exports": {
  "./style": "./dist/css/index.css"
},
```
```json
//原来的引入
import `packageA/dist/css/index.css`;
// 用户引入时
import `packageA/style`;
```
除了对导出的文件路径进行封装，`exports`还限制了使用者不可以访问未在`“exports”`中定义的任何其他路径。比如发布的`dist`文件里有一些内部模块`dist/internal/module`，被用户单独引入使用的话可能会导致主模块不可用。为了限制外部的使用，我们可以不在`exports`定义这些模块的路径，这样外部引入`packageA/dist/internal/module`模块的话就会报错。
### workspaces
项目的工作区配置，用于在本地的根目录下管理多个子项目。可以自动地在`npm install`时将`workspaces`下面的包，软链到根目录的`node_modules`中，不用手动执行`npm link`操作
```json
"workspaces": [
  "workspace-a"
]
```
表示在`workspace-a`目录下还有一个项目，它也有自己的`package.json`。

通常子项目都会平铺管理在`packages`目录下，所以根目录下`workspaces`通常配置为
```json
"workspaces": [
  "packages/*"
]
```
## 脚本配置
### script
指定项目的一些内置脚本命令，这些命令可以通过`npm run`来执行。通常包含项目开发，构建等`CI`命令
```json
"scripts": {
  "build": "webpack"
}
```
除了指定基础命令，还可以配合`pre`和`post`完成命令的前置和后续操作
```json
"scripts": {
  "build": "webpack",
  "prebuild": "xxx", // build 执行之前的钩子
  "postbuild": "xxx" // build 执行之后的钩子
}
```
执行`npm run build`命令时，会按照`prebuild -> build -> postbuild`的顺序依次执行上方的命令(`pnpm`和`yarn2`已经废弃这种操作)
### config
设置`scripts`里的脚本在运行时的参数
```json
# 设置端口号
"config": {
  "port": "3001"
}
# 在执行脚本时，我们可以通过 npm_package_config_port 这个变量访问到 3001
```

## 依赖配置
### dependencies
运行依赖，也就是项目生产环境下需要用到的依赖
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```
### devDependencies
开发依赖，项目开发环境需要用到而运行时不需要的依赖，用于辅助开发
```json
"devDependencies": {
  "webpack": "^5.69.0"
}
```
### perDependencies
同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。

比如我们安装`A`，`A`的正常使用依赖`B@2.x`版本，那么`B@2.x`就应该被列在`A`的`peerDependencies`下，表示“如果你使用我，那么你也需要安装`B`，并且至少是`2.x`版本
```json
"peerDependencies": {
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```
### optionalDependencies
可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么`npm`的整个安装过程也是成功的
```json
"optionalDependencies": {
  "colors": "^1.4.0"
}
```
### peerDependenciesMeta
同伴依赖也可以使用`peerDependenciesMeta`将其指定为可选的
```json
"peerDependencies": {
  "colors": "^1.4.0"
},
"peerDependenciesMeta": {
  "colors": {
    "optional": true
  }
}
```
### bundleDependencies
打包依赖。它的值是一个数组，在发布包时，`bundleDependencies`里面的依赖都会被一起打包
```json
"bundleDependencies": [
  "react",
  "react-dom"
]
# 在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom
# 需要注意的是，这个字段数组中的值必须是在 dependencies，devDependencies 两个里面声明过的依赖才行
```
### overrides
**注意这种方式在使用的过程中，发现有安装依赖报错，项目不能正常运行（可以尝试但是可能有问题）**

`overrides`可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换
```json
# 某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：
"overrides": {
  "foo": "1.1.0-patch"
}
# 当然这样会更改整个依赖树里的 foo，我们可以只对 A 下的 foo 进行版本号重写
"overrides": {
  "A": {
    "foo": "1.1.0-patch",
  }
}
```

### resolutions
是一个用于解决依赖项冲突的`npm`特殊字段
* 在某些情况下，您的项目依赖项可能需要不同的版本，而这些版本之间可能存在冲突。这时候，您可以使用`resolutions`字段来指定应该使用哪个版本，以解决这些冲突。
* 如果您的项目依赖于`package-a`和`package-b`，而这两个包都依赖于`package-c`，但它们依赖于`package-c`的不同版本，这会导致冲突。在这种情况下，您可以在`package.json`文件中使用`resolutions`字段来指定应该使用哪个版本。
```json
{
  "dependencies": {
    "package-a": "^1.0.0",
    "package-b": "^2.0.0"
  },
  "resolutions": {
    "package-c": "^1.2.0"
  }
}
```
在这个示例中，我们指定了`package-c`的版本应该是`^1.2.0`。这意味着当`npm`安装依赖项时，它将使用`1.2.x`系列中的最新版本来解决`package-a`和`package-b`之间的冲突。

需要注意的是，`resolutions`字段只在您的项目依赖项中出现冲突时才需要使用。在大多数情况下，`npm`可以自动解决依赖项之间的冲突，而无需使用`resolutions`字段。

**当某些安全扫描工具（例如`sonar`）扫描出项目依赖的子依赖版本需要升级的情况，也可以尝试使用此方法来解决。**

在`package.json`文件里添加跟`scripts`、`dependencies`、`evDependencies`平级的`resolutions`，把想要强制升级的子依赖期望版本写入，`scripts`里添加配置`"preinstall": "npx force-resolutions"`，最后像启动项目一样使用`npm run preinstall`运行下载，最后达成目的。
```json
{
  "scripts": {
    "preinstall": "npx npm-force-resolutions || echo 1",
  },
  "dependencies": {
    # 用npm运行需要安装该插件，yarn则不需要
    "npm-force-resolutions": "^0.0.10",
  },
  "resolutions": {
    "async-validator": "^4.0.0",
    "lilconfig": "^3.1.1",
    "cross-spawn": "^7.0.5"
  },
}
```

## 发布配置
### private
如果是私有项目，不希望发布到公共`npm`仓库上，可以将`private`设为`true`
```json
"private": true
```
### publishConfig
`npm`包发布时使用的配置
```json
# 比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}
```

## 系统配置
### engines
一些项目由于兼容性问题会对`node`或者包管理器有特定的版本号要求
```json
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
```
### os
在`linux`上能正常运行的项目可能在`windows`上会出现异常，使用`os`字段可以指定项目对操作系统的兼容性要求
```json
"os": ["darwin", "linux"]
```
### cpu
指定项目只能在特定的`CPU`体系上运行
```json
"cpu": ["x64", "ia32"]

```

## 第三方配置
### types/typings
`types/typings`: 指定`TypeScript`的类型定义的入口文件
```json
"types": "./index.d.ts",
```
### unpkg
让`npm`上所有的文件都开启`CDN`服务
```json
"unpkg": "dist/vue.global.js"
# 当我们想通过 CDN 的方式使用链接引入 vue 时。访问 unpkg.com/vue 会重定向到 unpkg.com/vue@3.2.37/… 3.2.27 是 Vue 的最新版本。
```
### jsdelivr
与`unpkg`类似
```json
"jsdelivr": "dist/vue.global.js",
# 访问 cdn.jsdelivr.net/npm/vue 实际上获取到的是 jsdelivr 字段里配置的文件地址
```
### browserslist
设置项目的浏览器兼容情况，`babel`和`autoprefixer`等工具会使用该配置对代码进行转换。当然你也可以使用`.browserslistrc`单文件配置
```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```
### sideEffects
显示设置某些模块具有副作用，用于`webpack`的`tree-shaking`优化

比如在项目中整体引入`Ant Design`组件库的`css`文件。
```json
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```
如果`Ant Design`的`package.json`里不设置`sideEffects`，那么`webapck`构建打包时会认为这段代码只是引入了但并没有使用，可以`tree-shaking`剔除掉，最终导致产物缺少样式。

所以`Ant Design`在`package.json`里设置了如下的`sideEffects`，来告知`webpack`，这些文件具有副作用，引入后不能被删除
```json
"sideEffects": [
  "dist/*",
  "es/**/style/*",
  "lib/**/style/*",
  "*.less"
]
```

### lint-staged
用于对`git`的暂存区的文件进行操作的工具，比如可以在代码提交前执行`lint`校验，类型检查，图片优化等操作
```json
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add -A"
  ]
}
```
`lint-staged`通常配合`husky`这样的`git-hooks`工具一起使用。`git-hooks`用来定义一个钩子，这些钩子方法会在`git`工作流程中比如`pre-commit`，`commit-msg`时触发，可以把`lint-staged`放到这些钩子方法中
### eslintConfig
`eslint`的配置可以写在单独的配置文件`.eslintrc.json`中，也可以写在`package.json`文件的`eslintConfig`配置项中
```json
"eslintConfig": {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {},
  "parserOptions": {
    "parser": "babel-eslint"
  },
}
```
### babel
`babel`用来指定`Babel`的编译配置
```json
"babel": {
  "presets": ["@babel/preset-env"],
  "plugins": [...]
}
```
### gitHooks
`gitHooks`用来定义一个钩子，在提交`（commit）`之前执行`ESlint`检查。在执行`lint`命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以需要用`git add`命令将修复后的文件重新加入暂存区。在执行`pre-commit`命令之后，如果没有错误，就会执行`git commit`命令
```json
"gitHooks": {
  "pre-commit": "lint-staged"
}
```

