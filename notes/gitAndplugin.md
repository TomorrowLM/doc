

# git

## git如何创建多个ssh

### 1.清除原有的设置（初次使用git请跳过此步骤）

如果之前对git设置过global信息，则需要先清除这些信息，通过如下指令：

查看Git所有配置

```
git config --list
```

查看当前用户（global）配置

```
git config --global  --list
```

查看当前仓库配置信息

```
git config --local  --list
```

查看user.name

```
git config user.name
```

查看user.email

```
git config user.email
```

删除全局配置项

```
git config --global --unset user.name
```

```
$ git config --global --unset user.name “username”
$ git config --global --unset user.email "email"
```

### 2.ssh配置

1. 配置用户信息	

```
cd ~/workspace/gitlab
git init
git config --local user.name ‘gitlab‘//local局部 global
git config --local user.email ‘gitlab@company.com‘
```

2.	生成ssh key

```
ssh-keygen -t rsa -C "email"
```

 当命令行出现 Enter file in which to save the key (~/.ssh/id_rsa):  

 它会提示你输入一个保存key的路径/文件名，默认创建文件名id_rsa（若有多个邮箱，则创建不同的文件名）

 在.ssh文件中找到创建的id_rsa_pub并复制里面的内容，在远程的设置的密钥（key）里面粘贴

3.	配置config文件(id_rsa文件同级目录下)

```
#Host 它涵盖了下面一个段的配置，我们可以通过他来替代将要连接的服务器地址。
#HostName    真正连接的服务器地址
#User是本地ssh-agent与github服务器建立SSH连接时采用的用户名，IdentityFile是对应的私钥文件


#ssh -T User@Host	判断连接是否成功

# gitlab
Host gitlab
HostName gitlab.com
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_lab

# github
Host github
HostName github.com
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

4. 本地仓库与远程仓库关联：

   ```
   git remote add origin(设置的远程库名) User@Host:用户名/仓库名
   
   或者直接 git clone 链接(一般是master上的分支)
   ```

5. 测试连接成功

   ```
   ssh -T User@Host
   ```
   
   
   
   
## git 指令

git init 初始化版本库（clone下来的不用初始化）

<img src="https://www.liaoxuefeng.com/files/attachments/919020037470528/0" alt="git-repo" style="zoom: 80%;" />

git add 文件名      						                 放入暂存区stage

git commit -m "提交的说明message"		放入分支里

git commit  -a  -m，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤

git commit --amend  尝试重新提交(漏掉了几个文件没有添加，或者提交信息写错)

**commit规范**

```
feat:     A new feature
fix:      	A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code (white-space, formatting, 			  missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
```

### 回退系列

```
git reset --hard HEAD^					      回退到上一个版本
git reset --hard HEAD~1					     回退到上一个版本
git reset --hard id(前6位就行)	        回退到指定版本

git checkout .										   清空工作区改动
git checkout -- 文件名 					  

当你开始修改一个文件后，还没有执行 git add命令前(此时还在工作区）,想撤销对这个文件的改动，可以使用git checkout -- filename
一旦你使用了 git add命令将文件添加到暂存区，此时不想改这个文件了，需要用git reset HEAD filename(git reset HEAD .)把文件移会到工作区，再使用第一步的git checkout -- filenmae(git checkout .)撤销改动
```



### 文件的操作

```
git rm 文件名									删除文件，若误删，可以使用git checkout -- 文件名 
rm -rf  `git status | grep app/code`

cut 文件名										 获取文件内容
```

### 远程的操作

```
远程仓库的移除与重命名
 git remote rm paul				
 git push origin --delete main
 git remote rename pb paul       pb 重命名为 paul


git push --set-upstream origin wangxiao
将本地的分支推送远程上

```



### 分支的操作

```
git checkout -b dev 或者git switch -c dev    创建并切换该分支
git branch dev 												           创建分支
git checkout master									            切换分支
git branch -d dev											        删除分支
git branch -D dev										           强行删除一个没有合并的分支                                                                                                      
git pull orgin 分支名									           拉取并合并分支
pull= fetch + merge
git rebase 分支														合并分支
git push orgin dev 										         上传分支到dev上

git checkout -b paynicorn2-repay-notice origin/paynicorn2-repay-notice	直接拉取远程的分支，创建为本地的分支
git push																	直接上传到远程的paynicorn2-repay-notice

```

### 查看信息系列

```
git status 					  查看文件状态（是否被add或者commit）
使用 git status -s 命令或 git status –short 命令，你将得到一种更为紧凑的格式输出

git diff 						 						 查看修改
git diff –cached 							  若要查看已暂存的将要添加到下次提交里的内容
git diff –staged
git diff branch-1 branch-2 			比较两个分支的不同

git log							查看提交日志，每一次提交都有对应的 commit id 和 commit message(看不出来被										  删除的commitid)
									  可以加上参数  --pretty=oneline，只会显示版本号和提交时的备注信息
git log  -p					 用来显示每次提交的内容差异									  

git reflog					  记录操作记录(包括已经被删除的 commit 记录和 reset 的操作)

git branch					查看本地分支

git branch -r				查看远程分支

git branch -a | grep paynicorn2-repay-notice 查询远程的指定分支 -> 输出：remotes/origin/paynicorn2-repay-notice

git remote -v				查看关联的远程仓库url



```

### git stash

```
git stash	将当前修改的内容存储
git stash apply		恢复不删除
git satsh pop		恢复并删除
git stash list
git stash apply stash@{}
```



## Tips

- git忽略文件权限的改变
  git config core.filemode false



# npm

查看当前项目安装过的依赖模块
npm list --depth 0

查看全局安装过的依赖模块
npm list -g --depth 0



