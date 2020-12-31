函数就是工具，具有封装性，是一个可重复使用的功能代码段

对象就是工具包，包含属性和方法。像document，window就是对象，架构师就是写对象的。js就是面对对象

框架就是多个工具包

二

---instanceof判断实例是否属于某个对象   eg:apple instanceof Product

---属性的取值器和设置器 get set  

```
Object.defineProperty(this,"price"{

​		get:function(){return price*0.9},//打0.9折

​		set:function(value){

}
});//这是ECMAScript 5新增特性
```

设置属性的访问权限  :

 configurable:

1.可否被删除

2.他的属性值可否被批改.

3.可否把属性设置成接见器属性，默认是true，可以删除，批改，设置

eumerable:可否被for-in轮回到
 writable:默示属性值可否被批改
 value:属性值.  

---私有属性，只能在对象构造函数内部使用

   var className = "用户对象";

公有属性,在对象实例化后调用

   this.**name** = name;

初始化函数的引用

```
var that=this;

var bindDOM=function(){name=that.name};//私有

var bindEvent=function(){};//私有

this.init=function(){bindDOM();bindEven();};
```

init就有点类似接口 ,只需要如何使用，不用了解代码的写法，为代码加密

注意：在私有函数中调用this，是没有用的.

---定义一个config对象保存当前对象的临时变量，这样其他所有成员都可以访问

–统一管理

–方便内存回收

–减少代码重复性

---数据类型检测的重要性 

1.数值型（Number）：包括整数、浮点数。2.布尔型（Boolean）3.字符串型（String）4.对象（Object）5.数组（Array）6.空值(Null)7.未定义（Undefined）

 使用 typeof 运算符时采用引用类型存储值会出现一个问题，

 无论引用的是什么类型的对象，它都返回 "object"。  

console.log(typeof {})//object

console.log(typeof [])//object

解决：object.prototype.tostring.call([])//[object Array]

​			object.prototype.tostring.call({})//[object object]

三

----

----对象如何在内存中存储：在内存中会开辟两段区域，一片区域存储变量名称（地址），一片是存储实例的值。

实例化的过程其实就是**拷贝**构造函数属性和方法的过程

除了拷贝以外还会自动生成一个constructor属性（隐藏属性），用于识别实例  是根据哪个构造函数创建的实例。

----var str=’1‘；//隐藏了 var str = new String(),str是构造函数string的实例，str.length是str的方法

----原型对象prototype，作用是**共享**属性和方法，减少内存

实例化的时候只拷贝构造函数中的属性，而不会拷贝原型对象中的属性，实例通过指针访问原型属性

属性搜索机制：现在自身的属性列表中寻找，如果找到直接返回，如果找不到从原型中寻找（通过prototype属性保存的地址链接原型）

任何一个编写的函数其实都是Function对象，既然对象是函数实现的，那么对象当然也是Function的一个实例，所以构造函数含有Function对象中的一切属性和方法。document就是Function的实例（对象）。constructor和prototype属性就是Function对象中的属性

不同的实例（实例地址不同）使用**同一块内存区域**的原型属性

----属性屏蔽机制

属性搜索机制,先搜索实例，若有，则屏蔽原型属性

| name1(实例)             | prototype(原型) |
| ----------------------- | --------------- |
|                         |                 |
| _proto_（指向原型地址） | name2           |

访问原型中被屏蔽的属性有两种方法

delete product.name(删除实例name属性)

使用  	实例名.prototype.属性/方法

----

四

----引用类型和值类型

1.值类型

```
var value;//这个时候不进行内存分配

var value1=1；//分配内存

var value2=value1；//分配内存
```

同理字符串

2.引用类型

```
var arr1={'1','2'};//数组

var arr2=arr1;//这里不分配内存，引用的是arr1的地址指向同一区域内存（和C类似）
```

同理函数，同理多个实例指向同一个原型

----绑定函数

```
artTemplate:function (str,data){    
var render = template.compile(str);    
return render(data)}
```

```
formateString:function(str, data){    
return str.replace(/@\((\w+)\)/g, function(match, key){        return typeof data[key] === "undefined" ? '' : data[key]});}
```

字符串拼接：

```
this.dom.html($$.artTemplate(str,this.data)).appendTo(this.config.jqueryContainer)//拼接{{}}
this.dom.html($$.FormateString(str,this.data)).appendTo(this.config.jqueryContainer)//拼接@(data)
```

------

五

----堆和栈

内存分为堆，栈

栈：值类型保存在栈里面，类似一个数组。

如何获取：数组加下标值

堆：引用类型

```
var  p=new Product()//p:栈，p存储的是地址  对象的属性：堆，存储p地址指向的数据
```

内存：栈系统分配，堆人为分配

内存泄漏是指分配的内存既不能使用，又不能回收，从而使应用崩溃

----原型里的值类型不共享，引用类型共享。

----拷贝

