## http通识

计算机---计算机通信：

交流方式：http、ftp、smtp/pop

计算机上的应用程序如何找到另一台计算机上的相同的应用程序？

IP地址：唯一确定网络的一台电脑

端口：**确定电脑上的具体哪个应用程序**

域名：由于IP地址不方便记忆，所以给IP地址起了个别名---域名，也就是通过域名可以找到对应的IP地址

DNS：domain name system 域名系统，保存了域名和IP地址的对应关系



Ajax表示Asynchronous JavaScript and XML(异步JavaScript和XML)，使我们可以获取和显示新的内容而不必载入一个新的Web页面


## 原生Ajax

**1)	创建XMLHttpRequest**	

var xhr = new XMLHttpRequest()；标准浏览器

var xhr = new ActiveXObject('Microsoft.XMLHTTP')；IE老版本

**2)	准备发送	xhr.open('get',url,true)** 

参数1，请求方式，get获取数据，post提交数据

参数2，请求地址

参数3，同步异步标志位，true是异步

get请求，url要加参数，这样php才能接受到参数

eg:  '../01.php?username'+username+'&password'+password

encodeURI（）用来对中文参数进行编码，防止中文乱码

post请求，url只需要地址,不需要参数,参数在send中传递

**3)	执行发送动作**   

get请求 xhr.send(null)；

post请求 

xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded")//必须要请求头信息

var param='username'+username+'password'+password;

xhr.send(param);这里不需要encodeURI编码

**4.指定回调函数	浏览器调用**

```
xhr.onreadystatechange = function(){

if(xhr.readystate == 4)是否接收到数据{

​	if(xhr.status == 200)数据是否正常{

​			var data = xhr.responseXML;

}

}
```

**4）单线程+事件队列**

事件队列中的任务执行条件：1主线程已经空闲 2定时函数（延时时间达到），事件函数（特定时间被触发），ajax的回调函数（服务器端有数据响应）

## 跨域

1）jsonp的原理：html中通过动态创建一个script标签，通过它的src属性发送跨域请求，从服务器端响应的**数据格式是一个函数的调用**,函数名要一致。eg:$callback.'(username='.$uname.')'

html中的函数就是回调函数

var script = document.createElement('script');

var head = document.getElementByTagName('head')[0];

script.src='http::/1.html/1.php?callback=hello&username=123';

head.appendChild(script);

function hello(data){

console.log(data);

}

php

$cb = $_Get[$callback];

$uname = $_Get[$username];

echo $cb.'('.'{"username":"'$uname'"}'.')';

2)	jquery中的跨域

```
$.ajax({
jsonp: "cb",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback),php中$cb = $_GET['cb'];
jsonpCallback:"cq",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);)
success：function(data){}
})
原生
1配置
var param={jsonp:"cb",jsonpCallback:"cq",url:"baidu.com",
success:function(data){}};
ajax(param);//调用自定义的ajax
2创建带有src地址的script标签
3创建回调函数
window[jQuery1102016820125747472048_1450147653563] = function(data){
	success(["zhangsan", "lisi", "wangwu"])；
}
jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);//php返回的函数调用

```

## artTemplate

 动态网页是指前端页面当中的数据内容来源于后台数据库，前端的`html`代码会随着后台数据的变化而变化，是动态生成的。制作动态网页有两种方式，一种方式是在后台拿到前端的`html`模板，利用后台模板引擎（如`ejs`等）在后台完成数据与`html`模板的拼接，最后把拼接完成的完整`html`代码返回给前端。但是这种工作模式会逐步走向过时，因为它不符合前后端分离的趋势。而第二种方式则更加符合我们所提倡的前后端分离的概念，即后台只提供`json`数据，不做模板拼接的工作，前端通过`ajax`来向后台请求`json`数据，然后在前台利用前台模板引擎（如`artTemplate`等）完成数据与模板的拼接工作，从而生成完整的`html`代码。 

```
1书写模板
<script type="text/html" id="test">
    <h3><%= title %></h3>
    <ul>
        <% for(var i = 0; i < list.length; i++){ %>
            <li><%= list[i] %></li>
        <% } %>
    </ul>
</script>
2前台模板引擎完成模板拼接
//在前端定义一个json数据dictionary，实际上数据应该来自于ajax请求的后台数据。
var dictionary = {
                title : 'artTemplate-demo',
                list: ['apple','banana','pear','tomato']
            };
            var html = template('test',dictionary);
            document.getElementById('content').innerHTML = html;
```

