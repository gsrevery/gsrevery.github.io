(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{328:function(s,t,a){s.exports=a.p+"assets/img/npm-start.74e268bf.png"},329:function(s,t,a){s.exports=a.p+"assets/img/npm-com.bac42cbd.png"},380:function(s,t,a){"use strict";a.r(t);var r=a(14),n=Object(r.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"npm私有库的创建及应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#npm私有库的创建及应用"}},[s._v("#")]),s._v(" npm私有库的创建及应用")]),s._v(" "),t("h2",{attrs:{id:"使用verdaccio搭建npm私有库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用verdaccio搭建npm私有库"}},[s._v("#")]),s._v(" 使用verdaccio搭建npm私有库")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("全局安装"),t("code",[s._v("npm install -g verdaccio")])])]),s._v(" "),t("li",[t("p",[s._v("修改verdaccio配置文件")]),s._v(" "),t("p",[s._v("config.yaml ——  在配置文件最后添加监听端口，"),t("code",[s._v("listen: 0.0.0.0:4873")])]),s._v(" "),t("p",[s._v("作用：默认只能在本机访问，添加完成后就可以在外网访问。4873是对外暴露的端口")])]),s._v(" "),t("li",[t("p",[s._v("启动verdaccio:")])])]),s._v(" "),t("img",{attrs:{src:a(328),height:"200"}}),s._v(" "),t("ol",{attrs:{start:"4"}},[t("li",[t("p",[s._v("查看npm库"),t("code",[s._v("http://192.168.1.10:4873/")])])]),s._v(" "),t("li",[t("p",[s._v("创建需要维护的组件库/方法库")])])]),s._v(" "),t("img",{attrs:{src:a(329),height:"200"}}),s._v(" "),t("p",[s._v("package.json配置，由于使用了view-design和less，使用时需要在入口文件里引入view-design和样式库")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ytxd-component"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"version"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0.0"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"description"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"远通信德公共组件库"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"main"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.js"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"scripts"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"test"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo \\"Error: no test specified\\" && exit 1"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"dependencies"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"view-design"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.1.3"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"less"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^3.11.1"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"less-loader"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^5.0.0"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"repository"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"type"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"git"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"url"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"git+ssh://git@gitee.com:gpzrm/npm.git"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"keywords"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"远通信德"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"components"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"author"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hh"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"license"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ISC"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"bugs"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"url"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://gitee.com/gpzrm/npm.git"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v('"homepage"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://gitee.com/gpzrm/npm.git"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br")])]),t("ol",{attrs:{start:"6"}},[t("li",[t("p",[s._v("添加一个放npm地址的源")])]),s._v(" "),t("li",[t("p",[s._v("创建一个npm的账号(可以在官网进行注册)")])]),s._v(" "),t("li",[t("p",[s._v("代码进行关联账号")]),s._v(" "),t("ul",[t("li",[s._v("npm adduser --registry http://your_ip:4873")]),s._v(" "),t("li",[s._v("// 后续需要填写自己的相关信息")]),s._v(" "),t("li",[s._v("// 填完回车就可以")])])]),s._v(" "),t("li",[t("p",[s._v("发布npm包")]),s._v(" "),t("ul",[t("li",[s._v("npm publish --registry http://your_ip:4873")])])]),s._v(" "),t("li",[t("p",[s._v("刷新页面就能看到你上传的npm包了")])])]),s._v(" "),t("h2",{attrs:{id:"安装npm源管理工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装npm源管理工具"}},[s._v("#")]),s._v(" 安装npm源管理工具")]),s._v(" "),t("p",[s._v("nrm(npm registry manager )是npm的镜像源管理工具，使用这个就可以快速地在 npm 源间切换。我们使用nrm切换npm其他源和我们的私有npm源。")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("全局安装nrm: npm install -g nrm\n查看源：nrm ls\n添加源：nrm add <源的名称> <源的地址>    eg: nrm add giao http://39.103.234.148:4873/\n使用源：nrm use <源的名称>   eg: nrm use giao\n删除源：nrm del<源的名称>   eg: nrm del giao\n")])])]),t("p",[s._v("安装好nrm后，我们需要添加一个npm私有库地址的源，方便我们在引用库的时候方便切换")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("nrm add project http://your_ip:4873\n\x3c!-- 切换npm源 --\x3e\nnrm use project\n\x3c!-- 这样我们现在就能使用库里组件/方法了 --\x3e\nyarn add ytxd-component\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"node-js的守护进程管理器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-js的守护进程管理器"}},[s._v("#")]),s._v(" node.js的守护进程管理器")]),s._v(" "),t("p",[s._v("pm2 是一个守护进程管理器，它将帮助您管理和保持您的应用程序在线。我们使用pm2来保存verdaccio应用在线。")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("全局安装pm2: npm install -g pm2\n启动verdaccio: pm2 start verdaccio\n停止verdaccio: pm2 stop verdaccio\n")])])]),t("h1",{attrs:{id:"npm镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#npm镜像"}},[s._v("#")]),s._v(" npm镜像")]),s._v(" "),t("h2",{attrs:{id:"查看当前镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看当前镜像"}},[s._v("#")]),s._v(" 查看当前镜像")]),s._v(" "),t("p",[s._v("npm get registry")]),s._v(" "),t("p",[s._v("yarn config get registry")]),s._v(" "),t("h2",{attrs:{id:"设置淘宝镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置淘宝镜像"}},[s._v("#")]),s._v(" 设置淘宝镜像")]),s._v(" "),t("p",[s._v("npm config set registry https://registry.npm.taobao.org/")]),s._v(" "),t("p",[s._v("yarn config set registry https://registry.npm.taobao.org/")])])}),[],!1,null,null,null);t.default=n.exports}}]);