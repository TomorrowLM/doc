---
slug: vue
title: vue
description: description.
category: 框架
tag: vue
date: 25-September-2020
---

# 项目搭建

## vue脚手架

基本使用流程:

1. npm install -g @vue/cli	
2. 生成项目模板，可以自定义
   vue create 本地文件夹名称
3. 进入到生成目录里面
   cd xxx
   npm install
4. npm run dev

## 项目目录

![img](https://images2018.cnblogs.com/blog/1389839/201805/1389839-20180502113321132-349982802.png)

- build：构建脚本目录

　　　　1）build.js  ==> 生产环境构建脚本；

　　　　2）check-versions.js  ==> 检查npm，node.js版本；

　　　　3）utils.js  ==> 构建相关工具方法；

　　　　4）vue-loader.conf.js  ==> 配置了css加载器以及编译css之后自动添加前缀；

　　　　5）webpack.base.conf.js  ==> webpack基本配置；

　　　　6）webpack.dev.conf.js  ==> webpack开发环境配置；

　　　　7）webpack.prod.conf.js  ==> webpack生产环境配置；

- config：项目配置

　　　　1）dev.env.js  ==> 开发环境变量；

　　　　2）index.js  ==> 项目配置文件；

　　　　3）prod.env.js  ==> 生产环境变量；

- node_modules：npm 加载的项目依赖模块

- src：这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：

　　　　1）assets：资源目录，放置一些图片或者公共js、公共css。这里的资源会被webpack构建；

　　　　2）components：组件目录，我们写的组件就放在这个目录里面；

　　　　3）router：前端路由，我们需要配置的路由路径写在index.js里面；

　　　　4）App.vue：根组件；

　　　　5）main.js：入口js文件；

- static：静态资源目录，如图片、字体等。不会被webpack构建

- index.html：首页入口文件，可以添加一些 meta 信息等

- package.json：npm包配置文件，定义了项目的npm脚本，依赖包等信息``

- README.md：项目的说明文档，markdown 格式

- .xxxx文件：这些是一些配置文件，包括语法配置，git配置等

## tip

- 组件内部引入第三方的css文件只在当前组件生效的办法

  <style src="" scoped></style>

- 组件内部引入第三方的js文件只在当前组件生效的办法

  https://www.cnblogs.com/qianxiaox/p/13826334.html

- vue样式穿透 ::v-deep   https://www.jb51.net/article/188038.htm

  修改vantUI样式，直接在 <style lang="scss" scoped> .... </style> 中编写的话只会影响当前组件内的样式，但如果去掉scoped话又会影响全局样式。

  如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：

  <style scoped> .a >>> .b { /* ... */ } </style> 上述代码将会编译成：.a[data-v-f3f3eg9] .b { /* … */ }

  可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。
  
- UI使用

  Muse https://www.cnblogs.com/randomlee/p/10782710.html

# 基本概念

## 响应式

https://zhuanlan.zhihu.com/p/53217382

数据发生改变的时候，视图会重新渲染，匹配更新为最新的值

**Object.defineProperty**可以为对象中的每一个属性，设置 get 和 set 方法

get 值是一个函数，当属性被访问时，会触发 get 函数

set 值同样是一个函数，当属性被赋值时，会触发 set 函数

```text
var obj={    
    name:"神仙朱"
}
Object.defineProperty(obj,"name",{
    get(){        
        console.log("get 被触发")
    },
    set(val){        
        console.log("set 被触发")
    }
})
```

当我访问 obj.name 时，会打印 ' get 被触发 '

当我为 obj.name 赋值时，obj.name = 5，会打印 ' set 被触发 '

## 创建实例

```js
var data = { a: 1 }
var vm=new Vue({
            el:'#box',
    		components:{ //局部组件
			'aaa':Aaa
			}，
            data:{
                data:data
            },
            methods:{
				fn(){}
​        }
​});\
// 获得这个实例上的 property
vm.a == data.a // => true
//设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2
```



## 标签数据

- **绑定数据**

1. {{msg}} , msg也可以是js表达式，但只能包含**单个**表达式

   ```
   一个表达式会产生一个值,它可以放在任何需要一个值的地方
   语句可以理解成一个行为.循环语句和if语句就是典型的语句
   需要语句的地方,你可以使用一个表达式来代替.这样的语句称之为表达式语句
   ```

2. v-model="msg"建立双向绑定 	

3. v-once指令： 执行一次性地插值，当数据改变时，插值处的内容不会更新 

   ```
   <span v-once>这个将不会改变: {{ msg }}</span>
   ```

- 编译html元素  
  - {{{msg}}} 	
  - v-html	
- v-text

## 标签属性

  ```vue

  <img src="{{url}}" alt="">
  <img v-bind:src="url"  >
  <img v-bind:style="{color:'',fontsize:data+'px'}">
  //缩写
  <img :src="url" alt="" >
  //动态参数的缩写 
  // 可以用方括号括起来的 JavaScript 表达式作为一个指令的参数 
  <img v-bind:[]="url"  >
  ```

  ```vue
  a:'red',
  b:'blue',
  json:{
         red:true,
         blue:false
  }
   
  <strong :class="[条件?a:b]">文字。。</strong>//可以用三元表达式  
  <strong :class="[a,b]">文字。。</strong>
  <strong :class="{red:true,blue:false}">文字。。</strong>
  <strong :class="json">文字。。</strong>
  ```

##  watch和computed

- **watch 适用场景：一个数据影响多个数据；**
- **computed适用场景：一个数据受多个数据影响；**

### **计算属性computed**

计算属性是为了模板中的表达式简洁，易维护

```vue
<p id="app">{{ myname.substring(0,1).toUpperCase() + myname.substring(1) }}</p>
```

运算过于复杂，冗长，且不好维护，因此我们对于复杂的运算应该 使用计算属性的方式去书写。

```vue
<div id="app">
{{ changewords }} 
//通过在表达式中调用方法来达到同样的效果
//{{changewords()}}
//不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
</div>
<script>
var vm = newVue({
		el: "#app",
		data:{},
   		method:{
            changewords(){
            	return
				this.myname.substring(0,1).toUpperCase() + this.myname.substring(1)
        	}
        }
		computed:{
			changewords(){
				return
				this.myname.substring(0,1).toUpperCase() + this.myname.substring(1)
			}
       		 //完整写法
       		 changewords:{
             		get: function() {
        				return  //一定要return
      				},
     		 		set: function(newVal) {
      				}
        	 }
    		//
	}
})
</script>

```

- 变量不在 data中定义，而是定义在computed中

- 计算属性基于响应式依赖进行缓存。如其中的任意一个值未发生变化，它调用的就是上一次 计算缓存的数据，因此提高了程序的性能。而methods中每调用一次就会重新计算一次，为了进行不必要的资源消耗，选择用计算属性

- **支持缓存**，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化

###   侦听器 **watch**

```js
  var vm = new Vue({
  	data: {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
   	 },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      question: function (newQuestion, oldQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      }
    },
  })

  vm.$watch(name,fnCb);  //浅度
  vm.$watch(name,fnCb,{deep:true});  //深度监视 
```

- 不支持缓存，数据变，直接会触发相应的操作；

- **watch支持异步**；

- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

-  当一个属性发生变化时，需要执行对应的操作；一对多；

- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数
  - immediate：组件加载立即触发回调函数执行，
  - deep: 深度监听，为了发现**对象内部值**的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增
- **不应该使用箭头函数来定义 watcher 函数**，因为箭头函数没有 this，它的 this 会继承它的父级函数，但是它的父级函数是 window，导致箭头函数的 this 指向 window，而不是 Vue 实例

## 循环和判断

### 循环

```js
//vue1.0
<li v-for="value in json">{{value}} </li>
     <li v-for="(k,v) in json">{{k}}   {{v}}  </li>
track-by="$index"

//vue2.0	v-for="(val,index) in array"
//:key="index"
//每次更改数组数据，全部的数据都会重新渲染，添加key值，从而只渲染更改的数据.这是因为每一个列表渲染的元素加上了唯一标识符，编译器通过标识符渲染指定列表，高效渲染虚拟DOM树
```

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy80OTI3MDM1LTk2MGYyZDg1NmI1ZWM5YzMuanBn?x-oss-process=image/format,png)

