

# git

## git如何创建多个ssh

### 1.清除原有的设置（初次使用git请跳过此步骤）

如果之前对git设置过global信息，则需要先清除这些信息，通过如下指令：

查看Git所有配置

```
git config --list
```

查看当前用户（**local**）配置

```
git config --local  --list
或者
cat .git/config
```

查看`user.name`

```
git config user.name
```

查看`user.email`

```
git config user.email
```

**删除**全局配置项

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
Host git.lab
HostName gitlab.com
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_lab

# github
Host git.hub
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

git commit  -am， add和commit的合并，便捷写法

git commit --amend  尝试重新提交(漏掉了几个文件没有添加，或者**提交信息commit message**写错)

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

### 分支的操作

分支规范https://zhuanlan.zhihu.com/p/108385922

```
git checkout -b dev 或者git switch -c dev    创建并切换该分支
git branch dev 								创建分支
git branch -d dev							删除分支
git branch -D dev							强行删除一个没有合并的分支    
git checkout master							切换分支
                                                                                                  
git pull orgin 分支名						拉取并合并分支
pull= fetch + merge
git rebase 分支							合并分支
git push orgin dev 						 传分支到dev上
git branch -vv                           查看关联关系

git checkout -b dev origin/dev	        直接拉取远程的分支，创建为本地的分支

如果您想要为此分支创建跟踪信息，您可以执行：
git branch --set-upstream-to=origin/<分支> master

git branch					查看本地分支
git branch -r			   查看远程分支
git branch -a 			  查看所有分支（包括远程分支和本地分支）
git branch -a | grep paynicorn2-repay-notice 查询指定分支(本地和远程的)
```

### 远程的操作

```
远程分支的移除
 git remote rm paul				
 git push origin --delete main
 
 //https://blog.csdn.net/wangqingpei557/article/details/53147086
删除本地分支，git branch -a,还是可以看到远程的分支
git remote prune origin 
 
 pb 重命名为 paul
 git remote rename pb paul       
 
将本地的分支推送远程上
git push --set-upstream origin wangxiao
```

### 查看信息系列

<img src="https://img2018.cnblogs.com/blog/333765/202001/333765-20200111163049190-252688967.png" alt="img" style="zoom: 67%;" />

```
git status 					  查看文件状态（是否被add或者commit）
使用 git status -s 命令或 git status –short 命令，你将得到一种更为紧凑的格式输出

git diff 						 						显示工作区和的暂存区差异
git diff HEAD									显示工作区与当前分支最新commit之间的差异
git diff --cached 							  显示暂存区和上一个commit的差异
git diff branch-1 branch-2 	[filename]						  比较两个分支(filename)的不同
git diff commit1..commit2  												查看两个 commit 的对比
git ls-files																				查看暂存区的文件
git diff origin/branchname..branchname 				  查看远程分支和本地分支的对比

git log							查看提交日志，每一次提交都有对应的 commit id 和 commit message(看不出来被删除的commitid)
									  可以加上参数  --pretty=oneline，只会显示版本号和提交时的备注信息
git log  -p					  用来显示每次提交的内容差异									  
git reflog					  记录操作记录(包括已经被删除的 commit 记录和 reset 的操作)

git remote -v				查看关联的远程仓库url
cat .git/HEAD			   查看当前 HEAD 指向
```

### 回退系列

```
git reset --hard HEAD^					      回退到上一个版本
git reset --hard HEAD~1					    回退到上一个版本
git reset --hard id(前6位就行)	        回退到指定版本

git checkout .										   清空工作区改动
git checkout -- 文件名 					  

当你开始修改一个文件后，还没有执行 git add命令前(此时还在工作区）,想撤销对这个文件的改动，可以使用git checkout -- 文件名 
一旦你使用了 git add命令将文件添加到暂存区，此时不想改这个文件了，需要用git reset HEAD filename(git reset HEAD .)把文件移会到工作区，再使用第一步的git checkout -- 文件名 撤销工作区改动
```

### 文件的操作

```
git rm 文件名									删除文件，若误删，可以使用git checkout -- 文件名 
rm -rf  `git status | grep app/code`
cut 文件名										 获取文件内容
```

### git stash

```
git stash	将当前修改的内容存储
git stash apply		恢复不删除
git satsh pop		恢复并删除
git stash list
git stash apply stash@{}
```

### git rebase 

https://www.cnblogs.com/tian874540961/p/12172900.html

https://blog.csdn.net/hudashi/article/details/7664631/

https://www.cnblogs.com/hujunzheng/p/9732936.html

<img src="https://qboshi.oss-cn-hangzhou.aliyuncs.com/pic/086ccdee-4f40-4a8c-99c8-886bc672f0d8.jpg" alt="img" style="zoom:50%;" />

当我开发完D后，准备push到远端master时，git会进行检查：**远端master的最新节点是否是节点D的基点，即检查远端master的基点是否是节点C**，如果是，则可以直接push，如果不是，也就是上图的情况：在你push之前远端master已经被他人提交了E和F节点，这时可以执行`git pull -r`

