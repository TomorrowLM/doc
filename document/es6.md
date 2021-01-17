# **let和const**

`let`和`const`。其中，`let`完全可以取代`var`，因为两者语义相同，而且`let`没有副作用。在`let`和`const`之间，建议优先使用`const`，尤其是在全局环境，不应该设置变量，只应设置常量。同时JavaScript 编译器会对`const`进行优化，所以多使用`const`，有利于提高程序的运行效率 

## **1.不存在变量提升**

暂时性死区: 区级作用域中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。 

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}
//(x = y, y = 2)作为函数参数作用域，父作用域
//函数内部是一个单独的子作用域
bar(); // 报错。参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。
```

## **2.暂时性死区**

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

## **3.不允许重复声明**

```javascript
// 报错。let不允许在相同作用域内，重复声明同一个变量
function () {
  let a = 10;
  var a = 1;
}
```

## **4.为什么需要块级作用域？**

```javascript
1. 内层变量可能会覆盖外层变量。 
var tmp = new Date();
function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}
//内层的tmp变量覆盖了外层的tmp变量。
f(); // undefined

2.用来计数的循环变量泄露为全局变量。
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5
```

## **5.块级作用域与函数**

 `let`实际上为 JavaScript 新增了块级作用域。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量`n`，运行后输出 5。这表示外层代码块不受内层代码块的影响,即**块级作用域也属于作用域链中**。如果两次都使用`var`定义变量`n`，最后输出的值才是 10。

## **在块级作用域中声明函数**

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

```js
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成**函数表达式**，而不是函数声明语句。

## **6.const命令**

 `const`声明一个只读的常量。一旦声明，常量的值就不能改变。

 只在声明所在的块级作用域内有效 

 对于**复合类型**的变量，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变  

## **7.顶层对象的属性**

顶层对象，在浏览器环境指的是`window`对象，在Node指的是`global`对象。 

ES5之中，顶层对象的属性与全局变量是等价的。  这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道 。 其次，程序员很容易不知不觉地就创建了全局变量 。 顶层对象的属性是到处可以读写的，这非常不利于模块化编程。 

 ES6为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。 

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```



# 变量的解构赋值

## 1.数组

 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。 

```javascript
1//“模式匹配”
var [a, b, c] = [1, 2, 3];
let [x, y, z] = new Set(["a", "b", "c"]);//x="a"
2//另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
let [x, y] = [1, 2, 3];//x = 1  y = 2
3//嵌套
let [a, [b], d] = [1, [2, 3], 4];//b=2
4//
let [head, ...tail] = [1, 2, 3, 4];//head=1	tail=[2, 3, 4]
5//只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
//sixth=5
6//解构赋值允许指定默认值。
[x, y = 'b'] = ['a']; // x='a', y='b'
7//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];//x=1
let [x = 1] = [null];//x=null

```

## 2.对象

```javascript
1//对象的解构赋值.数组的元素是按次序排列的，变量的取值由它的位置决定；对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
var { foo, bar } = { foo: "aaa", bar: "bbb" };
2//如果变量名与属性名不一致，必须写成下面这样。
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
3//
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
//f = 'hello'
//l = 'world'
4//与数组一样，解构也可以用于嵌套结构的对象。
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
5//对象的解构也可以指定默认值。
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
//默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null

//注意点
1//如果要将一个已经声明的变量用于解构赋值，必须非常小心。
//JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
let x;
{x} = {x: 1};// SyntaxError: syntax error
// 正确的写法
let x;
({x} = {x: 1});
2//由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

## 3.字符串

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
//类似数组的对象都有一个length属性
let {length : len} = 'hello';
len // 5
```

## 4.函数参数

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

**函数参数的解构也可以使用默认值。**

```
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

```
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数`move`的参数指定默认值，而不是为变量`x`和`y`指定默认值

## 5.变量的解构赋值的作用

```
（1）交换变量的值
（2）从函数返回多个值
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
（3）函数参数的定义
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
（4）提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
（5）函数参数的默认值(数组或者对象的默认值)
（6）遍历 Map 结构
（7）输入模块的指定方法
```

# 字符串的扩展

```javascript
//允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。
"\u0061"  // "a"
//但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。
"\uD842\uDFB7"
// "𠮷"
"\u20BB7"
// " 7",如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
"\u{20BB7}"
// "𠮷",只要将码点放入大括号，就能正确解读该字符
//'\u{1F680}' === '\uD83D\uDE80'大括号表示法与四字节的UTF-16编码是等价的。

//JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。charCodeAt方法只能分别返回前两个字节和后两个字节的值
var s = '𠮷a';
//汉字“𠮷”（注意，这个字不是”吉祥“的”吉“）的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271）
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

s.codePointAt(0) // 134071
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
s.codePointAt(2).toString(16) // "61"

//codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷") // true
is32Bit("a") // false
//ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）.所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。
//String.fromCodePoint
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
字符串的遍历器接口：for...of循环遍历，可以识别大于0xFFFF的码点
ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
'abc'.at(0) // "a"
'𠮷'.charAt(0) // "\uD842"
'𠮷'.at(0) // "𠮷"

'\u01D1'==='\u004F\u030C' //false
'\u01D1'.length // 1
'\u004F\u030C'.length // 2
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true

var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
'x'.repeat(3) // "xxx"
//如果repeat的参数是负数或者Infinity，会报错。
//如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。
//参数NaN等同于0。

//模板字符串，
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
//模板字符串之中还能调用函数。
function fn() {
  return "Hello World";
}
`foo ${fn()} bar`
// foo Hello World bar

//ES6还为原生的String对象，提供了一个raw方法。
//String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"
String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'
// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```

# 正则的扩展

 字符串对象共有4个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。 

ES6对正则表达式添加了`u`修饰符，含义为“Unicode模式”，用来正确处理大于`\uFFFF`的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。

```javascript
/^\uD83D/u.test('\uD83D\uDC2A')
// false
/^\uD83D/.test('\uD83D\uDC2A')
// true
```

对于码点大于`0xFFFF`的Unicode字符，点字符不能识别，必须加上`u`修饰符。

```javascript
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

 ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上`u`修饰符，才能识别。  使用`u`修饰符后，所有量词都会正确识别码点大于`0xFFFF`的Unicode字符。 

 除了`u`修饰符，ES6还为正则表达式添加了`y`修饰符，叫做“粘连”（sticky）修饰符。 

 `g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。 

# 数值的扩展

1. 二进制和八进制表达方式

 ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

2. `Number.isFinite()`和`Number.isNaN()`两个方法。 

`Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。 

它们与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，`Number.isFinite()`对于非数值一律返回`false`, `Number.isNaN()`只有对于`NaN`才返回`true`，非`NaN`一律返回`false`。 

3. `parseInt()`和`parseFloat()` 

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法，这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

4. Number.isInteger() 

 `Number.isInteger()`用来判断一个数值是否为整数。 

```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
```

5.Math对象的扩展

```
1.Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
对于空值和无法截取整数的值，返回NaN。
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
2.Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
它会返回五种值。
参数为正数，返回+1；参数为负数，返回-1；
参数为 0，返回0；参数为-0，返回-0;
其他值，返回NaN。
Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN
3.Math.cbrt()方法用于计算一个数的立方根。对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。
```

# 函数的扩展---

# 数组的扩展---

# 对象的扩展---

#  Promise对象

 Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。  所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。 

 `Promise`对象有以下两个特点 ：

1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。 `resolved`统一只指`fulfilled`状态 

优点： 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数 

缺点： 无法取消`Promise`  其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。 Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。    

## 1.基本用法

 `Promise`对象是一个构造函数，用来生成`Promise`实例。 

```javascript
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);//在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
  }
});
//Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。第二个函数是可选的，不一定要提供。
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});


//example
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
//Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。
```

`Promise`对象实现的 Ajax 操作的例子。

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });
  return promise;
};
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

调用`resolve`函数和`reject`函数时带有参数,参数是另一个Promise对象

```js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
//`p1`和`p2`都是 Promise 的实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。p1的状态由p2决定
//注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。
```

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
//上面代码中，`p1`是一个 Promise，3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 2 秒，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。
```

### Promise.prototype.then()

 `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。 

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```

上面代码中，第一个`then`方法指定的回调函数，返回的是另一个`Promise`对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。如果变为`resolved`，就调用第一个回调函数，如果状态变为`rejected`，就调用第二个回调函数。