vue和react的虚拟DOM的Diff算法大致相同

<img src="https://upload-images.jianshu.io/upload_images/3973616-cbe6ef9bad920f51.png?imageMogr2/auto-orient/strip|imageView2/2/w/576/format/webp" alt="img" style="zoom:50%;" />

- 如果dom树有三层，在没加ID的情况下。

  先比较第一层。比较一次

  再比较第二层。比较第一层第一个节点和第二层第一个节点，第一层第一个节点和第二层第二个节点，比较第一层第一个节点和第二层两个节点。比较了四次。

  算法复杂度，2的n次方。

- 如果加上ID。

  比较第一个节点。再比较第二个节点。再比较第三个节点。再比较第四个节点。再比较第五个节点。一直比到第n个节点。

  算法复杂度为n。

### 判断

```js
v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。
<h1 v-if="awesome">Vue is awesome!</h1>
也可以用 v-else 添加一个“else 块”：	
<h1 v-else>Oh no 😢</h1>

在 <template> 元素上使用 v-if 条件渲染分组
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
切换按钮将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder（替换成用户已经输入的内容）。
```

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，如下：

```js
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

 ## 事件

### 使用方法

  ```js
  <!-- 完整语法 -->
  <a v-on:click="doSomething">...</a>
  
  <!-- 缩写 -->
  <a @click="doSomething">...</a>
  
  <!-- 动态参数的缩写 -->
  <a @[event]="doSomething"> ... </a>
  ```

```js
//使用原生的事件
mounted() {
    		//不能直接定义事件，需要从methods中引入this.handleScroll
    		//TODO,是否是this指向的问题
			window.addEventListener('scroll', this.handleScroll, true)
			this.boxTop = this.$refs.tabList.offsetTop;
},
```



### v-show

```js
 <div v-show="a"> 
 v-show="a"//a是布尔值， 切换元素的 CSS property `display`