```
boy={name:'zs',age:'18'}
function extend(target,source){
for(var i in source ){target[i]=source[i]}
return target;
}//target目标对象
var kaobei=extend({},boy);
```

----1.内置对象：string,Data,Math,Array,RegExp,Number,Object,Function,Null,

Boolean,Error，cookie，Session

2BOM对象：

Window，Document，History，location，Screen，Navigator

3自定义对象

BOM对象：

```
window.open('http://www.baidu.com','newwindow','height=500,width=500,top=100,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')//新开一个窗口，窗口长500，宽500，位置100，100，没有工具栏，菜单栏，导航栏，状态栏
```

任何定义的全局变量 函数 对象都会成为window对象的属性

document其实就是window对象的属性

```
var name="属性";

var fn=function(){};

window.name;window.fb();
```

location:1url属性（统一资源定位符）：协议，端口，域名，路径，

window.location=''

location.reload(true)从服务器重载当前页面

location.reload(false)和location.reload()从浏览器缓存中重载当前页面

window.onload()当页面DOM加载完成执行

history.back/forward()，history.go(-1)

六

----try{}catch(e){//如果try中的代码错误，则执行catch中的代码}

e就是error对象，包含属性有：1.description错误描述2.message错误信息3.name错误类型

----Function对象的实例

函数都是Fuction对象的**实例/对象**，函数包含Function中属性和方法

而对象都是函数实现的 (js都是面向对象实现的)，对象也包含Fuction的属性和方法，Array.length。函数中默认this指向window

----Fuction对象的属性和方法

属性：arguments,length,constructor,prototype,apply,call,Bind,toString

1.call：除了借用其他对象方法，还能更改人家的方法的this指向，**将伪数组该为真数组**（伪数组就是一个包含length属性点json对象）

```
var json={1:'苹果'，2：'香蕉'，3：'菠萝'，length:3}

Array.prototype.slice.call(json);//["苹果"，”香蕉“，”菠萝“]
```

伪数组：key都是1，2，3，4，5....，含有length属性,伪数组每次都要计算length个数，自己去拼接对象。注意伪数组不能使用真数组的方法

arguments，getElementByTagName....都是伪数组,Jquery的框架就是伪数组实现的

fn1.call(fn2，参数，参数)，

```
 <input in="myText" value="123"/>

function fun1(){console.log(this.value);}//this指向input，默认this指向window

fun1.call(document.getElementById('myText'));
```

2.apply,与call的功能一模一样，但是只有一点不一样。

call的传参是平铺，apply是通过数组传参

```
fn1.方法.call(拷贝对象，参数1，参数2)

fn1.方法.call(拷贝对象，[参数1，参数2])
function getMax(arr){
return Math.max.apply(null,arr);//Math.max(2,3,6,11,23),只能接受离散值，不能接受数组.而apply可以接受数组传参
}
console.log(getMax([2,3,6,11,23]));
```

3.Callee是arguments的属性成员，它引用函数本身

4.Caller，返回某一个函数被谁调用了

----- 对象的原型链进阶--结合Function对象

属性搜索机制的底层就是通过_proto_属性链接起来的，所以_proto_才是面向对象的底层实现机制，是面向对象本质

Object对象是Function对象的实例，Object的_proto_属性指向Function对象的原型，Object是一代实例，内置对象是二代实例 

|    1    |    2    |    3    |    4    |
| :-----: | :-----: | :-----: | :-----: |
|         |         |         |         |
|         |         |         |         |
| _proto_ | _proto_ | _proto_ | _proto_ |

1.  var arr = [1,2,3]
2. Array.prototype
3. Function.prototype
4. Object.prototype = null

内置对象搜索机制——**链式搜索法则**：首先在构造对象中寻找属性（方法），若没有，则在该对象的_proto_指向的对象寻找，直到_proto_为null

 **总结**：所有函数都是Function的实例 ，Object，对象（内置对象，BOM对象，自定义对象。对象是函数实现的，所以它也是函数），普通函数都是一个函数，所以它们的_proto_指向Function.prototype。Object.prototype是一切链式循环的总终点，是一代，Function.prototype是二代

  七

----继承

继承：继承的本质就是通过__proto__指针指向某个对象，系统能够自动链式访问所指向的对象的属性方法。根据属性搜索机制，会一直搜索到null结束

![img](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png)  

把所有产品的公共元素放在base构造函数中，每个产品能继承base中的元素，同时也可以设置自己单独的属性和方法。

```
var product1 = function(){
base.call(this,arguments);
this.sizes=['X','XL','XXL'];
}
product1.prototype = new base();//将子类和父类链接在一起
//product1.prototype._proto_链接到new base的地址
product1.prototype.bindDOMDetail = function(){}
var cloth = new product1();
```

万物都继承Object，即通过原型链总能 找到Object

原型实现继承存在的问题：不能使用**子类**的参数传递给**父类**，只能使用'.'来赋值，product1.name=''；

----多态