为什么要使用artTemplate模板？不是有django模板吗？

**答：**为了实现动态加载，因为有时候不想刷新整个页面，只在局部增加内容，则需要使用 artTemplate 模板 与 ajax 配合了

## XMLHttpRequest

headers:一般头部放置验证参数等，例如cookie、token等

2、Query Params:常用是get方式请求，用于校验请求参数

3、Body Params：常用是post方式请求，用于校验请求参数

header("Content-Type:text/plain(html); charset=utf-8")//设置服务器响应的文件类型plain是纯文本则echo中的标签当作是文本显示

**XMLHttpRequest**

 XMLHttpRequest(XHR) 对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。 

 `XMLHttpRequest` 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 以外的协议（包括 file:// 和 FTP），尽管可能受到更多出于安全等原因的限制。 

​	 **1.  属性**

- **XMLHttpRequest.responseType**  表示服务器返回数据的类型，这个属性是可写的，在 open 之后，send 之前，告诉服务器返回指定类型的数据。如果 responseType 设为空字符串，就等同于默认值 text 表示服务器返回文本数据； 

- **XMLHttpRequest.onreadystatechange**当 `readyState` 属性发生变化时，调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

-  **readyState** HTTP 请求的状态，当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4。 

-  **status**   由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 “Not Found” 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。 

-  **response**   该属性只读表示服务器返回的数据体，可能是任意的数据类型，比如字符串，对象，二进制对象等，具体类型由responseType 属性决定。如果本次请求没有成功或者数据不完整，该属性等于 null 

  **2.方法**

| abort()                 | 取消当前响应，关闭连接并且结束任何未决的网络活动             |
| ----------------------- | ------------------------------------------------------------ |
| getAllResponseHeaders() | 把 HTTP 响应头部作为未解析的字符串返回                       |
| getResponseHeader()     | 返回指定的 HTTP 响应头部的值                                 |
| open()                  | 初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求 |
| send()                  | 发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体 |
| setRequestHeader()      | 向一个打开但未发送的请求设置或添加一个 HTTP 请求             |

## webSocket

（1）实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端；
（2）实时数据交互。
// Create WebSocket connection.
var socket = new WebSocket('ws://localhost:8080');    //创建一个webSocket实例

