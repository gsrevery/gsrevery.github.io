# git的使用说明 :heavy_check_mark:

## git的基本操作

* git pull   //将线上仓库里面的代码拉到本地。
* git add -A    //将A文件添加到暂存区。
* git commit -m"本次提交名字"   //将暂存区的文件提交到本地的版本库。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，commit-id在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里。
* git push  将本地的代码推到线上的仓库
* 上述操作为推代码的必须步骤及顺序。
* git dff     //查看上传代码
* git status    //显示工作目录和暂存区的状态

## git的版本回退

* git log   //查看commit的信息，查看历史提交
* git reset --soft d125b19d92a1d    //回退到某一个版本，只回退了commit的信息('d125b19d92a1d'是哈希值)
* git reset --hard 521d2bdb83  //回退到某一个版本，回退的是本地代码。('d125b19d92a1d'是哈希值即commit号的前几位)
* 查看本地修改如果没有修改，又想把当前回退的代码提交到仓库中去，可以使用强制提交代码。（这种方式不建议使用，因为提交之后，仓库的历史提交就回退到当前版本了，当前版本之后的提交全部消失。）
git reflog  // 查看回退版本后仓库中消失的历史提交记录，适用于解决git reset --hard 回退指定版本代码后需要恢复到原有版本或者消失的版本
* git push -f  //强制提交代码。

## git的文件存储

* git stash    //将工作区的文件存到暂存区。工作区就没有文件了
* git stash save "小白"   //将工作区的文件暂存到暂存区，名字为'小白'
* git stash apply    //存储文件，工作区和暂存区都有，相当于备份
* git stash list    //展示当前存储库中的存储单元列表
* git stash pop   //恢复暂存工作,暂存列表中的第一项
* git stash pop stash@{index} //恢复指定的暂存工作，暂存记录保存在list内，需要通过list索引index取出恢复
* git stash drop    //移除存储列表中的第一项
* git stash drop stash@{index}   //删除某个暂存，暂存记录保存在list内，需要通过list索引index删除
* git stash clear  //删除所有缓存的stash
* git stash save login    //保存某一项
* git reset head src/pages/business-review/details.vue     //取消这个文件的暂存

## git清空commit信息

git checkout orphan 分支名

创建并切换到新分支并清空commit信息

## git提交分支的创建以及切换

* git branch    //查看分支
* git branch dev    //创建一个叫“dev”的分支
* git branch dev 7c87   //在本地创建一个dev分支并将哈希值为“7c87”版本的代码放在dev分支中
* git branch -d dev    //删除一个叫“dev”的分支
* git push origin dev // 提交该分支到远程仓库
* git push origin -d dev //从远程仓库中删除dev分支（分支删除时不要在需要删除的分支上操作）
* git checkout -b ticket/5 origin/master    //分支的切换由ticket/3切换到ticket/5上去
* git checkout master    //分支的切换至master
* git merge dev  //将dev分支修改的内容合并到当前分支
* git merge --no-ff -m "合并dev修改报错" dev  //将dev分支修改的内容合并到当前分支，并重新给一个commit信息

## git打标签
* git tag   查看所有的标签名。
* git tag dev1.0  为当前分支所在的提交记录打上标签，标签名为dev1.0
* git tag dev1.0 commit的哈希值  为当前分支所在的某个提交记录打上标签，标签名为dev1.0
* git tag -d <tag_name>：删除某个标签
* git push origin <tag_name>：推送某个标签到远程仓库。
* git push origin --delete <tag_name>：删除远程仓库中的某个标签。

## 将本地项目与远程仓库建立联系
* git remote -v 查看仓库源
* git remote rm origin 删除关联对应的远程仓库地址
* git remote add origin git仓库地址  将本地项目和远程的仓库进行关联
* git pull origin 分支名 拉取仓库代码
* git add .
* git commit -m "commit名"
* git push origin 分支名

## 清除commit的信息但是保留代码
* git checkout --orphan d4m1ts      创建并切换到孤儿分支（该分支与现有分支无关，完全独立）
* git commit -m "first commit"      当前文件夹下的所有内容都被默认添加到暂存区，直接commit提交即可
* git branch -D master      删除原来的分支（默认是master，也有可能是main、dev）
* git branch -m master      把当前分支重命名为主分支
* git push -f origin master     强行推送到远程仓库

## 本地分支与远程分支建立联系
* git branch --set-upstream-to=origin/远程分支名 本地分支名

## 修改git 提交的用户名和用户Email命令

1. 首先查看全局配置：

* git config  --list 
* git config --local --list  

2. 修改全局
* 如果你要修改当前全局的用户名和邮箱时，需要在上面的两条命令中添加一个参数，--global，代表的是全局。

> git config  --global user.name 你的目标用户名。

> git config  --global user.email 你的目标邮箱名。

3. 修改当前的project

> git 修改当前的project的用户名的命令为：git config user.name 你的目标用户名。

> git 修改当前的project提交邮箱的命令为：git config user.email 你的目标邮箱名。


## git在拉取代码时的常见问题

1. 问题1
当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过git pull解决.但是如果可能发生冲突怎么办.直接git pull会拒绝覆盖当前的修改.

**解决方法**

方法一：
1. git stash    //将工作区的文件存到暂存区。
2. git pull    //拉一下代码。
3. git stash pop    //将暂存区的代码释放出去回到工作区。这时候会出现冲突，解决冲突
4. git add .
5. git commit 
6. git push

方法二：
1. git add .
2. git commit // 先commit一下，但是不要推代码。
3. git pull  // 这时候再拉一下代码，代码拉下来后会出现冲突，然后解决冲突。
4. git add .  // 将解决冲突的代码添加进工作区
5. git commit
6. git push

2. 问题2
```javascript
error: Pulling is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```
> 解决办法
* 回退版本

## 在本地创建ssh密钥
在 Git Bash下操作
1. 先删除.ssh /known_hosts 文件
2. 创建SSH Key
* 加邮箱名的创建方式 $ ssh-keygen -t rsa -C "youremail@example.com"
* 不加邮箱名的创建方式 $ ssh-keygen
* 输入完毕后按回车，程序会要求输入一个密码，输入完密码后按回车会要求再确认一次密码，如果不想要密码可以在要求输入密码的时候按两次回次，表示密码为空，并且确认密码为空，此时[c盘>用户>自己的用户名>.ssh]目录下已经生成好了。
3. 查看自己的密钥
* 进入.ssh文件夹 cd ~/.ssh
* 查看SSH Key cat id_rsa.pub