//Vue2.+ 中data数据对象是通过Object.defineProerty来进行数据的双向数据绑定，
//而数组则是监听数组的push和pop等操作数组的方法进行双向绑定的，
//因此当是通过下标来修改时便不能更新视图

//使用数组中的值来控制展示
 <div v-show="arr[index]"> 
this.$set(this.arr,index,!this.arr[index]);
//第一个参数为数组，第二个参数为数组下标，第三个参数为设置的值，
```

### 修饰符

@click.stop="show1()"   stop防止事件冒泡  

```
阻止冒泡:  
			a). ev.cancelBubble=true;
			b). @click.stop	推荐
			c). event.stopPropagation();
```




```html

<!-- 阻止默认行为，提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

### 键盘

@keydown	$event	ev.keyCode

```
常用键:
		回车
			a). @keyup.13
			b). @keyup.enter
		上、下、左、右
			@keyup/keydown.left
			@keyup/keydown.right
			@keyup/keydown.up
			@keyup/keydown.down
自定义键盘信息:
Vue.directive('on').keyCodes.ctrl=17;
//vue2.0	
通过全局 config.keyCodes 对象自定义按键修饰符别名：
Vue.config.keyCodes.ctrl=17;
@keyup.ctrl="fn()"
```

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

## filter

```js
<p>1.msg|filterA</p>
{{'welcome'|uppercase}}  
<p>2.msg|filterA</p>
{{'WELCOME'|lowercase|capitalize}}
```

 数据配合使用过滤器:
		limitBy	限制几个
		limitBy   参数(取几个)
		limitBy 取几个  从哪开始

```
	filterBy	过滤数据
	filterBy ‘谁’

	orderBy	排序
	orderBy 谁 1/-1
		1  -> 正序
		2  -> 倒序

自定义过滤器:  model ->过滤 -> view
	Vue.filter(name,function(msg,[a,b]){
		
	});
{{msg | name([a,b])}}
```

## 自定义指令

	Vue.directive(指令名称,function(参数){
		this.el	-> 原生DOM元素
	});
	
	<div v-red="参数"></div>

用户会看到花括号标记:v-cloak		防止闪烁, 比较大段落

交互：vue-resource.js

## 单元素/组件的过渡动画

https://cn.vuejs.org/v2/guide/transitions.html

Vue 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

