

## 什么是 JavaScript 语言？

 JavaScript 是一种轻量级的脚本语言。所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。 

 JavaScript 也是一种嵌入式（embedded）语言。它本身提供的核心语法不算很多，只能用来做一些数学和逻辑运算。  相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。 

JavaScript 的核心语法部分相当精简，只包括两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如`Array`、`Date`、`Math`等）。除此之外，各种宿主环境提供额外的 API（即只能在该环境使用的接口），以便 JavaScript 调用。以浏览器为例，它提供的额外 API 可以分成三大类。

- 浏览器控制类：操作浏览器
- DOM 类：操作网页的各种元素
- Web 类：实现互联网的各种功能

#### 使用领域

 **（1）浏览器的平台化**  

随着 HTML5 的出现，浏览器本身的功能越来越强，不再仅仅能浏览网页，而是越来越像一个平台，JavaScript 因此得以调用许多系统功能，比如操作本地文件、操作图片、调用摄像头和麦克风等等。 

 **（2）Node** 

 Node 项目使得 JavaScript 可以用于开发服务器端的大型项目，网站的前后端都用 JavaScript 开发已经成为了现实。 

 **（3）数据库操作** 

 **（4）移动平台开发** 

 **（5）内嵌脚本语言** 

 **（6）跨平台的桌面应用程序** 

#### 强大的性能

**（1）灵活的语法，表达力强。**

JavaScript 既支持类似 C 语言清晰的过程式编程，也支持灵活的函数式编程，可以用来写并发处理（concurrent）。这些语法特性已经被证明非常强大，可以用于许多场合，尤其适用异步编程。

**（2）支持编译运行。**

JavaScript 语言本身，虽然是一种解释型语言，但是在现代浏览器中，JavaScript 都是编译后运行。程序会被高度优化，运行效率接近二进制程序。而且，JavaScript 引擎正在快速发展，性能将越来越好。

**（3）事件驱动和非阻塞式设计。**

JavaScript 程序可以采用事件驱动（event-driven）和非阻塞式（non-blocking）设计，在服务器端适合高并发环境，普通的硬件就可以承受很大的访问量。

## JavaScript 的基本语法

#### 1.语句

 表达式是由运算符构成，并运算产生结果的语法结构。每个表达式都会产生一个值,它可以放在任何需要一个值的地方,比如,作为一个函数调用的参数：

 语句则是由“；（分号）”分隔的句子或命令。如果在表达式后面加上一个“；”分隔符，这就被称为“表达式语句”

#### 2.变量



```
var a = 1;
```

上面的代码先声明变量`a`，然后在变量`a`与数值1之间建立引用关系，称为将数值1“赋值”给变量`a`。以后，引用变量名`a`就会得到数值1。最前面的`var`，是变量声明命令。它表示通知解释引擎，要创建一个变量`a`。

```
var a = 1;
a = 'hello';
```

JavaScript 是一种动态类型语言，也就是说，变量的类型没有限制，**变量可以随时更改类型**。

**变量的命名规则和规范**

由字母、数字、下划线_、$符号组成，不能以数字开头，遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。例如：userName、userPassword

#### **3if 结构**

```
if (布尔值) 语句;

if (布尔值) {语句;}
```

函数中为什么用if(){return..}比if...else**要好**