<img src="https://qboshi.oss-cn-hangzhou.aliyuncs.com/pic/88729b51-5f43-42a5-bd69-9c39f863ab92.jpg" alt="img" style="zoom:50%;" />

git会以F节点作为新的基点，与D节点的代码进行融合，如果此时出现**冲突**，那么你就会被移到临时解冲突的分支，需要人工解冲突，解完后执行`git add -A`保存操作，再执行`git rebase --continue`继续后续操作，你可能会遗漏某一处冲突，这个完全不同担心，`git rebase --continue`会帮你检查是否解决完成，如果没有完成则不会让你回到正常分支。

<img src="https://qboshi.oss-cn-hangzhou.aliyuncs.com/pic/beb6433f-49e8-4b42-b821-32a7350f2cc7.jpg" alt="img" style="zoom:50%;" />

此时我再执行`git push`，就可以顺利将D节点提交到远端master上去了：

<img src="https://qboshi.oss-cn-hangzhou.aliyuncs.com/pic/469b4e16-c88d-4f71-9dde-c7eb432b7a78.jpg" alt="img" style="zoom:50%;" />

这同理本地基于master分支创建dev分支，master拉取远程代码后(其他人push了代码到远程master)，本地的master领先与dev分支，所以需要rebase，不然会污染了 commit 记录

```
git rebase --edit-todo
git rebase —abort 都可以用 --abort 参数来终止 rebase 的行动，并且分支会回到 rebase 开始前的状态。
```

- #### **危险操作**

  你的同事也在 相同分支 上开发，那么当他 pull 远程 master 的时候，就会有丢失提交纪录。
  
- 合并多个提交

  ```
  git rebase -i HEAD~2
  将第二行的 pick 改为 s “s” 为 “squash” 的缩写
  ```

## Tips

- git忽略文件权限的改变
  git config core.filemode false
  
- 本次提交被远程仓库拒绝了，因为当前分支无法与远程仓库对应起来。远程仓库对应分支默认有个指针指向最新提交到仓库的 commit ，而所有的本地仓库的分支都可以看做是从这个 commit 分散开来的。也就是本地分支的最后一次 push 到仓库的 commit 一定与仓库对应分支的最新一次 commit 是相同的，否则就无法对接。也就是会出现上面的错误提示。如果是正常 push 到仓库，正确的完成 commit 更新，那么这次更新就是一个 `fast-forward` 更新,而如果不理会错误警告用本地更新强制覆盖仓库，就是一次 `no-fast-forward` 更新，很明显，**`no-fast-forward` 更新会导致记录丢失**。
  
  ![image-20201217103256376](/home/silk/.config/Typora/typora-user-images/image-20201217103256376.png)

- git 换行符LF与CRLF转换问题https://blog.csdn.net/qq_22978533/article/details/78145935

  在各操作系统下，文本文件所使用的换行符是不一样的。UNIX/Linux/ Mac OS使用的是 LF，但 DOS/Windows 一直使用 CRLF作为换行符。Git提供了一个“换行符自动转换”功能。这个功能默认处于“自动模式”，当你在签出文件时，它试图将 UNIX 换行符（LF）替换为 Windows 的换行符（CRLF）；当你在提交文件时，它又试图将 CRLF 替换为 LF。Git 的“换行符自动转换”功能听起来似乎很智能、很贴心，因为它试图一方面保持仓库内文件的一致性（UNIX 风格），一方面又保证本地文件的兼容性（Windows 风格）。但遗憾的是，这个功能是有 bug 的，而且在短期内都不太可能会修正。

  ```
  #提交时转换为LF，检出时不转换
  git config --global core.autocrlf input
  
  #提交检出均不转换
  git config --global core.autocrlf false
  SafeCRLF
  #拒绝提交包含混合换行符的文件
  git config --global core.safecrlf true
  
  #允许提交包含混合换行符的文件
  git config --global core.safecrlf false
  
  #提交包含混合换行符的文件时给出警告
  git config --global core.safecrlf warn
  
  ```


- 解决Git在添加ignore文件之前就提交了项目无法再过滤问题

  ```matlab
  首先为避免冲突需要先同步下远程仓库
  $ git pull
  在本地项目目录下删除缓存
  $ git rm -r --cached .
  新建.gitignore文件
  在项目的根目录下面新建.gitignore文件并添加相应的过滤规则
  
  再次add所有文件
  输入以下命令，再次将项目中所有文件添加到本地仓库缓存中
  $ git add .
  
  再次添加commit
  这次commit是为了说明添加ignore文件的。
  $ git commit -m "add ignore"
  最后提交到远程仓库即可
  $ git push
  ```

- fatal: 当前分支 master 没有对应的上游分支。
  为推送当前分支并建立与远程上游的跟踪，使用

      git push --set-upstream origin master

- 无法连接到仓库,尝试重新连接

  ```
  git remote rm origin删除远程origin
  git remote add origin git@git.hub.bundle:bibo72/bundleb2b-v3.0-storefront.git
  ```

# npm

查看当前项目安装过的依赖模块
npm list --depth 0

查看全局安装过的依赖模块
npm list -g --depth 0





