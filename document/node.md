# node

## 结构

```js
var http = require("http");//require引包，引包就是引用一个功能模块
//创建服务器
var server = http.createServer(function(req,res){
    //req表示请求request，res表示响应response
    //发送一个响应头给请求。设置HTTP头部，状态码是200，文件类型是html，字符集是UTF-8
    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
    res.end("hello world"+(1+2+3));
});
//运送服务器,监听3000端口（端口可以任意改动）
server.listen(3000,"127.0.0.1")
```

## 路由选择

```js
//找到url:url=req.url;
//通过if判断选择哪个html文件
 if(url == "/test"){   
     fs.readFile(
     path.join(__dirname,'../code/test.html'),
     function(err,data){
            if(err){ throw err ;}
            response.end(data);
        })
    }
```

## API

- var url = require("url");获取地址栏的地址

   url.parse()可以将一个完整的URL地址，分为很多部分，常用的有：host、port、pathname、path、query 

```js
var pathname = url.parse(req.url).pathname;//获取路径
var query = url.parse(req.url,true).query;//true,是将url字符串转化成对象，获取参数
```

- var fs= require("fs");readfile读取文件，readdir读取文件或者文件夹

  ```js
  fs.readFile(path.join(__dirname,"../code/1.txt"),function(err,data){
   res.end(data);
   });
  ```

  ```js
  fs.readdir(path.join(__dirname,"../img"),function(err,files){
          //files是一个数组，表示img中所有东西，包括文件和文件夹
          for(var i = 0;i<files.length;i++){
              var filename = files[i];
              //stat检测状态.      fs.stat(path.join(__dirname,"../img/"+filename),function(err,stats){
             //检测是否是文件夹
            if(stats.isDirectory()){
               doc.push(filename);
  }});
  ```
  
  ```js
  //2.mkdir创建文件，rmdir删除文件，创建aaa文件夹					     fs.mkdir(path.join(__dirname,"../code/aaa"),function(err,data){});
  ```

## 文件上传

```js
var formidabel = require('formidable');//进行文件上传的功能模块

var sd = require('silly-datetime');//进行文件日期的功能模块
```



```js
var form = new formidabel.IncomingForm();//创建一个正在进行的表单
form.uploadDir = './uploads'//设置文件上传存放的地址
```

```js
//执行里面的回调函数时，表单已经接受完毕form.parse(req,function(err,fields,files){ 
//所有的文本域，单选框都在fields存放    
//所有的文件域，files   
//时间，使用silly-datetime模块    
var ttt = sd.format(new Date(),'YYYYMMDDHHmm');    
//随机数    var ran =parseInt(Math.random()*89999+10000);    
//拓展名    var extname = path.extname(files.tupian.name);    
//执行改名   
var oldpath = __dirname+"/"+files.tupian.path;    
var newpath = __dirname+"/uploads/"+ttt+ran+extname;    
//改名    
fs.rename(oldpath,newpath,function(){ 
if(err){  throw Error("改名失败");  }        
res.writeHead(200, {'content-type': 'text/html'});        res.write('<head><meta charset="utf-8"></head>');        res.end('成功');    })})
```

# express

## 安装

```js
//express
	cnpm i	express -g

//express-generator
	npm install express-generator -g

//生成项目文件
	express nodeproject
```

**目录结构**

```
/bin: 用于应用启动

/public: 静态资源目录

/routes：可以认为是controller（控制器）目录

/views: jade模板目录，可以认为是view(视图)目录

app.js 程序main文件
```

