# git的使用说明

### git的基本操作
* git pull   //将线上仓库里面的代码拉到本地。
* git add -A    //将A文件添加到暂存区。
* git commit -m"本次提交名字"   //将暂存区的文件提交到本地的版本库。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫         commit-id，commit-id在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里。
* git push  将本地的代码推到线上的仓库
* 上述操作为推代码的必须步骤及顺序。
* git dff     //查看上传代码
* git status    //显示工作目录和暂存区的状态

### git的版本回退
* git log   //查看commit的信息，查看历史提交
* git reset --soft d125b19d92a1d    //回退到某一个版本，只回退了commit的信息('d125b19d92a1d'是哈希值)
* git reset --hard 521d2bdb83  //回退到某一个版本，回退的是本地代码。('d125b19d92a1d'是哈希值即commit号的前几位)
* 查看本地修改如果没有修改，又想把当前回退的代码提交到仓库中去，可以使用强制提交代码。（这种方式不建议使用，因为提交之后，仓库的历史提交就回退到当前版本了，当前版本之后的提交全部消失。）
git reflog  // 查看回退版本后仓库中消失的历史提交记录，适用于解决git reset --hard 回退指定版本代码后需要恢复到原有版本或者消失的版本
* git push -f  //强制提交代码。

### git的文件存储
* git stash    //将工作区的文件存到暂存区。工作区就没有文件了
* git stash apply    //存储文件，工作区和暂存区都有，相当于备份
* git stash list    //展示当前存储库中的存储单元列表
* git stash pop    //将暂存区的代码释放出去回到工作区。
* git stash drop    //移除存储列表中的第一个文件
* git stash save login    //保存某一个文件
* git reset head src/pages/business-review/details.vue     //取消这个文件的暂存

### git提交分支的创建以及切换
* git branch    //查看分支
* git branch dev    //创建一个叫“dev”的分支
* git branch dev 7c87   //在本地创建一个dev分支并将哈希值为“7c87”版本的代码放在dev分支中
* git branch -d dev    //删除一个叫“dev”的分支
* git push origin dev // 提交该分支到远程仓库
* git push origin -d dev //从远程仓库中删除dev分支（分支删除时不要在需要删除的分支上操作）
* git checkout -b ticket/5 origin/master    //分支的切换由ticket/3切换到ticket/5上去
* git checkout master    //分支的切换至master
* git merge dev  //将dev分支修改的内容合并到当前分支

### 修改git 提交的用户名和用户Email命令
* #### 首先查看全局配置：

>* git config  --list 
* git config --local --list  

* #### 修改全局
* 如果你要修改当前全局的用户名和邮箱时，需要在上面的两条命令中添加一个参数，--global，代表的是全局。

>* git config  --global user.name 你的目标用户名。
* git config  --global user.email 你的目标邮箱名。

* #### 修改当前的project

>* git 修改当前的project的用户名的命令为：git config user.name 你的目标用户名。
* git 修改当前的project提交邮箱的命令为：git config user.email 你的目标邮箱名。


### git在拉取代码时的常见问题
#### NO:1
* 当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过git pull解决.但是如果可能发生冲突怎么办.直接git pull会拒绝覆盖当前的修改.

> 解决方法
1. git stash    //将工作区的文件存到暂存区。
2. git pull    //拉一下代码。
3. git stash pop    //将暂存区的代码释放出去回到工作区。

#### NO:2
>* error: Pulling is not possible because you have unmerged files.
* hint: Fix them up in the work tree, and then use 'git add/rm <file>'
* hint: as appropriate to mark resolution and make a commit.
* fatal: Exiting because of an unresolved conflict.

> 解决办法
* 回退版本


* 测试版本控制一
* 测试版本控制二