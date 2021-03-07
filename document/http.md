# http通识

- 应用层协议：http、ftp、smtp/pop


- 计算机上的应用程序如何找到另一台计算机上的相同的应用程序？

  IP地址：唯一确定网络的一台电脑

  端口：**确定电脑上的具体哪个应用程序**

  域名：由于IP地址不方便记忆，所以给IP地址起了个别名---域名，也就是通过域名可以找到对应的IP地址

  DNS：domain name system 域名系统，保存了域名和IP地址的对应关系


# 原生Ajax

**Ajax**表示Asynchronous JavaScript and XML(异步JavaScript和XML)，使我们可以获取数据并显示新的内容而不必载入一个新的Web页面

**1)	创建XMLHttpRequest**	

var xhr = new XMLHttpRequest()；标准浏览器

var xhr = new ActiveXObject('Microsoft.XMLHTTP')；IE老版本

**2)	准备发送	xhr.open(1，2，3)** 

```
参数1，请求方式，get获取数据，post提交数据
参数2，请求地址url
参数3，同步异步标志位，true是异步
```

- get请求，url要加参数，这样php才能接受到参数

  ```
  '/01.php?username'+username+'&password'+password
  ```

  `encodeURI（）`用来对中文参数进行编码，防止中文乱码

- post请求，url只需要地址,不需要参数,参数在send中传递


**3)	执行发送动作**   

- get请求 xhr.send(null)；


- post请求 

  xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded")**//必须要请求头信息**

  ​	在Form元素的语法中，EncType表明提交数据的格式

  ​	用 Enctype 属性指定将数据回发到服务器时浏览器使用的编码类型。

  - application/x-www-form-urlencoded ： 窗体数据被编码为名称/值对。这是标准的编码格式。（默认）
  - multipart/form-data ： 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。(type=file使用)
  - text/plain ： 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。

  var param='username'+username+'password'+password;

  xhr.send(param);这里不需要encodeURI编码

**4）指定回调函数	浏览器调用**

```js
xhr.onreadystatechange = function(){

if(xhr.readystate == 4)是否接收到数据{

​	if(xhr.status == 200)数据是否正常{

​			var data = xhr.responseXML;
}

}
```

# 跨域

## 原生

**jsonp的原理**：html中通过动态创建一个script标签，通过它的src属性发送跨域请求，从服务器端响应的**数据格式是一个函数的调用**,函数名要一致。eg:$callback.'(username='.$uname.')'

- html中的函数就是回调函数

  ```js
  var script = document.createElement('script');
  
  var head = document.getElementByTagName('head')[0];
  
  script.src='http::/1.html/1.php?callback=hello&username=123';
  
  head.appendChild(script);
  
  function hello(data){
  
  console.log(data);
  
  }
  ```

- php

  ```php
  $cb = $_Get[$callback];
  
  $uname = $_Get[$username];
  
  echo $cb.'('.'{"username":"'$uname'"}'.')';
  ```

## jquery中的跨域

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

# 表单FormDate对象

每一个控件都会生成一个键值对，所有的键值对都会提交到服务器。提交的数据格式跟`<form>`元素的`method`属性有关。只要键值不是 URL 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。

点击`submit`控件，就可以提交表单。

```
<form>
  <input type="submit" value="提交">
</form>
```

表单里面的`<button>`元素如果没有用`type`属性指定类型，那么默认就是`submit`控件。

```
<form>
  <button>提交</button>
</form>
```

除了点击`submit`控件提交表单，还可以用表单元素的`submit()`方法，通过脚本提交表单。

```
formElement.submit();
```

**表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成过程**

FormData 首先是一个构造函数，用来生成实例。

```
var formdata = new FormData(form);

// 获取某个控件的值
formData.get('username') // ""

// 设置某个控件的值
formData.set('username', '张三');

formData.get('username') // "张三"
```

## FormData 实例方法

