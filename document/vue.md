# 项目搭建

## vue脚手架

帮你提供构建项目结构

1. webpack本身集成很多项目模板:
   	   simple		个人觉得一点用都没有
          	 webpack	可以使用(大型项目)
          	 Eslint 			检查代码规范
          	 webpack-simple	个人推荐使用, 没有代码检查, 没有vue-router的中间件 
2. browserify	
   browserify-simple

--------------------------------------------

基本使用流程:

1. npm install vue-cli -g	安装 vue命令环境
   验证安装ok?
   	vue --version
2. 生成项目模板
   vue init <模板名> 本地文件夹名称
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

## 依赖

[Vue Router](https://router.vuejs.org/zh/)

# 基本概念

## 创建实例

```js
var vm=new Vue({
            el:'#box',
            data:{
                msg:'welcome vue',
                arr:['1','2','3'],
                json:{a:'apple',b:'banana',c:'orange'},
                a:true
            },
            methods:{
                show:function(){
                    alert(this.arr);
​            },
​            add:function(){
​                console.log(this);
​                this.arr.push('tomato');
​            }
​        }
​    });
```

## 标签数据

- **绑定数据**

1. {{msg}} , msg也可以是js表达式，但只能包含单个表达式

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

### **计算属性computed**

```js
  computed:{
  		b:function(){	//默认调用get
  			return 值
  		}
  	}

--------------------------

  computed:{
  		b:{
  			get:function(){return val;}
  			set:
  		}
  	}
      //computed里面可以放置一些业务逻辑代码，一定记得return
```

- **支持缓存**，只有依赖数据发生改变，才会重新进行计算
  
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化

- computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的。如其中的任意一个值未发生变化，它调用的就是上一次 计算缓存的数据，因此提高了程序的性能。而methods中每调用一次就会重新计算一次，为了进行不必要的资源消耗，选择用计算属性

- 如果一个属性是由其他属性计算而来的，这个属性**依赖**其他属性，是一个多对一或者一对一，一般用computed

- 在模版中放入太多声明式的逻辑会让模板本身过重，尤其当在页面中使用大量复杂的逻辑表达式处理数据时，会对页面的可维护性造成很大的影响

  而且计算属性如果依赖不变的话，它就会变成缓存，computed 的值就不会重新计算

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

### 使用场景区别

- computed 

  - 适合 当一个属性受多个属性影响的时候就需要用到computed

  　　最典型的例子： 购物车商品结算的时候

- watch 

  - 适合当一条数据影响多条数据的时候就需要用watch

    搜索数据

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

  ```js
  <!-- 完整语法 -->
  <a v-on:click="doSomething">...</a>
  
  <!-- 缩写 -->
  <a @click="doSomething">...</a>
  
  <!-- 动态参数的缩写 -->
  <a @[event]="doSomething"> ... </a>
  ```

v-show

```js
 <div v-show="a"> 
 v-show="a"//a是布尔值， 切换元素的 CSS property `display`
```

### 修饰符

@click.stop="show1()"   stop防止事件冒泡  

```
阻止冒泡:  
			a). ev.cancelBubble=true;
			b). @click.stop	推荐
			c). event.stopPropagation();
```

```
prevent(调用 event.preventDefault()
<form v-on:submit.prevent></form>//<!-- 可以只有修饰符 -->

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
```

### 键盘

`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持。 
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

## vue实例简单方法

```
vm= new Vue({})

vm.$el	->  获取Vue实例关联的DOM元素
vm.$data  ->  就是data
vm.$mount ->  手动挂在vue程序
vm.$options	->   获取自定义属性
vm.$destroy()	->   销毁对象
vm.$log();	->  查看现在数据的状态
vm.$refs  ->  获取页面中所有含有ref属性的DOM元素（如vm.$refs.hello，获取页面中含有属性ref = “hello”的DOM元素，如果有多个元素，那么只返回最后一个）
```

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


```
beforeCreate	组件实例刚刚被创建,属性都没有，组件的el和data都未被创建
created			实例已经创建完成，组件的数据data已经被创建好，但是el还处于未被创建状态。
beforeMount		模板编译之前,组件的el会被创建，render 函数首次被调用。但是值得注意的是：虽然数据data早已经被创建好，但是它还未被应用到真是的DOM元素中。
mounted			模板编译之后，组件的el,data都已经全部被创建好，并且data也已经被正确的应用到DOM元素中
beforeUpdate	组件更新之前
updated			组件更新完毕	
beforeDestroy	组件销毁前
destroyed		组件销毁后

activated	keep-alive 组件激活时调用。
deactivated	keep-alive 组件停用时调用。
```

**不要在生命周期函数或者回调上使用箭头函数， 因为箭头函数并没有 `this`** ,this指向调用它的VUE实例

 比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 

<img src="https://upload-images.jianshu.io/upload_images/7414631-6af6e3bd7fe52a94.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img" style="zoom:50%;" />

# keep-alive

## 背景

Aaa和Baa组件，Aaa中有3个Tab栏（1，2，3），点击2后，点击Baa,再点击Aaa，会出现1的内容。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 **currentTabComponent** 实例。

当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题。
用一个 <keep-alive> 元素将其动态组件包裹起来，**组件将会被缓存**

## keep-alive

<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
当组件在 <keep-alive> 内被切换，它的 activated 和deactivated这两个生命周期钩子函数将会被对应执行。

- 页面第一次进入，钩子的触发顺序created-> mounted-> activated
- 退出时触发deactivated
- 当再次进入（前进或者后退）时，只触发activated。

# 组件

- **模板**

```
<template id="Aaa">
	<h1 @click="change">{{msg}}</h1>
</template>
```

- **动态组件**

  <component :is="Aaa"></component>

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
必须有根元素，包裹住所有的代码
Vue.component('aaa',Aaa);//全局组件
var vm=new Vue({
		components:{ //局部组件
			'aaa':Aaa
		}
	});
```

## 父组件和子组件通信:

### 子组件获取父组件的数据

```js
在父组件中声明子组件
Aaa.components={
	'bbb':{
		template:'<h3>我是Aaa的子组件</h3>',
		props:['msg']
	}
}
```

**prop 的大小写**

-  HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。
  - html 的标签和 **属性** 都是一样，忽略大小写
  
    `<H1 TITLE="哈哈">我是h1</H1>`
  
  -  这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名不好使了
  
  - `<child ：cMsg="pmsg"></child>` 会报警告，父传子也接收不到了
  - 原因是 ： 接收的属性是：cMsg， 因为忽略大小写，已为 ： cmsg
  - 所以已经准备要读取的 是 cmsg 的值，否则要报警告
    `You should probably use "c-msg" instead of "cMsg".`
  
- 方式 1 ： 全用小写，不要使用驼峰命名 **(不推荐)**
  - 接收 ： `cmsg`
  - props/读取 ：`cmsg`
  
- 方式 2 官 ： 需要使用其等价的 kebab-case (短横线分隔命名) 命名： **(推荐)**
  - 接收 ： `：c-msg='pmsg'`
  - props/读取 ： `cMsg / this.cMsg`

组件数据传递:

1. 子组件bbb想获取父组件msg
	父组件template调用子组件：
		<bbb :data="父组件的msg"></bbb>

	子组件之内:props:['data']
	

**vue.2.0**

	子组件想要拿到父组件数据:通过  props
	之前，子组件child-com可以更改父组件信息，可以是同步  sync
	<child-com :msg.sync="父组件的msg"></child-com>msg.sync同步更改父级组件数据
	 
	现在，父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。但是msg是个对象也可以变更父级组件的状态
	子组件中使用mounted编译完成，将父组件数据赋值给子组件的数据，而直接不使用父组件数据
	mounted(){
	            console.log(this.msg)
	             this.b=this.msg;
	       //   vue2.0不允许直接给父级的数据做赋值操作
	       //若父组件每次传一个对象给子组件，则可以赋值
	}

### 父组件获取子组件的数据

组件通信: 实现子组件向父组件通信。 

```
	<div id="box">
		<aaa>
		</aaa>
	</div>

	<template id="aaa">
		<span>我是父级 -> {{msg}}</span>
		<span>11</span>
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

### 同级组件下数据的传递

```
var Event = new Vue();　　　　　　相当于又new了一个vue实例，Event中含有vue的全部方法；

Event.$emit('msg',this.msg);　　　   发送数据，第一个参数是发送数据的名称，接收时还用这个名字接收，第二个参数是这个数据现在的位置；

Event.$on('msg',function(msg){　　接收数据，第一个参数是数据的名字，与发送时的名字对应，第二个参数是一个方法，要对数据的操作

//在vue1.0中
vm.$dispatch(事件名,数据)	子级向父级发送数据
vm.$broadcast(事件名,数据)	父级向子级广播数据
//在vue2.0中
对于中大型的项目来说，一开始就把vuex的使用计划在内是明智的选择。
然而在一些小型的项目，或者说像我这样写到一半才发现vue2.0用不了.broadcast和.broadcast和dispatch的人来说，就需要一个比较便捷的解决方法。那么，eventBus的作用就体现出来了
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

## 异步组件

 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。 

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

# vue-router	路由

1. 下载vue-router模块  cnpm install vue-router@0.7.13

2. import VueRouter from 'vue-router'

3. Vue.use(VueRouter);  `Vue.use()` 使用插件 

4. 配置路由router.config.js
	
	**//vue1.0**
	
	'/home':{
	component:Home,
	subRoutes:{
			'login':{
				component:Login
			},
			'reg':{
				component:Reg
			}
		}
	**//vue2.0**
	     const routes=[
         {path:'/home', component:Home},
            {
                path:'/user',
                component:User,
                children:[
                    {path:'username', component:UserDetail}
                ]
            },
            {path:'*', redirect:'/home'}  //404
        ];
   
5. ```
   //生成路由实例
   var router=new VueRouter();
   router.map({
   	router.config.js
   })
   
   //vue2.0
   const router=new VueRouter({
       routes
   });
   ```

   

5. 挂到vue上
	router.start(App,'#app');

```
//vue2.0
     new Vue({
       	router,
     	el: '#app',
	    render: h => h(App)
	   })
	
	<a v-link="{path:'/home'}">主页</a>
	<router-view></router-view>
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