![Transition Diagram](https://cn.vuejs.org/images/transition.png)

**实例**

```vue
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

new Vue({
  el: '#demo',
  data: {
    show: true
  }
})

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>>
```

# vm实例

## property

### vm.$data

Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

### vm.$props

当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。

### vm.$el

获取Vue实例挂载的元素节点

### vm.$options

```js
 var vm=new Vue({
            // el:'#box',
            aa:11,//自定义属性
            show:function(){
                alert(1);
            },
            data:{
                a:1
            }
        });
console.log(vm.$options.aa);//获取自定义属性
vm.$options.show();
```



### vm.$refs

一个对象，持有注册过 [`ref` attribute](https://cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

### vm.$parent

父实例，如果当前实例有的话。

### vm.$children

当前实例的直接子组件。**需要注意 `$children` 并不保证顺序，也不是响应式的。**如果你发现自己正在尝试使用 `$children` 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 Array 作为真正的来源。

### vm.$root

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

## 方法

### vm.$watch

vm.$watch( expOrFn, callback, [options] )

观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。

### vm.$set

vm.$set( target, propertyName/index, value )

## 生命周期

### vm.$mount

### vm.$forceUpdate()

### nextTick

https://www.jianshu.com/p/a7550c0e164f

在下次 DOM 更新循环结束之后执行延迟回调。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

# 内置组件

## 插槽：slot

组件里所有标签赋值给slot标签

```js
<aaa>
<ul slot="ul-slot">
	<li>1111</li>
	<li>2222</li>
	<li>3333</li>
</ul>
<ol slot="ol-slot">
	<li>111</li>
	<li>222</li>
	<li>333</li>
</ol>
</aaa>

	<template id="aaa">
		<div>
			<h1>xxxx</h1>
		<slot name="ol-slot">这是默认的情况</slot>
		<p>welcome vue</p>
		<slot name="ul-slot">这是默认的情况2</slot>
		</div>
	</template>
```

## keep-alive

### 背景

Aaa和Baa组件，Aaa中有3个Tab栏（1，2，3），点击2后，点击Baa,再点击Aaa，会出现1的内容。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 **currentTabComponent** 实例。

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。
用一个 <keep-alive> 元素将其动态组件包裹起来，**组件将会被缓存**

### keep-alive

- **Props**：

  - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  - `max` - 数字。最多可以缓存多少组件实例。

- **用法**：

  `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

  当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

  - 页面第一次进入，钩子的触发顺序created-> mounted-> activated
  - 退出时触发deactivated
  - 当再次进入（前进或者后退）时，只触发activated。

## [transition](https://cn.vuejs.org/v2/api/#transition)

### **Prop**

- `name` - string，用于自动生成 CSS 过渡类名。例如：`name: 'fade'` 将自动拓展为 `.fade-enter`，`.fade-enter-active` 等。默认类名为 `"v"`
- `appear` - boolean，是否在初始渲染时使用过渡。默认为 `false`。
- `css` - boolean，是否使用 CSS 过渡类。默认为 `true`。如果设置为 `false`，将只通过组件事件触发注册的 JavaScript 钩子。
- `type` - string，指定过渡事件类型，侦听过渡何时结束。有效值为 `"transition"` 和 `"animation"`。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
- `mode` - string，控制离开/进入过渡的时间序列。有效的模式有 `"out-in"` 和 `"in-out"`；默认同时进行。
- `duration` - number | { `enter`: number, `leave`: number } 指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 `transitionend` 或 `animationend` 事件。
- `enter-class` - string
- `leave-class` - string
- `appear-class` - string
- `enter-to-class` - string
- `leave-to-class` - string
- `appear-to-class` - string
- `enter-active-class` - string
- `leave-active-class` - string
- `appear-active-class` - string

### 事件

- `before-enter`
- `before-leave`
- `before-appear`
- `enter`
- `leave`
- `appear`
- `after-enter`
- `after-leave`
- `after-appear`
- `enter-cancelled`
- `leave-cancelled` (`v-show` only)
- `appear-cancelled`

### 用法

`<transition>` 元素作为**单个**元素/组件的过渡效果。`<transition>` 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。

```
<!-- 简单元素 -->
<transition>
  <div v-if="ok">toggled content</div>
</transition>

<!-- 动态组件 -->
<transition name="fade" mode="out-in" appear>
  <component :is="view"></component>
</transition>

<!-- 事件钩子 -->
<div id="transition-demo">
  <transition @after-enter="transitionComplete">
    <div v-show="ok">toggled content</div>
  </transition>
</div>
```

```
new Vue({
  ...
  methods: {
    transitionComplete: function (el) {
      // 传入 'el' 这个 DOM 元素作为参数。
    }
  }
  ...
}).$mount('#transition-demo')
```

- **参考**：[过渡：进入，离开和列表](https://cn.vuejs.org/v2/guide/transitions.html)

# 组件

## 创建组件

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。

- **组件模板**

```js
<template id="Aaa">
//必须有根元素，包裹住所有的代码
	<h1 @click="change">{{msg}}</h1>
</template>
```

- **定义组件**

```js
<template id="Aaa">
	<h1 @click="change">{{msg}}</h1>
</template>
var Aaa=Vue.extend({
        //必须以函数的形式返回
        data(){
            return{
                msg:'我是'
            }
        },
        methods:{
            change(){
                this.msg='change'
            }
        },
        template:'<h1 @click="change">{{msg}}</h1>'
        //或者template:'#Aaa';
        components:{
        	//组件里面还可以嵌套一个组件
        }
    });
    
//vue2.0组件定义
var Aaa={
		template:""		
};
```

- **声明组件**

```js
//全局组件
Vue.component('aaa',Aaa);
//局部组件
var vm=new Vue({
		components:{ 
			'aaa':Aaa
		}
	});
```

- **组件名大小写**

  - #### kebab-case(短横线分隔命名) 

    ```
    Vue.component('my-component-name', { /* ... */ })
    ```

    当使用 kebab-case 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

  - #### PascalCase  (首字母大写命名)    

    ```
    Vue.component('MyComponentName', { /* ... */ })
    ```

    当使用 PascalCase定义 一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的

- **动态组件**

  <component :is="componentArr[i]"></component>

  componentArr=[component1,component2]

## props

```vue
<!-- 在 HTML 中是 kebab-case(短横线分隔命名)  的 -->
<blog-post post-title="hello!"></blog-post>
<!-- 在 HTML 中是 的 camelCase (小驼峰)-->
<blog-post postTitle="hello!"></blog-post>、
//都可以用postTitle来获取
Vue.component('blog-post', {T
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

- ​	每个 prop 都可以指定的值类型

  ```json
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
  }
  ```

- 所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。

## 组件通信

https://segmentfault.com/a/1190000019208626

### 子组件获取父组件的数据

```js
父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
子组件中使用mounted编译完成，将父组件数据赋值给子组件的数据，而直接不使用父组件数据
mounted(){
            console.log(this.msg)
             this.b=this.msg;
       //   vue2.0不允许直接给父级的数据做赋值操作
       //若父组件每次传一个对象给子组件，则可以赋值
}
```

### 父组件获取子组件的数据

组件通信: 实现子组件向父组件通信

父组件监听子组件的触发的事件，从而处理事件

```
	<div id="box">
		<aaa>
		</aaa>
	</div>
	
	<template id="aaa">
		<span>我是父级 -> {{msg}}</span>
		<bbb @child-msg="get"></bbb>
	</template>
	<template id="bbb">
		<h3>子组件-> {{a}}</h3>
		<input type="button" value="send" @click="send">
	</template>
	
	<script>
		var vm=new Vue({
			el:'#box',
			data:{
				a:'aaa'
			},
			components:{
				'aaa':{
					data(){
						return {
							msg:'我是父组件的数据'
						}
					},
					template:'#aaa',
					methods:{
						get(msg){
							alert(msg);
							this.msg=msg;
						}
					},
					components:{
						'bbb':{
							data(){
								return {
									a:'我是子组件的数据'
								}
							},
							template:'#bbb',
							methods:{
								send(){
									//将子组件的数据传递给父组件
									this.$emit('child-msg',this.a);
								}
							}
						}
					}
				}
			}
		});

	</script>
```

### 中央事件总线

**这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级**。当我们的项目比较大时，可以选择更好的状态管理解决方案vuex。

```
var Event = new Vue();　　　　　　相当于又new了一个vue实例，Event中含有vue的全部方法；

Event.$emit('msg',this.msg);　　　   发送数据，第一个参数是发送数据的名称，接收时还用这个名字接收，第二个参数是这个数据现在的位置；

Event.$on('msg',function(msg){　　接收数据，第一个参数是数据的名字，与发送时的名字对应，第二个参数是一个方法，要对数据的操作

事件总线eventBus主要是在要相互通信的两个Vue页面之中，都引入一个新的vue实例，然后通过分别调用这个实例的事件触发和监听来实现通信和参数传递。
```

```js
//准备一个空的实例对象
        var Event=new Vue();
        var A={
            template:`
                <div>
                    <span>我是A组件</span> -> {{a}}
                    <input type="button" value="把A数据给C" @click="send">
                </div>
            `,
            methods:{
                send(){
                    Event.$emit('a-msg',this.a);
                }
            },
            data(){
                return {
                    a:'我是a数据'
                }
            }
        };
        var C={
            template:`
                <div>
                    <h3>我是C组件</h3>
                    <span>接收过来的A的数据为: {{a}}</span>
                </div>
            `,
            data(){
                return {
                    a:''
                }
            },
            mounted(){
                //var _this=this;
                Event.$on('a-msg',function(a){
                    this.a=a;
                }.bind(this));
            }
        };
```

### provide/inject

**允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效**。

一言而蔽之：祖先组件中通过provider来提供变量，然后在子孙组件中通过inject来注入变量。

**provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系**。

### `$parent` / `$children`与 `ref`

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- `$parent` / `$children`：访问父 / 子实例
- **这两种方法的弊端是，无法在跨级或兄弟间通信**。

```js
// component-a 子组件
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
```

```js
// 父组件
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```

### 使用场景

- 父子通信：

父向子传递数据是通过 props，子向父是通过 events（`$emit`）；通过父链 / 子链也可以通信（`$parent` / `$children`）；ref 也可以访问组件实例；provide / inject API；`$attrs/$listeners`

- 兄弟通信：

Bus；Vuex

- 跨级通信：

Bus；Vuex；provide / inject API、`$attrs/$listeners`

# vue生命周期

## 背景

Vue 实例在被创建时都要经过一系列的初始化过程 ， 编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等 。 在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。 

## 生命周期函数	

- vue1.0

```js
created	->   实例已经创建	√
beforeCompile	->   编译之前
compiled	->   编译之后
ready		->   插入到文档中	√
beforeDestroy	->   销毁之前
destroyed	->   销毁之后
```

- vue2.0

  https://zhuanlan.zhihu.com/p/53039906


```
beforeCreate	
组件实例刚刚被创建,属性都没有，组件的el（Vue实例挂载的元素节点）和data都未被创建

created			     
实例已经创建完成，组件的数据data已经被创建好，但是el还处于未被创建状态。

beforeMount		
模板编译之前,组件的el会被创建，render 函数首次被调用。但是值得注意的是：虽然数据data早已经被创建好，但是它还未被应用到真实的DOM元素中,而是render将data中的数据和vue声明的模板template编译成浏览器可读的HTML挂载到对应虚拟dom触发的钩子。

mounted			
模板编译之后，组件的el,data都已经全部被创建好，触发虚拟dom的钩子将编译好的HTML替换掉el属性所指的dom，应用到真实DOM元素中。

beforeUpdate	组件更新之前
updated			组件更新完毕	
beforeDestroy	组件销毁前
destroyed		组件销毁后

activated	keep-alive 组件激活时调用。
deactivated	keep-alive 组件停用时调用。
```

 ![f847b38a-63fe-11e6-9c29-38e58d46f036.png](https://segmentfault.com/img/bVEs9x?w=847&h=572) 

不要在生命周期函数或者回调上使用箭头函数， 因为箭头函数并没有 `this` ,this指向调用它的VUE实例

 比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 

<img src="https://upload-images.jianshu.io/upload_images/7414631-6af6e3bd7fe52a94.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img" style="zoom:50%;" />



# vue-router路由

## 创建路由

直接`vue add router`,或者

1. 下载vue-router模块  

   ```
   npm install vue-router
   ```

2. 创建文件夹，存放路由配置

   ```
   import Vue from "vue";
   import VueRouter from "vue-router";
   import login from "../components/login.vue";
   import register from "../components/register.vue"
   
   Vue.use(VueRouter);
   
   const routes = [
     {
       path: "/",
       component: login,
     },
     {
       path: "/register",
       component: register,
     },
   ];
   
   const router = new VueRouter({
     mode: "history",
     base: process.env.BASE_URL,
     routes,
   });
   
   export default router;
   
   ```

3. main.js文件中引入router

   ```
   import Vue from "vue";
   import App from "./App.vue";
   import VueRouter from "vue-router";
   import router from "./router/index";
   
   Vue.config.productionTip = false;
   
   Vue.use(VueRouter);
   new Vue({
     router: router,
     render: (h) => h(App),
   }).$mount("#app");
   ```



--------------------------------------------

# vuex

当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

vuex是一个专为 Vue.js 应用程序开发的**状态管理模式** 。它采用集中式存储管理应用的所有组件的状态 


这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

```
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

## 开始

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
store.commit('increment')
console.log(store.state.count) // -> 1

//Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制
new Vue({
  el: '#app',
  store: store,
})
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

### state

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
//通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
const Counter = {
  template: `<div>{{ count }}</div>`,
  //从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

```js
//当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
export default {
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
	//映射的计算属性的名称与 state 的子节点名称相同时
       'count',
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

### getters

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

```js
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
    ])
  }
}
```

###  Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state,n) {
      // 变更状态
      state.count+=n
    }
  }
})
```

唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment',{
 			 amount: n
			}
)

store.commit(
    		{
    		type: 'increment',
 			 amount: n
			}
)
```

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

tips:Mutation 必须是同步函数

### Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```