|                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| function_1()<br/>{<br/>if(a==b)<br/>{<br/>代码段1;<br/>}<br/>else<br/>{<br/>代码段2;<br/>}<br/> | function_2()<br/>{<br/>if(a!=b)<br/>{<br/>代码段2;<br/>return ...;<br/>}<br/>代码段1;<br/>} |

return返回null，起到中断方法执行的效果，只要不return false事件处理函数将会继续执行，表单将提交

return false，事件处理函数会取消事件，不再继续向下执行。比如表单将终止提交。 

#### **4switch 结构**

多个`if...else`连在一起使用的时候，可以转为使用更方便的`switch`结构。

```
switch (fruit) {
  case "banana":
    // ...
    break;
  case "apple":
    // ...
    break;
  default:
    // ...
}
```

上面代码根据变量`fruit`的值，选择执行相应的`case`。如果所有`case`都不符合，则执行最后的`default`部分。需要注意的是，每个`case`代码块内部的`break`语句不能少，否则会接下去执行下一个`case`代码块，而不是跳出`switch`结构。

#### 5break 语句和 continue 语句

`break`语句和`continue`语句都具有跳转作用，可以让代码不按既有的顺序执行。

`break`语句用于跳出代码块或循环。

```
var i = 0;

while(i < 100) {
  console.log('i 当前为：' + i);
  i++;
  if (i === 10) break;
}
```



## 数据类型概述

- 数值（number）：整数和小数（比如`1`和`3.14`）

- 字符串（string）：文本（比如`Hello World`）。

- 布尔值（boolean）：表示真伪的两个特殊值，即`true`（真）和`false`（假）

- `undefined`：表示一个声明了没有赋值的变量，变量只声明的时候值默认是undefined。

- `null`：表示空值，即此处的值为空。

- 对象（object）：各种值组成的集合。（typeof Array/null -->object）

  可以分成三个子类型。

  - 狭义的对象（object）
  - 数组（array）
  - 函数（function）

**JavaScript 有三种方法，可以确定一个值到底是什么类型。**

- `typeof`运算符
- `instanceof`运算符
- `Object.prototype.toString`方法

```
typeof null // "object"
```

`null`的类型是`object`，这是由于历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑`null`，只把它当作`object`的一种特殊值。后来`null`独立出来，作为一种单独的数据类型，为了兼容以前的代码，`typeof null`返回`object`就没法改变了。

```
Number(null) // 0
Number(undefined) // NaN
```

 **`null`是一个表示“空”的对象，转为数值时为`0`**；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。 

**布尔类型的隐式转换**：

转换为true  	 非空字符串  非0数字  true 任何对象
转换成false  	空字符串  0  false  null  undefined NaN

#### 1.数值

```javascript
1 === 1.0 // true	JavaScript 语言的底层根本没有整数，所有数字都是小数
0.1 + 0.2 === 0.3// false     浮点数不是精确的值
0.3 / 0.1// 2.9999999999999996
(0.3 - 0.2) === (0.2 - 0.1)// false

//正零和负零
-0 === +0 // true
0 === -0 // true
0 === +0 // true
(-0).toString() // '0'
(+0).toString() // '0'
(1 / +0) === (1 / -0) // false

//NaN是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。
5 - 'x' // NaN
0 / 0 // NaN
typeof NaN // 'number'
NaN === NaN // false
//isNaN方法可以用来判断一个值是否为NaN。isNaN只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true

//Infinity表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity。
1 / 0 // Infinity
//Infinity有正负之分，Infinity表示正的无穷，-Infinity表示负的无穷。
Infinity === -Infinity // false
1 / -0 // -Infinity
-1 / -0 // Infinity
//isFinite方法返回一个布尔值，表示某个值是否为正常的数值。
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```

 **转换成数值类型：**

1.Number()可以把任意值转换成数值，如果要转换的字符串中有一个不是数值的字符，返回NaN 2.parseInt()  字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。                                                                                                                                    

```
parseInt('8a') // 8
//如果字符串头部有空格，空格会被自动去除
parseInt('   81') // 81
parseInt('+1') // 1
parseInt('abc') // NaN
```

3.parseFloat()    

**进制转化**

 `parseInt`方法还可以接受第二个参数（2到36之间），表示被解析的值的进制 

```
parseInt('1000', 2) // 二进制的1000，等于十进制的8
```

#### **2.字符串**

单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号。

```
'key = "value"'
"It's a long journey"
如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义。双引号字符串内部使用双引号，也是如此。
```

如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。

```
var longString = 'Long \
long \
long \
string';

longString
// "Long long long string"
```

连接运算符（`+`）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。

```
var longString = 'Long '
  + 'long '
  + 'long '
  + 'string';
```

**字符串可以被视为字符数组**，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）。 但是，字符串与数组的相似性仅此而已。 

```
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"
```

##### 字符集

JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。

JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成`\uxxxx`的形式，其中`xxxx`代表该字符的 Unicode 码点。

我们还需要知道，每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。 码点在`U+0000`到`U+FFFF`之间的字符 

#### **3.对象**

 对象就是一组“键值对”（key-value）的集合 

对象的所有键名都是**字符串**（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以。  键名（ 符合标识名的条件 ）是数值，会被自动转为字符串。 

 对象采用大括号表示，这导致了一个问题：如果**行首是一个大括号**，它到底是表达式还是语句？ 

```
{ foo: 123 }
{ console.log(123) } // 123
//为了避免这种歧义，JavaScript 引擎的做法是，如果遇到这种情况，无法确定是对象还是代码块，一律解释为代码块。

({ foo: 123 }) // 正确
({ console.log(123) }) // 报错
如果要解释为对象，最好在大括号前加上圆括号。因为圆括号的里面，只能是表达式，所以确保大括号只能解释为对象。
```

读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符， **方括号运算符内部还可以使用表达式** 。  数字键可以不加引号，因为会自动转成字符串。 

```
var p1='p'
var obj = {
  p: 'Hello World'
};
obj.p // "Hello World"
obj[p1] //"Hello World"
obj['p'] // "Hello World"

//注意，数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。
var obj = {
  123: 'hello world'
};
obj.123 // 报错
obj[123] // "hello world"
```

##### **属性的查看Object.keys**

```
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

##### **属性的删除**

 `delete`命令用于删除对象的属性，删除成功后返回`true`。 

 删除一个不存在的属性，`delete`不报错，而且返回`true`。 

 只有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。 

```
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```

 `delete`命令只能删除对象本身的属性，无法删除继承的属性 

```
var obj = {};
delete obj.toString // true
obj.toString // function toString() { [native code] }
```

##### **属性是否存在：in 运算符**

```
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

 `in`运算符的一个问题是，**它不能识别哪些属性是对象自身的，哪些属性是继承的。** 
 可以使用对象的`hasOwnProperty`方法判断一下，是否为对象自身的属性。 

```
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

##### 属性的遍历：for...in 循环

`for...in`循环用来遍历一个对象的全部属性。

```
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
```

##### with 语句( 建议不要使用`with`语句 )**

 它的作用是操作同一个对象的多个属性时，提供一些书写的方便。 

```
// 例一
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;
```

 注意，如果`with`区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。 

```
var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}

