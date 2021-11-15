module.exports = {
    title: "gp's blog",
	description: '学而时习之不亦说乎，有朋至远方来不亦乐乎。',
	// dest: './blog' 打包文件的存放位置
	// 上传到github上面，博客的页面就是在该文件中找的。
	// blog文件下的index.html页面有相关路径可以参考。
	// base: '/blog/'  打包文件的基础路径，如果这里的blog改变，打包文件下的index.html页面的相关路径也会改变。
	dest: './blog', 
	base: '/blog/',
	// head: ['link', { rel: 'icon', href: '/avator.jpg' }],
	repo: 'https://gitee.com/gpzrm/Blog.git',
	port: 1314,
	markdown: {
        lineNumbers: true
    },
	themeConfig: {
        nav: [{
            text: 'Blog',
            link: '/Home'
        }, {
            text: 'Resume',
            link: '/AboutMe'
        }],
        sidebarDepth: 3,
        sidebar: {
            '/article/': [
                // js
                // 优化
                'JavaScript/Optimization',
                // 代码规范
                'JavaScript/Rule',
                // 练习题目
                'JavaScript/QA-daily',
                // 对象
                'JavaScript/Object',
                // 数组
                'JavaScript/Array',
                // 函数
                'JavaScript/Function',
                // 内存
                'JavaScript/Ram',
                // 常用方法
                'JavaScript/Method',
                // 代码健壮性
                'JavaScript/Robustness',
                // 树
                'JavaScript/Tree',
                // this指向
                'JavaScript/This',
                // 不常见的但实用的css
                'JavaScript/Css',
                // 事件循环机制
                'JavaScript/EventLoop',
                // 冒泡
                'JavaScript/Bubble',
                // 数据特殊处理
                'JavaScript/CommonlyMethod',
                // vue
                // 组件
                'Vue/Components',
                // 跨域
                'Vue/CrossDomain',
                // 项目重构优化
                'Vue/Reconstruction',
                // vue问题
                'Vue/Question',
                // 路由
                'Vue/Router',
                // other
                // git操作
                'Other/Git',
                // lodop插件
                'Other/LODOP',
                // 面试
                'Other/Interview',
                // js常用的各种插件
                'Other/PluginUnit',
                // vscode常用插件
                'Other/Vscode'
            ]
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@img': 'images'
            }
        }
    }
  }