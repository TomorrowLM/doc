### 创建实例

```
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

- 绑定数据：
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

- 编译html元素  {{{msg}}} 	v-html	

- v-text

- 循环

  ```
  循环：<li v-for="value in json">{{value}} </li>
       <li v-for="(k,v) in json">{{k}}   {{v}}  </li>
       track-by="$index"
  //vue2.0	v-for="(val,index) in array"
  :key="index"如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute：
  ```

- 判断

  ```
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

- 事件：

  ```
  <!-- 完整语法 -->
  <a v-on:click="doSomething">...</a>
  
  <!-- 缩写 -->
  <a @click="doSomething">...</a>
  
  <!-- 动态参数的缩写 (2.6.0+) -->
  <a @[event]="doSomething"> ... </a>
  ```

  - v-show

    ```
     <div v-show="a"> 
     v-show="a"//a是布尔值， 切换元素的 CSS property `display`
    ```

  - 修饰符

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

- 键盘: `keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持。 
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

- 属性：

  ```
  url=''
  
  <img src="{{url}}" alt="">
  <img v-bind:src="url"  >
  <img v-bind:style="{color:'',fontsize:data+'px'}">
  //缩写
  <img :src="url" alt="" >
  //动态参数的缩写 
  // 可以用方括号括起来的 JavaScript 表达式作为一个指令的参数 
  <img v-bind:[]="url"  >
  ```

  ```
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

  计算属性的使用: 对于任何复杂逻辑，你都应当使用**计算属性**。 

  ```
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
  computed里面可以放置一些业务逻辑代码，一定记得return
  ```

  监听数据变化: 计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器 

  ```
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

- filter:

  ```
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

  

自定义指令:

	Vue.directive(指令名称,function(参数){
		this.el	-> 原生DOM元素
	});
	
	<div v-red="参数"></div>

用户会看到花括号标记:v-cloak		防止闪烁, 比较大段落

交互：vue-resource.js

### vue生命周期:

Vue 实例在被创建时都要经过一系列的初始化过程 ， 编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等 。 在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。 

​	//vue1.0

	created	->   实例已经创建	√
	beforeCompile	->   编译之前
	compiled	->   编译之后
	ready		->   插入到文档中	√
	
	beforeDestroy	->   销毁之前
	destroyed	->   销毁之后
​	//vue2.0

```
beforeCreate	组件实例刚刚被创建,属性都没有
created			实例已经创建完成，属性已经绑定
beforeMount		模板编译之前
mounted			模板编译之后，代替之前ready  
beforeUpdate	组件更新之前
updated			组件更新完毕	
beforeDestroy	组件销毁前
destroyed		组件销毁后
```

**不要在生命周期函数或者回调上使用箭头函数， 因为箭头函数并没有 `this`** 

 比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 

### vue实例简单方法:

vm= new Vue({})

	vm.$el	->  就是元素
	vm.$data  ->  就是data
	vm.$mount ->  手动挂在vue程序
	vm.$options	->   获取自定义属性
	vm.$destroy()	->   销毁对象
	vm.$log();	->  查看现在数据的状态

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



### 组件

模板：

```
<template id="Aaa">
	<h1 @click="change">{{msg}}</h1>
</template>
```

动态组件：<component :is="Aaa"></component>

```
当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题
eg:Aaa和Baa组件，Aaa中有3个Tab栏（1，2，3），点击2后，点击Baa,再点击Aaa，会出现1的内容。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
用一个 <keep-alive> 元素将其动态组件包裹起来。组件将会被缓存
```

定义组件

```
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
        //或者template:'#aaa';
        components:{
        
        }
    });
    
//vue2.0组件定义
var Aaa={
		template:""		
	};
```


声明组件

```
必须有根元素，包裹住所有的代码
Vue.component('aaa',Aaa);//全局组件
var vm=new Vue({
		components:{ //局部组件
			'aaa':Aaa
		}
	});
```

### 父组件和子组件通信:

#### 子组件获取父组件的数据

```
在父组件中声明子组件
Aaa.components={
	'bbb':{
		template:'<h3>我是Aaa的子组件</h3>',
		props:['msg']
	}
}
```

组件数据传递:	√
1. 子组件bbb想获取父组件msg
	父组件template调用子组件：
		<bbb :data="父组件的msg"></bbb>

	子组件之内:props:['data']
	


vue.2.0

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

#### 父组件获取子组件的数据

组件通信: 实现子组件向父组件通信。 

vm.$dispatch(事件名,数据)	子级向父级发送数据
vm.$broadcast(事件名,数据)	父级向子级广播数据

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

#### 同级组件下数据的传递

```
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

### 异步组件

 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。 



### 插槽：slot

组件里所有标签赋值给slot标签

```
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

### vue-router	路由

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

​	

### 脚手架:

vue-cli——vue脚手架
帮你提供好基本项目结构

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
--------------------------------------------

### vuex

是一个专为 Vue.js 应用程序开发的**状态管理模式** 。它采用集中式存储管理应用的所有组件的状态 


这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。