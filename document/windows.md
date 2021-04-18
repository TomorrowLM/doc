## Windows 字体 

https://sspai.com/post/35133

## 桌面

软媒桌面

TranslucentTB

~~rainmeter~~

## 录屏工具

LICEcap

## 截屏

snipaste

### 软件清除工具

 **Revo Uninstaller Pro** ， **Geek Uninstaller** 

https://www.52pojie.cn/thread-933876-1-1.html

## 终端

### babun

```js
vscode配置babun
"terminal.integrated.shell.windows": "C:\\Users\\YOURUSERNAME\\.babun\\cygwin\\bin\\zsh.exe",
```

- WARNING: UNPROTECTED PRIVATE KEY FILE!   

  tips:chmod 700 ~/.ssh/id_rsa  更改权限

### wsl

https://blog.csdn.net/weixin_42595232/article/details/106012575?spm=1001.2014.3001.5506

- 创建命令行数据文件夹

  ```
  mkdir "%USERPROFILE%\AppData\Local\terminal"
  对应我自己电脑的文件目录就是：
  C:\Users\niefajun\AppData\Local\terminal
  ```

- 下载鼠标右键显示icon， 存储到刚才创建的目录当中 

- 编写注册表文件

  ```
  Windows Registry Editor Version 5.00
  
  [HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
  @="Windows terminal here"
  "Icon"="C:\\Users\\niefajun\\AppData\\Local\\terminal\\terminal.ico"
  
  [HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
  @="C:\\Users\\niefajun\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"
  
  ```

  然后另存文件为：`wt.reg`，要保证格式正确。
  程序说明：

  1. 第一部分，说明是windows注册表
  2. 第二部分，是说明鼠标右键显示菜单缩略图的存储位置
  3. 第三部分，说明`Windows Terminate`的实际命令的存储位置

- 运行生效注册表文件

- 修改配置文件

  ```
  添加如下内容：
  "startingDirectory": "."
  ```

  ![01-10](https://img-blog.csdnimg.cn/20200509095325779.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjU5NTIzMg==,size_16,color_FFFFFF,t_70) 

#### tip

- 插件权限

  ```
  chmod 755  /root/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
  ```

  