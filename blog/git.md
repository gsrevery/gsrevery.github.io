# git的使用说明

### 修改git 提交的用户名和用户Email命令
> 首先查看全局配置：
> git config  --list 
> git config --local --list  

### 修改全局
* 如果你要修改当前全局的用户名和邮箱时，需要在上面的两条命令中添加一个参数，--global，代表的是全局。

> 命令是
> git config  --global user.name 你的目标用户名；
> git config  --global user.email 你的目标邮箱名;

### 修改当前的project
> git 修改当前的project的用户名的命令为：git config user.name 你的目标用户名;
> git 修改当前的project提交邮箱的命令为：git config user.email 你的目标邮箱名;