### Promise.prototype.catch() 

 `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。 

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

 `getJSON()`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，**`then()`方法指定的回调函数**，如果运行中抛出错误，也会被`catch()`方法捕获。 

建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数。  理由是第二种写法可以捕获前面`then`方法执行中的错误 

```javascript
1.const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
2.const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});
3.const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test
```

3种写法等价， 抛出一个错误 

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

 Promise 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。 

### Promise.prototype.finally

 `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。 `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。 

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

 在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。  

### Promise.prototype.all

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

 `Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。 

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

### Promise.resolve reject 

有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。

```javascript
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
// 等价于
new Promise(resolve => resolve($.ajax('/whatever.json')))
```

# Iterator和for...of循环

 JavaScript表示“**集合**”的数据结构：

数组（`Array`）和对象（`Object`），Map和Set

若 数组的成员是`Map`，`Map`的成员是对象 ， 这样就需要一种统一的接口机制，来处理所有不同的数据结构。  

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构**提供统一的访问机制**。 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作 

**Iterator 的遍历过程是这样的。**

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，**遍历器对象本质上，就是一个指针对象。**

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

 每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。 

模拟`next`方法返回值的例子。

```javascript
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

##  for...of 

当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。 

 默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。**`Symbol.iterator`属性本身是一个函数**，就是当前数据结构默认的遍历器生成函数。  执行这个函数，就会返回一个遍历器对象。

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

 对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。

 一个对象如果要具备可被`for...of`循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。 如果`Symbol.iterator`方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。  

 **原生具备 Iterator 接口的数据结构如下。**

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

 变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。 

对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。

## 调用Iterator接口的场合

### **（1）解构赋值**

对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。

### **（2）扩展运算符**

扩展运算符（...）也会调用默认的 Iterator 接口。

### **（3）yield**

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```javascript
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
```

### **4）其他场合**

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()

## 与其他遍历语法的比较

1. 最原始的写法就是`for`循环。

   ```javascript
   for (var index = 0; index < myArray.length; index++) {
     console.log(myArray[index]);
   }
   ```

2.  数组提供内置的`forEach`方法。

   ```javascript
   myArray.forEach(function (value) {
     console.log(value);
   });
   //这种写法的问题在于，无法中途跳出forEach循环，break命令或return命令都不能奏效。
   ```

3.   `for...in`循环可以遍历数组的键名。 

   ```javascript
   for (var index in myArray) {
     console.log(myArray[index]);
   }
   //for...in循环主要是为遍历对象而设计的，不适用于遍历数组。
   ```

4. `for...of`循环相比上面几种做法，有一些显著的优点。

   ```javascript
   for (var n of fibonacci) {
     if (n > 1000)
       break;
     console.log(n);
   }
   //不同于forEach方法，它可以与break、continue和return配合使用。
   ```

# async

Generator 函数的语法糖 , 使得异步操作变得更加方便。 

## 异步编程

**异步**:所谓"异步"，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

**回调函数**

JavaScript语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。它的英语名字callback，直译过来就是"重新调用"。

读取文件进行处理，是这样写的。

```javascript
fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

上面代码中，readFile函数的第二个参数，就是回调函数，也就是任务的第二段。等到操作系统返回了`/etc/passwd`这个文件以后，回调函数才会执行。

**Promise**

回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。

```javascript
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  });
});
```

代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。这种情况就称为"回调函数地狱"（callback hell）

**ES6诞生以前，异步编程的方法，大概有下面四种。**

- **回调函数**
- **事件监听**
- **发布/订阅**
- **Promise 对象**



## `async`函数对 Generator 函数的改进

 `async`函数对 Generator 函数的改进，体现在以下四点。 

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。 不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行 

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）**返回值是 Promise。**

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。 `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。 

## async 函数

```javascript
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

 `async`函数返回的 Promise 对象

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

### Promise对象的状态变化

必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，**除非遇到`return`语句或者抛出错误**。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。 

```javascript
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
```

上面代码中，函数`getTitle`内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行`then`方法里面的`console.log`。

### await 命令

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。

```javascript
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

注意，上面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的。

### 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。

```javascript
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
```

防止出错的方法，也是将其放在`try...catch`代码块之中。

```javascript
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```

### Tips

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```javascript
let foo = await getFoo();
let bar = await getBar();
```

上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发。

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

# Class和Class的继承