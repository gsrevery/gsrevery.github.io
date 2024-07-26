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
	repo: 'git@github.com:gsrevery/gsrevery.github.io.git',
	port: 1314,
	markdown: {
        lineNumbers: true
    },
	themeConfig: {
        nav: [{
            text: 'Blog',
            link: '/article/JavaScript/Rule'
        }, {
            text: 'Resume',
            link: '/AboutMe'
        }],
        sidebarDepth: 3,
        sidebar: [
            {
                title: 'JavaScript',
                collapsable: false,
                children: [
                    {
                        title: '优化',
                        path: '/article/JavaScript/Optimization'
                    },
                    {
                        title: '代码规范',
                        path: '/article/JavaScript/Rule'
                    },
                    {
                        title: '练习题目',
                        path: '/article/JavaScript/QA-daily'
                    },
                    {
                        title: '对象',
                        path: '/article/JavaScript/Object'
                    },
                    {
                        title: '数组',
                        path: '/article/JavaScript/Array'
                    },
                    {
                        title: '函数',
                        path: '/article/JavaScript/Function'
                    },
                    {
                        title: '内存',
                        path: '/article/JavaScript/Ram'
                    },
                    {
                        title: '常用方法',
                        path: '/article/JavaScript/Method'
                    },
                    {
                        title: '公共方法',
                        path: '/article/JavaScript/PublicFunction'
                    },
                    {
                        title: '代码健壮性',
                        path: '/article/JavaScript/Robustness'
                    },
                    {
                        title: '树',
                        path: '/article/JavaScript/Tree'
                    },
                    {
                        title: 'this指向',
                        path: '/article/JavaScript/This'
                    },
                    {
                        title: '不常见的但实用的css',
                        path: '/article/JavaScript/Css'
                    },
                    {
                        title: '事件循环机制',
                        path: '/article/JavaScript/EventLoop'
                    },
                    {
                        title: '跨域',
                        path: '/article/JavaScript/CrossDomain'
                    },
                    {
                        title: '冒泡',
                        path: '/article/JavaScript/Bubble'
                    },
                    {
                        title: '数据特殊处理',
                        path: '/article/JavaScript/CommonlyMethod'
                    }
                ]
            },
            {
                title: 'Vue',
                collapsable: false,
                children: [
                    {
                        title: '组件',
                        path: '/article/Vue/Components'
                    },
                    {
                        title: '跨域',
                        path: '/article/Vue/CrossDomain'
                    },
                    {
                        title: '项目重构优化',
                        path: '/article/Vue/Reconstruction'
                    },
                    {
                        title: 'vue问题',
                        path: '/article/Vue/Question'
                    },
                    {
                        title: '文件处理',
                        path: '/article/Vue/FileHandle'
                    },
                    {
                        title: '路由',
                        path: '/article/Vue/Router'
                    },
                    {
                        title: '表格',
                        path: '/article/Vue/Table'
                    },
                    {
                        title: '页面',
                        path: '/article/Vue/SpecialPage'
                    }
                ]
            },
            {
                title: 'App',
                collapsable: false,
                children: [
                    {
                        title: 'uni-app',
                        path: '/article/APP/UniApp'
                    }
                ]
            },
            {
                title: 'Other',
                collapsable: false,
                children: [
                    {
                        title: 'git操作',
                        path: '/article/Other/Git'
                    },
                    {
                        title: 'canvas',
                        path: '/article/Other/Canvas'
                    },
                    {
                        title: 'qiankun',
                        path: '/article/Other/Qiankun'
                    },
                    {
                        title: 'lodop插件',
                        path: '/article/Other/LODOP'
                    },
                    {
                        title: 'npm私有库',
                        path: '/article/Other/Npm'
                    },
                    {
                        title: '问题总结',
                        path: '/article/Other/Interview'
                    },
                    {
                        title: '运行项目问题',
                        path: '/article/Other/ProjectLssues'
                    },
                    {
                        title: '在线支付',
                        path: '/article/Other/OnlinePayment'
                    },
                    {
                        title: 'js常用的各种插件',
                        path: '/article/Other/PluginUnit'
                    },
                    {
                        title: 'vscode常用插件',
                        path: '/article/Other/Vscode'
                    }
                ]
            },
            {
                title: 'Three',
                collapsable: false,
                children: [
                    {
                        title: 'Three概览',
                        path: '/article/Three/Overview'
                    },
                    {
                        title: 'Three性能优化',
                        path: '/article/Three/Optimize'
                    },
                    {
                        title: 'Three常见问题及解决方案',
                        path: '/article/Three/IntelligentPackingFunction'
                    },
                    {
                        title: 'Cannon物理引擎',
                        path: '/article/Three/Cannon'
                    },
                ]
            }
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@img': 'images'
            }
        }
    }
  }