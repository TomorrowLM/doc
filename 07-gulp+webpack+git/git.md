## commit规范

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code (white-space, formatting, 			  missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
```

## git如何创建多个ssh

清除原有的设置（初次使用git请跳过此步骤）

如果之前对git设置过global信息，则需要先清除这些信息，通过如下指令：

查看Git所有配置

```
git config --list
```

删除全局配置项

```
git config --global --unset user.name
```

```
$ git config --global --unset user.name “username”
$ git config --global --unset user.email "email"
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

3.	配置config文件(id_rsa文件同级目录下)

```
#Host 它涵盖了下面一个段的配置，我们可以通过他来替代将要连接的服务器地址。
#HostName    真正连接的服务器地址
#User是本地ssh-agent与github服务器建立SSH连接时采用的用户名，IdentityFile是对应的私钥文件

#ssh -T User@Host

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
   git remote add origin User@Host:用户名/仓库名
   ```

5. 测试连接成功

   ```
   ssh -T User@Host
   ```

   

