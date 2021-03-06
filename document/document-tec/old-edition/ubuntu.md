# VPN:

## v2ray脚本安装

```
sudo apt install -y curl

bash <(curl -sL https://raw.githubusercontent.com/hijkpw/scripts/master/v2ray.sh)
```

![V2ray一键脚本安装菜单](https://v2xtls.org/wp-content/uploads/2020/11/V2ray一键脚本安装菜单.jpg)

目前V2ray一键脚本支持以下功能：

- **VMESS**，即最普通的V2ray服务器，没有伪装，也不是VLESS
- **VMESS**+TCP+TLS，带伪装的V2ray，不能过CDN中转
- **VMESS**+WS+TLS，即最通用的V2ray伪装方式，能过CDN中转，推荐使用
- **VLESS**+TCP+TLS，最通用的VLESS版本，不能过CDN中转，但比VMESS+TCP+TLS方式性能更好
- **VLESS**+WS+TLS，最通用V2ray伪装的VLESS脚本，能过CDN中转，推荐使用
- VLESS+TCP+XTLS，目前最强悍的VLESS+XTLS组合，强力推荐使用（但是客户端支持没那么好）



## v2ray本地压缩包安装

https://baipiao-rss.com/link/wgrQjOh989K0Me4d?sub=3

```
//https://github.com/v2ray/v2ray-core/releases下载v2ray-linux-64.zip
sudo bash go.sh --local ./v2ray-linux-64.zip
```

```
## 启动
systemctl start v2ray
service v2ray start

## 停止
systemctl stop v2ray

## 重启
systemctl restart v2ray

## 开机自启
systemctl enable v2ray

systemctl status v2ray.service 
```




测试v2ray是否配置ok

```
netstat -apn | grep v2ray

ss -ntlp | grep v2ray 命令可以查看v2ray是否正在运行

cc
```



```javascript
rm -rf /etc/v2ray/*  #(配置文件)
rm -rf /usr/bin/v2ray/*  #(程序)
rm -rf /var/log/v2ray/*  #(日志)
rm -rf /lib/systemd/system/v2ray.service  #(systemd 启动项)
rm -rf /etc/init.d/v2ray  #(sysv 启动项)
```

## 客户端qv2ray安装

官网：

https://qv2ray.net/getting-started/step2.html#%E4%B8%8B%E8%BD%BD-v2ray-%E6%A0%B8%E5%BF%83%E6%96%87%E4%BB%B6

```
//安装Qv2ray
sudo snap install qv2ray
//升级
sudo snap refresh qv2ray
```

```
配置v2ray核心（客户端qv2ray安装时已经配置了，这只是作为参考，不需要配置）

1.在在主目录的.config目录下（显示隐藏文件）创建一个新目录,名称为qv2ray/vcore(如果qv2ray不存在就手动创建)
把v2ray-linux-64.zip压缩包直接解压缩到~/.config/qv2ray/vcore下

2.请确保这些文件直接存在于 vcore 目录中:
v2ray 或 v2ray.exe：核心可执行文件
v2ctl 或 v2ctl.exe：核心控制程序
geoip.dat：IP 规则数据库
geosite.dat：域名规则数据库

给v2ray和v2ctl可执行权限
`chmod +x v2ray v2ctl'

3.双击第1步下载的appimage文件,进入首选项->内核设置
核心可执行文件路径：将此设置为步骤3中的v2ray 可执行文件的完整路径。
V2ray 资源目录：将其设置为 步骤3中的geoip.dat 和 geosite.dat 所在的位置。

4.配置完成后，可以点击检查 V2Ray 核心设置按钮来验证你的 V2Ray 核心设置。 重复尝试，直到你通过了检查。
```

# 命令行翻墙

注意：终端关闭，翻墙结束

1. 命令（缺点：输入命令太长）

```
//qv2ray入站设置中查看地址和端口   127.0.0.1:1089
export all_proxy=socks5://127.0.0.1:1089
//
curl ip.sb
```

2. ​	脚本

```
//在.bashrc中添加
alias proxy="export all_proxy=socks5://127.0.0.1:1089"
alias unproxy="unset all_proxy"
//命令行执行
source .bashrc 
//执行翻墙
proxy
//结束
unproxy
```



# ubuntu的swap虚拟内存大小修改

https://linuxhandbook.com/increase-swap-ubuntu/   



# 命令

## **删除**

**1.非常有用的清理命令：                                                                                                                                      **

sudo apt-get autoclean        清理旧版本的软件缓存
sudo apt-get clean          清理所有软件缓存
sudo apt-get autoremove       删除系统不再使用的孤立软件
这三个命令主要清理升级缓存以及无用包的。

**2.清理opera firefox的缓存文件：**
ls ~/.opera/cache4
ls ~/.mozilla/firefox/*.default/Cache

**3.删除文件：**

```
sudo rm -rf  + 要删除的文件   进行删除
-r 表示向下递归
-f 表示强制删除，不作任何提示

rm -rf generated/*
```

## **权限**

```
$ sudo chmod +x /usr/local/bin/docker-compose
```

ls -al查看文件读写权限

## **软件**

### 安装指令

输入`dpkg --list` ,按下Enter键，终端输出以下内容，显示的是你电脑上安装的所有软件。 

```
//安装软件包
sudo dpkg -i  
//安装软件
 sudo apt-get install
 //安装源码包
 ./configure
make
sudo make install
//安装出错，修复依赖
sudo apt-get install -f

//卸载
sudo dpkg -r linuxqq 
sudo apt-get remove  linuxqq 
1）移除式卸载：apt-get remove softname1 softname2 …;（移除软件包，当包尾部有+时，意为安装）
2）清除式卸载 ：apt-get –purge remove softname1 softname2…;(同时清除配置)

//更新软件信息数据库
sudo apt-get update——更新源
sudo apt-get dist-upgrade 
apt-get upgrade ——更新已安装的包
//进行系统升级
apt-get dist-upgrade # ———升级系统

apt-get check #——-检查是否有损坏的依赖
```

### 1.截图软件flameshot

```
sudo apt-get install flameshot
```

**快捷键设置：**

设置——设备——键盘，拉到最下面，添加快捷键，“命令”输入“flameshot gui”



![在这里插入图片描述](https://img-blog.csdnimg.cn/20190710114019202.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmd5dWFua2wxMjM=,size_16,color_FFFFFF,t_70)

### 2.zsh（终端）

windows下好用的终端: consolez, [babun](https://github.com/babun/babun) +cmder,wsl

1.安装zsh
2.在根目录下的.zshrc文件中可以添加插件

```
plugins=(
	git
	z
	git-open
	zsh-autosuggestions
	zsh-syntax-highlighting
)
```

终端执行 source .zshrc，加载扩展。

```
//以下是当source .zshrc执行时，一些扩展没有添加，从而命令行执行
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

git clone https://github.com/paulirish/git-open.git $ZSH_CUSTOM/plugins/git-open
```

```

//切换zsh终端
chsh -s /bin/zsh

echo $SHELL
```

```
//安装zsh后nvm、npm失效
安装zsh后原来安装的nvm及npm都失效了
查看原来的配置nvm的信息还在

解决方法：
在 ~/.zshrc 中再次添加原nvm在 ~/.bashrc 中的配置(搜索export可找到nvm配置)，并 source ~/.zshrc 即可
```

3.将命令行翻墙脚本放在.zshrc文件中

```
alias proxy="export all_proxy=socks5://127.0.0.1:1089"
alias unproxy="unset all_proxy"
```

### 3.dingding

- https://github.com/nashaofu/dingtalk

### 4.压缩和解压

**rar**

压缩功能

```shell
sudo apt-get install rar
```

解压功能

```shell
sudo apt-get install unrar
```

使用

1. 可以直接在UI界面使用了
2. `rar x test.rar`

**.tar**

解包：tar xvf FileName.tar

打包：tar cvf FileName.tar DirName

**.gz**

解压1：gunzip FileName.gz

解压2：gzip -d FileName.gz

压缩：gzip FileName

**.tar.gz 和 .tgz**

解压：tar zxvf FileName.tar.gz

压缩：tar zcvf FileName.tar.gz DirName

**.zip**

解压：unzip FileName.zip

压缩：zip FileName.zip DirName

### 5.snap

https://snapcraft.io/install/qv2ray/ubuntu#install

### 6.Synaptic Package Manager 

是基于APT的图形化包管理工具，它不仅能列出ubuntu系统中所有已经安装的程序，还可以用于安装、卸载、升级软件。系统默认没有此工具，因此需要先通过命令行来安装它。
1、运行命令行
2、sudo apt update
3、sudo apt install synaptic
4、运行Synaptic

## **ps进程指令**

linux上进程有5种状态:

1. 运行(正在运行或在运行队列中等待)

2. 中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)

3. 不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)

4. 僵死(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)

5. 停止(进程收到SIGSTOP, SIGSTP, SIGTIN, SIGTOU信号后停止运行运行)

1）ps a      显示现行终端机下的所有程序，包括其他用户的程序。

2）ps -A    显示所有程序。

3）ps u     以用户为主的格式来显示程序状况。

4）ps x 　 显示所有程序，不以终端机来区分。

```
ps aux
//查看username下的进程
ps  -u username
//查看程序的PID
pgrep 程序名
//结束进程
kill -9 PID # PID是进程号,查看进程时会显示
//结束某个程序
pkill  程序名
```

Ubuntu中找到并杀死僵尸进程:

```
//status
D 无法中断的休眠状态（通常 IO 的进程）；
R 正在运行可中在队列中可过行的；
S 处于休眠状态；
T 停止或被追踪；
W 进入内存交换 （从内核2.6开始无效）；
X 死掉的进程  （基本很少見）；
Z 僵尸进程；

ps aux | grep 'Z' 来找到僵尸进程
//pstree树状显示进程信息
pstree -p -s PID来寻找编号为PID进程也就是僵尸进程的父级进程。
```

## **删除多余内核**

**1，首先要使用这个命令查看当前Ubuntu系统使用的内核**

```
uname -a
```

**2，再查看所有内核**

```
dpkg --get-selections|grep linux 
```

**3，最后小心翼翼地删除吧**

```
sudo apt-get remove linux-image-2.6.32-22-generic
```

##  文件

``` 
创建目录mkdir
创建文件touch
查询绝对路径pwd
将文件1复制到文件2或者某个路径中       cp 文件1 	文件2/路径 
移动文件  mv 
重命名   mv 文件1	文件2

删除 rm -rf generated/*
```

```
ls     
ll(文件详细信息)
```

```
 du -sh *  	查看文件列表和大小
--------
217M	@tarojs
5.0M	autocannon
 58M	cnpm
 53M	commitizen
  0B	cw-tool
 65M	elasticdump
```



## vim

```
vim 文件

1.插入模式：i

2.正常模式:esc
复制一行/N行			yy /Nyy
粘贴			p
剪切一行/N行			dd/Ndd
撤销		u

3.命令模式：shift+：
```

# nvm

https://blog.csdn.net/henryhu712/article/details/85217165

https://blog.csdn.net/geol200709/article/details/82117103

cd ~/ - -切到主目录
git clone https://github.com/creationix/nvm.git .nvm - -克隆代码到文件夹 .nvm
cd ~/.nvm - -进入nvm代码目录
git checkout v0.33.11 - -切换到v0.33.11版本

执行以下命令

```javascript
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

或者

```js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

查看可供安装的版本

```
nvm ls-remote
```

安装一个nodejs版本

```
nvm install v12.16.1
```

查看本地安装的版本

```
nvm ls
```



# magento

注意：项目运行时，不开VPN

## docker加载环境

1. git拉取alpine-dnmp到本地

   https://github.com/pointline/alpine-dnmp
   
2. 安装docker-compose

3. 启动

   ```
   sudo docker-compose up -d
   ```

   停止

   ```
   sudo docker-compose down
   ```

   重启

   ```
   sudo docker-compose restart
   
   ```

docker-compose start 容器名
   ```

   查看容器状态
   
   ```
sudo docker container ls -a
   ```
   
   

## magento部署

   ```
mv m234/    ~/git/alpine-dnmp/www/
docker container ls -a
//进入msql容器
docker exec -it mysql bash
//密码123456
mysql -ruroot -p
create database m234_local character set utf8;
exit
//配置虚拟主机
cd web-conf/
cp example.conf m234-local.conf

server {
   listen 80;
   server_name m234.local;
   set $MAGE_ROOT /var/www/html/m234;
   include /var/www/html/m234/nginx.conf.sample;
}
//测试虚拟主机配置正确
docker exec -it nginx sh
nginx -t
nginx -s reload
//配置主机hosts
 vim /etc/hosts
 127.0.0.1   m234.local

```



## 安装magneto

- Step 1: Readiness Check

  加载扩展Extension

  ![image-20201125103732490](/home/silk/.config/Typora/typora-user-images/image-20201125103732490.png)

- Step 2: Add a Database

  创建一个magento数据库（密码123456）

  ![image-20201125103814383](/home/silk/.config/Typora/typora-user-images/image-20201125103814383.png)

- Step 3: Web Configuration

  ![image-20201125103905073](/home/silk/.config/Typora/typora-user-images/image-20201125103905073.png)

- Step 3: Customize Your Store
- Step 4: Create Admin Account
- Step 5: install

## 如何恢复一个已有的magento项目

- 前提

- - 有源码
  - 有备份的数据库文件

- 先将备份的数据库文件先恢复到本地数据库中

- 登录到mysql

  - mysql -uroot -p

  - 创建数据库

  - create database 数据库名 character set utf8;

  - 打开数据库

  - use 数据库名

  - 导入数据库

    source 数据库文件绝对路径

    docker环境下，一般是将文件放在/alpine-dnmp/share-files中，导入的绝对路径是/ var/www/share-files/sql

  - 修改字段内容

  - ga,pk,kny


```
// TODO:
docker-compose exec mysql bash

//查询需要修改所有的 url
select * from core_config_data
select * from core_config_data where path like '%url%';

//执行命令，将域名修改为我们本地创建的虚拟域名
update core_config_data set value = 'http://infinixmo.mez100.cn/' where path = 'web/unsecure/base_url';
update core_config_data set value = 'http://infinixmo.mez100.cn/' where path = 'web/secure/base_url';
update core_config_data set value = 'http://infinixmo.local/pub/media/' where path = 'web/unsecure/base_media_url';
update core_config_data set value = 'http://infinixmo.local/pub/media/' where path = 'web/secure/base_media_url';
update core_config_data set value = 'http://infinixmo.local/pub/media/' where path = 'web/unsecure/base_media_url';
update core_config_data set value = 'http://infinixmo.local/pub/media/' where path = 'web/secure/base_media_url';


//查询需要修改所有的base url
select * from core_config_data where value LIKE '%http://infinixmo.mez100.cn:8035/%';

update core_config_data set value = 'http://infinixpk.mez100.cn/' where value = 'http://infinixpk.mez100.cn:8035/';
update core_config_data set value = 'http://infinixpk.mez100.cn/static/' where value = 'http://infinixpk.mez100.cn:8035/static/';
```

- 注意查看导入过程有无报错，如果无报错那说明数据库导入成功

- 将源码通过git克隆到本地

- - 先通过nginx或apache建立虚拟主机
  - 配置系统hosts(注意修改了docker中的文件，都要重启一下docker环境)
  - 修改源代码配置文件，路径项目根目录app/etc/env.php（没有可以从其他magento项目中可拷贝），在文件中找到以下有备注的部分做修改

```
    'db' => [
        'table_prefix' => '',
        'connection' => [
            'default' => [
                // 修改数据库hosts
                'host' => 'localhost',
                // 修改创建的数据库名
                'dbname' => 'm234_local',
                // 数据库用户名
                'username' => 'root',
                // 数据库密码，没有则留空
                'password' => '',
                'model' => 'mysql4',
                'engine' => 'innodb',
                'initStatements' => 'SET NAMES utf8;',
                'active' => '1',
                'driver_options' => [
                    1014 => false
                ]
            ]
        ]
    ],
    
    'redis' =>
    array (
        'connection' =>
            array (
                'default' =>
                    array (
                        'host' => 'redis',
                        'port' => 6379,
                        'username' => 'root',
                        'password' => '',
                        'timeout' => '',
                        'persistent' => '',
                        'key_prefix' => 'ng_coupon_active_'
                    ),
            ),
    ),
```

- 在项目根目录下做一些，模块编译命令操作

  docker环境下，要进入docker的php容器中才能执行下面的命令

```
  //在php7.1中执行(可在core/conf/nginx/conf/conf.d/global.conf中选择php版本)
  docker exec -it php71 sh
  ```

  ```
  // 1.编译模块文件(可能会报缺失文件，可以在其他项目中拷贝)
  php bin/magento setup:upgrade && php bin/magento setup:di:compile

  // 2.编译静态资源文件
  php bin/magento setup:static-content:deploy -f

  // 3.清楚缓存
  php bin/magento c:c
  ```

- 给文件权限

  ```
  sudo chmod -R 777  项目文件目录
  ```

- 做完以上操作后，通过浏览器访问该项目

### 创建admin账号

  ```
php bin/magento admin:user:create --admin-firstname=li --admin-lastname=ming --admin-email=tom.li@example.com --admin-user=tom.li --admin-password=123456tom
```



## 恢复项目问题解决

### 1.如何查看问题

- 项目目录下的/var/log/system.log中查看

- 配置问题

  项目根目录下的/pub/index.php,浏览器显示123，则配置是正确的

  ![](/home/silk/.config/Typora/typora-user-images/image-20201210151856495.png)

### 2遇到的问题

- `docker-compose ps`查看是否环境都已经启动

```
  docker-compose start 容器名
  ```

- 权限问题

  ```
  sudo chmod -R 777  项目文件目录
  ```

- 普遍上，删除在项目根目录下的

  ```
generated下的文件
  pub/static/frontend下的文件
var下的文件
  ```

  执行命令

  ```
  // 1.编译模块文件(可能会报缺失文件，可以在其他项目中拷贝)
  php bin/magento setup:upgrade && php bin/magento setup:di:compile

  // 2.编译静态资源文件
  php bin/magento setup:static-content:deploy -f

  // 3.清楚缓存
  php bin/magento c:c
  ```

- Notice: Undefined index: redis

  项目根目录app/etc/env.php中的db下添加

  ```
   'redis' =>
      array (
          'connection' =>
              array (
                  'default' =>
                      array (
                          'host' => 'redis',
                          'port' => 6379,
                          'username' => 'root',
                          'password' => '',
                          'timeout' => '',
                          'persistent' => '',
                          'key_prefix' => 'ng_coupon_active_'
                      ),
              ),
      ),
  ```


## 项目运行和提交流程

### 项目运行

- 检测docker环境是否开启（一般是开启的）

- 进入php71环境，检测是否安装全局下的gulp-cli

  ```
  npm list -g --depth 0
  ```

- 进入指定的项目路径，`npm i`下载node_modules包

- 修改文件

  - login登陆时:

    - 将项目根目录下的bbs/config/config_ucenter.php文件中

  ```
      define('UC_APPID', '23'); 改为
      define('UC_APPID', '17');
      
      账号xptest07@xparksilk.com
      密码12345678
      ```

- 执行`gulp`命令，查看gulp相关命令信息

- 编译 infinix_new_en

  ```
  gulp serve -t infinix_new_en
  ```

### 提交流程

- git status -s

  发现有很多不需要的map文件

- sudo rm -rf app/design/frontend

- git status -s

  出现我们修改的内容，注意config.php不能add

  ![image-20201204152240365](/home/silk/.config/Typora/typora-user-images/image-20201204152240365.png)

- git checkout -- app/design/frontend/

- 编译生产环境gulp -t infinix_new_en  -p和gulp -t infinix_en_mb -p

- 提交修改的文件

  ![image-20201204152354244](/home/silk/.config/Typora/typora-user-images/image-20201204152354244.png)

- 提交编译后的文件

  ![image-20201204152422949](/home/silk/.config/Typora/typora-user-images/image-20201204152422949.png)

- git push到指定的分支

