(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{374:function(t,i,s){"use strict";s.r(i);var a=s(14),v=Object(a.a)({},(function(){var t=this,i=t._self._c;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h1",{attrs:{id:"git的使用说明"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git的使用说明"}},[t._v("#")]),t._v(" git的使用说明 ✔️")]),t._v(" "),i("h2",{attrs:{id:"git的基本操作"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git的基本操作"}},[t._v("#")]),t._v(" git的基本操作")]),t._v(" "),i("ul",[i("li",[t._v("git pull   //将线上仓库里面的代码拉到本地。")]),t._v(" "),i("li",[t._v("git add -A    //将A文件添加到暂存区。")]),t._v(" "),i("li",[t._v('git commit -m"本次提交名字"   //将暂存区的文件提交到本地的版本库。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，commit-id在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里。')]),t._v(" "),i("li",[t._v("git push  将本地的代码推到线上的仓库")]),t._v(" "),i("li",[t._v("上述操作为推代码的必须步骤及顺序。")]),t._v(" "),i("li",[t._v("git dff     //查看上传代码")]),t._v(" "),i("li",[t._v("git status    //显示工作目录和暂存区的状态")])]),t._v(" "),i("h2",{attrs:{id:"git的版本回退"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git的版本回退"}},[t._v("#")]),t._v(" git的版本回退")]),t._v(" "),i("ul",[i("li",[t._v("git log   //查看commit的信息，查看历史提交")]),t._v(" "),i("li",[t._v("git reset --soft d125b19d92a1d    //回退到某一个版本，只回退了commit的信息('d125b19d92a1d'是哈希值)")]),t._v(" "),i("li",[t._v("git reset --hard 521d2bdb83  //回退到某一个版本，回退的是本地代码。('d125b19d92a1d'是哈希值即commit号的前几位)")]),t._v(" "),i("li",[t._v("查看本地修改如果没有修改，又想把当前回退的代码提交到仓库中去，可以使用强制提交代码。（这种方式不建议使用，因为提交之后，仓库的历史提交就回退到当前版本了，当前版本之后的提交全部消失。）\ngit reflog  // 查看回退版本后仓库中消失的历史提交记录，适用于解决git reset --hard 回退指定版本代码后需要恢复到原有版本或者消失的版本")]),t._v(" "),i("li",[t._v("git push -f  //强制提交代码。")])]),t._v(" "),i("h2",{attrs:{id:"git的文件存储"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git的文件存储"}},[t._v("#")]),t._v(" git的文件存储")]),t._v(" "),i("ul",[i("li",[t._v("git stash    //将工作区的文件存到暂存区。工作区就没有文件了")]),t._v(" "),i("li",[t._v("git stash save \"小白\"   //将工作区的文件暂存到暂存区，名字为'小白'")]),t._v(" "),i("li",[t._v("git stash apply    //存储文件，工作区和暂存区都有，相当于备份")]),t._v(" "),i("li",[t._v("git stash list    //展示当前存储库中的存储单元列表")]),t._v(" "),i("li",[t._v("git stash pop   //恢复暂存工作,暂存列表中的第一项")]),t._v(" "),i("li",[t._v("git stash pop stash@{index} //恢复指定的暂存工作，暂存记录保存在list内，需要通过list索引index取出恢复")]),t._v(" "),i("li",[t._v("git stash drop    //移除存储列表中的第一项")]),t._v(" "),i("li",[t._v("git stash drop stash@{index}   //删除某个暂存，暂存记录保存在list内，需要通过list索引index删除")]),t._v(" "),i("li",[t._v("git stash clear  //删除所有缓存的stash")]),t._v(" "),i("li",[t._v("git stash save login    //保存某一项")]),t._v(" "),i("li",[t._v("git reset head src/pages/business-review/details.vue     //取消这个文件的暂存")])]),t._v(" "),i("h2",{attrs:{id:"git清空commit信息"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git清空commit信息"}},[t._v("#")]),t._v(" git清空commit信息")]),t._v(" "),i("p",[t._v("git checkout orphan 分支名")]),t._v(" "),i("p",[t._v("创建并切换到新分支并清空commit信息")]),t._v(" "),i("h2",{attrs:{id:"git提交分支的创建以及切换"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git提交分支的创建以及切换"}},[t._v("#")]),t._v(" git提交分支的创建以及切换")]),t._v(" "),i("ul",[i("li",[t._v("git branch    //查看分支")]),t._v(" "),i("li",[t._v("git branch dev    //创建一个叫“dev”的分支")]),t._v(" "),i("li",[t._v("git branch dev 7c87   //在本地创建一个dev分支并将哈希值为“7c87”版本的代码放在dev分支中")]),t._v(" "),i("li",[t._v("git branch -d dev    //删除一个叫“dev”的分支")]),t._v(" "),i("li",[t._v("git push origin dev // 提交该分支到远程仓库")]),t._v(" "),i("li",[t._v("git push origin -d dev //从远程仓库中删除dev分支（分支删除时不要在需要删除的分支上操作）")]),t._v(" "),i("li",[t._v("git checkout -b ticket/5 origin/master    //分支的切换由ticket/3切换到ticket/5上去")]),t._v(" "),i("li",[t._v("git checkout master    //分支的切换至master")]),t._v(" "),i("li",[t._v("git merge dev  //将dev分支修改的内容合并到当前分支")]),t._v(" "),i("li",[t._v('git merge --no-ff -m "合并dev修改报错" dev  //将dev分支修改的内容合并到当前分支，并重新给一个commit信息')])]),t._v(" "),i("h2",{attrs:{id:"git打标签"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git打标签"}},[t._v("#")]),t._v(" git打标签")]),t._v(" "),i("ul",[i("li",[t._v("git tag   查看所有的标签名。")]),t._v(" "),i("li",[t._v("git tag dev1.0  为当前分支所在的提交记录打上标签，标签名为dev1.0")]),t._v(" "),i("li",[t._v("git tag dev1.0 commit的哈希值  为当前分支所在的某个提交记录打上标签，标签名为dev1.0")]),t._v(" "),i("li",[t._v("git tag -d <tag_name>：删除某个标签")]),t._v(" "),i("li",[t._v("git push origin <tag_name>：推送某个标签到远程仓库。")]),t._v(" "),i("li",[t._v("git push origin --delete <tag_name>：删除远程仓库中的某个标签。")])]),t._v(" "),i("h2",{attrs:{id:"将本地项目与远程仓库建立联系"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#将本地项目与远程仓库建立联系"}},[t._v("#")]),t._v(" 将本地项目与远程仓库建立联系")]),t._v(" "),i("ul",[i("li",[t._v("git remote rm origin")]),t._v(" "),i("li",[t._v("git remote add origin git仓库地址")]),t._v(" "),i("li",[t._v("git pull origin 分支名")]),t._v(" "),i("li",[t._v("git add .")]),t._v(" "),i("li",[t._v('git commit -m "commit名"')]),t._v(" "),i("li",[t._v("git push origin 分支名")])]),t._v(" "),i("h2",{attrs:{id:"清除commit的信息但是保留代码"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#清除commit的信息但是保留代码"}},[t._v("#")]),t._v(" 清除commit的信息但是保留代码")]),t._v(" "),i("ul",[i("li",[t._v("git checkout --orphan d4m1ts      创建并切换到孤儿分支（该分支与现有分支无关，完全独立）")]),t._v(" "),i("li",[t._v('git commit -m "first commit"      当前文件夹下的所有内容都被默认添加到暂存区，直接commit提交即可')]),t._v(" "),i("li",[t._v("git branch -D master      删除原来的分支（默认是master，也有可能是main、dev）")]),t._v(" "),i("li",[t._v("git branch -m master      把当前分支重命名为主分支")]),t._v(" "),i("li",[t._v("git push -f origin master     强行推送到远程仓库")])]),t._v(" "),i("h2",{attrs:{id:"本地分支与远程分支建立联系"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#本地分支与远程分支建立联系"}},[t._v("#")]),t._v(" 本地分支与远程分支建立联系")]),t._v(" "),i("ul",[i("li",[t._v("git branch --set-upstream-to=origin/远程分支名 本地分支名")])]),t._v(" "),i("h2",{attrs:{id:"修改git-提交的用户名和用户email命令"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#修改git-提交的用户名和用户email命令"}},[t._v("#")]),t._v(" 修改git 提交的用户名和用户Email命令")]),t._v(" "),i("ol",[i("li",[t._v("首先查看全局配置：")])]),t._v(" "),i("ul",[i("li",[t._v("git config  --list")]),t._v(" "),i("li",[t._v("git config --local --list")])]),t._v(" "),i("ol",{attrs:{start:"2"}},[i("li",[t._v("修改全局")])]),t._v(" "),i("ul",[i("li",[t._v("如果你要修改当前全局的用户名和邮箱时，需要在上面的两条命令中添加一个参数，--global，代表的是全局。")])]),t._v(" "),i("blockquote",[i("p",[t._v("git config  --global user.name 你的目标用户名。")])]),t._v(" "),i("blockquote",[i("p",[t._v("git config  --global user.email 你的目标邮箱名。")])]),t._v(" "),i("ol",{attrs:{start:"3"}},[i("li",[t._v("修改当前的project")])]),t._v(" "),i("blockquote",[i("p",[t._v("git 修改当前的project的用户名的命令为：git config user.name 你的目标用户名。")])]),t._v(" "),i("blockquote",[i("p",[t._v("git 修改当前的project提交邮箱的命令为：git config user.email 你的目标邮箱名。")])]),t._v(" "),i("h2",{attrs:{id:"git在拉取代码时的常见问题"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git在拉取代码时的常见问题"}},[t._v("#")]),t._v(" git在拉取代码时的常见问题")]),t._v(" "),i("ol",[i("li",[t._v("问题1\n当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过git pull解决.但是如果可能发生冲突怎么办.直接git pull会拒绝覆盖当前的修改.")])]),t._v(" "),i("p",[i("strong",[t._v("解决方法")])]),t._v(" "),i("p",[t._v("方法一：")]),t._v(" "),i("ol",[i("li",[t._v("git stash    //将工作区的文件存到暂存区。")]),t._v(" "),i("li",[t._v("git pull    //拉一下代码。")]),t._v(" "),i("li",[t._v("git stash pop    //将暂存区的代码释放出去回到工作区。这时候会出现冲突，解决冲突")]),t._v(" "),i("li",[t._v("git add .")]),t._v(" "),i("li",[t._v("git commit")]),t._v(" "),i("li",[t._v("git push")])]),t._v(" "),i("p",[t._v("方法二：")]),t._v(" "),i("ol",[i("li",[i("p",[t._v("git add .")])]),t._v(" "),i("li",[i("p",[t._v("git commit // 先commit一下，但是不要推代码。")])]),t._v(" "),i("li",[i("p",[t._v("git pull  // 这时候再拉一下代码，代码拉下来后会出现冲突，然后解决冲突。")])]),t._v(" "),i("li",[i("p",[t._v("git add .  // 将解决冲突的代码添加进工作区")])]),t._v(" "),i("li",[i("p",[t._v("git commit")])]),t._v(" "),i("li",[i("p",[t._v("git push")])]),t._v(" "),i("li",[i("p",[t._v("问题2")])])]),t._v(" "),i("div",{staticClass:"language-javascript line-numbers-mode"},[i("pre",{pre:!0,attrs:{class:"language-javascript"}},[i("code",[i("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("error")]),i("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Pulling is not possible because you have unmerged files"),i("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),i("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("hint")]),i("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Fix them up "),i("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" the work tree"),i("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" and then use "),i("span",{pre:!0,attrs:{class:"token string"}},[t._v("'git add/rm <file>'")]),t._v("\n"),i("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("hint")]),i("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),i("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" appropriate to mark resolution and make a commit"),i("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),i("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("fatal")]),i("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Exiting because "),i("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" an unresolved conflict"),i("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n")])]),t._v(" "),i("div",{staticClass:"line-numbers-wrapper"},[i("span",{staticClass:"line-number"},[t._v("1")]),i("br"),i("span",{staticClass:"line-number"},[t._v("2")]),i("br"),i("span",{staticClass:"line-number"},[t._v("3")]),i("br"),i("span",{staticClass:"line-number"},[t._v("4")]),i("br")])]),i("blockquote",[i("p",[t._v("解决办法")])]),t._v(" "),i("ul",[i("li",[t._v("回退版本")])]),t._v(" "),i("h2",{attrs:{id:"在本地创建ssh密钥"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#在本地创建ssh密钥"}},[t._v("#")]),t._v(" 在本地创建ssh密钥")]),t._v(" "),i("p",[t._v("在 Git Bash下操作")]),t._v(" "),i("ol",[i("li",[t._v("先删除.ssh /known_hosts 文件")]),t._v(" "),i("li",[t._v("创建SSH Key")])]),t._v(" "),i("ul",[i("li",[t._v('加邮箱名的创建方式 $ ssh-keygen -t rsa -C "youremail@example.com"')]),t._v(" "),i("li",[t._v("不加邮箱名的创建方式 $ ssh-keygen")]),t._v(" "),i("li",[t._v("输入完毕后按回车，程序会要求输入一个密码，输入完密码后按回车会要求再确认一次密码，如果不想要密码可以在要求输入密码的时候按两次回次，表示密码为空，并且确认密码为空，此时[c盘>用户>自己的用户名>.ssh]目录下已经生成好了。")])]),t._v(" "),i("ol",{attrs:{start:"3"}},[i("li",[t._v("查看自己的密钥")])]),t._v(" "),i("ul",[i("li",[t._v("进入.ssh文件夹 cd ~/.ssh")]),t._v(" "),i("li",[t._v("查看SSH Key cat id_rsa.pub")])])])}),[],!1,null,null,null);i.default=v.exports}}]);