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
            link: '/article/JavaScript/rule'
        }, {
            text: 'Resume',
            link: '/aboutMe'
        }],
        sidebarDepth: 3,
        sidebar: {
            '/article/': [
                'JavaScript/rule',
                'JavaScript/QA-daily',
                'JavaScript/node',
                'JavaScript/css',
                'Other/git'
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