- `FormData.get(key)`：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
- `FormData.getAll(key)`：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
- `FormData.set(key, value)`：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- `FormData.delete(key)`：删除一个键值对，参数为键名。
- `FormData.append(key, value)`：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- `FormData.has(key)`：返回一个布尔值，表示是否具有该键名的键值对。
- `FormData.keys()`：返回一个遍历器对象，用于`for...of`循环遍历所有的键名。
- `FormData.values()`：返回一个遍历器对象，用于`for...of`循环遍历所有的键值。
- `FormData.entries()`：返回一个遍历器对象，用于`for...of`循环遍历所有的键值对。如果直接用`for...of`循环遍历 FormData 实例，默认就会调用这个方法。

## 自动校验

表单提交的时候，浏览器允许开发者指定一些条件，它会自动验证各个表单控件的值是否符合条件。

```
<!-- 必填 -->
<input required>

<!-- 必须符合正则表达式 -->
<input pattern="banana|cherry">

<!-- 字符串长度必须为6个字符 -->
<input minlength="6" maxlength="6">

<!-- 数值必须在1到10之间 -->
<input type="number" min="1" max="10">

<!-- 必须填入 Email 地址 -->
<input type="email">

<!-- 必须填入 URL -->
<input type="URL">
```

如果一个控件通过验证，它就会匹配`:valid`的 CSS 伪类，浏览器会继续进行表单提交的流程。如果没有通过验证，该控件就会匹配`:invalid`的 CSS 伪类，浏览器会终止表单提交，并显示一个错误信息。

# XMLHttpRequest

**XMLHttpRequest**

 XMLHttpRequest(XHR) 对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。 

 `XMLHttpRequest` 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 以外的协议（包括 file:// 和 FTP），尽管可能受到更多出于安全等原因的限制。 

 **1.  属性**

- **XMLHttpRequest.responseType**  表示服务器返回数据的类型，这个属性是可写的，在 open 之后，send 之前，告诉服务器返回指定类型的数据。如果 responseType 设为空字符串，就等同于默认值 text 表示服务器返回文本数据； 
- **XMLHttpRequest.onreadystatechange**当 `readyState` 属性发生变化时，调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。
- **readyState** HTTP 请求的状态，当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4。 
- **status**   由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 “Not Found” 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。 
- **response**   该属性只读表示服务器返回的数据体，可能是任意的数据类型，比如字符串，对象，二进制对象等，具体类型由responseType 属性决定。如果本次请求没有成功或者数据不完整，该属性等于 null 

 **2.  方法**

| abort()                 | 取消当前响应，关闭连接并且结束任何未决的网络活动             |
| ----------------------- | ------------------------------------------------------------ |
| getAllResponseHeaders() | 把 HTTP 响应头部作为未解析的字符串返回                       |
| getResponseHeader()     | 返回指定的 HTTP 响应头部的值                                 |
| open()                  | 初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求 |
| send()                  | 发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体 |
| setRequestHeader()      | 向一个打开但未发送的请求设置或添加一个 HTTP 请求头           |

# Request Header和Response Header