// Connection opened
socket.addEventListener('open', function (event) {   //一旦服务端响应WebSocket连接请求，就会触发open事件
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {  //当消息被接受会触发消息事件
    console.log('Message from server', event.data);
});
（1）send
通过WebSocket连接向服务器发送数据。

一旦在服务端和客户端建立了全双工的双向连接，可以使用send方法去发送消息，当连接是open的时候send()方法传送数据，当连接关闭或获取不到的时候回抛出异常。
（2）close
关闭WebSocket连接或停止正在进行的连接请求。如果连接的状态已经是closed，这个方法不会有任何效果。

使用close方法来关闭连接，如果连接以及关闭，这方法将什么也不做。调用close方法只后，将不能发送数据。close方法可以传入两个可选的参数，code（numerical）和reason（string）,以告诉服务端为什么终止连接。

## 浏览器Request Header和Response Header

HTTP最常见的请求头如下：

​    **Accept**：浏览器可接受的MIME类型 (客户端能接收的资源类型)  ；

​    Accept-Charset：浏览器可接受的字符集；

   Accept-Encoding: gzip, deflate(客户端能接收的压缩数据的类型)  

   Accept-Language：浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到；

   Authorization：授权信息,用于表示HTTP协议中需要认证资源的认证信息 ,通常出现在对服务器发送的WWW-Authenticate头的应答中；

   Cache-Control:用来指定当前的请求/回复中的，是否使用缓存机制。

   Connection：表示是否需要持久连接。如果Servlet看到这里的值为“Keep-Alive”，或者看到请求使用的是HTTP 1.1（HTTP 1.1默认进行持久连接），它就可以利用持久连接的优点，当页面包含多个元素时（例如Applet，图片），显著地减少下载所需要的时间。要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入ByteArrayOutputStream，然后在正式写出内容之前计算它的大小；

   Content-Length：表示请求消息正文的长度；

   Cookie：这是最重要的请求头信息之一；

   From：请求发送者的email地址，由一些特殊的Web客户程序使用，浏览器不会用到它；

   Host：初始URL中的主机和端口；

   If-Modified-Since：只有当所请求的内容在指定的日期之后又经过修改才返回它，否则返回304“Not Modified”应答；

  Origin：发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个Access-Control-Allow-Origin的消息头，表示访问控制所允许的来源）。

   Pragma：指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝；

   Referer：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。

   User-Agent：浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用；

   UA-Pixels，UA-Color，UA-OS，UA-CPU：由某些版本的IE浏览器所发送的非标准的请求头，表示屏幕大小、颜色深度、操作系统和CPU类型。



2)响应(服务端->客户端[response])
  HTTP/1.1(响应采用的协议和版本号) 200(状态码) OK(描述信息)
  Location: http://www.baidu.com(服务端需要客户端访问的页面路径) 
  Server:apache tomcat(服务端的Web服务端名)
  Content-Encoding: gzip(服务端能够发送压缩编码类型) 
  Content-Length: 80(服务端发送的压缩数据的长度) 
  Content-Language: zh-cn(服务端发送的语言类型) 
  Content-Type: text/html; charset=GB2312(服务端发送的类型及采用的编码方式)
  Last-Modified: Tue, 11 Jul 2000 18:23:51 GMT(服务端对该资源最后修改的时间)
  Refresh: 1;url=http://www.it315.org(服务端要求客户端1秒钟后，刷新，然后访问指定的页面	路径)
  Content-Disposition: attachment; filename=aaa.zip(服务端要求客户端以下载文件的方式打    开该文件) 
  Transfer-Encoding: chunked(分块传递数据到客户端）  
  Set-Cookie:SS=Q0=5Lb_nQ; path=/search(服务端发送到客户端的暂存数据)
  Expires: -1//3种(服务端禁止客户端缓存页面数据)
  Cache-Control: no-cache(服务端禁止客户端缓存页面数据)  
  Pragma: no-cache(服务端禁止客户端缓存页面数据)  
  Connection: close(1.0)/(1.1)Keep-Alive(维护客户端和服务端的连接关系)                                                        Date: Tue, 11 Jul 2000 18:23:51 GMT(服务端响应客户端的时间)

**在服务器响应客户端的时候，带上Access-Control-Allow-Origin头信息，是解决跨域的一种方法。**





## php

### json和xml

JSON协议事实上已经作为一种前端与服务器端的数据交换格式，是一种国际标准。他不是语言，他只是一个规范，按照这种规范写法就能实现数据传递。

Xml只是描述数据的一种结构，比如大家常用的html就是采用这种结构描述	

xml json区别  

•相同点：

–都是一种通用协议

–都可以用来描述数据

•不同点：

–JSON相对于XML来讲，数据的体积小，传递的速度更快些。

–xml专用带宽大，json占用带宽小

–json没有xml这么通用

–json可以和js对象互相转换，和js是天生的一对，因此广泛用于前端开发



```
json_decode( )    ---- json 转 php对象/数组
当第二个参数为true返回 array ,默认是false返回object。
json_encode( )    ---- 对象/数组 转 json
成功返回 json 编码的 string ,失败返回 false 。

JSON.stringify() 和 JSON.parse() 的区别
JSON.stringify() 从一个对象中解析出字符串
JSON.stringify({"a":"1","b":"2"})
结果是："{"a":"1","b":"2"}"
JSON.parse()从一个字符串中解析出JSON对象
JSON.parse('{"a":"1","b":"2"}');

```





1)	php变量命名规则：不可以以数字开头，对大小写敏感

php的字符串拼接用.

echo  ''单引号对于其中的变量当作普通的字符串来处理

echo ""双引号对于其中的变量会把变量解析为变量值

echo作用是向页面中输出字符串

2)	js中处理字符串单引号与双引号作用相同，只有json格式的数据必须使用双引号

var json = '{"username":"zhangsan","age":"12"}';	json是字符串

var obj = JSON.parse(json);	php转换成json对象

3)	php数组

$arr = array("hello","hi");

print_r($arr);	页面输出    Array([0]=>hello  [1]=>hi.....)

echo $arr[0];

$arr1 = array("username"=>"zhangsan","age"=>"12");

print_r($arr);	页面输出  Array([**username**]=>zhangsan  [**age**]=>12.....)	数组索引值转换成字符串  eg：arr[0]---arr[username]

echo $arr[username];

二维数组

$arr = array();

$arr[0] = array(1,2,3);

$arr[1] = array(4,5,6);

$arr[2] = array(7,8,9); 

4)json_encode将数组转化成JSON形式的字符串

$arr = array("a"=>"111","b"=>"222","c"=>"333");

$ ret = json_encode($arr);

echo $ret;  页面显示  {"a":"111",.....}



	