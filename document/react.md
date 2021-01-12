# 虚拟DOM

## **背景**

前端主流框架 vue 和 react 中都使用了虚拟DOM（virtual DOM）技术，因为渲染真实DOM的开销是很大的，性能代价昂贵，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排，而我们只需要更新修改过的那一小块dom而不要更新整个dom，这时使用diff算法能够帮助我们

**DOM**

DOM全称`文档对象模型`，本质也是一个JS对象。每操作一次DOM都会对页面进行重新渲染，且新生成一颗DOM树。

DOM的本质： 浏览器中的概念，用js对象来表示页面上的元素，并提供操作DOM对象的API

**VDOM**

虚拟dom，通过JS模拟DOM中的真实节点对象，再通过特定的render方法将其渲染成真实的DOM节点。

vdom的本质:是框架中的概念，是程序员用js对象来模拟页面上的DOM和DOM 的嵌套

## **diff算法**



![img](https://user-gold-cdn.xitu.io/2020/5/2/171d3ca4cc6af69a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

现有一个真实的`DOM`，首先会映射为虚拟`DOM`，这个时候，我们删除了最后一个`p`节点和`son2`的节点，得到了新的一个虚拟`DOM`，新的`vdom`会和旧的`vdom`进行差异对比，得到了`pathes`对象，之后，对旧的真实`dom`进行操作，得到了新的`DOM`。

**diff策略**

React用 三大策略 将O(n^3)复杂度 转化为 O(n)复杂度

- 策略一（tree diff）：新旧DOM树，逐层对比的方式
  DOM节点跨层级的移动操作特别少，可以忽略不计。

  <img src="https://images2018.cnblogs.com/blog/1455367/201808/1455367-20180808083547179-1944470540.jpg" alt="img" style="zoom:50%;" />

  只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。

  当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。

  这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

- 策略二（component diff）：
  拥有相同类的两个组件生成相似的树形结构， 拥有不同类的两个组件 生成不同的树形结构。

- 策略三（element diff）：
  对于同一层级的一组子节点，通过唯一id区分。

# react项目搭建

前提：搭建react下的webpack环境

## 依赖包

 react 这个包，是专门用来创建React组件、组件生命周期等这些东西的；
 react-dom 里面主要封装了和 DOM 操作相关的包，比如，要把 组件渲染到页面上

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

要使用 JSX 语法，必须先运行 `cnpm i babel-preset-react -D`，然后再 `.babelrc` 中添加 语法配置；

## 根组件APP.jsx

```js


// 在 react 中，如要要创建 DOM 元素了，只能使用 React 提供的 JS API 来创建，不能【直接】像 Vue 中那样，手写 HTML 元素
// React.createElement() 方法，用于创建 虚拟DOM 对象，它接收 3个及以上的参数
// 参数1： 是个字符串类型的参数，表示要创建的元素类型
// 参数2： 是一个属性对象，表示 创建的这个元素上，有哪些属性
// 参数3： 从第三个参数的位置开始，后面可以放好多的虚拟DOM对象，这写参数，表示当前元素的子节点
// <div title="this is a div" id="mydiv">这是一个div</div>
// var myDiv = React.createElement('div', { title: 'this is a div', id: 'mydiv' }, '这是一个div', myH1)

// 由于，React官方，发现，如果直接让用户手写 JS 代码创建元素，用户会疯掉的，然后，用户就开始寻找新的前端框架了，于是，
// React 官方，就提出了一套 JSX 语法规范，能够让我们在 JS 文件中，书写类似于 HTML 那样的代码，快速定义虚拟DOM结构；
// 问题： JSX（符合 XML 规范的 JS 语法）的原理是什么？？？
// 注意：JSX内部在运行的时候，也是先把 类似于HTML 这样的标签代码，转换为了 React.createElement 的形式；
// 也就是说：哪怕我们写了 JSX 这样的标签，也并不是直接把 我们的 HTML 标签渲染到页面上，而是先转换成 React.createElement 这样的JS代码，再渲染到页面中；（JSX是一个对程序员友好的语法糖）
//在JSX中，如果要为元素添加`class`属性了，那么，必须写成`className`，因为 `class`在ES6中是一个关键字；和`class`类似，label标签的 `for` 属性需要替换为 `htmlFor`.
//在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；

// 在React中，构造函数，就是一个最基本的组件
// 如果想要把组件放到页面中，可以把 构造函数的名称，当作 组件的名称，以 HTML标签形式引入页面中即可
// 注意：React在解析所有的标签的时候，是以标签的首字母来区分的，如果标签的首字母是小写，那么就按照 普通的 HTML 标签来解析，如果 首字母是大写，则按照 组件的形式去解析渲染
// 结论：组件的首字母必须是大写
export default function Hello(props) {
  // 在组件中，如果想要使用外部传递过来的数据，必须，显示的在 构造函数参数列表中，定义 props 属性来接收；
  // 通过 props 得到的任何数据都是只读的，不能从新赋值
  return <div>
    <h1>这是在Hello组件中定义的元素 --- {props.name}</h1>
  </div>
}


```

## main.js

```js
// JS打包入口文件
// 1. 导入 React包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入评论列表样式【注意：这种样式是全局的】
// import './css/commentList.css'

// 导入评论列表组件
import Hello from './components/APP.js'

//
var person = {
  name: 'ls',
  age: 22,
  gender: '男',
  address: '北京'
}
// ReactDOM.render('要渲染的虚拟DOM元素', '要渲染到页面上的哪个位置中')
// 注意： ReactDOM.render() 方法的第二个参数，和vue不一样，不接受 "#app" 这样的字符串，而是需要传递一个 原生的 DOM 对象
ReactDOM.render(<div>
  <Hello name={person.name} age={person.age} gender={person.gender} address={person.address}></Hello>
</div>, document.getElementById('app'))
```



## 两种创建组件方式的对比

```js
// 注意： 以上两种创建组件的方式，有着本质上的区别，其中，
// 使用 function 构造函数创建的组件，内部没有 state 私有数据，只有 一个 props 来接收外界传递过来的数据；
// 使用 class 关键字 创建的组件，内部，除了有 this.props 这个只读属性之外，还有一个 专门用于 存放自己私有数据的 this.state 属性，这个 state 是可读可写的！
// 基于上面的区别：我们可以为这两种创建组件的方式，下定义了： 使用 function 创建的组件，叫做【无状态组件】；使用 class 创建的组件，叫做【有状态组件】
// 有状态组件和无状态组件，最本质的区别，就是有无 state 属性；同时， class 创建的组件，有自己的生命周期函数，但是，function 创建的 组件，没有自己的生命周期函数；
// 问题来了：什么时候使用 有状态组件，什么时候使用无状态组件呢？？？
//  1. 如果一个组件需要存放自己的私有数据，或者需要在组件的不同阶段执行不同的业务逻辑，此时，非常适合用 class 创建出来的有状态组件；
//  2. 如果一个组件，只需要根据外界传递过来的 props，渲染固定的 页面结构就完事儿了，此时，非常适合使用 function 创建出来的 无状态组件；（使用无状态组件的小小好处： 由于剔除了组件的生命周期，所以，运行速度会相对快一丢丢）

```



### 用class关键字创建出来的组件：“有状态组件”

```js
// 使用 class 创建的类，通过 extends 关键字，继承了 React.Component 之后，这个类，就是一个组件的模板了
// 如果想要引用这个组件，可以把 类的名称， 以标签形式，导入到 JSX 中使用
export default class Hello2 extends React.Component {
  constructor(props) {
    // 注意： 如果使用 extends 实现了继承，那么在 constructor 的第一行，一定要显示调用一下 super()
    //  super() 表示父类的构造函数
    super(props)
    // 在 constructor 中，如果想要访问 props 属性，不能直接使用 this.props， 而是需要在 constructor 的构造器参数列表中，显示的定义 props 参数来接收，才能正常使用；
    // console.log(props)

    // 注意： 这是固定写法，this.state 表示 当前组件实例的私有数据对象，就好比 vue 中，组件实例身上的 data(){ return {} } 函数
    // 如果想要使用 组件中 state 上的数据，直接通过 this.state.*** 来访问即可
    this.state = {
      msg: '这是 Hello2 组件的私有msg数据',
      info: '瓦塔西***'
    }
  }
  // 保存信息1： No `render` method found on the returned component instance: you may have forgotten to define `render`.
  // 通过分析以上报错，发现，提示我们说，在 class 实现的组件内部，必须定义一个 render 函数
  render() {
    // 报错信息2： Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.
    // 通过分析以上报错，发现，在 render 函数中，还必须 return 一个东西，如果没有什么需要被return 的，则需要 return null

    // 虽然在 React dev tools 中，并没有显示说 class 组件中的 props 是只读的，但是，经过测试得知，其实 只要是 组件的 props，都是只读的；
    // this.props.address = '123'

    // console.log(this.props)


    return <div>
      <h1>这是 使用 class 类创建的组件</h1>
      <h3>外界传递过来的数据是： {this.props.address} --- {this.props.info}</h3>
      <h5>{this.state.msg}</h5>

      {/* 1.1 在React中，如果想要为元素绑定事件，不能使用 网页中 传统的 onclick 事件，而是需要 使用 React 提供的  onClick */}
      {/* 1.2 也就是说：React中，提供的事件绑定机制，使用的 都是驼峰命名，同时，基本上，传统的 JS 事件，都被 React 重新定义了一下，改成了 驼峰命名 onMouseMove  */}
      {/* 2.1 在 React 提供的事件绑定机制中，事件的处理函数，必须直接给定一个 function，而不是给定一个 function 的名称 */}
      {/* 2.2 在为 React 事件绑定 处理函数的时候，需要通过 this.函数名， 来把 函数的引用交给 事件 */}
      <input type="button" value="修改 msg" id="btnChangeMsg" onClick={this.changeMsg} />
      <br />
    </div>
  }

  changeMsg = () => {
    // console.log('ok')
    // 注意： 这里不是传统网页，所以 React 已经帮我们规定死了，在 方法中，默认this 指向 undefined，并不是指向方法的调用者
    // console.log(this)

    // 直接使用 this.state.msg = '123' 为 state 上的数据重新赋值，可以修改 state 中的数据值，但是，页面不会被更新；
    // 所以这种方式，React 不推荐，以后尽量少用；
    // this.state.msg = '123'

    // 如果要为 this.state 上的数据重新赋值，那么，React 推荐使用 this.setState({配置对象}) 来重新为 state 赋值
    // 注意： this.setState 方法，只会重新覆盖那些 显示定义的属性值，如果没有提供最全的属性，则没有提供的属性值，不会被覆盖；
    /* this.setState({
      msg: '123'
    }) */

    // this.setState 方法，也支持传递一个 function，如果传递的是 function，则在 function 内部，必须return 一个 对象；
    // 在 function 的参数中，支持传递两个参数，其中，第一个参数是 prevState，表示为修改之前的 老的 state 数据
    // 第二个参数，是 外界传递给当前组件的 props 数据
    this.setState(function (prevState, props) {
      // console.log(props)
      return {
        msg: '123'
      }
    }, function () {
      // 由于 this.setState 是异步执行的，所以，如果想要立即拿到最新的修改结果，最保险的方式， 在回调函数中去操作最新的数据
      console.log(this.state.msg)
    })
    // 经过测试发现， this.setState 在调用的时候，内部是异步执行的，所以，当立即调用完 this.setState 后，输出 state 值可能是旧的
    // console.log(this.state.msg)
  }
}
```



```js
//  class 后面跟上类名， 类名后面，不需要加 () ，直接上 {}
class Per {
  // 在每个class类内部，都有一个 constructor 构造器， 如果没有显示定义 构造器，那么类内部默认都有个看不见的 constructor
  // 每当，使用 new 关键字，创建 class 类实例的时候，必然会优先调用 constructor 构造器
  // constructor(){}
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 这是实例方法，必须通过 new 出来的对象调用
  say() {
    console.log('ok a ')
  }

  static info = 123
  static sayHello() {
    console.log('这是静态方法')
  }
}

var p2 = new Per('王多多', 22)
console.log(p2)
console.log(Per.info)
console.log(Per.sayHello())
```

```js

// 使用 extends 实现继承，extends 前面的是子类，后面的是父类
class Chinese extends Person {
  constructor(name, age, color, language) {
    console.log(1)
    // 注意： 当使用 extends 关键字实现了继承， 子类的 constructor 构造函数中，必须显示调用 super() 方法，这个   	super 表示父类中 constructor 的引用
    super(name, age)
    this.color = color
    this.language = language
    console.log(2)
  }
}
```

### 用构造函数创建出来的组件：无状态组件”

```js

// 组件的首字母必须是大写
function Hello(props) {
  // 在组件中，如果想要使用外部传递过来的数据，必须，显示的在 构造函数参数列表中，定义 props 属性来接收；
  // 通过 props 得到的任何数据都是只读的，不能从新赋值
  return <div>
    <h1>这是在Hello组件中定义的元素 --- {props.name}</h1>
  </div>
}
```

## 路由

```js
//使用antD组件，侧边菜单栏
<Menu.Item key="home">
              <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="movie">
              <Link to="/movie/in_theaters/1">电影</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">关于</Link>
 </Menu.Item>
//内容区域
  <Content style={{ backgroundColor: '#fff', flex: 1 }}>
          <Route path="/home" component={HomeContainer}></Route>
          <Route path="/movie" component={MovieContainer}></Route>
          <Route path="/about" component={AboutContainer}></Route>
  </Content>
```



# 组件的生命周期

 + ##### 组件生命周期分为三部分：
   
	+ **组件创建阶段**：组件创建阶段的生命周期函数，有一个显著的特点：创建阶段的生命周期函数，在组件的一辈子中，只执行一次；
	
	> componentWillMount: 组件将要被挂载，此时还没有开始渲染虚拟DOM。无法获取到页面上的 任何元素，因为虚拟DOM 和 页面 都还没有开始渲染呢
	>
	> render：第一次开始渲染真正的虚拟DOM，当render执行完，内存中就有了完整的虚拟DOM了，但是，页面上尚未真正显示DOM元素
	> componentDidMount: 组件完成了挂载，此时，组件已经显示到了页面上，当这个方法执行完，组件就进入都了 运行中 的状态
	
	- **组件运行阶段**：也有一个显著的特点，根据组件的state和props的改变，有选择性的触发0次或多次；
	
	```js
	componentWillReceiveProps: 
	组件将要接收新属性，此时，只要这个方法被触发，就证明父组件为当前子组件传递了新的属性值；
	如果我们使用 this.props 来获取属性值，这个属性值，不是最新的，是上一次的旧属性值
	// 如果想要获取最新的属性值，需要通过 componentWillReceiveProps 的参数列表来获取
	componentWillReceiveProps(nextProps){    console.log(this.props.pmsg + ' ---- ' + nextProps.pmsg);}
	
	shouldComponentUpdate: 组件是否需要被更新，此时，组件尚未被更新，但是，state 和 props 肯定是最新的
	componentWillUpdate: 组件将要被更新，此时，尚未开始更新，内存中的虚拟DOM树还是旧的，页面上的 DOM 元素 也是旧的
	render: 此时，又要重新根据最新的 state 和 props 重新渲染一棵内存中的 虚拟DOM树，当 render 调用完毕，内存中的旧DOM树，已经被新DOM树替换了！此时页面还是旧的
	componentDidUpdate: 此时，页面又被重新渲染了，state 和 虚拟DOM 和 页面已经完全保持同步
	```
	
	- **组件销毁阶段**：也有一个显著的特点，一辈子只执行一次；
	
	```
	componentWillUnmount: 组件将要被卸载，此时组件还可以正常使用；
	```
	
	![React中组件的生命周期](/home/silk/文档/知识点/document/img/react/React中组件的生命周期.png)

# 核心概念

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

- 无论是函数组件还是类组件，return 的 React 元素的语法必须是由一个标签包裹起来的所有虚拟 DOM 内容

  一种是使用一个 div 标签将其包裹起来，另外一种方式就是使用 React 提供的 `<React.Fragment>` 将其包裹起来，但是其渲染到页面时是不会有 `<React.Fragment>`的

- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

  ```
  传统的 HTML：
  <button onclick="activateLasers()">
    Activate Lasers
  </button>
  React 中略微不同：
  <button onClick={activateLasers}>
    Activate Lasers
  </button>
  ```

- React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`

  你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

  这并不是 React 特有的行为；这其实与 [JavaScript 函数工作原理](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)有关。通常情况下，如果你没有在方法后面添加 `()`，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

  ```js
   1.bind
   constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
      // 为了在回调中使用 `this`，这个绑定是必不可少的   
      this.handleClick = this.handleClick.bind(this);  
      }
  2.箭头函数
    handleClick = () => {
      console.log('this is:', this);
    }
  ```

- 在 JSX 中嵌入表达式

  ```js
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  ```

- 阻止组件渲染

  ```
   return null;
  ```

## 列表 & Key

  ```js
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```

  key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key;当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key

  **key 只是在兄弟节点之间必须唯一**

  数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

  ```js
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  ```

  **组件遍历**

  ```js
  function ListItem(props) {
    // 正确！这里不需要指定 key：
    return <li>{props.value}</li>;
  }
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // 正确！key 应该在数组的上下文中被指定
      <ListItem key={number.toString()}              value={number} />
  
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```

  **在 JSX 中嵌入 map()**

  ```js
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()}
                    value={number} />
        )}
      </ul>
    );
  }
  ```

## refs

## PropTypes



# Hooks函数