![img](https://img2018.cnblogs.com/blog/1301998/201906/1301998-20190621104932351-2057147169.png)

## HTTP消息头

`HTTP消息头`是指，在超文本传输协议（ Hypertext Transfer Protocol ，HTTP）的请求和响应消息中，协议头部分的那些组件。HTTP消息头用来准确描述正在获取的资源、服务器或者客户端的行为，定义了HTTP事务中的具体操作参数。

2、Query Params:常用是**get**方式请求，query是指请求的参数，一般是指URL中？后面的参数

3、Body Params：常用是**post**方式请求，body是指请求体中的数据

## Request Header

**HTTP协议使用TCP协议进行传输，在应用层协议发起交互之前，首先是TCP的三次握手。完成了TCP三次握手后，客户端会向服务器发出一个请求报文**

**HTTP最常见的请求头如下：**

| 协议头              | 说明                                                         | 示例                                                         | 状态       |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| Accept              | 可接受的响应内容类型（`Content-Types`）。                    | `Accept: text/plain`                                         | 固定       |
| Accept-Charset      | 可接受的字符集                                               | `Accept-Charset: utf-8`                                      | 固定       |
| Accept-Encoding     | 可接受的响应内容的编码方式。                                 | `Accept-Encoding: gzip, deflate`                             | 固定       |
| Accept-Language     | 可接受的响应内容语言列表。                                   | `Accept-Language: en-US`                                     | 固定       |
| Accept-Datetime     | 可接受的按照时间来表示的响应内容版本                         | Accept-Datetime: Sat, 26 Dec 2015 17:30:00 GMT               | 临时       |
| Authorization       | 用于表示HTTP协议中需要认证资源的认证信息                     | Authorization: Basic OSdjJGRpbjpvcGVuIANlc2SdDE==            | 固定       |
| Cache-Control       | 用来指定当前的请求/回复中的，是否使用缓存机制。              | `Cache-Control: no-cache`              max-age：缓存无法返回缓存时间长于max-age规定秒的文档 | 固定       |
| Connection          | 客户端（浏览器）想要优先使用的连接类型                       | `Connection: keep-alive``Connection: Upgrade`                | 固定       |
| Cookie              | 由之前服务器通过`Set-Cookie`（见下文）设置的一个HTTP协议Cookie | `Cookie: $Version=1; Skin=new;`                              | 固定：标准 |
| Content-Length      | 以8进制表示的请求体的长度                                    | `Content-Length: 348`                                        | 固定       |
| Content-MD5         | 请求体的内容的二进制 MD5 散列值（数字签名），以 Base64 编码的结果 | Content-MD5: oD8dH2sgSW50ZWdyaIEd9D==                        | 废弃       |
| Content-Type        | 请求体的MIME类型 （用于POST和PUT请求中）                     | Content-Type: application/x-www-form-urlencoded              | 固定       |
| Date                | 发送该消息的日期和时间（以[RFC 7231](http://tools.ietf.org/html/rfc7231#section-7.1.1.1)中定义的"HTTP日期"格式来发送） | Date: Dec, 26 Dec 2015 17:30:00 GMT                          | 固定       |
| Expect              | 表示客户端要求服务器做出特定的行为                           | `Expect: 100-continue`                                       | 固定       |
| From                | 发起此请求的用户的邮件地址                                   | `From: user@itbilu.com`                                      | 固定       |
| Host                | 表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。 | `Host: www.itbilu.com:80``Host: www.itbilu.com`              | 固定       |
| If-Match            | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要用于像 PUT 这样的方法中，仅当从用户上次更新某个资源后，该资源未被修改的情况下，才更新该资源。 | If-Match: "9jd00cdj34pss9ejqiw39d82f20d0ikd"                 | 固定       |
| If-Modified-Since   | 把浏览器端缓存页面的最后修改时间发送到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行对比。如果时间一致，那么返回304，客户端就直接使用本地缓存文件。如果时间不一致，就会返回200和新的文件内容。客户端接到之后，会丢弃旧文件，把新文件缓存起来，并显示在浏览器中. | If-Modified-Since: Dec, 26 Dec 2015 17:30:00 GMT             | **固定**   |
| **If-None-Match**   | If-None-Match和ETag一起工作，工作原理是在HTTP Response中添加ETag信息。 当用户再次请求该资源时，将在HTTP Request 中加入If-None-Match信息(ETag的值)。如果服务器验证资源的ETag没有改变（该资源没有更新），将返回一个304状态告诉客户端使用本地缓存文件。否则将返回200状态和新的资源和Etag. 使用这样的机制将提高网站的性能 | If-None-Match: "9jd00cdj34pss9ejqiw39d82f20d0ikd"            | 固定       |
| If-Range            | 如果该实体未被修改过，则向返回所缺少的那一个或多个部分。否则，返回整个新的实体 | If-Range: "9jd00cdj34pss9ejqiw39d82f20d0ikd"                 | 固定       |
| If-Unmodified-Since | 仅当该实体自某个特定时间以来未被修改的情况下，才发送回应。   | If-Unmodified-Since: Dec, 26 Dec 2015 17:30:00 GMT           | 固定       |
| Max-Forwards        | 限制该消息可被代理及网关转发的次数。                         | `Max-Forwards: 10`                                           | 固定       |
| Origin              | 发起一个针对[跨域资源共享](http://itbilu.com/javascript/js/VkiXuUcC.html)的请求（该请求要求服务器在响应中加入一个`Access-Control-Allow-Origin`的消息头，表示访问控制所允许的来源）。 | `Origin: http://www.itbilu.com`                              | 固定: 标准 |
| Pragma              | 与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。 | `Pragma: no-cache`                                           | 固定       |
| Proxy-Authorization | 用于向代理进行认证的认证信息。                               | Proxy-Authorization: Basic IOoDZRgDOi0vcGVuIHNlNidJi2==      | 固定       |
| Range               | 表示请求某个实体的一部分，字节偏移以0开始。                  | `Range: bytes=500-999`                                       | 固定       |
| Referer             | 表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。`Referer`其实是`Referrer`这个单词，但RFC制作标准时给拼错了，后来也就将错就错使用`Referer`了。 | Referer: http://itbilu.com/nodejs                            | 固定       |
| TE                  | 浏览器预期接受的传输时的编码方式：可使用回应协议头`Transfer-Encoding`中的值（还可以使用"trailers"表示数据传输时的分块方式）用来表示浏览器希望在最后一个大小为0的块之后还接收到一些额外的字段。 | `TE: trailers,deflate`                                       | 固定       |
| User-Agent          | 浏览器的身份标识字符串                                       | `User-Agent: Mozilla/……`                                     | 固定       |
| Upgrade             | 要求服务器升级到一个高版本协议。                             | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11               | 固定       |
| Via                 | 告诉服务器，这个请求是由哪些代理发出的。                     | Via: 1.0 fred, 1.1 itbilu.com.com (Apache/1.1)               | 固定       |
| Warning             | 一个一般性的警告，表示在实体内容体中可能存在错误。           | Warning: 199 Miscellaneous warning                           | 固定       |

## Response Header

**响应报文**：**当收到get或post等方法发来的请求后，服务器就要对报文进行响应。**

| 响应头                      | 说明                                                         | 示例                                                         | 状态       |
| :-------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------- |
| Access-Control-Allow-Origin | 指定哪些网站可以`跨域源资源共享`                             | `Access-Control-Allow-Origin: *`                             | 临时       |
| Accept-Patch                | 指定服务器所支持的文档补丁格式                               | Accept-Patch: text/example;charset=utf-8                     | 固定       |
| Accept-Ranges               | 服务器所支持的内容范围                                       | `Accept-Ranges: bytes`                                       | 固定       |
| Age                         | 响应对象在代理缓存中存在的时间，以秒为单位                   | `Age: 12`                                                    | 固定       |
| Allow                       | 对于特定资源的有效动作;                                      | `Allow: GET, HEAD`                                           | 固定       |
| Cache-Control               | 通知从服务器到客户端内的所有缓存机制，表示它们是否可以缓存这个对象及缓存有效时间。其单位为秒 | `Cache-Control: max-age=3600`                                | 固定       |
| Connection                  | 针对该连接所预期的选项                                       | `Connection: close`                                          | 固定       |
| Content-Disposition         | 对已知MIME类型资源的描述，浏览器可以根据这个响应头决定是对返回资源的动作，如：将其下载或是打开。 | Content-Disposition: attachment; filename="fname.ext"        | 固定       |
| Content-Encoding            | 响应资源所使用的编码类型。                                   | `Content-Encoding: gzip`                                     | 固定       |
| Content-Language            | 响就内容所使用的语言                                         | `Content-Language: zh-cn`                                    | 固定       |
| Content-Length              | 响应消息体的长度，用8进制字节表示                            | `Content-Length: 348`                                        | 固定       |
| Content-Location            | 所返回的数据的一个候选位置                                   | `Content-Location: /index.htm`                               | 固定       |
| Content-MD5                 | 响应内容的二进制 MD5 散列值，以 Base64 方式编码              | Content-MD5: IDK0iSsgSW50ZWd0DiJUi==                         | 已淘汰     |
| Content-Range               | 如果是响应部分消息，表示属于完整消息的哪个部分               | Content-Range: bytes 21010-47021/47022                       | 固定       |
| Content-Type                | 当前内容的`MIME`类型                                         | Content-Type: text/html; charset=utf-8                       | 固定       |
| Date                        | 此条消息被发送时的日期和时间(以[RFC 7231](http://tools.ietf.org/html/rfc7231#section-7.1.1.1)中定义的"HTTP日期"格式来表示) | Date: Tue, 15 Nov 1994 08:12:31 GMT                          | 固定       |
| ETag                        | 对于某个资源的某个特定版本的一个标识符，通常是一个 消息散列  | ETag: "737060cd8c284d8af7ad3082f209582d"                     | 固定       |
| Expires                     | 指定一个日期/时间，超过该时间则认为此回应已经过期            | Expires: Thu, 01 Dec 1994 16:00:00 GMT                       | 固定: 标准 |
| Last-Modified               | 所请求的对象的最后修改日期(按照 RFC 7231 中定义的“超文本传输协议日期”格式来表示) | Last-Modified: Dec, 26 Dec 2015 17:30:00 GMT                 | 固定       |
| Link                        | 用来表示与另一个资源之间的类型关系，此类型关系是在[RFC 5988](https://tools.ietf.org/html/rfc5988)中定义 | `Link: `; rel="alternate"                                    | 固定       |
| Location                    | 用于在进行重定向，或在创建了某个新资源时使用。               | Location: http://www.itbilu.com/nodejs                       | 固定       |
| P3P                         | P3P策略相关设置                                              | P3P: CP="This is not a P3P policy!                           | 固定       |
| Pragma                      | 与具体的实现相关，这些响应头可能在请求/回应链中的不同时候产生不同的效果 | `Pragma: no-cache`                                           | 固定       |
| Proxy-Authenticate          | 要求在访问代理时提供身份认证信息。                           | `Proxy-Authenticate: Basic`                                  | 固定       |
| Public-Key-Pins             | 用于防止中间攻击，声明网站认证中传输层安全协议的证书散列值   | Public-Key-Pins: max-age=2592000; pin-sha256="……";           | 固定       |
| Refresh                     | 用于重定向，或者当一个新的资源被创建时。默认会在5秒后刷新重定向。 | Refresh: 5; url=http://itbilu.com                            |            |
| Retry-After                 | 如果某个实体临时不可用，那么此协议头用于告知客户端稍后重试。其值可以是一个特定的时间段(以秒为单位)或一个超文本传输协议日期。 | 示例1:Retry-After: 120示例2: Retry-After: Dec, 26 Dec 2015 17:30:00 GMT | 固定       |
| Server                      | 服务器的名称                                                 | `Server: nginx/1.6.3`                                        | 固定       |
| Set-Cookie                  | 设置`HTTP cookie`                                            | Set-Cookie: UserID=itbilu; Max-Age=3600; Version=1           | 固定: 标准 |
| Status                      | 通用网关接口的响应头字段，用来说明当前HTTP连接的响应状态。   | `Status: 200 OK`                                             |            |
| Trailer                     | `Trailer`用户说明传输中分块编码的编码信息                    | `Trailer: Max-Forwards`                                      | 固定       |
| Transfer-Encoding           | 用表示实体传输给用户的编码形式。包括：`chunked`、`compress`、 `deflate`、`gzip`、`identity`。 | Transfer-Encoding: chunked                                   | 固定       |
| Upgrade                     | 要求客户端升级到另一个高版本协议。                           | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11               | 固定       |
| Vary                        | 告知下游的代理服务器，应当如何对以后的请求协议头进行匹配，以决定是否可使用已缓存的响应内容而不是重新从原服务器请求新的内容。 | `Vary: *`                                                    | 固定       |
| Via                         | 告知代理服务器的客户端，当前响应是通过什么途径发送的。       | Via: 1.0 fred, 1.1 itbilu.com (nginx/1.6.3)                  | 固定       |
| Warning                     | 一般性警告，告知在实体内容体中可能存在错误。                 | Warning: 199 Miscellaneous warning                           | 固定       |
| WWW-Authenticate            | 表示在请求获取这个实体时应当使用的认证模式。                 | `WWW-Authenticate: Basic`                                    | 固定       |

**在服务器响应客户端的时候，带上Access-Control-Allow-Origin头信息，是解决跨域的一种方法。**

# HTTP状态码及其含义

- 1XX：信息状态码

  - `100 Continue` 继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息

- 2XX：成功状态码

  | 200  | OK                            | 请求成功。一般用于GET与POST请求                              |
  | ---- | ----------------------------- | ------------------------------------------------------------ |
  | 201  | Created                       | 已创建。成功请求并创建了新的资源                             |
  | 202  | Accepted                      | 已接受。已经接受请求，但未处理完成                           |
  | 203  | Non-Authoritative Information | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
  | 204  | No Content                    | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
  | 205  | Reset Content                 | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
  | 206  | Partial Content               | 部分内容。服务器成功处理了部分GET请求                        |

- 3XX：重定向

  | 300  | Multiple Choices   | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
  | ---- | ------------------ | ------------------------------------------------------------ |
  | 301  | Moved Permanently  | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
  | 302  | Found              | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
  | 303  | See Other          | 查看其它地址。与301类似。使用GET和POST请求查看               |
  | 304  | Not Modified       | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
  | 305  | Use Proxy          | 使用代理。所请求的资源必须通过代理访问                       |
  | 306  | Unused             | 已经被废弃的HTTP状态码                                       |
  | 307  | Temporary Redirect | 临时重定向。与302类似。使用GET请求重定向                     |

- 4XX：客户端错误

  | 400  | Bad Request      | 客户端请求的语法错误，服务器无法理解                         |
  | ---- | ---------------- | ------------------------------------------------------------ |
  | 401  | Unauthorized     | 请求要求用户的身份认证                                       |
  | 402  | Payment Required | 保留，将来使用                                               |
  | 403  | Forbidden        | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
  | 404  | Not Found        | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |

- 5XX:服务器错误

  | 500  | Internal Server Error      | 服务器内部错误，无法完成请求                                 |
  | ---- | -------------------------- | ------------------------------------------------------------ |
  | 501  | Not Implemented            | 服务器不支持请求的功能，无法完成请求                         |
  | 502  | Bad Gateway                | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
  | 503  | Service Unavailable        | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
  | 504  | Gateway Time-out           | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
  | 505  | HTTP Version not supported | 服务器不支持请求的HTTP协议的版本，无法完成处理               |



# manifest

使用 HTML5，通过创建 cache manifest 文件，可以轻松地创建 web 应用的离线版本。 

```
 <!DOCTYPE HTML>
<html manifest="demo.appcache">
...
</html> 
```

manifest 文件可分为三个部分：

- *CACHE MANIFEST* - 在此标题下列出的文件将在首次下载后进行缓存
- *NETWORK* - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
- *FALLBACK* - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

# artTemplate

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

# Web Worker

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

**Web Worker 有以下几个使用注意点。**

（1）**同源限制**

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以使用`navigator`对象和`location`对象。

（3）**全局对象限制**

Worker 的全局对象`WorkerGlobalScope`，不同于网页的全局对象`Window`，很多接口拿不到。比如，理论上 Worker 线程不能使用`console.log`，因为标准里面没有提到 Worker 的全局对象存在`console`接口，只定义了`Navigator`接口和`Location`接口。不过，浏览器实际上支持 Worker 线程使用`console.log`，保险的做法还是不使用这个方法。

（4）**通信联系**

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（5）**脚本限制**

Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（6）**文件限制**

Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。		

# webSocket

（1）实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端；
（2）实时数据交互。

```js
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
```

（1）send
通过WebSocket连接向服务器发送数据。

一旦在服务端和客户端建立了全双工的双向连接，可以使用send方法去发送消息，当连接是open的时候send()方法传送数据，当连接关闭或获取不到的时候回抛出异常。
（2）close
关闭WebSocket连接或停止正在进行的连接请求。如果连接的状态已经是closed，这个方法不会有任何效果。

使用close方法来关闭连接，如果连接以及关闭，这方法将什么也不做。调用close方法只后，将不能发送数据。close方法可以传入两个可选的参数，code（numerical）和reason（string）,以告诉服务端为什么终止连接。

# Token

 1、Token的引入：Token是在客户端频繁向服务端请求数据，服务端频繁的去数据库查询用户名和密码并进行对比，判断用户名和密码正确与否，并作出相应提示，在这样的背景下，Token便应运而生。

  2、Token的定义：Token是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个Token便将此Token返回给客户端，以后客户端只需带上这个Token前来请求数据即可，无需再次带上用户名和密码。

  3、使用Token的目的：Token的目的是为了减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮。

# php

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



​	