obj.p1 // undefined
p1 // 4
```

#### 4.函数

```
函数是一种数据类型	
函数的定义：
//1.function 命令
function 函数名() {
// 函数体
}
//2.函数表达式,将一个匿名函数赋值给变量
var fn = function () {
// 函数体
}
//3.Function 构造函数
var add = new Function(
  'x',
  'y',
  'return x + y'
);
```

 JavaScript 引擎遇到`return`语句，就直接返回`return`后面的那个表达式的值，后面即使还有语句，也不会得到执行。 

##### 函数的属性和方法

1.函数的`name`属性返回函数的名字。 

2.函数的`length`属性返回函数预期传入的参数个数，即函数定义之中的参数个数。 

3.函数的`toString()`方法返回一个字符串，内容是函数的源码。 

##### 函数本身的作用域

```
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```

上面代码中，函数`x`是在函数`f`的外部声明的，所以它的作用域绑定外层，内部变量`a`不会到函数`f`体内取值，所以输出`1`，而不是`2`。

同样的，函数体内部声明的函数，作用域绑定函数体内部。

```
function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f() // 1
```

上面代码中，函数`foo`内部声明了一个函数`bar`，`bar`的作用域绑定`foo`。当我们在`foo`外部取出`bar`执行时，变量`x`指向的是`foo`内部的`x`，而不是`foo`外部的`x`。正是这种机制，构成了下文要讲解的“**闭包**”现象。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。 

##### 参数的省略

函数参数不是必需的，JavaScript 允许省略参数。 无论提供多少个参数（或者不提供参数），JavaScript 都不会报错。 

```
function f(a, b) {
  return a;
}

f(1, 2, 3) // 1
f(1) // 1
f() // undefined

f.length // 2
```

##### arguments 对象

**（1）定义**

由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是`arguments`对象的由来。

```
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
  //正常模式下，arguments对象可以在运行时修改。
  arguments[0] = 3;
}

f(1, 2, 3)
// 1
// 2
// 3

```

 **（2）与数组的关系** 

 虽然`arguments`很像数组，但它是一个对象 

将`arguments`转为真正的数组。下面是两种常用的转换方法：`slice`方法和逐一填入新数组。

```
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

**（3）callee 属性**

`arguments`对象带有一个`callee`属性，返回它所对应的原函数。

##### 立即调用的函数表达式

函数定义后立即调用的解决方法，就是不要让`function`出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

```
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
```

##### eval 命令

`eval`命令接受一个字符串作为参数，并将这个字符串当作语句执行。

```
eval('var a = 1;');
a // 1
```

`eval`没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。 

为了防止这种风险，JavaScript 规定，如果使用严格模式，`eval`内部声明的变量，不会影响到外部作用域。 

