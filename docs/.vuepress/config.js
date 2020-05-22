module.exports = {
    title: "gp's blog",
	description: '学而时习之不亦说乎，有朋至远方来不亦乐乎。',
	dest: './output', // 打包文件
	base: '/output/',
	// head: ['link', { rel: 'icon', href: '/logo.png' }],
	repo: 'git@github.com:gsrevery/blog.git',
	port: 1314,
	markdown: {
        lineNumbers: true
    },
	themeConfig: {
        nav: [{
            text: 'Blog',
            link: '/article/Other/git'
        }, {
            text: 'Resume',
            link: '/aboutMe'
        }],
        sidebarDepth: 2,
        sidebar: {
            '/article/': [
                'JavaScript/rule',
                'JavaScript/node',
                'Other/git',
            ]
        }
    }
  }