```
(function f() {
  'use strict';
  eval('var foo = 123');
  console.log(foo);  // ReferenceError: foo is not defined
})()
```

不过，即使在严格模式下，`eval`依然可以读写当前作用域的变量。

```
(function f() {
  'use strict';
  var foo = 1;
  eval('foo = 2');
  console.log(foo);  // 2
})()
```

 常情况下，`eval`最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的`JSON.parse`方法。 

#### 5.数组

数组也可以先定义后赋值。

```
var arr = [];

arr[0] = 'a';
arr[1] = 'b';
arr[2] = 'c';
```

 任何类型的数据，都可以放入数组 

##### 数组的本质

本质上，数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。

```
typeof [1, 2, 3] // "object"
```

```
var arr = ['a', 'b', 'c'];

Object.keys(arr)
// ["0", "1", "2"]
arr['0'] // 'a'
arr[0] // 'a'

var a = [];

a[1.00] = 6;
a[1] // 6
```

```
var a = [1, , 1];
a.length // 3
```

##### 数组的空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。

```
var a = [1, , 1];
a.length // 3
```

使用`delete`命令删除一个数组成员，会形成空位，并且不会影响`length`属性。

```
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

 如果是空位，使用数组的`forEach`方法、`for...in`结构、以及`Object.keys`方法进行遍历，空位都会被跳过。 

```
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
```

## 运算符

优先级从高到底

1. ()  优先级最高
2. 一元运算符  ++   --   !
3. 算数运算符  先*  /  %   后 +   -
4. 关系运算符  >   >=   <   <=
5. 相等运算符   ==   !=    ===    !==
6. 逻辑运算符 先&&   后||
7. 赋值运算符

### 算术运算符

- **加法运算符**：`x + y`
- **减法运算符**： `x - y`
- **乘法运算符**： `x * y`
- **除法运算符**：`x / y`
- **指数运算符**：`x ** y`
- **余数运算符**：`x % y`
- **自增运算符**：`++x` 或者 `x++`
- **自减运算符**：`--x` 或者 `x--`
- **数值运算符**： `+x`
- **负数值运算符**：`-x`

#### 加法

JavaScript 允许非数值的相加。

```
true + true // 2
1 + true // 2
'a' + 'bc' // "abc"
1 + 'a' // "1a"
false + 'a' // "falsea"
```

#### 指数运算符

指数运算符（`**`）完成指数运算，前一个运算子是底数，后一个运算子是指数。

```
2 ** 4 // 16
```

### 比较运算符

###### 非相等运算符：字符串的比较

JavaScript 引擎内部首先比较首字符的 Unicode 码点。如果相等，再比较第二个字符的 Unicode 码点，以此类推。

```
'cat' > 'dog' // false
'cat' > 'catalog' // false
```

###### 非相等运算符：非字符串的比较

**（1）原始类型值**

如果两个运算子都是原始类型的值，则是先转成数值再比较。

```
5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0

2 > true // true
// 等同于 2 > Number(true)
// 即 2 > 1
```

**（2）对象**

如果运算子是对象，会转为原始类型的值，再进行比较。

对象转换成原始类型的值,算法是先调用`valueOf`方法；如果返回的还是对象，再接着调用`toString`方法

```
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 '1' > '11'


{ x: 2 } >= { x: 1 } // true
// 等同于 { x: 2 }.valueOf().toString() >= { x: 1 }.valueOf().toString()
// 即 '[object Object]' >= '[object Object]'

```

###### 严格相等运算符

JavaScript 提供两种相等运算符：`==`和`===`。

简单说，它们的区别是相等运算符（`==`）比较两个值是否相等，严格相等运算符（`===`）比较它们是否为“同一个值”。如果两个值不是同一类型，严格相等运算符（`===`）直接返回`false`，而相等运算符==会将它们转换成同一个类型，再用严格相等运算符进行比较。

**复合类型值**

两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。

**undefined 和 null**

`undefined`和`null`与自身严格相等。

```
undefined === undefined // true
null === null // true
```

###### 相等运算符

- 原始类型值

  原始类型的值会转换成数值再进行比较。

  ```
  1 == true // true
  // 等同于 1 === Number(true)
  
  0 == false // true
  // 等同于 0 === Number(false)
  'true' == true // false
  // 等同于 Number('true') === Number(true)
  // 等同于 NaN === 1
  
  '' == 0 // true
  // 等同于 Number('') === 0
  // 等同于 0 === 0
  
  '' == false  // true
  // 等同于 Number('') === Number(false)
  // 等同于 0 === 0
  
  '1' == true  // true
  // 等同于 Number('1') === Number(true)
  // 等同于 1 === 1
  
  '\n  123  \t' == 123 // true
  // 因为字符串转为数字时，省略前置和后置的空格
  ```

-  **对象与原始类型值比较** 

   对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，对象转换成原始类型的值，再进行比较。 

   先调用对象的`valueOf()`方法，如果得到原始类型的值 。 如果得到的还是对象，则再调用`toString()`方法 

  ```
  // 数组与数值的比较
  [1] == 1 // true
  
  // 数组与字符串的比较
  [1] == '1' // true
  [1, 2] == '1,2' // true
  
  // 对象与布尔值的比较
  [1] == true // true
  [2] == true // false
  ```

## 错误处理机制

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供`Error`构造函数，所有抛出的错误都是这个构造函数的实例。

```
var err = new Error('出错了');
err.message // "出错了"
```

- **message**：错误提示信息
- **name**：错误名称（非标准属性）
- **stack**：错误的堆栈（非标准属性）

### SyntaxError 对象

`SyntaxError`对象是解析代码时发生的语法错误。

```
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```

### ReferenceError 对象

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

### RangeError 对象

`RangeError`对象是一个值超出有效范围时发生的错误。

### TypeError 对象

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。

```
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```

上面代码的第二种情况，调用对象不存在的方法，也会抛出`TypeError`错误，因为`obj.unknownMethod`的值是`undefined`，而不是一个函数。

### URIError 对象

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

### 自定义错误

```
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

### throw 语句

```
if (x <= 0) {
  throw new Error('x 必须为正数');
}
// Uncaught ReferenceError: x is not defined
```

上面代码中，`throw`抛出的是一个`UserError`实例。

`throw`也可以抛出自定义错误。

```
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

throw new UserError('出错了！');
// Uncaught UserError {message: "出错了！", name: "UserError"}
```

上面代码中，`throw`抛出的是一个`UserError`实例。

`throw`可以抛出任何类型的值

```
// 抛出一个字符串
throw 'Error！';
// Uncaught Error！

// 抛出一个数值
throw 42;
// Uncaught 42

// 抛出一个布尔值
throw true;
// Uncaught true
```

### try...catch 结构

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。

```
try {
  throw new Error('出错了!');
} catch (e) {
  console.log(e.name + ": " + e.message);
  console.log(e.stack);
}
```

`try`代码块抛出错误（上例用的是`throw`语句），JavaScript 引擎就立即把代码的执行，转到`catch`代码块，或者说错误被`catch`代码块捕获了。

### finally 代码块

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句。

## 异步操作

### 单线程模型

单线程模型指的是，JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。

JavaScript 之所以采用单线程，而不是多线程，跟历史有关系。JavaScript 从诞生起就是单线程，原因是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。如果 JavaScript 同时有两个线程，一个线程在网页 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 JavaScript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。JavaScript 语言本身并不慢，慢的是读写外部数据，比如等待 Ajax 请求返回结果。这个时候，如果对方服务器迟迟没有响应，或者网络不通畅，就会导致脚本的长时间停滞。

如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 操作（输入输出）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。JavaScript 语言的设计者意识到，这时 CPU 完全可以不管 IO 操作，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 操作返回了结果，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的“**事件循环**”机制（Event Loop）。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

#### 同步任务和异步任务

程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。

同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。

举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的回调函数。

#### 任务队列和事件循环

JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

### 事件监听

另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

### 发布/订阅

事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”[发布/订阅模式](https://en.wikipedia.org/wiki/Publish-subscribe_pattern)”（publish-subscribe pattern），又称“[观察者模式](https://en.wikipedia.org/wiki/Observer_pattern)”（observer pattern）。

首先，`f2`向信号中心`jQuery`订阅`done`信号。

```
jQuery.subscribe('done', f2);
```

然后，`f1`进行如下改写。

```
function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
  }, 1000);
}
```

上面代码中，`jQuery.publish('done')`的意思是，`f1`执行完成后，向信号中心`jQuery`发布`done`信号，从而引发`f2`的执行。

`f2`完成执行后，可以取消订阅（unsubscribe）。

```
jQuery.unsubscribe('done', f2);	
```

## 构造函数

1.对象字面量
var o = {
name: 'zs',
age: 18,
sex: true,
sayHi: function () {
	console.log(this.name);
	}
};   
2.new Object()创建对象
    var person = new Object();
    person.name = 'lisi';
    person.age = 35;
    person.job = 'actor';
    person.sayHi = function() {
    console.log('Hello,everyBody');
}
3.工厂函数创建对象
function createPerson(name, age, job) {
var person = new Object();
person.name = name;
person.age = age;
person.job = job;
person.sayHi = function(){
console.log('Hello,everyBody');
	}
return person;
}
var p1 = createPerson('张三', 22, 'actor');
 4.自定义构造函数，构造函数用于创建一类对象，**首字母要大写**。delete obj.name;删除对象的属性
    function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayHi = function(){
  	 	console.log('Hello,everyBody');
	}
}
var p1 = new Person('张三', 22, 'actor');

## 标准库

### Math

Math.PI						// 圆周率
Math.random()				// 生成随机数
Math.floor()/Math.ceil()	 // 向下取整/向上取整
Math.round()				// 取整，四舍五入
Math.abs()					// 绝对值
Math.max()/Math.min()		 // 求最大和最小值                                                                                        Math.sin()/Math.cos()		 // 正弦/余弦
Math.power()/Math.sqrt()	 // 求指数次幂/求平方根

### Array

创建数组对象的两种方式

- 字面量方式
- new Array()

检测一个对象是否是数组

- instanceof

1 栈操作(先进后出)
push()
pop() 		//取出数组中的最后一项，修改length属性
2 队列操作(先进先出)
shift()		//取出数组中的第一个元素，修改length属性
unshift() 	//在数组最前面插入项，返回数组的长度
 3 排序方法
reverse()	//翻转数组
sort(); 	//即使是数组sort也是根据字符，从小到大排序

arr.sort(function(a,b){
			return a-b;
		})
 4 操作方法
concat()  	//把参数拼接到当前数组
slice() 	//从当前数组中截取一个新的数组，不影响原来的数组，参数start从0开始,end从1开始	substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。
splice()	//删除或替换当前数组的某些项目，参数start, deleteCount, options(要替换的项目)
 5 位置方法
indexOf()、lastIndexOf()   //如果没找到返回-1
 6 迭代方法 不会修改原数组(可选)  html5
every()、filter()、forEach()、map()、some()
7 方法将数组的所有元素连接到一个字符串中。
join()

### 字符串

charAt()    	//获取指定位置处字符
charCodeAt()  	//获取指定位置处字符的ASCII码
str[0]   		//HTML5，IE8+支持 和charAt()等效
 2 字符串操作方法
concat()   		//拼接字符串，等效于+，+更常用
slice()    		//从start位置开始，截取到end位置，end取不到
substring() 	//从start位置开始，截取到end位置，  end取不到
substr()   		//从start位置开始，截取length个字符
 3 位置方法
indexOf()   	//返回指定内容在元字符串中的位置，若没有则返回-1是，indexOf('a',2);从位置2开始找到a的位置
)lastIndexOf() 	//从后往前找，只找第一个匹配的
 4 去除空白   
trim()  		//只能去除字符串前后的空白，字符之间的空格不能去掉
 5 大小写转换方法
to(Locale)UpperCase() 	//转换大写
to(Locale)LowerCase() 	//转换小写
6 其它
search() 
replace(替换，被替换)	替换可为正则表达式
split()字符转换为数组
var str='a,b,c,d';
var arr=str.split(',');//以逗号为分割成数组
arr.join('');

 当调用字符串的方法时 eg：当调用s1.substring(5)的时候，先把s1包装成String类型的临时对象，再调用substring方法，最后销毁临时对象

字符串具有不可变，重新给变量赋值，原来的值仍在内存中，要获得新的值要重新定义变量

## DOM和BOM

this的几种情况

```
1 普通函数中的this  ->  window
2 构造函数中的this  ->  是当前构造函数创建的对象
3 方法中的this      ->  方法所属的对象
4 事件处理函数中的this   ->  事件源，谁调用的该事件this就指向谁
```

```
console.log(box.innerHTML);获取内容的时候，如果内容中有标签，会把标签页获取到,原封不动把内容获取到
console.log(box.innerText);获取内容的时候，如果内容中有标签，会把标签过滤掉,innerText 会把前后的换行和空白都去掉
console.log(box.textContent);如果内容中有标签，会把标签过滤掉,不会把前后的换行和空白都去掉
```

## 

